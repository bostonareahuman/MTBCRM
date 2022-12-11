import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


function UserList(props){
	
	//console.log('UserList');
	//console.log(props.users);
	//console.log(typeof props.users["res"]);
	//console.log(Array.isArray(props.users));
	
	const [searchTerm,setsearchTerm] = useState('')

	const handleChange = e => {
		setsearchTerm(e.target.value)
	}

	var userss = props.users;
	const luser = userss.map((user,index) =>
	<div className={(index % 2) ? 'greyBg' : 'noBg'} key={user.person_id} onClick={props.showDetails} id={user.person_id} > {user.LastName}, {user.FirstName}</div>
	//<div className="usercolor" className={user.person_id.toString()}>{user.LastName},{user.FirstName} test()</div>
	)
	return (
	<div id="mainlist">
		<input id="searchuser" type="text" onChange={handleChange} value={searchTerm}></input><button id="useradd" onClick={props.getUserList}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
		<div id="Userlist">
			{luser}
		</div>

	</div>
	
	);
}
export default UserList