import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                redirect: false,
                license: null
            };
        }
        componentDidMount() {
            fetch('/api/checkToken')
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(res => {
                                this.setState({license: res.license});
                                this.setState({ loading: false});
                        } );
                    } else {
                        throw new Error(res.error);
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
        }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} license={this.state.license}/>
                </React.Fragment>
            );
        }
    }
}