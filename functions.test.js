const functions = require('./functions')

//Checking to be a correct value
test('add should return 4 when passed 2 and 2', () => {
    expect(functions.add(2, 2)).toBe(4)
})

//Checking to be an incorrect value
test('add should not return a 7 when passed 3 and 3', () => {
    expect(functions.add(3, 3)).not.toBe(7)
})

test('subtract should return 0 when passesd 2 & 2', ()=>{
    expect(functions.subtract(2,2)).toBe(0)
})

test('subtract should not return 3 when passed 11 &4', ()=>{
    expect(functions.subtract(11, 4)).not.toBe(3)
})

test('multiply should return 4 when passed 2 & 2', ()=>{
    expect(functions.multiply(2,2)).toBe(4)
})

test('multiply should not return 9 when passede 2 & 4', ()=>{
    expect(functions.multiply(2, 4).not.toBe(9))
})

test('divide should return 1 when passed 2 & 2', ()=>{
    expect(functions.divide(2,2)).toBe(1)
})

test('divide should not return 7 when passed 15 and 3', ()=>{
    expect(functions.divide(15, 3).not.toBe(7))
})

//Check to be a null value
test('isNull should return a null value', () => {
    expect(functions.isNull()).toBeNull()
})

//Check for undefined value
test('isUndefined should return an undefined value', () => {
    expect(functions.isUndefined()).toBeUndefined
})

//Check for a truthy value
test('isTruthy should return a true value', () => {
    expect(functions.isTruthy()).toBeTruthy
})

//check for falsy value
test('isFalsy should retunr a flase value', () => {
    expect(functions.isFalsy()).toBeFalsy
})

//chech to make a value greater than
test('7 should be greater than 5', () => {
    expect(7).toBeGreaterThan(5)
})

//chech to make a value greater than or equal to
test('7 should be greater than or equal to 5', () => {
    expect(7).toBeGreaterThanOrEqual(5)
})

//chech to make a value less than
test('5 should be less than 7', () => {
    expect(5).toBeLessThan(7)
})

//complex types
test('newUser should return a new user object', () => {
    expect(functions.newUser()).toEqual({
        name: 'rory'
    })
})

test('newArray should contain an element of AU', () => {
    expect(functions.newArray()).toContain('AU')
})

describe('tesing for my snowcone', () => {
    test('snowcone is an object that has a delicious, sour, quantity property', () => {
        expect(functions.snowcone).toEqual({
            delicious: true,
            sour: false,
            quantity: 1
        })
    })

    test('snowcone should exist', () => {
        expect(functions.snowcone).not.toBeFalsy()
    })

    test('we only have one snowcone', () => {
        expect(functions.snowcone.quantity).toBe(1)
    })
})