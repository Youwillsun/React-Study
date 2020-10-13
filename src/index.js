import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import SearchCom from './components/searchCom';

// import App from './App';
// import App2 from './App2';

import Redux,{createStore} from 'redux';
import {Provider,connect} from 'react-redux';

// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


// 函数组件-----------------------------------------------------------------start
// function Clock(props) {
//   return (
//     <div>
//       <h1>现在的时间是：{props.date.toLocaleTimeString()}</h1>
//       <h2>这是函数式组件</h2>
//     </div>
//   );
// }

// function run(){
//   ReactDOM.render(
//     <Clock date={new Date()} />,
//     document.getElementById('root')
//   );
// }

// setInterval(run,1000);
// 函数组件-----------------------------------------------------------------end


// 样式---------------------------------------------------------------------start
// let example = {
//   color:'red',
//   backgroundColor:'blue',
//   borderBottom:'3px solid red'
// }

// // 增加类名
// let classNameArr = ['hello','world'].join(' ');

// let element = (
//   <div style={example}>
//     <span className={classNameArr}>Hello World</span>
//     {/* 注释是这样的 */}
//   </div>
// );

// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );
// 样式---------------------------------------------------------------------end



// 类组件-------------------------------------------------------------------start
// class HelloWord extends React.Component {
//   render(){
//     return (
//       <div>
//         <h1>Hello Word</h1>
//         <h2>这是类组件</h2>
//         <h3>{this.props.weather}</h3>
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <HelloWord weather="出太阳" />,
//   document.getElementById('root')
// )
// 类组件-------------------------------------------------------------------end


// state 状态--------------------------------------------------------------start
// class Clock extends React.Component {
//   constructor(props) {
//     super(props)
//     // 状态(数据)——构造函数初始化数据
//     this.state = {
//       time:new Date().toLocaleTimeString(),
//       name:this.props.name
//     }
//   }

//   render(){
//     return(
//       <div>
//         <h1>当前时间：{this.state.time}</h1>
//         <h2>我是 {this.state.name} 人</h2>
//       </div>
//     )
//   }

//   // 生命周期函数——组件渲染完成时的函数
//   componentDidMount(){
//     // 通过 this.setState 修改完数据后，react不会直接修改DOM里面的内容，而是会在这个函数所有设置状态改变之后，统一对比虚拟DOM对象，然后统一修改，提升性能
//     setInterval(()=>{
//       this.setState({time:new Date().toLocaleTimeString()});
//     },1000)
//   }
// }

// ReactDOM.render(
//   <Clock name="中国"/>,
//   document.getElementById('root')
// );
// state 状态--------------------------------------------------------------end


// 父组件向子组件传值------------------------------------------------------start
// class ParentCom extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       isActive:true
//     }
//   }

//   render(){
//     return(
//       <div>
//         {/* 通过箭头函数可以保证this指向正确 */}
//         <button onClick={()=>this.changeShow()}>控制子元素显示</button>
//         <ChildCom isActive={this.state.isActive} />
//       </div>
//     )
//   }

//   changeShow(){
//     if(this.state.isActive) this.setState({ isActive:false })
//     else this.setState({isActive:true})
//   }
// }

// class ChildCom extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render(){
//     let strClass = this.props.isActive === true ? 'active' : 'no-active';

//     return(
//       <div>
//         <span>{strClass}</span>
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <ParentCom />,
//   document.getElementById('root')
// )
// 父组件向子组件传值------------------------------------------------------end



// 子组件向父组件传值------------------------------------------------------start
// class ParentCom extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       childData:""
//     }
//   }

//   render(){
//     return(
//       <div>
//         <h1>子组件传递给父组件的数据：{this.state.childData}</h1>
//         <ChildCom setChildData={this.setChildData} />
//       </div>
//     )
//   }

//   setChildData = (data) => {
//     this.setState({
//       childData:data
//     })
//   }
// }

// class ChildCom extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       msg:'Hello World'
//     }
//   }

//   render(){
//     return(
//       <div>
//         <button onClick={()=>{this.props.setChildData(this.state.msg)}}>传递Hello World给父组件</button>
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <ParentCom />,
//   document.getElementById('root')
// )
// 子组件向父组件传值------------------------------------------------------end


// react条件渲染----------------------------------------------------------start
// function UserGreet(props){
//   return (
//     <h1>欢迎登陆</h1>
//   )
// }

// function UserLogin(props) {
//   return(
//     <h1>请先登陆</h1>
//   )
// }

// class ParentCom extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       isLogin: false
//     }
//   }

//   render(){
//     if(this.state.isLogin){
//       return(<UserGreet />);
//     } else {
//       return(<UserLogin />)
//     }
//   }
// }

// ReactDOM.render(
//   <ParentCom />,
//   document.getElementById('root')
// )
// react条件渲染----------------------------------------------------------end



// react列表渲染----------------------------------------------------------start
// class Welcome extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       list:[
//         {title:'第一节课',content:'事件内容'},
//         {title:'第二节课',content:'条件渲染'},
//         {title:'第三节课',content:'列表渲染'},
//       ]
//     }
//   }
//   render(){
//     return(
//       <div>
//         <ul>
//         {/* 在{}里使用map循环，构建<li>xxx</li>形式 */}
//         {this.state.list.map((item,index)=>{
//             return(
//               <li key={index}>
//                 <h1>{item.title}</h1>
//                 <h2>{item.content}</h2>
//               </li>
//             )
//           })}
//         </ul>
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <Welcome />,
//   document.getElementById('root')
// )
// react列表渲染----------------------------------------------------------end


