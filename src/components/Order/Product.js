import React, { Component } from 'react'

 class Product extends Component {
  render() {
    return(
           
        <tr>
        <th> {this.props.product.product.id}</th>
        <th> {this.props.product.product.name}</th>
        <th> {this.props.product.orderedQuantity}</th>
        {/* { <th><Link to={'/orderInfo/'+this.props.order.id}> <Button variant="info">Szczegoly</Button></Link> <Link to={'/deleteOrder/'+this.props.order.id}><Button variant="danger">Usun</Button> </Link></th> } */}
        </tr>
    )

  }
}export default Product
