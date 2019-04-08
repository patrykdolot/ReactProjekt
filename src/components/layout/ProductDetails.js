import React from 'react'
import { conf } from './config/config'

function ProductDetails() {
    return(
        <div>
            asd
        </div>
    )



}

window.onload=function(){
    var url = document.URL;
    var idProduct = url.split('/').pop();
    getData(idProduct)
   // document.getElementById("loginButton").addEventListener("click", getData);
}

function getData(idProduct){
    alert( idProduct);
}

export default ProductDetails;