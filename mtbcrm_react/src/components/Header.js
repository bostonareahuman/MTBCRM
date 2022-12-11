import logo from '../logo.svg'
import axios from "axios";

function Header(props) {

  function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
	console.log('doing logout');
       props.remtoken()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header">
			<div className="title">
				Medfield Tire and Battery 
			</div>
            <button onClick={logMeOut}> 
                Logout
            </button>
        </header>
    )
}

export default Header;