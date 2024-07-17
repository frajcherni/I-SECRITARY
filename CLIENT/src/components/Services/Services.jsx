import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { SlBriefcase } from "react-icons/sl";
import { FaDigitalTachograph } from "react-icons/fa";

const skillsData = [
  {
    name: "ASTREINTE TÉLÉPHONIQUE",
    icon: <FaPhoneAlt className="text-4xl text-primary" />,
    link: "#",
    description:
      "Nous offrons un service de gestion des appels téléphoniques pour garantir que vous ne manquez jamais une communication importante, quelle que soit l'heure.",
    aosDelay: "0",
  },
  {
    name: "SERVICES MÉDICAUX",
    icon: <GiHealthNormal className="text-4xl text-primary" />,
    link: "#",
    description:
      "Nos services de secrétariat médical aident les médecins à gérer les rendez-vous, les dossiers médicaux et la communication avec les patients.",
    aosDelay: "300",
  },
  {
    name: "SERVICES POUR ENTREPRISES",
    icon: <SlBriefcase className="text-4xl text-primary" />,
    link: "#",
    description:
      "Nous fournissons des services administratifs complets pour les entreprises, incluant la gestion des rendez-vous, l'organisation de réunions, et plus encore.",
    aosDelay: "500",
  },
  {
    name: "MARKETING DIGITAL",
    icon: <FaDigitalTachograph className="text-4xl text-primary" />,
    link: "#",
    description:
      "Notre équipe de marketing digital vous aide à renforcer votre présence en ligne avec des stratégies personnalisées pour atteindre vos objectifs.",
    aosDelay: "700",
  },
];

const Services = () => {
  return (
    <>
      <span id="about"></span>
      <div className="bg-gray-100 dark:bg-black dark:text-white py-12 sm:grid sm:place-items-center">
        <div className="container">
          {/* Header */}
          <div className="pb-12 text-center space-y-3">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold sm:text-3xl text-violet-950 dark:text-primary"
            >
              NOS CATEGORIES
            </h1>
            <p
              data-aos="fade-up"
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              Nous sommes une société de services dédiée à répondre à tous vos besoins administratifs et professionnels.
            </p>
          </div>

          {/* services cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card space-y-3 sm:space-y-4 p-4"
              >
                <div>{skill.icon}</div>
                <h1 className="text-lg font-semibold">{skill.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          {/* button */}
          <div
            data-aos="fade-up"
            data-aos-delay="900"
            data-aos-offset="0"
            className="text-center mt-4 sm:mt-8"
          >
            <button className="primary-btn">En savoir plus</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
