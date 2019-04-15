import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Table,Button} from 'react-bootstrap';
import ClientOrder from './ClientOrder';
import { conf } from '../layout/config/config'


 class ClientListOrder extends Component {


    constructor()
    {
        super();
    }

    state = {
        clients:[
        
        ]
        ,
        draft:''
    }

    componentDidMount = () =>
    {
       this.loadClients();

    
        
    }

    loadClients =  ()  =>
    {
        
        var nameS = conf.servername + "client/findAll"
        
          fetch(nameS,{
            method: 'GET',
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            }
        }
        ).then(response => {
            if(response.ok) {
                response.json().then(json => this.setState({clients:json}))
            }
        })
  
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
      }
    

    render() {
        return (
            
        <div>
            
             {/* <Button variant="primary" onClick={this.loadClients}>Primary</Button> */}
         <Table striped bordered hover >
         
         
            <thead >
                <tr>
                <th>Nazwa firmy</th>
                </tr>
            </thead>

            <tbody>
                
               {this.state.clients.map((filtrowanyClient)=>
                {
                    return <ClientOrder client={filtrowanyClient}/>
                })}
              
                </tbody>

            </Table>
                  
    </div>
        )}
}
export default ClientListOrder