1. 引入@ant-icons
2. 全局引入antd.css
3. koa-body版本降级
4. 要提前建立uploads文件夹


### Dragger\index.tsx
- useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数(initialValue)返回的 ref 对象在组件的整个生命周期内保持不变
useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
useState 就是一个 Hook，通过在函数组件里调用它来给组件添加一些内部 state,React 会在重复渲染时保留这个 state，useState 会返回一对值：当前状态和一个让你更新它的函数

### 拖动目标上触发事件(源元素)
｜事件｜	触发｜
｜--｜--      ｜
｜ondragstart	｜用户开始拖动元素时触发
｜ondrag	｜元素正在拖动时触发
｜ondragend	｜用户完成元素拖动后触发

### 释放目标时触发的事件
事件	触发
ondragenter	当被鼠标拖动的对象进入其容器范围内时触发此事件
ondragover	当某被拖动的对象在另一对象容器范围内拖动时触发此事件,如果需要设置允许放置，我们必须阻止对元素的默认处理方式
ondragleave	当被鼠标拖动的对象离开其容器范围内时触发此事件
ondrop	在一个拖动过程中，释放鼠标键时触发此事件
