# JavaScript 基础

## 变量声明

### let

```js
let a = 10;
```

- let声明的变量可以被多次赋值，例如

```js
let a = 100; // 初始值100
a = 200; // 赋值为200
console.log(a); // 输出200
```

### const

```js
const b = 20;
```

- const声明的变量只能被赋值一次，例如

```js
const b = 200; // 初始值200
b = 300; // 错误，不能重新赋值
console.log(b); // 输出200
```

### var

```js
var c = 30;
```

- var声明的变量可以被多次赋值，例如

```js
var c = 300; // 初始值300
c = 400; // 赋值为400
console.log(c); // 输出400
```

### var 与 let/const 的主要区别

1.  **作用域 (Scope)**
    *   `var`: 函数作用域 (Function Scope)。变量在声明它的函数内部及子函数内部都是可访问的。
    *   `let`/`const`: 块级作用域 (Block Scope)。变量只在声明它的代码块（如 `{}`、`for` 循环、`if` 语句）内可访问。

    **示例：**
    ```javascript
    function run() {
        var a = 1;
        let b = 2;

        if (true) {
            var a = 11; // 这里重新声明并赋值了外层的 a
            let b = 22; // 这是一个新的、只在 if 块内有效的 b
            console.log(a); // 输出: 11
            console.log(b); // 输出: 22
        }

        console.log(a); // 输出: 11 (a 被 if 块内的 var 修改了)
        console.log(b); // 输出: 2 (b 是 if 块外的 b)
    }
    run();
    ```

2.  **变量提升 (Hoisting)**
    *   `var`: 声明会被提升到其作用域的顶部，并被初始化为 `undefined`。因此在声明之前访问不会报错，只会得到 `undefined`。
    *   `let`/`const`: 声明也会被提升，但不会被初始化。在声明之前访问变量会进入“暂时性死区”（Temporal Dead Zone, TDZ），导致 `ReferenceError`。

    **示例：**
    ```javascript
    console.log(x); // 输出: undefined
    var x = 5;

    // console.log(y); // 报错: ReferenceError: Cannot access 'y' before initialization
    let y = 10;
    ```

3.  **全局对象属性**
    *   `var`: 在全局作用域中声明的 `var` 变量会成为全局对象（在浏览器中是 `window`）的一个属性。
    *   `let`/`const`: 在全局作用域中声明的 `let` 或 `const` 变量不会成为全局对象的属性。

    **示例 (在浏览器环境中)：**
    ```javascript
    var globalVar = 'I am global';
    let globalLet = 'I am not on window';

    console.log(window.globalVar); // 输出: "I am global"
    console.log(window.globalLet); // 输出: undefined
    ```

## 数据类型

### 基本数据类型

- `String`
- `Number`
- `BigInt`
- `Boolean`
- `Null`
- `Undefined`
- `Symbol`

#### undefined和null

- undefined表示未定义，例如

```js
let a;
console.log(a); // 输出undefined
```

- null表示空值，例如

```js
let b = null;
console.log(b); // 输出null
```

- 执行表达式或者函数，没有返回结果，出现undefined
- 访问数据不存在的元素，访问对象不存在的属性，出现undefined
- 定义变量，没有初始化，出现undefined

##### 两者共同点

- 都没有属性，方法

##### 两者区别

- undefined 由js产生
- null 由开发者产生

#### string

- 字符串表示文本，例如

```js
let str = 'hello';
console.log(str); // 输出hello
```

##### 模板字符串

- 模板字符串是一种特殊的字符串，使用反引号（`）包裹，例如

```js
let str = `hello ${name}`;
console.log(str); // 输出hello 张三
```

#### number和bigint

number类型标识的双精度浮动小数，例如

```js
10 / 3;  // 结果3.333333333
```

既然是浮点小数，那么可以除以0

```js
10 /0 ; // 结果Infinity，正无穷大
-10 / 0; // 结果-Infinity，负无穷大
```

浮点小数都有运算精度问题，例如

```js
2.0 - 1.1; // 结果0.9000000000000004
```

- number表示数字，例如

```js
let num = 100;
console.log(num); // 输出100
```

- bigint表示大整数，例如

```js
let bigNum = 123456789012345678901234567890n;
console.log(bigNum); // 输出123456789012345678901234567890,在数字后面加上一个小写n
```

#### boolean

- 布尔值表示真或假，例如

```js
let bool = true;
console.log(bool); // 输出true
```

在Js中，并不是boolean才能用于条件判断，任何值都可以用于条件判断，例如

```js
let a = 100;
if(a){
    console.log('a是真值');
}
```

这是就有一个规则，当需要条件判断时，这个值被当作true还是false，当作true的值归类为truthy,当作false的值归类为falsy

- 以下值被当作false
  - false
  - 0
  - -0
  - 0n
  - ''
  - null
  - undefined
  - NaN
- 其他值都被当作true

#### symbol

- symbol表示唯一标识符，例如

```js
let sym = Symbol('sym');
console.log(sym); // 输出Symbol(sym)
```

### 对象数据类型
- `Object` (包括 `Function`, `Array`, `Date` 等)

#### Array (数组)

数组是值的有序集合，可以存储任何类型的数据。

**创建数组:**
```javascript
// 数组字面量
let fruits = ['Apple', 'Banana'];
let mixed = [1, 'hello', true, null];

