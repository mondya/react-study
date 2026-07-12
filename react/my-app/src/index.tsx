import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Hello from './pages/Hello';
import Person from './pages/Person';
import P2 from './pages/P2';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const stu1 = {id: 1, name: '张三', age: 27, sex: '男', photo: 'https://img2.baidu.com/it/u=3422045222,2422823322&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'}
const stu2 = {id: 2, name: '李四', age: 25, sex: '女', photo: 'https://img2.baidu.com/it/u=3422045222,2422823322&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'}
const stu3 = {id: 3, name: '王五', age: 28, sex: '男', photo: 'https://img2.baidu.com/it/u=3422045222,2422823322&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'}

root.render(
  <React.StrictMode>
    {/* 入门案例 */}
    {/* <Hello msg='TypeScript' age={20}></Hello>
    <Hello msg='noAge'></Hello> */}

    {/* 人物看片 */}
    {/* <Person student={stu1}></Person>
    <Person student={stu2}></Person>
    <Person student={stu3}></Person> */}

    {/* 列表循环 */}
    <P2 students={[stu1, stu2, stu3]} hideAge={true}></P2>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
