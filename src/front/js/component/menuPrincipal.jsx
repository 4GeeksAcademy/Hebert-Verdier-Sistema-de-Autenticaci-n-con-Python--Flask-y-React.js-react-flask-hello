import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Menu = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="d-flex flex-column justify-content-center">
            <Link className="btn btn-success" to={"/Signup"}>Registrarse</Link>
            <Link className="btn btn-primary" to={"/Login"}>Iniciar Sesion</Link>
        </div>
    );
}