import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {Context} from "../store/appContext"

export const Modal = props => {
	const [contactName, setcontactName]=useState("")
	const [addresse, setaddresse]=useState("")
	const [phone, setphone]=useState("")
	const [email, setemail]=useState("")
	const {store, actions} =useContext(Context)
	useEffect(() => {
		if (props.index == -1) {
			// Crear nuevo contacto
		} else if (props.index >= 0) {
			// Editar contacto
			let updateContact=store.contacts.find(contact=>contact.id==props.index)
			setaddresse(updateContact.address)
			setphone(updateContact.phone)
			setemail(updateContact.email)
			setcontactName(updateContact.name)
		} else {
			// Indice invalido
		}
	}, [])

	function guardar(){
		let newContact={
			name:contactName,
			email:email,
			phone:phone,
			address:addresse
		}
		if (props.index == -1) {
			// Crear nuevo contacto
			actions.addContact(newContact)
		} else if (props.index >= 0) {
			// Editar contacto
			actions.updateContact(newContact,props.index)
		} 
	}

	return (
		<div className="modal fade" tabIndex="-1" role="dialog" id={"editModal-" + props.index} aria-labelledby={"modalLabel-" + props.index} aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Contacto {props.index}</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						)}
					</div>
					<div className="modal-body">
						<div className="mb-3">
							<label htmlFor="nameInput" className="form-label">Name</label>
							<input type="text" className="form-control" id="nameInput" placeholder="Fulano de Tal" 
							value={contactName}
							onChange={e=>setcontactName(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="addresseInput" className="form-label">Address</label>
							<input type="text" className="form-control" id="addresseInput" placeholder="Caracas, Venezuela" 
							value={addresse}
							onChange={(e)=>setaddresse(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="phoneInput" className="form-label">Phone Number</label>
							<input type="text" className="form-control" id="phoneInput" placeholder="000000000" 
							value={phone}
							onChange={(e)=>setphone(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="emailInput" className="form-label">Email address</label>
							<input type="email" className="form-control" id="emailInput" placeholder="fulano@4geeks.com" 
							value={email}
							onChange={(e)=>setemail(e.target.value)}
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button data-bs-dismiss="modal" onClick={guardar} type="button" className="btn btn-primary">
							Guardar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};
