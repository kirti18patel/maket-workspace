import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';

function Login ({setLoginShow}) {
        
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    const inputField = "p-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent";

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if(formState.username !== "" || formState.password !== ""){
            try {
                const mutationResponse = await login({
                    variables: { username: formState.username, password: formState.password },
                });
                const token = mutationResponse.data.login.token;
                Auth.login(token);
            } catch (e) {
            console.log(e);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    return (
        <> 
        <h1 className="text-4xl font-normal mb-5">LOGIN</h1>
        <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>

            <input
                type="text" 
                className={`${inputField} md:text-2xl text-lg`}
                name="username"
                placeholder="Username"
                label="Username"
                onChange={handleChange}
            />

            <input 
                name="password"
                type="password"
                className={`${inputField} md:text-2xl text-lg`} 
                placeholder="Password"
                label="password"
                onChange={handleChange}
            />

            {error ? (
            <div>
                <p className="error-text">The provided credentials are incorrect</p>
            </div>
            ) : null}

            <button className={`md:text-3xl text-xl rounded-md py-2 font-bold opacity-100 btn-action submit-btn`}>
                LOGIN
            </button>

            <p className="text-lg">Don't have an account?
                <a
                className="text-blue-400 font-bold register-link" 
                onClick = { () => setLoginShow(false)}
                >SIGN UP</a>
            </p>
        </form></>
    )}

export default Login;