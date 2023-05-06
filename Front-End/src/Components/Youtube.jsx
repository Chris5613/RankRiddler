import React from 'react';

const YouTube = ({ videoId }) => {
  return (
    <div className="youtube-wrapper">
			<iframe
				className="video"
				width="1000"
				height="550"
        src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; 
				encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
			></iframe>
    </div>
  );
};

const extractVideoId = (url) => {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
};

const VideoPlayer = ({ url }) => {
  const videoId = extractVideoId(url);
  return videoId ? <YouTube videoId={videoId} /> : null;
};

export default VideoPlayer;

