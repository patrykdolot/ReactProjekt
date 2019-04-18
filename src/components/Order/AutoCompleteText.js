import React, { Component } from 'react'
import {Modal,Button,Overlay,Popover} from 'react-bootstrap';
import {conf} from '../layout/config/config'
import  ScrollArea from 'react-scrollbar'
export default class AutoCompleteText extends Component {
    constructor(props){
        super(props);
        this.state={
            suggestions: [],
            show: false,
            product:{},
            productInfo:{},
            howMany:10,
            showPopOver:false,
            inputValue:''
        };
        
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

 
    }
    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }

    handleClose= () =>{ 
        this.setState({ show: false });  
        this.setState({howMany:10}) 
    }

    handleCloseSuccess = () =>
    {
        var item = {"id":this.state.productInfo.id,
                    "quantity":this.state.howMany}

        this.props.addToList(item)
        this.handleClose()
    }
    
    handleShow(){ 
              this.setState({ show: true });      
    }

    onTextChanged = (e) =>{
      this.setState({inputValue:e.target.value})

        let suggestions=[];
        let target = e.target;
        if(this.state.inputValue.length>0){
            const regex = new RegExp(`^${this.state.inputValue}`,'i')
            suggestions = this.props.products.sort().filter(v => 
               regex.test(v.name))
        }
            this.setState(()=>({suggestions}))
            console.log("Dlugosc = "+this.state.suggestions.length)
            if(this.state.suggestions.length>0)
            {
              this.setState(s=>({target,showPopOver:true}))
            }
     }

     renderSuggestions(){
        const {suggestions} = this.state;
        if(suggestions.length===0){
            return null;
        }
        return(
          <Overlay
          show={this.state.showPopOver}
          target={this.state.target}
          placement='bottom'
          container={this}
          
        >
          <Popover id="popover-contained" title="Produkt"  >

          <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="content"
            horizontal={false}
            >
            {suggestions.map((item)=> 
                 <div onClick={()=>{ this.onItemCliked(item)}}>{item.name}</div>)}

            </ScrollArea>
          </Popover>
        </Overlay>
                 
             
        );
     }

     onItemCliked = (item) => {
      this.setState({showPopOver:!this.state.showPopOver})
           this.setState({inputValue:''})
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
      this.setState({
            howMany:event.target.value
          })
    }
    
  render() {
    return (
      // Wpisywanie
      <div className="AutoCopleteText" style={{textAlign:'center',marginTop:'2%',marginBottom:'2%'}}>
        <input style={{width:'50%'}} onChange={this.onTextChanged}  value={this.state.inputValue} type="text"/>
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


