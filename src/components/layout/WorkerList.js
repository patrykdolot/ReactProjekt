import React, { Component } from 'react'
import { conf } from './config/config'
import ProductDetailsTab from './ProductDetailsTab'
import { Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Dialog from 'react-bootstrap-dialog'

class WorkerList extends Component {

    constructor() {
        super();
    }

    state = {
        workers: [

        ],
        draft: '',
        role: ''
    }
    componentDidMount = () => {
        var cookie = "role"
        var re = new RegExp('[; ]' + cookie + '=([^\\s;]*)')
        var cookieVal = unescape((' ' + document.cookie).match(re))
        this.role = cookieVal
        this.loadWorker();
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    loadWorker = () => {
        this.getCookie("tokenWareHouse")
        var nameS = conf.servername + "manager/workersList"
        fetch(nameS, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            }
        }
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ workers: json })
                })
            }
            else {
                if (response.status == 401) {
                    alert("Brak uprawnień do wykonania działania");
                }
                else {
                    alert("Błąd podczas pobiernia produktów");
                }
            }
        })
    }

    build() {
        var tab = [];
        tab.push(
            <div>
                <div>
                    <label>Login</label>
                    <input type="text" class="form-control" id="loginUser" />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" class="form-control" id="email" />
                </div>
                <div>
                    <label>Imię</label>
                    <input type="text" class="form-control" id="name" />
                </div>
                <div>
                    <label>nazwisko</label>
                    <input type="text" class="form-control" id="surname" />
                </div>
            </div>
        )
        return tab;
    }

    addWork() {
        var login = document.getElementById('loginUser').value;
        var email = document.getElementById('email').value;
        var name = document.getElementById('name').value;
        var surname = document.getElementById('surname').value;

        var dane = {
            "username": login,
            "email": email,
            "firstname": name,
            "lastname": surname
        }

        var cookieVal = this.getCookie("tokenWareHouse");

        var nameS = conf.servername + "manager/addUserAsWorker"
        fetch(nameS, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieVal
            },
            body: JSON.stringify(dane)
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json.success == true) {
                            this.dialog.show({
                                title: 'Utworzono pracownika',
                                body: <div><h4 class="text-center">Dane do logowania:</h4><br /><label class="font-weight-bold">Login:&nbsp;</label>{json.username}<br /><label class="font-weight-bold">Hasło:&nbsp;</label>{json.password}</div>,
                                actions: [
                                    Dialog.OKAction(() => {
                                        window.location.reload();
                                    })
                                ],
                            })
                        }
                        else {
                            this.dialog.show({
                                title: 'Dodawanie pracownika',
                                body: 'Bład podczas tworzenia',
                                actions: [
                                    Dialog.OKAction(() => {

                                    })
                                ],
                            })
                        }
                    });
                } else {
                    if (response.status == 401) {
                        alert("Brak uprawnień do wykonania działania");
                    }
                    else {
                        alert("Błąd");
                    }
                }
            })
    }

    addWorker() {
        this.dialog.show({
            title: <nav class="navbar">
                <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Dodawanie pracownika</span>
            </nav>,
            body: this.build(),
            actions: [
                Dialog.CancelAction(),
                Dialog.OKAction(() => {
                    this.addWork()
                })
            ],
            bsSize: 'small',
            onHide: (dialog) => {
                dialog.hide()
            }
        })
    }

    render() {
        var t;
        var typ = String(this.role)
        if (typ.includes("ROLE_MANAGER")) {           
            return (
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="text-center">
                                <br />
                                <Button onClick={(e) => this.addWorker()}>Dodaj pracownika</Button>
                                <Dialog ref={(el) => { this.dialog = el }} />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <br />
                            <br />
                            <nav class="navbar">
                                <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Zatrudnieni pracownicy</span>
                            </nav>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Login</th>
                                        <th>Imię</th>
                                        <th>Nazwisko</th>
                                        <th>email</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.workers.map((worker) => {
                                        return <WorkerListTab worker={worker} c={"active"} />
                                    })}
                                </tbody>
                            </Table>
                        </div>
                        <div class="col-sm-12">
                            <br />
                            <br />
                            <nav class="navbar">
                                <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Byli pracownicy</span>
                            </nav>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Login</th>
                                        <th>Imię</th>
                                        <th>Nazwisko</th>
                                        <th>email</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.workers.map((worker) => {
                                        return <WorkerListTab worker={worker} c={"noActive"} />
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <nav class="navbar">
                        <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Brak uprawnień do wyświetlenia strony</span>
                    </nav>
                    <nav class="navbar">
                        <span class="navbar-brand mb-0 h1 text-center" id="naglowek">Tylko kierownik posiada dostęp do pracowników</span>
                    </nav>
                </div>
            )


        }
    }

}
class WorkerListTab extends React.Component {

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    deleteW(id) {
        this.getCookie("tokenWareHouse")
        var nameS = conf.servername + "manager/deleteWorker"
        fetch(nameS, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + this.getCookie("tokenWareHouse")
            },
            body:
                JSON.stringify({ "id": id })
        }
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    if (json.status == "SUCCESS") {
                        this.dialog.show({
                            title: 'Usuwanie dostawy',
                            body: 'Pomyślnie usunięto',
                            actions: [
                                Dialog.OKAction(() => {
                                    window.location.reload();
                                })
                            ],
                        })
                    }
                    else {
                        this.dialog.showAlert('Błąd przy usuwaniu')
                    }
                })
            }
            else {
                if (response.status == 401) {
                    alert("Brak uprawnień do wykonania działania");
                }
                else {
                    alert("Błąd");
                }
            }
        })
    }

    deleteWorker(id) {
        this.dialog.show({
            title: 'Usuwanie pracownika',
            body: 'Czy napewno chcesz usunąć pracownika?',
            actions: [
                Dialog.CancelAction(),
                Dialog.OKAction(() => {
                    this.deleteW(id)
                })
            ],
            bsSize: 'small',
            onHide: (dialog) => {
                dialog.hide()
            }
        })
    }

    check(worker, type) {
        if (type == "active") {
            if (worker.enabled == true) {
                return (
                    <tr>
                        <th> {this.props.worker.username}</th>
                        <th> {this.props.worker.firstname}</th>
                        <th> {this.props.worker.lastname}</th>
                        <th> {this.props.worker.email}</th>
                        <th><Button variant="danger" onClick={(e) => this.deleteWorker(this.props.worker.id)}>Usuń</Button></th>
                        <Dialog ref={(el) => { this.dialog = el }} />
                    </tr>
                )
            }
            else {
                return ("")
            }
        }
        else if (type == "noActive") {
            if (worker.enabled == false) {
                return (
                    <tr>
                        <th> {this.props.worker.username}</th>
                        <th> {this.props.worker.firstname}</th>
                        <th> {this.props.worker.lastname}</th>
                        <th> {this.props.worker.email}</th>
                    </tr>
                )
            }
            else {
                return ("")
            }
        }
    }

    render() {
        return (
            this.check(this.props.worker, this.props.c)
        )
    }
}

export default WorkerList;