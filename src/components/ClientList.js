import React, { Component } from 'react';
import Api from '../helpers/api'
import {Link} from 'react-router-dom';
import {Table,Button} from 'react-bootstrap';
import Client from './Client'

 class ClientList extends Component {


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
        fetch('https://mpsdistribution.herokuapp.com/auth',{
            method: 'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify( {
                "username": "admin",
                "password": "qwerty"
            })
        }
        ).then(response => {
            if(response.ok) {
                console.log("OK")
                response.json().then(json => this.setState({draft:json}))
               
            }
        }) 

    
        
    }

    loadClients =  ()  =>
    {
        fetch('https://mpsdistribution.herokuapp.com/client/findAll',{
            method: 'GET',
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + this.state.draft.token
            }
        }
        ).then(response => {
            if(response.ok) {
                response.json().then(json => this.setState({clients:json}))
            }
        })
        console.log(this.state.clients)
    }
    
    

    render() {
        return (
            
        <div>
            
             <Button variant="primary" onClick={this.loadClients}>Primary</Button>
         <Table striped bordered hover>
         
            <thead>
                <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Nip</th>
                <th>Zip Code</th>
                <th>Adress</th>
                <th>Phone Number</th>
                <th></th>
                </tr>
            </thead>

            <tbody>
                
               {this.state.clients.map((client)=>
                {
                    return <Client client={client}/>
                })}
              
                </tbody>

            </Table>
                    
    </div>
        )}
}
export default ClientList