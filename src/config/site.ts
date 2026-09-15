/**
 * Business details used across the site. Edit `site.json` (next to this file)
 * to change the company name, phone, emails, address or social links; nothing
 * else needs to be touched.
 */
import site from "./site.json";

export const SITE = site;

/** `tel:` href from a human-formatted phone number. */
export const phoneHref = (phone: string = SITE.contact.phone) =>
  `tel:${phone.replace(/[^\d+]/g, "")}`;

export const mailHref = (email: string = SITE.contact.email) => `mailto:${email}`;
