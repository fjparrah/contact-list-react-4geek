import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ContactForm } from "./views/contactform";
import { ContactList } from "./views/contactlist";
import { UpdateForm } from "./views/updatecontact";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<Routes>
					<Route path="/" element={<ContactList />} />
					<Route path="/contactform" element={<ContactForm />} />
					<Route path="/updateform/:id" element={<UpdateForm />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
