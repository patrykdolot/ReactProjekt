import React from 'react'
import { Link } from "react-router-dom"
import {Card,Button,CardDeck} from 'react-bootstrap';

 function IndexWarehouse() {
         
  return (
    <div style={{paddingTop:'10%',width:'96%',marginLeft:'2%'}}>
    <CardDeck>
     <Card className="text-center">
 <Card.Header>Produkty</Card.Header>
 <Card.Body>
     <Card.Title>Lista produktow</Card.Title>
     <Card.Text>
     Lista wszystkich produktow
     </Card.Text>
     <Link exact to={'/productList'}> <Button variant="primary">Idz</Button></Link>
 </Card.Body>
 


 </Card>
 <Card className="text-center">
 <Card.Header>Produkty</Card.Header>
 <Card.Body>
     <Card.Title>Dodaj produkt</Card.Title>
     <Card.Text>
      Formularz dodawania produktu
     </Card.Text>
    <Link exact to={'/productAdd'}> <Button variant="primary">Idz</Button></Link>
 </Card.Body>
 </Card>

 <Card className="text-center">
 <Card.Header>Zawroty</Card.Header>
 <Card.Body>
     <Card.Title>Dodaj zwrot/dostawę</Card.Title>
     <Card.Text>
     Formularz dodawania zwrotu
     </Card.Text>
    
     <Link exact to={'/returnAdd'}> <Button variant="primary">Idz</Button></Link>
 </Card.Body>
 </Card>
 
 <Card className="text-center">
 <Card.Header>Historia Dostaw</Card.Header>
 <Card.Body>
     <Card.Title>Wyświetl dostawy/zwroty</Card.Title>
     <Card.Text>
     Lista wszystkich dostaw/zwrotów
     </Card.Text>
    
     <Link exact to={'/orderHistory'}> <Button variant="primary">Idz</Button></Link>
 </Card.Body>
 </Card>
 </CardDeck>
 <br/>
 <CardDeck>
     <Card className="text-center">
 <Card.Header>Pracownicy</Card.Header>
 <Card.Body>
     <Card.Title>Lista pracowników</Card.Title>
     <Card.Text>
     Dodawanie, wyświetlanie pracowników
     </Card.Text>
     <Link exact to={'/WorkerList'}> <Button variant="primary">Idz</Button></Link>
 </Card.Body>
 </Card>
 </CardDeck>
 </div>
  )
}

export default  IndexWarehouse