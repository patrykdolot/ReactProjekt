import React from 'react'
import {Button} from 'react-bootstrap';
import {Link } from "react-router-dom"
import {conf} from "../layout/config/config"
class Order extends React.Component
{
    loadFaktura =  (id)  =>
    {
        
        var nameS = conf.servername + "order/orderToPdfStr"
        
          fetch(nameS,{
            method: 'POST',
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            }, 
            body:JSON.stringify({'id':id})
        }
        ).then(response => {
            if(response.ok) {
                response.json().then(json => { 
                    const raw = window.atob(json.pdf);
                    console.log(raw)
                    const rawLength = raw.length;
                    const blobArray = new Uint8Array(new ArrayBuffer(rawLength));
    
                    for (let i = 0; i < rawLength; i++) {
                        blobArray[i] = raw.charCodeAt(i);
                    }
    
                    const blob = new Blob([blobArray], {type: 'application/pdf'});
                    var fileURL = URL.createObjectURL(blob);
                     window.open(fileURL);})

              
            }else{
                alert("Zamówienie nie zostało zrealizowane, brak faktury")
               
            }
      
     })
  
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
      }
    getStyles = () =>
    {
        if(this.props.client.id===this.props.id)
        {
            return {backgroundColor:'#98FB98'}
        }
    }
    render()
    {
      
        return(
           
            <tr>
            <th> {this.props.order.id}</th>
          
            <th> {this.props.order.principal.companyName}</th>
            <th> {this.props.order.departureDate}</th>
            <th> {this.props.order.amountOfArticles}</th>
            <th> {this.props.order.productsCount}</th>
            <th> {this.props.order.price}</th>
            { <th><Link to={'/orderInfo/'+this.props.order.id}> <Button variant="info">Szczegoly</Button></Link><Button onClick={()=>{this.loadFaktura(this.props.order.id)}} variant="primary">Faktura</Button></th> }
            </tr>
        )

    }
}
export default Order;