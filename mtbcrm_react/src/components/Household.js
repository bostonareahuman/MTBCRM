import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

function Household(props){
	//console.log('whichhousehold')
	//console.log(props.whichhousehold)
	//console.log('endwhichhousehold')
	const [hsstate, hsstatesetState] = useState({})

	/*
	{
	"City": "1",
    "Landline": "1",
    "Loc_Addr": "1",
    "State": "1",
    "Zip": "1",
    "household_id": "1"
	}
	*/

	console.log('hsstate current')
	console.log(hsstate)
	const handleChange = e => {
		console.log('onchange forl')
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

	console.log('Household')
	console.log(hsstate);
	console.log('End Household state')

	return (<div id="householddeets"
	><div className="header">Household<span style={{marginLeft:'5px',fontSize:'.9em'}}><FontAwesomeIcon icon={faPencilAlt}/></span></div>
	<div className="holder">ID:<input name="household_id" type="text" readOnly value={hsstate.household_id || ''} /></div>
	<div className="holder">Address:<input name="Loc_Addr" type="text" onChange={handleChange} value={hsstate.Loc_Addr || ''} /></div>
	<div className="holder">Town:<input name="City" type="text" onChange={handleChange} value={hsstate.City || ''} /></div>
	<div className="holder">State:<input name="State" type="text" onChange={handleChange} value={hsstate.State || ''} /></div>
	<div className="holder">Zip:<input name="Zip" type="text" onChange={handleChange} value={hsstate.Zip || ''} /></div>
	<div className="holder">Phone:<input name="Landline" type="text" onChange={handleChange} value={formatPhoneNumber.call(this,hsstate.Landline || '')} /></div>
	</div>)
}

export default Household