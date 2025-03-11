import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import ImageUploader from "./components/ImageUploader";
import "./styles.css";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/imageUploader" element={<ImageUploader />}></Route>
	</Routes>
);

export default App;
