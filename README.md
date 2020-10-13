[TOC]

# React笔记

## 特点：

1. 声明式的设计
2. 高效，采用虚拟DOM来实现DOM渲染，最大限度的减少DOM操作
3. 灵活，跟其他库灵活搭配使用
4. JSX，俗称JS里面写HTML，JavaScript语法的扩展
5. 组件化，模块化，代码容易复用
6. 单项数据流，没有实现双向数据绑定，数据->视图->事件->数据

## 创建项目

**通过react的脚手架，创建项目进行开发，部署。**

1. 安装脚手架： create-react-app

   ```
   cnpm install create-react-app -g
   ```

2. 创建项目

   ```
   create-react-app [项目名称]
   ```

## React元素渲染

```
let h1 = <h1>Hello world</h1>;
使用JSX写法，可以创建元素对象。
 注意：使用JSX元素对象，或者组件对象，必须只有一个根元素（根节点）
```

### 案例：

```react
function Clock(props) {
  return (
    <div>
      <h1>现在的时间是：{props.date.toLocaleTimeString()}</h1>
      <h2>这是函数式组件</h2>
    </div>
  );
}

function run(){
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(run,1000);
```

## React Jsx

### 优点：

1. JSX执行更快，编译为JavaScript代码同时进行优化。
2. 类型更安全，编辑过程如果出错就不能编译，及时发现错误。
3. JSX编写模板更加简单快速。（不要跟Vue比）

### 注意：

1. Jsx必须要有根节点
2. 正常的普通HTML元素要小写，如果大写，默认为组件。

## JSX 表达式

1. 由HTML元素构成
2. 中间如果需要插入变量用`{}`
3. `{}`中间可使用表达式
4. `{}`中间表达式可以使用JSX对象
5. 属性和HTML内容一样都是用`{}`来插入内容

## JSX 注释 类名 style样式

1. style 中不可以存在多个class属性。

   `<div class="abc" class={actice}></div>`这是错误的写法。

2. style样式中，如果存在多个单词的属性组合，第二个单词开始，首字母大写 ,或者用引号包括起来

   ```react
   let example = {
     color:'red',
     backgroundColor:'blue',
     borderBottom:'3px solid red'
   }
   
   let example = {
     'background-color':'red'
   }
   ```

3. 多个类共存的操作

   ```react
   let classNameArr = ['hello','world'].join(' ');
   let element = (
     <div>
       <span className={classNameArr}>Hello World</span>
     </div>
   );
   
   或者
   
   let classStr = "cdf";
   let element = (
     <div>
       <span className={"abc " + classStr}>Hello World</span>
     </div>
   );
   ```

4. 注释

   ```react
   let element = (
     <div style={example}>
       <span className={classNameArr}>Hello World</span>
       {/* 注释是这样的 */}
     </div>
   );
   ```

## React 组件

1. 函数式组件

   ```react
   function Clock(props) {
     return (
       <div>
         <h1>现在的时间是：{props.date.toLocaleTimeString()}</h1>
         <h2>这是函数式组件</h2>
       </div>
     );
   }
   
   function run(){
     ReactDOM.render(
       <Clock date={new Date()} />,
       document.getElementById('root')
     );
   }
   
   setInterval(run,1000);
   ```

2. 类组件

   ```react
   class HelloWord extends React.Component {
     render(){
       return (
         <div>
           <h1>Hello Word</h1>
           <h2>这是类组件</h2>
           <h3>{this.props.weather}</h3>
         </div>
       )
     }
   }
   
   ReactDOM.render(
     <HelloWord weather="出太阳" />,
     document.getElementById('root')
   )
   ```

3. 复合组件——组件中有其他的组件【组件嵌套】

## React State（状态）

- 相当于VUE的data，但是使用方式是不一样的。

```react
class Clock extends React.Component {
  constructor(props) {
    super(props)
    // 状态(数据)——构造函数初始化数据
    this.state = {
      time:new Date().toLocaleTimeString(),
      name:this.props.name
    }
  }

  render(){
    return(
      <div>
        <h1>当前时间：{this.state.time}</h1>
        <h2>我是 {this.state.name} 人</h2>
      </div>
    )
  }

  // 生命周期函数——组件渲染完成时的函数
  componentDidMount(){
    // 通过 this.setState 修改完数据后，react不会直接修改DOM里面的内容，而是会在这个函数所有设置状态改变之后，统一对比虚拟DOM对象，然后统一修改，提升性能
    setInterval(()=>{
      this.setState({time:new Date().toLocaleTimeString()});
    },1000)
  }
}

ReactDOM.render(
  <Clock name="中国"/>,
  document.getElementById('root')
);
```

