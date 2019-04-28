import React, {Component} from 'react';
import axios from 'axios'
import {Player} from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";

class VideoBrowser extends Component {
    state = {
        video: null
    };
    componentDidMount(): void {
        const{ match: {params}} = this.props;

        axios.get('/api/get/video', {
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
            <Player playsinline
                    src={'../video/' + filename} />
        );
    }
}

export default VideoBrowser;