function test(obj: string) {
    console.log(obj.toLowerCase());
}

test('HELLO'); // 'hello'
// test(123); // 报错：Argument of type 'number' is not assignable to parameter of type 'string'.

// 1.标注变量，一般可以省略，因为可以根据后面的字段推断出前面变量类型
let messagge: string = 'hello world'

// 2.标注参数
function great(name: string) {
    console.log(`hello ${name}`);
}

const names = ['alice', 'bob', 'charles']

const lowerNames = names.map((name:string) => name.toLowerCase())

lowerNames.forEach(name => {
    great(name);
})

// 标注返回值
function add(a: number, b: number): number {
    return a + b;
}
console.log(add(1, 2)); // 3


// type
type Cat = {
    name: string,
    age: number
}

const c1: Cat = {
    name: 'alice',
    age: 1
}
const c2: Cat = {
    name: 'bob',
    age: 2
}

// interface
interface Dog {
    name: string,
    age?: number
}
const d1: Dog = {
    name: 'buddy'
}

function testDog(dog: Dog) {
    console.log(dog.name);
    if (dog.age) {
        console.log(dog.age);
    }
}

interface Api {
    foo(): void
}

function testApi(api: Api) {
    api.foo();
}
testApi({
    foo() {
        console.log('foo');
    }
})

// 功能：输出一段文字（参数1）， 参数2决定文字的对齐方式
function printText(text: string, alignment: 'left' | 'right' | 'center') {
    console.log(text, alignment);
}

printText('hello', 'left'); // 'hello left'
printText('hello', 'right'); // 'hello right'
printText('hello', 'center'); // 'hello center'

// 泛型
interface Ref<T> {
    value: T
}

const ref1: Ref<number> = {
    value: 100
}
const ref2: Ref<string> = {
    value: 'hello'
}


function ref<T>(n: T): Ref<T> {
    return {
        value: n
    }
}

const ref3 = ref(100);
console.log(ref3.value); // 100
const ref4 = ref('hello');
console.log(ref4.value); // 'hello'
