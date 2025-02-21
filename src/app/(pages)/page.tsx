import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-black w-full items-center justify-center">
      <Image src="/assets/logo.png" width={1185} alt="Logo" height={311} />
    </div>
  );
}
