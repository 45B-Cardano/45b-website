//
// Add-to-calendar links for one event.
//
// There are two different things on offer here, and the difference matters:
//
//   .ics       The real invitation. Google's own VCALENDAR, exactly as it was
//              minted for the event and mailed out by 45b-mailer, with only
//              the attendee list removed. Same UID, same SEQUENCE, same
//              ORGANIZER, same reminders — so a calendar client treats it as
//              *that* event rather than a look-alike, and someone who is
//              later mailed the invitation properly gets an update in place
//              instead of a second copy sitting beside it.
//
//   Google /   Convenience links that pre-fill a "create event" form. They
//   Outlook    carry everything the URL format has a field for — title, start
//              and end, the event's own description, location and time zone —
//              but there is no field for a UID, so they always produce a
//              private copy unconnected to the original. Fine for "put it in
//              my diary"; it is the .ics that preserves identity.
//
// The .ics is built nowhere in this file. It arrives ready-made in the event
// data and is handed over untouched; rebuilding it is exactly what would
// destroy the fidelity above.

const PAGE_URL = "https://45b.io/web3";

// A URL that grows past what a browser or an intermediate proxy will carry
// fails silently — Google shows an empty form rather than an error. The
// calendar description is a short generic message by design, so this should
// never fire; it exists so that if one ever runs long, the visitor still gets
// a working event with a link to the full text instead of nothing.
const MAX_DETAILS = 2000;

function details(event, fallback, plain) {
  const source = (plain ? event.descriptionText : event.description) || fallback;
  let text =
    source.length > MAX_DETAILS ? source.slice(0, MAX_DETAILS) + "…" : source;
  // Only appended when the description does not already point back at the
  // page, so the usual case does not end up with the link twice.
  if (!text.includes("45b.io/web3")) {
    text += "\n\n" + PAGE_URL;
  }
  return text;
}

// "2026-09-12T14:00:00Z" -> "20260912T140000Z", the form the URL APIs want.
function stamp(iso) {
  return String(iso || "").replace(/[-:]/g, "").replace(/\.\d+/, "");
}

export function googleUrl(event, fallback) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: stamp(event.start) + "/" + stamp(event.end),
    // Google renders limited HTML here, which is the form Google itself wrote
    // the description in, so it goes over untouched.
    details: details(event, fallback, false),
  });
  if (event.location) params.set("location", event.location);
  // No `ctz`. Google's TEMPLATE URL expects EITHER UTC stamps ending in Z, as
  // used here, OR local stamps plus a ctz naming their zone — and mixing the
  // two is the standard way these links land an hour out. A guaranteed-correct
  // instant is worth more than the event carrying Europe/Lisbon as its display
  // zone, and the .ics preserves the real VTIMEZONE regardless.
  return "https://calendar.google.com/calendar/render?" + params.toString();
}

// outlook.live.com is the personal-account host; Office 365 accounts are
// bounced to outlook.office.com by Microsoft itself, so one link serves both.
export function outlookUrl(event, fallback) {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: event.start,
    enddt: event.end,
    // Plain text here, not HTML: Outlook shows the tags otherwise.
    body: details(event, fallback, true),
  });
  if (event.location) params.set("location", event.location);
  if (event.allDay) params.set("allday", "true");
  return "https://outlook.live.com/calendar/0/deeplink/compose?" + params.toString();
}

// A Blob rather than a data: URI — Safari refuses to download a data: URL
// opened from a link, and the file opens as text instead of importing.
export function downloadIcs(ics, filename) {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Revoked on the next tick: revoking synchronously can beat the download in
  // Firefox and produce an empty file.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
