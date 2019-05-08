    import React from 'react'
import {Button} from 'react-bootstrap';
import {Link } from "react-router-dom"
class Client extends React.Component
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
           
            <tr style={this.getStyles()}>
            <th> {this.props.client.id}</th>
            <th> {this.props.client.companyName}</th>
            <th> {this.props.client.nip}</th>
            <th> {this.props.client.zipCode}</th>
            <th> {this.props.client.address}</th>
            <th> {this.props.client.phoneNo}</th>
            <th><Link to={'/ordersClient/'+this.props.client.id}> <Button variant="info">Zamówienia</Button></Link> </th>
            </tr>
        )

    }
}
export default Client;