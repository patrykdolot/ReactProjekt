import React, { Component } from 'react'
import { conf } from './config/config'
import ProductDetailsTab from './ProductDetailsTab'
import { Table } from 'react-bootstrap';

class ProductDetails extends Component {



    state = {
        clients: [

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
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    loadClients = () => {
        this.getCookie("tokenWareHouse")
        var nameS = conf.servername + "Product/getInfoAboutProduct"
        console.log(nameS);
        //console.log(this.getCookie("tokenWareHouse"));
        fetch(nameS, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            },
            body:
                JSON.stringify({ "id": this.draft })

        }
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ clients: json })
                    this.setState({ details: json.staticLocation })
                    this.setState({ products: json.products })
                    console.log(json)
                })


            }
            else {
                console.log("no");
                if (response.status === 401) {
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


            <div>
                <br />
                <br />
                {/* <Button variant="primary" onClick={this.loadClients}>Primary</Button> */}
                <Table striped bordered hover style={{ width: "50%", margin: "auto" }}>

                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nazwa</th>
                            <th>Kategoria</th>
                            <th>Producent</th>
                            <th>Ilość na palecie</th>
                            <th>Ilość w paczce</th>
                            <th>Kod</th>
                            <th>Lokalizacja kodu</th>
                        </tr>
                    </thead>

                    <tbody>
                        <th>{this.state.clients.id}</th>
                        <th>{this.state.clients.name}</th>
                        <th>{this.state.clients.category}</th>
                        <th>{this.state.clients.producer}</th>
                        <th>{this.state.clients.quantityOnThePalette}</th>
                        <th>{this.state.clients.quantityInPackage}</th>
                        <th>{this.state.clients.barCode}</th>
                        <th>{this.state.details.barCodeLocation}</th>
                    </tbody>

                </Table>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3">
                        </div>
                        <div class="col-sm-6">
                            <br />
                            <h1 style={{ margin: "0 auto", textAlign: "center"   }}>Dostępne Produkty</h1>
                            <br />
                            <Table striped bordered hover>

                                <thead>
                                    <tr>
                                        <th>Lokalizacja</th>
                                        <th>Data ważności</th>
                                        <th>Stan</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.products.map((product) => {
                                        return <ProductDetailsTab product={product} />
                                    })}
                                </tbody>

                            </Table>
                        </div>
                        <div class="col-sm-3">
                        </div>
                    </div>
                </div>



            </div>



        )

    }

}



// function ProductDetails() {
//     return(
//         <div id="info" onload={getData}>
//             asd
//         </div>
//     )



// }

// // window.onload=function(){
// //     var url = document.URL;
// //     var idProduct = url.split('/').pop();
// //     getData(idProduct)
// //    // document.getElementById("loginButton").addEventListener("click", getData);
// // }

// function getData(idProduct){
//     var url = document.URL;
//     var idProduct = url.split('/').pop();
//     document.getElementById("info").innerText = idProduct;
//     //alert(idProduct);

// }

export default ProductDetails;