import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';

import Login from './components/Login'
import Header from './components/Header'
import useToken from './components/useToken'
import MainScreen from './components/MainScreen'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [tokenCheck,settokenCheck] = useState(0);
  const { token, removeToken, setToken } = useToken();
  console.log('what is the token');
  console.log(token);
  console.log(removeToken);
  console.log(setToken);
  console.log('end what is the token');


  return (
    <BrowserRouter>
      <div className="App">
        <Header remtoken={removeToken}/>
        {!token && token!=="" && token!== undefined?  
        <Login setToken={setToken} />
        :(
          <>
            <Routes>
			  <Route exact path="/" element={<MainScreen token={token}/>}> </Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;