let a = document.getElementById("p1");
a.innerText = '22222'


a.onclick = function(){
    console.log('点击了p1元素');
    outer();
}


function a2() {
    var z = 30;
}


var x = 10;

function outer(){
    var y = 20;
    console.log('outer');
    function inner(){
        // console.log(`inner, x = ${x}, y = ${y}, z = ${z}`);
        console.log(`inner, x = ${x}, y = ${y}`);
    }
    inner();
}

let stu = {
    name: '张三',
    age: 18,
    sex: '男'
}

stu.height = 1.88;
delete stu.age;

stu.study = function(){
    console.log(`${this.name}正在学习`);
}

stu.sty = () => {
    console.log(`${this.name}正在学习`);
}


let stu2 = {_name: '李四'}
Object.defineProperties(stu2, 'name', {
    get(){
        return this._name;
    },
    set(value){
        this._name = value;
    }
})

console.log(stu);
