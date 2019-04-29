import React from 'react'
import {Button, Tab} from 'react-bootstrap';
import {Link } from "react-router-dom"
import { Form, Table } from 'react-bootstrap';
class ReturnOrderTab extends React.Component
{
    render()
    {
        return(
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

                 {this.props.palletess.usedProducts.map((palletess) => {
                    return <Detail palletess={palletess} nam={this.props.c} />
                   })}
            
            </tbody>
            </Table>
        )

    }

}

class Detail extends React.Component{
    
    render()
    {
        var z = this.props.nam
        function name(idProduct) {
            for (let i = 0; i <z.length; i++) {
                if(idProduct === z[i].id){
                    return z[i].name
                }
            }
        }
        return(
            <tr>
                <th>{name(this.props.palletess.idStaticProduct)}</th>
                <th>{this.props.palletess.quanitity}</th>
            </tr>
        )

        
    }


}
export default ReturnOrderTab