import React from "react";
import Image from "next/image";
import pic1 from "../../../public/images/3.jpg";
import pic2 from "../../../public/images/10.jpg";

export default function UniverseStep2({ onBack, onNext }) {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="bg-secondary px-5  md:px-20">
      <div className="flex justify-center">
        <div className="bg-primary text-white px-12 py-1 my-5 text-center rounded-full">
          <h1 className="text-xl font-bold">Notre univers</h1>
          <p className="font-light">Notre philosophie</p>
        </div>
      </div>

      {/* cards----------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  my-5">
        {/* card 1-------------- */}
        <div className="relative text-center group overflow-hidden shadow-lg">
          <Image
            src={pic1}
            alt="Philosophy 1"
            className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-[#DBCCC1] bg-opacity-50 group-hover:bg-opacity-0 transition duration-500 flex flex-col justify-between ">
            <div className="bg-secondary rounded-full px-2 py-1 flex justify-center items-center m-4">
            <h3 className="text-primary text-sm font-bold">Excellence & Exigence</h3>
                </div> 
                <div className="bg-primary/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-500  p-3 ">
            <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition duration-500">
            &quot;Parce que l’excellence n’est pas une finalité, mais une quête permanente&quot;
            </p>
          </div>
          </div>
        </div>
{/* card 2------------- */}
        <div className="relative text-center group overflow-hidden  shadow-lg">
          <Image
            src={pic2}
            alt="Philosophy 2"
            className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-[#B6A398] bg-opacity-50 group-hover:bg-opacity-0 transition duration-500 flex flex-col justify-between ">
            <div className="bg-secondary rounded-full px-2 py-1 flex justify-center items-center m-4">
            <h3 className="text-primary text-sm font-bold">Exclusivité & Personnalisation</h3>
                </div> 

                <div className="bg-primary/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-500  px-1 py-2">
            <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition duration-500">
            &quot;Chaque moment est unique, chaque attention est pensée pour vous, conçu pour offrir une expérience inégalable&quot;
            </p>
          </div>
          </div>
        </div>
{/* card 3-------------- */}
        <div className="relative text-center group overflow-hidden  shadow-lg">
          <Image
            src={pic1}
            alt="Philosophy 3"
            className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-[#92796E] bg-opacity-50 group-hover:bg-opacity-0 transition duration-500 flex flex-col justify-between ">
            <div className="bg-secondary rounded-full px-2 py-1 flex justify-center items-center m-4">
            <h3 className="text-primary text-sm font-bold">Art de Recevoir & Expérience Sensorielle</h3>
                </div> 

                <div className="bg-primary/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-500  p-3 ">
            <p className="text-white text-sm">
            &quot;Chaque visite doit être une révélation des sens&quot;
            </p>
          </div>
          </div>
        </div>
{/* card 4---------------- */}
        <div className="relative text-center group overflow-hidden  shadow-lg">
          <Image
            src={pic2}
            alt="Philosophy 4"
            className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-[#6D4F45] bg-opacity-50 group-hover:bg-opacity-0 transition duration-500 flex flex-col justify-between ">
            <div className="bg-secondary rounded-full px-2 py-1 flex justify-center items-center m-4">
            <h3 className="text-primary text-sm font-bold">Innovation & Vision</h3>
                </div>

            <div className="bg-primary/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-500  p-3 ">
            <p className="text-white text-sm  ">
            &quot;Se réinventer sans cesse pour surprendre et émerveiller&quot;
            </p>
            </div>

         
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="px-4 py-2 bg-primary text-white rounded-full"
          onClick={onBack}
        >
          Précédent
        </button>
        
      </div>
    </div>
  );
}