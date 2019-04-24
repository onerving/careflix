import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {

  state = {
    license: null,
    firstName: null,
    lastName: null,
    specialty: null,
    password: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    /*
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
    */
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    /*
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
    */
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

  putUserToDb = event => {
    const {license, firstName, lastName, specialty, password} = this.state;
    axios.post("/api/createUser", {
      license: license,
      firstName: firstName,
      lastName: lastName,
      specialty: specialty,
      password: password
    });
    event.preventDefault();
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



  render() {
    return (
        <div>
          <form onSubmit={this.putUserToDb} style={{ padding: "10px" }}>

            <label>
              Número de Licencia
              <input
                  type="number"
                  onChange={e => this.setState({ license: e.target.value })}
                  style={{ width: "200px" }}
              />
            </label>

            <label>
              Nombre
              <input
                  type="text"
                  style={{ width: "200px" }}
                  onChange={e => this.setState({ firstName: e.target.value })}
              />
            </label>

            <label>
              Apellidos
              <input
                  type="text"
                  style={{ width: "200px" }}
                  onChange={e => this.setState({ lastName: e.target.value })}
              />
            </label>
            <label>
              Especialidad
              <select
                  type="text"
                  value={this.state.specialty}
                  style={{ width: "200px" }}
                  onChange={e => this.setState({ specialty: e.target.value })}
              >
                <option value="Gastroenterología">Gastroenterología</option>
                <option value="Obstetricia">Obstetricia</option>
                <option value="Pediatría">Pediatría</option>
              </select>
            </label>

            <label>
              <input
                  type="password"
                  style={{ width: "200px" }}
                  onChange={e => this.setState({ password: e.target.value })}
                  placeholder="password"
              />
            </label>

            <input type="submit" value="Submit" />
          </form>
        </div>
    );
  }
}

export default App;
