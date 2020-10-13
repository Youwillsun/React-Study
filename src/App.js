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

function Me(props){
  console.log(props);
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

function News(props){
  console.log(props);
  return(
    <div>
      <h1>新闻页面，新闻id：{props.match.params.id}</h1>
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
            {/* 传值: 跳转路径 请求参数 设置的hash值 传的数据 */}
            <Link to={{pathname:'/me',search:'?username=admin',hash:'#abc',state:{msg:'Hello World'}}} replace>个人中心</Link>
            <Link to="/news/456798">新闻页面</Link>
          </div>

          {/* 匹配的页面 */}
          <Route path="/" exact component={Home}></Route>
          <Route path="/product" component={Product}></Route>
          <Route path="/me" component={Me}></Route>
          <Route path="/news/:id" component={News}></Route>
        </Router>
      </div>
    )
  }
}

export default App;
