/**
 * Principal consultant (Mr. Sunnil Jha) — published years of experience.
 * Shows 39 until the first milestone, then increases by 1 on every 11 December.
 *
 * First increment: 11 December 2026 → 40 years (then 41 on 11 Dec 2027, etc.).
 * Uses the visitor’s local calendar date.
 */
const BASE_YEARS = 39;
const FIRST_INCREMENT_YEAR = 2026; // Dec 11 of this year is the first +1

export function getPrincipalExperienceYears(now = new Date()) {
  let extra = 0;
  const endY = now.getFullYear();
  for (let y = FIRST_INCREMENT_YEAR; y <= endY; y++) {
    const dec11 = new Date(y, 11, 11);
    if (now >= dec11) extra++;
  }
  return BASE_YEARS + extra;
}

/** e.g. "39+" for stat cards */
export function getPrincipalExperiencePlusLabel(now = new Date()) {
  return `${getPrincipalExperienceYears(now)}+`;
}
