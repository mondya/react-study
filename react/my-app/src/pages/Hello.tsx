// properties
// function Hello(props: {msg: string, age: number}) {
//     // tsx
//     return <h2>Hello React {props.msg}, you are {props.age} years old</h2>
// }


const props = {
    msg: '',
    age: 20,
}

const {msg, age} = props

function Hello({msg, age=0}: {msg: string, age?: number}) {
    return <h2>Hello React {msg}, you are {age} years old</h2>
}

export default Hello;

/*
 * 小结：
   组件标签的：
   1. 字符串属性赋值直接用''或者""即可，如 <Hello msg='TypeScript' age={20}></Hello>
   2. 除字符串以外，其他的属性需要使用{}包裹，如 <Hello msg='noAge'></Hello>
   3. 可选属性使用?: 表示，如 age?: number
   4. 定义属性时，可以使用解构赋值简化属性使用，并且解构赋值后可以给属性指定默认值
 */