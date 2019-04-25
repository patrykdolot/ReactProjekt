import React, { Component } from 'react'
import { Formik } from 'formik'
import { conf } from '../layout/config/config'
import { Form, Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import ReturnOrderTab from './ReturnOrderTab'

class ReturnOrder extends Component {

  constructor() {
    super();
  }

  state = {
    products: [

    ],
    order: [

    ],
    palletes: [

    ],
    pallete: [

    ],
    usedProduct: [

    ],
    palletesTemp: [

    ],
    palTemp: [

    ],
    usedProductTemp: [

    ],
    draft: '',
    dane: {},
    showSendButton: false
  }

  buildSelect(products) {
    var arr = [];

    //console.log(this.state.products + "sssss")

    if (this.state.products.length > 0) {
      for (let i = 0; i < this.state.products.length; i++) {
        arr.push(<option key={i} value={this.state.products[i].staticLocation.id}>{this.state.products[i].name}</option>)
      }
    }
    return arr;
  }

  componentDidMount = () => {
    var url = document.URL;
    this.draft = url.split('/').pop();

    this.getProduct()
    //alert(a)
  }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  getProduct() {
    this.getCookie("tokenWareHouse")
    var nameS = conf.servername + "Product/findAll"
    fetch(nameS, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
      }

    }
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {
          //this.setState({ clients: json })
          //this.setState({ details: json.staticLocation })
          this.setState({ products: json })
          //console.log(json)
          console.log(this.state.products)
        })
      }
      else {
        console.log("no");
        if (response.status == 401) {
          alert("Brak uprawnień do wykonania działania");
        }
        else {
          alert("Błąd podczas pobiernia produktów");
        }
        console.log(response.status);
        console.log(JSON.stringify(response));
      }
    })
  }

  onButtonPress = () => {
    //alert()
    this.setState({ usedProduct: "" })
    this.setState({ usedProductTemp: "" })
    var w = {}
    w.barCode = document.getElementById('nameProduct').value;


    // var initialArray = [1, 2, 3];
    // var newArray = [ ...initialArray, 4 ];
    // console.log(newArray);

    //this.setState({ pallete: [...this.state.pallete, w] });
    this.setState({ pallete: w });
    this.setState({ palTemp: w });
    //this.setState({ order: w }) //simple value

    //console.log(this.state.palletes)
  }

  onButtonPressProduct = () => {
    var w = {}
    w.idStaticProduct = +document.getElementById("typeProducktSelect").value;
    w.quanitity = +document.getElementById("quantity").value;
    this.setState({ usedProduct: [...this.state.usedProduct, w] });

    var wTemp = {}
    wTemp.name = document.getElementById('typeProducktSelect').options[document.getElementById('typeProducktSelect').selectedIndex].text;
    wTemp.quanitity = +document.getElementById("quantity").value;

    this.setState({ usedProductTemp: [...this.state.usedProductTemp, wTemp] });

    // console.log(this.state.palletes)
    //console.log(document.getElementById("typeProducktSelect").value);
  }


  endPallete = () => {
    
    // console.log(this.state.pallete)
    var l = this.state.pallete
    l.usedProducts = this.state.usedProduct
    console.log("asd")
    console.log(this.state.usedProduct)
    console.log(JSON.stringify( this.state.pallete))
    console.log(this.state.palletes)
    console.log("Asd")
    this.setState({ pallete: l });
    this.setState({ palletes: [...this.state.palletes, this.state.pallete] });
    console.log(JSON.stringify( this.state.palletes))
    
    
    var znz = this.state.palTemp
    znz.usedProductss = this.state.usedProductTemp
    // //console.log(l)
      this.setState({ palTemp: znz });
      this.setState({ palletesTemp: [...this.state.palletesTemp, this.state.palTemp] });

    this.setState({ showSendButton: true })
    //this.setState({ pallete: [...this.state.pallete, z] });
    //console.log(this.state.pallete)
    //console.log(this.state.usedProduct)
    // var str = JSON.stringify(this.state.palletes);
    // console.log(str)
    //console.log("palety")
    //console.log(this.state.palletes)
  }

  sendSupply = () => {
    var order = {};
    order.typeOfSupply = document.getElementById('typeSupply').options[document.getElementById('typeSupply').selectedIndex].text;
    order.barCodeOfSupply = document.getElementById("nameSupply").value;
    order.palletes = this.state.palletes;

    alert();
    var str = JSON.stringify(order);
    console.log(str)
    console.log(order)
    //console.log(order)
  }

  render() {
    return (

      <div class="container">
        <div class="row">
          <div class="col-sm-2">
          </div>
          <div class="col-sm-8" id="formLogin">
            <nav class="navbar navbar-light bg-light">
              <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Dodawanie zwrotu / dostawy</span>
            </nav>
            <div class="form-group">
              <label>Rodzaj produktu</label>
              <select class="form-control" id="typeSupply">
                <option>dostawa</option>
                <option>zwrot</option>
              </select>

            </div>
            <div class="form-group">
              <label>Kod kreskowy dostawy / zwrotu</label>
              <input type="text" class="form-control" id="nameSupply" />
            </div>
            <br />
            <div class="row">
              <div class="col-sm-8">

                <div class="form-group">
                  <label>Dodaj paletę</label>
                  <input type="text" class="form-control" id="nameProduct" placeholder="numer palety" />
                </div>
              </div>
              <div class="col-sm-4" style={{ marginTop: "30px" }}>
                <Button class="btn btn-info btn-md" id="addButton" onClick={this.onButtonPress}>Dodaj paletę</Button>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label>Dodaj produkt</label>
                  <select class="form-control" id="typeProducktSelect">
                    {this.buildSelect()}
                  </select>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label>Ilość</label>
                  <input type="number" class="form-control" id="quantity" placeholder="Ilośc" />
                </div>
              </div>
              <div class="col-sm-4" style={{ marginTop: "30px" }}>
                <Button class="btn btn-info btn-md" id="addButton" onClick={this.onButtonPressProduct} >Dodaj produkt</Button>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12" style={{ marginTop: "10px" }}>
                <Button class="btn btn-info btn-md" id="endAdd" onClick={this.endPallete} style={{ width: "100%" }}>Zakończ dodawanie produktów do palety</Button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-3">
          </div>
          <div class="col-sm-6">
            <br />
            <h1 style={{ margin: "0 auto", textAlign: "center" }}>Szczegóły</h1>
            <br />
            
                {this.state.palletesTemp.map((palletesTemp) => {
                  return <ReturnOrderTab palletess={palletesTemp} />
                })}
            
          </div>
          <div class="col-sm-3">
          </div>
        </div>
        <div class="row">
         <div class="col-sm-12" style={{ marginTop: "10px" }}>
          <Button class="btn btn-info btn-md" id="sendSupply" onClick={this.sendSupply} style={this.state.showSendButton ? {width: "100%"} : { display: 'none'}}>Dodaj zwrot/dostawę</Button>
         </div>
       </div>
      </div>
     

    )
  }
}
export default withRouter(ReturnOrder)