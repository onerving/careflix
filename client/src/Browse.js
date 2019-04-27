import React, {Component} from 'react';
import "../node_modules/video-react/dist/video-react.css"
import {Grid, Menu, Dimmer, Loader} from "semantic-ui-react";
const axios = require('axios');

class Browse extends Component {
    state = {
        specialties: [],
        specialty: null,
        loadingSpecialties: true,
        activeItem: ''
    };
    componentDidMount() {
        //GET message from server using fetch api
        fetch('/api/getSpecialties')
            .then(specialties => specialties.json())
            .then(res => {
                this.setState({specialties: res.specialties.map(item => item.name).sort()});
                this.setState({loadingSpecialties: false});
                this.setDoctorSpecialty(this.props.license)
            });
    }

    setDoctorSpecialty = (license) => {
        axios.get('/api/getSpecialtyWithLicense', {
            params: {
                license: license
            }
        })
            .then(res => {
                let specialties = this.state.specialties;
                let name = res.data.specialty;
                specialties.splice(specialties.indexOf(name), 1);
                specialties.unshift(name);
                this.setState({specialties: specialties});
                this.selectSpecialty(null, {name})
            });
    };

    selectSpecialty = (e, {name}) => {
        this.setState({activeItem: name});
    };
    /*
     */
    render() {
        const { specialties, activeItem } = this.state;
        return (
            <Grid.Column width={4}>
                <Dimmer.Dimmable dimmed={this.state.loadingSpecialties}>
                    <Dimmer inverted active={this.state.loadingSpecialties}>
                        <Loader/>
                    </Dimmer>
                    <Menu pointing vertical>
                        {specialties.map(specialty => (
                            <Menu.Item name={specialty}
                                       active={activeItem === specialty}
                                       onClick={this.selectSpecialty}/>
                        ))}
                    </Menu>
                </Dimmer.Dimmable>
            </Grid.Column>
        );
    }
}

export default Browse;