// react生命周期----------------------------------------------------------start
// class ComLife extends React.Component {
//   constructor(props) {
//     console.log('constructor: ', '构造函数');
//     super(props);
//     this.state = {
//       msg:'Hello World',
//       update:this.props.update
//     }
//   }

//   componentWillMount(){
//     console.log('componentWillMount: ', '组件将要被渲染');
//   }

//   render(){
//     console.log('render: ', '渲染函数');
//     return(
//       <div>
//         <h1>{this.state.msg}</h1>
//         <button onClick={this.changeMsg}>组件更新</button>
//       </div>
//     )
//   }
//   changeMsg=()=>{
//     this.setState({
//       msg:'你好，世界！'
//     })
//   }

//   componentDidMount(){
//     console.log('componentDidMount: ', '组件渲染完毕');
//   }
  
//   componentWillReceiveProps(){
//     console.log('componentWillReceiveProps: ', '组件将要接收到props数据');
//   }

//   shouldComponentUpdate(){
//     // 判断组件是否要更新
//     console.log('shouldComponentUpdate: ', '组件接收到新的state或者props，判断是否更新，返回布尔值');
//     if(this.state.update){
//       return true;
//     } else {
//       return false;
//     }
//   }

//   componentWillUpdate(){
//     console.log('componentWillUpdate: ', '组件将要更新');
//   }

//   componentDidUpdate(){
//     console.log('componentDidUpdate: ', '组件更新完毕');
//   }

//   componentWillUnmount(){
//     console.log('componentWillUnmount: ', '组件将要卸载');
//   }
// }

// class ParentCom extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       isShow:true
//     }
//   }
//   render(){
//     if(this.state.isShow){
//       return (
//         <div>
//           <button onClick={this.removeComLife}>移除</button>
//           <ComLife update={true}/>
//         </div>
//       )
//     } else {
//       return (<h1>将ComLife移除</h1>)
//     }
//   }
//   removeComLife = ()=>{
//     this.setState({
//       isShow: false
//     })
//   }

// }

// ReactDOM.render(
//   <ParentCom />,
//   document.getElementById('root')
// )
// react生命周期----------------------------------------------------------end


// 引入外部定义的组件---------------------------------------------------------------start
// ReactDOM.render(
//   <SearchCom />,
//   document.getElementById('root')
// )
// 引入外部定义的组件---------------------------------------------------------------end



// React 插槽----------------------------------------------------------------------start
// class ParentCom extends React.Component{
//   constructor(props) {
//     super(props);
//   }

//   render(){
//     console.log('props',this.props);
//     return(
//       <div>
//         <h1>组件插槽</h1>
//         {/* 直接全部插入 */}
//         {this.props.children}
//         {/* 根据内容不同，插入到不同位置 */}
//         <ChildCom>
//           <h1 position="top">这是顶部内容</h1>
//           <h1 position="center">这是中部内容</h1>
//           <h1 position="bottom">这是底部内容</h1>
//         </ChildCom>
//       </div>
//     )
//   }
// }

// class ChildCom extends React.Component{
//   constructor(props){
//     super(props);
//   }

//   render(){

//     const headerCom = this.props.children.filter(item=>item.props.position === 'top');
//     const mainCom = this.props.children.filter(item=>item.props.position === 'center');
//     const footerCom = this.props.children.filter(item=>item.props.position === 'bottom');

//     return(
//       <div>
//         <div className="header">
//           {headerCom}
//         </div>
//         <div className="main">
//           {mainCom}
//         </div>
//         <div className="footer">
//           {footerCom}
//         </div>
//       </div>
//     )
//   }
// }

// class RootCom extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       arr:[1,2,3]
//     }
//   }
//   render(){
//     return(
//       <ParentCom>
//         <h2 name="a">子组件1</h2>
//         <h2 name={this.state.arr}>子组件2</h2>
//        <h2>子组件3</h2>
//       </ParentCom>
//     )
//   }
// }

// ReactDOM.render(
//   <RootCom />,
//   document.getElementById('root')
// )
// React 插槽----------------------------------------------------------------------end



// React路由-----------------------------------------------------------------------start
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )
// React路由-----------------------------------------------------------------------end


// React 路由重定向 switch js跳转路由-------------------------------------------------------------------start
// ReactDOM.render(
//   <App2 />,
//   document.getElementById('root')
// )
// React 路由重定向 switch js跳转路由-------------------------------------------------------------------end



// Redux-------------------------------------------------------------------------------------------------start
// 获取动作，改变数据
// const reducer = function(state={num:0},action){
//   switch(action.type){
//     case 'add':
//       state.num++;
//       break;
//     case 'decrement':
//       state.num--;
//       break;
//     default:
//       state = state;
//       break;
//   }
//   // 返回时结构，重新创建对象，防止React误认为同一数据而不更新
//   return {...state}
// }

// // 创建仓库
// const store = createStore(reducer);

// function add(){
//   // 通过仓库的方法dispatch进行修改数据
//   store.dispatch({type:"add"});
// }

// function decrement(){
//   // 通过仓库的方法dispatch进行修改数据
//   store.dispatch({type:"decrement"});
// }

// const Counter = function(props) {
//   let state = store.getState();
//   return (
//     <div>
//       <h1>计数数量：{state.num}</h1>

//       <button onClick={add}>计数+1</button>
//       <button onClick={decrement}>计数-1</button>
//     </div>
//   )
// }

// ReactDOM.render(
//   <Counter />,
//   document.getElementById('root')
// );

// // 监听数据 重新渲染
// store.subscribe(()=>{
//   ReactDOM.render(
//     <Counter />,
//     document.getElementById('root')
//   )
// })
// Redux-------------------------------------------------------------------------------------------------end



// react-redux---------------------------------------------------------------------------------------------start
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
// react-redux---------------------------------------------------------------------------------------------end