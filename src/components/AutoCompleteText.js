import React, { Component } from 'react'
import './style.css'
export default class AutoCompleteText extends Component {

    constructor(props){
        super(props);
        this.items=[

            {"name":"David","surname":"Levis"},
            {"name":"Marek","surname":"Levis"},
            {"name":"Mubicz","surname":"Letter"},
            {"name":"David","surname":"Levis"},
            {"name":"Marek","surname":"Levis"},
            {"name":"Mubicz","surname":"Letter"},
            {"name":"David","surname":"Levis"},
            {"name":"Marek","surname":"Levis"},
            {"name":"Mubicz","surname":"Letter"}
        ];
        this.state={
            suggestions: [],
        };
    }


    onTextChanged = (e) =>{
        const value = e.target.value;
        let suggestions=[];
        if(value.length>0){
            const regex = new RegExp(`^${value}`,'i')
            suggestions = this.items.sort().filter(v => 
               regex.test(v.name))
        }
            this.setState(()=>({suggestions}))
        }

        renderSuggestions(){
            const {suggestions} = this.state;
            if(suggestions.length===0){
                return null;
            }
            return(
                <div >
                     {suggestions.map((item)=><p onClick={()=>{ alert('alert'); }}>{item.name}" " {item.surname}</p>)}
                 </div>
            );
        }
        
    
  render() {
    return (
      <div className="AutoCopleteText">
        <input onChange={this.onTextChanged} type="text"/>
        {this.renderSuggestions()}
      </div>
    )
  }
}


