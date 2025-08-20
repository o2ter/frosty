//
//  decompress.ts
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
 * Decompresses a string that was compressed using the compress function
 * @param compressedInput - The compressed string to decompress
 * @returns The original uncompressed string
 */
export const decompress = (compressedInput: string): string => {
  // Algorithm state variables
  let previousEntry: string | undefined;
  let bitValue = 0;
  let bitIndex = 0;
  let currentEntry: string | number;
  let charCode = 0;

  // Dictionary for storing code->string mappings during decompression
  const dictionary: string[] = [];

  // Decompression parameters
  let resetCounter = 1;
  let nextCode = 3;
  let bitsPerCode = 1;

  // Output buffer - memory optimized with mutable string
  let result = "";

  // Bit reading state
  let bitBuffer = 0;
  let inputPosition = 0;

  /**
   * Reads the specified number of bits from the compressed input
   * @param numBits - Number of bits to read
   */
  function readBits(numBits: number): void {
    bitIndex = bitValue = 0;

    while (bitIndex < numBits) {
      // Refill bit buffer when needed
      if (bitBuffer < 2) {
        bitBuffer = 64;
        charCode = compressedInput.charCodeAt(inputPosition++);
        // Convert from custom alphabet back to numeric value
        charCode = charCode > 92 ? charCode - 59 : charCode - 58;
      }

      // Extract bits and build the value
      bitValue |= ((charCode & (bitBuffer /= 2)) > 0 ? 1 : 0) << bitIndex;
      ++bitIndex;
    }
  }

  // Main decompression loop
  while (true) {
    // Read the next code from input
    readBits(bitsPerCode + 1);

    // Check for end-of-stream marker
    if (bitValue === 2) {
      return result;
    }

    // Handle the current code
    currentEntry = bitValue;

    // Check if this is a character code (bit pattern check)
    if ((-2 & (currentEntry as number)) === 0) {
      // This is a raw character code, read the character value
      readBits(8 * bitValue + 8);

      // Create dictionary entry for this character
      currentEntry = nextCode++;
      dictionary[currentEntry] = String.fromCharCode(bitValue);

      // Update compression parameters
      if (--resetCounter === 0) {
        resetCounter = 2 << bitsPerCode++;
      }
    }

    // Get the string for this code (from dictionary or construct it)
    const entryString = dictionary[currentEntry as number] || (previousEntry ? previousEntry + previousEntry[0] : "");

    // Add to output using string concatenation
    result += entryString;

    // Update dictionary with new combination if we have a previous entry
    if (previousEntry) {
      dictionary[nextCode++] = previousEntry + entryString[0];

      // Update compression parameters
      if (--resetCounter === 0) {
        resetCounter = 2 << bitsPerCode++;
      }
    }

    // Remember this entry for next iteration
    previousEntry = entryString;
  }
};
