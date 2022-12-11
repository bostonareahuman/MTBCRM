import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'


function People(props){
	console.log('Start People')
	console.log(props.userDet)
	console.log(props.userDet.FirstName)
	const users = props.userDet
	console.log('Users vairable')
	console.log(users.FirstName) //returns true
	console.log(props.userDet.hasOwnProperty('FirstName'))
	const [fName,setfNames] = useState(users.FirstName || 'n')
	const [lName,setlNames] = useState(users.LastName || 'n')
	console.log('fName')
	console.log(fName)
	console.log(props.userDet.FirstName)

	const handleChange = e => {
		console.log('handle change running')
		if(e.target.name === 'fName'){
			setfNames(e.target.value)
		}
		else{
			setlNames(e.target.value)
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

	

	var phoness = props.userDet.phones;
	//console.log('phoness');
	//console.log(phoness);
	const onephone = phoness.map((phone,index) =>

	<div className={(index % 2) ? 'greyBg'+ " phonehold" : 'noBg'+ " phonehold"}  id={"phone_"+phone.phone_id} >
		<div>{phone.phone_type}</div>
		<div>{formatPhoneNumber.call(this, phone.phone_number)}</div>
		<div><FontAwesomeIcon icon={faXmark}/></div>
		</div>)
	
	
	return (<div id="peopledets">
		
		<div id="peoinfo">
			<div id="peonames">
			<div className="header">Person Details</div>
	<div className="holder"><div className="formlabel">First Name:</div><div><input onChange={handleChange} name="fName" type="text" value={fName} /></div></div>
	<div className="holder"><div className="formlabel">Last Name:</div><div><input onChange={handleChange} name="lName" type="text" value={lName} /></div></div>
	</div>
		<div id="peophones">
		<div className="header">Person Phones<span style={{marginLeft:'5px',fontSize:'.8em'}}><FontAwesomeIcon icon={faPlusCircle}/></span></div>
		
		{onephone}
		</div>
	</div>
	</div>)

}

export default People;