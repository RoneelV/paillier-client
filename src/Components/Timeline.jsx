import React from 'react'

const timelineData = [
	{
		text: 'Started working on the app-ideas repository',
		date: 'February 25 2019',
		category: {
			tag: 'app-ideas',
			color: '#FFDB14'
		},
		link: {
			url: 'https://github.com/florinpop17/app-ideas',
			text: 'Check it out on GitHub'
		}
	},
	{
		text: 'Started the Weekly Coding Challenge program',
		date: 'March 04 2019',
		category: {
			tag: 'blog',
			color: '#e17b77'
		},
		link: {
			url: 'https://florin-pop/blog/2019/03/weekly-coding-challenge/',
			text: 'Check it out here'
		}
	},
	{
		text: 'Got 1.000 followers on Twitter',
		date: 'March 07 2019',
		category: {
			tag: 'twitter',
			color: '#1DA1F2'
		},
		link: {
			url: 'https://twitter.com/florinpop1705',
			text: 'See profile'
		}
	},
	{
		text:
			'I published my first article in the FreeCodeCamp Medium Publication',
		date: 'March 18 2019',
		category: {
			tag: 'medium',
			color: '#018f69'
		},
		link: {
			url:
				'https://medium.freecodecamp.org/how-to-build-a-double-slider-sign-in-and-sign-up-form-6a5d03612a34',
			text: 'Check it out here'
		}
	},
	{
		text: 'Over 12.000 views in a single day on my Medium posts',
		date: 'April 05 2019',
		category: {
			tag: 'medium',
			color: '#018f69'
		},
		link: {
			url: 'https://medium.com/@popflorin1705',
			text: 'See profile'
		}
	}
]

const TimelineItem = ({ data }) => (
	<div className="timeline-item">
		<div className="timeline-item-content">
			<time>{data.date}</time>
			<h1>{data.category.tag}</h1>
			<p>{data.text}</p>
			<span className="circle" />
		</div>
	</div>
);

const Timeline = () =>
	timelineData.length > 0 && (
		<div className="timeline-container">
			{timelineData.map((data, idx) => (
				<TimelineItem data={data} key={idx} />
			))}
		</div>
	);

export default Timeline