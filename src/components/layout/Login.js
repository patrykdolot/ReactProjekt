import React from 'react'
import './css/loginstyle.css'
import './config/config'
import {conf} from './config/config'

function Login(){
    return (
        <div id="login">
            <h3 class="text-center text-white pt-5">Magazyn</h3>
            <img style={{width:'30%'}} src={require('./images/warehouse.png')} id="icon" alt="User Icon" />
            <div class="container">
                <div id="login-row" class="row justify-content-center align-items-center">
                    <div id="login-column" class="col-md-6">
                        <div id="login-box" class="col-md-12">                   
                            <br/>
                            <h3 class="text-center text-info">Logowanie</h3>
                            <div class="form-group">
                                <label for="username" class="text-info">Nazwa użytkownika:</label><br/>
                                <input type="text" name="username" id="user" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Hasło:</label><br/>
                                <input type="password" name="password" id="pass" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="Zaloguj" id="loginButton" onClick={getData}/>
                            </div>                       
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}


function getData() {
    var login = document.getElementById('user').value;
	var password = document.getElementById('pass').value;

	if(login === "" || password === ""){
		alert("Puste pole");
		return;
    }
    
	var dane = {
		"username": login,
		"password": password
	}
    console.log(dane)
    
    var nServer = conf.servername + "auth";
    fetch( nServer, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dane)
    })
    .then(response => { 
        //console.log(response.json() + "aa")
        if(response.ok){
            response.json().then(json => {
                //console.log(json.user.authorities[0].name);
                //alert(json.user.authorities[0].name)
                var dateExpired = new Date(json.expirationDate);       
                //console.log(dateExpired);
                document.cookie = `tokenWareHouse=${json.token}; expires=${dateExpired.toGMTString()}`;
                document.cookie = `role=${json.user.authorities[0].name}; expires=${dateExpired.toGMTString()}`;
                window.location.reload();
              });
        } else {
            console.log("no");
            if(response.status === 401){
                alert("Błędne dane do logowania");
                document.getElementById('user').value ="";
                document.getElementById('pass').value ="";
            }
            else{
                alert("Błąd podczas logowania");
            }
            console.log(response.status);
            console.log(JSON.stringify(response));
        }
    })
}


export default Login;