import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from "./Modal";

export const Navbar = () => {
	const {actions}=useContext(Context)

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div className="ml-auto">
				<button type="button" data-bs-toggle="modal" data-bs-target={"#editModal--1"} className="btn btn-primary">
					Agregar
				</button>
			</div>
			<Modal index={-1}></Modal>
		</nav>
	);
};
