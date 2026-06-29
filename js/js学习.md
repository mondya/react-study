# 1. JavaScript 基础

## 1.1. 变量声明

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

## 1.2. 数据类型

### 1.2.1. 基本数据类型

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

### 1.2.2. 动态类型 (Dynamic Typing)

JavaScript 是一种 **动态类型语言**。这意味着变量的类型是在程序 **运行时** 确定的，而不是在编译时。

**核心特点：**
- **无需预先声明类型**：在声明变量时，你不需要指定它将存储什么类型的数据。
- **变量类型可变**：同一个变量可以在程序的不同时间点持有不同类型的值。

这与 **静态类型语言** (如 Java, C++, TypeScript) 形成对比，在这些语言中，变量一旦被声明为特定类型，就不能再存储其他类型的数据。

**示例：**
```javascript
let myVar; // 初始时，类型是 undefined

myVar = "Hello, World!"; // 赋值后，类型变为 string
console.log(typeof myVar); // 输出: "string"

myVar = 100; // 再次赋值，类型变为 number
console.log(typeof myVar); // 输出: "number"

myVar = true; // 类型又变为 boolean
console.log(typeof myVar); // 输出: "boolean"
```

**优点与缺点：**
- **优点**：灵活性高，编写代码速度快，非常适合快速原型开发。
- **缺点**：可能会导致在运行时才发现的类型错误，而这些错误在静态类型语言中可以在编译阶段就被捕获。这也是 TypeScript (为 JavaScript 添加了静态类型) 如此流行的原因之一。

## 1.3. 运算符与表达式

表达式是任何可以产生一个值的代码单元。运算符是连接表达式以产生新值的特殊符号。

### 1.3.1. 算术运算符

用于执行数学运算。

```javascript
let a = 10;
let b = 4;

console.log(a + b); // 14 (加)
console.log(a - b); // 6  (减)
console.log(a * b); // 40 (乘)
console.log(a / b); // 2.5(除)
console.log(a % b); // 2  (取余)
console.log(a ** b);// 10000 (指数/幂)

a++; // a 变为 11 (自增)
b--; // b 变为 3  (自减)
```

### 1.3.2. 赋值运算符

用于给变量赋值。

```javascript
let x = 10;

x += 5; // 等同于 x = x + 5; (x 变为 15)
x -= 5; // 等同于 x = x - 5; (x 变为 10)
x *= 2; // 等同于 x = x * 2; (x 变为 20)
x /= 4; // 等同于 x = x / 4; (x 变为 5)
```

### 1.3.3. 比较运算符

用于比较两个值，返回一个布尔值 (`true` 或 `false`)。

- `==` (相等): 只比较值，如果类型不同会尝试类型转换。
- `===` (严格相等): 比较值和类型，**推荐使用**。
- `!=` (不相等)
- `!==` (严格不相等)

```javascript
console.log(5 == '5');   // true (字符串 '5' 被转换为数字 5)
console.log(5 === '5');  // false (类型不同：number vs string)

console.log(5 != '5');   // false
console.log(5 !== '5');  // true

console.log(10 > 5);   // true
console.log(10 <= 10); // true
```

### 1.3.4. 逻辑运算符

用于组合多个布尔表达式。

- `&&` (与): 所有条件都为 `true` 时，结果才为 `true`。
- `||` (或): 只要有一个条件为 `true`，结果就为 `true`。
- `!` (非): 取反。

```javascript
let isSunny = true;
let isWarm = false;

console.log(isSunny && isWarm); // false
console.log(isSunny || isWarm); // true
console.log(!isSunny);          // false
```

### 1.3.5. 其他运算符

#### 三元运算符

`condition ? value_if_true : value_if_false`

是 `if...else` 语句的简洁写法。

```javascript
let age = 20;
let message = (age >= 18) ? 'Adult' : 'Minor';
console.log(message); // 输出: 'Adult'
```

#### 空值处理运算符 (ES2020)

