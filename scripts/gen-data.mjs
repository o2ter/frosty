//
//  gen-data.mjs
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
import fs from 'fs/promises';
import _webref_css from '@webref/css';
import _webref_idl from '@webref/idl';
import _webref_events from '@webref/events';
import _webref_elements from '@webref/elements';
import bcd from '@mdn/browser-compat-data' with { type: 'json' };

const webref = {
  css: await _webref_css.listAll(),
  idl: await _webref_idl.parseAll(),
  events: await _webref_events.listAll(),
  elements: await _webref_elements.listAll(),
};

try {
  await fs.rm('./generated', { recursive: true, force: true });
} catch { }

try {
  await fs.mkdir('./generated');
} catch { }

const impls = _.mapValues(_.groupBy(_.flatten(_.values(webref.idl)), 'type'), u => _.groupBy(u, x => x.name ?? ''));

const ElementTagNameMap = _.mapValues({
  svg: {
    defaultInterface: 'SVGElement',
    groups: ['SVG11'],
  },
  html: {
    defaultInterface: 'HTMLElement',
    groups: ['html'],
  },
  mathml: {
    defaultInterface: 'MathMLElement',
    groups: ['mathml-core'],
  },
}, v => ({
  ...v,
  groups: _.pick(webref.elements, v.groups),
}));

const elements = _.uniq(_.flatMap(ElementTagNameMap, (v) => _.flatMap(v.groups, g => _.map(g.elements, e => e.interface))));
const interfaces = {};
const collect = (name) => {
  if (interfaces[name]) return;
  const _interface = impls.interface[name] ?? [];
  const _mixin = impls['interface mixin'][name] ?? [];
  const record = {
    implements: [],
    members: [],
  };
  for (const item of _interface) {
    if (item.inheritance) collect(item.inheritance);
    record.members.push(...item.members);
  }
  for (const item of _mixin) {
    if (item.inheritance) collect(item.inheritance);
    record.members.push(...item.members);
  }
  for (const item of impls.includes['']) {
    if (item.target !== name) continue;
    record.implements.push(item.includes);
    collect(item.includes);
  }
  interfaces[name] = record;
};
_.forEach(elements, x => collect(x));

await fs.writeFile('./generated/interfaces.json', JSON.stringify(interfaces, null, 2));

await fs.writeFile('./generated/elements.ts', `

export type ElementTagNameMap = {${_.map(ElementTagNameMap, ({ groups }, key) => `
  ${key}: {${_.map(groups, ({ spec, elements }, group) => `
    /**
     * ${spec.title}
     * ${spec.url}
     */
    '${group}': {${_.map(elements, ({ name, href, interface: _interface }) => `
      /** ${href} */
      '${name}': {
        type: ${_interface ?? v.defaultInterface},
      },`).join('\n')}
    },`).join('\n')}
  },`).join('\n')}
};

export const tags =  ${JSON.stringify(_.mapValues(
  ElementTagNameMap,
  v => _.uniq(_.flatMap(_.values(v.groups), ({ elements }) => _.map(elements, 'name')))
))};
`);
