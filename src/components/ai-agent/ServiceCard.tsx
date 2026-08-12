import type { ComponentType } from "react";
import { ArrowRight, Bot } from "lucide-react";

export type ServiceVariant = "green" | "purple" | "yellow" | "blue";

export interface ServiceMessage {
  text: string;
  fromUser?: boolean;
}

export interface ServiceCardData {
  variant: ServiceVariant;
  icon: ComponentType<{ className?: string }>;
  /** Phone header label, e.g. "AI Assistant". */
  phoneLabel: string;
  title: string;
  messages: ServiceMessage[];
  description: string;
}

/** `.service-icon-*` / `.phone-*` gradients — identical per variant. */
const GRADIENT: Record<ServiceVariant, string> = {
  green: "bg-[linear-gradient(135deg,#25d366_0%,#128c7e_100%)]",
  purple: "bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)]",
  yellow: "bg-[linear-gradient(135deg,#fbbf24_0%,#f59e0b_100%)]",
  blue: "bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_100%)]",
};

/** `.ai-service-card` — one of four AI-services cards, each with a phone mockup. */
export function ServiceCard({ variant, icon: Icon, phoneLabel, title, messages, description }: ServiceCardData) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-[#dfe3e8] bg-white p-5 px-[1.25rem] shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-[#196bff] hover:shadow-[0_12px_30px_rgba(255,42,64,0.15)]">
      <div
        className={`mx-auto mb-3 flex h-[50px] w-[50px] items-center justify-center rounded-xl text-[1.5rem] text-white max-[575.98px]:h-[45px] max-[575.98px]:w-[45px] max-[575.98px]:text-[1.25rem] ${GRADIENT[variant]}`}
      >
        <Icon className="size-[1em]" />
      </div>

      <div className="my-2 flex min-h-[240px] flex-1 justify-center sm:min-h-[260px] lg:min-h-[280px]">
        <div className={`flex min-h-[240px] w-full flex-1 flex-col overflow-hidden rounded-[24px] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)] sm:min-h-[260px] lg:min-h-[280px] ${GRADIENT[variant]}`}>
          <div className="flex min-h-[210px] flex-1 flex-col rounded-2xl bg-white p-4 sm:min-h-[230px] lg:min-h-[250px]">
            <div className="mb-4 flex items-center gap-2 border-b border-[#e5e7eb] pb-3">
              <Bot className="size-[1.2rem] text-[#196bff]" />
              <span className="text-[0.9rem] font-semibold text-[#1b1b1b]">{phoneLabel}</span>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {messages.map((m) => (
                <div
                  key={m.text}
                  className={`max-w-[85%] rounded-xl px-[0.8rem] py-[0.6rem] text-[0.8rem] leading-[1.4] max-[575.98px]:text-[0.75rem] ${
                    m.fromUser
                      ? "ml-auto self-end bg-[#196bff] text-white"
                      : "bg-[#f3f4f6] text-[#1b1b1b]"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-2 mb-1 font-bold text-[#1b1b1b]">{title}</h3>
      <p className="flex-1 text-[0.9rem] leading-[1.6] text-[rgba(33,37,41,0.75)]">{description}</p>

      <a
        href="/contact"
        className="mt-2 flex w-full items-center justify-center rounded-full bg-[#196bff] px-[1.6rem] py-[0.65rem] text-[0.95rem] font-semibold text-white transition-all duration-200 ease-in-out hover:-translate-y-px"
      >
        Request Access
        <ArrowRight className="ml-2 size-[0.85em]" />
      </a>
    </div>
  );
}
