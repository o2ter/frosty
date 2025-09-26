//
//  components.test.tsx
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

import { expect, test, describe, beforeEach } from '@jest/globals';
import { ComponentType, ComponentNode, ErrorBoundary, createContext, PropsProvider, createPairs, PropsWithChildren } from '~/index';
import { ServerDOMRenderer } from '~/renderer/server-dom';

// Test Components
const TestComponent: ComponentType = () => {
  return <></>;
};

const TestErrorComponent: ComponentType = () => {
  throw new Error('Test error');
};

const TestContext = createContext(0);

const Pairs = createPairs({ allowTextChildren: true });

const TestPairs: ComponentType<PropsWithChildren<{}>> = ({ children }) => (
  <Pairs.Child>
    <div>
      <Pairs.Parent>{children}</Pairs.Parent>
    </div>
  </Pairs.Child>
);

describe('Component Tests', () => {
  let renderer: ServerDOMRenderer;

  beforeEach(() => {
    renderer = new ServerDOMRenderer();
  });

  describe('Element Creation', () => {
    test('should create HTML elements', () => {
      const element = <span />;

      expect(element).toBeInstanceOf(ComponentNode);
      expect(element.type).toBe('span');
    });

    test('should create component elements', () => {
      const element = <TestComponent />;

      expect(element).toBeInstanceOf(ComponentNode);
      expect(element.type).toBe(TestComponent);
    });

    test('should create component elements with keys', () => {
      const element = <TestComponent key="test" />;

      expect(element).toBeInstanceOf(ComponentNode);
      expect(element.type).toBe(TestComponent);
      expect(element.key).toBe('test');
    });

    test('should create component elements with paired children', async () => {
      const element = (
        <TestPairs>
          This should be shown
          <span>This should not shown</span>
          <TestPairs>
            This should also be shown
          </TestPairs>
        </TestPairs>
      );

      const result = await renderer.renderToString(element);

      expect(result).toBe('<div>This should be shown<div>This should also be shown</div></div>');
    });
  });

  describe('Error Handling', () => {
    test('should handle component errors with error boundary', async () => {
      let caughtError: Error | undefined;

      const element = (
        <ErrorBoundary
          silent
          onError={(error) => { caughtError = error; }}
        >
          <TestErrorComponent />
        </ErrorBoundary>
      );

      await renderer.renderToString(element);

      expect(caughtError).toBeInstanceOf(Error);
      expect(caughtError?.message).toBe('Test error');
    });
  });

  describe('Context API', () => {
    test('should handle context providers and consumers', async () => {
      const element = (
        <div>
          <TestContext.Consumer>
            {(value) => <span>{value}</span>}
          </TestContext.Consumer>
          <TestContext value={1}>
            <TestContext.Consumer>
              {(value) => <span>{value}</span>}
            </TestContext.Consumer>
            <TestContext value={2}>
              <TestContext.Consumer>
                {(value) => <span>{value}</span>}
              </TestContext.Consumer>
              <TestContext value={3}>
                {(value) => <span>{value}</span>}
              </TestContext>
            </TestContext>
          </TestContext>
        </div>
      );

      const result = await renderer.renderToString(element);

      expect(result).toBe('<div><span>0</span><span>1</span><span>2</span><span>3</span></div>');
    });
  });

  describe('HTML Document Rendering', () => {
    test('should render complete HTML documents', async () => {
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

      const result = await renderer.renderToString(app);

      expect(result).toBe('<!DOCTYPE html><html><head><script src="/main_bundle.js" defer=""></script></head><body><div id="root"></div></body></html>');
    });
  });

  describe('Props Provider', () => {
    test('should modify props through providers', async () => {
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

      const result = await renderer.renderToString(app);

      expect(result).toBe('<!DOCTYPE html><html><head><script src="/main_bundle.js" defer="" data-test="0"></script></head><body><div id="root" data-test="0"></div></body></html>');
    });
  });
});
