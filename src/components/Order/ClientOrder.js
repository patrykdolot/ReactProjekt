    import React from 'react'
import {Link } from "react-router-dom"
class ClientOrder extends React.Component
{
  

    render()
    {
      
        return(
           

            <tr onClick={() => {this.props.makeJson(this.props.client)}} >

            <th> {this.props.client.companyName}</th>
            <th> {this.props.client.nip}</th>
            <th> {this.props.client.zipCode}</th>
            <th> {this.props.client.address}</th>
            <th> {this.props.client.phoneNo}</th>

            </tr>
        )

    }
}
export default ClientOrder;