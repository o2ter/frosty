//
//  minify.test.ts
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

import { describe, test, expect } from '@jest/globals';
import { compress } from '~/renderer/minify/compress';
import { decompress } from '~/renderer/minify/decompress';

describe('Compression and Decompression', () => {
  describe('Basic functionality', () => {
    test('should handle empty string', () => {
      const original = '';
      const compressed = compress(original);
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(original);
    });

    test('should handle null input in compress', () => {
      const compressed = compress(null as any);
      expect(compressed).toBe('');
    });

    test('should compress and decompress single character', () => {
      const original = 'a';
      const compressed = compress(original);
      expect(typeof compressed).toBe('string');
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(original);
    });

    test('should compress and decompress short string', () => {
      const original = 'hello';
      const compressed = compress(original);
      expect(typeof compressed).toBe('string');
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(original);
    });

    test('should compress and decompress repeated characters', () => {
      const original = 'aaabbbccc';
      const compressed = compress(original);
      expect(typeof compressed).toBe('string');
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(original);
    });
  });

  describe('Typical use cases', () => {
    test('should compress and decompress CSS snippet', () => {
      const original = '.btn{padding:8px;margin:4px}.btn-primary{color:blue}';
      const compressed = compress(original);
      expect(typeof compressed).toBe('string');
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(original);
    });

    test('should compress and decompress HTML snippet', () => {
      const original = '<div><span>Hello</span></div>';
      const compressed = compress(original);
      expect(typeof compressed).toBe('string');
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(original);
    });

    test('should compress and decompress JSON', () => {
      const original = '{"name":"test","value":123}';
      const compressed = compress(original);
      expect(typeof compressed).toBe('string');
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(original);
    });
  });

  describe('Algorithm validation', () => {
    test('compressed output uses valid alphabet', () => {
      const original = 'test string';
      const compressed = compress(original);
      
      // The compression alphabet: ":;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz"
      const validChars = /^[:;<=>?@A-Z\[\]^_`a-z]*$/;
      expect(compressed).toMatch(validChars);
    });

    test('compression achieves size reduction on repetitive content', () => {
      const original = 'abcabcabcabc';
      const compressed = compress(original);
      expect(compressed.length).toBeLessThan(original.length);
    });

    test('roundtrip maintains data integrity', () => {
      const original = 'Test string with various characters: 123!@#';
      let current = original;
      
      // Test multiple rounds
      for (let i = 0; i < 2; i++) {
        const compressed = compress(current);
        current = decompress(compressed);
        expect(current).toBe(original);
      }
    });
  });
});

describe('Infinite Loop Prevention Tests', () => {
  // Test with timeout to detect infinite loops
  const TIMEOUT_MS = 2000; // 2 seconds should be enough

  test('should not infinite loop on empty string', () => {
    expect(() => {
      const compressed = compress('');
      const decompressed = decompress(compressed);
      expect(decompressed).toBe('');
    }).not.toThrow();
  });

  test('should not infinite loop on single character', () => {
    expect(() => {
      const compressed = compress('a');
      const decompressed = decompress(compressed);
      expect(decompressed).toBe('a');
    }).not.toThrow();
  });

  test('should not infinite loop on repeated characters', () => {
    expect(() => {
      const input = 'a'.repeat(1000); // Increased from 10 to 1000 'a's
      const compressed = compress(input);
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(input);
    }).not.toThrow();
  });

  test('should not infinite loop on alternating pattern', () => {
    expect(() => {
      const input = 'ab'.repeat(500); // Increased alternating pattern length
      const compressed = compress(input);
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(input);
    }).not.toThrow();
  });

  test('should not infinite loop on special characters', () => {
    expect(() => {
      const basePattern = '!@#$%^&*()_+-=';
      const input = basePattern.repeat(50); // Repeat special characters pattern
      const compressed = compress(input);
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(input);
    }).not.toThrow();
  });

  test('should handle edge cases without infinite loops', () => {
    // Test edge cases that are valid but might stress the algorithm
    const validEdgeCases = [
      'a'.repeat(200), // Large single character repetition
      'ab'.repeat(200), // Large two-character repetition
      'abc'.repeat(100), // Large three-character repetition
      'abcd'.repeat(75), // Large four-character repetition
    ];

    for (const testCase of validEdgeCases) {
      expect(() => {
        const compressed = compress(testCase);
        const decompressed = decompress(compressed);
        expect(decompressed).toBe(testCase);
      }).not.toThrow();
    }
  });

  test('should not infinite loop with simple patterns', () => {
    // Test patterns that could potentially cause issues in LZW-like algorithms
    const patterns = [
      'abc'.repeat(200), // Large simple pattern
      'abcabc'.repeat(100), // Large repeating pattern
      'abcdefghij'.repeat(50), // Longer pattern repetition
      // Mixed patterns that stress the dictionary
      'a'.repeat(100) + 'b'.repeat(100) + 'c'.repeat(100),
      'abababab'.repeat(50), // Alternating pattern
    ];

    for (const pattern of patterns) {
      expect(() => {
        const compressed = compress(pattern);
        const decompressed = decompress(compressed);
        expect(decompressed).toBe(pattern);
      }).not.toThrow();
    }
  });

  test('should not infinite loop with edge case characters', () => {
    // Test edge cases that might cause issues in bit manipulation
    const edgeCases = [
      ' ', // space character
      'A', // uppercase
      'z', // lowercase
      '0', // digit
    ];

    for (const edgeCase of edgeCases) {
      expect(() => {
        const compressed = compress(edgeCase);
        const decompressed = decompress(compressed);
        expect(decompressed).toBe(edgeCase);
      }).not.toThrow();
    }
  });

  test('should complete compression in reasonable time', () => {
    // Test that compression completes within a reasonable time frame
    // This helps detect infinite loops in the bit flushing logic
    const testCases = [
      'test'.repeat(250), // 1KB of repeated word
      'hello world '.repeat(100), // Longer repeated phrase
      'abcdefghijklmnop'.repeat(50), // Longer string pattern
      'a'.repeat(2000), // Very long single character (stress test)
      // Complex pattern that stresses the LZW algorithm
      Array.from({length: 500}, (_, i) => String.fromCharCode(65 + (i % 26))).join(''),
    ];

    for (const testCase of testCases) {
      const startTime = Date.now();
      
      const compressed = compress(testCase);
      const decompressed = decompress(compressed);
      
      const elapsed = Date.now() - startTime;
      
      expect(decompressed).toBe(testCase);
      expect(elapsed).toBeLessThan(500); // Increased timeout for larger data
    }
  });

  test('should handle large data without infinite loops', () => {
    // Large data stress tests
    const largeTestCases = [
      // Large text that would appear in real applications
      'The quick brown fox jumps over the lazy dog. '.repeat(200), // ~8KB
      // Large CSS-like content
      '.class{property:value;}'.repeat(300),
      // Large HTML-like content  
      '<div><span>content</span></div>'.repeat(150),
      // Large JSON-like content
      '{"key":"value","number":123}'.repeat(120),
    ];

    for (const testCase of largeTestCases) {
      const startTime = Date.now();
      
      expect(() => {
        const compressed = compress(testCase);
        const decompressed = decompress(compressed);
        expect(decompressed).toBe(testCase);
        
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeLessThan(1000); // Allow up to 1 second for very large data
      }).not.toThrow();
    }
  });

  test('should handle worst-case patterns without infinite loops', () => {
    // Patterns that could potentially cause worst-case behavior in LZW
    const worstCasePatterns = [
      // Gradually expanding patterns that stress the dictionary
      Array.from({length: 100}, (_, i) => 'a'.repeat(i + 1)).join(''),
      // Patterns that create many dictionary entries
      Array.from({length: 50}, (_, i) => `pattern${i}_`).join(''),
      // Mixed character sets
      Array.from({length: 200}, (_, i) => 
        String.fromCharCode(33 + (i % 94)) // ASCII printable characters
      ).join(''),
    ];

    for (const pattern of worstCasePatterns) {
      const startTime = Date.now();
      
      expect(() => {
        const compressed = compress(pattern);
        const decompressed = decompress(compressed);
        expect(decompressed).toBe(pattern);
        
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeLessThan(1000); // Allow time for complex patterns
      }).not.toThrow();
    }
  });

  test('should handle all ASCII characters correctly', () => {
    // Test all ASCII printable characters (32-126)
    const allPrintableAscii = Array.from({length: 95}, (_, i) => 
      String.fromCharCode(32 + i) // ASCII 32 (space) to 126 (~)
    ).join('');

    expect(() => {
      const compressed = compress(allPrintableAscii);
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(allPrintableAscii);
    }).not.toThrow();

    // Test all ASCII characters including control characters (0-127)
    const allAscii = Array.from({length: 128}, (_, i) => 
      String.fromCharCode(i)
    ).join('');

    expect(() => {
      const compressed = compress(allAscii);
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(allAscii);
    }).not.toThrow();

    // Test each ASCII character individually
    for (let i = 0; i < 128; i++) {
      const char = String.fromCharCode(i);
      expect(() => {
        const compressed = compress(char);
        const decompressed = decompress(compressed);
        expect(decompressed).toBe(char);
      }).not.toThrow();
    }

    // Test common ASCII ranges
    const asciiRanges = [
      // Control characters (0-31)
      Array.from({length: 32}, (_, i) => String.fromCharCode(i)).join(''),
      // Digits (48-57)
      Array.from({length: 10}, (_, i) => String.fromCharCode(48 + i)).join(''),
      // Uppercase letters (65-90)
      Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i)).join(''),
      // Lowercase letters (97-122)
      Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i)).join(''),
      // Special characters (33-47, 58-64, 91-96, 123-126)
      '!"#$%&\'()*+,-./' + ':;<=>?@' + '[\\]^_`' + '{|}~',
    ];

    for (const range of asciiRanges) {
      expect(() => {
        const compressed = compress(range);
        const decompressed = decompress(compressed);
        expect(decompressed).toBe(range);
      }).not.toThrow();
    }
  });

  test('should handle extended ASCII and Unicode characters', () => {
    // Test extended ASCII (128-255)
    const extendedAscii = Array.from({length: 128}, (_, i) => 
      String.fromCharCode(128 + i)
    ).join('');

    expect(() => {
      const compressed = compress(extendedAscii);
      const decompressed = decompress(compressed);
      expect(decompressed).toBe(extendedAscii);
    }).not.toThrow();

    // Test common Unicode characters
    const unicodeTests = [
      'Hello 世界', // Mixed ASCII and Chinese
      '🚀🌍🎉', // Emojis
      'àáâãäåæçèéêë', // Accented characters
      'αβγδεζηθικλμ', // Greek letters
      '∑∏∆∇∂∫∞≈≠≤≥', // Mathematical symbols
    ];

    for (const unicodeTest of unicodeTests) {
      expect(() => {
        const compressed = compress(unicodeTest);
        const decompressed = decompress(compressed);
        expect(decompressed).toBe(unicodeTest);
      }).not.toThrow();
    }
  });
});

describe('Compression Ratio Analysis', () => {
  function calculateCompressionRatio(original: string, compressed: string): number {
    return compressed.length / original.length;
  }

  function formatRatio(ratio: number): string {
    return `${(ratio * 100).toFixed(1)}% (${(1/ratio).toFixed(2)}:1)`;
  }

  test('should measure compression ratios for different data types', () => {
    const testCases = [
      {
        name: 'Highly repetitive data',
        data: 'a'.repeat(1000),
      },
      {
        name: 'Alternating pattern',
        data: 'ab'.repeat(500),
      },
      {
        name: 'CSS-like content',
        data: '.class{property:value;margin:10px;padding:5px;}'.repeat(50),
      },
      {
        name: 'HTML-like content',
        data: '<div><span>content</span><p>paragraph</p></div>'.repeat(30),
      },
      {
        name: 'JSON-like content',
        data: '{"name":"value","number":123,"array":[1,2,3]}'.repeat(25),
      },
      {
        name: 'Natural text',
        data: 'The quick brown fox jumps over the lazy dog. '.repeat(100),
      },
      {
        name: 'Random-like data',
        data: Array.from({length: 1000}, (_, i) => String.fromCharCode(65 + (i % 26))).join(''),
      },
      {
        name: 'Mixed content',
        data: 'function test() { return "hello world"; } '.repeat(50),
      },
    ];

    console.log('\n📊 Compression Ratio Analysis:');
    console.log('===============================');

    for (const testCase of testCases) {
      const compressed = compress(testCase.data);
      const decompressed = decompress(compressed);
      const ratio = calculateCompressionRatio(testCase.data, compressed);
      
      // Verify correctness
      expect(decompressed).toBe(testCase.data);
      
      console.log(`${testCase.name}:`);
      console.log(`  Original: ${testCase.data.length} bytes`);
      console.log(`  Compressed: ${compressed.length} bytes`);
      console.log(`  Ratio: ${formatRatio(ratio)}`);
      console.log('');
    }
  });

  test('should analyze compression efficiency by data size', () => {
    const basePatter = 'abcdefghijklmnop';
    const sizes = [10, 50, 100, 500, 1000, 2000];
    
    console.log('\n📈 Compression Efficiency by Data Size:');
    console.log('========================================');
    
    for (const size of sizes) {
      const repeats = Math.ceil(size / basePatter.length);
      const data = basePatter.repeat(repeats).substring(0, size);
      const compressed = compress(data);
      const ratio = calculateCompressionRatio(data, compressed);
      
      console.log(`Size ${size}: ${formatRatio(ratio)}`);
    }
  });

  test('should compare compression ratios for different patterns', () => {
    const patterns = [
      { name: 'Single char (a)', pattern: 'a', repeats: 1000 },
      { name: 'Two chars (ab)', pattern: 'ab', repeats: 500 },
      { name: 'Three chars (abc)', pattern: 'abc', repeats: 333 },
      { name: 'Four chars (abcd)', pattern: 'abcd', repeats: 250 },
      { name: 'Eight chars (abcdefgh)', pattern: 'abcdefgh', repeats: 125 },
      { name: 'Sixteen chars', pattern: 'abcdefghijklmnop', repeats: 62 },
      { name: 'No repetition', pattern: Array.from({length: 1000}, (_, i) => String.fromCharCode(65 + (i % 26))).join(''), repeats: 1 },
    ];

    console.log('\n🔄 Pattern-based Compression Analysis:');
    console.log('======================================');

    for (const pattern of patterns) {
      const data = pattern.pattern.repeat(pattern.repeats);
      const compressed = compress(data);
      const ratio = calculateCompressionRatio(data, compressed);
      
      console.log(`${pattern.name}: ${formatRatio(ratio)}`);
    }
  });

  test('should measure worst and best case scenarios', () => {
    // Best case: highly repetitive data
    const bestCase = 'a'.repeat(5000);
    const bestCompressed = compress(bestCase);
    const bestRatio = calculateCompressionRatio(bestCase, bestCompressed);

    // Worst case: random-like data with no repetition
    const worstCase = Array.from({length: 1000}, (_, i) => 
      String.fromCharCode(33 + (i % 94))
    ).join('');
    const worstCompressed = compress(worstCase);
    const worstRatio = calculateCompressionRatio(worstCase, worstCompressed);

    // Average case: natural text with some repetition
    const averageCase = 'The quick brown fox jumps over the lazy dog. This is a test of compression with natural language patterns. '.repeat(50);
    const averageCompressed = compress(averageCase);
    const averageRatio = calculateCompressionRatio(averageCase, averageCompressed);

    console.log('\n🎯 Best/Worst/Average Case Analysis:');
    console.log('====================================');
    console.log(`Best case (repetitive): ${formatRatio(bestRatio)}`);
    console.log(`Average case (natural text): ${formatRatio(averageRatio)}`);
    console.log(`Worst case (random-like): ${formatRatio(worstRatio)}`);

    // Verify all decompress correctly
    expect(decompress(bestCompressed)).toBe(bestCase);
    expect(decompress(worstCompressed)).toBe(worstCase);
    expect(decompress(averageCompressed)).toBe(averageCase);
  });

  test('should analyze compression overhead for small data', () => {
    const smallDataSizes = [1, 2, 5, 10, 20, 50];
    
    console.log('\n📏 Small Data Compression Overhead:');
    console.log('===================================');
    
    for (const size of smallDataSizes) {
      const data = 'x'.repeat(size);
      const compressed = compress(data);
      const ratio = calculateCompressionRatio(data, compressed);
      const overhead = compressed.length - data.length;
      
      console.log(`${size} bytes: ${compressed.length} bytes (${overhead > 0 ? '+' : ''}${overhead} overhead) - ${formatRatio(ratio)}`);
    }
  });
});