- **可选链运算符 (`?.`)**: 允许安全地访问深层嵌套对象的属性，如果引用为 `null` 或 `undefined`，表达式会短路并返回 `undefined`。
- **空值合并运算符 (`??`)**: 当左侧操作数为 `null` 或 `undefined` 时，返回其右侧操作数。

```javascript
const user = { name: 'Alice' };
console.log(user.address?.street); // 输出: undefined (不会报错)

let score = 0;
console.log(score ?? 100); // 输出: 0 (?? 只对 null 和 undefined 生效)
```

#### 解构赋值 (Destructuring Assignment)

可以将数组中的值或对象中的属性解构到不同的变量中。

```javascript
const [first, second] = [10, 20];
console.log(first); // 10

const { name, age } = { name: 'Bob', age: 30 };
console.log(name); // Bob
```

#### 展开运算符 (Spread Operator) `...`

允许一个可迭代对象（如数组）或对象展开。

```javascript
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
```

#### 类型运算符

- `typeof`: 返回一个表示操作数类型的字符串。
- `instanceof`: 判断一个对象是否是某个构造函数的实例。

```javascript
console.log(typeof 100);      // "number"
console.log(100 instanceof Number); // false (注意: 字面量不是实例)
console.log(new Number(100) instanceof Number); // true
```

# 2. 控制流语句

## 2.1. 条件语句

### if...else
根据条件执行不同的代码块。

```javascript
let score = 85;

if (score >= 90) {
    console.log('优秀');
} else if (score >= 75) {
    console.log('良好');
} else {
    console.log('需要努力');
}
// 输出: 良好
```

### switch
基于一个表达式的值，匹配对应的 `case` 并执行代码。

```javascript
let day = new Date().getDay(); // 0 (周日) - 6 (周六)

switch (day) {
    case 0:
        console.log('星期天');
        break; // break 防止“穿透”到下一个 case
    case 6:
        console.log('星期六');
        break;
    default:
        console.log('工作日');
}
```

## 2.2. 循环语句

### for
重复执行代码块，直到条件不再满足。

```javascript
for (let i = 0; i < 3; i++) {
    console.log(i);
}
// 输出: 0, 1, 2
```

### while
当条件为 `true` 时，重复执行代码块。

```javascript
let n = 0;
while (n < 3) {
    console.log(n);
    n++;
}
// 输出: 0, 1, 2
```

### for...in
遍历对象所有**可枚举的属性名 (key)**。

```javascript
const person = { name: 'Alice', age: 25 };

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}
// 输出:
// name: Alice
// age: 25
```

### for...of
遍历**可迭代对象 (Iterable)** 的**值 (value)**，如 `Array`, `String`, `Map`, `Set` 等。

```javascript
const colors = ['red', 'green', 'blue'];

for (const color of colors) {
    console.log(color);
}
// 输出:
// red
// green
// blue
```

#### `for...in` vs `for...of`

| 特性 | `for...in` | `for...of` |
| :--- | :--- | :--- |
| **遍历内容** | 对象的 **键 (key)** 或数组的 **索引 (index)** | 可迭代对象的 **值 (value)** |
| **主要目标** | 普通对象 | 可迭代对象 (Array, String, Map, Set) |
| **遍历原型链**| **会** | **不会** |
| **推荐用途** | 遍历对象的键 | 遍历数组、字符串等的值 |

## 2.3. 错误处理

### try...catch...finally
用于捕获和处理代码执行期间可能发生的错误。

- `try`: 包含可能出错的代码。
- `catch`: 如果 `try` 块中发生错误，`catch` 块会捕获错误并执行。
- `finally`: 无论是否发生错误，`finally` 块中的代码总会执行。

```javascript
try {
    JSON.parse('{ invalid JSON }'); // 抛出一个 SyntaxError
} catch (error) {
    console.error(`捕获到错误: ${error.message}`);
} finally {
    console.log('错误处理执行完毕。');
}
```

# 3. 数据结构

## 3.1. 对象 (Object)

对象是键值对（key-value pairs）的集合。

**创建与操作:**
```javascript
const person = {
    name: '张三',
    age: 25,
    // ES6 方法简写
    sayHello() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

person.city = '北京'; // 添加属性
person.sayHello(); // 调用方法
```

