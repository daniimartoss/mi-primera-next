import { sum, isEven } from "../utils/math.js";

const [,, arg1 = '2', arg2 = '3'] = process.argv;

console.log(process.argv);
console.log('sum:', sum(arg1, arg2));
console.log('isEven(sum):', isEven(sum(arg1, arg2)));
console.log('process.version:', process.version);