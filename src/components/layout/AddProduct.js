import React from 'react';
import { Button } from 'react-bootstrap';
import './config/config';
import './css/AddProductstyle.css';
import {conf} from './config/config'

function AddProduct() {

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-2">
                </div>
                <div class="col-sm-8" id="formLogin">
                    <nav class="navbar navbar-light bg-light">
                        <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Dodawanie nowego produktu</span>
                    </nav>
                    <form>
                        <div class="form-group">
                            <label>Nazwa produktu</label>
                            <input type="text" class="form-control" id="nameProduct" />
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
                        <div class="form-group">
                            <label>Producent</label>
                            <input type="text" class="form-control" id="producentProduct" />
                        </div>
                        <div class="form-group">
                            <label>Cena</label>
                            <input class="form-control" type="number" id="priceProduct" />
                        </div>
                        <div class="form-group">
                            <label>Ilość produktu na palecie</label>
                            <input class="form-control" type="number" id="quantityProduct" />
                        </div>
                        <div class="form-group">
                            <label>Ilość produktu w paczce</label>
                            <input class="form-control" type="number" id="quantityPack" />
                        </div>
                        <div class="form-group">
                            <label>Kod kreskowy</label>
                            <input type="text" class="form-control" id="barCodeProdcut" placeholder="np. 000004" />
                        </div>
                        <div class="form-group">
                            <label>Lokalizacja kodu kreskowego</label>
                            <input type="text" class="form-control" id="barCodeLocationProdcut" placeholder="np. 0001"/>
                        </div>
                        <div class="form-group" id="divSend">
                            <Button class="btn btn-info btn-md" id="addButton" onClick={getData}>Dodaj produkt</Button>
                        </div>
                    </form>
                    
                </div>
                <div class="col-sm-2">

                </div>
            </div>
        </div>
    )
}

function getData() {
    var nameProduct = document.getElementById('nameProduct').value;
    var typeProducktSelect = document.getElementById('typeProducktSelect').value;
    var producentProduct = document.getElementById('producentProduct').value;
    var priceProduct = document.getElementById('priceProduct').value;
    var quantityProduct = document.getElementById('quantityProduct').value;
    var barCodeProdcut = document.getElementById('barCodeProdcut').value;
    var barCodeLocationProdcut = document.getElementById('barCodeLocationProdcut').value;
    var quantityPack = document.getElementById('quantityPack').value;

    if(parseInt(quantityProduct)%parseInt(quantityPack) !== 0){
        alert("Podano złą ilość na palecie i w paczce")
        return
    }
    if(nameProduct === ""  || typeProducktSelect === "" || producentProduct === "" || priceProduct === "" || quantityProduct === "" || barCodeProdcut === "" || barCodeLocationProdcut === "" || quantityPack === ""){
		alert("Puste pole");
		return;
    }

    console.log(nameProduct  + " " + typeProducktSelect + " " + producentProduct + " " + priceProduct);
 
	var dane = {
        "price" : priceProduct,
        "quantityOnThePalette" : quantityProduct,
        "producer": producentProduct,
        "barCode": barCodeProdcut,
        "name": nameProduct,
        "logicState": 0,
        "category": typeProducktSelect,
        "amountInAPack" : quantityPack,
        "staticLocation": 
            {
                "id": 1,
                "barCodeLocation": barCodeLocationProdcut
            }
        
   	}
    var cookieVal = getCookie("tokenWareHouse");

    var nameS = conf.servername + "Product/addNewProduct"
    fetch( nameS, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookieVal
        },
        body: JSON.stringify(dane)
    })
    .then(response => { 
        //console.log(response.json() + "aa")
        if(response.ok){
            response.json().then(json => {
                console.log(json);
    
                //console.log(dateExpired);
                //document.cookie = `tokenWareHouse=${json.token}; expires=${dateExpired.toGMTString()}`;
                alert("Pomyślnie dodano produkt");
                window.location.reload();
              });
        } else {
            console.log("no");
            if(response.status === 401){
                alert("Brak uprawnień do wykonania działania");
                //document.getElementById('user').value ="";
                //document.getElementById('pass').value ="";
            }
            else{
                alert("Błąd podczas dodawania");
            }
            console.log(response.status);
            console.log(JSON.stringify(response));
        }
    })
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

export default AddProduct