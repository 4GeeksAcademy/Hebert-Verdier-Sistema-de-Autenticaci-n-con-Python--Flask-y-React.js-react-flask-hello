import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // MANEJADOR DE EVENTO ONCLICK DEL FORMULARIO
    const handleSubmit = async (e) => {
        e.preventDefault();
        const registration = await actions.signup(email, password);
        if (!registration.error) {
            Swal.fire({
                title: 'Success!',
                text: "User successfully created",
                icon: 'success',
                timer: 2000
            })
            navigate("/login")
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: registration.error,
                icon: 'error',
                confirmButtonText: 'OK',
            })
        }
    }

    return (
        <div>
            <h1>REGISTRO DE USUARIO</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">REGISTRARSE</button>
            </form>
        </div>
    );
}