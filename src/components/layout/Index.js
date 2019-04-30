import React from 'react'
import { Link } from "react-router-dom"
import {Card,Button,CardDeck} from 'react-bootstrap';


 function Index() {
  return (
   
    <div style={{paddingTop:'15%',width:'75%',paddingLeft:'25%'}}>
        <CardDeck>
        <Card className="text-center">
    <Card.Header>Klienci</Card.Header>
    <Card.Body>
        <Card.Title>Zarzadzanie klientami</Card.Title>
        <Card.Text>
          Klienci,zamówienia
        </Card.Text>
        <Link exact to={'/clients'}> <Button variant="primary">Idz</Button></Link>
    </Card.Body>
    


    </Card>
    <Card className="text-center">
    <Card.Header>Magazyn</Card.Header>
    <Card.Body>
        <Card.Title>Zarzadzanie magazynem</Card.Title>
        <Card.Text>
            Produkty,zwroty
        </Card.Text>
       <Link exact to={'/warehouse'}> <Button variant="primary">Idz</Button></Link>
    </Card.Body>
    </Card>
    </CardDeck>
</div>


  )
}
export default Index;