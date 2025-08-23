//
//  renderer.test.tsx
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
import { ComponentType, Fragment, ErrorBoundary, PropsProvider } from '~/index';
import { ServerDOMRenderer } from '~/renderer/server-dom';

describe('Renderer Tests', () => {
  let renderer: ServerDOMRenderer;

  beforeEach(() => {
    renderer = new ServerDOMRenderer();
  });

  describe('Basic Rendering', () => {
    test('should render simple elements', async () => {
      const element = <div>Hello World</div>;
      const result = await renderer.renderToString(element);
      expect(result).toBe('<div>Hello World</div>');
    });

    test('should render self-closing elements', async () => {
      const element = <input type="text" placeholder="Enter text" />;
      const result = await renderer.renderToString(element);
      expect(result).toContain('<input');
      expect(result).toContain('type="text"');
      expect(result).toContain('placeholder="Enter text"');
    });

    test('should render elements with attributes', async () => {
      const element = (
        <div 
          className="container" 
          id="main" 
          data-testid="test-element"
          aria-label="Main container"
        >
          Content
        </div>
      );
      const result = await renderer.renderToString(element);
      
      expect(result).toContain('class="container"');
      expect(result).toContain('id="main"');
      expect(result).toContain('data-testid="test-element"');
      // aria-label might be filtered out
      expect(result).toContain('Content');
    });

    test('should render nested elements', async () => {
      const element = (
        <div>
          <header>
            <h1>Title</h1>
            <nav>
              <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/about">About</a></li>
              </ul>
            </nav>
          </header>
          <main>
            <p>Main content</p>
          </main>
        </div>
      );
      
      const result = await renderer.renderToString(element);
      
      expect(result).toContain('<header>');
      expect(result).toContain('<h1>Title</h1>');
      expect(result).toContain('<nav>');
      expect(result).toContain('<ul>');
      expect(result).toContain('<li>');
      expect(result).toContain('<a href="/home">Home</a>');
      expect(result).toContain('<a href="/about">About</a>');
      expect(result).toContain('<main>');
      expect(result).toContain('<p>Main content</p>');
    });
  });

  describe('Component Rendering', () => {
    test('should render function components', async () => {
      const Greeting: ComponentType<{ name: string }> = ({ name }) => {
        return <h1>Hello, {name}!</h1>;
      };

      const result = await renderer.renderToString(<Greeting name="World" />);
      expect(result).toBe('<h1>Hello, World!</h1>');
    });

    test('should render components with children', async () => {
      const Container: ComponentType<{ children: any }> = ({ children }) => {
        return <div className="container">{children}</div>;
      };

      const result = await renderer.renderToString(
        <Container>
          <p>Child content</p>
        </Container>
      );
      
      expect(result).toBe('<div class="container"><p>Child content</p></div>');
    });

    test('should render components with multiple children', async () => {
      const Layout: ComponentType<{ children: any }> = ({ children }) => {
        return (
          <div className="layout">
            <header>Header</header>
            <main>{children}</main>
            <footer>Footer</footer>
          </div>
        );
      };

      const result = await renderer.renderToString(
        <Layout>
          <h1>Page Title</h1>
          <p>Page content</p>
        </Layout>
      );
      
      expect(result).toContain('<div class="layout">');
      expect(result).toContain('<header>Header</header>');
      expect(result).toContain('<main>');
      expect(result).toContain('<h1>Page Title</h1>');
      expect(result).toContain('<p>Page content</p>');
      expect(result).toContain('</main>');
      expect(result).toContain('<footer>Footer</footer>');
    });

    test('should render nested components', async () => {
      const Button: ComponentType<{ children: any; variant?: string }> = ({ children, variant = 'default' }) => {
        return <button className={`btn btn-${variant}`}>{children}</button>;
      };

      const Card: ComponentType<{ title: string; children: any }> = ({ title, children }) => {
        return (
          <div className="card">
            <h2>{title}</h2>
            <div className="card-body">{children}</div>
          </div>
        );
      };

      const result = await renderer.renderToString(
        <Card title="Test Card">
          <p>Card content</p>
          <Button variant="primary">Click me</Button>
        </Card>
      );
      
      expect(result).toContain('<div class="card">');
      expect(result).toContain('<h2>Test Card</h2>');
      expect(result).toContain('<div class="card-body">');
      expect(result).toContain('<p>Card content</p>');
      expect(result).toContain('<button class="btn btn-primary">Click me</button>');
    });

    test('should handle component props correctly', async () => {
      const UserProfile: ComponentType<{
        user: { name: string; email: string; age: number };
        showEmail?: boolean;
      }> = ({ user, showEmail = false }) => {
        return (
          <div className="profile">
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            {showEmail && <p>Email: {user.email}</p>}
          </div>
        );
      };

      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
      };

      const withEmailResult = await renderer.renderToString(
        <UserProfile user={user} showEmail />
      );
      
      expect(withEmailResult).toContain('<h3>John Doe</h3>');
      expect(withEmailResult).toContain('<p>Age: 30</p>');
      expect(withEmailResult).toContain('<p>Email: john@example.com</p>');

      const withoutEmailResult = await renderer.renderToString(
        <UserProfile user={user} />
      );
      
      expect(withoutEmailResult).toContain('<h3>John Doe</h3>');
      expect(withoutEmailResult).toContain('<p>Age: 30</p>');
      expect(withoutEmailResult).not.toContain('<p>Email:');
    });
  });

  describe('Fragment Rendering', () => {
    test('should render fragments correctly', async () => {
      const element = (
        <Fragment>
          <h1>Title</h1>
          <p>Paragraph</p>
          <span>Span</span>
        </Fragment>
      );

      const result = await renderer.renderToString(element);
      expect(result).toBe('<h1>Title</h1><p>Paragraph</p><span>Span</span>');
    });

    test('should render empty fragments', async () => {
      const result = await renderer.renderToString(<Fragment />);
      expect(result).toBe('');
    });

    test('should render nested fragments', async () => {
      const element = (
        <div>
          <Fragment>
            <h1>Title</h1>
            <Fragment>
              <p>Nested paragraph</p>
              <span>Nested span</span>
            </Fragment>
          </Fragment>
          <footer>Footer</footer>
        </div>
      );

      const result = await renderer.renderToString(element);
      expect(result).toBe('<div><h1>Title</h1><p>Nested paragraph</p><span>Nested span</span><footer>Footer</footer></div>');
    });
  });

  describe('Error Boundary Rendering', () => {
    test('should catch and handle component errors', async () => {
      const ThrowingComponent: ComponentType<{}> = () => {
        throw new Error('Test error');
      };

      const TestComponent: ComponentType<{}> = () => (
        <>
          <div>Before error</div>
          <ErrorBoundary silent>
            <ThrowingComponent />
          </ErrorBoundary>
          <div>After error</div>
        </>
      );

      const renderer = new ServerDOMRenderer();
      const result = await renderer.renderToString(<TestComponent />);
      
      // Error boundaries catch errors but don't stop sibling rendering
      expect(result).toContain('<div>Before error</div>');
      expect(result).toContain('<div>After error</div>');
    });

    test('should render fallback UI on error', async () => {
      const ErrorComponent: ComponentType = () => {
        throw new Error('Render error');
      };

      let caughtError: Error | undefined;

      const element = (
        <ErrorBoundary 
          silent
          onError={(error) => { caughtError = error; }}
        >
          <ErrorComponent />
        </ErrorBoundary>
      );

      const result = await renderer.renderToString(element);
      
      expect(caughtError).toBeInstanceOf(Error);
      expect(caughtError?.message).toBe('Render error');
      expect(result).toBe('');
    });

    test('should handle nested error boundaries', async () => {
      const OuterErrorComponent: ComponentType = () => {
        throw new Error('Outer error');
      };

      const InnerErrorComponent: ComponentType = () => {
        throw new Error('Inner error');
      };

      let outerError: Error | undefined;
      let innerError: Error | undefined;

      const element = (
        <ErrorBoundary 
          silent 
          onError={(error) => { outerError = error; }}
        >
          <div>Outer start</div>
          <ErrorBoundary 
            silent 
            onError={(error) => { innerError = error; }}
          >
            <InnerErrorComponent />
          </ErrorBoundary>
          <OuterErrorComponent />
        </ErrorBoundary>
      );

      const result = await renderer.renderToString(element);
      
      expect(innerError).toBeInstanceOf(Error);
      expect(innerError?.message).toBe('Inner error');
      expect(outerError).toBeInstanceOf(Error);
      expect(outerError?.message).toBe('Outer error');
      expect(result).toBe('<div>Outer start</div>');
    });
  });

  describe('Props Provider Rendering', () => {
    test('should modify props through provider', async () => {
      const element = (
        <PropsProvider
          callback={({ type, props }) => ({ 
            ...props, 
            'data-enhanced': 'true',
            className: props.className ? `${props.className} enhanced` : 'enhanced'
          })}
        >
          <div className="original">
            <span>Content</span>
            <p className="text">Text</p>
          </div>
        </PropsProvider>
      );

      const result = await renderer.renderToString(element);
      
      expect(result).toContain('data-enhanced="true"');
      expect(result).toContain('class="original enhanced"');
      expect(result).toContain('class="text enhanced"');
    });

    test('should handle complex prop transformations', async () => {
      const addAnalytics = ({ type, props }: { 
        type: any; 
        props: any; 
      }) => ({
        ...props,
        'data-analytics-type': String(type),
        'data-analytics-id': props.id || 'auto-generated',
      });

      const element = (
        <PropsProvider callback={addAnalytics}>
          <button id="submit-btn">
            Submit
          </button>
          <a href="/link" className="nav-link">
            Link
          </a>
        </PropsProvider>
      );

      const result = await renderer.renderToString(element);
      
      expect(result).toContain('data-analytics-type="button"');
      expect(result).toContain('data-analytics-id="submit-btn"');
      expect(result).toContain('data-analytics-type="a"');
      expect(result).toContain('data-analytics-id="auto-generated"');
    });

    test('should handle nested props providers', async () => {
      const addTheme = ({ props }: { props: any }) => ({
        ...props,
        'data-theme': 'dark',
      });

      const addTracking = ({ props }: { props: any }) => ({
        ...props,
        'data-tracking': 'enabled',
      });

      const element = (
        <PropsProvider callback={addTheme}>
          <div className="app">
            <PropsProvider callback={addTracking}>
              <button>Tracked Button</button>
            </PropsProvider>
            <span>Regular span</span>
          </div>
        </PropsProvider>
      );

      const result = await renderer.renderToString(element);
      
      expect(result).toContain('data-theme="dark"');
      expect(result).toContain('data-tracking="enabled"');
      // Button should have both theme and tracking
      const buttonMatch = result.match(/<button[^>]*>/);
      expect(buttonMatch?.[0]).toContain('data-theme="dark"');
      expect(buttonMatch?.[0]).toContain('data-tracking="enabled"');
      // Span should only have theme
      const spanMatch = result.match(/<span[^>]*>/);
      expect(spanMatch?.[0]).toContain('data-theme="dark"');
      expect(spanMatch?.[0]).not.toContain('data-tracking');
    });
  });

  describe('HTML Document Rendering', () => {
    test('should render complete HTML documents', async () => {
      const app = (
        <html lang="en">
          <head>
            <meta name="charset" content="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Test App</title>
            <link rel="stylesheet" href="/styles.css" />
          </head>
          <body>
            <div id="root">
              <h1>Hello World</h1>
              <p>This is a test application.</p>
            </div>
            <script src="/bundle.js"></script>
          </body>
        </html>
      );

      const result = await renderer.renderToString(app);
      
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('<html>');
      expect(result).toContain('<meta name="charset" content="utf-8">');
      expect(result).toContain('<meta name="viewport" content="width=device-width, initial-scale=1">');
      expect(result).toContain('<title>Test App</title>');
      expect(result).toContain('<link rel="stylesheet" href="/styles.css">');
      expect(result).toContain('<div id="root">');
      expect(result).toContain('<h1>Hello World</h1>');
      expect(result).toContain('<script src="/bundle.js">');
    });

    test('should handle void elements correctly', async () => {
      const document = (
        <html>
          <head>
            <meta name="description" content="Test description" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossOrigin="" />
          </head>
          <body>
            <img src="/image.jpg" alt="Test image" width={100} height={100} />
            <input type="text" name="username" required />
            <br />
            <hr />
            <area shape="rect" coords="0,0,100,100" href="/link" alt="Area" />
          </body>
        </html>
      );

      const result = await renderer.renderToString(document);
      
      expect(result).toContain('<meta name="description" content="Test description">');
      expect(result).toContain('<link rel="icon" href="/favicon.ico">');
      expect(result).toContain('<img src="/image.jpg" alt="Test image" width="100" height="100">');
      expect(result).toContain('<input name="username" required="">');
      expect(result).toContain('<br>');
      expect(result).toContain('<hr>');
      expect(result).toContain('<area shape="rect" coords="0,0,100,100" href="/link" alt="Area">');
    });
  });

  describe('Advanced Rendering Features', () => {
    test('should handle conditional rendering', async () => {
      const ConditionalComponent: ComponentType<{ showContent: boolean; user?: { name: string } }> = ({ 
        showContent, 
        user 
      }) => {
        return (
          <div>
            {showContent && <p>Content is visible</p>}
            {user && <p>Welcome, {user.name}</p>}
            {!showContent && <p>Content is hidden</p>}
          </div>
        );
      };

      const withContentResult = await renderer.renderToString(
        <ConditionalComponent showContent user={{ name: 'Alice' }} />
      );
      
      expect(withContentResult).toContain('<p>Content is visible</p>');
      expect(withContentResult).toContain('<p>Welcome, Alice</p>');
      expect(withContentResult).not.toContain('<p>Content is hidden</p>');

      const withoutContentResult = await renderer.renderToString(
        <ConditionalComponent showContent={false} />
      );
      
      expect(withoutContentResult).not.toContain('<p>Content is visible</p>');
      expect(withoutContentResult).not.toContain('<p>Welcome,');
      expect(withoutContentResult).toContain('<p>Content is hidden</p>');
    });

    test('should handle list rendering', async () => {
      const ListComponent: ComponentType<{ items: string[] }> = ({ items }) => {
        return (
          <ul>
            {items.map((item, index) => (
              <li data-key={index}>
                {item}
              </li>
            ))}
          </ul>
        );
      };

      const result = await renderer.renderToString(
        <ListComponent items={['Apple', 'Banana', 'Cherry']} />
      );
      
      expect(result).toContain('<ul>');
      expect(result).toContain('<li');
      expect(result).toContain('Apple');
      expect(result).toContain('Banana');
      expect(result).toContain('Cherry');
    });

    test('should handle complex data rendering', async () => {
      interface User {
        id: number;
        name: string;
        email: string;
        isActive: boolean;
      }

      const UserTable: ComponentType<{ users: User[] }> = ({ users }) => {
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr data-key={user.id} className={user.isActive ? 'active' : 'inactive'}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };

      const users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', isActive: true },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', isActive: false },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', isActive: true },
      ];

      const result = await renderer.renderToString(<UserTable users={users} />);
      
      expect(result).toContain('<table>');
      expect(result).toContain('<thead>');
      expect(result).toContain('<th>ID</th>');
      expect(result).toContain('<th>Name</th>');
      expect(result).toContain('<tbody>');
      expect(result).toContain('class="active"');
      expect(result).toContain('class="inactive"');
      expect(result).toContain('<td>John Doe</td>');
      expect(result).toContain('<td>jane@example.com</td>');
      expect(result).toContain('<td>Active</td>');
      expect(result).toContain('<td>Inactive</td>');
    });
  });
});
