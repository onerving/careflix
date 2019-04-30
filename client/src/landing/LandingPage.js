import React, { Component } from "react";
import {Button, Container, Grid, GridRow, Header, Image, Segment} from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { Player } from 'video-react'
import styled from "styled-components";

class LandingPage extends Component{
    render(){

        const MainHeader = styled(Header)`
            font-size: 6em;
            color: #383636;
            font-family: Montserrat, sans-serif;
            font-size: 6em;
            padding-top: .5em
        `;
        const SubHeader = styled(Header)`
            font-size: 2em;
            font-weight: normal;
            color: #45B6CC;
            font-family: Lato, sans-serif;
            margin-top: 0em
        `;

        const RegisterButton = styled(Button)`
            background-color: #45B6CC !important;
            letter-spacing: 0.1em;
            font-family: Lato, sans-serif;
            font-size: 2em !important;
            padding: 1em;
        `;
        const RegisterLink = styled(Link)`
            color: #383636 !important;
            letter-spacing: 0.1em;
            font-family: Lato, sans-serif;
        `;


        return(
            <Grid centered columns={2} verticalAlign='middle'>
                <Grid.Column textAlign={'center'}>
                    <MainHeader as='h1' >
                        Careflix
                    </MainHeader>
                    <SubHeader as={'h2'}>
                        Los mejores videos de temas médicos,<br/> accesibles en segundos.
                    </SubHeader>
                    <Grid.Row style={{'padding-top':'4em'}}>
                        <Link to='/register'>
                             <RegisterButton primary size={'huge'}> REGÍSTRATE </RegisterButton>
                        </Link>
                    </Grid.Row>
                    <Grid.Row style={{'padding-top': '.5em', 'padding-bottom':'4em'}}>
                        <RegisterLink to='/login'>
                            INICIA SESIÓN
                        </RegisterLink>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                    <Player
                        src={"../video/landing.mp4"}
                        muted={true}
                        autoPlay={true}
                        fluid={true}
                        startTime='252'
                    />
                </Grid.Column>
            </Grid>
        )


    }

}
export default LandingPage;