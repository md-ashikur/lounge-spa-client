"use client";

import Image from "next/image";
import React from "react";
import HTMLFlipBook from "react-pageflip";
import pic1 from "../../../public/images/3.jpg";
import pic2 from "../../../public/images/10.jpg";

export default function UniverseStep1() {
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
        {/* page 1--start------------------ */}
        <div className="demoPage bg-secondary !flex !justify-center !items-center">
          <div className="bg-white p-4 h-96 w-auto rounded-md shadow-lg">
            <div className="h-80 w-80  rounded-md overflow-hidden">
              <Image src={pic1} alt="" className="h-full w-auto" />
            </div>
          </div>
        </div>
        <div className="demoPage font-light !flex flex-col justify-center items-center text-primary text-justify text-sm bg-secondary space-y-4 !px-5">
          <h2 className="font-bold text-lg">
            2010 - ECJ diffusion : Un showroom dédié aux spas et aux saunas
          </h2>
          <p>
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

        {/* page 1--end------------------ */}

        {/* page 2--start-----L’affirmation d’un savoir-faire reconnu------------- */}
        <div className="demoPage bg-secondary !flex !justify-center !items-center">
          <div className="bg-white p-4 h-96 w-auto rounded-md shadow-lg">
            <div className="h-80 w-80  rounded-md overflow-hidden">
              <Image src={pic2} alt="" className="h-full w-auto" />
            </div>
          </div>
        </div>
        <div className="demoPage font-light !flex flex-col justify-center items-center text-primary text-justify text-sm bg-secondary space-y-4 !px-5">
          <h2 className="font-bold text-lg">
            L’affirmation d’un savoir-faire reconnu
          </h2>
          <p>
            Au fil des ans, notre rôle dépasse largement celui de distributeur :
            nous accompagnons nos clients dans la conception et l’installation
            de véritables espaces de relaxation, allant de la simple
            configuration domestique aux aménagements les plus sophistiqués.
            Nordique France nous consulte même pour l’ouverture de nouveaux
            showrooms en France, sollicitant notre expertise à chaque nouvelle
            implantation.
          </p>
        </div>
        {/* page 2--end------------------ */}

        {/* page 3--start------2017 – L’émergence d’un concept unique, inspiré par vous----------- */}
        <div className="demoPage bg-secondary !flex !justify-center !items-center">
          <div className="bg-white p-4 h-96 w-auto rounded-md shadow-lg">
            <div className="h-80 w-80  rounded-md overflow-hidden">
              <Image src={pic1} alt="" className="h-full w-auto" />
            </div>
          </div>
        </div>
        <div className="demoPage font-light !flex flex-col justify-center items-center text-primary text-justify text-sm bg-secondary space-y-4 !px-5">
          <h2 className="font-bold text-lg">
            2017 – L’émergence d’un concept unique, inspiré par vous
          </h2>
          <p>
            Durant sept années, nous avons vu défiler des centaines de clients,
            tous animés par un désir commun : créer un espace de détente
            personnalisé. Pourtant, une réalité s’imposait peu à peu : si la
            qualité des équipements était essentielle, c’était avant tout
            l’expérience du bien-être en elle-même qui captivait nos visiteurs.
          </p>
          <p>
            Chaque soir, nous recevions des clients dans notre showroom afin
            qu’ils puissent tester nos spas et saunas avant de faire leur choix.
            À l’origine, ces essais étaient strictement techniques : comprendre
            les fonctionnalités, ressentir les bienfaits de l’hydrothérapie,
            comparer les modèles. Mais très vite, ces moments ont pris une toute
            autre dimension.
          </p>
        </div>
        {/* page 3--end------------------ */}

        {/* page 3--part 2-------start------2017 – L’émergence d’un concept unique, inspiré par vous----------- */}
        <div className="demoPage bg-secondary !flex !justify-center !items-center">
          <div className="bg-white p-4 h-96 w-auto rounded-md shadow-lg">
            <div className="h-80 w-80  rounded-md overflow-hidden">
              <Image src={pic1} alt="" className="h-full w-auto" />
            </div>
          </div>
        </div>
        <div className="demoPage font-light !flex flex-col justify-center items-center text-primary text-justify text-sm bg-secondary space-y-4 !px-5">
          <p>
            Dans une ambiance feutrée et détendue, nos clients découvraient nos
            équipements en conditions réelles. Installés dans un jacuzzi, ils
            appréciaient la qualité des installations, tout en échangeant leurs
            impressions. Pour accompagner cette découverte, nous avions pris
            l’habitude d’offrir une coupe de champagne et quelques
            amuse-bouches, rendant l’instant encore plus agréable et immersif.
          </p>
          <p>
            Dans cet espace conçu pour la sérénité, ils profitaient d’un instant
            suspendu, loin de toute contrainte, où le simple test de produit se
            transformait en une véritable expérience sensorielle, propice à la
            détente et à la convivialité.
          </p>
        </div>
        {/* page 3 ------part 2--end------------------ */}

        {/* page 4--start------L’évidence d’un concept à part--------- */}
        <div className="demoPage bg-secondary !flex !justify-center !items-center">
          <div className="bg-white p-4 h-96 w-auto rounded-md shadow-lg">
            <div className="h-80 w-80  rounded-md overflow-hidden">
              <Image src={pic1} alt="" className="h-full w-auto" />
            </div>
          </div>
        </div>
        <div className="demoPage font-light !flex flex-col justify-center text-primary text-justify text-sm bg-secondary space-y-4 !px-5">
          <h2 className="font-bold text-lg">L’évidence d’un concept à part</h2>
          <p>
            Chaque retour client renforçait un constat évident : ce lieu ne se
            limitait pas à une simple démonstration de spas, il offrait une
            véritable expérience, une parenthèse où l’on pouvait se détendre
            pleinement dans un cadre conçu pour le bien-être.
          </p>

          <b>
            On aimerait pouvoir revenir, juste pour profiter de cet instant.
          </b>
          <b>
            Ce serait incroyable d’avoir un lieu entièrement dédié à cette
            expérience, où l’on pourrait simplement venir se ressourcer.
          </b>

          <p>
            De ces remarques régulières est née une idée audacieuse : et si nous
            ne proposions plus seulement des équipements, mais un espace pensé
            pour vivre pleinement l’expérience du bien-être, dans un cadre
            raffiné et privatisé ?
          </p>
        </div>
        {/* page 4--end------------------ */}

        {/* page 4---part 2-----start------L’évidence d’un concept à part-------- */}
        <div className="demoPage bg-secondary !flex !justify-center !items-center">
          <div className="bg-white p-4 h-96 w-auto rounded-md shadow-lg">
            <div className="h-80 w-80  rounded-md overflow-hidden">
              <Image src={pic1} alt="" className="h-full w-auto" />
            </div>
          </div>
        </div>
        <div className="demoPage font-light !flex flex-col justify-center items-center text-primary text-justify text-sm bg-secondary space-y-4 !px-5">
          <p>
            Cette même année, Julien devient gérant et actionnaire principal.
            Sous son impulsion, nous amorçons un virage audacieux : transformer
            notre showroom en un lieu d’exception, où la relaxation ne serait
            plus liée à l’achat d’un équipement, mais à une immersion totale
            dans un cadre pensé pour le bien-être.
          </p>

          <p>
            Petit à petit, l’approche évolue : l’espace n’est plus un point de
            vente, mais un lieu où l’on vient vivre une expérience de bien-être
            hors du commun, en toute liberté.{" "}
          </p>
          <p>
            D’abord imaginé pour les couples, notre offre duo emblématique,
            reconnue et appréciée depuis sa création, a marqué les esprits par
            son caractère exclusif et intemporel. Rapidement, la demande a
            évolué et l’espace s’est adapté pour répondre aux attentes d’une
            clientèle en quête d’un lieu unique, alliant prestige et intimité,
            avant de s’ouvrir aux événements privés et professionnels, faisant
            de Lounge & Spa bien plus qu’un espace de bien-être, une destination
            d’exception.
          </p>
        </div>

        {/* page 4--part 2 --end------------------ */}

        {/* page 5-----start------Lounge & Spa : l’audace d’une nouvelle vision du bien-être--------- */}
        <div className="demoPage bg-secondary !flex !justify-center !items-center">
          <div className="bg-white p-4 h-96 w-auto rounded-md shadow-lg">
            <div className="h-80 w-80  rounded-md overflow-hidden">
              <Image src={pic1} alt="" className="h-full w-auto" />
            </div>
          </div>
        </div>
        <div className="demoPage font-light !flex flex-col justify-center items-center text-primary text-justify text-sm bg-secondary space-y-4 !px-5">
          <h2 className="font-bold text-lg">
            Lounge & Spa : l’audace d’une nouvelle vision du bien-être
          </h2>

          <p>
            Depuis 2018, nous avons décidé de redéfinir les codes du bien-être
            traditionnel, en imaginant un lieu où l’élégance, l’intimité et
            l’exclusivité se conjuguent pour offrir bien plus qu’un simple
            moment d’évasion.
          </p>

          <p>
            Dans un cadre entièrement réimaginé, Lounge & Spa s’affirme comme un
            lieu de vie exclusif, propice aussi bien à une pause bien méritée
            après une longue journée qu’à la célébration des instants les plus
            précieux, où l’espace bien-être peut laisser place à des réceptions
            élégantes et sur mesure. Pensé pour offrir une hospitalité inégalée,
            il allie une gastronomie raffinée signée par une cheffe passionnée à
            une diversité d’offres adaptées à chaque moment de vie, où
            l’excellence et la rigueur de nos équipes garantissent un service
            d’exception. Que ce soit pour une escapade en duo, un week-end entre
            amis ou une réception privée, chaque instant y prend une dimension
            inoubliable
          </p>
        </div>
        {/* page 5 --end---Lounge & Spa : l’audace d’une nouvelle vision du bien-être------- */}

        {/* page 5-----start------Lounge & Spa, une signature d’exception en perpétuelle évolution--------- */}
        <div className="demoPage bg-secondary !flex !justify-center !items-center">
          <div className="bg-white p-4 h-96 w-auto rounded-md shadow-lg">
            <div className="h-80 w-80  rounded-md overflow-hidden">
              <Image src={pic1} alt="" className="h-full w-auto" />
            </div>
          </div>
        </div>
        <div className="demoPage font-light !flex flex-col justify-center items-center text-primary text-justify text-sm bg-secondary space-y-4 !px-5">
          <h2 className="font-bold text-lg">
            Lounge & Spa, une signature d’exception en perpétuelle évolution
          </h2>

          <p>
            Notre histoire est celle d’une exigence sans compromis, d’un
            engagement constant à réimaginer l’art du bien-être en
            s&apos;améliorant et en se réinventant chaque jour.
          </p>

          <p>
            Nous avons transcendé les standards des spas traditionnels pour
            concevoir bien plus qu’un espace de détente : une destination, un
            lieu où chaque instant se vit comme une expérience précieuse,
            façonnée sur mesure.
          </p>

          <b>Bienvenue chez Lounge & Spa.</b>
        </div>
        {/* page 5 --end---------- */}
      </HTMLFlipBook>
    </div>
  );
}
