import React from 'react';
import {HashRouter as Router, Link, Route, Redirect,Switch} from 'react-router-dom';

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

class App2 extends React.Component{
  render(){
    return(
      <div>
      {/* 修改Url地址查看效果 */}
        <Router>
          <Switch> {/* switch的作用是，一旦有路由匹配成功，则不继续向下匹配 */}
            <Route path="/" exact component={(props)=>{console.log('这是传递过来的数据：',props.location.query?.msg); return(<h1>首页</h1>)}}></Route>
            <Route path="/form" exact component={FromCom}></Route>
            <Route path="/login" exact component={()=>{return(<h1>登录</h1>)}}></Route>
            <Route path="/loginInfo" exact component={LoginInfo}></Route>
            <Route path="/admin" exact component={()=>{return(<h1>这是admin页面</h1>)}}></Route>
            <Route path="/admin" exact component={()=>{return(<h1>这是另一个admin页面</h1>)}}></Route>
            <Route path="/child" exact component={ChildCom}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App2;
