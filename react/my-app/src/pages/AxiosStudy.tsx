// axios 是一个发送 HTTP 网络请求的工具。
// 这里使用它向后端请求学生信息。
import axios from "axios";

// useState：在组件中保存会发生变化的数据。
// useEffect：在组件显示后执行网络请求等操作。
import { useEffect, useState } from "react";

// Result 是后端统一返回结果的类型。
// 例如后端可能返回：{ code: 200, message: "成功", data: {...} }。
import Result from "../model/Result";

// Student 描述一个学生对象应该有哪些属性以及每个属性的类型。
// 例如：id、name、age、sex 和 photo。
import { Student } from "../model/Student";

// 这是一个 React 函数组件。
// 当其他文件写 <AxiosStudy /> 时，React 就会调用这个函数并显示它返回的 JSX。
export default function AxiosStudy() {
    /*
     * useState<Student | null>(null) 可以分成三部分理解：
     *
     * 1. Student | null
     *    表示这里保存的值可以是一个 Student，也可以是 null。
     *
     * 2. 最后面的 null
     *    是 student 的初始值。组件刚显示时还没有拿到后端数据，所以先设为 null。
     *
     * 3. useState 会返回一个数组，数组里有两个值：
     *    第一个是当前状态，第二个是修改状态的函数。
     *
     * 所以下面的数组解构写法：
     * const [student, setStudent] = useState(...)
     * 大致可以理解成：
     * const student = useState返回数组[0];
     * const setStudent = useState返回数组[1];
     *
     * student：当前的学生数据。
     * setStudent：React 提供的更新学生数据的方法。
     * 调用 setStudent 后，React 会用新数据重新渲染当前组件。
     */
    const [student, setStudent] = useState<Student | null>(null);

    /*
     * error 保存错误提示。
     * 初始值 "" 是空字符串，表示暂时没有错误。
     * setError 用来修改 error，修改后同样会触发页面重新渲染。
     */
    const [error, setError] = useState("");

    /*
     * useEffect 用来执行网络请求、定时器等“组件渲染之外的操作”。
     *
     * 它接收两个参数：
     * 第一个参数：要执行的函数。
     * 第二个参数：依赖数组。
     *
     * 这里的依赖数组是空数组 []，表示组件第一次显示后执行这个 effect。
     * 开发环境开启 React.StrictMode 时，React 可能会额外执行一次来检查代码，
     * 这是开发模式的检查行为，正式生产环境不会因此重复执行。
     */
    useEffect(() => {
        /*
         * AbortController 是浏览器提供的“取消控制器”。
         * 可以把 controller 想象成这次请求的遥控器。
         * 后面执行 controller.abort()，就相当于按下“取消请求”按钮。
         */
        const controller = new AbortController();

        /*
         * async 表示 updateStudent 是异步函数。
         * 异步函数内部可以使用 await，等待网络请求完成。
         */
        async function updateStudent() {
            // try 中放可能失败的代码；如果请求失败，就会进入下面的 catch。
            try {
                /*
                 * axios.get() 用来发送 GET 请求，它接收两个参数：
                 *
                 * 参数一：请求地址。
                 * 参数二：请求配置对象。
                 *
                 * <Result<Student>> 是 TypeScript 泛型，用来告诉 TypeScript：
                 * “后端响应体符合 Result 类型，并且 Result 里面的 data 是 Student 类型”。
                 *
                 * await 表示先等待请求完成，再把响应结果赋值给 resp。
                 * 等待期间浏览器不会卡死，用户仍然可以点击和操作其他内容。
                 */
                const resp = await axios.get<Result<Student>>(
                    'http://localhost:8080/api/student/2',

                    /*
                     * 这是 axios 的请求配置对象。
                     *
                     * controller.signal 是 controller 发给请求的“控制信号”。
                     * 把这个 signal 交给 axios 后，axios 才知道这次请求受哪个
                     * AbortController 控制。
                     *
                     * 注意：这一行不会取消请求，它只是建立关联。
                     * 真正取消请求的是后面的 controller.abort()。
                     */
                    { signal: controller.signal }
                );

                /*
                 * resp 是 axios 返回的完整响应对象。
                 * 第一个 .data 是 axios 响应体；第二个 .data 是 Result 里的学生数据。
                 *
                 * 假设后端返回：
                 * {
                 *   "code": 200,
                 *   "message": "成功",
                 *   "data": { "id": 2, "name": "李四", ... }
                 * }
                 *
                 * 那么 resp.data.data 就是里面的学生对象。
                 * setStudent 会保存这个对象，并通知 React 重新显示学生姓名。
                 */
                setStudent(resp.data.data);
            } catch (err) {
                /*
                 * 请求地址错误、后端未启动、网络断开等情况都会进入 catch。
                 *
                 * controller.signal.aborted 为 true，表示请求是我们主动取消的，
                 * 这种情况不是网络故障，因此不需要向用户显示“加载失败”。
                 */
                if (!controller.signal.aborted) {
                    // 在页面上显示友好的中文错误信息。
                    setError("学生信息加载失败");

                    // 在浏览器控制台打印原始错误，方便开发时排查问题。
                    console.error(err);
                }
            }
        }

        // 上面只是定义了 updateStudent；调用它之后才会真正发送请求。
        updateStudent();

        /*
         * useEffect 可以返回一个“清理函数”。
         * 当组件从页面中消失，或者这个 effect 需要重新执行时，React 会调用它。
         *
         * controller.abort() 会发出取消信号：
         * 如果请求还没完成，axios 会终止这次请求；
         * 如果请求已经完成，调用它也不会影响已经得到的数据。
         */
        return () => controller.abort();
    }, []);

    /*
     * 下面是“条件渲染”：根据当前数据状态显示不同内容。
     *
     * 如果 error 不是空字符串，说明请求失败，优先显示错误信息。
     * return 执行后，函数到这里就结束，不会继续执行下面的代码。
     */
    if (error) {
        return <h3>{error}</h3>;
    }

    /*
     * !student 表示 student 不存在。
     * 组件刚显示时 student 的值是 null，所以先显示“加载中...”。
     */
    if (!student) {
        return <h3>加载中...</h3>;
    }

    /*
     * 能执行到这里说明：
     * 1. 没有错误；
     * 2. student 已经不是 null；
     * 3. 后端数据加载成功。
     *
     * JSX 中的 {student.name} 会读取学生对象的 name 属性并显示到页面上。
     */
    return <h3>{student.name}</h3>
}
