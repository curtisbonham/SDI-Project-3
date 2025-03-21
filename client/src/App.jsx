import "./App.css";
import {Link, Route, Routes} from 'react-router-dom'
import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Home from './Home.jsx'
import Members from './Members.jsx'
import Courses from './Courses.jsx'
import Crews from './Crews.jsx'
import Positions from './Positions.jsx'

function App() {
    const [members, setMembers] = useState([]); // Store data, not JSX

    useEffect(() => {
        fetch("http://localhost:3001/all")
            .then((res) => res.json())
            .then((data) => {
                setMembers(data); // Store raw data instead of JSX
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []); // Runs only once when the component mounts

    return (
        <>
            <Navbar />
            {/* <div>
                {members.map((mem) => (
                    <div key={mem.id}>
                        <p>{mem.name}</p>
                    </div>
                ))}
            </div> */}

						<Routes>
            	<Route path='/' element={<Home/>}/>
							<Route path='/members' element={<Members/>}/>
							<Route path='/courses' element={<Courses/>}/>
							<Route path='/crews' element={<Crews/>}/>
							<Route path='/positions' element={<Positions/>}/>
          	</Routes>

        </>
    );
}

export default App;