## 父组件向子组件传值——Props

- 父组件向子组件传递数据，单向数据流。

- props传值可以是任意类型。

- props可以设置默认值

  ```
  HelloMessage.defaultProps = {name:"abc"}
  ```

### 案例：

父组件ParentCom通过点击事件触发state更新，然后每次更新都会传递给ChildCom子组件，子组件通过props拿到父组件传递过来的数据，然后判断数据状态，更改自己的显示文本。

```react
class ParentCom extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isActive:true
    }
  }

  render(){
    return(
      <div>
        {/* 通过箭头函数可以保证this指向正确 */}
        <button onClick={()=>this.changeShow()}>控制子元素显示</button>
        <ChildCom isActive={this.state.isActive} />
      </div>
    )
  }

  changeShow(){
    if(this.state.isActive) this.setState({ isActive:false })
    else this.setState({isActive:true})
  }
}

class ChildCom extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let strClass = this.props.isActive === true ? 'active' : 'no-active';

    return(
      <div>
        <span>{strClass}</span>
      </div>
    )
  }
}

ReactDOM.render(
  <ParentCom />,
  document.getElementById('root')
)
```

## 子组件向父组件传值——调用父组件函数从而操作父组件数据

- props可以传递函数，props可以传递父组件的函数，就可以去修改父组件的state，从而达到传递数据给父组件的目的。

### 案例：

父组件ParentCom定义了一个setChild函数修改自己的state，state的来源来自父组件的传参。

父组件把setChild函数通过传参的方式传递给子组件ChildCom，然后子组件直接调用父组件传递过过来方法，并把自己的state传到这个方法里。

以此达到传给父组件数据的目的。

```react
class ParentCom extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      childData:""
    }
  }

  render(){
    return(
      <div>
        <h1>子组件传递给父组件的数据：{this.state.childData}</h1>
        <ChildCom setChildData={this.setChildData} />
      </div>
    )
  }

  setChildData = (data) => {
    this.setState({
      childData:data
    })
  }
}

class ChildCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg:'Hello World'
    }
  }

  render(){
    return(
      <div>
        <button onClick={()=>{this.props.setChildData(this.state.msg)}}>传递Hello World给父组件</button>
      </div>
    )
  }
}

ReactDOM.render(
  <ParentCom />,
  document.getElementById('root')
)
```

## React 事件

### 特点：

1. 绑定事件的命名必须是驼峰命名法。

2. 传入的是一个函数，而不是字符串

   ```
   xxx ： 指代函数名。
   <div onClick={this.xxx}>按钮</div>
   ```

### 事件对象 e：

- react返回的事件对象，代理的是原生的事件对象，如果想要查看事件对象的具体内容，必须输出事件对象的属性。
- 原生js中，阻止默认事件 可以使用 `return false`，但是在react中，因为返回的对象是代理的，所以必须使用`e.preventDefault()`来阻止默认事件。

### 传参：

在React中如果写成 `<div onClick={this.xxx('123')}>按钮</div> `这样传参是不行的。传参时要这样写：

```
// e 是默认参数，不用时可以不传
<div onClick={(e)=>{this.xxx('123',e)}}>按钮</div>
```

## React 条件渲染

可以直接通过条件预算符，如：if...else... 或者三元运算符 得出要渲染的JSX对象。

```react
function UserGreet(props){
  return (
    <h1>欢迎登陆</h1>
  )
}

function UserLogin(props) {
  return(
    <h1>请先登陆</h1>
  )
}

class ParentCom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogin: false
    }
  }

  render(){
    if(this.state.isLogin){
      return(<UserGreet />);
    } else {
      return(<UserLogin />)
    }
  }
}

ReactDOM.render(
  <ParentCom />,
  do
```

## React 列表渲染

