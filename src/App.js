import { useState } from 'react';
import './App.css';
import Form from './Components/Form';
import Timeline from './Components/Timeline';

function App() {
	const [data, setData] = useState([]);

	function addCheckPoint(checkpoint) {
		setData([...data, checkpoint]);
	}

	return (
		<div className='w-full h-screen min-w-min min-h-min'>
			<Form addCheckPoint={addCheckPoint} />
			<Timeline timelineData={data} /> :
		</div>
	);
}

export default App;
