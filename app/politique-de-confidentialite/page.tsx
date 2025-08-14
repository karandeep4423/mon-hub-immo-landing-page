"use client";
import Head from "next/head";

const PolitiqueConfidentialite = () => {
  return (
    <>
      <Head>
        <title>Politique de confidentialité - MonHubimmo</title>
        <meta
          name="description"
          content="Politique de confidentialité de MonHubimmo"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Title Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Politique de confidentialité
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="bg-[#00b4d8] text-white px-3 py-1 rounded-full font-medium">
                MonHubimmo
              </span>
              <span>•</span>
              <span>Dernière mise à jour : 14 août 2025</span>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                <p>
                  La présente politique de confidentialité explique comment MonHubimmo collecte, utilise et protège les informations que vous nous fournissez lorsque vous utilisez notre site ou vous inscrivez pour tester notre plateforme.
                </p>
              </div>
            </section>

            {/* Section 1 */}
            <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-[#00b4d8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                Qui sommes-nous ?
              </h2>
              <div className="ml-11 space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                <p>
                  MonHubimmo est une plateforme de mise en relation entre professionnels de l&apos;immobilier et apporteurs d&apos;affaires.
                </p>
                <p>
                  Nous ne sommes pas une agence immobilière et nous n&apos;intervenons pas directement dans les transactions. Notre rôle est uniquement de faciliter le contact entre les utilisateurs inscrits.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-[#00b4d8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                Données collectées
              </h2>
              <div className="ml-11 space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                <p>Lorsque vous remplissez notre formulaire d&apos;inscription, nous collectons :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nom et prénom</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone</li>
                </ul>
                <p>
                  Ces données sont nécessaires pour vous inscrire sur la liste des personnes souhaitant tester la plateforme à sa sortie.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-[#00b4d8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  3
                </span>
                Utilisation des données
              </h2>
              <div className="ml-11 space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                <p>Vos données sont utilisées uniquement pour :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Vous contacter concernant l&apos;ouverture et l&apos;accès à la plateforme</li>
                  <li>Vous envoyer des informations sur le fonctionnement de MonHubimmo</li>
                  <li>Vous permettre d&apos;accéder aux fonctionnalités lors de la phase de test</li>
                </ul>
                <p className="font-medium">
                  Elles ne seront jamais vendues ou louées à des tiers.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-[#00b4d8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                Stockage et sécurité
              </h2>
              <div className="ml-11 space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                <p>
                  Vos informations sont stockées de manière sécurisée sur des serveurs conformes aux réglementations en vigueur (RGPD).
                </p>
                <p>
                  Nous mettons en place toutes les mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou modification.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-[#00b4d8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  5
                </span>
                Partage des données
              </h2>
              <div className="ml-11 space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                <p>Vos données ne sont partagées qu&apos;avec :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nos prestataires techniques (hébergement, e-mailing)</li>
                  <li>Les partenaires indispensables au bon fonctionnement de la plateforme</li>
                </ul>
                <p>
                  Dans tous les cas, ces prestataires sont soumis à une obligation stricte de confidentialité.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-[#00b4d8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  6
                </span>
                Vos droits
              </h2>
              <div className="ml-11 space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Droit d&apos;accès, de rectification et de suppression de vos données</li>
                  <li>Droit d&apos;opposition au traitement de vos données</li>
                  <li>Droit à la portabilité des données</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-4">
                  <p className="font-semibold text-blue-800 mb-2">
                    Pour exercer vos droits :
                  </p>
                  <p className="text-blue-700">
                    Vous pouvez nous contacter à : <a href="mailto:contact@monhubimmo.com" className="underline font-medium">contact@monhubimmo.com</a>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-[#00b4d8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  7
                </span>
                Conservation des données
              </h2>
              <div className="ml-11 text-gray-700 text-sm md:text-base leading-relaxed">
                <p>
                  Vos informations sont conservées uniquement pendant la durée nécessaire à l&apos;objectif initial, ou jusqu&apos;à ce que vous demandiez leur suppression.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-[#00b4d8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  8
                </span>
                Modification de la politique de confidentialité
              </h2>
              <div className="ml-11 text-gray-700 text-sm md:text-base leading-relaxed">
                <p>
                  MonHubimmo se réserve le droit de modifier la présente politique à tout moment. La date de mise à jour en haut de page sera actualisée en conséquence.
                </p>
              </div>
            </section>

            {/* Final Notice */}
            <section className="bg-[#00b4d8] text-white rounded-lg p-6 md:p-8">
              <p className="text-center text-sm md:text-base font-medium">
                En utilisant MonHubimmo, vous acceptez notre politique de confidentialité et le traitement de vos données personnelles dans les conditions décrites ci-dessus.
              </p>
            </section>
          </div>

          {/* Back to Top Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white text-[#00b4d8] border border-[#00b4d8] px-6 py-3 rounded-full font-medium hover:bg-[#00b4d8] hover:text-white transition-colors duration-200"
            >
              ↑ Retour en haut
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default PolitiqueConfidentialite;
