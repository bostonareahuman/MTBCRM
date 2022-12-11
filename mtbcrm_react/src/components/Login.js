import { useState } from 'react';
import axios from "axios";

function Login(props) {
	const [intervalId, setIntervalId] = useState(0);

	const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

	function checkToken(){
		console.log('cehck token fucntion');
	  }
	
    function logMeIn(event) {
      axios({
        method: "POST",
        url:"/token",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
		console.log(response.data.access_token)
        props.setToken(response.data.access_token)
		const interval = setInterval(() => {
			checkToken();
			console.log('This will be called every 2 seconds');
		  }, 40000);
		
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        email: "",
        password: ""}))
      event.preventDefault()
    }

    function handleChange(onCh) { 
	  
      const {value, name} = onCh.target
	  console.log(value + name)
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <h1>Login</h1>
          <form className="login">
            <input onChange={handleChange} 
                  type="email"
                  text={loginForm.email} 
                  name="email" 
                  placeholder="Email" 
                  value={loginForm.email} />
            <input onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />

          <button onClick={logMeIn}>Submit</button>
        </form>
      </div>
    );
}

export default Login;