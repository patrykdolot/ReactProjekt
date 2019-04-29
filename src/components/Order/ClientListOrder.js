import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Table,Button,Modal} from 'react-bootstrap';
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
        draft:'',
        show:false,
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
    
    handleClose= () =>{ 
        this.setState({ show: false }); 
    }

    handleShow= ()=>{ 
        this.setState({ show: true });      
}


    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
      }
    


    makeJson= (client)=>{
        var readyJson = {
            "products":this.props.products,
            "principalID":client.id
        }
        console.log(readyJson)
        
    }
    render() {
        return (
            <div>
            <Button onClick={this.handleShow}>ta
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Wybierz firme</Modal.Title>
            </Modal.Header>
            <Modal.Body >
            
           
         <Table striped bordered hover >
         
         
            <thead >
                <tr>
                <th>Nazwa firmy</th>
                </tr>
            </thead>

            <tbody>
                
               {this.state.clients.map((filtrowanyClient)=>
                {
                    return <ClientOrder client={filtrowanyClient} makeJson={this.makeJson}/>
                })}
              
                </tbody>

            </Table>
                  
    </Modal.Body>
    </Modal>
    </div>
        )}
}
export default ClientListOrder