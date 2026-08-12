import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  LegalDivider,
  LegalHeading,
  LegalList,
  LegalNote,
  LegalPage,
  LegalSubheading,
  LegalText,
} from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Design Centura – Logo, Branding & Web",
  description:
    "This Privacy Policy explains how Design Centura collects, uses and protects your information when you visit our website or use our services.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <LegalPage
          eyebrow="Privacy"
          title="Privacy Policy"
          intro="This Privacy Policy explains how Design Centura collects, uses and protects your information when you visit our website or use our services. By continuing to use our site, you agree to the practices described below."
        >
          <LegalHeading>Information We Collect</LegalHeading>

          <LegalSubheading>Automatically Collected Information</LegalSubheading>
          <LegalText>When you visit our website, we automatically collect:</LegalText>
          <LegalList>
            <li>IP address and location data</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Language preferences</li>
            <li>Access times and duration</li>
            <li>Pages viewed and actions taken on our site</li>
          </LegalList>

          <LegalSubheading>Information You Provide</LegalSubheading>
          <LegalText>
            During account creation and service use, we collect:
          </LegalText>
          <LegalList>
            <li>Full name and contact information</li>
            <li>Email address and phone number</li>
            <li>Billing address (home or work)</li>
            <li>Payment information (credit card or banking details)</li>
            <li>Communication preferences</li>
          </LegalList>

          <LegalDivider />

          <LegalSubheading>How We Use Your Information</LegalSubheading>
          <LegalText>We use your information to:</LegalText>
          <LegalList>
            <li>Process orders and deliver services</li>
            <li>Send important account notifications and updates</li>
            <li>
              Share special offers, promotions, and blog content (you can opt out
              anytime)
            </li>
            <li>Improve our services and user experience</li>
            <li>Prevent fraud and maintain security</li>
            <li>Comply with legal obligations</li>
          </LegalList>
          <LegalNote>
            We never sell, rent, or share your personal information with third
            parties for marketing purposes.
          </LegalNote>

          <LegalDivider />

          <LegalSubheading>Email Communications</LegalSubheading>
          <LegalText>You&apos;ll receive emails from us regarding:</LegalText>
          <LegalList>
            <li>Order confirmations and updates</li>
            <li>Account security notifications</li>
            <li>Service announcements</li>
            <li>Special offers and promotions (optional)</li>
            <li>Blog posts and company news (optional)</li>
          </LegalList>
          <LegalNote>
            Unsubscribe anytime by clicking the link at the bottom of any email or
            updating your preferences in your account settings.
          </LegalNote>

          <LegalDivider />

          <LegalSubheading>Data Security</LegalSubheading>
          <LegalText>
            Your trust matters to us. We protect your information through:
          </LegalText>
          <LegalList>
            <li>Industry-standard encryption (SSL/TLS)</li>
            <li>Secure, PCI-compliant payment processing</li>
            <li>Regular security audits and updates</li>
            <li>Restricted employee access to sensitive data</li>
            <li>Continuous monitoring for vulnerabilities</li>
          </LegalList>
          <LegalNote>
            Important: Design Centura employees will never ask you to share credit
            card details via email, phone, or chat. If someone does, do not comply
            and report it to us immediately at security@designcentura.com.
          </LegalNote>

          <LegalDivider />

          <LegalSubheading>Your Rights and Choices</LegalSubheading>
          <LegalText>You have the right to:</LegalText>
          <LegalList>
            <li>Access your personal information at any time</li>
            <li>Update or correct your account details</li>
            <li>Delete your account and associated data</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of your data</li>
          </LegalList>
          <LegalNote>
            Manage your information through your account dashboard or contact us at
            privacy@designcentura.com.
          </LegalNote>

          <LegalDivider />

          <LegalSubheading>Special Policies</LegalSubheading>
          <LegalText>Children&apos;s Privacy</LegalText>
          <LegalText>
            Our services are not intended for anyone under 13 years of age. We do
            not knowingly collect information from children under 13. If we
            discover such data has been collected, we will delete it immediately.
          </LegalText>
          <LegalText>Third-Party Links</LegalText>
          <LegalText>
            Our website may contain links to external sites. We are not responsible
            for the privacy practices of these third-party sites. We encourage you
            to review their privacy policies before sharing any information.
          </LegalText>
          <LegalText>Testimonials</LegalText>
          <LegalText>
            We feature customer testimonials with your permission. If you&apos;d
            like to modify or remove your testimonial, contact us at
            support@designcentura.com.
          </LegalText>
          <LegalText>Pseudonym Policy</LegalText>
          <LegalText>
            For consistency and ease of communication, our team may use
            professional pseudonyms. This practice:
          </LegalText>
          <LegalList>
            <li>Provides you with a consistent point of contact</li>
            <li>Presents a unified company culture</li>
            <li>Protects employee privacy across our global team</li>
          </LegalList>
          <LegalText>
            All team members, regardless of name used, are bound by strict
            confidentiality agreements.
          </LegalText>

          <LegalDivider />

          <LegalSubheading>International Operations</LegalSubheading>
          <LegalText>
            Your project may be handled by team members at any of our global
            service centers. All locations adhere to this privacy policy and
            maintain the same security standards through binding non-disclosure
            agreements.
          </LegalText>

          <LegalDivider />

          <LegalSubheading>Legal Disclosures</LegalSubheading>
          <LegalText>
            We may disclose your information when required to:
          </LegalText>
          <LegalList>
            <li>Comply with legal obligations or court orders</li>
            <li>Cooperate with law enforcement investigations</li>
            <li>Protect our rights, property, or safety</li>
            <li>Prevent fraud or abuse of our services</li>
          </LegalList>

          <LegalDivider />

          <LegalSubheading>Policy Updates</LegalSubheading>
          <LegalText>
            We may update this privacy policy periodically to reflect changes in
            our practices or legal requirements. When we make significant changes,
            we will:
          </LegalText>
          <LegalList>
            <li>Notify you via email</li>
            <li>Post an update in your account dashboard</li>
            <li>
              Update the &ldquo;Last Updated&rdquo; date at the top of this page
            </li>
          </LegalList>
          <LegalText>
            Your continued use of our services after changes are posted constitutes
            acceptance of the updated policy.
          </LegalText>

          <LegalDivider />

          {/* The target's list genuinely ends after this single item. */}
          <LegalSubheading>Consumer Data Protection</LegalSubheading>
          <LegalText>We comply with:</LegalText>
          <LegalList>
            <li>PCI DSS (Payment Card Industry Data Security Standards)</li>
          </LegalList>
        </LegalPage>
      </main>
      <SiteFooter />
    </>
  );
}
