import React, { Component } from 'react';
import axios from 'axios';

class RegisterForm extends Component{
    state = {
        license: null,
        firstName: null,
        lastName: null,
        specialty: null,
        password: null
    };

    putUserToDb = event => {
        const {license, firstName, lastName, specialty, password} = this.state;
        axios.post("/api/createUser", {
            license: license,
            firstName: firstName,
            lastName: lastName,
            specialty: specialty,
            password: password
        });
        event.preventDefault();
    };

    render(){
        return(
            <form onSubmit={this.putUserToDb} style={{ padding: "10px" }}>
                <label>
                    Número de Licencia
                    <input
                        type="number"
                        onChange={e => this.setState({ license: e.target.value })}
                        style={{ width: "200px" }}
                    />
                </label>

                <label>
                    Nombre
                    <input
                        type="text"
                        style={{ width: "200px" }}
                        onChange={e => this.setState({ firstName: e.target.value })}
                    />
                </label>

                <label>
                    Apellidos
                    <input
                        type="text"
                        style={{ width: "200px" }}
                        onChange={e => this.setState({ lastName: e.target.value })}
                    />
                </label>
                <label>
                    Especialidad
                    <select
                        value={this.state.specialty}
                        style={{ width: "200px" }}
                        onChange={e => this.setState({ specialty: e.target.value })}
                    >
                        <option value="Gastroenterología">Gastroenterología</option>
                        <option value="Obstetricia">Obstetricia</option>
                        <option value="Pediatría">Pediatría</option>
                    </select>
                </label>

                <label>
                    <input
                        type="password"
                        style={{ width: "200px" }}
                        onChange={e => this.setState({ password: e.target.value })}
                        placeholder="password"
                    />
                </label>

                <input type="submit" value="Submit" />
            </form>
        )

    }
}

export default RegisterForm;