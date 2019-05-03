import React, {Component} from 'react';
import {Header, Segment, Card} from "semantic-ui-react";
import axios from 'axios';
import VideoCard from "./browsing/VideoCard";

class History extends Component {

    state={
        videos:[]
    };

    componentDidMount(): void {
        axios.get('/api/getHistory', {
            params: {
                license: this.props.license
            }
        }).then((res) => this.setState({videos: res.data.videos}));
    }


    render() {
        const videos = this.state.videos;
        return (
            <React.Fragment>
                <Segment>
                    <Header as={'h5'}>Historial de reproducción</Header>
                </Segment>
                <Segment>
                    <Card.Group itemsPerRow={3}>
                        { videos.map( video => (<VideoCard video={video}/> )) }
                    </Card.Group>
                </Segment>
            </React.Fragment>
        );
    }
}

export default History;