```react
class Welcome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[
        {title:'第一节课',content:'事件内容'},
        {title:'第二节课',content:'条件渲染'},
        {title:'第三节课',content:'列表渲染'},
      ]
    }
  }
  render(){
    return(
      <div>
        <ul>
        {/* 在{}里使用map循环，构建<li>xxx</li>形式 */}
          {this.state.list.map((item,index)=>{
            return(
              <li key={index}>
                <h1>{item.title}</h1>
                <h2>{item.content}</h2>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <Welcome />,
  document.getElementById('root')
)
```

## React 生命周期

生命周期也成钩子函数，是一个组件从实例化到销毁的整个过程。整个生命周期中我们有许多可以调用的事件。

### 生命周期的三个状态：

1. `Mounting：组件将要插入到DOM中`
2. `Updating：将数据更新到DOM中`
3. `Unmounting：将组件移除DOM中`

### 生命周期的钩子函数（方法，事件）：

1. `ComponentWillMount：组件将要渲染`
2. `ComponentDidMount：组件渲染完毕`
3. `ComponentWillReceiveProps：组件将要接收props数据`
4. `ShouldComponentUpdate：组件接收到新的state或者props，判断是否更新，返回布尔值`
5. `ComponentWillUpdate：组件将要更新`
6. `ComponentDidUpdate：组件更新完毕`
7. `ComponentWillUnmount：组件将要卸载`

```react
class ComLife extends React.Component {
  constructor(props) {
    console.log('constructor: ', '构造函数');
    super(props);
    this.state = {
      msg:'Hello World',
      update:this.props.update
    }
  }

  componentWillMount(){
    console.log('componentWillMount: ', '组件将要被渲染');
  }

  render(){
    console.log('render: ', '渲染函数');
    return(
      <div>
        <h1>{this.state.msg}</h1>
        <button onClick={this.changeMsg}>组件更新</button>
      </div>
    )
  }
  changeMsg=()=>{
    this.setState({
      msg:'你好，世界！'
    })
  }

  componentDidMount(){
    console.log('componentDidMount: ', '组件渲染完毕');
  }
  
  componentWillReceiveProps(){
    console.log('componentWillReceiveProps: ', '组件将要接收到props数据');
  }

  shouldComponentUpdate(){
    // 判断组件是否要更新
    console.log('shouldComponentUpdate: ', '组件接收到新的state或者props，判断是否更新，返回布尔值');
    if(this.state.update){
      return true;
    } else {
      return false;
    }
  }

  componentWillUpdate(){
    console.log('componentWillUpdate: ', '组件将要更新');
  }

  componentDidUpdate(){
    console.log('componentDidUpdate: ', '组件更新完毕');
  }

  componentWillUnmount(){
    console.log('componentWillUnmount: ', '组件将要卸载');
  }
}

class ParentCom extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isShow:true
    }
  }
  render(){
    if(this.state.isShow){
      return (
        <div>
          <button onClick={this.removeComLife}>移除</button>
          <ComLife update={true}/>
        </div>
      )
    } else {
      return (<h1>将ComLife移除</h1>)
    }
  }
  removeComLife = ()=>{
    this.setState({
      isShow: false
    })
  }

}

ReactDOM.render(
  <ParentCom />,
  document.getElementById('root')
)
```

## 引入外部定义的组件

**searchCom.js**

```react
import React from 'react';

class SearchCom extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>这是搜索组件</h1>
            </div>
        )
    }
}

export default SearchCom;
```

**index.js**

```react
import React from 'react';
import ReactDOM from 'react-dom';

import SearchCom from './components/searchCom';

ReactDOM.render(
  <SearchCom />,
  document.getElementById('root')
)
```

## React 插槽

插槽就是在组件中写入内容，这些内容可以被识别和控制。React需要自己开发支持插槽的功能。

### 原理：

组件中写入HTML，可以传入到props中。

### 案例：

