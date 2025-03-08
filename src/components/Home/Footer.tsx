import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <section
      className="min-h-screen w-full text-[#FFDC9E] border-b-[15px] border-[#FFDC9E] flex flex-col z-50 relative bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/assets/home/footer.png')" }}
    >
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <header className="flex justify-end mb-10 pt-5">
          <Image
            src="/assets/home/moksha.png"
            alt="Moksha '25"
            width={300}
            height={100}
            className="object-contain"
            priority
          />
        </header>

        <div className="flex-1 flex flex-col md:flex-row justify-between items-end">
          <nav className="mb-10 md:mb-0">
            <ul className="flex flex-col gap-6 font-[655]">
              <li>
                <Link
                  href="/register"
                  className="text-2xl text-[#FFDC9E] hover:text-white transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsors"
                  className="text-2xl text-[#FFDC9E] hover:text-white transition-colors"
                >
                  Sponsors
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-2xl text-[#FFDC9E] hover:text-white transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-2xl text-[#FFDC9E] hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
          <div className="md:text-right">
            <h2 className="text-4xl  text-[#FFDC9E] mb-5 font-[655]">
              Contact Us
            </h2>
            <div className="flex gap-4 mb-8 md:justify-end items-center">
              <Link href="mailto:contact@moksha25.com">
                <Image
                  src="/assets/home/gmail.svg"
                  alt="Email"
                  width={43}
                  height={43}
                  className="object-contain"
                />
              </Link>
              <Link
                href="https://instagram.com/moksha25"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/home/instagram.svg"
                  alt="Instagram"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <Link
                href="https://facebook.com/moksha25"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/home/facebook.svg"
                  alt="Facebook"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <Link
                href="https://twitter.com/moksha25"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/home/twitter.svg"
                  alt="Twitter/X"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </Link>
            </div>
            <footer className="w-full py-4">
              <div className="container mx-auto px-4">
                <div className="relative">
                  <div className="h-0.5 bg-[#FFDC9E] w-full"></div>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#FFDC9E]">
                    ♦
                  </span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#FFDC9E]">
                    ♦
                  </span>
                </div>
                <div className="mt-4 text-right text-xs text-[#FFDC9E]">
                  <p>Netaji Subhas University Of Technology</p>
                  <p>
                    Azad Hind Fauj Marg, Dwarka Sector-3, Dwarka, Delhi, 110078
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
