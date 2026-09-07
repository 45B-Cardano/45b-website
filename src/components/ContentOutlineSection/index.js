import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import LanguagePanel from "@site/src/components/LanguagePanel";

const BOOK_CALL_URL = "https://calendly.com/lucas-45b-ia9l/quickmeet";

//
// This component:
// a full-width panel whose whole content depends on a language toggle sitting
// on its top edge (see LanguagePanel, which draws both).
//
// Add a language by adding a key here and a { code, label } entry in
// LanguagePanel's `languages`.
const outlineContent = {
  en: {
    // Public Instagram post; /embed renders it in an iframe without needing
    // Instagram's embed.js script.
    instagramUrl: "https://www.instagram.com/p/Dc9gBjRtCYC/embed",
    headingLine1: "Content",
    headingLine2: "Outline",
    items: [
      "Your first wallet",
      "What is Blockchain",
      "Tokens and NFTs",
      "Using Web3",
      "Running the chain",
      "Cardano Governance",
      "Cardano Funding",
      "Web3 for all industries",
      "Deconstructing business models",
      "Playing with Smart Contracts",
      "Brainstorming your ideas",
      "Ideating Solutions",
    ],
    scheduleImage: "/img/web3/weeks-en.png",
    scheduleAlt: "Web3 Workshops week-by-week schedule",
    zoomHint: "Tap to enlarge",
    formatHeading: "Format",
    formatItems: [
      "Starting September 9th, onboarding until the 15th",
      "Running for 3 weeks (until funding ends)",
      "3 optional sessions each week at different times",
      "45-60 min workshop; up to 30 min Q&A",
      "Async portal with call recordings and notes",
      "Fully Async format also available",
      "Extra Q&A calls at different times",
    ],
    bookCallLabel: "Book a call to discuss",
  },
  pt: {
    instagramUrl: "https://www.instagram.com/p/Dc86ioLiJN6/embed",
    headingLine1: "Conteúdo",
    headingLine2: "Programático",
    items: [
      "A primeira carteira",
      "O que é Blockchain",
      "Tokens e NFTs",
      "Utilizar a Web3",
      "Fazer correr a Blockchain",
      "Governação em Cardano",
      "Financiamento em Cardano",
      "Web3 para todas as indústrias",
      "Desconstruir modelos de negócio",
      "Perceber Contratos Inteligentes",
      "Brainstorming de ideias",
      "Idealizar Soluções",
    ],
    scheduleImage: "/img/web3/weeks-pt.png",
    scheduleAlt: "Calendário semana a semana dos Workshops Web3",
    zoomHint: "Toque para ampliar",
    formatHeading: "Formato",
    formatItems: [
      "Início a 9 de Setembro, onboarding até dia 15",
      "3 semanas (até ao final do financiamento)",
      "3 sessões opcionais /semana, horários diferentes",
      "45-60 min workshop; até 30 min para questões",
      "Portal com as gravações e notas das sessões",
      "Formato completamente assíncrono disponível",
      "Chamadas extra de Q&A em horários diferentes",
    ],
    bookCallLabel: "Marcar uma chamada para conversar",
  },
};

// `lang` / `onLangChange` are owned by the page, so this toggle also drives the
// language of the sections above it.
export default function ContentOutlineSection({ lang, onLangChange }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const content = outlineContent[lang];
  const scheduleImageUrl = useBaseUrl(content.scheduleImage);

  // While the image is full screen: close on Escape and keep the page behind
  // it from scrolling.
  useEffect(() => {
    if (!isZoomed) return;
    function handleKeyDown(event) {
      if (event.key === "Escape") setIsZoomed(false);
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed]);

  return (
    <div className={clsx("container", styles.sectionWrap)}>
      <LanguagePanel
        lang={lang}
        onLangChange={onLangChange}
        variant="dark"
        label="Content outline language"
      >
        <div className={styles.panelRow}>
          <div className={styles.mediaColumn}>
            <iframe
              key={content.instagramUrl}
              className={styles.instagramFrame}
              src={content.instagramUrl}
              title="Instagram post"
              frameBorder="0"
              scrolling="no"
              allowtransparency="true"
            />
          </div>

          <div className={styles.outlineColumn}>
            <p className={styles.outlineHeading}>{content.headingLine1}</p>
            <p className={styles.outlineHeading}>{content.headingLine2}</p>
            <ul className={styles.outlineList}>
              {content.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.scheduleColumn}>
            <button
              type="button"
              className={styles.scheduleButton}
              onClick={() => setIsZoomed(true)}
              aria-label={content.zoomHint}
            >
              <img
                className={styles.scheduleImage}
                src={scheduleImageUrl}
                alt={content.scheduleAlt}
              />
            </button>

            <div className={styles.formatBlock}>
              <p className={styles.formatHeading}>{content.formatHeading}</p>
              <ul className={styles.formatList}>
                {content.formatItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                className={clsx(
                  "button button--primary",
                  styles.bookCallButton
                )}
                to={BOOK_CALL_URL}
              >
                {content.bookCallLabel}
              </Link>
            </div>
          </div>
        </div>
      </LanguagePanel>

      {isZoomed && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={content.scheduleAlt}
          onClick={() => setIsZoomed(false)}
        >
          <img
            className={styles.lightboxImage}
            src={scheduleImageUrl}
            alt={content.scheduleAlt}
          />
        </div>
      )}
    </div>
  );
}
