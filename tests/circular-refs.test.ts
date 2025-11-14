//
//  circular-refs.test.ts
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

import { equalDeps } from '../src/core/reconciler/utils';

describe('equalDeps - Circular Reference Handling', () => {
  
  describe('Simple circular references', () => {
    test('should handle circular object reference to itself', () => {
      const obj1: any = { a: 1 };
      obj1.self = obj1;
      
      const obj2: any = { a: 1 };
      obj2.self = obj2;
      
      expect(equalDeps(obj1, obj2)).toBe(true);
    });

    test('should handle circular array reference to itself', () => {
      const arr1: any[] = [1, 2];
      arr1.push(arr1);
      
      const arr2: any[] = [1, 2];
      arr2.push(arr2);
      
      expect(equalDeps(arr1, arr2)).toBe(true);
    });

    test('should detect difference in circular object with different values', () => {
      const obj1: any = { a: 1 };
      obj1.self = obj1;
      
      const obj2: any = { a: 2 };
      obj2.self = obj2;
      
      expect(equalDeps(obj1, obj2)).toBe(false);
    });
  });

  describe('Mutual circular references', () => {
    test('should handle two objects referencing each other', () => {
      const obj1a: any = { name: 'a' };
      const obj1b: any = { name: 'b' };
      obj1a.ref = obj1b;
      obj1b.ref = obj1a;
      
      const obj2a: any = { name: 'a' };
      const obj2b: any = { name: 'b' };
      obj2a.ref = obj2b;
      obj2b.ref = obj2a;
      
      expect(equalDeps(obj1a, obj2a)).toBe(true);
    });

    test('should handle arrays with mutual references', () => {
      const arr1: any = [1];
      const arr2: any = [2];
      arr1.push(arr2);
      arr2.push(arr1);
      
      const arr3: any = [1];
      const arr4: any = [2];
      arr3.push(arr4);
      arr4.push(arr3);
      
      expect(equalDeps(arr1, arr3)).toBe(true);
    });

    test('should detect difference in mutual circular refs with different values', () => {
      const obj1a: any = { name: 'a' };
      const obj1b: any = { name: 'b' };
      obj1a.ref = obj1b;
      obj1b.ref = obj1a;
      
      const obj2a: any = { name: 'a' };
      const obj2b: any = { name: 'c' }; // Different value
      obj2a.ref = obj2b;
      obj2b.ref = obj2a;
      
      expect(equalDeps(obj1a, obj2a)).toBe(false);
    });
  });

  describe('Complex circular references', () => {
    test('should handle deep circular reference chains', () => {
      const obj1: any = { level: 1 };
      obj1.child = { level: 2, parent: obj1 };
      obj1.child.child = { level: 3, root: obj1, parent: obj1.child };
      
      const obj2: any = { level: 1 };
      obj2.child = { level: 2, parent: obj2 };
      obj2.child.child = { level: 3, root: obj2, parent: obj2.child };
      
      expect(equalDeps(obj1, obj2)).toBe(true);
    });

    test('should handle circular references in nested arrays', () => {
      const arr1: any = [1, [2, [3]]];
      arr1[1][1].push(arr1);
      
      const arr2: any = [1, [2, [3]]];
      arr2[1][1].push(arr2);
      
      expect(equalDeps(arr1, arr2)).toBe(true);
    });

    test('should handle mixed object and array circular references', () => {
      const obj1: any = { arr: [1, 2] };
      obj1.arr.push(obj1);
      obj1.self = obj1;
      
      const obj2: any = { arr: [1, 2] };
      obj2.arr.push(obj2);
      obj2.self = obj2;
      
      expect(equalDeps(obj1, obj2)).toBe(true);
    });

    test('should handle graph-like structures with multiple circular paths', () => {
      const node1a: any = { id: 'a' };
      const node1b: any = { id: 'b' };
      const node1c: any = { id: 'c' };
      
      node1a.neighbors = [node1b, node1c];
      node1b.neighbors = [node1a, node1c];
      node1c.neighbors = [node1a, node1b];
      
      const node2a: any = { id: 'a' };
      const node2b: any = { id: 'b' };
      const node2c: any = { id: 'c' };
      
      node2a.neighbors = [node2b, node2c];
      node2b.neighbors = [node2a, node2c];
      node2c.neighbors = [node2a, node2b];
      
      expect(equalDeps(node1a, node2a)).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('should handle same object reference on both sides', () => {
      const obj: any = { a: 1 };
      obj.self = obj;
      
      expect(equalDeps(obj, obj)).toBe(true);
    });

    test('should handle empty circular objects', () => {
      const obj1: any = {};
      obj1.self = obj1;
      
      const obj2: any = {};
      obj2.self = obj2;
      
      expect(equalDeps(obj1, obj2)).toBe(true);
    });

    test('should handle circular reference vs non-circular', () => {
      const obj1: any = { a: 1 };
      obj1.self = obj1;
      
      const obj2 = { a: 1, self: { a: 1, self: null } };
      
      expect(equalDeps(obj1, obj2)).toBe(false);
    });

    test('should handle multiple same references in array', () => {
      const shared1 = { x: 1 };
      const arr1 = [shared1, shared1, shared1];
      
      const shared2 = { x: 1 };
      const arr2 = [shared2, shared2, shared2];
      
      expect(equalDeps(arr1, arr2)).toBe(true);
    });

    test('should handle circular reference at different depths', () => {
      const obj1: any = { a: { b: { c: 1 } } };
      obj1.a.b.ref = obj1;
      
      const obj2: any = { a: { b: { c: 1 } } };
      obj2.a.b.ref = obj2;
      
      expect(equalDeps(obj1, obj2)).toBe(true);
    });

    test('should not cause infinite loop with mismatched circular structures', () => {
      const obj1: any = { a: 1 };
      obj1.x = obj1;
      
      const obj2: any = { a: 1 };
      obj2.y = obj2; // Different property name
      
      expect(equalDeps(obj1, obj2)).toBe(false);
    });
  });

  describe('Non-circular reference tests (baseline)', () => {
    test('should handle simple objects without circular refs', () => {
      expect(equalDeps({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
      expect(equalDeps({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    });

    test('should handle simple arrays without circular refs', () => {
      expect(equalDeps([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(equalDeps([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    test('should handle nested structures without circular refs', () => {
      const obj1 = { a: { b: { c: [1, 2, 3] } } };
      const obj2 = { a: { b: { c: [1, 2, 3] } } };
      expect(equalDeps(obj1, obj2)).toBe(true);
    });

    test('should handle primitives', () => {
      expect(equalDeps(1, 1)).toBe(true);
      expect(equalDeps('test', 'test')).toBe(true);
      expect(equalDeps(true, true)).toBe(true);
      expect(equalDeps(null, null)).toBe(true);
      expect(equalDeps(undefined, undefined)).toBe(true);
    });
  });

  describe('Performance and stack overflow prevention', () => {
    test('should not cause stack overflow with deeply nested circular refs', () => {
      const createDeepCircular = (depth: number) => {
        const root: any = { level: 0 };
        let current = root;
        
        for (let i = 1; i < depth; i++) {
          current.next = { level: i };
          current = current.next;
        }
        current.next = root; // Create circular reference
        
        return root;
      };
      
      const obj1 = createDeepCircular(100);
      const obj2 = createDeepCircular(100);
      
      expect(() => equalDeps(obj1, obj2)).not.toThrow();
      expect(equalDeps(obj1, obj2)).toBe(true);
    });

    test('should handle complex graphs without performance issues', () => {
      const createGraph = (size: number) => {
        const nodes: any[] = [];
        
        for (let i = 0; i < size; i++) {
          nodes.push({ id: i, edges: [] });
        }
        
        // Create a fully connected graph
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (i !== j) {
              nodes[i].edges.push(nodes[j]);
            }
          }
        }
        
        return nodes[0];
      };
      
      const graph1 = createGraph(10);
      const graph2 = createGraph(10);
      
      expect(() => equalDeps(graph1, graph2)).not.toThrow();
      expect(equalDeps(graph1, graph2)).toBe(true);
    });
  });
});
