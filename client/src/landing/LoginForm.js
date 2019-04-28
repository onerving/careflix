import React, {Component} from 'react';
import axios from 'axios/index';
import {Form, Grid, Header, Message, Segment} from "semantic-ui-react";

class LoginForm extends Component {
    state = {
        license: null,
        password: null
    };

    loginUser = event => {
        event.preventDefault();
        axios.post("/api/loginUser", {
            license: this.state.license,
            password: this.state.password
        }).then(() => this.props.history.push('/browse'));
    };


    render() {
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' textAlign='center'>
                            Inicia sesión
                        </Header>
                        <Message attached error hidden={!this.state.existingUserError}
                                 header= 'Usuario en uso'
                                 content= ' La matricula médica que introduciste ya está en uso.'
                        />
                        <Form size='large' onSubmit={this.loginUser}>
                            <Segment stacked>
                                <Form.Input fluid label='Matrícula médica'
                                            icon='drivers license'
                                            onChange={e => this.setState({ license: e.target.value } ) }
                                />
                                <Form.Input fluid label='Contraseña'
                                            type='password'
                                            onChange={e => this.setState({ password: e.target.value })}
                                />
                                <Form.Button fluid primary
                                             disabled = {!this.state.license || !this.state.password}
                                >Iniciar Sesión</Form.Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

}

export default LoginForm;