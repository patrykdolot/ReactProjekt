import React from 'react'
import { Link } from "react-router-dom"
import {Card,Button,CardDeck} from 'react-bootstrap';
 function IndexClients() {
  return (
    <div style={{paddingTop:'15%',width:'96%',marginLeft:'2%'}}>
       <CardDeck>
        <Card className="text-center">
    <Card.Header>Klienci</Card.Header>
    <Card.Body>
        <Card.Title>Dodaj klienta</Card.Title>
        <Card.Text>
        Formularz do dodawania klienta
        </Card.Text>
        <Link exact to={'/clientAdd'}> <Button variant="primary">Idz</Button></Link>
    </Card.Body>
    


    </Card>
    <Card className="text-center">
    <Card.Header>Klienci</Card.Header>
    <Card.Body>
        <Card.Title>Lista Klientow</Card.Title>
        <Card.Text>
        przeglądanie,edytowanie,usuwanie
        </Card.Text>
       <Link exact to={'/clientList'}> <Button variant="primary">Idz</Button></Link>
    </Card.Body>
    </Card>

    <Card className="text-center">
    <Card.Header>Zamówienia</Card.Header>
    <Card.Body>
        <Card.Title>Dodaj zamówienie</Card.Title>
        <Card.Text>
        Formularz do dodawania zamówienia
        </Card.Text>
       
        <Link exact to={'/newOrder'}> <Button variant="primary">Idz</Button></Link>
    </Card.Body>
    


    </Card>
    <Card className="text-center">
    <Card.Header>Zamówienia</Card.Header>
    <Card.Body>
        <Card.Title>Lista zamówień</Card.Title>
        <Card.Text>
        przeglądanie,edytowanie,usuwanie
        </Card.Text>
       <Link exact to={'/orderList'}> <Button variant="primary">Idz</Button></Link>
    </Card.Body>
    </Card>
    </CardDeck>
    </div>
  )
}
export default IndexClients