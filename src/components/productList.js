import React, { Component } from 'react'
import { conf } from './layout/config/config'
import Product from './Product'
import { Table} from 'react-bootstrap';



class productList extends Component {
  
 

  state = {
      clients:[
      
      ],
      details:[

      ]
      ,
      draft:''
  }
  componentDidMount = () =>
  {
    this.loadClients();

  }



  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  
  loadClients =  ()  =>
  {
    this.getCookie("tokenWareHouse")
    var nameS = conf.servername + "Product/findAll"
    //console.log(nameS);
    //console.log(this.getCookie("tokenWareHouse"));
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
          else {
            console.log("no");
            if (response.status === 401) {
              alert("Brak uprawnień do wykonania działania");
            }
            else {
              alert("Błąd podczas pobiernia produktów");
            }
            console.log(response.status);
            console.log(JSON.stringify(response));
          }
      })
      console.log(this.state.clients)
  }

  render() {
    console.log(this.state.clients)
    return (

      
      <div>
          
        {/* <Button variant="primary" onClick={this.loadClients}>Primary</Button> */}
        <Table striped bordered hover>

          <thead>
            <tr>
              <th>Id</th>
              <th>Nazwa</th>
              <th>Kategoria</th>
              <th>Producent</th>
              <th>Ilość na palecie</th>
              <th>Ilość w paczce</th>
              <th>Kod</th>
              <th>Lokalizacja kodu</th>
              <th>Cena</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
           {this.state.clients.map((product)=>
                {
                    return <Product product={product}/>
                })} 
          </tbody>

        </Table>

      </div>



    )

    }

}
export default productList