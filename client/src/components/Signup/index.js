import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

function Signup ({setLoginShow}) {
        
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);
    
    const inputField = "p-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent";

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      if(formState.username !== "" || formState.password !== ""){
        try{
          const mutationResponse = await addUser({
            variables: {
              username: formState.username,
              email: formState.email,
              password: formState.password
            },
          });
          const token = mutationResponse.data.addUser.token;
          Auth.login(token);
        }
        catch(e){
          alert("Enter proper credentials")
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
      <h1 className="text-4xl font-normal mb-5">SIGNUP</h1>
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
              type="text" 
              className={`${inputField} md:text-2xl text-lg`}
              name="email"
              placeholder="Email"
              label="Email"
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

          <button className={`md:text-3xl text-xl rounded-md py-2 font-bold opacity-100 btn-action submit-btn`}>
              SIGNUP
          </button>

          <p className="text-lg">Already have an account?
              <a
              className="text-blue-400 font-bold register-link" 
              onClick = { () => setLoginShow(true)}
              >LOGIN</a>
          </p>
      </form></>
)}

export default Signup;