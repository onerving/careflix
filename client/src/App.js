import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    email: null,
    username: null,
    password: null,
    passwordConf: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }
// just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch("/api/getData")
        .then(data => data.json())
        .then(res => this.setState({ data: res.data }));
  };

  putUserToDb = (email, username, password, passwordConf) => {
    axios.post("/api/createUser", {
      email: email,
      username: username,
      password: password,
      passwordConf: passwordConf
    });
  };


  // our delete method that uses our backend api
  // to remove existing database information
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


  // our update method that uses our backend api
  // to overwrite existing data base information
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



  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
        <div>
          <ul>
            {data.length <= 0
                ? "NO DB ENTRIES YET"
                : data.map(dat => (
                    <li style={{ padding: "10px" }} key={data.message}>
                      <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                      <span style={{ color: "gray" }}> data: </span>
                      {dat.message}
                    </li>
                ))}
          </ul>
          <div style={{ padding: "10px" }}>
            <input
                type="text"
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="email"
                style={{ width: "200px" }}
            />
            <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ username: e.target.value })}
                placeholder="username"
            />
            <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="password"
            />
            <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ passwordConf: e.target.value })}
                placeholder="passwordConf"
            />
            <button
                onClick={() =>
                    this.putUserToDb(
                        this.state.email,
                        this.state.username,
                        this.state.password,
                        this.state.passwordConf
                    )
                }
            >
              AÑADIR
            </button>
          </div>
        </div>
    );
  }
}

export default App;
