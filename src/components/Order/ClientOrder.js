    import React from 'react'
import {Link } from "react-router-dom"
class ClientOrder extends React.Component
{
  

    render()
    {
      
        return(
           
            <tr>
            <th onClick={() => {this.props.makeJson(this.props.client)}}> {this.props.client.companyName}</th>
            </tr>
        )

    }
}
export default ClientOrder;