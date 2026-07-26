# AxiosStudy 组件执行流程

对应代码：`src/pages/AxiosStudy.tsx`

## 先记住一个核心规律

React 函数组件不是只执行一次。

当状态发生变化时，React 会重新调用整个组件函数：

```tsx
AxiosStudy()
```

在这个例子中，组件至少会经历两个重要阶段：

1. 第一次渲染：还没有学生数据，页面显示“加载中”。
2. 请求成功后的渲染：已经拿到学生数据，页面显示学生姓名。

## 第一次渲染

### 第 1 步：React 调用组件函数

```tsx
export default function AxiosStudy() {
```

React 开始从上到下执行函数中的代码。

### 第 2 步：创建学生状态

```tsx
const [student, setStudent] = useState<Student | null>(null);
```

第一次执行时：

```tsx
student === null
```

这是因为传给 `useState` 的初始值是 `null`。

`useState` 返回一个数组：

```tsx
[
  当前状态,
  修改状态的方法
]
```

数组解构后：

```tsx
student    // 当前学生数据
setStudent // 修改学生数据的方法
```

### 第 3 步：创建错误状态

```tsx
const [error, setError] = useState("");
```

第一次执行时：

```tsx
error === ""
```

空字符串表示当前没有错误。

### 第 4 步：注册 useEffect

```tsx
useEffect(() => {
  // 请求代码
}, []);
```

执行到这里时，`useEffect` 里面的请求代码不会马上执行。

React 会先记住这个 effect，等页面完成本次渲染后再执行它。

最后的空数组：

```tsx
[]
```

表示这个 effect 不依赖组件中的其他数据，正常情况下只需要在组件首次显示后执行。

### 第 5 步：判断是否存在错误

```tsx
if (error) {
  return <h3>{error}</h3>;
}
```

此时 `error` 是空字符串。空字符串会被当作 `false`，因此不会进入这个 `if`。

### 第 6 步：判断是否有学生数据

```tsx
if (!student) {
  return <h3>加载中...</h3>;
}
```

此时 `student` 是 `null`：

```tsx
!null === true
```

所以组件第一次返回：

```tsx
<h3>加载中...</h3>
```

页面上会先显示“加载中...”。

## 页面第一次显示后

### 第 7 步：React 执行 useEffect

页面完成第一次渲染后，React 开始执行之前注册的 `useEffect`。

### 第 8 步：创建请求取消控制器

```tsx
const controller = new AbortController();
```

可以把 `controller` 理解成这次请求的遥控器。

后面可以通过：

```tsx
controller.abort();
```

取消还没有完成的请求。

### 第 9 步：定义 updateStudent 函数

```tsx
async function updateStudent() {
  // 请求代码
}
```

这里只是在定义函数，还没有发送请求。

可以理解为：这里只是写好了操作步骤，还没有开始执行。

### 第 10 步：调用 updateStudent

```tsx
updateStudent();
```

执行到这一行后，才真正进入 `updateStudent` 函数并开始发送请求。

### 第 11 步：Axios 发送请求

```tsx
const resp = await axios.get<Result<Student>>(
  'http://localhost:8080/api/student/2',
  { signal: controller.signal }
);
```

这段代码的含义是：

- `axios.get`：发送 GET 请求。
- 第一个参数：后端请求地址。
- 第二个参数：Axios 请求配置。
- `signal`：把取消控制器和这次请求关联起来。
- `await`：等待后端响应。
- `Result<Student>`：告诉 TypeScript 响应数据的类型。

程序在 `await` 处暂停的是 `updateStudent` 函数，而不是整个网页。

等待后端响应期间，浏览器仍然可以正常操作。

## 请求成功以后

### 第 12 步：await 得到响应

假设后端返回：

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "id": 2,
    "name": "李四",
    "age": 20,
    "sex": "男",
    "photo": "https://example.com/photo.jpg"
  }
}
```

Axios 会把完整响应保存到 `resp` 中。

### 第 13 步：读取学生数据

```tsx
resp.data.data
```

这里有两个 `.data`：

```text
resp
└── data              Axios 响应体
    └── data          Result 中真正的学生对象
```

第一个 `data` 是 Axios 响应对象中的响应体。

第二个 `data` 是后端统一结果 `Result` 中的数据字段。

### 第 14 步：更新 React 状态

```tsx
setStudent(resp.data.data);
```

这一步会：

1. 把后端返回的学生对象保存到 React 状态中。
2. 通知 React 当前组件的数据发生了变化。
3. 让 React 再次调用 `AxiosStudy()`。

不能直接写成：

```tsx
student = resp.data.data;
```

因为普通赋值不会通知 React 更新页面，并且这里的 `student` 还是一个 `const` 变量。

## 第二次渲染

### 第 15 步：React 再次调用组件

React 再次从头执行：

```tsx
AxiosStudy()
```

### 第 16 步：useState 返回已经保存的状态

代码仍然是：

```tsx
const [student, setStudent] = useState<Student | null>(null);
```

但是 `null` 只用于第一次创建状态。

第二次渲染时，React 会返回刚才通过 `setStudent` 保存的学生对象：

```tsx
student = {
  id: 2,
  name: "李四",
  // 其他属性
};
```

### 第 17 步：错误判断不成立

```tsx
if (error)
```

`error` 仍然是空字符串，所以继续向下执行。

### 第 18 步：加载判断不成立

```tsx
if (!student)
```

现在 `student` 已经是学生对象，不再是 `null`，因此不会显示“加载中...”。

### 第 19 步：显示学生姓名

```tsx
return <h3>{student.name}</h3>;
```

页面最终显示：

```text
李四
```

## 请求失败时的流程

如果后端没有启动、地址错误或网络断开，`axios.get` 会抛出错误，代码进入 `catch`：

```tsx
catch (err) {
  if (!controller.signal.aborted) {
    setError("学生信息加载失败");
    console.error(err);
  }
}
```

随后执行：

```tsx
setError("学生信息加载失败");
```

这会通知 React 再次渲染组件。

再次渲染时：

```tsx
if (error) {
  return <h3>{error}</h3>;
}
```

条件成立，页面显示：

```text
学生信息加载失败
```

## 组件离开页面时

`useEffect` 返回了一个清理函数：

```tsx
return () => controller.abort();
```

如果用户在请求完成前离开这个组件，React 会执行这个清理函数。

它会通知 Axios 取消还没有完成的请求，避免已经离开的组件继续处理旧请求。

## 完整执行顺序

```text
React 调用 AxiosStudy
    ↓
创建 student 状态，初始值为 null
    ↓
创建 error 状态，初始值为空字符串
    ↓
注册 useEffect
    ↓
student 是 null
    ↓
页面显示“加载中...”
    ↓
页面第一次渲染完成
    ↓
React 执行 useEffect
    ↓
创建 AbortController
    ↓
定义 updateStudent
    ↓
调用 updateStudent
    ↓
Axios 发送请求
    ↓
await 等待后端响应
    ↓
请求成功
    ↓
setStudent 保存学生数据
    ↓
React 再次调用 AxiosStudy
    ↓
student 已经有数据
    ↓
页面显示 student.name
```

## 关于开发环境执行两次

项目入口如果使用了：

```tsx
<React.StrictMode>
  <AxiosStudy />
</React.StrictMode>
```

React 在开发环境可能会执行额外的“挂载、清理、再挂载”检查，用来帮助发现副作用代码的问题。

因此开发者工具中可能看到 effect 或请求相关代码执行两次。这里的取消逻辑会在清理时调用：

```tsx
controller.abort();
```

正式生产构建不会因为这项开发检查而重复执行。
