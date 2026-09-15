import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Divider from "@site/src/components/Layout/Divider";
import LanguagePanel from "@site/src/components/LanguagePanel";
import eventsData from "@site/src/data/web3Events.json";
import { googleUrl, outlookUrl, downloadIcs, icsUrl, FEED_URL } from "./calendar";

//
// This component:
// the upcoming-calls table, sitting between the content outline and the
// footer. It is the one place on /web3 where the page and the mailer meet.
//
// WHERE THE DATA COMES FROM
// Every session is authored as a Google Calendar event, mailed out as a real
// invitation by 45b-mailer, and therefore lives — as a VCALENDAR — inside a
// campaign file on the web host. That campaign store is the only
// machine-readable record of when a call is.
//
// Since 2026-09-15 this page reads it live: the mailer exposes the published
// slice at /mailer/events.php, and because the mailer and this site share a
// document root that is a same-origin request — no CORS, no host to hard-code,
// and no rebuild when the schedule changes. A campaign appears there only if it
// has been ticked "show on 45b.io/web3" by hand in the tool.
//
// src/data/web3Events.json is still imported, but only as the fallback for when
// that request fails. It is a snapshot from `45b-mailer/tools/events-export.py`,
// which does the same job offline against a pulled copy of the campaigns. It
// can only ever be *missing* newer calls, never showing stale ones, because the
// end-time filter below runs over whichever source won.
//
// ENGLISH ONLY, ON PURPOSE
// The rest of /web3 switches between four languages. This section does not:
// it is a schedule, its rows are proper nouns and clock times, and the one
// thing a reader actually needs translating — which language a session is
// *held* in — is a badge on the row rather than a property of the page. So it
// takes no `lang` and sits in a pane with no selector on it.
//
// WHY EVERYTHING TIME-RELATED WAITS FOR THE BROWSER
// Times are stored in UTC and shown in the visitor's own zone, and the list is
// filtered to calls that have not finished yet. Both of those answers differ
// between the machine that built the page and the machine reading it, so doing
// either during the server render would produce markup React then has to throw
// away — a hydration mismatch. The heading and copy render normally; only the
// table waits for mount.

const LOCALE = "en-GB";

// Fallback description, used only if an event somehow arrives without one.
// Normally the Google and Outlook links carry the calendar item's own
// description — which is a generic public message by design, the bespoke
// invitation text living in the campaign's email body instead.
const CALENDAR_NOTE = "45B Web3 Workshops";

// The language a session is *held* in, which is not the language the page is
// read in: #4 (EN) and #5 (PT) run in parallel at different times, so a
// visitor needs to see which is which. Blank when the exporter could not tell
// — better no badge than a confident wrong one.
const sessionLangLabels = { en: "EN", pt: "PT", es: "ES", fr: "FR" };

function formatWhen(event) {
  const start = new Date(event.start);
  const end = new Date(event.end);

  const day = new Intl.DateTimeFormat(LOCALE, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(start);

  const time = new Intl.DateTimeFormat(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    day,
    time: time.format(start) + "–" + time.format(end),
    zone: localZoneLabel(start),
  };
}

/**
 * "WEST · Lisbon" — the official abbreviation plus the city it refers to.
 *
 * An abbreviation on its own ("WEST", "GMT+1", "CEST") tells most people
 * nothing about whether it is *their* zone. The city does, and it costs
 * nothing to find: the IANA zone id the browser reports is already named
 * after its reference city — Europe/Lisbon, Africa/Lagos,
 * America/Argentina/Buenos_Aires. Take the last segment and un-underscore it.
 *
 * Zones with no city in them (UTC, GMT) fall back to the abbreviation alone.
 */
function localZoneLabel(date) {
  const part = new Intl.DateTimeFormat(LOCALE, {
    timeZoneName: "short",
    hour: "2-digit",
  })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName");
  const abbr = part ? part.value : "";

  let city = "";
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (zone.includes("/")) {
      city = zone.split("/").pop().replace(/_/g, " ");
    }
  } catch (err) {
    city = "";                     // never let a label break the table
  }

  if (!abbr) return city;
  return city && city !== abbr ? abbr + " · " + city : abbr;
}

function isToday(event) {
  const start = new Date(event.start);
  const now = new Date();
  return (
    start.getFullYear() === now.getFullYear() &&
    start.getMonth() === now.getMonth() &&
    start.getDate() === now.getDate()
  );
}

