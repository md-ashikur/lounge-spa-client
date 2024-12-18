import Navbar from "@/components/Navbars/Navbar";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import home from "../../public/images/home.png";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="bg-secondary">
      <Navbar />
      <div className="h-screen ">
        <div className="flex flex-col items-center justify-center space-y-8 py-10">
        <h1 className="text-center text-primary text-xl">Un lieu de vie pour toutes vos envies !</h1>
        <Image src={home} alt="home"></Image>
        <button className="bg-primary px-4 py-2 rounded-full flex gap-3 items-center text-white hover:bg-primary-500 hover:scale-105 transition duration-300">
          Découvrez nos espace uniques <FaArrowRight />
        </button>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
