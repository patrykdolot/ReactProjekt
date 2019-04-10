import React from 'react'
import {Button} from 'react-bootstrap';
import {Link } from "react-router-dom"

class Product extends React.Component
{
    render()
    {
        console.log(this.props.product)
        return(
            // <tr>

            //     <th>sdf</th>
            // </tr>
            <tr>
            <th> {this.props.product.id}</th>
            <th> {this.props.product.name}</th>
            <th> {this.props.product.category}</th>
            <th> {this.props.product.producer}</th>
            <th> {this.props.product.quantityOnThePalette}</th>
            <th> {this.props.product.quantityInPackage}</th>
            <th> {this.props.product.barCode}</th>
            <th> {this.props.product.staticLocation.barCodeLocation}</th>
            <th><Link to={'/productDetails/'+this.props.product.id}><Button variant="success">Szczegóły</Button> </Link><Link to={'/deleteClient/'+this.props.product.id}> <Button variant="danger">Edycja</Button></Link></th>
            </tr>
        )

    }

}

export default Product