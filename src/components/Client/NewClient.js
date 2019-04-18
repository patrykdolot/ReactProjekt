import React, { Component } from 'react'
import {Formik} from 'formik'
import {conf} from '../layout/config/config'
import {Form,Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
class NewClient extends Component {

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  render() {
    return (
      <div style={{marginLeft:'25%',marginRight:'25%'}}>

      {/* FORMULARZ DODAWANIA */}

        <Formik 

        // funkcja z zapytaniem fetch

        onSubmit={(values)=>{
          
          var nameS = conf.servername + "client/add"
          console.log(JSON.stringify(values))
            fetch(nameS,{
              method: 'POST',
              headers:{
                  "Content-Type":'application/json',
                  'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
              },
              body:JSON.stringify(values)
          }
          ).then(response => {
              if(response.ok) {
                 this.props.history.push('/clientList/2')
              }
          })
        }}

        validate={(values)=>
        {
          let errors = {}


          const regexZipCode = new RegExp(`[0-9][0-9][-][0-9][0-9][0-9]`)
          if(!regexZipCode.test(values.zipCode))
          {
            errors.zipCode="Prosze zapisac kod pocztowy w formacie - 00-000"
          }

          const regexNip = new RegExp(`[0-9]{10}$`)
          if(!regexNip.test(values.nip)||values.nip.length>10)
          {
            errors.nip="Prosze zapisac nip w formacie - XXXXXXXXXX"
          }
          
          const regexPhoneNo = new RegExp(`[0-9]{9}$`)
          if(!regexPhoneNo.test(values.phoneNo)||values.phoneNo.length>9)
          {
            errors.phoneNo="Prosze zapisac numer telefonu w formacie - XXXXXXXXX"
          }

          if(!values.address)
          {
              errors.address="Prosze uzupelnic pole"
          }

          if(!values.companyName)
          {
              errors.companyName="Prosze uzupelnic pole"
          }
          return errors
        }}
        render={({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting
        }) =>(




// formularz

            <form onSubmit={handleSubmit} >
                <nav class="navbar navbar-light bg-light">
                            <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Dodawanie nowego klienta</span>
                        </nav>
                       
                <Form.Group >
                    <Form.Label>Nazwa firmy</Form.Label>
                    <Form.Control type="text" name='companyName' isInvalid={!!errors.companyName}  onChange={handleChange}   value={values.companyName}/>
                    <Form.Control.Feedback type="invalid">
                       {errors.companyName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                  <Form.Label>Nip</Form.Label>
                  <Form.Control type="text" name='nip' onChange={handleChange} isInvalid={!!errors.nip} value={values.nip}/>
                  <Form.Control.Feedback type="invalid">
                       {errors.nip}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                  <Form.Label>Kod pocztowy</Form.Label>
                  <Form.Control type="text"   name='zipCode' isInvalid={!!errors.zipCode} onChange={handleChange} value={values.zipCode}/>
                  <Form.Control.Feedback type="invalid">
                       {errors.zipCode}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                  <Form.Label>Adres</Form.Label>
                  <Form.Control type="text"  name='address' isInvalid={!!errors.address} onChange={handleChange} value={values.address}/>
                  <Form.Control.Feedback type="invalid">
                       {errors.address}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                  <Form.Label>Numer telefonu</Form.Label>
                  <Form.Control type="text"  name='phoneNo'isInvalid={!!errors.phoneNo} onChange={handleChange} value={values.phoneNo}/>
                  <Form.Control.Feedback type="invalid">
                       {errors.phoneNo}
                    </Form.Control.Feedback>
                </Form.Group>
                <div style={{textAlign:'center'}}>
                <Button variant="primary" type="submit" >Dodaj klienta</Button>
                </div>
                </form>
                )}
            
            
             />

       
      </div>
    )
  }
}
export default withRouter(NewClient)