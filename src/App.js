import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Header from './components/layout/Header'
import Index from './components/layout/Index';
import IndexClients from './components/layout/IndexClients';
import IndexWarehouse from './components/layout/IndexWarehouse';
import AutoCompleteText from './components/AutoCompleteText';
import ClientList from './components/ClientList'
import Login from './components/layout/Login';
import productList from './components/productList';



class App extends Component {

  state
  render() {
    var cookie = "tokenWareHouse"
    var re = new RegExp('[; ]'+cookie+'=([^\\s;]*)');
    var cookieVal = unescape((' '+document.cookie).match(re));
    //console.log("a" + cookieVal + "a");
    if(cookieVal == "null"){
      return(
        <Router>           
          <Route component={Login} exact/>
        </Router>
      )
    }

    return (
      
      
      
      <Router> 
        <Header></Header>
        <Route path="/" component={Index} exact/>
        <Route path="/clients" component={IndexClients}></Route>
        <Route path="/warehouse" component={IndexWarehouse}></Route> 

        <Route path="/clientAdd" component={IndexWarehouse}></Route> 
        <Route path="/clientList" component={ClientList}></Route> 
        <Route path="/orderAdd" component={IndexWarehouse}></Route> 
        <Route path="/orderList" component={IndexWarehouse}></Route> 


        <Route path="/productAdd" component={IndexWarehouse}></Route> 
        <Route path="/productList" component={IndexWarehouse}></Route> 
        <Route path="/returnAdd" component={IndexWarehouse}></Route> 

        <Route  path="/editClient/:id" component={AutoCompleteText}></Route>
        <Route  path="/deleteClient/:id" component={AutoCompleteText}></Route>

      </Router>
      
    );
  }
}

export default App;
