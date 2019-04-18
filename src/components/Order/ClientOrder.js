    import React from 'react'
import {Link } from "react-router-dom"
class ClientOrder extends React.Component
{
  

    render()
    {
      
        return(
           
            <tr>
            <Link to={'/newOrder/'+this.props.client.id}><th> {this.props.client.companyName}</th></Link>
            </tr>
        )

    }
}
export default ClientOrder;