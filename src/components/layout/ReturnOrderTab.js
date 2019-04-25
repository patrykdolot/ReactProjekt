import React from 'react'
import {Button, Tab} from 'react-bootstrap';
import {Link } from "react-router-dom"
import { Form, Table } from 'react-bootstrap';
class ReturnOrderTab extends React.Component
{
    render()
    {
        //console.log(this.props.palletes.usedProducts )
        return(
            //<div>
            <Table striped bordered hover>

            <thead>
                <tr>
                    <th colSpan="2">Paleta kod kreskowy: {this.props.palletess.barCode}</th>
                </tr>
                <tr>
                    <th>Produkt</th>
                    <th>Ilość</th>
                </tr>
            </thead>
            <tbody>
                 {/* <tr>
                    <th colSpan="2"> {this.props.palletes.usedProducts[0].quanitity}</th>
                 </tr>  */}
                 {this.props.palletess.usedProductss.map((palletess) => {
                                        return <Detail palletess={palletess} />
                                    })}
            
            </tbody>
            </Table>
        )

    }

}

class Detail extends React.Component{
    render()
    {
        //console.log(this.props.product)
        return(
            <tr>
                <th>{this.props.palletess.name}</th>
                <th>{this.props.palletess.quanitity}</th>
            </tr>
        )

    }
}
export default ReturnOrderTab