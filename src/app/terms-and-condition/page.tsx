import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  LegalDivider,
  LegalHeading,
  LegalHighlight,
  LegalList,
  LegalNote,
  LegalPage,
  LegalSubheading,
  LegalText,
} from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Design Centura – Logo, Branding & Web",
  description:
    "These terms explain how we provide our design and digital services, how payments and deliveries work, and in which cases refunds may be considered.",
};

export default function TermsAndConditionPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <LegalPage
          eyebrow="Legal"
          title="Terms & Conditions"
          intro="These terms explain how we provide our design and digital services, how payments and deliveries work, and in which cases refunds may be considered. By placing an order or using our services, you agree to follow the terms listed on this page."
        >
          <LegalHeading>1. Delivery Policy</LegalHeading>

          <LegalSubheading>Delivery Timeline</LegalSubheading>
          <LegalList>
            <li>
              All services are delivered according to your purchased package or
              signed agreement
            </li>
            <li>
              Turnaround times vary based on:
              <LegalList>
                <li>Service complexity and scope</li>
                <li>Speed of your feedback and information sharing</li>
                <li>Order date and current project queue</li>
                <li>Accuracy of initial requirements</li>
              </LegalList>
            </li>
          </LegalList>

          <LegalSubheading>What Counts as &ldquo;Delivered&rdquo;</LegalSubheading>
          <LegalText>A service is considered delivered when:</LegalText>
          <LegalList>
            <li>All agreed deliverables are completed per the project scope</li>
            <li>Final files are shared with you in the specified formats</li>
            <li>Work meets the standards outlined in your agreement</li>
          </LegalList>

          <LegalSubheading>Cancellations Before Delivery</LegalSubheading>
          <LegalText>
            If you cancel before delivery is complete, refund eligibility depends
            on:
          </LegalText>
          <LegalList>
            <li>How much work has been completed</li>
            <li>Terms specified in your signed agreement or package</li>
            <li>Our standard refund policy (see Section 3 below)</li>
          </LegalList>

          <LegalDivider />

          <LegalHeading>2. Payment Policy</LegalHeading>

          <LegalSubheading>Monthly Packages</LegalSubheading>
          <LegalList>
            <li>Full payment required in advance before work begins</li>
            <li>
              Recurring services are billed monthly in advance unless otherwise
              agreed in writing
            </li>
            <li>
              Services may be paused or terminated immediately if invoices are not
              paid by the due date
            </li>
          </LegalList>

          <LegalSubheading>Pricing &amp; Invoicing</LegalSubheading>
          <LegalList>
            <li>All quoted prices are exclusive of VAT and applicable taxes</li>
            <li>
              Taxes will be added to invoices at the correct rate where required
            </li>
            <li>
              Cost estimates in quotations are indicative and subject to final
              confirmation after reviewing full requirements
            </li>
          </LegalList>

          <LegalSubheading>Additional Work &amp; Rate Changes</LegalSubheading>
          <LegalList>
            <li>
              Add-on services: Work outside your original quotation (extra design,
              development, or third-party services) will be charged separately
              according to our current rate card
            </li>
            <li>
              Rate reviews: We may update our hourly or package rates once per
              twelve-month period maximum
            </li>
            <li>
              Price increase notice: You&apos;ll receive at least one (1)
              month&apos;s advance notice of any rate changes
            </li>
            <li>
              Your options: If you don&rsquo;t accept new rates, you may terminate
              the contract by providing three (3) months&rsquo; written notice
              within two (2) weeks of receiving the price-change notification
            </li>
          </LegalList>

          <LegalSubheading>Late Payments</LegalSubheading>
          <LegalList>
            <li>
              Interest may be charged in accordance with applicable late-payment
              legislation, calculated daily until paid in full
            </li>
            <li>All services may be temporarily suspended</li>
            <li>
              Time for payment is a material condition; all outstanding amounts
              become immediately due if the agreement is terminated
            </li>
            <li>
              We may offset any amounts you owe against any amounts we owe you,
              where legally permitted
            </li>
          </LegalList>

          <LegalDivider />

          <LegalHeading>3. Refund Policy</LegalHeading>
          <LegalText>
            Refund requests are evaluated case-by-case within three (3) months
            from purchase date.
          </LegalText>

          <LegalSubheading>3.1 When Refunds May Be Approved</LegalSubheading>
          <LegalText>
            We may consider refunds in these specific situations:
          </LegalText>
          <LegalList>
            <li>
              Copyright/Trademark Issues: The delivered logo is proven to be copied
              or infringes existing intellectual property
            </li>
            <li>
              Material Defects: The final design is materially defective or
              significantly different from what was agreed or advertised
            </li>
            <li>
              Duplicate Orders: You accidentally placed duplicate orders for the
              same service
            </li>
          </LegalList>
          <LegalHighlight>
            Quality Review Required: All refund requests undergo internal quality
            assurance review. If our team confirms the design is defective or
            unusable as promised, up to 100% of the project fee may be refunded in
            qualifying scenarios.
          </LegalHighlight>

          <LegalSubheading>3.2 Refund Timeline &amp; Amounts</LegalSubheading>
          <LegalList>
            <li>
              Before initial concepts delivered: 100% refund minus 10% processing
              fee
            </li>
            <li>
              Within 48 hours after receiving initial concepts: Up to 66% refund
              minus 10% processing fee
            </li>
            <li>
              Between 48&ndash;120 hours after initial delivery: Up to 33% refund
              minus 10% processing fee
            </li>
            <li>After 120 hours: Generally not available*</li>
            <li>
              *After 120 hours, we encourage you to contact us to resolve concerns
              and improve the work rather than request a refund.
            </li>
          </LegalList>

          <LegalSubheading>3.3 Important Project Terms</LegalSubheading>
          <LegalText>Inactive Projects</LegalText>
          <LegalList>
            <li>
              If there&rsquo;s no communication from you for 14 consecutive days
              (except genuine emergencies), your project may be placed on hold and
              archived
            </li>
            <li>A $300 reactivation fee applies to restart archived projects</li>
          </LegalList>
          <LegalText>Concept Approval</LegalText>
          <LegalList>
            <li>
              Once you approve a concept and request revisions, the project enters
              the refinement stage
            </li>
            <li>Standard revision rights apply from this point</li>
            <li>Refund rights are normally voided after concept approval</li>
          </LegalList>

          <LegalSubheading>3.4 When Refunds Are NOT Available</LegalSubheading>
          <LegalText>
            We cannot offer refunds in the following situations:
          </LegalText>
          <LegalList>
            <li>✘ Change of mind after work has commenced</li>
            <li>
              ✘ Business decisions such as:
              <LegalList>
                <li>Investor backing out</li>
                <li>Business closure or restructuring</li>
                <li>Budget reallocation</li>
              </LegalList>
            </li>
            <li>✘ Hiring competitors while your project with us is active</li>
            <li>
              ✘ Contest participation using our concepts or ideas in logo contests
              or tournaments
            </li>
            <li>
              ✘ Copyright violations requesting us to directly copy another
              designer&rsquo;s work
            </li>
            <li>
              ✘ Brief-based work when design was created according to your
              submitted brief, form, or instructions
            </li>
            <li>
              ✘ Missing information when you fail to submit required briefs or
              questionnaires, causing delays or impacting outcomes
            </li>
          </LegalList>

          <LegalDivider />

          <LegalSubheading>Your Acceptance</LegalSubheading>
          <LegalText>
            By placing an order, making a payment, or using any Design Centura
            services, you confirm that you have read, understood, and agreed to
            these Terms &amp; Conditions.
          </LegalText>
          <LegalNote>
            We may update this policy from time to time. Continued use of our
            services after changes are posted constitutes acceptance of the updated
            terms.
          </LegalNote>
        </LegalPage>
      </main>
      <SiteFooter />
    </>
  );
}
