import React, { Component } from 'react'
import {Modal,Button,Table} from 'react-bootstrap';
import {conf} from '../layout/config/config'
import onClickOutside from "react-onclickoutside";
 class AutoCompleteText extends Component {
    constructor(props){
        super(props);
        this.state={
            suggestions: [],
            show: false,
            product:{},
            productInfo:{},
            howMany:10,
            showPopOver:false,
            inputValue:'',
        };
        
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

 
    }
    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    handleClose= () =>{ 
        this.setState({ show: false });  
        this.setState({howMany:10}) 
    }

    handleCloseSuccess = () =>
    {
      if(this.state.howMany<1)
      {
        this.handleClose()
      }
      else
      {
        var item = {"id":this.state.productInfo.id,
                    "quantity":this.state.howMany}

        this.props.addToList(item)
        this.handleClose()
      }

    }
    
    handleShow(){ 
              this.setState({ show: true });      
    }

    onTextChanged = (e) =>{
      

        let suggestions=[];
        if(e.target.value.length>0){
            const regex = new RegExp(`^.*${e.target.value}.*$`,'i')
            suggestions = this.props.products.sort().filter(v => 
               regex.test(v.name))
        }
            this.setState(()=>({suggestions}))
            this.setState({inputValue:e.target.value})
     }

     handleClickOutside = () => {
      this.setState({inputValue:''})
      this.setState({suggestions:[]})
    }

     renderSuggestions(){
        const {suggestions} = this.state;
        if(suggestions.length===0){
            return null;
        }
        return(
         
         <div onHide={this.handleClose} style={{marginLeft:'25%',textAlign:'center',position:'fixed',backgroundColor:"#FFFFFF",overflowY:'scroll',maxHeight:'197px',width:'50%'}}>
           
             <Table  bordered hover>
             <tbody>
            {suggestions.map((item)=> 
            <tr>
                 <th onClick={()=>{ this.onItemCliked(item)}}>{item.name}</th>
                 </tr>)
            }
            </tbody>
                </Table>
           
            </div>     
             
        );
     }

     onItemCliked = (item) => {
       
           this.setState({inputValue:''})
           this.setState({suggestions:[]})
           this.setState({product:item})
           this.showDialogWithData(item)
     }

    showDialogWithData = (item) =>{
     
          var nameS = conf.servername + "Product/getInfoAboutProduct"
        
          fetch(nameS,{
            method: 'POST',
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            },
            body:JSON.stringify({'id':item.id

            })
        }
        ).then(response => {
            if(response.ok) {
                response.json().then(json => this.setState({productInfo:json}))
            }
        })
        this.handleShow()
    }

     
    changeHandler = event =>{
      if(event.target.value<this.state.productInfo.logicState)
      {
        this.setState({
          howMany:event.target.value
        })
      }else{
        this.setState({
          howMany:this.state.productInfo.logicState
        })
      }
  
    }
    
  render() {
    return (
      // Wpisywanie
      <div className="AutoCopleteText" style={{textAlign:'center',marginTop:'2%',marginBottom:'2%'}}>
        <input style={{width:'50%'}} onChange={this.onTextChanged} placeholder="Wprowadz nazwe"  value={this.state.inputValue} type="text"/>
        {this.renderSuggestions()}







{/* Wyskakujace okno z zapytaniem */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dodaj Przedmiot</Modal.Title>
          </Modal.Header>
          <Modal.Body >
          <div style={{float:"left", position:"relative"}}>
         <div> {this.state.product.name}  </div>
         <div><input  type="text" value={this.state.howMany} onChange={this.changeHandler} /> { "/"} {this.state.productInfo.logicState } </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Anuluj
            </Button>
            <Button variant="primary" onClick={this.handleCloseSuccess} >
              Dodaj
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}


export default onClickOutside(AutoCompleteText)