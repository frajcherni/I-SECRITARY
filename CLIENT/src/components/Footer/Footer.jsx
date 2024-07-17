import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterLinks = [
  {
    title: "À propos",
    link: "/#about",
  },
  {
    title: "Caractéristiques",
    link: "/#features",
  },
  {
    title: "Réalisations",
    link: "/#works",
  },
  {
    title: "Carrières",
    link: "/#career",
  },
];
const HelpLinks = [
  {
    title: "Support Client",
    link: "/#support",
  },
  {
    title: "Détails de Livraison",
    link: "/#delivery-details",
  },
  {
    title: "Conditions Générales",
    link: "/#terms",
  },
  {
    title: "Politique de Confidentialité",
    link: "/#policy",
  },
];
const ResourcesLinks = [
  {
    title: "Ebooks Gratuits",
    link: "/#ebooks",
  },
  {
    title: "Comment Bloguer",
    link: "/#blogs",
  },
  {
    title: "S'abonner TCJ",
    link: "https://www.youtube.com/channel/UC1H-a1MKEFXRiFlGNLcy7gQ?sub_confirmation=1",
  },
];

const Footer = () => {
  return (
    <div className="bg-dark text-white">
      <section className="container py-10">
        <div className="grid md:grid-cols-3 py-5">
          {/* company Details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
             <img className='w-36' src='src/assets/website/blacklogo.png' />            </h1>
            <p className="text-sm">
               nous offrons des services de secrétariat professionnels pour répondre aux besoins des avocats, médecins, et autres professionnels. Que ce soit pour la gestion des rendez-vous, l'accueil téléphonique, ou la gestion de documents, nous nous engageons à libérer votre temps précieux pour vous permettre de vous concentrer sur votre activité principale.
            </p>
            <br />
            {/* Social Handle */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#">
                <FaInstagram className="text-2xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaFacebook className="text-2xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaLinkedin className="text-2xl hover:text-primary duration-300" />
              </a>
            </div>
          </div>
          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Société
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      key={link.title}
                      className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400"
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Aide
                </h1>
                <ul className="flex flex-col gap-3">
                  {HelpLinks.map((link) => (
                    <li
                      key={link.title}
                      className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400"
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Ressources
                </h1>
                <ul className="flex flex-col gap-3">
                  {ResourcesLinks.map((link) => (
                    <li
                      key={link.title}
                      className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400"
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
