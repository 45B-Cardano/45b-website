import React, { useState } from "react";
import Layout from "@theme/Layout";
import SiteHero from "@site/src/components/Layout/SiteHero";
import ImageWithText from "@site/src/components/Layout/ImageWithText";
import ContentOutlineSection from "@site/src/components/ContentOutlineSection";
import ApplyButton from "@site/src/components/ApplyButton";
import VideoEmbed from "@site/src/components/VideoEmbed";
import ProfileChips from "@site/src/components/ProfileChips";
import SelectionHighlight from "@site/src/components/SelectionHighlight";
import BackgroundWrapper from "@site/src/components/Layout/BackgroundWrapper";
import BoundaryBox from "../components/Layout/BoundaryBox";
import SpacerBox from "../components/Layout/SpacerBox";
import OpenGraphImage from "@site/src/components/Layout/OpenGraphImage";
import FollowCardanoSection from "@site/src/components/FollowCardanoSection";
import LanguagePanel from "@site/src/components/LanguagePanel";
import Divider from "@site/src/components/Layout/Divider";
import Link from "@docusaurus/Link";

// Overview copy per language. The language is owned by the page and shared by
// every LanguagePanel on it, so the toggle on this section and the one on
// ContentOutlineSection further down switch the whole page together.
//
// A language needs a key in all four places: here, in LanguagePanel's
// `languages` list, in ContentOutlineSection and in ApplyButton.
const overviewContent = {
  en: {
    title: "What is it? How can I use it? What could I build?",
    paragraphs: [
      "Web3 is rewriting how organizations own, move and prove value. Payments that settle in seconds, records nobody can quietly alter, communities that fund and govern themselves — these stopped being experiments and became working infrastructure. In 2026 it reaches your industry, whether or not your industry is ready for it.",

      <>
        <SelectionHighlight>
          The people who shape that shift won't all be engineers.
        </SelectionHighlight>{" "}
        They will be the ones who understood early what the technology makes
        possible in their own field, and could explain it to everyone else in
        the room.
      </>,

      "45B - Cardano Enablement is funded to run 5 cohorts of workshops in different languages. No code required and no prior blockchain knowledge assumed. Come experiment, ask the hard questions, and leave with ideas you can actually use.",

      "If your work touches ownership, contracts, money, membership or trust, it already touches Web3. Bring your field:",
    ],
    profiles: [
      "End-users",
      "Builders & Developers",
      "Artists & Musicians",
      "Lawyers",
      "Accountants",
      "Teachers & Trainers",
      "Healthcare",
      "Farming & Agri-food",
      "Logistics & Supply Chain",
      "Real Estate",
      "Banking & Insurance",
      "Retail & E-commerce",
      "Public Sector",
      "NGOs & Non-profits",
      "Marketing & Comms",
      "Designers",
      "Journalists",
      "Gaming & Sports",
      "Entrepreneurs",
      "HR & Recruitment",
      "Energy & Utilities",
      "Tourism & Hospitality",
    ],
  },
  pt: {
    title: "O que é? Como posso usar? O que poderia construir?",
    paragraphs: [
      "A Web3 está a reescrever a forma como as organizações detêm, movimentam e comprovam valor. Pagamentos que liquidam em segundos, registos que ninguém altera em silêncio, comunidades que se financiam e governam a si próprias — deixaram de ser experiências e passaram a ser infraestrutura a funcionar. Em 2026 chega à sua indústria, esteja ela preparada ou não.",

      <>
        <SelectionHighlight>
          Quem vai moldar esta mudança não serão só engenheiros.
        </SelectionHighlight>{" "}
        Serão as pessoas que perceberam cedo o que a tecnologia torna possível
        na sua própria área, e que a souberam explicar a toda a gente na sala.
      </>,

      "A 45B - Cardano Enablement tem financiamento para facilitar 5 grupos de workshops em várias línguas. Não é preciso programar nem ter conhecimentos prévios de blockchain. Venha experimentar, fazer as perguntas difíceis e sair com ideias que pode mesmo aplicar.",

      "Se o seu trabalho envolve propriedade, contratos, dinheiro, adesão ou confiança, já envolve Web3. Traga a sua área:",
    ],
    profiles: [
      "Utilizadores",
      "Programadores",
      "Artistas e Músicos",
      "Advogados",
      "Contabilistas",
      "Professores e Formadores",
      "Saúde",
      "Agricultura e Agroalimentar",
      "Logística e Cadeia de Abastecimento",
      "Imobiliário",
      "Banca e Seguros",
      "Retalho e E-commerce",
      "Setor Público",
      "ONGs e Associações",
      "Marketing e Comunicação",
      "Designers",
      "Jornalistas",
      "Gaming e Desporto",
      "Empreendedores",
      "Recursos Humanos",
      "Energia",
      "Turismo e Hotelaria",
    ],
  },
  es: {
    title: "¿Qué es? ¿Cómo puedo usarlo? ¿Qué podría construir?",
    paragraphs: [
      "La Web3 está reescribiendo la forma en que las organizaciones poseen, mueven y demuestran valor. Pagos que se liquidan en segundos, registros que nadie puede alterar en silencio, comunidades que se financian y se gobiernan a sí mismas: dejaron de ser experimentos y ya son infraestructura en funcionamiento. En 2026 llega a tu sector, esté preparado o no.",

      <>
        <SelectionHighlight>
          Quienes den forma a este cambio no serán solo ingenieros.
        </SelectionHighlight>{" "}
        Serán las personas que entendieron pronto lo que la tecnología hace
        posible en su propio campo, y supieron explicárselo a todos los demás
        en la sala.
      </>,

      "45B - Cardano Enablement cuenta con financiación para organizar 5 grupos de workshops en varios idiomas. No hace falta programar ni tener conocimientos previos de blockchain. Ven a experimentar, haz las preguntas difíciles y sal con ideas que puedas aplicar de verdad.",

      "Si tu trabajo tiene que ver con propiedad, contratos, dinero, pertenencia o confianza, ya tiene que ver con la Web3. Trae tu campo:",
    ],
    profiles: [
      "Usuarios",
      "Programadores",
      "Artistas y Músicos",
      "Abogados",
      "Contables",
      "Profesores y Formadores",
      "Salud",
      "Agricultura y Agroalimentación",
      "Logística y Cadena de Suministro",
      "Inmobiliario",
      "Banca y Seguros",
      "Comercio y E-commerce",
      "Sector Público",
      "ONG y Asociaciones",
      "Marketing y Comunicación",
      "Diseñadores",
      "Periodistas",
      "Gaming y Deporte",
      "Emprendedores",
      "Recursos Humanos",
      "Energía",
      "Turismo y Hostelería",
    ],
  },
  fr: {
    title:
      "Qu'est-ce que c'est\u00a0? Comment l'utiliser\u00a0? Que pourrais-je construire\u00a0?",
    paragraphs: [
      "La Web3 réécrit la façon dont les organisations détiennent, transfèrent et prouvent la valeur. Des paiements réglés en quelques secondes, des registres que personne ne peut modifier en silence, des communautés qui se financent et se gouvernent elles-mêmes\u00a0: ce ne sont plus des expériences, c'est une infrastructure qui fonctionne. En 2026, elle arrive dans votre secteur, qu'il y soit prêt ou non.",

      <>
        <SelectionHighlight>
          Ceux qui façonneront ce changement ne seront pas tous des
          ingénieurs.
        </SelectionHighlight>{" "}
        Ce seront les personnes qui ont compris tôt ce que la technologie rend
        possible dans leur propre domaine, et qui ont su l'expliquer à tous les
        autres dans la salle.
      </>,

      "45B - Cardano Enablement est financée pour animer 5 groupes de workshops en plusieurs langues. Aucun code requis, aucune connaissance préalable de la blockchain attendue. Venez expérimenter, poser les questions difficiles et repartir avec des idées réellement applicables.",

      "Si votre travail touche à la propriété, aux contrats, à l'argent, à l'appartenance ou à la confiance, il touche déjà à la Web3. Apportez votre domaine\u00a0:",
    ],
    profiles: [
      "Utilisateurs",
      "Développeurs",
      "Artistes et Musiciens",
      "Avocats",
      "Comptables",
      "Enseignants et Formateurs",
      "Santé",
      "Agriculture et Agroalimentaire",
      "Logistique et Chaîne d'Approvisionnement",
      "Immobilier",
      "Banque et Assurance",
      "Commerce et E-commerce",
      "Secteur Public",
      "ONG et Associations",
      "Marketing et Communication",
      "Designers",
      "Journalistes",
      "Gaming et Sport",
      "Entrepreneurs",
      "Ressources Humaines",
      "Énergie",
      "Tourisme et Hôtellerie",
    ],
  },
};

