import "./App.css";
import {useState, useEffect} from 'react'


function App() {
	const [member, setMember] = useState([])
	useEffect(()=>{
		fetch('http://localhost:3001/all')
			.then(res => res.json())
			.then(data => {
// This may be causing an infinate render, fixed.
				let memberData = data.map(mem => {
					return(
						<div key={mem.id}>
							<h2>{mem.crew_name}</h2>
						</div>
					)
				})
				setMember(memberData)
			}, [])
	})
	return(
	<>
	<div>{member}</div>
	</>
	)
}

export default App;
