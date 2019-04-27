import React, {Component} from 'react';
import "../node_modules/video-react/dist/video-react.css"
import {Grid, Menu, Dimmer, Segment, Loader} from "semantic-ui-react";

class Browse extends Component {
    state = {
        specialties: [],
        loadingSpecialties: true
    };
    componentDidMount() {
        //GET message from server using fetch api
        fetch('/api/getMaterias')
            .then(specialties => specialties.json())
            .then(res => {
                this.setState({specialties: res.specialties});
                this.setState({loadingSpecialties: false});
            });
    }
    /*
     */
    render() {
        const { specialties } = this.state;
        return (
            <Grid.Column width={4}>
                <Dimmer.Dimmable dimmed={this.state.loadingSpecialties}>
                    <Dimmer inverted active={this.state.loadingSpecialties}>
                        <Loader/>
                    </Dimmer>
                    <Menu pointing vertical>
                        {specialties.map(specialty => (
                            <Menu.Item name= {specialty.name}/>
                        ))}
                    </Menu>
                </Dimmer.Dimmable>
            </Grid.Column>
        );
    }
}

export default Browse;