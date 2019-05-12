import React, { Component } from 'react';
import {Table,Button} from 'react-bootstrap';
import Product from './Product'

import { conf } from '../layout/config/config'

 class OrderDetails extends Component {
     state ={
         order:{
           products:[]
         }
     }
    componentDidMount = () =>
    {
       this.loadOrders();
    }

    loadOrders =  ()  =>
    {
        
        var nameS = conf.servername + "order/getInfoAboutOrder"
        
          fetch(nameS,{
            method: 'POST',
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            },
            body:JSON.stringify({'id':this.props.match.params.id})
        }
        ).then(response => {
            if(response.ok) {
              
                response.json().then(json => this.setState({order:json}))
            }
        })
  
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
      }
    

  render() {
    return (
      <div>
      <nav class="navbar navbar-light bg-light">
                    <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Szczegoly zamowienia numer: {this.props.match.params.id}</span>
                </nav>
 <Table striped bordered hover >
 
 
    <thead >
        <tr>
        <th>#</th>
        <th>Nazwa produktu</th>
        <th>Ilosc</th>
        </tr>
    </thead>

    <tbody>
        {console.log(this.state.order.products)}
       {this.state.order.products.map((productt)=>
        {
           return <Product product={productt}/>
        })}
      
        </tbody>

    </Table>
</div>
    )
  }
}export default OrderDetails
