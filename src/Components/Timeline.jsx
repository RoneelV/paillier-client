import React from 'react'

// const timelineData = [
// 	{
// 		tag: 'client',
// 		title: 'Client Log',
// 		log: 'Started working on the app-ideas repository',
// 		time: 'February 25 2019',
// 	},
// 	{
// 		tag: 'client',
// 		title: 'Client Log',
// 		log: 'Started working on the app-ideas repository',
// 		time: 'February 25 2019',
// 	},
// 	{
// 		tag: 'server',
// 		title: 'Server Log',
// 		log: 'Started working on the app-ideas repository',
// 		time: 'February 25 2019',
// 	},
// 	{
// 		tag: 'server',
// 		title: 'Server Log',
// 		log: 'Started working on the app-ideas repository',
// 		time: 'February 25 2019',
// 	},
// ]

const TimelineItem = ({ data }) => (
	<>
		<div className={"timeline-item " + data.tag}>
			<div className="timeline-item-content">
				<time>{data.time}</time>
				<h1>{data.title}</h1>
				<p>{data.log}</p>
				<span className="circle" />
			</div>
		</div>
	</>
);

const Timeline = ({ timelineData }) =>
	timelineData.length > 0 && (
		<div className="timeline-container">
			{timelineData.map((data, idx) => (
				<TimelineItem data={data} key={idx} />
			))}
		</div>
	);

export default Timeline