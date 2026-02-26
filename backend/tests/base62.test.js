import {describe,test,expect} from "@jest/globals";
import { encodeBase62 } from "../src/utils/hashFunc.js";
import { decodeBase62 } from "../src/utils/hashFunc.js";


describe('Base62 Encoder',()=>{
    test('121 encodes to "1X"',()=>{
        expect(encodeBase62(121)).toBe('1X')
    });

    test('62 encodes to "10"',()=>{
        expect(encodeBase62(62)).toBe('10')
    });

    test('0 encodes to "0"',()=>{
        expect(encodeBase62(0)).toBe('0');
    })
    test('12423 encodes to "3en"',()=>{
        expect(encodeBase62(12423)).toBe('3en');
    })
    test('325435 encode to "1mEX"',()=>{
        expect(encodeBase62(325435)).toBe('1mEX')
    })
})

describe('Base62 Decoder',()=>{
    test('1X decodes to "121"',()=>{
        expect(decodeBase62('1X')).toBe(121)
    });

    test('10 decodes to "62"',()=>{
        expect(decodeBase62('10')).toBe(62)
    });

    test('0 decodes to "0"',()=>{
        expect(decodeBase62('0')).toBe(0);
    })
    test('12423 decodes to "3en"',()=>{
        expect(decodeBase62('3en')).toBe(12423);
    })
    test('325435 decodes to "1mEX"',()=>{
        expect(decodeBase62('1mEX')).toBe(325435)
    })
})

describe('Large number encoding',()=>{
    test('encodes large number (1 million)', () => {
      const result = encodeBase62(1000000);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result).toBe('string');
    }, 100); // 100ms timeout
})
