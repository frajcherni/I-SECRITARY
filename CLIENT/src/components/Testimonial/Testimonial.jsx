import React from "react";
import Slider from "react-slick";

const testimonialData = [
  {
    id: 1,
    name: "CHERNI FRAJ - Directeur des Opérations de Design, Ben Arous",
    text: "Le service de secrétariat fourni par cette société est exceptionnel. Leur attention aux détails et leur efficacité ont grandement amélioré notre productivité. Je les recommande vivement.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Mariam Ben Salah - Avocate, Tunis",
    text: "Grâce à leur assistance administrative, j'ai pu me concentrer sur mes clients sans me soucier des tâches organisationnelles. Un service indispensable pour les professionnels.",
    img: "src/assets/website/imgg.jpg",
  },
  {
    id: 3,
    name: "Ahmed Jaziri - Médecin Généraliste, Sousse",
    text: "Leur gestion de mes rendez-vous et des appels téléphoniques a transformé mon cabinet médical. Je gagne un temps précieux et mes patients sont ravis de la nouvelle organisation.",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonial = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
  };
  return (
    <>
      <div className="py-10">
        <div className="container">
          {/* testimonial section */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 max-w-screen-xl mx-auto gap-6"
          >
            <Slider {...settings}>
              {testimonialData.map(({ id, name, text, img }) => {
                return (
                  <div key={id} className="my-6">
                    {/* card */}
                    <div className="flex flex-col sm:flex-row gap-5 md:gap-14 p-4 mx-4 rounded-xl dark:bg-gray-800 relative">
                      <img
                        src={img}
                        alt=""
                        className="block mx-auto h-[300px] w-full sm:w-[200px] object-cover"
                      />
                      <div className="space-y-4">
                        <p className="text-gray-500 text-black/80 dark:text-white/80 xl:pr-40">
                          “{text}”
                        </p>
                        <h1 className="text-xl font-bold">{name}</h1>
                      </div>
                      <p className="text-black/10 text-[12rem] font-serif absolute bottom-0 right-0">
                        ,,
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
