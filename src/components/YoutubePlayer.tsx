import ReactPlayer from "react-player";

interface IParentProps {
  videoKey: string;
}

const YoutubePlayer = ({ videoKey }: IParentProps) => {
  return <ReactPlayer className="video-player" url={`https://www.youtube.com/watch?v=${videoKey}`} controls={true} playing={true} data-testid="youtube-player" />;
};

export default YoutubePlayer;
