import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";



function People(props){
	console.log('firing People');
	const users = props.userDet
	console.log(props.userDet)
	const [fName,setfName] = useState('')
	const [lName,setlName] = useState('')
	const [email,setemail] = useState('')
	const [newphone,setnewphone] = useState('')
	const [newphonetype,setnewphonetype] = useState('')
	

	//LINE 21
	useEffect(() => {
		console.log('useEffect Person')
		setfName(users.FirstName);
		setlName(users.LastName);
		setemail(users.email);
	 }, [users.FirstName, users.LastName,users.email]);

	const handleChange = e => {
		console.log('handle change running')
		if(e.target.name === 'fName'){
			setfName(e.target.value)
		}
		if(e.target.name === 'lName'){
			setlName(e.target.value)
		}
		if(e.target.name === 'email'){
			setemail(e.target.value)
		}
		if(e.target.name === 'newnumber'){
			setnewphone(e.target.value)
		}
		if(e.target.name === 'newphonetype'){
			setnewphonetype(e.target.value)
		}
		
	  }

	function formatPhoneNumber(phoneNumberString) {
		var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		if (match) {
		  return '(' + match[1] + ') ' + match[2] + '-' + match[3];
		}
		return null;
	}

	function updatePerson(){
		console.log('updatePerson');
		if(!users.person_id || !fName || !lName){
			document.getElementById('peopleerror').style.display = 'block';
			return
		}
		document.getElementById('peopleerror').style.display = 'none';
		axios({
			method: "POST",
			url:"/updateperson",
			data:{
				id:users.person_id,
				fName:fName,
				lName:lName,
				email:email || ''
			},
			headers: {
			  Authorization: 'Bearer ' + props.token
			}
		  })
		  .then((response) => {
			const res =response.data
			setemail(response.data.email)

		  }).catch((error) => {
			if (error.response) {
			  console.log(error.response)
			  console.log(error.response.status)
			  console.log(error.response.headers)
			  }
		  })
	}

	function newPhone(){
		console.log('newPhone');
		console.log(users.person_id);
		console.log(fName);
		console.log(lName);
		console.log(newphone);
		if(!users.person_id || !fName || !lName || !newphone){
			document.getElementById('phoneerror').innerHTML = 'Something is Wrong';
			document.getElementById('phoneerror').style.display = 'block';
			return
		}
		var newnewphone = newphone.replace(/\(|\)|\-/g, "")
		if(!newnewphone || newnewphone.length !== 10 || !newphonetype){
			document.getElementById('phoneerror').innerHTML = 'Invalid Phone Number/Type';
			document.getElementById('phoneerror').style.display = 'block';
			return;
		}
		document.getElementById('phoneerror').style.display = 'none';
		axios({
			method: "POST",
			url:"/newphone",
			data:{
				id:users.person_id,
				phonetype: newphonetype,
				phonenumber:newnewphone
			},
			headers: {
			  Authorization: 'Bearer ' + props.token
			}
		  })
		  .then((response) => {
			const res =response.data
			console.log(response.data);
			if(response.data.status == 'success'){
				document.getElementsByName('newnumber')[0].value = '';
				document.getElementsByName('newnumber')[0].onchange();
			}

		  }).catch((error) => {
			if (error.response) {
			  console.log(error.response)
			  console.log(error.response.status)
			  console.log(error.response.headers)
			  }
		  })
	}

	function removePhone(item){
		axios({
			method: "POST",
			url:"/removephone",
			data:{
				id:item
			},
			headers: {
			  Authorization: 'Bearer ' + props.token
			}
		  })
		  .then((response) => {
			const res =response.data
			console.log(response.data);
			if(response.data.status == 'success'){
				console.log('get rid fo '+item)
				document.getElementById(item).remove();
			}else{
				document.getElementById('phoneerror').innerHTML = 'Unable to remove phone number::'+response.data.message;
				document.getElementById('phoneerror').style.display = 'block';
			}

		  }).catch((error) => {
			if (error.response) {
			  console.log(error.response)
			  console.log(error.response.status)
			  console.log(error.response.headers)
			  }
		  })
	}

	const newholder = {

	}

	var phoness = props.userDet.phones;
	//console.log('phoness');
	//console.log(phoness);
	const onephone = phoness.map((phone,index) =>

	<div className={(index % 2) ? 'greyBg'+ " phonehold" : 'noBg'+ " phonehold"}  id={"phone_"+phone.phone_id} >
		<div>{phone.phone_type}</div>
		<div>{formatPhoneNumber.call(this, phone.phone_number)}</div>
		<div onClick={e => removePhone(e.target.parentElement.id)}>X</div>
		</div>)
	
	
	return (<div id="peopledets">
		
		<div id="peoinfo">
			<div id="peonames">
			<div className="header">Person Details</div>
	<div className="holder">
		<div className="formlabel">First Name:</div>
		<div><input onChange={handleChange} name="fName" type="text" value={fName} /></div>
		</div>
	<div className="holder">
		<div className="formlabel">Last Name:</div>
		<div><input onChange={handleChange} name="lName" type="text" value={lName} /></div>
		</div>
	<div className="holder" style={newholder}>
		<div className="formlabel">Email:</div>
		<div><input name="email" type="text" onChange={handleChange} value={email} /></div>
		</div>
		
	<div id="peopleerror">Please Fill Out All Needed Information</div>
	<div><button onClick={updatePerson}>UPDATE PERSON</button></div>
	</div>
		<div id="peophones">
		<div className="header">Person Phones<span style={{marginLeft:'5px',fontSize:'.8em'}}></span>
		<div id="newphonebox">
			<select id="phonetype" name="newphonetype" onChange={handleChange}>
			<option value="">Choose ...</option>
			<option value="Mobile">Mobile</option>
			<option value="Home">Home</option>
			<option value="Other">Other</option>
			</select>
			<input name="newnumber" style={{width:"135px"}} onChange={handleChange} maxLength="15" type="tel"></input><FontAwesomeIcon onClick={newPhone} icon={faPlusCircle}/>
		</div>
		<div id="phoneerror"></div>
		</div>
		
		{onephone}
		
		</div>
		
	</div>
	</div>)

}

export default People;