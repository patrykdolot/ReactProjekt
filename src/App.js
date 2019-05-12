import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom"
import Header from './components/layout/Header'
import Index from './components/layout/Index';
import IndexClients from './components/layout/IndexClients';
import IndexWarehouse from './components/layout/IndexWarehouse';
import AutoCompleteText from './components/Order/AutoCompleteText';
import ClientList from './components/Client/ClientList'
import Login from './components/layout/Login';
import productList from './components/productList';
import AddProduct from './components/layout/AddProduct';
import ProductDetails from './components/layout/ProductDetails';
import OrdersList from './components/Order/OrdersList'
import ReturnOrder from './components/layout/ReturnOrder';
import OrderHistory from './components/layout/OrderHistory';
import OrderHistoryDetails from './components/layout/OrderHistoryDetails';
import WorkerList from './components/layout/WorkerList';
import NewClient from './components/Client/NewClient'
import NewOrder from './components/Order/NewOrder'
import ClientOrder from './components/Order/ClientOrder'
import ClientOrders from './components/Client/ClientOrders'
import OrderDetails from './components/Order/OrderDetails'



class App extends Component {

  state
  render() {
    var cookie = "tokenWareHouse"
    var re = new RegExp('[; ]'+cookie+'=([^\\s;]*)');
    var cookieVal = unescape((' '+document.cookie).match(re));

    if(cookieVal === "null"){

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
        <Route path="/clients" component={IndexClients} exact ></Route>
        <Route path="/warehouse" component={IndexWarehouse} exact></Route> 

        <Route path="/clientAdd" component={NewClient}></Route> 

        <Route path="/clientList/:id" component={ClientList}></Route> 
        <Route path="/ordersClient/:id" component={ClientOrders}></Route> 
        <Route exact path="/clientList" component={ClientList}></Route> 
        <Route path="/orderList" component={OrdersList}></Route> 


        <Route path="/productAdd" component={AddProduct}></Route> 
        <Route path="/productList" component={productList}></Route> 


        <Route path="/returnAdd" component={ReturnOrder}></Route> 
        <Route path="/orderHistory" component={OrderHistory}></Route> 



        <Route  path="/editClient/:id" component={AutoCompleteText}></Route>
        <Route  path="/deleteClient/:id" component={AutoCompleteText}></Route>

        <Route  path="/productDetails/:id" component={ProductDetails}></Route>


        <Route  path="/supplyDetalis/:id" component={OrderHistoryDetails}></Route>

        <Route  path="/WorkerList" component={WorkerList}></Route>


        <Route path="/selectClient" component={ClientOrder}></Route>
        <Route  path="/newOrder" component={NewOrder}></Route>

        <Route  path="/orderInfo/:id" component={OrderDetails}></Route>



        
    
       

      </Router>
      
    );
  }
}

export default App;
