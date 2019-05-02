import React, {Component} from 'react';
import axios from 'axios'
import "../../node_modules/video-react/dist/video-react.css";
import {Card, Dimmer, Grid, Header, Loader, Segment} from "semantic-ui-react";
import ResponsiveEmbed from 'react-responsive-embed'
import VideoCard from "../browsing/VideoCard";

class VideoBrowser extends Component {
    state = {
        video: null,
        suggestions: null
    };
    componentDidMount(): void {
        const{ match: {params}} = this.props;

        axios.get('/api/getVideo', {
            params: {
                videoId: params.videoId
            }
        })
            .then(res => this.setState({video: res.data.video}));

        axios.get('/api/get/randomVideos', {
            params: {
                amount: 3
            }
        })
            .then(res => this.setState({suggestions: res.data.videos}));
    }


    /*
     */
    render() {
        return (
            <Grid centered>
                <Grid.Column columns width={11}>
                    <Segment.Group>
                        <VideoPlayer video={this.state.video}/>
                    </Segment.Group>
                    <Segment.Group>
                        <RecommendationBar videos={this.state.suggestions} />
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

class Loading extends Component{
    render(){
        return(
            <Segment>
                <Dimmer active>
                    <Loader/>
                </Dimmer>
            </Segment>
        )
    };
}

class RecommendationBar extends Component{
    render(){
        if(!this.props.videos){
            return <Loading/>
        }else{
            const suggestions = this.props.videos;
            return(
                <React.Fragment>
                    <Segment>
                        <Header as={'h5'}>
                            Videos similares
                        </Header>
                    </Segment>
                    <Segment>
                        <Card.Group itemsPerRow={3}>
                            { suggestions.map( video => (<VideoCard video={video}/> )) }
                        </Card.Group>
                    </Segment>
                </React.Fragment>
            )
        }
    };
}

class VideoPlayer extends Component{
    render(){
        if(!this.props.video){
            return <Loading/>
        }else{
            const {filename, title} = this.props.video;
            return (
                <React.Fragment>
                    <Segment>
                        <ResponsiveEmbed
                            src={"https://www.youtube.com/embed/" + filename}
                            allowFullScreen
                        />
                    </Segment>
                    <Segment inverted color={'blue'}>
                        <Header inverted as={'h2'}>
                            {title}
                        </Header>
                    </Segment>
                </React.Fragment>
            )
        }
    }
}


export default VideoBrowser;