export default function UpcomingCallsSection() {
  // Nothing time-dependent is rendered until this flips — see the note above.
  const [mounted, setMounted] = useState(false);
  // The live schedule, or null while it is in flight and for good if it never
  // arrives. Null is the signal to stay on the baked snapshot.
  const [remote, setRemote] = useState(null);

  useEffect(() => {
    setMounted(true);

    // Aborted rather than left hanging: on a slow connection this should give
    // up and let the baked copy stand rather than holding an empty table open.
    const stop = new AbortController();
    const timer = setTimeout(() => stop.abort(), 8000);

    fetch(FEED_URL, { signal: stop.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.events)) setRemote(data.events);
      })
      // Deliberately silent. A visitor cannot act on "the schedule endpoint is
      // down", and the fallback below means they still see a schedule.
      .catch(() => {})
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      stop.abort();
    };
  }, []);

  // True once the page is showing the host's answer rather than the snapshot.
  // The .ics button needs to know: live rows are fetched from the mailer by
  // UID, snapshot rows carry their own copy of the file.
  const live = remote !== null;

  const events = useMemo(() => {
    if (!mounted) return [];
    const now = Date.now();
    const source = remote || eventsData.events || [];
    // A call that has started but not finished is still worth showing: a
    // visitor can join late. It drops off the list at its end time.
    return source
      .filter((event) => new Date(event.end).getTime() >= now)
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [mounted, remote]);

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Makes /web3#upcoming land here, including on a cold load — Divider
            owns the anchor, the header offset and the smooth scroll, the same
            way #people and #apply do. It sits inside the container rather than
            between the two sections so its spacer falls inside this band
            instead of opening a seam against the gradient above. */}
        <Divider id={"upcoming"} />

        <LanguagePanel variant="light" showSelector={false}>
          <h2 className={styles.heading}>Upcoming calls</h2>
          <p className={styles.intro}>
            Live sessions from the cohorts running now. Times are shown in your
            own time zone.
          </p>

          {!mounted ? (
            <p className={styles.placeholder}>Loading the schedule…</p>
          ) : events.length === 0 ? (
            <p className={styles.placeholder}>
              No calls are scheduled right now.{" "}
              {/* Up to the Apply to Join button rather than out to the form:
                  the modal it opens is where the live-vs-async choice gets
                  explained, and sending someone straight to Airtable skips
                  that. #apply is the Divider anchor above ApplyButton, which
                  owns the smooth scroll. */}
              <a className={styles.emptyLink} href="#apply">
                Apply to join
              </a>{" "}
              and you will be invited to the next one.
            </p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Session</th>
                    <th scope="col">When</th>
                    <th scope="col">Add to calendar</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => {
                    const when = formatWhen(event);
                    const sessionLang = sessionLangLabels[event.lang];
                    return (
                      <tr key={event.uid}>
                        <td data-label="Session">
                          <span className={styles.title}>{event.title}</span>
                          {sessionLang ? (
                            <span className={styles.langBadge}>
                              {sessionLang}
                            </span>
                          ) : null}
                        </td>

                        <td data-label="When">
                          <span className={styles.day}>
                            {isToday(event) ? (
                              <span className={styles.todayBadge}>Today</span>
                            ) : null}
                            {when.day}
                          </span>
                          <span className={styles.time}>
                            {when.time}
                            {when.zone ? (
                              <span className={styles.zone}> {when.zone}</span>
                            ) : null}
                          </span>
                        </td>

                        <td data-label="Add to calendar">
                          <div
                            className={styles.buttonRow}
                            role="group"
                            aria-label={"Add " + event.title + " to your calendar"}
                          >
                            <a
                              className={clsx("button", styles.calButton)}
                              href={googleUrl(event, CALENDAR_NOTE)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Google
                            </a>
                            <a
                              className={clsx("button", styles.calButton)}
                              href={outlookUrl(event, CALENDAR_NOTE)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Outlook
                            </a>
                            {/* The real invitation, served untouched. Two
                                routes to the same file: a live row fetches it
                                from the mailer by UID, which is same-origin so
                                `download` is honoured; a row from the baked
                                snapshot carries its own copy and is handed over
                                as a Blob. Absent only if an event reaches the
                                page with neither, in which case offering a
                                rebuilt file would be worse than offering
                                none. */}
                            {live && event.uid ? (
                              <a
                                className={clsx("button", styles.calButton)}
                                href={icsUrl(event)}
                                download
                              >
                                Invite (.ics)
                              </a>
                            ) : event.ics ? (
                              <button
                                type="button"
                                className={clsx("button", styles.calButton)}
                                onClick={() =>
                                  downloadIcs(
                                    event.ics,
                                    (event.campaign || "45b-session") + ".ics"
                                  )
                                }
                              >
                                Invite (.ics)
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </LanguagePanel>
      </div>
    </section>
  );
}