```react
class ParentCom extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    console.log('props',this.props);
    return(
      <div>
        <h1>组件插槽</h1>
        {/* 直接全部插入 */}
        {this.props.children}
        {/* 根据内容不同，插入到不同位置 */}
        <ChildCom>
          <h1 position="top">这是顶部内容</h1>
          <h1 position="center">这是中部内容</h1>
          <h1 position="bottom">这是底部内容</h1>
        </ChildCom>
      </div>
    )
  }
}

class ChildCom extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    const headerCom = this.props.children.filter(item=>item.props.position === 'top');
    const mainCom = this.props.children.filter(item=>item.props.position === 'center');
    const footerCom = this.props.children.filter(item=>item.props.position === 'bottom');

    return(
      <div>
        <div className="header">
          {headerCom}
        </div>
        <div className="main">
          {mainCom}
        </div>
        <div className="footer">
          {footerCom}
        </div>
      </div>
    )
  }
}

class RootCom extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      arr:[1,2,3]
    }
  }
  render(){
    return(
      <ParentCom>
        <h2 name="a">子组件1</h2>
        <h2 name={this.state.arr}>子组件2</h2>
       <h2>子组件3</h2>
      </ParentCom>
    )
  }
}

ReactDOM.render(
  <RootCom />,
  document.getElementById('root')
)
```

## React 路由

### 安装：

```
npm install react-router-dom --save
```

### ReactRouter 三大组件：

- Router：所有路由组件的根组件（底层组件）,包括路由规则的最外层容器。

  - Router可以在一个组件中写多个

  - Router上有一个属性 `basename：设置此路由的根路径`

- Route：路由匹配规则组件，显示当前规则对应的组件。

- Link：路由跳转的组件

  - to属性：可以设置跳转地址，也可以传参。
  - replace属性：点击链接后，将新地址替换成历史访问记录的原地址。

**注意：如果要精确匹配，那么可以在route上设置 exact 属性。**

### Router使用案例：

```react
import React from 'react';

// hash模式
import {HashRouter as Router, Link, Route} from 'react-router-dom';

// History 模式 需要后端配置使用
// import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

function Home(){
  return(
    <div>
      <h1>admin首页</h1>
    </div>
  )
}

function Me(){
  return(
    <div>
      <h1>admin个人中心</h1>
    </div>
  )
}

function Product(){
  return(
    <div>
      <h1>admin产品页面</h1>
    </div>
  )
}

class App extends React.Component{
  render(){
    return(
      <div id="app">
      <div>所有页面都显示</div>
      {/* 通过修改Url可以看出效果 */}
      <Router>
        <Route path="/" exact component={()=>(<div>首页</div>)}></Route>
        <Route path="/me" component={()=>(<div>个人中心</div>)}></Route>
        <Route path="/produce" component={()=>(<div>产品页面</div>)}></Route>
      </Router>

      {/* basename 会帮你在路由前面自动拼接设置的字符串，例如basename="/admin", 那么<Link to="/">Home</Link> 就会变成 <Link to="/admin/">Home</Link>*/}
      {/* 这其实就是一种嵌套子路由的形式，也可以不用basename，直接写全路径 */}
        <Router basename="/admin">
          {/* 跳转 */}
          <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
            <Link to="/me">个人中心</Link>
          </div>

          {/* 匹配的页面 */}
          <Route path="/" exact component={Home}></Route>
          <Route path="/product" component={Product}></Route>
          <Route path="/me" component={Me}></Route>
        </Router>
      </div>
    )
  }
}

export default App;
```

### Link 跳转路由：

**传参（to）：**

```react
{/* 传值: 跳转路径 请求参数 设置的hash值 传的数据 */}
<Link to={{pathname:'/me',search:'?username=admin',hash:'#abc',state:{msg:'Hello World'}}}>个人中心</Link>
```

**替换（replace）：**

```
<Link to="/">Home</Link>
<Link to="/product">Product</Link>
<Link to='/me' replace>个人中心</Link>
```

replace 可以对路由进行替换。

- 默认加载Home页面，然后点击Product页面，此时在product页面点击后退按钮会进入到Home页面，然后在Home页面点击前进则进入到Product页面。
- 如果我们点击完了Product之后，继续点击了个人中心，由于个人中心路由中存在replace，就会进行路由替换，会把product替换掉。
- 此时我们在个人中心页面点击后退会直接退回到Home页面而不是product页面。

### 获取路由参数：

例如有一个新闻页面：

```react
 <Link to="/news/456798">新闻页面</Link>
 
 <Route path="/news/:id" component={News}></Route>
```

跳转到新闻页面之后，如何获取路由的id值，通过`props.match.params.id` 获取：

