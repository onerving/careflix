import React, {Component} from 'react';

class Browse extends Component {
    state = {
        message: 'Loading...'
    };
    componentDidMount() {
        //GET message from server using fetch api
        fetch('/api/browse')
            .then(res => res.text())
            .then(res => this.setState({message: res}));
    }
    render() {
        return (
            <div>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

export default Browse;