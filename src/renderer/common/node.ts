//
//  common.ts
//
//  The MIT License
//  Copyright (c) 2021 - 2025 O2ter Limited. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import _ from 'lodash';
import type { _DOMRenderer } from './renderer';
import { myersSync } from 'myers.js';
import { globalEvents } from '../../core/web/event';
import { NativeElementType } from '../../core/types/component';
import { svgProps, htmlProps } from '../../../generated/elements';
import { _propValue } from '../../core/web/props';
import { _Renderer } from '../../core/renderer';

const findPrototypeProperty = (object: any, propertyName: string) => {
  while (object && object.constructor && object.constructor.name !== 'Object') {
    let desc = Object.getOwnPropertyDescriptor(object, propertyName);
    if (desc) return desc;
    object = Object.getPrototypeOf(object);
  }
  return null;
};

const isWriteable = (object: any, propertyName: string) => {
  let desc = findPrototypeProperty(object, propertyName);
  if (!desc) {
    return false;
  }
  if (desc.writable && typeof desc.value !== 'function') {
    return true;
  }
  return !!desc.set;
};

const tracked_props = new WeakMap<Element, string[]>();
const tracked_listeners = new WeakMap<Element, Record<string, EventListener | undefined>>();
const _updateEventListener = (
  element: Element,
  key: string,
  listener: EventListener | undefined,
) => {
  const event = key.endsWith('Capture') ? key.slice(2, -7).toLowerCase() : key.slice(2).toLowerCase();
  const listeners = tracked_listeners.get(element) ?? {};
  if (!tracked_listeners.has(element)) tracked_listeners.set(element, listeners);
  if (listeners[key] !== listener) {
    const options = { capture: key.endsWith('Capture') };
    if (_.isFunction(listeners[key])) element.removeEventListener(event, listeners[key], options);
    if (_.isFunction(listener)) element.addEventListener(event, listener, options);
  }
  listeners[key] = listener;
}

const DOMUtils = new class {

  update(
    element: Element,
    { className, style, ...props }: Record<string, any> & {
      className?: string;
      style?: string;
    },
  ) {
    if (className) {
      if (element.className !== className)
        element.className = className;
    } else if (!_.isNil(element.getAttribute('class'))) {
      element.removeAttribute('class');
    }
    if (style) {
      const oldValue = element.getAttribute('style');
      if (oldValue !== style)
        element.setAttribute('style', style);
    } else if (!_.isNil(element.getAttribute('style'))) {
      element.removeAttribute('style');
    }
    for (const [key, value] of _.entries(props)) {
      if (_.includes(globalEvents, key)) {
        _updateEventListener(element, key, value);
      } else if (key.endsWith('Capture') && _.includes(globalEvents, key.slice(0, -7))) {
        _updateEventListener(element, key, value);
      } else if (key.startsWith('data-')) {
        const oldValue = element.getAttribute(key);
        if (value === false || _.isNil(value)) {
          if (!_.isNil(oldValue))
            element.removeAttribute(key);
        } else {
          const newValue = value === true ? '' : `${value}`;
          if (oldValue !== newValue)
            element.setAttribute(key, newValue);
        }
      } else {
        const tagName = _.toLower(element.tagName);
        const { type: _type, attr } = (htmlProps as any)['*'][key]
          ?? (htmlProps as any)[tagName]?.[key]
          ?? (svgProps as any)['*'][key]
          ?? (svgProps as any)[tagName]?.[key]
          ?? {};
        const tracked = tracked_props.get(element) ?? [];
        const writeable = isWriteable(element, key);
        if (!tracked_props.has(element)) tracked_props.set(element, tracked);
        const assigned = _.includes(tracked, key);
        if (writeable && !_.isNil(value)) {
          if (!assigned || (element as any)[key] !== value) (element as any)[key] = value;
          if (!assigned) tracked.push(key);
        } else if (_type && attr && (_propValue as any)[_type]) {
          const oldValue = element.getAttribute(attr);
          if (value === false || _.isNil(value)) {
            if (!_.isNil(oldValue))
              element.removeAttribute(attr);
          } else {
            const newValue = value === true ? '' : `${value}`;
            if (oldValue !== newValue)
              element.setAttribute(attr, newValue);
          }
        } else if (writeable) {
          if (!assigned || (element as any)[key] !== value) (element as any)[key] = value;
          if (!assigned) tracked.push(key);
        }
      }
    }
  }

  replaceChildren(
    element: Element,
    children: (string | ChildNode | DOMNativeNode)[],
    shouldRemove: (child: ChildNode) => boolean = () => true,
  ) {
    const document = element.ownerDocument;
    const diff = myersSync(
      _.map(element.childNodes, x => x.nodeType === document.TEXT_NODE ? x.textContent ?? '' : x),
      _.flatMap(children, x => x instanceof DOMNativeNode ? x.target : x),
      { compare: (a, b) => a === b },
    );
    let i = 0;
    for (const { remove, insert, equivalent } of diff) {
      if (equivalent) {
        i += equivalent.length;
      } else if (remove) {
        for (const child of remove) {
          if (_.isString(child) || shouldRemove(child)) {
            element.removeChild(element.childNodes[i]);
          } else {
            i++;
          }
        }
      }
      if (insert) {
        for (const child of insert) {
          const node = _.isString(child) ? document.createTextNode(child) : child;
          element.insertBefore(node, element.childNodes[i++]);
        }
      }
    }
  }

  destroy(element: Element) {
    const listeners = tracked_listeners.get(element);
    for (const [key, listener] of _.entries(listeners)) {
      const event = key.endsWith('Capture') ? key.slice(2, -7).toLowerCase() : key.slice(2).toLowerCase();
      if (_.isFunction(listener)) {
        element.removeEventListener(event, listener, { capture: key.endsWith('Capture') });
      }
    }
    tracked_listeners.delete(element);
  }
}

export abstract class DOMNativeNode extends NativeElementType {

  static get Utils() { return DOMUtils; }

  static createElement: (doc: Document, renderer: _DOMRenderer) => DOMNativeNode;

  abstract get target(): Element | Element[];

  abstract update(
    props: Record<string, any> & {
      className?: string;
      style?: string;
    },
    children: (string | Element | DOMNativeNode)[]
  ): void;

  abstract destroy(): void;
}
