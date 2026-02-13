//
//  gen-data.mjs
//
//  The MIT License
//  Copyright (c) 2021 - 2026 O2ter Limited. All rights reserved.
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
import { htmlElementAttributes } from 'html-element-attributes';
import { svgElementAttributes } from 'svg-element-attributes';

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
    groups: ['SVG11', 'SVG2', 'svg-animations', 'svg-paths'],
  },
  html: {
    defaultInterface: 'HTMLElement',
    groups: ['html'],
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
    if (item.inheritance) {
      record.implements.push(item.inheritance);
      collect(item.inheritance);
    }
    record.members.push(...item.members);
  }
  for (const item of _mixin) {
    if (item.inheritance) {
      record.implements.push(item.inheritance);
      collect(item.inheritance);
    }
    record.members.push(...item.members);
  }
  for (const item of impls.includes['']) {
    if (item.target !== name) continue;
    record.implements.push(item.includes);
    collect(item.includes);
  }
  interfaces[name] = {
    implements: record.implements,
    attribute: _.filter(record.members, x => x.type === 'attribute' && x.special !== 'static'),
  };
};
_.forEach(elements, x => collect(x));

const value_mapping = {

  'DOMString': 'string',
  'SVGAnimatedTransformList': 'string',
  'SVGStringList': 'string',
  'SVGAnimatedRect': 'string',
  'SVGAnimatedPreserveAspectRatio': 'string',
  'SVGAnimatedString': 'string',
  'SVGPointList': 'string',
  'SVGAnimatedLengthList': 'string',
  'SVGAnimatedNumberList': 'string',
  'SVGAnimatedEnumeration': 'string',
  'USVString': 'string',
  'DOMTokenList': 'string',
  'TrustedHTML': 'string',
  'HTMLFormElement': 'string',
  'HTMLDataListElement': 'string',

  'SVGAnimatedLength': ['number', 'string'],

  'SVGAnimatedNumber': 'number',
  'SVGAnimatedInteger': 'number',
  'unrestricted double': 'number',
  'double': 'number',
  'unsigned long': 'number',
  'long': 'number',

  'SVGAnimatedBoolean': 'boolean',
  'boolean': 'boolean',

};

const decodeAttrType = (x) => {
  if (x.type !== 'attribute') throw Error('not attribute type');
  if (_.isString(x.idlType.idlType)) return value_mapping[x.idlType.idlType];
  if (x.idlType.union && _.isArray(x.idlType.idlType) && _.every(x.idlType.idlType, x => _.isString(x.idlType))) {
    return _.compact(_.uniq(_.map(x.idlType.idlType, x => value_mapping[x.idlType])));
  }
  if (x.idlType.generic === 'FrozenArray') return null;
  throw Error('unknown attribute type');
};

const _elements = [
  ..._.flatMap(ElementTagNameMap.svg.groups, g => g.elements),
  ..._.flatMap(ElementTagNameMap.html.groups, g => g.elements),
];
let mapped = _.mapValues(interfaces, (v, name) => {
  const found = _.find(_elements, e => e.interface === name);
  let attrs = (() => {
    if (name === 'SVGElement') {
      return svgElementAttributes['*'];
    }
    if (name === 'HTMLElement') {
      return htmlElementAttributes['*'];
    }
    if (!found) return [];
    if (name.startsWith('SVG'))
      return svgElementAttributes[found.name] ?? [];
    if (name.startsWith('HTML'))
      return htmlElementAttributes[found.name] ?? [];
    return [];
  })();
  let properties = _.fromPairs(_.map(v.attribute, x => [x.name, decodeAttrType(x)]));
  if (name === 'ARIAMixin') {
    for (const [k, v] of Object.entries(properties)) {
      if (!v && k.endsWith('Elements')) {
        attrs.push(_.kebabCase(k.slice(0, -8)));
      }
    }
    properties = _.pickBy(properties, (v) => !!v);
  } else {
    properties = _.pickBy(properties, (v, k) => !!v && _.some(attrs, a => _.camelCase(a).toLowerCase() === _.camelCase(k).toLowerCase()));
  }
  return {
    name,
    tag: found?.name,
    implements: v.implements,
    attributes: attrs,
    properties,
  };
});

