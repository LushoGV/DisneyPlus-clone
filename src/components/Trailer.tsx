import React from "react";
import ReactPlayer from "react-player/youtube";

interface Props {
  close: () => void;
  videoUrl: string;
}

const Trailer = ({ close, videoUrl }: Props) => {
  console.log(videoUrl);
  return (
    <section className="absolute w-full h-full bg-black z-50 top-0">
      {/* <header></header> */}
      {videoUrl && (
        <ReactPlayer
          playing
          controls
          url={videoUrl}
          className={"w-full"}
          width={"100%"}
          height={"100%"}
        />
      )}
    </section>
  );
};

export default Trailer;
