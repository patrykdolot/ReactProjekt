import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { conf } from './config/config'
import { Table } from 'react-bootstrap';

class OrderHistoryDetails extends React.Component {
    constructor() {
        super();
    }

    state = {
        supply: [

        ],
        pallete: [

        ],
        draft: ''
    }

    componentDidMount = () => {
        var url = document.URL;
        this.draft = url.split('/', 3).pop();
        var patt = /supplyDetalis/;
        var result = url.match(patt);
        this.draft = url.substring(result.index + 14, url.length);
        this.loadClients();
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    loadClients = () => {
        this.getCookie("tokenWareHouse")
        var nameS = conf.servername + "Supply/getSupply"
        //console.log(nameS);
        //console.log(this.getCookie("tokenWareHouse"));
        fetch(nameS, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            },
            body:
                JSON.stringify({ "barCodeOfSupply": this.draft })
        }
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ supply: json })
                    this.setState({ pallete: json.palletes })
                    console.log(this.state.pallete)
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

    render() {
        function printDate(dat) {
            var d = new Date(dat);
            return d.toLocaleString("pl-PL")
        }
        return (
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <br />
                        <br />
                        <nav class="navbar navbar-light bg-light">
                            <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Szczegóły</span>
                        </nav>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Typ</th>
                                    <th>Kod kreskowy dostawy</th>
                                    <th>Ilość palet</th>
                                    <th>Data złożenia</th>
                                </tr>
                                <tr>
                                    <th>{this.state.supply.id}</th>
                                    <th>{this.state.supply.typeOfSupply}</th>
                                    <th>{this.state.supply.barCodeOfSupply}</th>
                                    <th>{this.state.supply.aomuntOfPalletes}</th>
                                    <th>{printDate(this.state.supply.arriveDate)}</th>
                                </tr>
                            </thead>
                        </Table>
                        <hr style={{"margin-top": "20px", "margin-bottom": "20px", "border": 0, "border-top": "5px solid #eeeeee"}}/>
                        <br />
                        <div>
                            {this.state.pallete.map((product) => {
                                return <OrderHistoryTabPallete product={product} />
                            })}
                        </div>
                    </div>
                </div>          
            </div>
        )
    }
}

class OrderHistoryTabPallete extends React.Component {
    state = {
        products: [

        ],
        draft: '',
        isFooterOpen: false
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    loadClients() {
        this.getCookie("tokenWareHouse")
        var nameS = conf.servername + "Palette/getInfoAboutPalette"
        //console.log(this.getCookie("tokenWareHouse"));

        if (this.state.isFooterOpen == false) {
            this.state.isFooterOpen = true;
            fetch(nameS, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
                },
                body:
                    JSON.stringify({ "id": this.props.product.id })

            }
            ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        this.setState({ products: json.products })
                        // console.log(json.products)
                        // console.log(this.state.products[0].product.name)
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
    }

    render() {
        function buildSelect(products) {
            var arr = [];
            var tab = [];
            for (let i = 0; i < products.length; i++) {
                console.log(i)
                arr.push(<th>{products[i].quanitity}</th>)
                arr.push(<th>{products[i].name}</th>)
                tab.push(<tr>{arr}</tr>)
                arr = []
            }
            return tab;
        }

        return (
            <div class="container">
                <nav class="navbar">
                    <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Szczegóły palety</span>
                </nav>
                <div class="row">
                    <div class="col-sm-3"> </div>
                    <div class="col-sm-6">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Suma produktów na palecie</th>
                                </tr>
                                <tr>
                                    <th>{this.props.product.id}</th>
                                    <th>{this.props.product.amountOfProducts}</th>
                                </tr>
                                <tr>
                                    <th colSpan="2">
                                        <nav class="navbar">
                                            <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Produkty</span>
                                        </nav>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Ilość</th>
                                    <th>Nazwa produktu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buildSelect(this.props.product.product)}
                            </tbody>
                        </Table>
                    </div>
                    <div class="col-sm-3"> </div>
                </div>
                <hr style={{"margin-top": "20px", "margin-bottom": "20px", "border": 0, "border-top": "5px solid #eeeeee"}}/>
            </div>
        )

    }
}

export default OrderHistoryDetails