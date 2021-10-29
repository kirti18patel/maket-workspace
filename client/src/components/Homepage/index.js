import React, { useState } from 'react';
import Login from '../Login';
import Signup from '../Signup';
import hero from '../../assets/images/hero.jpg';

function Homepage( ) {
    const [loginShow, setLoginShow]= useState(false);

    const formStyle = "rounded-3xl flex flex-col items-center text-center justify-center gap-6 md:p-20 p-6 bg-blue-100 relative";

  return (
    <div className="text-center h-screen flex items-center justify-between">
        <img src={hero} className="hero w-1/3 h-screen" alt="decorative butterfly"/>

        <section className="login w-2/3 flex flex-col px-60">
            <div className={formStyle}>
                {loginShow? <Login setLoginShow={setLoginShow}/> : <Signup setLoginShow={setLoginShow}/>
                }
            </div>
        </section>
    </div>
  );
}

export default Homepage;