import { useState } from 'react'
import axios from "axios";
import UserList from './UserList.js';
import Jobs from './Jobs.js';
import People from './People.js';

import Household from './Household';
import Autos from './Autos';


function MainScreen(props) {

  const [userList, setuserList] = useState([])
  const [currHousehold, setcurrHousehold] = useState({})
  const [currAutos, setcurrAutos] = useState(0)
  const [userDet, setuserDet] = useState({
	firstName:null,
	lastName:null,
	phones:[]
  })
  const [userPhones, setuserPhones] = useState({})


  //console.log('mainscreen')
  //console.log(props.token)

	//alert(props.token);
    function doUserSearch(){
		alert('getuserlist');
		
		axios({
      method: "GET",
      url:"/userlist",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      const res =response.data
	  //console.log(res[0]);
	  //console.log(res);
      setuserList(res);
	  //console.log(userList);
	  //console.log('back from endpoint');
	  //console.log(typeof res);
	  //console.log(Array.isArray(res));
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
	}

	function showDetails(event){
		console.log('show details');
		axios({
			method: "POST",
			url:"/userdets",
			data:{
				id:event.target.id
			},
			headers: {
			  Authorization: 'Bearer ' + props.token
			}
		  })
		  .then((response) => {
			const res =response.data
			setuserDet(response.data)
			setcurrHousehold(response.data.households)

		  }).catch((error) => {
			if (error.response) {
			  console.log(error.response)
			  console.log(error.response.status)
			  console.log(error.response.headers)
			  }
		  })
	}

  return (
	
    <div className="mainbox">
		
		<UserList getUserList={doUserSearch} showDetails={showDetails} users={userList}></UserList>
		<div id="peoplejobbox">
			<div id="peoplebox">
				<People userDet={userDet}></People>
				<Household whichhousehold={currHousehold}></Household>
				<Autos whichautos={currAutos}></Autos>
			</div>	
				<div id="jobbox">
				{currHousehold.FirstName}
				<Jobs></Jobs>
				</div>
		</div>

    </div>
	
  );
}

export default MainScreen;