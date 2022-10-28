import React from "react";
import { Link } from 'react-router-dom';

function Create() {
    return(
        <div>
            <p>Create</p>
            <Link to="/home"><button>Regresar a Home</button></Link>
        </div>
    )
};

export default Create; 