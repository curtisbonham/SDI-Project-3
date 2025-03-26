// // import {Link, Route, Routes} from 'react-router-dom'
// // import { IconButton, Button, TextField, Badge} from "@mui/material";
// // import HomeIcon from '@mui/icons-material/Home';
// // import './Navbar.css'

// // function Navbar() {

// //     return(
// //         <div className='navBar-container'>
// //             <IconButton href='/' >
// //             <HomeIcon  />
// //             </IconButton>
// //             <div className="navBar-btn-container">
// //             <Button className="navBar-btn" variant="contained" href='/members'>Members</Button>
// //             <Button className="navBar-btn" variant="contained" href='/courses'>Courses</Button>
// //             <Button className="navBar-btn" variant="contained" href='/crews'>Crews</Button>
// //             <Button className="navBar-btn" variant="contained" href='/positions'>Positions</Button>
// //             </div>

// //         </div>
// //     );
// // }

// // export default Navbar;

// import { useLocation } from 'react-router-dom';
// import { IconButton, Button } from "@mui/material";
// import HomeIcon from '@mui/icons-material/Home';
// import './Navbar.css';

// function Navbar() {
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className='navBar-container'>
//       <IconButton href='/' aria-label="Home">
//         <HomeIcon />
//       </IconButton>

//       <div className="navBar-btn-container">
//         <Button className={`navBar-btn ${isActive('/members') ? 'active' : ''}`} variant="contained" href='/members'>Members</Button>

//         <Button className={`navBar-btn ${isActive('/courses') ? 'active' : ''}`} variant="contained" href='/courses'>Courses</Button>

//         <Button className={`navBar-btn ${isActive('/crews') ? 'active' : ''}`} variant="contained" href='/crews'>Crews</Button>

//         <Button className={`navBar-btn ${isActive('/positions') ? 'active' : ''}`} variant="contained" href='/positions'>Positions</Button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import { useLocation } from 'react-router-dom'; // ← add this
import { IconButton, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  // Helper to check if current route matches
  const isActive = (path) => location.pathname === path;

  return (
    <div className='navBar-container'>
      <IconButton href='/'>
        <HomeIcon />
      </IconButton>

      <div className="navBar-btn-container">
        <Button className={`navBar-btn ${isActive('/members') ? 'active' : ''}`} href='/members'>Members</Button>
        <Button className={`navBar-btn ${isActive('/courses') ? 'active' : ''}`} href='/courses'>Courses</Button>
        <Button className={`navBar-btn ${isActive('/crews') ? 'active' : ''}`} href='/crews'>Crews</Button>
        <Button className={`navBar-btn ${isActive('/positions') ? 'active' : ''}`} href='/positions'>Positions</Button>
      </div>
    </div>
  );
}

export default Navbar;
