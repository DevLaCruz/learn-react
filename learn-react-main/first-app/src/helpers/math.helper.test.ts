import { expect,test, describe} from 'vitest'
import { add, multiply, subtrack } from './math.helper'


describe('add', () => {

test('should add two positives numbers',()=>{
 //Step 1. Arrange
    const a = 2;
    const b = 1;

    //Step 2. Act
    const result = add(a,b);
    //console.log({result});

    //Step 3. Assert    
    expect(result).toBe(a+b);

    });
   

test('should subtrack two positive numbers',()=>{
 //Step 1. Arrange
    const a = 3;
    const b = 1;

    //Step 2. Act
    const result = subtrack(a,b);
    //console.log({result});

    //Step 3. Assert    
    expect(result).toBe(a-b);

});

test('should subtrack a negative numbers',()=>{
 //Step 1. Arrange
    const a = -3;
    const b = -4;

    //Step 2. Act
    const result = subtrack(a,b);
    //console.log({result});

    //Step 3. Assert    
    expect(result).toBeGreaterThan(a);

});

test('should multiply a negative numbers',()=>{
 //Step 1. Arrange
    const a = -3;
    const b = -4;

    //Step 2. Act
    const result = multiply(a,b);
    //console.log({result});

    //Step 3. Assert    
    expect(result).toEqual(multiply(a,b));

});

test('should multiply by zero',()=>{
 //Step 1. Arrange
    const a = 7;
    const b = 0;

    //Step 2. Act
    const result = multiply(a,b);
    //console.log({result});

    //Step 3. Assert    
    expect(result).toBe(0);

});

   
})



   