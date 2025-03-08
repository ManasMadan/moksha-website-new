import Image from "next/image";

export default function AfterMovie() {
  return (
    <div className="w-full">
      <h1 className="text-5xl text-[#FFD58B] text-center mb-20">after movie</h1>
      <div className="w-[90%] lg:w-[85%] max-w-6xl mx-auto relative">
        <Image
          src="/assets/home/afterMovieFrame.png"
          alt="logo"
          width={500}
          height={0}
          style={{ width: "100%", height: "auto" }}
          priority
        />
       <iframe src="https://drive.google.com/file/d/1K4XBnN-9EYBc0EQZP8bCV5pzmRpXz0sW/preview" width="640" height="480" allow="autoplay" className="h-full w-full absolute top-0 left-0 p-1"></iframe>
      </div>
    </div>
  );
}
