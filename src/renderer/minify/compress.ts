//
//  compress.ts
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

/**
 * Custom alphabet used for encoding compressed output
 */
const COMPRESSION_ALPHABET = ":;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz";

/**
 * Internal compression function implementing LZW-like compression algorithm
 * 
 * Algorithm Description:
 * This function uses a modified Lempel-Ziv-Welch (LZW) compression algorithm that works by:
 * 
 * 1. Dictionary Building: Creates a dynamic dictionary of patterns as it processes the input.
 *    - Starts with individual characters and builds longer patterns over time
 *    - Each new pattern gets assigned an incrementing numeric code
 * 
 * 2. Pattern Matching: Scans the input to find the longest matching pattern in the dictionary.
 *    - When a pattern is found, it extends it by one character and looks for that extended pattern
 *    - If the extended pattern exists, continues building; if not, outputs the current pattern
 * 
 * 3. Variable-Length Encoding: Uses a variable number of bits per code to optimize compression.
 *    - Starts with 2 bits per code and increases as the dictionary grows
 *    - Special handling for character codes (8-bit for ASCII, 16-bit for Unicode)
 * 
 * 4. Bit Packing: Efficiently packs codes into a bit stream using the custom alphabet.
 *    - Groups bits into chunks based on bitsPerChar parameter
 *    - Uses a custom base-64-like alphabet for output encoding
 * 
 * 5. Special Codes:
 *    - Code 0/1: Flags for 8-bit/16-bit character literals
 *    - Code 2: End-of-stream marker
 *    - Code 3+: Dictionary entries for patterns
 * 
 * The algorithm is particularly effective for text with repeated patterns, as it replaces
 * common sequences with shorter codes, achieving compression ratios that improve with
 * pattern repetition in the input data.
 */
function compressInternal(input: string, bitsPerChar: number, charFromCode: (code: number) => string): string {
  if (input == null) {
    return "";
  }

  // Algorithm state
  const dictionary: Record<string, number> = {};
  const isCharacterCode: Record<string, boolean> = {};
  let resetCounter = 2;
  let nextCode = 3;
  let bitsPerCode = 2;
  let previousPattern = "";

  // Output buffer - memory optimized with mutable string
  let result = "";
  let bitBuffer = 0;
  let bitPosition = 0;

  /**
   * Write bits to output buffer
   */
  const writeBits = (value: number, numBits: number): void => {
    for (let bitIndex = 0; bitIndex < numBits; bitIndex++) {
      bitBuffer = (bitBuffer << 1) | (value & 1);
      if (bitPosition === bitsPerChar - 1) {
        bitPosition = 0;
        result += charFromCode(bitBuffer);
        bitBuffer = 0;
      } else {
        bitPosition++;
      }
      value >>= 1;
    }
  };

  /**
   * Update compression parameters
   */
  const updateParameters = (): void => {
    if (--resetCounter === 0) {
      resetCounter = Math.pow(2, bitsPerCode);
      bitsPerCode++;
    }
  };

  /**
   * Process a pattern (either character or dictionary entry)
   */
  const processPattern = (pattern: string): void => {
    if (isCharacterCode[pattern]) {
      // Single character - write character flag and value
      const charCode = pattern.charCodeAt(0);

      if (charCode < 256) {
        // 8-bit character: write 0 flag then 8 bits
        writeBits(0, bitsPerCode);
        writeBits(charCode, 8);
      } else {
        // 16-bit character: write 1 flag then 16 bits
        writeBits(1, bitsPerCode);
        writeBits(charCode, 16);
      }

      updateParameters();
      delete isCharacterCode[pattern];
    } else {
      // Dictionary entry - write code
      writeBits(dictionary[pattern], bitsPerCode);
    }
    updateParameters();
  };

  // Main compression loop
  for (let i = 0; i < input.length; i++) {
    const currentChar = input.charAt(i);

    // Add new single characters to dictionary
    if (!(currentChar in dictionary)) {
      dictionary[currentChar] = nextCode++;
      isCharacterCode[currentChar] = true;
    }

    const combinedPattern = previousPattern + currentChar;

    if (combinedPattern in dictionary) {
      // Pattern exists, continue building
      previousPattern = combinedPattern;
    } else {
      // Pattern not found
      if (previousPattern !== "") {
        processPattern(previousPattern);
      }

      // Add new pattern to dictionary
      dictionary[combinedPattern] = nextCode++;
      previousPattern = currentChar;
    }
  }

  // Handle remaining pattern
  if (previousPattern !== "") {
    processPattern(previousPattern);
  }

  // Write end-of-stream marker (code 2)
  writeBits(2, bitsPerCode);

  // Flush remaining bits
  while (true) {
    bitBuffer <<= 1;
    if (bitPosition === bitsPerChar - 1) {
      result += charFromCode(bitBuffer);
      break;
    }
    bitPosition++;
  }

  return result;
}

/**
 * Compresses a string using LZW-like compression algorithm
 * @param input - The string to compress
 * @returns Compressed string encoded with custom alphabet
 */
export const compress = (input: string): string => {
  return compressInternal(input, 6, (code) => COMPRESSION_ALPHABET.charAt(code));
};
