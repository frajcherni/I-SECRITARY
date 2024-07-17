import React, { useState, useEffect } from "react";
import yellowCar from "../../assets/website/team.png";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1); // State to manage steps
  const [request, setRequest] = useState({
    email: "",
    username: "",
    mobileNumber: 11111111,
    language: "",
    postaleAdresse: "",
    sirenSiret: 111111,
    profession: "",
    service: "",
    creationDate: ""
  });
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(""); // State for toast message

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setStep(1); // Reset steps on close
    setRequest({
      email: "",
      username: "",
      mobileNumber: 11111111,
      language: "",
      postaleAdresse: "",
      sirenSiret: 111111,
      profession: "",
      service: "",
      creationDate: ""
    });
  };



  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleNextStep = () => {
    if (request.profession && request.service) {
      setStep(2);
    } else {
      alert("Veuillez sélectionner les deux options");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/requests", request)
      .then((res) => {
        console.log(res);
        setToastMessage("Votre demande a été envoyée avec succès"); // Set toast message        setErrors({});
        closeModal(); // Close the modal after successful submission
        Navigate("/home");
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 400) {
          setErrors({ email: "email already exists" });
        } else {
          let tempErrors = {};
          for (let key of Object.keys(error.response.data.errors)) {
            console.log(key, '------------', error.response.data.errors[key].message);
            tempErrors[key] = error.response.data.errors[key].message;
          }
          console.log(tempErrors);
          setErrors({ ...tempErrors });
        }
      });
  };

  useEffect(() => {
    if (toastMessage) {
      setTimeout(() => {
        setToastMessage(""); // Clear toast message after 5 seconds
      }, 5000);
    }
  }, [toastMessage]);

  return (
    <div className="dark:bg-gray-950 dark:text-white duration-300">
      <div className="container min-h-[620px] flex mt-10 sm:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
          {/* Image section */}
          <div data-aos="zoom-in" className="order-1 sm:order-2 relative">
            <img
              src={yellowCar}
              alt=""
              className="w-full sm:max-w-[280px] md:max-w-[430px]"
            />
            <div
              data-aos="slide-right"
              className="absolute -bottom-5 -right-8 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 dark:text-white shadow-md"
            >
              <p className="text-gray-500 text-sm">600+</p>
              <h1 className="font-bold">
                <span className="font-normal">⭐Services</span>
              </h1>
            </div>
          </div>
  
          {/* Text section */}
          <div className="space-y-5 order-2 sm:order-1 xl:pr-40">
            <h1
              data-aos="fade-up"
              className="text-4xl sm:text-5xl font-semibold"
              style={{ lineHeight: 1.2 }}
            >
              Société de services dynamique et innovante{" "}
            </h1>
            <p data-aos="fade-up" data-aos-delay="300">
              dédiée à fournir des solutions sur mesure pour répondre aux
              besoins uniques de nos clients. Notre équipe d'experts qualifiés
              offre une gamme complète de services
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-offset="0"
              className="primary-btn animate-bounce"
              onClick={openModal} // Add onClick event to open modal
            >
              Bénéficier nos services
            </button>
          </div>
        </div>
      </div>
  
      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[999] flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleBackdropClick} // Handle backdrop click
        >
          <div
            className="bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-8 rounded-md shadow-md w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px] max-h-[80%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked inside
          >
            {step === 1 ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Etape 1</h2>
                <div className="mb-4">
                  <label htmlFor="profession" className="block text-sm font-medium">
                    Je suis
                  </label>
                  <select
                    id="profession"
                    name="profession"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={request.profession}
                    onChange={(e) => setRequest({ ...request, profession: e.target.value })}
                  >
                    <option value="">--Sélectionnez votre activité--</option>
                    <option value="medecin">Médecin</option>
                    <option value="avocat">Avocat</option>
                  </select>
                  {errors.profession && (
                    <p className="text-red-500 text-xs mt-1">{errors.profession}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="service" className="block text-sm font-medium">
                    Mon besoin
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={request.service}
                    onChange={(e) => setRequest({ ...request, service: e.target.value })}
                  >
                    <option value="">--Sélectionnez votre besoin--</option>
                    <option value="besoin1">Besoin 1</option>
                    <option value="besoin2">Besoin 2</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-xs mt-1">{errors.service}</p>
                  )}
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    className="mt-4 bg-primary text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-primary-dark"
                    onClick={closeModal}
                  >
                    Fermer
                  </button>
                  <button
                    className="mt-4 bg-primary text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-primary-dark"
                    onClick={handleNextStep}
                  >
                    Suivant
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Etape 2</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label htmlFor="fullName" className="block text-sm font-medium">
                        Nom et Prénom
                      </label>
                      <input
                        id="username"
                        value={request.username}
                        name="username"
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setRequest({ ...request, username: e.target.value })}
                      />
                      {errors.username && (
                        <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email
                      </label>
                      <input
                        value={request.email}
                        id="email"
                        name="email"
                        type="email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setRequest({ ...request, email: e.target.value })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="creationDate" className="block text-sm font-medium">
                        Date de création de la société
                      </label>
                      <input
                        value={request.creationDate}
                        id="creationDate"
                        name="creationDate"
                        type="date"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setRequest({ ...request, creationDate: e.target.value })}
                      />
                      {errors.creationDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.creationDate}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="postaleAdresse" className="block text-sm font-medium">
                        Adresse postale
                      </label>
                      <input
                        value={request.postaleAdresse}
                        id="postaleAdresse"
                        name="postaleAdresse"
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setRequest({ ...request, postaleAdresse: e.target.value })}
                      />
                      {errors.postaleAdresse && (
                        <p className="text-red-500 text-xs mt-1">{errors.postaleAdresse}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="mobileNumber" className="block text-sm font-medium">
                        Numéro de téléphone
                      </label>
                      <input
                        value={request.mobileNumber}
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setRequest({ ...request, mobileNumber: e.target.value })}
                      />
                      {errors.mobileNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="fax" className="block text-sm font-medium">
                        Fix
                      </label>
                      <input
                        id="fax"
                        name="fax"
                        type="tel"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="sirenSiret" className="block text-sm font-medium">
                        SIREN / SIRET
                      </label>
                      <input
                        value={request.sirenSiret}
                        id="sirenSiret"
                        name="sirenSiret"
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setRequest({ ...request, sirenSiret: e.target.value })}
                      />
                      {errors.sirenSiret && (
                        <p className="text-red-500 text-xs mt-1">{errors.sirenSiret}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button
                      type="button"
                      className="bg-primary text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-primary-dark"
                      onClick={closeModal}
                    >
                      Fermer
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-primary-dark"
                    >
                      Soumettre
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
           {/* Toast message */}
           {toastMessage && (
  <div 
    className="fixed top-16 right-0 left-0 mx-auto max-w-sm dark:bg-gray-900 dark:text-white px-4 py-2 text-white rounded-md shadow-md z-50" 
    style={{ backgroundColor: "#6495ED", width: "350px" }}>
    {toastMessage}
  </div>
)}

    </div>
  );
  
};

export default Hero;
