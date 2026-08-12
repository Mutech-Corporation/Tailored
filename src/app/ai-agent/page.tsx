import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Bot,
  Calendar,
  Headset,
  MessagesSquare,
  Phone,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppIcon } from "@/components/ai-agent/icons";
import { ServiceCard, type ServiceCardData } from "@/components/ai-agent/ServiceCard";
import { BenefitCard, type BenefitCardData } from "@/components/ai-agent/BenefitCard";
import { IndustryAgentCard, type IndustryAgentCardData } from "@/components/ai-agent/IndustryAgentCard";
import { NetworkDiagram } from "@/components/ai-agent/NetworkDiagram";
import { FaqAccordion } from "@/components/ai-agent/FaqAccordion";
import { AI_FAQS } from "@/data/ai-agent";

export const metadata: Metadata = {
  title: "Top AI Agent Development Company | Design Centura",
  description:
    "Transform your business with cutting-edge AI solutions that automate workflows, enhance customer experiences, and drive measurable results around the clock.",
};

const SERVICES: ServiceCardData[] = [
  {
    variant: "green",
    icon: WhatsAppIcon,
    phoneLabel: "AI Assistant",
    title: "WhatsApp AI Agent",
    messages: [
      { text: "Hello! How can I help?" },
      { text: "I need support", fromUser: true },
      { text: "I'm here to assist you..." },
    ],
    description:
      "Responds instantly using your live knowledge base, so your team isn't stuck replying to repetitive queries. Identifies upgrade or cross-sell opportunities from ticket patterns. Reduces human ticket volume and increases qualified conversions through automated conversations.",
  },
  {
    variant: "purple",
    icon: Calendar,
    phoneLabel: "AI Scheduler",
    title: "Calendly AI Agent",
    messages: [
      { text: "Schedule your appointment" },
      { text: "Book meeting", fromUser: true },
      { text: "Available slots found..." },
    ],
    description:
      "Embeds Calendly booking links directly into AI conversations. Triggers after product inquiries, support needs, or sales interest. Syncs with CRMs to confirm meetings instantly and reduce friction.",
  },
  {
    variant: "yellow",
    icon: TrendingUp,
    phoneLabel: "AI Analytics",
    title: "HubSpot AI Agent",
    messages: [
      { text: "Your analytics report" },
      { text: "Show insights", fromUser: true },
      { text: "Generating insights..." },
    ],
    description:
      "Captures and syncs lead data from chats directly into HubSpot. Automates follow-ups with workflows for sales and support teams. Provides real-time insights to boost conversions and customer retention.",
  },
  {
    variant: "blue",
    icon: ShoppingCart,
    phoneLabel: "AI Shopping",
    title: "Shopify AI Agent",
    messages: [
      { text: "Find products easily" },
      { text: "Show products", fromUser: true },
      { text: "Here are recommendations..." },
    ],
    description:
      "Handles product, order, refund, and shipping queries instantly by pulling live data from your store. Detects customer drop-offs and friction points in the purchase journey. Increases checkout completion rates and improves retention through faster, smarter post-sale support.",
  },
];

const BENEFITS: BenefitCardData[] = [
  {
    title: "1. Customer Support AI Agent",
    description: "Highlight efficiency, cost savings, and service quality improvements.",
    stats: [
      { value: "35%", label: "Reduces Support Costs" },
      { value: "60%", label: "Resolve Issues Faster" },
    ],
  },
  {
    title: "2. Lead Capture AI Agent",
    description: "Emphasize conversion, qualification speed, and lead pipeline growth.",
    stats: [
      { value: "52%", label: "Increase Lead Conversions" },
      { value: "3x", label: "Faster Quality Leads" },
    ],
  },
  {
    title: "3. Sales AI Agent",
    description: "Focus on revenue acceleration, efficiency, and buyer experience.",
    stats: [
      { value: "40%", label: "Increase Sales Productivity" },
      { value: "3.5x", label: "ROI Deliver Within a Year" },
    ],
  },
];

