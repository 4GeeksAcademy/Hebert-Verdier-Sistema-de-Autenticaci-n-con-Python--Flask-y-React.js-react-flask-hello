import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Menu } from "../component/menuPrincipal.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<Menu/>
		</div>
	);
};