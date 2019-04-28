import React, { Component } from "react";
import {Button, Grid, Header} from "semantic-ui-react";
import { Link } from 'react-router-dom'

class LandingPage extends Component{
    render(){
        return(
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Row>
                    <Header as='h1'
                            content='Careflix'
                    />
                </Grid.Row>
                <Grid.Row>
                    <Header as='h2'
                            content='Los mejor videos de temas médicos, accesibles en segundos.'
                    />
                </Grid.Row>
                <Grid.Row>
                    <Link to='/register'>
                        <Button primary> Regístrate </Button>
                    </Link>
                    <Link to='/login'>
                    <Button basic> Inicia sesión </Button>
                    </Link>
                </Grid.Row>
            </Grid>
        )


    }

}
export default LandingPage;