const INDUSTRIES: IndustryAgentCardData[] = [
  {
    bg: "yellow",
    icon: Headset,
    phoneTitle: "Customer Support Agent",
    messages: [
      {
        avatarLetter: "S",
        name: "Sophie",
        text: "Hi! I'm here to assist you. Please tell me what went wrong so I can help.",
        time: "02:00 PM",
      },
      {
        fromUser: true,
        text: "Your delivery team arrived late and damaged the package. I'm quite upset.",
        time: "02:10 PM",
      },
    ],
    cardTitle: "Healthcare AI Agent",
    features: [
      "Manages patient inquiries and appointment scheduling.",
      "Provides instant medical info from approved knowledge bases.",
      "Reduces staff workload while improving patient experience.",
    ],
  },
  {
    bg: "green",
    icon: Phone,
    phoneTitle: "Call Log Assistant",
    messages: [
      {
        avatarLetter: "A",
        name: "Amelia",
        text: "Hi! Just checking in — would you like a summary of your last support call?",
      },
      {
        fromUser: true,
        text: "Yes please. I need a copy of the conversation for my records.",
        time: "05:16 PM",
      },
    ],
    cardTitle: "Customer Service AI Agent",
    features: [
      "Resolves FAQs instantly across multiple channels.",
      "Escalates complex issues with full context.",
      "Reduces ticket volume and boosts satisfaction.",
    ],
  },
  {
    bg: "yellow",
    icon: MessagesSquare,
    phoneTitle: "Feedback Facilitator",
    messages: [
      {
        avatarLetter: "A",
        name: "Ava",
        text: "Thanks for reaching out earlier. Were you satisfied with the support you received?",
        time: "10:39 PM",
      },
      {
        fromUser: true,
        text: "Yes, the issue was resolved quickly. Great support team!",
        time: "10:10 PM",
      },
    ],
    cardTitle: "AI Agent for Education",
    features: [
      "Answers student questions and provides learning resources.",
      "Assists with scheduling and exam reminders.",
      "Supports teachers with grading and feedback automation.",
    ],
  },
];

/** `.section-eyebrow` + `.section-title` + `.text-muted` header trio, shared
 *  by the services/benefits/industry/network sections (all four use the same
 *  three-tier h2 sizing forced by the page's own `!important` overrides). */
function SectionIntro({
  eyebrow,
  title,
  subtitle,
  widthClass = "",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  widthClass?: string;
}) {
  return (
    <div className={`mx-auto mb-12 w-full text-center ${widthClass}`}>
      <p className="dc-eyebrow">{eyebrow}</p>
      <h2 className="mb-4 text-[1.75rem] font-semibold text-[#1b1b1b] sm:text-[2.25rem] lg:text-[2.8rem]">
        {title}
      </h2>
      <p className="mx-auto max-w-[700px] text-[rgba(33,37,41,0.75)]">{subtitle}</p>
    </div>
  );
}

/**
 * ai-agent.php.
 *
 * Note: `.ai-workflow-section` is wrapped in HTML comments upstream and never
 * renders, so it is not reproduced. Live section order: hero, services,
 * benefits, industry, network (desktop mesh + mobile triangle), FAQ.
 */