```react
function News(props){
  console.log(props);
  return(
    <div>
      <h1>新闻页面，新闻id：{props.match.params.id}</h1>
    </div>
  )
}
```

### 路由重定向：

#### 案例：

```react
import React from 'react';
import {HashRouter as Router, Link, Route, Redirect} from 'react-router-dom';

function LoginInfo(props){
  console.log(props)
  if(props.location.state.loginState === 'success'){
    return (<Redirect to="/admin"></Redirect>)
  } else {
    return (<Redirect to="/login"></Redirect>)
  }
}

let FromCom = ()=>{
  const pathObj = {
    pathname:'/loginInfo',
    state:{
      loginState: 'success'
    }
  }
  return(
    <div>
      <h1>表单验证</h1>
      <Link to={pathObj}>点击跳转</Link>
    </div>
  )
}

class App2 extends React.Component{
  render(){
    return(
      <div>
        {/* 修改Url地址查看效果 */}
        <Router>
          <Route path="/" exact component={()=>{return(<h1>首页</h1>)}}></Route>
          <Route path="/form" exact component={FromCom}></Route>
          <Route path="/login" exact component={()=>{return(<h1>登录</h1>)}}></Route>
          <Route path="/loginInfo" exact component={LoginInfo}></Route>
          <Route path="/admin" exact component={()=>{return(<h1>这是admin页面</h1>)}}></Route>
        </Router>
      </div>
    )
  }
}

export default App2;
```

### 路由 Switch：

switch的作用是只匹配一个，一旦有路由匹配成功，即便后面的路由也能匹配成功，也不继续向下匹配 。

```react
class App2 extends React.Component{
  render(){
    return(
      <div>
      {/* 修改Url地址查看效果 */}
        <Router>
          <Switch>
            <Route path="/" exact component={()=>{return(<h1>首页</h1>)}}></Route>
            <Route path="/form" exact component={FromCom}></Route>
            <Route path="/login" exact component={()=>{return(<h1>登录</h1>)}}></Route>
            <Route path="/loginInfo" exact component={LoginInfo}></Route>
            <Route path="/admin" exact component={()=>{return(<h1>这是admin页面</h1>)}}></Route>
            <Route path="/admin" exact component={()=>{return(<h1>这是另一个admin页面</h1>)}}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
```

### JS跳转路由

**childCom组件：**

```react
class ChildCom extends React.Component {
  render() {
    return(
      <div>
        <button onClick={this.clickEvent}>跳转到首页</button>
      </div>
    )
  }

  clickEvent=()=>{
    console.log(this.props);
    // 跳转页面传递数据
    this.props.history.push({pathname:"/",query:{msg:'这是由ChildCom发给首页的数据'}})
    // 前进
    // this.props.history.go(1);
    // this.props.history.goForward();
    // 后退
    // this.props.history.go(-1);
    // this.props.history.goBack();
  }
}
```

**路由坑：**

```react
class App2 extends React.Component{
  render(){
    return(
      <div>
      {/* 修改Url地址查看效果 */}
        <Router>
          <Switch> {/* switch的作用是，一旦有路由匹配成功，则不继续向下匹配 */}
            <Route path="/" exact component={(props)=>{console.log('这是传递过来的数据：',props.location.query?.msg); return(<h1>首页</h1>)}}></Route>
            <Route path="/child" exact component={ChildCom}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
```

## Redux

- 解决React数据管理（状态管理）,用于中大型，数据比较庞大，组件之间数据交互多的情况下使用。

### Redux分析：

1. Store：数据仓库，保存数据的地方。
2. State：是一个对象，数据仓库里的所有数据都放在一个state里。
3. Action：一个动作，触发数据改变的方法。
4. Dispatch：将动作触发成方法。
5. Reducer：是一个函数，通过获取动作，改变数据，生成一个新的state。

### 安装：

```
npm install redux --save
```

### 数据操作：

1. 初始化数据

   ```react
   // 获取动作，改变数据
   const reducer = function(state={num:0},action){
     switch(action.type){
       case 'add':
         state.num++;
         break;
       case 'decrement':
         state.num--;
         break;
       default:
         state = state;
         break;
     }
     // 返回时结构，重新创建对象，防止React误认为同一数据而不更新
     return {...state}
   }
   
   // 创建仓库
   const store = createStore(reducer);
   ```

