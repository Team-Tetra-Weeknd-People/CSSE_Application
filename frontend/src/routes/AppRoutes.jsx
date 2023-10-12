import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    Navbar
} from "../components";

import {
    Home
} from "../pages";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}