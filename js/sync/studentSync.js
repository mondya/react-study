

async function getStudent() {
    const reponse = await fetch("student.json")
    const array = await reponse.json();



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
};

getStudent();
