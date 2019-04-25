import React, { Component } from "react";
import {Link} from "react-router-dom";

class LandingPage extends Component{
    render(){
        return(
            <div>
                <h2>Por favor inicia sesión o <Link to="/register">regístrate</Link> para continuar</h2>
            </div>
        )


    }

}
export default LandingPage;