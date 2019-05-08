import React, { Component } from 'react';
import {Table,Button,Modal} from 'react-bootstrap';
import ClientOrder from './ClientOrder';
import { conf } from '../layout/config/config'

import { Route,Redirect,withRouter } from 'react-router-dom'


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
    

      sendToServer= (json) =>{
        var nameS = conf.servername + "order/make"
        
        fetch(nameS,{
          method: 'POST',
          headers:{
              "Content-Type":'application/json',
              'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
          },
          body:JSON.stringify(json)
      }
      ).then(response => {
          if(response.ok) {
            alert("Pomyslnie zapisano na serwer")
           this.wrocDoMenu()
          }
      })
      }

    makeJson= (client)=>{
        var readyJson = {
            "products":this.props.products,
            "principalID":client.id
        }
        
     this.sendToServer(readyJson)
        
    }

 
      

    wrocDoMenu = () =>{
        this.props.history.push('/orderList') 
    }
    render() {
        return (
            <Route render={({ history}) => (
            <div style={{textAlign:"center"}}>
            <Button onClick={this.handleShow}>Akceptuj zamówienie
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}
            size="lg">

            <Modal.Header closeButton>
              <Modal.Title>Wybierz firme</Modal.Title>
            </Modal.Header>
            <Modal.Body >
            
           
         <Table striped bordered hover >
         
         
            <thead >
                <tr>
                <th>Company Name</th>
                <th>Nip</th>
                <th>Zip Code</th>
                <th>Adress</th>
                <th>Phone Number</th>
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
            )} />
        )}
}

export default withRouter(ClientListOrder)
