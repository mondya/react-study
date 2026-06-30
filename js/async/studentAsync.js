const template = document.getElementById("student-template");
const row = template.content;
const [c1, c2, c3, c4] = row.querySelectorAll(".td");
const tbody = document.querySelector(".tbody");

console.log("1. 开始发送请求");

fetch("student.json")
    .then(response => {
        console.log("3. 收到响应，开始解析 JSON");
        return response.json();
    })
    .then(students => {
        console.log("4. JSON 解析完成，开始渲染页面");

        for (const element of students) {
            c1.textContent = element.id;
            c2.textContent = element.name;
            c3.textContent = element.sex;
            c4.textContent = element.age;
            const newNode = document.importNode(row, true);
            tbody.appendChild(newNode);
        }
    })
    .catch(error => {
        console.error("加载学生数据失败", error);
    });

console.log("2. 请求发送后，后面的代码继续执行");
