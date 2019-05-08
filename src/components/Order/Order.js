import React from 'react'
import {Button} from 'react-bootstrap';
import {Link } from "react-router-dom"
class Order extends React.Component
{
  
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
            {/* <th><Link to={'/ordersClient/'+this.props.client.id}> <Button variant="info">Zamówienia</Button></Link> <Link to={'/editClient/'+this.props.client.id}><Button variant="success">Edytuj</Button> </Link></th> */}
            </tr>
        )

    }
}
export default Order;