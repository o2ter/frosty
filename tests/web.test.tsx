//
//  web.test.tsx
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
import { ComponentType } from '~/index';
import { ServerDOMRenderer } from '~/renderer/server-dom';

describe('Web API Tests', () => {
  let renderer: ServerDOMRenderer;

  beforeEach(() => {
    renderer = new ServerDOMRenderer();
  });

  describe('Storage Hooks', () => {
    test('should handle localStorage operations in server environment', async () => {
      const { useLocalStorage } = await import('~/web/storage');

      const TestComponent: ComponentType = () => {
        const [value, setValue] = useLocalStorage('test-key', 'default');
        return <div data-value={value || ''}>localStorage test</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toContain('localStorage test');
      // In server environment, should use default value
      expect(result).toContain('data-value="default"');
    });

    test('should handle sessionStorage operations in server environment', async () => {
      const { useSessionStorage } = await import('~/web/storage');

      const TestComponent: ComponentType = () => {
        const [value, setValue] = useSessionStorage('session-key', 'session-default');
        return <div data-value={value || ''}>sessionStorage test</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toContain('sessionStorage test');
      // In server environment, should use default value
      expect(result).toContain('data-value="session-default"');
    });

    test('should handle storage with null initial value in server environment', async () => {
      const { useLocalStorage } = await import('~/web/storage');

      const TestComponent: ComponentType = () => {
        const [value] = useLocalStorage('null-key');
        return <div>{value === null ? 'null' : String(value)}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>null</div>');
    });
  });

  describe('Document and Window Hooks', () => {
    test('should handle document operations in server environment', async () => {
      const { useDocument } = await import('~/web/document');

      const TestComponent: ComponentType = () => {
        const doc = useDocument();
        return <div>document: {typeof doc}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // In server environment, document should be available as server implementation
      expect(result).toBe('<div>document: object</div>');
    });

    test('should handle window operations in server environment', async () => {
      const { useWindow } = await import('~/web/window');

      const TestComponent: ComponentType = () => {
        const win = useWindow();
        return <div>window: {typeof win}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // In server environment, window should be available as server implementation
      expect(result).toBe('<div>window: object</div>');
    });

    test('should handle window metrics in server environment', async () => {
      const { useWindowMetrics } = await import('~/web/window');

      const TestComponent: ComponentType = () => {
        const metrics = useWindowMetrics();
        return <div>metrics: {typeof metrics}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // In server environment, metrics should be available
      expect(result).toBe('<div>metrics: object</div>');
    });

    test('should handle window scroll in server environment', async () => {
      const { useWindowScroll } = await import('~/web/window');

      const TestComponent: ComponentType = () => {
        const scroll = useWindowScroll();
        return <div>scroll: {typeof scroll}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // In server environment, scroll should be available
      expect(result).toBe('<div>scroll: object</div>');
    });
  });

  describe('Location Hooks', () => {
    test('should handle location operations in server environment', async () => {
      const { useLocation } = await import('~/web/location');

      const TestComponent: ComponentType = () => {
        const location = useLocation();
        return <div>location: {location?.hostname || ''}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // In server environment, location should be undefined
      expect(result).toBe('<div>location: </div>');
    });

    test('should handle search params in server environment', async () => {
      const { useSearchParams } = await import('~/web/location');

      const TestComponent: ComponentType = () => {
        const [searchParams] = useSearchParams();
        return <div>param: {searchParams?.get?.('test') || 'none'}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // In server environment, search params should be undefined/none
      expect(result).toBe('<div>param: none</div>');
    });
  });

  describe('Observer Hooks', () => {
    test('should handle intersection observer in server environment', async () => {
      const { useIntersectionObserver } = await import('~/web/observer');

      const TestComponent: ComponentType = () => {
        // In server environment, this should not break
        const observer = useIntersectionObserver(null, () => {});
        return <div>intersection observer: {typeof observer}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>intersection observer: undefined</div>');
    });

    test('should handle resize observer in server environment', async () => {
      const { useResizeObserver } = await import('~/web/observer');

      const TestComponent: ComponentType = () => {
        // In server environment, this should not break
        const observer = useResizeObserver(null, () => {});
        return <div>resize observer: {typeof observer}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>resize observer: undefined</div>');
    });

    test('should handle mutation observer in server environment', async () => {
      const { useMutationObserver } = await import('~/web/observer');

      const TestComponent: ComponentType = () => {
        // In server environment, this should not break
        const observer = useMutationObserver(null, () => {}, { childList: true });
        return <div>mutation observer: {typeof observer}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>mutation observer: undefined</div>');
    });

    test('should handle performance observer in server environment', async () => {
      const { usePerformanceObserver } = await import('~/web/observer');

      const TestComponent: ComponentType = () => {
        // In server environment, this should not break
        const observer = usePerformanceObserver(() => {}, { entryTypes: ['measure'] });
        return <div>performance observer: {typeof observer}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>performance observer: undefined</div>');
    });
  });

  describe('Visibility and Online Hooks', () => {
    test('should handle visibility state in server environment', async () => {
      const { useVisibility } = await import('~/web/visibility');

      const TestComponent: ComponentType = () => {
        const isVisible = useVisibility();
        return <div>visible: {String(isVisible)}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // In server environment, visibility should be unknown
      expect(result).toBe('<div>visible: unknown</div>');
    });

    test('should handle online state in server environment', async () => {
      const { useOnline } = await import('~/web/online');

      const TestComponent: ComponentType = () => {
        const isOnline = useOnline();
        return <div>online: {String(isOnline)}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // In server environment, online should be false
      expect(result).toBe('<div>online: false</div>');
    });
  });

  describe('Resource Hooks', () => {
    test('should handle server resources in server environment', async () => {
      const { useServerResource } = await import('~/web/server');

      const TestComponent: ComponentType = () => {
        const resource = useServerResource('test-key', () => JSON.stringify({ serverData: 'server resource' }));
        return <div>server resource: {resource ? 'loaded' : 'loading'}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>server resource: loaded</div>');
    });

    test('should handle server resource without factory in server environment', async () => {
      const { useServerResource } = await import('~/web/server');

      const TestComponent: ComponentType = () => {
        try {
          const resource = useServerResource('missing-key');
          return <div>resource: {resource || 'not found'}</div>;
        } catch (error) {
          return <div>resource: error</div>;
        }
      };

      const result = await renderer.renderToString(<TestComponent />);
      // Should handle error gracefully
      expect(result).toBe('<div>resource: error</div>');
    });
  });

  describe('Window API Tests', () => {
    test('should handle color scheme detection in server environment', async () => {
      const { useColorScheme } = await import('~/web/window');

      const TestComponent: ComponentType = () => {
        const scheme = useColorScheme();
        return <div>scheme: {scheme}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // In server environment, should default to light
      expect(result).toBe('<div>scheme: light</div>');
    });
  });

  describe('Integration Tests', () => {
    test('should combine multiple web APIs in server environment', async () => {
      const { useLocalStorage } = await import('~/web/storage');
      const { useWindow } = await import('~/web/window');
      const { useLocation } = await import('~/web/location');

      const TestComponent: ComponentType = () => {
        const [storageValue] = useLocalStorage('combo-key', 'default');
        const window = useWindow();
        const location = useLocation();

        return (
          <div>
            <span>storage: {storageValue}</span>
            <span>window: {typeof window}</span>
            <span>location: {location?.hostname || ''}</span>
          </div>
        );
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toContain('storage: default');
      expect(result).toContain('window: object');
      expect(result).toContain('location: ');
    });

    test('should handle complex state management with web APIs in server environment', async () => {
      const { useOnline } = await import('~/web/online');

      const TestComponent: ComponentType = () => {
        const isOnline = useOnline();
        const canSync = isOnline; // Simple logic

        return (
          <div>
            <span>can-sync: {String(canSync)}</span>
            <span>online: {String(isOnline)}</span>
          </div>
        );
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toContain('can-sync: false');
      expect(result).toContain('online: false');
    });
  });
});
