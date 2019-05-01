import React, {Component} from 'react';
import {Form} from "semantic-ui-react";
import axios from "axios";

class UploadVideo extends Component {
    state = {
        videos: [],
        category: null,
        stringOfVideos: null,
    };

    uploadVideos = (event) =>{
        event.preventDefault();
        var string = this.state.stringOfVideos;
        string = '{ "data": [' + string;
        string = string.replace(/\n/g, '');
        string = string.replace(/}/g, '},');
        string = string.slice(0,-1);
        string = string + ']}';
        console.log(string);
        const info = JSON.parse(string);
        console.log(info);
        info.data.forEach(elem => {
            elem['category'] = this.state.category;
            axios.post("/api/createVideo", elem);
        })


    };
    render() {
        return (
            <div>
                <Form onSubmit={this.uploadVideos}>
                    <Form.TextArea onChange={e => this.setState({stringOfVideos: e.target.value})}/>
                    <Form.Input onChange={e => this.setState({category: e.target.value})}/>
                    <Form.Button type='submit' primary>
                        Registrar
                    </Form.Button>
                </Form>

            </div>
        );
    }
}

export default UploadVideo;