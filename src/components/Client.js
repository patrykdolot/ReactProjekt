    import React from 'react'
import {Button} from 'react-bootstrap';
import {Link } from "react-router-dom"
class Client extends React.Component
{
  
    render()
    {
        console.log(this.props.client)
        return(
            <tr>
            <th> {this.props.client.id}</th>
            <th> {this.props.client.companyName}</th>
            <th> {this.props.client.nip}</th>
            <th> {this.props.client.zipCode}</th>
            <th> {this.props.client.address}</th>
            <th> {this.props.client.phoneNo}</th>
            <th><Link to={'/editClient/'+this.props.client.id}><Button variant="success">Edit</Button> </Link><Link to={'/deleteClient/'+this.props.client.id}> <Button variant="danger">Delete</Button></Link></th>
            </tr>
        )

    }
}
export default Client;