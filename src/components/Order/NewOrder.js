
import React, { Component } from 'react'
import {conf} from '../layout/config/config'
import AutoCompleteText from './AutoCompleteText';
import {Table,Button} from 'react-bootstrap';
import * as R from 'ramda'
export default class NewOrder extends Component {

  state ={
    products:[],
    productsList:[],
    productInfo:''
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
          response.json().then(json => this.setState({productsList:json}))
      }
  })
   }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  editProductsQuantity = (product) => {
    var nameS = conf.servername + "Product/getInfoAboutProduct"
        
          fetch(nameS,{
            method: 'POST',
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            },
            body:JSON.stringify({'id':product.id

            })
        }
        ).then(response => {
            if(response.ok) {
                response.json().then(json => this.setState({productInfo:json}))
            }
        })


  }
  addToList = (item) =>
  {
    var wynik=R.findIndex(R.propEq('id',item.id))(this.state.products)

    if(wynik===-1)
    {
    this.setState({products: R.append(item,this.state.products)})
    }else{
        this.setState({products: R.update(wynik,item.quantity,this.state.products)})
        console.log(this.state.products)
    }
  }
 
  render() {
    var counter=0;
    return (
      <div>
        <AutoCompleteText products={this.state.productsList} addToList={this.addToList}></AutoCompleteText>

        <Table striped bordered hover>
         <thead>
             <tr><th>#</th><th>Nazwa</th><th>Ilosc</th> <th></th> </tr></thead>
         <tbody>
           
        {
          this.state.products.map((product)=>
                {
                  
                    counter++;
                      return(
                        <tr>
                        <th>{counter}</th>
                        <th>{this.state.productsList[R.findIndex(R.propEq('id',product.id))(this.state.productsList)].name}</th>
                        <th><input placeholder={product.quantity}></input></th>
                        <th><Button onClick={()=>{this.editProductsQuantity(product)}} ></Button></th>
                        </tr> 
                        )
                      
                 
                  
                })} 
         </tbody>

         </Table>
                 
      </div>
    )
  }
}
