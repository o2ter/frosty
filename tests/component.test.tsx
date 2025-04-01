//
//  component.test.ts
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

import { expect, test } from '@jest/globals';
import { ComponentType, ComponentNode, ErrorBoundary, createContext, PropsProvider } from '~/index';
import { ServerDOMRenderer } from '~/renderer/server-dom';

const TestComponent: ComponentType = () => {
  return <></>;
}

const TestErrorComponent: ComponentType = () => {
  throw Error('error');
}

const TestContext = createContext(0);

test('test create html element', async () => {

  const element = <span />;

  expect(element).toBeInstanceOf(ComponentNode);
  expect(element.type).toBe('span');
});

test('test create component element', async () => {

  const element = <TestComponent />;

  expect(element).toBeInstanceOf(ComponentNode);
  expect(element.type).toBe(TestComponent);

});

test('test create component element with key', async () => {

  const element = <TestComponent key='test' />;

  expect(element).toBeInstanceOf(ComponentNode);
  expect(element.type).toBe(TestComponent);
  expect(element.key).toBe('test');

});

test('test with error', async () => {

  let error;

  const element = (
    <ErrorBoundary silent onError={(e) => { error = e; }}>
      <TestErrorComponent />
    </ErrorBoundary>
  );

  const renderer = new ServerDOMRenderer();
  renderer.renderToString(element);

  expect(error).toBeInstanceOf(Error);
  
});

test('test context', async () => {

  const element = <div>
    <TestContext.Consumer>
      {(value) => (
        <span>{value}</span>
      )}
    </TestContext.Consumer>
    <TestContext value={1}>
      <TestContext.Consumer>
        {(value) => (
          <span>{value}</span>
        )}
      </TestContext.Consumer>
      <TestContext value={2}>
        <TestContext.Consumer>
          {(value) => (
            <span>{value}</span>
          )}
        </TestContext.Consumer>
        <TestContext value={3}>
          {(value) => (
            <span>{value}</span>
          )}
        </TestContext>
      </TestContext>
    </TestContext>
  </div>;

  const renderer = new ServerDOMRenderer();
  const result = renderer.renderToString(element);

  expect(result).toBe('<div><span>0</span><span>1</span><span>2</span><span>3</span></div>');

});

test('test render html', async () => {

  const app = (
    <html>
      <head>
        <script src="/main_bundle.js" defer />
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  );
  const renderer = new ServerDOMRenderer();
  const result = renderer.renderToString(app);

  expect(result).toBe('<!DOCTYPE html><html><head><script src=\"/main_bundle.js\" defer=\"\"></script></head><body><div id=\"root\"></div></body></html>');

});

test('test with props modify', async () => {

  const app = (
    <PropsProvider
      callback={({ type, props }) => ({ ...props, 'data-test': 0 })}
    >
      <html>
        <head>
          <script src="/main_bundle.js" defer />
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    </PropsProvider>
  );
  const renderer = new ServerDOMRenderer();
  const result = renderer.renderToString(app);

  expect(result).toBe('<!DOCTYPE html><html><head><script src="/main_bundle.js" defer="" data-test="0"></script></head><body><div id="root" data-test="0"></div></body></html>');

});
