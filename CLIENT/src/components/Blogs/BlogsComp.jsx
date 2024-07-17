import React from "react";
import BlogCard from "./BlogCard";
import Img1 from "../../assets/blog/blog1.png";
import Img2 from "../../assets/blog/blog2.png";
import Img3 from "../../assets/blog/blog3.png";

const BlogsData = [
  {
    id: 1,
    image: 'src/assets/website/support.jpg',
    title: "Support Administratif Efficace",
    description:
      "Notre équipe excelle dans la fourniture d'un support administratif complet, garantissant des opérations fluides et une productivité accrue. Nous gérons toutes les tâches avec précision et confidentialité.",
    author: "Équipe Admin",
    date: "22/05/2024",
  },
  {
    id: 2,
    image: 'src/assets/website/gestionpro.jpg',
    title: "Gestion Professionnelle des Documents",
    description:
      "Nous offrons des services de gestion de documents de premier ordre, de l'organisation à l'archivage, en garantissant que vos fichiers importants sont toujours accessibles et sécurisés. Laissez-nous simplifier votre flux de travail documentaire.",
    author: "Équipe Admin",
    date: "22/05/2024",
  },
  {
    id: 3,
    image: '/src/assets/website/calandar.jpg',
    title: "Gestion Experte de Calendrier",
    description:
      "Restez au sommet de votre emploi du temps grâce à nos services experts de gestion de calendrier. Nous coordonnons réunions, rendez-vous et événements pour maximiser votre efficacité et vous permettre de vous concentrer sur votre activité principale.",
    author: "Équipe Admin",
    date: "22/05/2024",
  },
];

const BlogsComp = () => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white py-10 pb-14">
        <section data-aos="fade-up" className="container">
          <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-semibold">
            Nos Blogs
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BlogsData.map((item) => (
              <BlogCard key={item.id} {...item} />
            ))}
          </div>
          <div className="text-center">
            <button className="primary-btn">Voir Tous les Articles</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogsComp;
