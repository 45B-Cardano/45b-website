import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import { APPLY_FORM_URL, BOOK_CALL_URL } from "@site/src/data/web3Links";

//
// This component:
// the sign-up call to action, on a centered full-width row of its own.
// A highlight sweeps across it every few seconds to draw the eye.
//
// Clicking it opens a modal that puts the two ways in — the sign-up form and
// a call with Lucas — side by side, because we want people to do *both*: the
// form registers them, the call fast-tracks the application. Both links open
// in a new tab so the modal (and the second action) survives the first click.
//
// `lang` picks the copy (the page owns the language — see LanguagePanel);
// pass `label` to override the trigger button's label outright.

const CONTENT = {
  en: {
    triggerLabel: "Apply to join!",
    dialogTitle: "Two ways in — please do both",
    intro:
      "We're aiming to start new cohorts from the week of 7th of September. To fast-track your application, find a time to briefly meet with Lucas — we'd like to chat for a bit and capture your available timings and motivation.",
    joiner: "and",
    closeLabel: "Close",
    cards: [
      {
        step: "1",
        title: "Fill in the sign-up form",
        text: "A couple of minutes: who you are, the field you work in, and what you'd like to get out of the workshops.",
        cta: "Open the sign-up form",
        href: APPLY_FORM_URL,
      },
      {
        step: "2",
        title: "Book a call with Lucas",
        text: "A short, friendly chat to capture your available timings and your motivation. This is what fast-tracks your application.",
        cta: "Find a time to meet",
        href: BOOK_CALL_URL,
      },
    ],
    footNote:
      "Either order works — the form registers you, the call moves you up the queue.",
  },
  pt: {
    triggerLabel: "Inscreva-se aqui!",
    dialogTitle: "Duas formas de entrar — faça as duas",
    intro:
      "Queremos começar os novos grupos a partir da semana de 7 de Setembro. Para acelerar a sua candidatura, marque uma breve chamada com o Lucas — gostávamos de conversar um pouco e registar a sua disponibilidade e motivação.",
    joiner: "e",
    closeLabel: "Fechar",
    cards: [
      {
        step: "1",
        title: "Preencha o formulário de inscrição",
        text: "Dois minutos: quem é, a área em que trabalha e o que gostaria de retirar dos workshops.",
        cta: "Abrir o formulário",
        href: APPLY_FORM_URL,
      },
      {
        step: "2",
        title: "Marque uma chamada com o Lucas",
        text: "Uma conversa curta e informal para registar a sua disponibilidade e a sua motivação. É isto que acelera a sua candidatura.",
        cta: "Escolher um horário",
        href: BOOK_CALL_URL,
      },
    ],
    footNote:
      "A ordem é indiferente — o formulário inscreve-o, a chamada dá-lhe prioridade.",
  },
};

export default function ApplyButton({ lang = "en", label }) {
  const content = CONTENT[lang] ?? CONTENT.en;
  const buttonLabel = label ?? content.triggerLabel;

  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);

  const close = useCallback(() => setIsOpen(false), []);

  // While the dialog is open: close on Escape, keep focus inside it, and stop
  // the page behind from scrolling. On close, focus goes back to the trigger.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen, close]);

  return (
    <>
      <div className={styles.applyRow}>
        <button
          type="button"
          ref={triggerRef}
          className={clsx(
            "button button--primary button--lg",
            styles.applyButton
          )}
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <span className={styles.applyLabel}>{buttonLabel}</span>
        </button>
      </div>

      {isOpen && (
        <div className={styles.overlay} onClick={close}>
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-dialog-title"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={close}
              aria-label={content.closeLabel}
            >
              &times;
            </button>

            <h2 id="apply-dialog-title" className={styles.dialogTitle}>
              {content.dialogTitle}
            </h2>
            <p className={styles.dialogIntro}>{content.intro}</p>

            <div className={styles.cardGrid}>
              {content.cards.map((card, index) => (
                <React.Fragment key={card.step}>
                  {index > 0 && (
                    <div className={styles.joiner} aria-hidden="true">
                      <span className={styles.joinerWord}>
                        {content.joiner}
                      </span>
                    </div>
                  )}
                  <div className={styles.card}>
                    <span className={styles.cardStep} aria-hidden="true">
                      {card.step}
                    </span>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardText}>{card.text}</p>
                    <Link
                      className={clsx(
                        "button button--primary",
                        styles.cardButton
                      )}
                      to={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {card.cta}
                    </Link>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <p className={styles.footNote}>{content.footNote}</p>
          </div>
        </div>
      )}
    </>
  );
}
