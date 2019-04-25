import React, { Component } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    getDataFromDb = () => {
        fetch("/api/getData")
            .then(data => data.json())
            .then(res => this.setState({ data: res.data }));
    };

    deleteFromDB = idToDelete => {
        let objIdToDelete = null;
        this.state.data.forEach(dat => {
            if (dat.id.toString() === idToDelete) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete("/api/deleteData", {
            data: {
                id: objIdToDelete
            }
        });
    };

    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        this.state.data.forEach(dat => {
            if (dat.id.toString() === idToUpdate) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post("/api/updateData", {
            id: objIdToUpdate,
            update: { message: updateToApply }
        });
    };

    render() {
        return (
            <Router>
                <div className="container">
                    <h2>Bienvenido a Careflix</h2>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/login" component={LoginForm} />
                </div>
            </Router>
        );
    }
}

export default App;
