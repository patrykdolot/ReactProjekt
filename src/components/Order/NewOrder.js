
import React, { Component } from 'react'
import {conf} from '../layout/config/config'
import ClientListOrder from './ClientListOrder'
import AutoCompleteText from './AutoCompleteText';
import {Table,Button,Modal,Form} from 'react-bootstrap';
import * as R from 'ramda'

import {Formik} from 'formik'
export default class NewOrder extends Component {

  state ={
    products:[],
    productsList:[],
    productInfo:'',
    show:false,
    howMany:'',
    productIdToChange:''
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
   changeHandler = event =>{
     if(event.target.value<this.state.productInfo.logicState)
     {
      this.setState({
        howMany:event.target.value
      })
     }else{
      this.setState({
        howMany:this.state.productInfo.logicState
      })
     }
    
  }
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  handleClose= () =>{ 
    this.setState({ show: false });   
}

handleCloseSuccess = () =>
{
  if(this.state.howMany<1)
  {
    this.handleClose()
  }else{
  this.state.products.map(product =>{
    if(product.id===this.state.productIdToChange)
    {
      product.quantity=this.state.howMany
    }
  })
    this.handleClose()
}

}

handleShow(){ 
          this.setState({ show: true });      
}


editProductsQuantity = (product) => {
    this.setState({productIdToChange:product.id})
    this.setState({howMany:product.quantity})
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
          this.handleShow()
  }

  addToList = (item) =>
  {
    var wynik=R.findIndex(R.propEq('id',item.id))(this.state.products)
    console.log(wynik)
    if(wynik===-1)
    {
    this.setState({products: R.append(item,this.state.products)})
    }else{
      var products2=this.state.products
         products2.map(product=>{
          if(product.id===item.id)
          {
            console.log("powinno zmienc")
            product.quantity=product.quantity+item.quantity
          }
        })
        this.setState({products:products2})
        console.log(item)
    }
  }

  deleteProductFromList = (product1) => {
    this.setState({products: this.state.products.filter((product)=> { 
      return product !== product1
  })});
  } 

  gimmeComponent = () =>
  {
    console.log("wszedlem w gimmy")
    if(this.state.products.length>0)
    {
      return(<ClientListOrder products={this.state.products}></ClientListOrder>)
    }
  }

 
  render() {
    var counter=0;
    return (
      <div>
          <nav class="navbar navbar-light bg-light">
                            <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Dodawanie nowego zamówienia</span>
                        </nav>
        <AutoCompleteText style={{display:'none'}} products={this.state.productsList} addToList={this.addToList}></AutoCompleteText>

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
                        <th>{product.quantity}</th>
                        <th><Button  variant="secondary" onClick={()=>{this.editProductsQuantity(product)}}>Edytuj</Button>{" "
                         }<Button  variant="danger"onClick={()=>{this.deleteProductFromList(product)}}>Usun</Button></th>
                        </tr> 
                        )
                      
                 
                  
                })} 
         </tbody>

         </Table>
                 
  

 <Modal show={this.state.show} onHide={this.handleClose}>
<Modal.Header closeButton>
<Modal.Title>Edytuj ilosc</Modal.Title>
</Modal.Header>
<Modal.Body >
<div style={{float:"left", position:"relative"}}>

{ <div><input  type="text" value={this.state.howMany} onChange={this.changeHandler} /> { "/"} {this.state.productInfo.logicState } </div> }
</div>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={this.handleClose}>
  Anuluj
</Button>
<Button variant="primary" onClick={this.handleCloseSuccess} >
  Edytuj
</Button>
</Modal.Footer>
</Modal>


{this.gimmeComponent()}
</div>   
 
    )
      
      

    
  }
  
}
