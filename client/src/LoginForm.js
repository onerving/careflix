import React, {Component} from 'react';
import axios from 'axios';

class LoginForm extends Component {
    state = {
        license: null,
        password: null
    };

    loginUser = event => {
        event.preventDefault();
        axios.post("/api/loginUser", {
            license: this.state.license,
            password: this.state.password
        }).then(() => this.props.history.push('/secret'));
    };


    render() {
        return (
            <div>
                <form onSubmit={this.loginUser}>
                    <label>
                        Número de Licencia
                        <input
                            type="string"
                            onChange={e => this.setState({ license: e.target.value } ) }
                        />
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

export default LoginForm;