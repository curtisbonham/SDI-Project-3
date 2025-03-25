import "./App.css";
import {Link, Route, Routes} from 'react-router-dom'
import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Home from './Home/Home.jsx'
import Members from './Members/Members.jsx'
import Courses from './Courses/Courses.jsx'
import Crews from './Crews/Crews.jsx'
import Positions from './Positions/Positions.jsx'
import DetailsContext from './DetailsContext.jsx'


function App() {
    const [members, setMembers] = useState([]); // Store data, not JSX

    const value = {members, setMembers}

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
        <DetailsContext.Provider value={value}>
            <Navbar />
            {/* <div>
                {members.map((mem) => (
                    <div key={mem.id}>
                        <p>{mem.name}</p>
                    </div>
                ))}
            </div> */}

			<Routes>
            	<Route path='/' element={<Home value={value}/>}/>
                <Route path='/members' element={<Members value={value}/>} />
                <Route path='/courses' element={<Courses/>}/>
                <Route path='/crews' element={<Crews/>}/>
                <Route path='/positions' element={<Positions/>}/>
          	</Routes>
        </DetailsContext.Provider>
        </>
    );
}

export default App;
