import React from "react"
import { Student } from "../model/Student";

// export default function P2() {
// /*
//     已知有数组 const colors = ['red', 'green', 'blue']
//     请根据数组中的元素创建三个不同的 div 元素，每个 div 元素的背景颜色为数组中的元素
// */  
// const colors = ['red', 'green', 'blue']
// // divs的实际内容是：
// // <div>red</div>
// // <div>green</div>
// // <div>blue</div>
// const divs = colors.map((color) => (
//     <div key={color}>
//         {color}
//     </div>
// ))
// return (
//     <React.Fragment>
//         {divs}
//     </React.Fragment>
// )
// }
export default function P2({students, hideAge=true}: {students: Student[], hideAge: boolean}) {
    const jsx = students.map((student) => (
        <div key={student.id}>
            {student.name}
            {/* 条件判断: 当 hideAge 为 false 时，显示年龄 */}
            {!hideAge && <div>{student.age}</div>}
        </div>
    ))
    return (
        <React.Fragment>
            {jsx}
        </React.Fragment>
    )
}
