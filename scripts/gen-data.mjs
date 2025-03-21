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
import webref_elements from '@webref/elements';

try {
  await fs.rm('./generated', { recursive: true, force: true });
} catch { }

try {
  await fs.mkdir('./generated');
} catch { }

const elements = await (async () => {
  const elements = await webref_elements.listAll();
  const mapped = {
    SVGElementTagNameMap: {
      defaultInterface: 'SVGElement',
      groups: ['SVG11'],
    },
    HTMLElementTagNameMap: {
      defaultInterface: 'HTMLElement',
      groups: ['html'],
    },
    MathMLElementTagNameMap: {
      defaultInterface: 'MathMLElement',
      groups: ['mathml-core'],
    },
  };
  return _.mapValues(mapped, v => ({
    ...v,
    elements: _.pick(elements, v.groups),
  }));
})();

await fs.writeFile('./generated/elements.ts', `${_.map(elements, (v, k) => `
export const ${k} = {
  ${_.map(_.values(v.elements), ({ spec, elements }) => `

  /**
   * ${spec.title}
   * ${spec.url}
   */

  ${_.map(elements, ({ name, href, interface: _interface }) => `
  /** ${href} */
  '${name}': ${_interface ?? v.defaultInterface},`).join('\n')}
  `).join('\n\n')}
};
`).join('\n')}`);