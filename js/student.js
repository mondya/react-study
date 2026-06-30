let array = [
    {id: 1, name: "张三", sex: "男", age: 18},
    {id: 2, name: "李四", sex: "男", age: 19},
    {id: 3, name: "王五", sex: "男", age: 20}
];


const template = document.getElementById("student-template");
const row = template.content;
const [c1, c2, c3, c4] = row.querySelectorAll(".td");
const tbody = document.querySelector(".tbody");


for (const element of array) {
    c1.textContent = element.id;
    c2.textContent = element.name;
    c3.textContent = element.sex;
    c4.textContent = element.age;
    const newNode = document.importNode(row, true);
    tbody.appendChild(newNode);
}
