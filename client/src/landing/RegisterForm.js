import React, { Component } from 'react';
import axios from 'axios/index';
import {Form, Grid, Header, Message, Segment} from 'semantic-ui-react'

class RegisterForm extends Component{
    state = {
        error: {
            header: '',
            content: '',
            source: null
        },
        license: null,
        firstName: null,
        lastName: null,
        specialty: null,
        password: null,
        existingUserError: false,
        loadingSpecialties: true
    };
    options = [
    ];

    setError(header, content, source){
        this.setState({error:{
                header: header,
                content: content,
                source: source
            }});
    }
    removeError(source){
        if(this.state.error.source === source){
            this.setState({error:{
                    source:null
                }});
        }
    }

    componentDidMount() {
        fetch('/api/getSpecialties')
            .then(specialties => specialties.json())
            .then(res => {
                const specialties = res.specialties;
                specialties.forEach(value => {
                    const specialty = value.name;
                    this.options.push({
                        key: specialty,
                        text: specialty,
                        value: specialty,
                        }
                    )
                });
                this.options.sort((a,b) => (a.key > b.key) ? 1: -1);
                this.setState({loadingSpecialties: false});
            });
    }

    onLicenseChange(e) {
        const license = e.target.value;
        if(/\D/.test(license)){
            this.setError("Matrícula invalida", "Una matrícula médica solo puede contener números", 'license');
        }else{
            this.removeError('license');
            this.setState({license: e.target.value});
        }
    }


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
                this.setError('Matrícula en uso', 'La matrícula que introdujiste ya está en uso.', 'user');
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
                        <Message attached error hidden={this.state.error.source == null}
                                 header = {this.state.error.header}
                                 content= {this.state.error.content}
                        />
                        <Form size='large' onSubmit={this.putUserToDb}>
                            <Segment stacked color={'blue'}>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label="Nombre(s)"
                                                onChange={e => this.setState({ firstName: e.target.value })}
                                    />
                                    <Form.Input fluid label="Apellidos"
                                                onChange={e => this.setState({ lastName: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Input fluid label='Matrícula médica'
                                            icon="drivers license"
                                            iconPosition='left'
                                            onChange={this.onLicenseChange.bind(this)}
                                            error = {this.state.error.source === 'license'}
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
                                <Form.Button type='submit' primary
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
        );


    }
}

export default RegisterForm;