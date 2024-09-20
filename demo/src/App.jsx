import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Editor from "./components/Editor";
import ImageUploader from "./components/ImageUploader";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/editor" element={<Editor />} />
		<Route path="/imageUploader" element={<ImageUploader />}></Route>
	</Routes>
);

export default App;
