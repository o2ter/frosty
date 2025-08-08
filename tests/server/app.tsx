//
//  app.tsx
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
import { useState, useEffect, useRenderResource } from '~/index';
import { useLocation, useSearchParams } from '~/web';

export default () => {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [text, setText] = useState('');
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(location)
  useEffect(() => {
    const handle = setInterval(() => { setCounter(v => v + 1); }, 1);
    return () => clearTimeout(handle);
  }, []);
  useRenderResource(async () => {
    console.log('hello')
    await new Promise(res => setTimeout(res, 1000));
  }, []);
  return (
    <div
      style={{
        padding: 64,
        margin: 16,
        backgroundColor: `rgb(${counter % 256}, 0, 0)`,
      }}
      inlineStyle={{
        padding: 32,
        margin: 16,
      }}
    >
      <table bgColor='aliceblue'>
        {_.map(_.range(2), i => <tr>
          {_.map(_.range(2), j => <td>{i * counter + j}</td>)}
        </tr>
        )}
      </table>
      <div innerHTML={`<span>${counter}</span>`} />
      <button onClick={() => setCounter2(v => v + 1)}>Click</button>
      <button onClick={() => setSearchParams(v => {
        v.set('test', `${counter}`);
        return v;
      })}>Click2</button>
      <span>{counter2}</span>
      <input value={text} onInput={(e) => {
        setText(e.currentTarget.value);
      }} />
      <input value={text} onInput={(e) => {
        setText(e.currentTarget.value);
      }} />
    </div>
  );
};
