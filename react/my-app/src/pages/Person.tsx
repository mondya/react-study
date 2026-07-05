import { Student } from '../model/Student';



function Person({student}: {student: Student}) {


    // e：事件对象
    function handleClick(e: React.MouseEvent) {
        console.log(student);
        console.log(e);
    }


    return (
        <div className="student">
            <div className="avatar">
                <img src={student.photo} alt="" onClick={handleClick} />
            </div>
            <h1 onClick={handleClick}>{student.name}</h1>
            <h2>{student.id}</h2>
            <p>性别：{student.sex} 年龄：{student.age}</p>
        </div>
    )
}

export default Person;