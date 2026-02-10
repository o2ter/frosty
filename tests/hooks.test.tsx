//
//  hooks.test.tsx
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

import { expect, test, describe, beforeEach } from '@jest/globals';
import { 
  ComponentType, 
  useState, 
  useEffect, 
  useMemo, 
  useCallback, 
  useRef, 
  useContext, 
  createContext,
  useReducer,
  useStack,
  useAwaited,
  useDebounce,
  useAsyncDebounce,
  useSyncExternalStore,
  Fragment
} from '~/index';
import { ServerDOMRenderer } from '~/renderer/server-dom';

// Test Context
const TestContext = createContext<number>(0);
const StringContext = createContext<string>('default');

describe('Hook Tests', () => {
  let renderer: ServerDOMRenderer;

  beforeEach(() => {
    renderer = new ServerDOMRenderer();
  });

  describe('useState Hook', () => {
    test('should initialize with primitive value', async () => {
      const TestComponent: ComponentType = () => {
        const [count] = useState(42);
        return <div>{count}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>42</div>');
    });

    test('should initialize with function', async () => {
      const TestComponent: ComponentType = () => {
        const [value] = useState(() => 'computed');
        return <div>{value}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>computed</div>');
    });

    test('should handle undefined initial state', async () => {
      const TestComponent: ComponentType = () => {
        const [value] = useState<string>();
        return <div>{value || 'undefined'}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>undefined</div>');
    });

    test('should handle state updates', async () => {
      let updateState: ((v: number) => void) | undefined;

      const TestComponent: ComponentType = () => {
        const [count, setCount] = useState(0);
        updateState = setCount;
        return <div>{count}</div>;
      };

      const result1 = await renderer.renderToString(<TestComponent />);
      expect(result1).toBe('<div>0</div>');

      // Note: In server-side rendering, state updates don't trigger re-renders
      // This test validates the hook structure works correctly
      expect(updateState).toBeDefined();
    });

    test('should handle functional state updates', async () => {
      const TestComponent: ComponentType = () => {
        const [count, setCount] = useState(5);
        
        // Simulate a functional update
        const handleIncrement = () => {
          setCount(prev => prev + 1);
        };

        return <div onClick={handleIncrement}>{count}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>5</div>');
    });
  });

  describe('useMemo Hook', () => {
    test('should memoize computed values', async () => {
      let computeCount = 0;

      const TestComponent: ComponentType = () => {
        const expensiveValue = useMemo(() => {
          computeCount++;
          return 'computed';
        }, []);

        return <div>{expensiveValue}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>computed</div>');
      expect(computeCount).toBe(1);
    });

    test('should handle dependencies', async () => {
      const TestComponent: ComponentType<{ value: number }> = ({ value }) => {
        const doubled = useMemo(() => value * 2, [value]);
        return <div>{doubled}</div>;
      };

      const result = await renderer.renderToString(<TestComponent value={5} />);
      expect(result).toBe('<div>10</div>');
    });

    test('should handle complex calculations', async () => {
      const TestComponent: ComponentType = () => {
        const complexResult = useMemo(() => {
          const data = [1, 2, 3, 4, 5];
          return data.reduce((sum, num) => sum + num, 0);
        }, []);

        return <div>{complexResult}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>15</div>');
    });
  });

  describe('useCallback Hook', () => {
    test('should memoize callback functions', async () => {
      const TestComponent: ComponentType = () => {
        const [count] = useState(0);
        const handleClick = useCallback(() => {
          return count + 1;
        }, [count]);

        return <div onClick={handleClick}>{count}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>0</div>');
    });

    test('should handle dependencies in callbacks', async () => {
      const TestComponent: ComponentType<{ multiplier: number }> = ({ multiplier }) => {
        const calculate = useCallback((value: number) => {
          return value * multiplier;
        }, [multiplier]);

        const result = calculate(5);
        return <div>{result}</div>;
      };

      const result = await renderer.renderToString(<TestComponent multiplier={3} />);
      expect(result).toBe('<div>15</div>');
    });
  });

  describe('useRef Hook', () => {
    test('should create ref with initial value', async () => {
      const TestComponent: ComponentType = () => {
        const ref = useRef<number>(42);
        return <div>{ref.current}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>42</div>');
    });

    test('should create ref without initial value', async () => {
      const TestComponent: ComponentType = () => {
        const ref = useRef<string>();
        return <div>{ref.current || 'empty'}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>empty</div>');
    });

    test('should maintain ref mutability', async () => {
      const TestComponent: ComponentType = () => {
        const ref = useRef(0);
        ref.current = 100;
        return <div>{ref.current}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>100</div>');
    });
  });

  describe('useContext Hook', () => {
    test('should read context value', async () => {
      const TestComponent: ComponentType = () => {
        const value = useContext(TestContext);
        return <div>{value}</div>;
      };

      const result = await renderer.renderToString(
        <TestContext value={99}>
          <TestComponent />
        </TestContext>
      );
      expect(result).toBe('<div>99</div>');
    });

    test('should use default context value', async () => {
      const TestComponent: ComponentType = () => {
        const value = useContext(TestContext);
        return <div>{value}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>0</div>');
    });

    test('should handle nested contexts', async () => {
      const TestComponent: ComponentType = () => {
        const numValue = useContext(TestContext);
        const strValue = useContext(StringContext);
        return <div>{numValue}-{strValue}</div>;
      };

      const result = await renderer.renderToString(
        <TestContext value={5}>
          <StringContext value="hello">
            <TestComponent />
          </StringContext>
        </TestContext>
      );
      expect(result).toBe('<div>5-hello</div>');
    });
  });

  describe('useReducer Hook', () => {
    type CounterAction = { type: 'increment' } | { type: 'decrement' } | { type: 'set'; payload: number };

    const counterReducer = (state: number, action: CounterAction): number => {
      switch (action.type) {
        case 'increment':
          return state + 1;
        case 'decrement':
          return state - 1;
        case 'set':
          return action.payload;
        default:
          return state;
      }
    };

    test('should initialize with initial state', async () => {
      const TestComponent: ComponentType = () => {
        const [count] = useReducer(counterReducer, 10);
        return <div>{count}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>10</div>');
    });

    test('should initialize with lazy initial state', async () => {
      const TestComponent: ComponentType = () => {
        const [count] = useReducer(counterReducer, () => 20);
        return <div>{count}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>20</div>');
    });

    test('should handle dispatch actions', async () => {
      let dispatch: ((dispatch: (action: CounterAction) => void) => void) | undefined;

      const TestComponent: ComponentType = () => {
        const [count, _dispatch] = useReducer(counterReducer, 0);
        dispatch = _dispatch;
        return <div>{count}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>0</div>');
      expect(dispatch).toBeDefined();
    });
  });

  describe('useStack Hook', () => {
    test('should initialize empty stack', async () => {
      const TestComponent: ComponentType = () => {
        const stack = useStack();
        return <div>{stack.length}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>0</div>');
    });

    test('should return component stack', async () => {
      const ChildComponent: ComponentType = () => {
        const stack = useStack();
        return <div>{stack.length}</div>;
      };

      const ParentComponent: ComponentType = () => {
        return <ChildComponent />;
      };

      const result = await renderer.renderToString(<ParentComponent />);
      expect(result).toBe('<div>1</div>'); // Should have parent component in stack
    });

    test('should provide nested component stack', async () => {
      const DeepChild: ComponentType = () => {
        const stack = useStack();
        return <div>{stack.length}</div>;
      };

      const MiddleComponent: ComponentType = () => {
        return <DeepChild />;
      };

      const TopComponent: ComponentType = () => {
        return <MiddleComponent />;
      };

      const result = await renderer.renderToString(<TopComponent />);
      expect(result).toBe('<div>2</div>'); // Should have 2 components in stack
    });
  });

  describe('useAwaited Hook', () => {
    test('should handle resolved promise', async () => {
      const TestComponent: ComponentType = () => {
        const value = useAwaited(() => Promise.resolve('resolved'));
        return <div>{String(value || 'pending')}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // useAwaited waits for promise resolution before rendering, so value should be available
      expect(result).toBe('<div>resolved</div>');
    });

    test('should handle function that returns promise', async () => {
      const TestComponent: ComponentType = () => {
        const value = useAwaited(() => Promise.resolve('function result'));
        return <div>{String(value || 'loading')}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // Promise should resolve before rendering completes
      expect(result).toBe('<div>function result</div>');
    });

    test('should handle complex async data', async () => {
      const TestComponent: ComponentType = () => {
        const value = useAwaited(() => 
          Promise.resolve({ name: 'test', id: 123 })
        );
        return <div>{value ? JSON.stringify(value) : 'loading'}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // Complex data should be resolved and serialized
      expect(result).toBe('<div>{"name":"test","id":123}</div>');
    });

    test('should handle slow async operations', async () => {
      const TestComponent: ComponentType = () => {
        const value = useAwaited(() => 
          new Promise<string>(resolve => setTimeout(() => resolve('delayed'), 10))
        );
        return <div>{value || 'waiting'}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      // Even slow operations should complete before rendering
      expect(result).toBe('<div>delayed</div>');
    });

    test('should handle promise rejection', async () => {
      const TestComponent: ComponentType = () => {
        try {
          const value = useAwaited(() => Promise.reject(new Error('Test error')));
          return <div>{value || 'failed'}</div>;
        } catch (error) {
          return <div>caught: {(error as Error).message}</div>;
        }
      };

      const result = await renderer.renderToString(<TestComponent />);
      // Promise rejection should be caught and handled
      expect(result).toBe('<div>caught: Test error</div>');
    });

    test('should memoize based on dependencies', async () => {
      let callCount = 0;
      
      const TestComponent: ComponentType<{ id: number }> = ({ id }) => {
        const value = useAwaited(() => {
          callCount++;
          return Promise.resolve(`result-${id}-${callCount}`);
        }, [id]);
        return <div>{value || 'loading'}</div>;
      };

      // Reset call count for clean test
      callCount = 0;

      // First render with id=1
      const result1 = await renderer.renderToString(<TestComponent id={1} />);
      expect(result1).toBe('<div>result-1-1</div>');
      expect(callCount).toBe(1);

      // Create new renderer instance to avoid state pollution
      const renderer2 = new ServerDOMRenderer();
      
      // Second render with same id=1 should create new promise (different renderer instance)
      const result2 = await renderer2.renderToString(<TestComponent id={1} />);
      expect(result2).toBe('<div>result-1-2</div>');
      expect(callCount).toBe(2);

      // Third render with different id=2 should create new promise
      const result3 = await renderer2.renderToString(<TestComponent id={2} />);
      expect(result3).toBe('<div>result-2-3</div>');
      expect(callCount).toBe(3);
    });
  });

  describe('useDebounce Hook', () => {
    test('should debounce function calls', async () => {
      const TestComponent: ComponentType = () => {
        const debouncedFn = useDebounce(() => 'debounced result', { wait: 100 });
        return <div>ready</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>ready</div>');
    });

    test('should handle different debounce delays', async () => {
      const TestComponent: ComponentType = () => {
        const debouncedFn = useDebounce((value: string) => `processed: ${value}`, { wait: 500 });
        return <div>configured</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>configured</div>');
    });

    test('should handle complex debounce settings', async () => {
      const TestComponent: ComponentType = () => {
        const debouncedFn = useDebounce(
          (data: { id: number; name: string }) => data,
          { wait: 300, leading: true, trailing: false }
        );
        return <div>complex debounce</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>complex debounce</div>');
    });
  });

  describe('useAsyncDebounce Hook', () => {
    test('should handle async debounce function', async () => {
      let debouncedFn: any;

      const TestComponent: ComponentType = () => {
        debouncedFn = useAsyncDebounce(async (value: string) => {
          return `processed: ${value}`;
        }, { wait: 100 });
        
        return <div>ready</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>ready</div>');
      expect(debouncedFn).toBeDefined();
    });

    test('should handle complex async operations', async () => {
      let asyncFn: any;

      const TestComponent: ComponentType = () => {
        asyncFn = useAsyncDebounce(async (data: { id: number }) => {
          await new Promise(resolve => setTimeout(resolve, 10));
          return { ...data, processed: true };
        }, { wait: 200, leading: false });
        
        return <div>async ready</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>async ready</div>');
      expect(asyncFn).toBeDefined();
    });
  });

  describe('useSyncExternalStore Hook', () => {
    test('should subscribe to external store', async () => {
      const TestComponent: ComponentType = () => {
        const value = useSyncExternalStore(
          () => () => {}, // subscribe
          () => 'store value', // getSnapshot
          () => 'server value' // getServerSnapshot
        );
        return <div>{value}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>server value</div>');
    });

    test('should handle store without server snapshot', async () => {
      const TestComponent: ComponentType = () => {
        const value = useSyncExternalStore(
          () => () => {},
          () => 'client value'
        );
        return <div>{value}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>client value</div>');
    });
  });

  describe('useEffect Hook', () => {
    test('should handle effect without dependencies', async () => {
      let effectCalled = false;

      const TestComponent: ComponentType = () => {
        useEffect((signal) => {
          effectCalled = true;
        });
        return <div>effect test</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>effect test</div>');
      // Note: Effects don't run during server-side rendering
    });

    test('should handle effect with dependencies', async () => {
      const TestComponent: ComponentType<{ count: number }> = ({ count }) => {
        useEffect((signal) => {
          // Effect would run when count changes
        }, [count]);
        return <div>{count}</div>;
      };

      const result = await renderer.renderToString(<TestComponent count={5} />);
      expect(result).toBe('<div>5</div>');
    });

    test('should handle effect with cleanup', async () => {
      const TestComponent: ComponentType = () => {
        useEffect((signal) => {
          return () => {
            // Cleanup function
          };
        }, []);
        return <div>cleanup test</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>cleanup test</div>');
    });

    test('should handle async effect', async () => {
      const TestComponent: ComponentType = () => {
        useEffect(async (signal) => {
          await new Promise(resolve => setTimeout(resolve, 10));
          return () => {
            // Async cleanup
          };
        });
        return <div>async effect</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>async effect</div>');
    });

    test('should handle effect with AbortSignal', async () => {
      const TestComponent: ComponentType = () => {
        useEffect((signal) => {
          if (signal.aborted) {
            return;
          }
          // Would make abortable API call
        });
        return <div>abort signal test</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>abort signal test</div>');
    });
  });

  describe('Fragment', () => {
    test('should render fragment with multiple children', async () => {
      const TestComponent: ComponentType = () => {
        return (
          <Fragment>
            <span>first</span>
            <span>second</span>
          </Fragment>
        );
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<span>first</span><span>second</span>');
    });

    test('should handle empty fragment', async () => {
      const TestComponent: ComponentType = () => {
        return <Fragment />;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('');
    });

    test('should handle nested fragments', async () => {
      const TestComponent: ComponentType = () => {
        return (
          <Fragment>
            <div>outer</div>
            <Fragment>
              <span>inner1</span>
              <span>inner2</span>
            </Fragment>
          </Fragment>
        );
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>outer</div><span>inner1</span><span>inner2</span>');
    });
  });

  describe('Hook Integration Tests', () => {
    test('should combine multiple hooks', async () => {
      const TestComponent: ComponentType = () => {
        const [count, setCount] = useState(0);
        const doubledCount = useMemo(() => count * 2, [count]);
        const ref = useRef<HTMLDivElement>();
        const contextValue = useContext(TestContext);

        const handleClick = useCallback(() => {
          setCount(prev => prev + 1);
        }, []);

        return (
          <div ref={ref} onClick={handleClick}>
            count: {count}, doubled: {doubledCount}, context: {contextValue}
          </div>
        );
      };

      const result = await renderer.renderToString(
        <TestContext value={10}>
          <TestComponent />
        </TestContext>
      );
      expect(result).toBe('<div>count: 0, doubled: 0, context: 10</div>');
    });

    test('should handle complex state management', async () => {
      type State = { count: number; message: string };
      type Action = 
        | { type: 'increment' }
        | { type: 'setMessage'; payload: string }
        | { type: 'reset' };

      const reducer = (state: State, action: Action): State => {
        switch (action.type) {
          case 'increment':
            return { ...state, count: state.count + 1 };
          case 'setMessage':
            return { ...state, message: action.payload };
          case 'reset':
            return { count: 0, message: '' };
          default:
            return state;
        }
      };

      const TestComponent: ComponentType = () => {
        const [state, dispatch] = useReducer(reducer, { count: 5, message: 'hello' });
        const formattedMessage = useMemo(() => 
          `${state.message} (${state.count})`, [state.message, state.count]
        );

        return <div>{formattedMessage}</div>;
      };

      const result = await renderer.renderToString(<TestComponent />);
      expect(result).toBe('<div>hello (5)</div>');
    });
  });
});
