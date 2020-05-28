function accumulatorFactory(seed = 0){
    var result = seed;

    var accumulator = {
        add(x){
            result += x;
        },
        subtract(x) {
            result -= x;
        },
        multiply(x) {
            result *= x;
        },
        divide(x) {
            result /= x;
        },
        getResult(){
            return result;
        }
    };

    return accumulator;
}

console.log('exporting accumulator');
module.exports = accumulatorFactory;