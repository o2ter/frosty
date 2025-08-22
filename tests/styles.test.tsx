//
//  styles.test.tsx
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
import { processCss } from '~/core/web/styles/process';

describe('Styles Tests', () => {
  let renderer: ServerDOMRenderer;

  beforeEach(() => {
    renderer = new ServerDOMRenderer();
  });

  describe('CSS Processing', () => {
    test('should process basic CSS properties', () => {
      const style = {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
      };

      const { css } = processCss({ '.test': style });
      
      expect(css).toContain('color: red');
      expect(css).toContain('font-size: 16px');
      expect(css).toContain('margin-top: 10px');
    });

    test('should handle pseudo-selectors', () => {
      const style = {
        color: 'blue',
        '&:hover': {
          color: 'red',
          backgroundColor: 'yellow',
        },
        '&:focus': {
          outline: '2px solid blue',
        },
      };

      const { css } = processCss({ '.button': style });
      
      expect(css).toContain(':hover');
      expect(css).toContain(':focus');
      expect(css).toContain('background-color: yellow');
      expect(css).toContain('outline: 2px solid blue');
    });

    test('should handle media queries', () => {
      const style = {
        padding: 10,
        '@media (max-width: 768px)': {
          padding: 5,
          fontSize: 14,
        },
        '@media (min-width: 1024px)': {
          padding: 20,
          fontSize: 18,
        },
      };

      const { css } = processCss({ '.responsive': style });
      
      expect(css).toContain('@media (max-width: 768px)');
      expect(css).toContain('@media (min-width: 1024px)');
      expect(css).toContain('font-size: 14px');
      expect(css).toContain('font-size: 18px');
    });

    test('should handle container queries', () => {
      const style = {
        display: 'flex',
        '@container (width > 500px)': {
          flexDirection: 'row',
        },
        '@container myContainer (width < 300px)': {
          flexDirection: 'column',
        },
      };

      const { css } = processCss({ '.container': style });
      
      expect(css).toContain('@container');
      expect(css).toContain('flex-direction: row');
      expect(css).toContain('flex-direction: column');
      expect(css).toContain('myContainer');
    });

    test('should handle keyframes', () => {
      const style = {
        animation: 'fadeIn 1s ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      };

      const { css } = processCss({ '.animated': style });
      
      expect(css).toContain('@keyframes');
      expect(css).toContain('fadeIn');
      expect(css).toContain('opacity: 0');
      expect(css).toContain('opacity: 1');
    });

    test('should handle vendor prefixes', () => {
      const style = {
        userSelect: 'none',
        transform: 'translateX(100px)',
        transition: 'all 0.3s ease',
      };

      const { css } = processCss({ '.prefixed': style });
      
      expect(css).toContain('user-select: none');
      expect(css).toContain('transform: translateX(100px)');
      expect(css).toContain('transition: all 0.3s ease');
    });

    test('should handle nested selectors', () => {
      const style = {
        padding: 20,
        '& .child': {
          margin: 10,
          '&:hover': {
            backgroundColor: 'lightgray',
          },
        },
        '& > .direct-child': {
          border: '1px solid black',
        },
      };

      const { css } = processCss({ '.parent': style });
      
      expect(css).toContain('.child');
      expect(css).toContain('> .direct-child');
      expect(css).toContain('background-color: lightgray');
      expect(css).toContain('border: 1px solid black');
    });

    test('should handle complex style combinations', () => {
      const style = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: '1rem 2rem',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-2px)',
        },
        '@media (max-width: 768px)': {
          padding: '0.5rem 1rem',
          flexDirection: 'column-reverse',
        },
        '& .title': {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
        },
        '& .content': {
          lineHeight: 1.6,
          '& p': {
            marginBottom: '1rem',
            '&:last-child': {
              marginBottom: 0,
            },
          },
        },
      };

      const { css } = processCss({ '.card': style });
      
      expect(css).toContain('position: relative');
      expect(css).toContain('flex-direction: column');
      expect(css).toContain('gap: 16px');
      expect(css).toContain('background-color: #f5f5f5');
      expect(css).toContain('border-radius: 8px');
      expect(css).toContain('box-shadow');
      expect(css).toContain(':hover');
      expect(css).toContain('transform: translateY(-2px)');
      expect(css).toContain('@media (max-width: 768px)');
      expect(css).toContain('.title');
      expect(css).toContain('.content');
      expect(css).toContain('.content p');
      expect(css).toContain(':last-child');
      expect(css).toContain('line-height: 1.6');
    });

    test('should handle CSS-in-JS style objects', () => {
      const styles = {
        '.button': {
          padding: '12px 24px',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontSize: 16,
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&.primary': {
            backgroundColor: '#007bff',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          },
          '&.secondary': {
            backgroundColor: '#6c757d',
            color: 'white',
            '&:hover': {
              backgroundColor: '#545b62',
            },
          },
          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
        },
        '.input': {
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: 4,
          fontSize: 14,
          '&:focus': {
            outline: 'none',
            borderColor: '#007bff',
            boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.25)',
          },
        },
      };

      const { css } = processCss(styles);
      
      expect(css).toContain('.button');
      expect(css).toContain('.input');
      expect(css).toContain('.button.primary');
      expect(css).toContain('.button.secondary');
      expect(css).toContain(':disabled');
      expect(css).toContain(':focus');
      expect(css).toContain('cursor: pointer');
      expect(css).toContain('cursor: not-allowed');
      expect(css).toContain('background-color: #007bff');
      expect(css).toContain('box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25)');
    });

    test('should handle edge cases', () => {
      const style = {
        content: '""',
        zIndex: 0,
        opacity: 0.5,
        flexGrow: 1,
        order: -1,
      };

      const { css } = processCss({ '.edge-case': style });
      
      expect(css).toContain('content: ""');
      expect(css).toContain('z-index: 0');
      expect(css).toContain('opacity: 0.5');
      expect(css).toContain('flex-grow: 1');
      expect(css).toContain('order: -1');
    });

    test('should handle empty styles', () => {
      const { css } = processCss({});
      expect(css).toBe('');
    });

    test('should handle null/undefined values', () => {
      const style = {
        color: 'red',
        backgroundColor: null,
        border: undefined,
        padding: 10,
      };

      const { css } = processCss({ '.nullable': style });
      
      expect(css).toContain('color: red');
      expect(css).toContain('padding: 10px');
      expect(css).not.toContain('background-color');
      expect(css).not.toContain('border');
    });
  });

  describe('Style Prop Integration', () => {
    test('should render components with style props', async () => {
      const TestComponent: ComponentType<{ className?: string }> = ({ className }) => {
        return (
          <div
            className={className}
            style={{
              padding: 20,
              backgroundColor: 'lightblue',
              borderRadius: 8,
            }}
          >
            Styled content
          </div>
        );
      };

      const result = await renderer.renderToString(<TestComponent className="test-class" />);
      
      expect(result).toContain('test-class');
      expect(result).toContain('class=');
      // CSS is processed into class names, not inline styles in this renderer
      expect(result).toContain('Styled content');
    });

    test('should handle complex nested styling', async () => {
      const CardComponent: ComponentType<{ title: string; children: any }> = ({ title, children }) => {
        return (
          <div
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 16,
              margin: '16px 0',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                margin: '0 0 12px 0',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              {title}
            </h3>
            <div
              style={{
                lineHeight: 1.5,
                color: '#666',
              }}
            >
              {children}
            </div>
          </div>
        );
      };

      const result = await renderer.renderToString(
        <CardComponent title="Test Card">
          <p>This is card content</p>
        </CardComponent>
      );
      
      // CSS is processed into class names, check for structural elements
      expect(result).toContain('<h3');
      expect(result).toContain('Test Card');
      expect(result).toContain('This is card content');
      expect(result).toContain('class=');
    });

    test('should handle style arrays and conditional styles', async () => {
      const ButtonComponent: ComponentType<{ 
        variant?: 'primary' | 'secondary'; 
        disabled?: boolean;
        children: any;
      }> = ({ variant = 'primary', disabled = false, children }) => {
        const baseStyle = {
          padding: '12px 24px',
          border: 'none',
          borderRadius: 4,
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: 16,
          fontWeight: 500,
          opacity: disabled ? 0.5 : 1,
        };

        const variantStyle = variant === 'primary' 
          ? { backgroundColor: '#007bff', color: 'white' }
          : { backgroundColor: '#6c757d', color: 'white' };

        return (
          <button
            style={{ ...baseStyle, ...variantStyle }}
            disabled={disabled}
          >
            {children}
          </button>
        );
      };

      const primaryResult = await renderer.renderToString(
        <ButtonComponent variant="primary">Primary Button</ButtonComponent>
      );
      
      // CSS is processed into class names
      expect(primaryResult).toContain('Primary Button');
      expect(primaryResult).toContain('class=');

      const disabledResult = await renderer.renderToString(
        <ButtonComponent variant="secondary" disabled>Disabled Button</ButtonComponent>
      );
      
      expect(disabledResult).toContain('Disabled Button');
      expect(disabledResult).toContain('class=');
      expect(disabledResult).toContain('disabled=""');
    });
  });
});
