
import React, { Component } from 'react'
import {conf} from '../layout/config/config'
import AutoCompleteText from './AutoCompleteText';
import {Table} from 'react-bootstrap';
import * as R from 'ramda'
export default class NewOrder extends Component {

  state ={
    products:[],
    productsList:[]
  }

  componentDidMount = () =>{
    this.getProducts();
  }
  getProducts = () =>{
    var nameS = conf.servername + "Product/findAllProducts"
        
    fetch(nameS,{
      method: 'GET',
      headers:{
          "Content-Type":'application/json',
          'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
      }
  }
  ).then(response => {
      if(response.ok) {
          response.json().then(json => this.setState({products:json}))
      }
  })
   }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  addToList = (item) =>
  {
    var wynik=R.findIndex(R.propEq('id',item.id))(this.state.productsList)

    if(wynik==-1)
    {
    this.setState({productsList: R.append(item,this.state.productsList)})
    }else{
        this.setState({productsList: R.update(wynik,item.quantity,this.state.productsList)})
    }
  }
 
  render() {
    return (
      <div>
        <AutoCompleteText products={this.state.products} addToList={this.addToList}></AutoCompleteText>

        <Table striped bordered hover>
         
         <thead>
             <tr>
             <th>#</th>
             <th>Nazwa</th>
             <th>Ilosc</th>
             <th></th>
             </tr>
         </thead>

         <tbody>
        {this.state.productsList.map((product)=>
                {
                  
                    
                      return(
                        <tr>
                        <th>1</th>
                        <th>{this.state.products[R.findIndex(R.propEq('id',product.id))(this.state.products)].name}</th>
                        <th>{product.quantity}</th>
                        <th></th>
                        </tr> 
                        )
                      
                 
                  
                })} 
         </tbody>

         </Table>
                 
      </div>
    )
  }
}