### 3.1.1. 对象中的私有变量

JavaScript 没有真正的私有属性，但可以通过一些模式模拟。

- **闭包模式**: 通过函数作用域隐藏变量。
- **命名约定**: 使用下划线 `_` 前缀表示“私有”。
- **私有类字段**: 在 `class` 中使用 `#` 前缀 (ES2022)。

```javascript
class Wallet {
    #balance = 0; // 私有字段

    constructor(initialBalance) {
        this.#balance = initialBalance;
    }

    getBalance() {
        return this.#balance;
    }
}

const myWallet = new Wallet(100);
console.log(myWallet.getBalance()); // 100
// console.log(myWallet.#balance); // 语法错误
```

### 3.1.2. JSON (JavaScript Object Notation)

一种轻量级的数据交换格式。**键必须是双引号**。

- `JSON.stringify()`: 对象 → JSON 字符串。
- `JSON.parse()`: JSON 字符串 → 对象。

```javascript
const book = { title: "JavaScript", year: 2023 };
const jsonString = JSON.stringify(book); // '{"title":"JavaScript","year":2023}'
const bookObject = JSON.parse(jsonString);
```

## 3.2. 数组 (Array)

数组是值的有序集合。

**创建与访问:**
```javascript
let fruits = ['Apple', 'Banana'];
console.log(fruits[0]); // 'Apple'
```

### 3.2.1. 常用方法

- **修改原数组**: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`
- **返回新数组**: `map()`, `filter()`, `slice()`
- **遍历**: `forEach()`
- **其他**: `join()`, `includes()`

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

numbers.forEach(n => console.log(n));
```

# 4. 函数

## 4.1. 函数基础

### 函数定义与调用

```js
function add(a, b = 0) { // b 是带默认值的参数
    return a + b;
}
add(10, 20); // 30
```

### 函数表达式 (匿名函数)

```js
const multiply = function(a, b) {
    return a * b;
};
```

### 箭头函数

```js
const subtract = (a, b) => a - b;
```

## 4.2. 作用域与闭包

- **作用域 (Scope)**: 变量的可访问范围（全局作用域、函数作用域、块级作用域）。
- **闭包 (Closure)**: 一个函数可以“记住”并访问它被创建时的词法作用域，即使它在当前作用域之外被执行。

```javascript
function createCounter() {
    let count = 0;
    return function() {
        count++;
        console.log(count);
    };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
```

## 4.3. `this` 关键字

`this` 的值在函数被调用时确定，取决于调用的上下文。

- **对象方法中**: `this` 指向该对象。
- **普通函数中**: `this` 指向全局对象 (`window`) 或在严格模式下为 `undefined`。
- **箭头函数中**: `this` 继承自外层词法作用域。
- **`call`, `apply`, `bind`**: 可以显式指定 `this`。

```javascript
const team = {
    name: 'Lakers',
    showTeam() {
        console.log(this.name); // this 指向 team
    }
};
team.showTeam(); // 'Lakers'
```

# 5. 原型与继承

## 5.1. 原型链

每个对象都有一个指向其“原型”对象的内部链接。当访问一个属性时，如果在当前对象上找不到，JavaScript 会沿着原型链向上查找。

## 5.2. 构造函数与原型继承

这是实现继承的经典方式。

```javascript
// 父类
function Animal(name) {
    this.name = name;
}
Animal.prototype.eat = function() {
    console.log(`${this.name} is eating.`);
};

// 子类
function Dog(name, breed) {
    Animal.call(this, name); // 继承属性
    this.breed = breed;
}

// 继承方法
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    console.log('Woof!');
};

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.eat(); // 'Buddy is eating.'
```

## 5.3. ES6 Class 继承

原型继承的语法糖，是现代 JavaScript 的推荐写法。

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log(`${this.name} is eating.`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // 调用父类构造函数
        this.breed = breed;
    }
    bark() {
        console.log('Woof!');
    }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.eat(); // 'Buddy is eating.'
```
