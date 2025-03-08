import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full">
      <div className="w-[74%] max-w-6xl mx-auto">
        <Image
          src="/assets/home/moksha.png"
          alt="logo"
          width={500}
          height={0}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
      <h1 className="text-5xl text-[#FFD58B] text-center mt-8">
        Myth and Mysteries
      </h1>
    </div>
  );
}
