import React, {Component} from 'react';
import "video-react/dist/video-react.css"
import CategoryBar from "./CategoryBar";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {Card, Image} from "semantic-ui-react";
import VideoThumbnail from "react-video-thumbnail";
import NavigationBar from "../NavigationBar";
const axios = require('axios');

class Browse extends Component {
    state = {
        specialties: [],
        specialty: null,
        loadingSpecialties: true,
        activeItem: '',
        categoryVideos: []
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
        axios.get('/api/get/videos', {
            params: {
                category: name
            }
        })
            .then(res => this.setState({categoryVideos: res.data.videos}));
    };
    /*
     */
    render() {
        const categoryVideos = this.state.categoryVideos;
        return (
            <React.Fragment>
                <Grid>
                    <Grid.Column width={3}>
                        <CategoryBar activeItem = {this.state.activeItem}
                                     selectSpecialty = {this.selectSpecialty}
                                     specialties = {this.state.specialties} />
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Card.Group itemsPerRow={4}>
                            {categoryVideos.map(video => (
                                <Card href={'/watch/' + video._id}
                                      color={'blue'}
                                >
                                    <Image
                                        src={'https://img.youtube.com/vi/' + video.filename + '/0.jpg'}
                                    >
                                    </Image>
                                    <Card.Content>
                                        <Card.Header>{video.title}</Card.Header>
                                        <Card.Meta>{video.category}</Card.Meta>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Browse;