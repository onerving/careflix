import React, {Component} from 'react';
import axios from 'axios'
import "../../node_modules/video-react/dist/video-react.css";
import {Grid, Header, Segment} from "semantic-ui-react";
import Iframe from 'react-iframe'

class VideoBrowser extends Component {
    state = {
        video: null
    };
    componentDidMount(): void {
        const{ match: {params}} = this.props;

        axios.get('/api/getVideo', {
            params: {
                videoId: params.videoId
            }
        })
            .then(res => this.setState({video: res.data.video}));
    }

    render() {
        if(!this.state.video){
            return(<div></div>);
        }
        const {filename, title} = this.state.video;
        return (
            <Grid centered>
                <Grid.Column columns width={12}>
                    <Segment.Group>
                        <Segment>
                            <Iframe url={"http://www.youtube.com/embed/" + filename}
                                    width="800px"
                                    height="600px"
                                    id="myId"
                                    className="myClassname"
                                    display="initial"
                                    position="relative"/>
                        </Segment>
                        <Segment inverted color={'blue'}>
                            <Header inverted as={'h1'}>
                                {title}
                            </Header>
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

export default VideoBrowser;