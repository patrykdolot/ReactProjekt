import React, { Component } from 'react';
import {Table,Button} from 'react-bootstrap';
import { conf } from '../layout/config/config'
import Order from './Order'
 class OrdersList extends Component {

    state = {
        orders:[
        
        ]
        ,
        draft:''
    }

    componentDidMount = () =>
    {
       this.loadOrders();
    }

    loadOrders =  ()  =>
    {
        
        var nameS = conf.servername + "order/findAllOrderByDateDsc"
        
          fetch(nameS,{
            method: 'GET',
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            }
        }
        ).then(response => {
            if(response.ok) {
              
                response.json().then(json => this.setState({orders:json}))
            }
        })
  
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
      }
    
      sprawdzian = () =>
      {
          this.setState({clients:{'companyName':'LOLOLO'}})
      }

    render() {
        return (
            
        <div>
              <nav class="navbar navbar-light bg-light">
                            <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Lista zamowien</span>
                        </nav>
         <Table striped bordered hover >
         
         
            <thead >
                <tr>
                <th>#</th>
                <th>Nazwa firmy</th>
                <th>Data</th>
                <th>Liczba produktow</th>
                <th>Ilosc produktow</th>
                <th>Cena</th>
                <th></th>
                </tr>
            </thead>

            <tbody>
                
               {this.state.orders.map((order)=>
                {
                    return <Order order={order}/>
                })}
              
                </tbody>

            </Table>
    </div>
        )}


}export default OrdersList