2. 获取数据

   ```react
   let state = store.getState();
   ```

3. 修改数据

   ```react
     // 通过仓库的方法dispatch进行修改数据
     store.dispatch({type:"add"});
   ```

4. 修改视图（监听数据变化，重新渲染视图）

   ```react
   ReactDOM.render(
     <Counter />,
     document.getElementById('root')
   );
   
   // 监听数据 重新渲染
   store.subscribe(()=>{
     ReactDOM.render(
       <Counter />,
       document.getElementById('root')
     )
   })
   ```

### 案例：

```react
import React from 'react';
import ReactDOM from 'react-dom';
import Redux,{createStore} from 'redux';

// 获取动作，改变数据
const reducer = function(state={num:0},action){
  switch(action.type){
    case 'add':
      state.num++;
      break;
    case 'decrement':
      state.num--;
      break;
    default:
      state = state;
      break;
  }
  // 返回时结构，重新创建对象，防止React误认为同一数据而不更新
  return {...state}
}

// 创建仓库
const store = createStore(reducer);

function add(){
  // 通过仓库的方法dispatch进行修改数据
  store.dispatch({type:"add"});
}

function decrement(){
  // 通过仓库的方法dispatch进行修改数据
  store.dispatch({type:"decrement"});
}

const Counter = function(props) {
  let state = store.getState();
  return (
    <div>
      <h1>计数数量：{state.num}</h1>

      <button onClick={add}>计数+1</button>
      <button onClick={decrement}>计数-1</button>
    </div>
  )
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);

// 监听数据 重新渲染
store.subscribe(()=>{
  ReactDOM.render(
    <Counter />,
    document.getElementById('root')
  )
})
```

## React-Redux

### 安装：

```
npm install react-redux --save
```

### 概念：

Provider组件：自动将store里的state和组件进行关联。

Connect方法：将组件和数据（方法）进行连接。

### 数据操作：

1. 初始化数据,实例化store

   ```react
   function reducer(state={num:0},action){
     switch(action.type){
       case "add":
         state.num++;
         break;
       default:
         state = state;
         break;
     }
     return {...state};
   }
   
   const store = createStore(reducer);
   ```

2. 数据获取,数据修改

   ```react
   // 将状态映射到props的函数
   function mapStateToProps(state){
     return{
       value:state.num
     }
   }
   
   // 将修改state的方法映射到props,默认会传入store里的dispatch方法
   function mapDispatchToProps(dispatch){
     return {
       onAddClick:()=>{dispatch(addAction)}
     }
   }
   
   // 将上面的2个方法：数据仓库的state和修改state的方法映射到组件上，形成新的组件
   const App = connect(
     mapStateToProps,
     mapDispatchToProps
   )(Counter);
   
   // 获取数据
   class Counter extends React.Component {
     render(){
       // 计数
       const value = this.props.value;
   
       // 将修改数据的事件或方法传递到props
       const onAddClick = this.props.onAddClick();
       return(
         <div>
           <h1>计数的数量：{value}</h1>
           <button onClick={onAddClick}>计数+1</button>
         </div>
       )
     }
   }
   ```

   MapStateToProps： 这个函数将store和state映射到组件的props里。

   MapDispatchToProps：这个函数将store中的dispatch映射到组件的props里，实现了方法的共享。

### 案例：

```react
class Counter extends React.Component {
  render(){
    // 计数
    const value = this.props.value;

    // 将修改数据的事件或方法传递到props
    const onAddClick = this.props.onAddClick;
    return(
      <div>
        <h1>计数的数量：{value}</h1>
        <button onClick={onAddClick}>计数+1</button>
      </div>
    )
  }
}

const addAction = {
  type:"add"
}

function reducer(state={num:0},action){
  switch(action.type){
    case "add":
      state.num++;
      break;
    default:
      state = state;
      break;
  }
  return {...state};
}

const store = createStore(reducer);

// 将状态映射到props的函数
function mapStateToProps(state){
  return{
    value:state.num
  }
}

// 将修改state的方法映射到props,默认会传入store里的dispatch方法
function mapDispatchToProps(dispatch){
  return {
    onAddClick:()=>{dispatch(addAction)}
  }
}

// 将上面的2个方法：数据仓库的state和修改state的方法映射到组件上，形成新的组件
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

