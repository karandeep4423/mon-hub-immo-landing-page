"use client";

import { useRef, useState } from "react";
import { FaInstagram, FaLinkedin, FaFacebook, FaTiktok } from "react-icons/fa";
export default function LandingPage() {
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
    };

    try {
      const res = await fetch("https://www.monhubimmo.com/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage(
          "Votre message a été envoyé avec succès. Nous vous contacterons bientôt."
        );
        setMessageType("success");
        formRef.current.reset();
      } else {
        const err = await res.json();
        setMessage(err.error || "Une erreur est survenue lors de l'envoi.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage(
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
  }

  return (
    <main className="bg-[#00b4d8] min-h-screen text-white font-sans">
      {/* PAGE 1 - HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <p className="text-sm  font-medium mb-4">
          Ici, peu importe votre réseau
          <br />
          <span className="font-bold">
            ce qui compte, c&apos;est de conclure plus de ventes, ensemble.
          </span>
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold mb-2">
          Découvrez <span className="font-bold text-white">monhubimmo</span>
        </h1>

        <p className="uppercase tracking-wider text-sm mb-3">
          Le 1er réseau collaboratif où tous les professionnels de
          l&apos;immobilier
        </p>

        <p className="mb-6">
          Partagent biens et clients, toutes enseignes confondues
        </p>

        <button
          onClick={scrollToForm}
          className="bg-white text-[#00b4d8] px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition"
        >
          Je veux être informé dés l&apos;ouverture
        </button>
      </section>

      {/* SECTION BÉNÉFICES - après le HERO */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-[#034752] mb-10">
          Pourquoi rejoindre MonHubimmo ?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-[#034752]">
          <div className="border-2 border-[#00b4d8] p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-2">Partage de biens</h3>
            <p>
              Partagez votre stock (mandats simples, exclusifs ou off market)
              avec d&apos;autres mandataires.
            </p>
          </div>

          <div className="border-2 border-[#00b4d8] p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-2">Visibilité en temps réel</h3>
            <p>
              Visualisez les biens disponibles sur votre secteur et ceux de vos
              confrères en un coup d&apos;œil.
            </p>
          </div>

          <div className="border-2 border-[#00b4d8]  p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-2">Trouvez pour vos clients</h3>
            <p>
              Accédez aux biens des autres mandataires pour satisfaire les
              besoins de vos clients.
            </p>
          </div>

          <div className="border-2 border-[#00b4d8] p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-2">
              Recherches clients ciblées
            </h3>
            <p>
              Déposez des recherches et recevez des propositions adaptées
              automatiquement.
            </p>
          </div>

          <div className="border-2 border-[#00b4d8] p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-2">
              Collaboration multi-réseaux
            </h3>
            <p>
              Collaborez facilement avec d&apos;autres mandataires, quelle que
              soit leur enseigne.
            </p>
          </div>

          <div className="border-2 border-[#00b4d8] p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-2">Messagerie privée</h3>
            <p>
              Consultez l&apos;historique de vos échanges et discutez en toute
              confidentialité.
            </p>
          </div>

          <div className="border-2  border-[#00b4d8] p-6 rounded shadow md:col-span-2 lg:col-span-3">
            <h3 className="font-bold text-lg mb-2">Tableau de bord intuitif</h3>
            <p>
              Gérez vos fiches clients, mandats et recherches simplement depuis
              un espace unique.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 text-[#034752]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            <span className="inline-flex items-center gap-2">
              <span></span>
              <span>
                Vous êtes mandataire immobiliers, agent immobilier ou
                négociateurs vrp chez IAD, MAISON ROUGE, SAFTI, GUY HOCQUET,
                BSK, NAOS, LAFORET, EFFICITY ou un autre réseau ?
              </span>
            </span>
          </h2>

          <p className="mb-4 text-md md:text-lg">
            Vous travaillez dur pour vos clients, mais vous êtes souvent seul
            face à vos annonces, vos recherches acquéreurs ou vos exclusivités à
            diffuser…
          </p>

          <p className="text-md md:text-lg font-semibold">
            <strong>MonHubImmo</strong> est le{" "}
            <strong>
              1er réseau de collaboration 100 % entre professionnels de
              immobilier
            </strong>
            , toutes enseignes confondues.
          </p>
        </div>
      </section>

      {/* PAGE 2 - FORMULAIRE */}
      <section className="bg-[#00b4d8] py-16 px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-2 text-white">
          Inscrivez-vous maintenant, les 3 premiers mois sont offerts
        </h2>
        <p className="mb-6 text-white max-w-xl">
          Rejoignez la <strong>1er plateforme collaborative</strong> de
          l&apos;immobilier
        </p>

        <div className="bg-white text-gray-900 w-full max-w-md p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Entrez vos informations :
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
              required
              disabled={loading}
            />
            <input
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
              required
              disabled={loading}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Numéro de téléphone"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00b4d8] text-white w-full py-2 rounded font-semibold hover:bg-[#0094b3] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Envoi en cours..." : "Inscrivez vous maintenant"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded text-sm ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </section>

      {/* SECTION POST-FORMULAIRE */}
      <section className="bg-white py-16 px-6 text-[#034752]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Texte principal */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              La plateforme qui connecte
              <br /> les professionnels de l&lsquo;immobilier
            </h2>
            <p className="mb-6">
              Centralisez vos annonces, collaborez entre agents, trouvez plus
              vite les bons biens pour vos clients.
            </p>
            <ul className="flex flex-col text-left">
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#00b4d8] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M16 12a4 4 0 01-8 0V8a4 4 0 018 0v4z" />
                  <path d="M12 16v2m0 0h-4m4 0h4" />
                </svg>
                <span>Réseau privé entre agents</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#00b4d8] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span>Annonces internes et exclusives</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#00b4d8] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8v8m0 0l-4-4m4 4l4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span>Apporteurs d&apos;affaires intégrés</span>
              </li>
            </ul>
            <button
              onClick={scrollToForm}
              className="mt-6 bg-[#00b4d8] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0094b3] transition"
            >
              Je réserve ma place
            </button>
          </div>

          {/* Image maquette */}
          <div className="flex justify-center">
            <img
              src="/tele.png"
              alt="Aperçu de l’application MonHubimmo"
              className="w-[250px] sm:w-[300px] shadow-lg rounded-xl"
            />
          </div>
        </div>

        {/* Fonctionnalités clés */}
        <section className="bg-white py-16 px-6 text-[#034752]">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-12">
              Fonctionnalités clés
            </h3>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Bloc 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#00b4d8]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l7 4v6c0 5.25-3.5 9.74-7 10-3.5-.26-7-4.75-7-10V6l7-4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    Partage d’annonces privé
                  </h4>
                  <p className="text-sm text-gray-700">
                    Déposez et consultez des biens, entre pros, en toute
                    confidentialité.
                  </p>
                </div>
              </div>

              {/* Bloc 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#00b4d8]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3H12a9 9 0 019 9z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    Apporteurs d’affaires intégrés
                  </h4>
                  <p className="text-sm text-gray-700">
                    Offrez une interface simple à vos apporteurs pour qu’ils
                    vous transmettent des opportunités.
                  </p>
                </div>
              </div>

              {/* Bloc 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#00b4d8]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 17l4-4 4 4m0-5V3" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    Collaboration simplifiée
                  </h4>
                  <p className="text-sm text-gray-700">
                    Mettez en relation les bons biens avec les bons clients
                    grâce à un système connecté.
                  </p>
                </div>
              </div>

              {/* Bloc 4 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#00b4d8]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 9V7a4 4 0 00-8 0v2M5 10h14l-1 10H6L5 10z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    Application mobile intuitive
                  </h4>
                  <p className="text-sm text-gray-700">
                    Une interface claire, rapide, pensée pour le terrain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="my-20 border-gray-300 max-w-6xl mx-auto" />

        {/* POUR QUI + TESTEZ MAINTENANT */}
        <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 text-[#034752]">
          {/* Colonne gauche */}
          <div>
            <h4 className="text-lg font-bold mb-6">Pour qui ?</h4>

            <div className="flex items-start gap-3 mb-5">
              <svg
                className="w-6 h-6 text-[#00b4d8]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M5.121 17.804A9.977 9.977 0 0112 15c2.107 0 4.06.652 5.655 1.762M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-semibold">Agents immobiliers</p>
                <p className="text-sm text-gray-700">
                  Trouvez plus de mandats grâce à la puissance du réseau.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-[#00b4d8]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-semibold">Apporteurs d&apos;affaires</p>
                <p className="text-sm text-gray-700">
                  MonHubimmo vous ouvre aussi les portes du réseau caché des
                  particuliers et prescripteurs locaux. Ils peuvent désormais
                  publier leurs propres annonces, consultables par les
                  mandataires sur la plateforme.<br></br><br></br>
                  Des particuliers, amis, voisins
                  ou commerçants qui connaissent un bien à vendre ou un acheteur
                  potentiel ? C&apos;est un véritable levier de prospection et de
                  mandats avant même leur diffusion sur les portails.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div>
            <h4 className="text-lg font-bold mb-6">Testez dès maintenant</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-[#00b4d8]">✓</span> Créez un compte
                gratuit
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00b4d8]">✓</span> Sans engagement
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00b4d8]">✓</span> Version MVP +
                évolutive
              </li>
            </ul>
            <button
              onClick={scrollToForm}
              className="mt-6 bg-[#00b4d8] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0094b3] transition"
            >
              M&apos;inscrire en avant première
            </button>
          </div>
        </section>
      </section>

      <footer className="bg-[#f9f9f9] text-[#333] py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {/* Colonne 1 : Logo */}
          <div>
            <h2 className="text-2xl font-bold text-[#00b4d8]">
              <span className="text-black">mon</span>hubimmo
            </h2>
          </div>

          {/* Colonne 2 : Rejoindre */}
          <div>
            <h3 className="font-semibold mb-3">Rejoindre MonHubImmo</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#">Profil reconversion</a>
              </li>
              <li>
                <a href="#">Profil immobilier</a>
              </li>
              <li>
                <a href="#">Rémunération</a>
              </li>
              <li>
                <a href="#">Formation</a>
              </li>
              <li>
                <a href="#">Témoignages</a>
              </li>
              <li>
                <a href="#">Presse</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li className="mt-2">
                Contact : <br />
                <a href="mailto:contact@monhubimmo.com">
                  contact@monhubimmo.com{" "}
                </a>{" "}
                <br></br>
                <a href="tel:+33785549213">+33 785549213</a>
              </li>
            </ul>
          </div>

          {/* Colonn 3 : Découvrir */}
          <div>
            <h3 className="font-semibold mb-3">Découvrir</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#">Acheter</a>
              </li>
              <li>
                <a href="#">Vendre</a>
              </li>
              <li>
                <a href="#">Estimer</a>
              </li>
              <li>
                <a href="#">Trouver un conseiller</a>
              </li>
              <li>
                <a href="#">Notre vision</a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Suivez-nous */}
          <div>
            <h3 className="font-semibold mb-3">Suivez-nous</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.instagram.com/monhubimmo/"
                className="hover:opacity-80 transition-opacity text-pink-500"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity text-blue-600"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61579213881250"
                className="hover:opacity-80 transition-opacity text-blue-500"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity text-black"
              >
                <FaTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        {/* Bar inférieure */}
        <div className="border-t mt-10 pt-4 text-xs text-gray-500 text-center">
          <a href="#" className="mx-2">
            Politique de confidentialité
          </a>{" "}
          |
          <a href="#" className="mx-2">
            Mentions légales
          </a>{" "}
          |
          <a href="#" className="mx-2">
            Politique cookies
          </a>{" "}
          |
          <a href="#" className="mx-2">
            Cookies
          </a>
        </div>
      </footer>
    </main>
  );
}