// Array 构造函数
let numbers = new Array(1, 2, 3, 4, 5);
```

**访问元素:**
通过索引（从0开始）来访问数组元素。
```javascript
console.log(fruits[0]); // 输出: 'Apple'
console.log(fruits.length); // 输出: 2
```

**常用方法:**
- **修改原数组:**
  - `push()`: 在数组末尾添加元素。
  - `pop()`: 删除并返回数组的最后一个元素。
  - `shift()`: 删除并返回数组的第一个元素。
  - `unshift()`: 在数组开头添加元素。
  - `splice()`: 通过删除、替换或添加元素来修改数组。
- **遍历与转换 (返回新数组或值):**
  - `forEach()`: 遍历数组的每个元素，执行一个函数 (无返回值)。
  - `map()`: 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
  - `filter()`: 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
  - `join()`: 将数组所有元素连接成一个字符串并返回。

**示例 (修改原数组):**
```javascript
let fruits = ['Apple', 'Banana'];

fruits.push('Orange'); // fruits 变为 ['Apple', 'Banana', 'Orange']
console.log(fruits);

fruits.pop(); // fruits 变为 ['Apple', 'Banana']
console.log(fruits);

// splice 示例: 从索引 1 开始，删除 1 个元素，并插入 'Mango'
fruits.splice(1, 1, 'Mango'); // fruits 变为 ['Apple', 'Mango']
console.log(fruits);
```

**示例 (遍历与转换):**
```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach: 遍历数组
numbers.forEach(num => {
    console.log(num); // 依次输出 1, 2, 3, 4, 5
});

// map: 创建新数组
const doubled = numbers.map(num => num * 2);
console.log(doubled); // 输出: [2, 4, 6, 8, 10]
console.log(numbers); // 原数组不变: [1, 2, 3, 4, 5]

// filter: 创建新数组
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // 输出: [2, 4]
console.log(numbers); // 原数组不变: [1, 2, 3, 4, 5]

// join: 连接成字符串
const str = numbers.join(' - ');
console.log(str); // 输出: "1 - 2 - 3 - 4 - 5"
```

#### Object (对象)

对象是键值对（key-value pairs）的集合，用于存储更复杂的数据结构。键通常是字符串，值可以是任何数据类型。

**创建对象:**
```javascript
const person = {
    name: '张三',
    age: 25,
    isStudent: false,

    // ES5 写法
    greet: function() {
        console.log('Hello!');
    },

    // ES6 方法简写 (更常用)
    sayHello() {
        // 在对象方法中, `this` 指向该对象本身
        console.log(`Hello, my name is ${this.name}`);
    }
};
```

**访问、添加和修改属性:**
可以通过点符号 (`.`) 或方括号 (`[]`) 来操作属性。
```javascript
// 1. 访问属性
console.log(person.name); // 输出: '张三'
console.log(person['age']); // 输出: 25

// 2. 修改属性
person.age = 26;
console.log(person.age); // 输出: 26

// 3. 添加新属性
person.city = '北京';
console.log(person.city); // 输出: '北京'

// 4. 调用方法
person.greet();      // 输出: 'Hello!'
person.sayHello(); // 输出: 'Hello, my name is 张三'
```

#### 对象中的私有变量

在 JavaScript 中，常规的对象字面量没有内置的私有属性支持，但可以通过一些模式来实现。

**1. 使用闭包 (The Closure Pattern)**

这是实现真正私有变量的经典模式。通过一个函数创建对象，利用闭包来“隐藏”变量。

```javascript
function createWallet(initialBalance) {
    let _balance = initialBalance; // 这个变量是私有的，外部无法访问

    return {
        getBalance() {
            return _balance;
        },
        deposit(amount) {
            _balance += amount;
        },
        withdraw(amount) {
            if (amount > _balance) {
                console.log('Insufficient funds!');
                return;
            }
            _balance -= amount;
        }
    };
}

