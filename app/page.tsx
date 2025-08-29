"use client";
import { useRef, useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTiktok,
  FaUserCog,
  FaUser,
} from "react-icons/fa";
import { LuHandshake, LuMessageCircle } from "react-icons/lu";
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
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-[#00b4d8] text-white">
        <p className="text-lg md:text-xl font-medium  max-w-2xl">
          Ici, peu importe votre réseau:
          <br />
          <span className="font-bold">
            ce qui compte : c&apos;est de conclure
            <br />
            plus de ventes, ensemble.
          </span>
        </p>

        <h1 className="text-3xl md:text-5xl py-8 font-bold">
          Découvrez
          <br />
          <span className="text-white">monhubimmo</span>
        </h1>

        {/* Feature items with icons */}
        <div className="sm:space-y-4  space-y-3 sm:mb-7 max-w-2xl">
          <div className="flex items-center justify-center gap-4">
            <LuMessageCircle className="w-12 h-12 text-white " />
            <p className="text-lg md:text-xl font-medium text-left">
              La 1ere plateforme collaborative pour
              <br />
              tous les professionnels de l’immobilier.
            </p>
          </div>

          <div className="flex mr-10.5 items-center justify-center gap-4">
            <LuHandshake className="w-12 h-12 text-white" />
            <p className="text-lg md:text-xl font-medium text-left">
              Partagez vos biens et vos clients,
              <br />
              sans barrière de réseau.
            </p>
          </div>
        </div>

        <button
          onClick={scrollToForm}
          className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
        >
          Je veux être informé dès maintenant
        </button>
      </section>

      {/* Notre histoire */}
      <section className="bg-white py-16 px-6 text-[#034752]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            L&apos;histoire de monhubimmo
          </h2>

          <h3 className="text-xl md:text-xl font-semibold text-center mb-8 text-[#00b4d8]">
            Nous sommes deux frères, avec la même passion pour l&apos;immobilier
            et la même frustration.
          </h3>

          <div className="space-y-6 leading-relaxed">
            <p>
              Dans mon activité, je rencontre chaque semaine de nombreuses
              personnes avec un projet immobilier. Par habitude, je les oriente
              vers des conseillers de confiance comme Emilie notre ambassadrice
              de monhubimmo, ce qui leur permet de conclure des ventes. Mais je
              n&apos;avais aucun outil concret pour fluidifier, sécuriser et
              tracer ces échanges.
            </p>

            <p>
              De mon côté, passionné d&apos;habitat et d&apos;architecture,
              j&apos;ai travaillé plusieurs années dans l&apos;immobilier.
              J&apos;ai pu constater, en tant qu&apos;agent, combien il était
              chronophage de répéter sans cesse les critères des clients, de
              voir des informations se perdre et de manquer des opportunités.
              Plus tard, en tant que particulier lors de mes propres achats et
              ventes, j&apos;ai retrouvé les mêmes difficultés. Cette double
              expérience m&apos;a confirmé qu&apos;il fallait trouver une
              meilleure solution.
            </p>

            <div className="bg-[#f8f9fa] p-6 rounded-lg border-l-4 border-[#00b4d8]">
              <p className="font-medium">
                En discutant ensemble, et avec d&apos;autres professionnels du
                secteur, une évidence s&apos;est imposée :
              </p>
              <p className="mt-2">
                Créer une solution simple, moderne et collaborative pour aider
                les agents à mieux travailler ensemble, valoriser les apporteurs
                d&apos;affaires et permettre aux particuliers d&apos;être mieux
                accompagnés.
              </p>
            </div>

            <p className="text-center font-semibold text-xl">
              C&apos;est ainsi qu&apos;est né{" "}
              <span className="text-[#00b4d8]">MonHubimmo</span>.
            </p>

            <p className="text-center text-lg font-medium bg-[#00b4d8] text-white p-4 rounded-lg">
              Notre volonté : rendre l&apos;immobilier plus humain, plus
              efficace et plus équitable, pour que chacun y gagne.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION BÉNÉFICES - après le HERO */}
      <section className="bg-white pb-16 px-6">
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
              Accédez aux biens des autres agents immobiliers pour satisfaire
              les besoins de vos clients.
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
              Collaborez facilement avec tous les professionnels de
              l’immobilier, indépendamment de leur réseau qu’ils soient
              indépendants, en réseau, mandataires, VRP ou en agence.
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
                négociateurs vrp chez IAD, MAISON ROUGE, SAFTI, GUY HOQUET, BSK,
                NAOS, LAFORET, EFFICITY ou un autre réseau ?
              </span>
            </span>
          </h2>

          <p className="mb-4 text-md md:text-lg">
            Vous travaillez dur pour vos clients, mais vous êtes souvent seul
            face à vos annonces, vos recherches acquéreurs ou vos exclusivités à
            diffuser…
          </p>

          <p className="text-md md:text-lg font-semibold">
            <strong>MonHubimmo</strong>
            <strong>
              , la 1ère plateforme collaborative 100% dédiée aux professionnels
              de l’immobilier
            </strong>
            , toutes enseignes confondues.
          </p>
        </div>
      </section>

      {/* PAGE 2 - FORMULAIRE */}
      <section className="bg-[#00b4d8] py-16 px-6 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold mb-2 text-white">
          Offre de lancement : 3 mois offerts pour les 100 premiers inscrits!
          <br />
          Ensuite, 19,99€/mois, sans engagement.
          <br />
          Et si votre réseau est partenaire, profitez d’un{" "}
          <strong>tarif préférentiel exclusif.</strong>
        </h2>
        <p className="mb-6 text-white max-w-xl">
          Rejoignez la <strong>1ere plateforme collaborative</strong> de
          l&apos;immobilier
        </p>
        <div className="flex  flex-col-reverse sm:flex-row items-center justify-center gap-14">
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
                {loading ? "Envoi en cours..." : "Je m’inscris maintenant"}
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
        </div>
        <p className="text-xs text-center  max-w-2xl my-2  ">
          <strong>Vos données sont en sécurité.</strong> Nous collectons
          uniquement les informations nécessaires pour vérifier votre profil et
          sécuriser l’accès à la plateforme. Elles ne sont jamais revendues et
          sont hébergées en Europe, conformément au RGPD. Consultez notre
          Politique de confidentialité complète.
        </p>
      </section>

      {/* Nos Témoignages */}
      <section className="bg-white pt-16 px-6 text-[#034752]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Témoignages
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Ce que pensent les agents immobiliers
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Témoignage 1 - Wilhelm M. */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/wilhelm-m.jpeg"
                    alt="Wilhelm M."
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-16 h-16 bg-[#00b4d8] rounded-full flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <span className="text-white font-bold text-xl">WM</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Wilhelm M.</h3>
                  <p className="text-gray-600">Mandataire SAFTI</p>
                  <a
                    href="https://www.safti.fr/votre-conseiller-safti/wilhelm-mongis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00b4d8] text-sm hover:underline"
                  >
                    Voir le profil →
                  </a>
                </div>
              </div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-2">(5/5)</span>
              </div>
              <blockquote className="text-gray-700 italic leading-relaxed">
                « J&apos;ai hâte que Monhubimmo sorte ! Enfin un outil où
                l&apos;on pourra partager facilement nos mandats et nos
                prospects, sans se limiter à son propre réseau. »
              </blockquote>
            </div>

            {/* Témoignage 2 - Fanny D. */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/fanny-d.webp"
                    alt="Fanny D."
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-16 h-16 bg-[#00b4d8] rounded-full flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <span className="text-white font-bold text-xl">FD</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Fanny D.</h3>
                  <p className="text-gray-600">Mandataire IAD</p>
                  <a
                    href="https://www.iadfrance.fr/conseiller-immobilier/fanny.dubois-tillon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00b4d8] text-sm hover:underline"
                  >
                    Voir le profil →
                  </a>
                </div>
              </div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-2">(5/5)</span>
              </div>
              <blockquote className="text-gray-700 italic leading-relaxed">
                « Chez iad, le partage fait partie de notre ADN : nous
                travaillons déjà dans un esprit collaboratif, avec un respect
                mutuel et beaucoup d&apos;humain au cœur de chaque échange.
                Forcément, je suis la première fervente de ce type de processus,
                car je suis convaincue que c&apos;est grâce à l&apos;ouverture
                et à la mise en commun que l&apos;on crée de vraies
                opportunités.. »
              </blockquote>
            </div>

            {/* Témoignage 3 - Floriane B. */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/Floriane.jpeg"
                    alt="Floriane B."
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-16 h-16 bg-[#00b4d8] rounded-full flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <span className="text-white font-bold text-xl">FD</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Floriane B.</h3>
                  <p className="text-gray-600">Mandataire IAD</p>
                  <a
                    href="https://www.iadfrance.fr/conseiller-immobilier/floriane.bougeard?utm_source=google_ads&utm_medium=cpc&utm_campaign=performancemaxestimation&gad_source=1&gad_campaignid=22411348977&gbraid=0AAAAADHgQbWDwTTIIgktPGGAYdN-KkpId&gclid=Cj0KCQjwn8XFBhCxARIsAMyH8Btr0z3d63EeOoJNIvMy-b8EoEbuTJn5hftAyFZsv1t8ZCU9bnif__0aAnDsEALw_wcB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00b4d8] text-sm hover:underline"
                  >
                    Voir le profil →
                  </a>
                </div>
              </div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-2">(5/5)</span>
              </div>
              <blockquote className="text-gray-700 italic leading-relaxed">
                «Je suis ravie de découvrir Monhubimmo qui va rapidement devenir
                un outil indispensable à nous tous professionnels de
                l’immobilier. Le partage est une valeur clé dans notre réseau et
                Monhubimmo aidera forcément à faciliter les collaborations et
                donc les futures réussites d’acquisition et de vente de nos
                clients respectifs. <br />
                Bravo pour ce beau projet et longue vie à Monhubimmo »
              </blockquote>
            </div>

            {/* Témoignage 4 - Emilie. */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/Emilie.jpg"
                    alt="Emilie C."
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-16 h-16 bg-[#00b4d8] rounded-full flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <span className="text-white font-bold text-xl">EC</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Emilie C.</h3>
                  <p className="text-gray-600">
                    Mandataire NAOS Immobilier et Ambassadrice de monhubimmo
                  </p>
                  <a
                    href="https://emilie-miniacmorvan.naosimmobilier.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00b4d8] text-sm hover:underline"
                  >
                    Voir le profil →
                  </a>
                </div>
              </div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-2">(5/5)</span>
              </div>
              <div className="relative w-full h-full max-w-md mx-auto">
                <video
                  className="w-full h-96 object-fit rounded-lg shadow-xl"
                  controls
                >
                  <source src="/Emilie.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={(e) => {
                    const video = e.currentTarget
                      .previousElementSibling as HTMLVideoElement;
                    if (video.paused) {
                      video.play();
                      e.currentTarget.style.display = "none";
                    }
                  }}
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-[#00b4d8]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
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

          {/* video */}
          <div className="relative w-full h-72   max-w-md mx-auto">
            <video
              className="w-full h-full object-fill rounded-lg shadow-xl"
              controls
            >
              <source src="/partie.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              className="absolute inset-0 flex items-center justify-center"
              onClick={(e) => {
                const video = e.currentTarget
                  .previousElementSibling as HTMLVideoElement;
                if (video.paused) {
                  video.play();
                  e.currentTarget.style.display = "none";
                }
              }}
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-[#00b4d8]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Comment ça marche */}
        <section className="bg-[#f8f9fa] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-16 px-6 text-[#034752]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl pt-13 font-bold text-center ">
              Comment ça marche ?
            </h2>

            <div className=" p-8 md:p-12">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                {/* Étape 1 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#00b4d8] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    1. Client sans solution
                  </h3>
                  <p className="text-sm text-gray-600">
                    Un agent accueille un client, mais aucun bien de son
                    portefeuille ne correspond.
                  </p>
                </div>

                {/* Flèche */}
                <div className="hidden md:flex justify-center">
                  <svg
                    className="w-8 h-8 text-[#00b4d8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>

                {/* Étape 2 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#00b4d8] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    2. Recherche rapide
                  </h3>
                  <p className="text-sm text-gray-600">
                    Grâce à MonHubimmo, il identifie en quelques clics le bien
                    idéal publié par un confrère.
                  </p>
                </div>

                {/* Flèche */}
                <div className="hidden md:flex justify-center">
                  <svg
                    className="w-8 h-8 text-[#00b4d8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>

                {/* Étape 3 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#00b4d8] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    3. Collaboration
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ils décident de collaborer : la visite se fait ensemble, le
                    confrère conclut la vente, selon leur accord, la commission
                    est partagée.
                  </p>
                </div>
              </div>

              {/* Résultat final */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="w-15 h-15 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-4">
                    Résultat
                  </h3>
                  <p className=" text-gray-700 max-w-3xl mx-auto">
                    Un client satisfait, un vendeur comblé et deux
                    professionnels gagnants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    Partage d&apos;annonces privé
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
                    Apporteurs d&apos;affaires intégrés
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
        <div className="relative w-full h-full   max-w-md mx-auto">
          <video
            className="w-full h-full object-fill rounded-lg shadow-xl"
            controls
          >
            <source src="/second.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className="absolute inset-0 flex items-center justify-center"
            onClick={(e) => {
              const video = e.currentTarget
                .previousElementSibling as HTMLVideoElement;
              if (video.paused) {
                video.play();
                e.currentTarget.style.display = "none";
              }
            }}
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[#00b4d8]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </button>
        </div>
        <hr className="my-10 border-gray-300 max-w-6xl mx-auto" />

        {/* POUR QUI + TESTEZ MAINTENANT */}
        <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 text-[#034752]">
          {/* Colonne gauche */}
          <div>
            <h4 className="text-lg font-bold mb-6">Pour qui ?</h4>

            <div className="flex items-start gap-3 mb-6">
              <FaUser className="w-9 h-9 text-[#00b4d8] flex-shrink-0" />
              <div>
                <p className="font-semibold">Agents immobiliers</p>
                <p className="text-sm text-gray-700">
                  Trouvez plus de mandats grâce à la puissance du réseau.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaUserCog className="w-10 h-10 text-[#00b4d8] flex-shrink-0" />
              <div>
                <p className="font-semibold">Apporteurs d&apos;affaires</p>
                <p className="text-sm text-gray-700">
                  MonHubimmo vous ouvre aussi les portes du réseau caché des
                  particuliers et prescripteurs locaux. Ils peuvent désormais
                  publier leurs propres annonces, consultables par les
                  mandataires sur la plateforme.
                </p>
                <p className="text-sm text-gray-700 mt-4">
                  Des particuliers, amis, voisins ou commerçants qui connaissent
                  un bien à vendre ou un acheteur potentiel ? C&apos;est un
                  véritable levier de prospection et de mandats avant même leur
                  diffusion sur les portails.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col">
            <h4 className="text-lg font-bold mb-6">Testez dès maintenant</h4>
            <ul className="space-y-2 text-sm text-gray-700 mb-6">
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
              className="bg-[#00b4d8] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0094b3] transition self-start"
            >
              M&apos;inscrire en avant première
            </button>
          </div>
        </section>
      </section>

      {/* Questions les plus fréquentes */}
      <section className="bg-white pb-16 px-6 text-[#034752]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Questions les plus fréquentes
          </h2>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-lg">
                  Qu&apos;est-ce que MonHubimmo ?
                </h3>
                <svg
                  className="w-5 h-5 text-[#00b4d8] group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="p-6 bg-white">
                <p>
                  MonHubimmo est une plateforme collaborative 100 % dédiée aux
                  professionnels de l&apos;immobilier. Elle permet de partager
                  des mandats, consulter les biens des autres, échanger en
                  direct et collaborer simplement.
                </p>
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-lg">
                  Qui peut s&apos;inscrire ?
                </h3>
                <svg
                  className="w-5 h-5 text-[#00b4d8] group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="p-6 bg-white">
                <p>
                  L&apos;accès est réservé aux professionnels de
                  l&apos;immobilier : agents, mandataires, VRP en agence. Chaque
                  inscription est vérifiée (carte T, numéro SIREN ou RSAC,
                  attestation d&apos;habilitation).
                </p>
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-lg">
                  Est-ce ouvert aux particuliers ?
                </h3>
                <svg
                  className="w-5 h-5 text-[#00b4d8] group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="p-6 bg-white">
                <p>
                  Non. MonHubimmo est un espace réservé aux pros. Les
                  particuliers peuvent toutefois être apporteurs d&apos;affaires
                  en transmettant une information à un professionnel inscrit.
                </p>
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-lg">
                  Combien coûte l&apos;accès à la plateforme ?
                </h3>
                <svg
                  className="w-5 h-5 text-[#00b4d8] group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="p-6 bg-white">
                <p>
                  Au lancement, l&apos;inscription est offerte pendant 3 mois.
                  Ensuite, l&apos;abonnement est de 19,99 €/mois, sans
                  engagement, avec un prix étudié pour ne pas alourdir les
                  charges des agents.
                </p>
              </div>
            </details>

            {/* FAQ 5 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-lg">
                  Qu&apos;est-ce que les apporteurs d&apos;affaires ?
                </h3>
                <svg
                  className="w-5 h-5 text-[#00b4d8] group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="p-6 bg-white">
                <p>
                  Un apporteur d&apos;affaires peut être un voisin, un
                  commerçant ou un contact qui connaît un bien à vendre ou un
                  client en recherche. Ils transmettent l&apos;information via
                  MonHubimmo et l&apos;agent prend le relais. Selon les
                  pratiques et accords entre pros, une prime peut être versée.
                </p>
              </div>
            </details>

            {/* FAQ 6 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-lg">
                  Comment sont protégées mes données et mes mandats ?
                </h3>
                <svg
                  className="w-5 h-5 text-[#00b4d8] group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="p-6 bg-white">
                <p>
                  La plateforme est sécurisée, et vos informations ne sont
                  visibles que par des membres vérifiés. Les données sont
                  hébergées en Europe et conformes au RGPD. Les détails
                  concernant vos biens ou vos clients ne circulent pas librement
                  : c&apos;est vous qui décidez de les transmettre, uniquement
                  lors d&apos;un accord de collaboration.
                </p>
              </div>
            </details>

            {/* FAQ 7 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-lg">
                  Quels sont les avantages pour un agent immobilier ?
                </h3>
                <svg
                  className="w-5 h-5 text-[#00b4d8] group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="p-6 bg-white">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-[#00b4d8]">•</span> Plus de visibilité
                    pour vos mandats
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00b4d8]">•</span> Plus
                    d&apos;acheteurs potentiels grâce aux échanges entre pros
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00b4d8]">•</span> Gain de temps avec
                    une messagerie intégrée et un historique clair
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00b4d8]">•</span> Opportunités
                    supplémentaires grâce aux apporteurs d&apos;affaires
                  </li>
                </ul>
              </div>
            </details>

            {/* FAQ 8 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-lg">
                  Et si je suis déjà dans un réseau collaboratif ?
                </h3>
                <svg
                  className="w-5 h-5 text-[#00b4d8] group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="p-6 bg-white">
                <p>
                  Peu importe votre réseau ou enseigne (iad, Safti, Orpi,
                  Century 21, Laforêt…), MonHubimmo permet de collaborer au-delà
                  des frontières de votre réseau.
                </p>
              </div>
            </details>

            {/* FAQ 9 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-lg">
                  Est-ce que MonHubimmo prend une commission sur les ventes ?
                </h3>
                <svg
                  className="w-5 h-5 text-[#00b4d8] group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="p-6 bg-white">
                <p>
                  Non. MonHubimmo ne prend aucune commission. C&apos;est
                  uniquement un abonnement mensuel qui donne accès à toutes les
                  fonctionnalités.
                </p>
              </div>
            </details>

            {/* FAQ 10 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-lg">
                  Quand la plateforme sera-t-elle disponible ?
                </h3>
                <svg
                  className="w-5 h-5 text-[#00b4d8] group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="p-6 bg-white">
                <p>
                  La sortie officielle est prévue très prochainement. En vous
                  inscrivant dès maintenant, vous serez averti en priorité et
                  bénéficierez de 3 mois gratuits au lancement.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f9f9f9] text-[#333] py-10 px-6 sm:px-16">
        <div className=" max-w-7xl mx-auto  justify-center grid md:grid-cols-3 gap-4 md:gap-16">
          {/* Logo */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold">
              <span className="text-black">mon</span>
              <span className="text-[#00b4d8]">hubimmo</span>
            </h2>
            <p className="text-sm font-medium text-[#00b4d8] mt-2">
              La 1ere plateforme collaborative pour tous les
              <br />
              professionnels de l’immobilier
            </p>
            {/* Contact Info */}
            <div className="my-4 space-y-3">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-[#00b4d8]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href="mailto:contact@monhubimmo.com"
                  className="text-sm font-medium"
                >
                  contact@monhubimmo.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-[#00b4d8]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+33785549213" className="text-sm font-medium">
                  +33 7 85 54 92 13
                </a>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="mb-4">
            <h3 className="font-semibold mb-4">Liens utiles</h3>
            <div className=" text-left space-y-2 text-sm">
              <div>
                <a href="#" className="hover:text-[#00b4d8]">
                  Découvrir MonHubImmo
                </a>
              </div>
              <div>
                <a href="#" className="hover:text-[#00b4d8]">
                  Inscription (3 mois offerts)
                </a>
              </div>
              <div>
                <a
                  href="/conditions-generales"
                  className="hover:text-[#00b4d8]"
                >
                  Conditions générales
                </a>
              </div>
              <div>
                <a
                  href="politique-de-confidentialite"
                  className="hover:text-[#00b4d8]"
                >
                  Politique de confidentialité
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-4">
            <h3 className="font-semibold mb-4">Suivez-nous</h3>
            <div className="flex  space-x-4">
              <a
                href="https://www.instagram.com/monhubimmo/"
                className="text-[#00b4d8] hover:opacity-80"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/mon-hub-immo-a65904379?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                className="text-[#00b4d8] hover:opacity-80"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61579213881250"
                className="text-[#00b4d8] hover:opacity-80"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@hubimmo?_t=ZN-8yqbaoADaXG&_r=1"
                className="text-[#00b4d8] hover:opacity-80"
              >
                <FaTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 ">
          <p>© 2025 MonHubImmo - Tous droits réservés</p>
          <p className="mt-2">Connecter les pros, partager les opportunités.</p>
          <p>
            Demain, MonHubimmo ne sera pas seulement la plateforme des pros : ce
            sera aussi un point de rencontre incontournable entre particuliers
            et professionnels.
            <br />
            La plateforme collaborative au service des professionnels et des
            particuliers.
          </p>
        </div>
        {/* Bar inférieure */}
        <div className="border-t mt-10 pt-4 text-xs text-gray-500 text-center">
          <a href="politique-de-confidentialite" className="mx-2">
            Politique de confidentialité
          </a>{" "}
          |
          <a href="/mentions-legales" className="mx-2">
            Mentions légales
          </a>{" "}
          |
          <a href="politique-cookies" className="mx-2">
            Politique cookies
          </a>{" "}
          |
          <a href="cookies" className="mx-2">
            Cookies
          </a>
        </div>
      </footer>
    </main>
  );
}
