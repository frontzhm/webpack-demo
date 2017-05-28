import './index.less';
// import component from './component'
// // require('./index.less');
// // var component = require('./component');

// document.body.appendChild(component());

import React from 'react';
import ReactDOM from 'react-dom';

class HelloReact extends React.Component{
  render(){
    return <h3>React可以了，踩了好多坑啊~</h3>
  }
}

ReactDOM.render(<HelloReact/>,document.getElementById('root'))
