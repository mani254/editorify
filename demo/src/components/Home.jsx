import React from "react";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Home() {
	return (
		<div>
			<h1>Components Demo</h1>

			<NavLink to="/editor">Editor</NavLink>
			<br />
			<NavLink to="/imageUploader">Image Uploader</NavLink>
			<br />
		</div>
	);
}

export default Home;
