/** @format */

console.log('hello atguigu');

class Persion {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log('my name is ' + this.name);
  }
}

new Persion("jack")