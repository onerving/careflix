import React, {Component} from 'react';
import {Card, Image} from "semantic-ui-react";

class VideoCard extends Component {
    render() {
        const video = this.props.video;
        return (
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

        );
    }
}

export default VideoCard;