"use client";

import Image from "next/image";
import React from "react";
import HTMLFlipBook from "react-pageflip";
import pic1 from "../../../public/images/3.jpg";

export default function OurStory() {
  return (
    <div className="bg-secondary px-20 py-10">
      <div className="flex justify-center">
        <div className="bg-primary text-white px-8 py-2 my-5 text-center rounded-full ">
          <h1 className="text-xl font-bold">Notre univers</h1>
          <p>Notre histoire</p>
        </div>
      </div>

      {/* ================ */}
      <HTMLFlipBook
        width={550}
        height={403}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        mobileScrollSupport={true}
      >
        <div className="demoPage bg-secondary !flex !justify-center !items-center">
          <div className="bg-white p-4 h-96 w-auto rounded-md shadow-lg">
            <div className="h-80 w-80  rounded-md overflow-hidden" >
              <Image src={pic1} alt="" className="h-full w-auto" />
            </div>
          </div>
        </div>
        <div className="demoPage font-light !flex flex-col justify-center items-center text-primary text-justify text-sm bg-secondary space-y-4 !px-5">
          <h2 className="font-bold text-lg">
            2010 - ECJ diffusion : Un showroom dédié aux spas et aux saunas
          </h2>
          <p >
            L’aventure de Lounge & Spa trouve ses racines en 2010 avec
            l’ouverture d’un showroom entièrement consacré aux spas et saunas
            haut de gamme. Bien plus qu’une simple enseigne de vente, ce lieu
            était conçu comme une véritable oasis, soigneusement agencée et
            dédiée à l’univers du bien-être, offrant aux particuliers la
            possibilité d’intégrer chez eux des équipements d’exception.
          </p>
          <p>
            Rapidement, notre expertise s’affirme et nous devenons revendeurs
            exclusifs dans le loiret de marques prestigieuses, telles que Tylö
            pour les saunas et Nordique France pour les spas professionnels.
            Cette collaboration nous permet d’acquérir une maîtrise technique
            pointue, affinant notre savoir-faire et faisant de nous des
            références incontournables dans le domaine du bien-être et de
            l’hydrothérapie.
          </p>
        </div>
        <div className="demoPage">Page 3</div>
        <div className="demoPage">Page 4</div>
      </HTMLFlipBook>
    </div>
  );
}