export default function AiAgentPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section
          id="ai-hero"
          className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#02142e_100%)] pt-[6.2rem] pb-8 text-white md:pt-[100px] md:pb-20 lg:pt-[120px] lg:pb-[100px]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,42,64,0.1)_0%,transparent_70%)]"
          />
          <div className="dc-container relative">
            <div className="mx-auto max-w-[820px] text-center">
              <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-[rgba(148,163,184,0.6)] bg-white/12 px-[0.9rem] py-[0.3rem] text-[0.75rem] font-medium text-[#e5e7eb]">
                <Bot className="size-4" />
                <span>AI Service Platform</span>
              </div>
              <h1 className="mb-4 text-[2rem] leading-[1.2] font-semibold sm:text-[2.5rem] lg:text-[2.8rem]">
                Intelligent AI Services That Work 24/7.
                <br />
                <span className="text-dc-accent">Learn. Adapt. Deliver Results.</span>
              </h1>
              <p className="mx-auto mb-6 max-w-[700px] px-4 text-[1rem] text-white/90 sm:px-0 sm:text-[1.1rem] lg:text-[1.25rem]">
                Transform your business with cutting-edge AI solutions that
                automate workflows, enhance customer experiences, and drive
                measurable results around the clock.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
                <a
                  href="/contact"
                  className="flex w-full max-w-[300px] items-center justify-center rounded-full bg-[#196bff] px-6 py-3 text-[0.95rem] font-semibold text-white transition-all duration-200 ease-in-out hover:-translate-y-px sm:w-auto sm:max-w-none sm:px-[1.6rem] sm:py-[0.65rem] sm:text-base"
                >
                  Get Started with AI Services
                  <ArrowRight className="ml-2 size-4" />
                </a>
                <a
                  href="#ai-features"
                  className="flex w-full max-w-[300px] items-center justify-center rounded-full border border-[#196bff] px-6 py-3 text-[0.95rem] font-semibold text-white transition-all duration-200 ease-in-out hover:-translate-y-px hover:bg-[#196bff] sm:w-auto sm:max-w-none sm:px-[1.6rem] sm:py-[0.65rem] sm:text-base"
                >
                  Explore Our Solutions
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="ai-features" className="py-[50px] sm:py-[70px]">
          <div className="dc-container">
            <SectionIntro
              eyebrow="What Our AI Services Do"
              title={
                <>
                  AI That&rsquo;s <span className="text-dc-blue">Actually Operational</span>
                </>
              }
              subtitle="Our AI services plug directly into your business, no-code, real-time, and trained on your systems. From handling customer support to qualifying leads or syncing bookings, our AI agents act like full-time staff across multiple platforms."
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section id="ai-benefits" className="bg-[#f7f9fb] py-[50px] sm:py-[70px]">
          <div className="dc-container">
            <SectionIntro
              widthClass="md:w-2/3"
              eyebrow="Benefits"
              title={
                <>
                  Our AI Services Come With{" "}
                  <span className="text-dc-blue">Tremendous Benefits</span>
                </>
              }
              subtitle="Deploy AI services to streamline operations and amplify your business's efficiency. These services optimize processes, reduce delays, and enhance output, ensuring you gain a competitive edge with speed and precision."
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {BENEFITS.map((benefit) => (
                <BenefitCard key={benefit.title} {...benefit} />
              ))}
            </div>
          </div>
        </section>

        <section id="ai-industry" className="py-[50px] sm:py-[70px]">
          <div className="dc-container">
            <SectionIntro
              eyebrow="Solutions"
              title={
                <>
                  AI Agents Built for <span className="text-dc-blue">Every Business Need</span>
                </>
              }
              subtitle="Our agents don't just reply, they adapt to your industry and workflow. Whether in healthcare, customer service, or education, our AI agents integrate seamlessly into your operations to deliver speed, scale, and efficiency."
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {INDUSTRIES.map((industry) => (
                <IndustryAgentCard key={industry.cardTitle} {...industry} />
              ))}
            </div>
          </div>
        </section>

        <section id="ai-network" className="bg-[#f7f9fb] py-[50px] sm:py-[70px]">
          <div className="dc-container">
            <SectionIntro
              eyebrow="Agent OS"
              title={
                <>
                  Autonomous Doesn&rsquo;t Mean <span className="text-dc-blue">Isolated</span>
                </>
              }
              subtitle="Your AI agents share signals, escalate across channels, and optimize workflows together. Think of it as a mesh network of AI, tailored to your business."
            />

            <NetworkDiagram />
          </div>
        </section>

        <section className="faqs-sec py-[4.5rem]" id="faqs-sec">
          <div className="dc-container">
            <div className="mx-auto mb-8 w-full text-center lg:w-3/4">
              <p className="dc-eyebrow">FAQs</p>
              <h2 className="dc-section-title">
                Frequently Asked <span className="text-dc-blue">Questions</span>
              </h2>
              <p className="dc-section-subtitle">
                Here are some common questions users ask about our AI Automation Agents.
              </p>
            </div>

            <FaqAccordion items={AI_FAQS} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
