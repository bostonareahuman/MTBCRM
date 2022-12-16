import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";


function Household(props){
	//console.log('whichhousehold')
	//console.log(props.whichhousehold)
	//console.log('endwhichhousehold')
	const [hsstate, hsstatesetState] = useState('')
	console.log('props Hpusehold')
	console.log(props.whichhousehold)
	useEffect(() => {
		hsstatesetState(props.whichhousehold);
	 }, [props.whichhousehold]);

	//console.log('hsstate current')
	//console.log(hsstate)
	const handleChange = e => {
		//console.log('onchange forl')
		hsstatesetState({
		...hsstate,
		[e.target.name]: e.target.value,
		})
	  }

	function formatPhoneNumber(phoneNumberString) {
		var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		if (match) {
		  return '(' + match[1] + ') ' + match[2] + '-' + match[3];
		}
		return null;
	}
	function updateHousehold(){
		console.log('update household')

	}
	function addToHousehold(){
		console.log('add to household');

	}
	/*console.log('Household')
	console.log(hsstate);
	console.log('End Household state')
*/
	return (<div id="householddeets"
	><div className="header">Household<span style={{marginLeft:'5px',fontSize:'.9em',}}><FontAwesomeIcon icon={faPencilAlt}/></span></div>
	<div className="holder">ID:<input style={{border:'0px'}}name="household_id" type="text" readOnly value={hsstate.household_id || ''} /></div>
	<div className="holder">Address:<input name="Loc_Addr" type="text" onChange={handleChange} value={hsstate.Loc_Addr || ''} /></div>
	<div className="holder">Town:<input name="City" type="text" onChange={handleChange} value={hsstate.City || ''} /></div>
	<div className="holder">State:<input name="State" type="text" onChange={handleChange} value={hsstate.State || ''} /></div>
	<div className="holder">Zip:<input name="Zip" type="text" onChange={handleChange} value={hsstate.Zip || ''} /></div>
	<div className="holder">Home Ph:<input name="Landline" type="text" onChange={handleChange} value={formatPhoneNumber.call(this,hsstate.Landline) || ''} /></div>

	<button onClick={updateHousehold}>UPDATE</button>
	<button onClick={addToHousehold}>Link Person to Household</button>
	</div>)
}

export default Household