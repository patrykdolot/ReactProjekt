import React, { Component } from 'react'
import { conf } from './config/config'
import ProductDetailsTab from './ProductDetailsTab'
import { Table, Button } from 'react-bootstrap';
import {Link } from "react-router-dom"
import Dialog from 'react-bootstrap-dialog'

class OrderHistory extends Component {

    constructor() {
        super();
    }

    state = {
        supply: [

        ],
        details: [

        ]
        ,
        products: [

        ],
        draft: ''
    }
    componentDidMount = () => {
        var url = document.URL;
        // draft = url.split('/').pop();
        this.draft = url.split('/').pop();
        // document.getElementById("info").innerText = idProduct;
        //alert(this.draft);

        this.loadClients();
    }



    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    loadClients = () => {
        this.getCookie("tokenWareHouse")
        var nameS = conf.servername + "Supply/allSupply"
        //console.log(nameS);
        //console.log(this.getCookie("tokenWareHouse"));
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
                    this.setState({ supply: json })
                    // this.setState({ details: json.staticLocation })
                    // this.setState({ products: json.products })
                    //console.log(json)
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
        //console.log(this.state.clients)
    }

    render() {
        //console.log(this.state.products)
        return (


            <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <br />
                <br />
                
                <Table striped bordered hover>

                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Typ</th>
                        <th>Kod kreskowy dostawy</th>
                        <th>Status</th>
                        <th>Data złożenia</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                     {this.state.supply.map((product)=>
                        {
                            return <OrderHistoryTab product={product}/>
                        })}  
                   </tbody>
                </Table>
            </div>
            </div>
            </div>



        )

    }

}

class OrderHistoryTab extends React.Component{

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    deleteSup = (id) => {
        this.getCookie("tokenWareHouse")
        var nameS = conf.servername + "Supply/deleteSupply"
        fetch(nameS, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            },
            body:
                JSON.stringify({ "barCodeOfSupply": id })
        }
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    if(json.Status == "Deleted"){
                        this.dialog.show({
                            title: 'Usuwanie dostawy',
                            body: 'Pomyślnie usunięto',
                            actions: [
                                Dialog.OKAction(() => {
                                    window.location.reload();
                                })
                            ],
                        })
                    }
                    else{
                        this.dialog.showAlert('Błąd przy usuwaniu')
                    }     
                })
            }
            else {
                console.log("no");
                if (response.status == 401) {
                    alert("Brak uprawnień do wykonania działania");
                }
                else {
                    alert("Błąd");
                }
                console.log(response.status);
                console.log(JSON.stringify(response));
            }
        })
    }

    deleteSupply(id){
        this.dialog.show({
            title: 'Usuwanie dostawy,zwrotu',
            body: 'Czy napewno chcesz usunąć?',
            actions: [
              Dialog.CancelAction(),
              Dialog.OKAction(() => {
                this.deleteSup(id)
              })
            ],
            bsSize: 'small',
            onHide: (dialog) => {
              dialog.hide()
              console.log('closed by clicking background.')
            }
          })

          
    }

    render()
    {
        //var z = this.props.product
        function name(status) {
            console.log(status)
            if(status === true){
                return "Towar rozłożony"
            }
            else{
                return "Towar nierozłożony"
            }
            
        }

        function printDate(dat){
            var d = new Date(dat);
            return d.toLocaleString("pl-PL")
        }

        //console.log(this.props.product)
        return(
                <tr>
                    <th>{this.props.product.id}</th>
                    <th>{this.props.product.typeOfSupply}</th>
                    <th>{this.props.product.barCodeOfSupply}</th>
                    <th>{name(this.props.product.status)}</th>
                    <th>{printDate(this.props.product.arriveDate)}</th>
                    <th><Link to={'/supplyDetalis/'+this.props.product.barCodeOfSupply}><Button variant="success">Szczegóły</Button></Link> <Button variant="danger" onClick={(e) => this.deleteSupply(this.props.product.barCodeOfSupply)}>Usuń</Button></th>
                    <Dialog ref={(el) => { this.dialog = el }} />
                </tr>
         
        )

    }
}
export default OrderHistory;