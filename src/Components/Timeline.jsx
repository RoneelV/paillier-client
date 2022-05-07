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

export default Timeline;
