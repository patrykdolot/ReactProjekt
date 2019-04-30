import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Dialog from 'react-bootstrap-dialog'
import './layout/config/config';
import { conf } from './layout/config/config'

class Product extends React.Component {

    build() {
        var tab = [];
        tab.push(
            <div>
                <div>
                    <label>Nazwa</label>
                    <input type="text" class="form-control" id="nameProduct" defaultValue={this.props.product.name} />
                </div>
                <div>
                    <label>Producent</label>
                    <input type="text" class="form-control" id="producentProduct" defaultValue={this.props.product.producer} />
                </div>
                <div>
                    <label>Ilość na palecie</label>
                    <input type="text" class="form-control" id="quantityProduct" defaultValue={this.props.product.quantityOnThePalette} />
                </div>
                <div>
                    <label>Ilość w paczce</label>
                    <input type="text" class="form-control" id="quantityPack" defaultValue={this.props.product.quantityInPackage} />
                </div>
                <div>
                    <label>Cena</label>
                    <input type="number" class="form-control" id="priceProduct" defaultValue={this.props.product.price} />
                </div>
                <div>
                    <label>Kod kreskowy produktu</label>
                    <input type="text" class="form-control" id="barCodeProdcut" defaultValue={this.props.product.barCode} />
                </div>
                <div class="form-group">
                    <label>Rodzaj produktu</label>
                    <select class="form-control" id="typeProducktSelect">
                        <option>Piwo</option>
                        <option>Soki (Karton)</option>
                        <option>Soki PET</option>
                        <option>Wody</option>
                        <option>Małe soki</option>
                        <option>Wódka</option>
                        <option>Wino</option>
                    </select>
                </div>
            </div>
        )
        return tab;
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    edit() {
        var nameProduct = document.getElementById('nameProduct').value;
        var typeProducktSelect = document.getElementById('typeProducktSelect').value;
        var producentProduct = document.getElementById('producentProduct').value;
        var priceProduct = document.getElementById('priceProduct').value;
        var quantityProduct = document.getElementById('quantityProduct').value;
        var barCodeProdcut = document.getElementById('barCodeProdcut').value;
        var quantityPack = document.getElementById('quantityPack').value;
        console.log(typeProducktSelect)
        var dane = {
            "price": priceProduct,
            "quantityOnThePalette": quantityProduct,
            "producer": producentProduct,
            "barCode": barCodeProdcut,
            "name": nameProduct,
            "logicState": this.props.product.staticLocation.logicState,
            "category": typeProducktSelect,
            "amountInAPack": quantityPack,
            "staticLocation":
            {
                "id": this.props.product.staticLocation.id,
                "barCodeLocation": this.props.product.staticLocation.barCodeLocation
            }
        }

        var cookieVal = this.getCookie("tokenWareHouse");

        var nameS = conf.servername + "Product/editProduct"
        fetch(nameS, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieVal
            },
            body: JSON.stringify(dane)
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json);
                        var dateExpired = new Date(json.expirationDate);
                        this.dialog.show({
                            title: 'Edycja produktu',
                            body: 'Pomyślnie zmieniono dane produktu',
                            actions: [
                                Dialog.OKAction(() => {
                                    window.location.reload();
                                })
                            ],
                        })
                    });
                } else {
                    console.log("no");
                    if (response.status == 401) {
                        alert("Brak uprawnień do wykonania działania");
                    }
                    else {
                        alert("Błąd podczas edycji");
                    }
                    console.log(response.status);
                    console.log(JSON.stringify(response));
                }
            })
    }

    editProduct(id) {
        console.log("a")
        this.dialog.show({
            title: 'Edytowanie produktu',
            body: [
                this.build()
            ],
            actions: [
                Dialog.CancelAction(),
                Dialog.OKAction(() => {
                    this.edit()
                })
            ],
            bsSize: 'small',
            onHide: (dialog) => {
                dialog.hide()
                console.log('closed by clicking background.')
            }
        })
        console.log(this.props.product)
    }

    render() {
        console.log(this.props.product)
        return (
            <tr>
                <th> {this.props.product.id}</th>
                <th> {this.props.product.name}</th>
                <th> {this.props.product.category}</th>
                <th> {this.props.product.producer}</th>
                <th> {this.props.product.quantityOnThePalette}</th>
                <th> {this.props.product.quantityInPackage}</th>
                <th> {this.props.product.barCode}</th>
                <th> {this.props.product.staticLocation.barCodeLocation}</th>
                <th> {this.props.product.price}</th>
                <th><Link to={'/productDetails/' + this.props.product.id}><Button variant="success">Szczegóły</Button></Link> <Button variant="danger" onClick={(e) => this.editProduct(this.props.product.id)}>Edycja</Button></th>
                <Dialog ref={(el) => { this.dialog = el }} />
            </tr>
        )

    }

}

export default Product

