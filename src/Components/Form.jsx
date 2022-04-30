import axios from 'axios';
import moment from 'moment';
import { generateRandomKeys } from 'paillier-bigint';
import JSONbig from 'json-bigint'
import React, { useState } from 'react'

function Form({ addCheckPoint }) {
	const [open, setOpen] = useState(true);
	const [x, setX] = useState("");
	const [y, setY] = useState("");

	async function handle_submit(e) {
		e.preventDefault();

		if (!isNaN(x) && !isNaN(y)) {

			// take input log 1
			addCheckPoint({
				tag: "Client",
				title: "Input",
				log: "Input location",
				time: moment(new Date()).format("LLL").toString(),
			});
			// setOpen(false);

			const { publicKey, privateKey } = await generateRandomKeys(1024);

			const locx = publicKey.encrypt(parseInt(x));
			const locy = publicKey.encrypt(parseInt(y));

			// encryption log 2
			addCheckPoint({
				tag: "Client",
				title: "Encryption",
				log: "Data encrypted",
				time: moment(new Date()).format("LLL").toString(),
			});


			const reqdata = JSONbig.stringify({
				x: locx,
				y: locy,
				n: publicKey.n,
				g: publicKey.g,
			});

			// server log 3
			const res = await axios.post("http://localhost:5000/location", { reqdata })
				.catch(err => {
					console.log(err);
					// error handling clear timeline and reset form
				})

			console.log(res);
			// const offset = JSONbig.parse(res.data.offsetStr);
			// log 4
			addCheckPoint({
				tag: "Server",
				title: "Calculation",
				log: "Server calculation completed",
				time: moment(new Date()).format("LLL").toString(),
			});




		}
		else {
			alert("Enter Valid location");
		}
	}

	return (
		<div className={'w-full h-full grid place-content-center ' + (open ? "" : "hide")}>
			<form
				className='p-8 flex flex-col items-center gap-y-5 shadow-md bg-white rounded'
				onSubmit={handle_submit}
			>
				<h1 className='text-blue-500'>
					Find Your Location
				</h1>
				<input
					className='border rounded border-gray-300'
					type={'number'}
					placeholder="Location X"
					id="locx"
					min={-400}
					max={400}
					value={x}
					onChange={(e) => { setX(e.target.value) }}
				/>
				<input
					className='border rounded border-gray-300'
					type={'number'}
					placeholder="Location X"
					id="locx"
					min={-400}
					max={400}
					value={y}
					onChange={(e) => { setY(e.target.value) }}
				/>
				<button
					className='rounded px-6 py-2 bg-blue-400 text-white'
					type='submit'
				>
					Find Geo Fence
				</button>
			</form>
		</div>
	)
}

export default Form