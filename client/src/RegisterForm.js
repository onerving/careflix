import React, { Component } from 'react';
import axios from 'axios';
import {Form, Grid, Header, Message, Segment} from 'semantic-ui-react'

class RegisterForm extends Component{
    state = {
        license: null,
        firstName: null,
        lastName: null,
        specialty: null,
        password: null,
        existingUserError: false
    };
    options = [
        {key:'Pediatría', text: 'Pediatría', value: 'Pediatría'},
        {key:'Cardiología', text: 'Cardiología', value: 'Cardiología'},
        {key:'Neurología', text: 'Neurología', value: 'Neurología'},
        {key:'Gastroenterología', text: 'Gastroenterología', value: 'Gastroenterología'},
    ];



    putUserToDb = event => {
        event.preventDefault();
        const {license, firstName, lastName, specialty, password} = this.state;
        let error = null;
        axios.post("/api/createUser", {
            license: license,
            firstName: firstName,
            lastName: lastName,
            specialty: specialty,
            password: password
            }
        ).then( () => this.props.history.push('/'))
            .catch(({response}) => {
                error = response;
                this.setState({existingUserError: true});
            });
        if(error == null) {
        }
    };

    render(){
        return(
            <div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' textAlign='center'>
                            Crea tu cuenta
                        </Header>
                        <Message attached error hidden={!this.state.existingUserError}
                                 header= 'Usuario en uso'
                                 content= ' La matricula médica que introduciste ya está en uso.'
                        />
                        <Form size='large' onSubmit={this.putUserToDb}>
                            <Segment stacked>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label="Nombre(s)"
                                                onChange={e => this.setState({ firstName: e.target.value })}
                                    />
                                    <Form.Input fluid label="Apellidos"
                                                onChange={e => this.setState({ lastName: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Input fluid label='Licencia médica'
                                            icon="drivers license"
                                            iconPosition='left'
                                            onChange={e => this.setState({ license: e.target.value })}
                                            error = {this.state.existingUserError}
                                            placeholder='12345678'/>
                                <Form.Select label='Especialidad'
                                             options={this.options}
                                             value={this.state.specialty}
                                             onChange={(e,data) => this.setState({ specialty: data.value })}
                                             placeholder='Especialidad'/>
                                <Form.Input fluid label={'Contraseña'}
                                            icon='lock'
                                            iconPosition='left'
                                            placeholder='Contraseña'
                                            onChange={e => this.setState({ password: e.target.value })}
                                            type='password'/>
                                <Form.Button type='submit'
                                             disabled = {!this.state.firstName ||
                                             !this.state.lastName || !this.state.lastName ||
                                             !this.state.specialty || !this.state.password}>
                                    Registrar
                                </Form.Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                <Form>
                </Form>
            </div>
        )

    }
}

export default RegisterForm;