module.exports = {
    add: (num1, num2) => {
        return num2 + num2
    },
    subtract: (num1, num2)=>{
        return num1 - num2
    }, 

    multiply: (num1, num2)=>{
        return num1 * num2
    },

    divide: (num1, num2)=>{
        return num1/num2
    }, 

    isNull: () => null,

    isUndefined: () => undefined,

    isTruthy: () => true,

    isFalsy: () => false,

    newUser: () => Object.assign({}, {name: 'rory'}),

    newArray: () => {
        return ['AU', 'AG', 'H2O']
    },

    snowcone: {
        delicious: true,
        sour: false,
        quantity: 1
    }
        
}