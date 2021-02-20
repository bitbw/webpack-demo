import './css/a.css'
import './css/b.css'

const add = (...arg)=>{
    let sum = 0;
    for (const i of arg) {
        sum += i
    }
    return sum
}
console.log(add(1,2))