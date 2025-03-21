import {Link, Route, Routes} from 'react-router-dom'
import { IconButton, Button, TextField, Badge} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import './Navbar.css'

function Navbar() {

    return(
        <div className='navBar-container'>
            <IconButton href='/' >
            <HomeIcon  />
            </IconButton>
            <div className="navBar-btn-container">
            <Button className="navBar-btn" variant="contained" href='/members'>Members</Button>
            <Button className="navBar-btn" variant="contained" href='/courses'>Courses</Button>
            <Button className="navBar-btn" variant="contained" href='/crews'>Crews</Button>
            <Button className="navBar-btn" variant="contained" href='/positions'>Positions</Button>
            </div>

        </div>
    );
}

export default Navbar;