function HomepageHeader() {
  const { siteTitle } = "useDocusaurusContext()";
  return (
    <SiteHero
      title="Web3 Workshops"
      description="From zero to Web3. Discover how you and your business can prepare."
      bannerType="starburst"
    />
  );
}

export default function Home() {
  const [lang, setLang] = useState("en");
  const overview = overviewContent[lang];

  return (
    <Layout
    title="Web3 Workshops | 45B.io"
    description="From zero to Web3. Discover how you and your business can prepare."
    >
      <OpenGraphImage pageName="web3" />
      <HomepageHeader />
      <main>
        <BoundaryBox>
          {/* The anchor sits outside the panel so #people scrolls to the
              selector, not past it. */}
          <Divider id={"people"} />

          <LanguagePanel
            lang={lang}
            onLangChange={setLang}
            variant="light"
            label="Overview language"
          >
            <ImageWithText
              imageName={"web3.jpg"}
              title={overview.title}
              text={overview.paragraphs}
              isImageRight={false}
              headingDot={false}
            >
              <ProfileChips items={overview.profiles} />
            </ImageWithText>
          </LanguagePanel>

          <SpacerBox size="small" />

          <VideoEmbed
            videoUrl={
              "https://www.youtube-nocookie.com/embed/eXiTojtZ6N8?autoplay=1&mute=1"
            }
          />

          <ApplyButton lang={lang} />

        </BoundaryBox>

        <BackgroundWrapper backgroundType={"gradientDark"}>
          <ContentOutlineSection lang={lang} onLangChange={setLang} />
        </BackgroundWrapper>

        <FollowCardanoSection />
      </main>
    </Layout>
  );
}