const resolve_impls = (name) => _.orderBy([
  mapped[name],
  ..._.flatMap(mapped[name].implements, resolve_impls),
], 'name');

while (true) {
  let changed = false;
  for (const [name, item] of Object.entries(mapped)) {
    const founds = _.filter(_.values(mapped), x => x.implements.includes(name));
    const common_attrs = _.intersection(..._.map(founds, x => x.attributes));
    if (common_attrs.length === 0) continue;
    item.attributes = _.uniq([...item.attributes || [], ...common_attrs]);
    for (const type of ['HTML', 'SVG']) {
      if (_.startsWith(name, type) || _.every(['HTML', 'SVG'], k => !_.startsWith(name, k))) {
        for (const attrs of common_attrs) {
          for (const found of _.filter(_.values(mapped), x => _.startsWith(x.name, type))) {
            const picked = _.pickBy(found.properties, (v, k) => _.camelCase(k).toLowerCase() === _.camelCase(attrs).toLowerCase());
            item.properties = {
              ...picked,
              ...item.properties,
            };
          }
        }
      }
    }
    changed = true;
  }
  for (const [, item] of Object.entries(mapped)) {
    const impls = _.flatMap(item.implements, resolve_impls);
    const attrs = _.uniq(_.flatMap(impls, x => x.attributes));
    item.attributes = _.difference(item.attributes || [], attrs);
    const props = _.fromPairs(_.flatMap(impls, x => _.toPairs(x.properties)));
    item.properties = _.omit(item.properties, _.keys(props));
  }
  if (!changed) break;
}

while (true) {
  const check = _.size(mapped);
  mapped = _.pickBy(mapped, x => !_.isEmpty(x.implements) || !_.isEmpty(x.attributes) || !_.isEmpty(x.properties));
  for (const [, item] of Object.entries(mapped)) {
    item.implements = _.filter(item.implements, x => _.has(mapped, x));
  }
  if (check === _.size(mapped)) break;
}

let content = '';

content += 'export namespace Frosty {\n';

const map_name = (name) => {
  if (name === 'Element') return 'ElementAttributes';
  if (_.endsWith(name, 'Element')) return `${name.slice(0, -7)}Attributes`;
  return name;
}

for (const [name, item] of Object.entries(mapped)) {

  content += `  export interface ${map_name(name)} `;
  if (!_.isEmpty(item.implements)) {
    content += `extends ${_.map(item.implements, map_name).join(', ')} `;
  }
  content += '{\n';

  let attributes = [];
  for (const attribute of item.attributes) {
    const attr = _.camelCase(attribute);
    const prop = _.findKey(item.properties, (v, k) => _.camelCase(k).toLowerCase() === attr.toLowerCase());
    if (prop) continue;
    attributes.push({ key: attr, type: 'string' });
  }
  for (const [prop, type] of Object.entries(item.properties)) {
    if (_.isArray(type)) {
      attributes.push({ key: prop, type: type.join(' | ') });
    } else {
      attributes.push({ key: prop, type: type });
    }
  }
  for (const { key, type } of attributes.sort((a, b) => a.key.localeCompare(b.key))) {
    if (key === 'class' || key === 'style') continue;
    content += `    ${key}?: ${type};\n`;
  }

  content += '  }\n';
}

content += '  export interface HTMLElementAttributeTagNameMap {\n';
for (const [name, item] of Object.entries(mapped)) {
  if (!item.tag) continue;
  if (!name.startsWith('HTML')) continue;
  content += `    '${item.tag}': ${map_name(name)};\n`;
}
content += '  }\n';

content += '  export interface SVGElementAttributeTagNameMap {\n';
for (const [name, item] of Object.entries(mapped)) {
  if (!item.tag) continue;
  if (!name.startsWith('SVG')) continue;
  content += `    '${item.tag}': ${map_name(name)};\n`;
}
content += '  }\n';

content += '}\n';

content += 'export const HTMLElementAttributeMaps = {\n';
for (const [name, item] of Object.entries(mapped)) {
  if (!item.tag) continue;
  content += `  '${item.tag}': {\n`;
  content += `  },\n`;
}
content += '};\n';

await fs.writeFile('./generated/elements.ts', content);