const myWallet = createWallet(100);
console.log(myWallet.getBalance()); // 输出: 100
// console.log(myWallet._balance); // 无法访问，输出 undefined

myWallet.deposit(50);
console.log(myWallet.getBalance()); // 输出: 150

myWallet.withdraw(200); // 输出: Insufficient funds!
console.log(myWallet.getBalance()); // 输出: 150
```

**2. 命名约定 (Underscore Prefix)**

一个常见的约定是在变量名前加上下划线 `_` 来表示它是一个“私有”或“内部”变量。这并不会在技术上阻止访问，但它向其他开发者传达了“请不要直接修改我”的意图。

```javascript
const car = {
    _speed: 0, // 约定为私有
    accelerate() {
        this._speed += 10;
    },
    getSpeed() {
        return this._speed;
    }
};

car.accelerate();
console.log(car.getSpeed()); // 输出: 10
console.log(car._speed); // 仍然可以访问，输出: 10
```

**3. ES2022 私有类字段 (Private Class Fields)**

现代 JavaScript 的 `class` 语法支持使用 `#` 前缀来创建真正的私有字段。这是目前在类中最推荐的方式。

```javascript
class Counter {
    #count = 0; // #count 是一个私有字段

    increment() {
        this.#count++;
    }

    getCount() {
        return this.#count;
    }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount()); // 输出: 1
// console.log(counter.#count); // 语法错误，无法在类外部访问
```

# 函数

## 函数定义与调用

- 函数是一种特殊的对象，用于执行代码，定义

```js
function 函数名(参数){
    // 函数体
    console.log('hello');
    return 结果;
}
```

例子

```js
function add(a, b){
    return a + b;
}
```

调用函数

```js
函数名(参数);
```

```js
let result = add(10, 20);
console.log(result); // 输出30
```

函数可以设置默认值，例如

```js
function add(a = 0, b = 0){
    return a + b;
}
```

调用函数

```js
函数名(参数);
```

```js
let result = add(10);
console.log(result); // 输出10, 默认b为0
```

## 函数表达式 (匿名函数)

语法：

```js
function(参数){
    // 函数体
    console.log('hello');
    return 结果;
}
```

匿名函数是没有名称的函数，例如

```js
let add = function(a, b){
    return a + b;
}
```

调用函数

```js
let result = add(10, 20);
console.log(result); // 输出30
```

- 第一种场景：定义完毕后立即调用

```js
let result = function(a, b){
    return a + b;
}(10, 20);
console.log(result); // 输出30
```

- 第二种场景：作为其他对象的方法，例如页面由元素

```html
<p id ="p1>点我</p>
```

此元素有一个onclick方法，会在鼠标点击这个元素后被执行，onclick方法刚开始是null，需要赋值后才能使用

```js
document.getElementById('p1').onclick = function(){
    console.log('点击了p1元素');
}
```

## 箭头函数

```js
(参数) => 函数体
```

- 箭头函数是一种特殊的函数，使用箭头（=>）定义，例如

```js
let add = (a, b) => a + b;
```

- 调用函数

```js
let result = add(10, 20);
console.log(result); // 输出30
```

- 如果没有参数, 箭头函数的参数部分可以为空

```js
let sayHello = () => console.log('hello');
```

- 如果箭头函数的函数体只有一行代码，那么可以省略大括号和return关键字

```js
let add = (a, b) => a + b;
```

- 如果只有一个参数, 箭头函数的参数部分可以省略括号

```js
let double = a => a * 2;
```

## 作用域与作用域链
- 全局作用域：在js代码中，任何地方都可以访问的变量，例如

```js
let a = 100;
console.log(a); // 输出100
```

- 函数作用域：在函数内部定义的变量，只能在函数内部访问，例如

```js
function a() {
    var z = 30;
}


var x = 10;

function outer(){
    var y = 20;
    console.log('outer');
    function inner(){
        console.log(`inner, x = ${x}, y = ${y}`);
//        console.log(`inner, x = ${x}, y = ${y}, z = ${z}`);
    }
    inner();
}
```

- 调用函数
```js
outer(); // 当有z时报错：Uncaught ReferenceError: z is not defined
```
## 闭包

闭包允许一个函数访问并操作其外部函数作用域中的变量，即使外部函数已经执行完毕。简单说，就是函数“记住”了它被创建时的环境。

**示例：创建私有变量**
```javascript
function createCounter() {
    let count = 0; // 局部变量，被闭包“记住”

    // 返回的函数是闭包，它可以访问 count
    return function() {
        count++;
        console.log(count);
    };
}

const counter = createCounter();

counter(); // 输出: 1
counter(); // 输出: 2
// 无法直接访问 count，实现了私有化
```
