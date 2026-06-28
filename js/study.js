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