import '../App.css';
import React from 'react'
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <>
        <h1>Fortis Bellator</h1>
        <br></br>
        <br></br>
        <br></br>
        <div>
            <Link to={`/Home`}>
            <h1>Login as User</h1>
            </Link>
            <Link to={`/Approver`}>
            <h1>Login as Approver</h1>
            </Link>
        </div>
        </>
    )
}

export default LoginPage;