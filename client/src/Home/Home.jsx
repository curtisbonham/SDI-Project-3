import { IconButton, Button, TextField, Badge} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import './Home.css'

function Home({value}) {

    return(
        <div className='home-container'>
          <img src ='/Logo-MVOE.png' alt="our illustrious logo"/>
        </div>
    );
}

export default Home;