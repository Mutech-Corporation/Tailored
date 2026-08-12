import type { ComponentType } from "react";

export interface AgentChatMessage {
  fromUser?: boolean;
  /** Agent messages show a single-letter avatar + name; user messages don't. */
  avatarLetter?: string;
  name?: string;
  text: string;
  time?: string;
}

export interface IndustryAgentCardData {
  bg: "yellow" | "green";
  icon: ComponentType<{ className?: string }>;
  phoneTitle: string;
  messages: AgentChatMessage[];
  cardTitle: string;
  features: string[];
}

const BG: Record<"yellow" | "green", string> = {
  yellow: "bg-[linear-gradient(135deg,#fef3c7_0%,#fde68a_100%)]",
  green: "bg-[linear-gradient(135deg,#d1fae5_0%,#a7f3d0_100%)]",
};

/** `.industry-agent-card` — visual phone mockup on top, feature list below. */
export function IndustryAgentCard({ bg, icon: Icon, phoneTitle, messages, cardTitle, features }: IndustryAgentCardData) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#dfe3e8] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#196bff] hover:shadow-[0_12px_30px_rgba(255,42,64,0.15)]">
      <div
        className={`flex min-h-[240px] items-center justify-center px-3 py-5 sm:min-h-[260px] sm:px-4 sm:py-6 lg:min-h-[300px] lg:px-6 lg:py-8 ${BG[bg]}`}
      >
        <div className="flex w-full justify-center">
          <div className="flex min-h-[220px] w-full flex-col rounded-[20px] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.15)] sm:min-h-[240px] lg:min-h-[280px]">
            <div className="mb-3 flex items-center justify-between border-b border-[#e5e7eb] pb-3">
              <div className="flex items-center gap-2 text-[0.85rem] font-semibold text-[#1b1b1b]">
                <Icon className="size-[1rem] text-[#196bff]" />
                <span>{phoneTitle}</span>
              </div>
              <div className="rounded-xl bg-[#10b981] px-2 py-1 text-[0.7rem] font-semibold text-white">
                Online
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
              <div className="py-2 text-center text-[0.75rem] font-semibold text-[#10b981]">
                Connected to AI Agent
              </div>

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${m.fromUser ? "flex-row-reverse" : ""}`}
                >
                  {!m.fromUser && (
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#196bff] text-[0.75rem] font-bold text-white">
                      {m.avatarLetter}
                    </div>
                  )}
                  <div className="max-w-[80%] flex-1">
                    {!m.fromUser && m.name && (
                      <div className="mb-1 text-[0.75rem] font-semibold text-[#1b1b1b]">{m.name}</div>
                    )}
                    <div
                      className={`rounded-xl px-[0.8rem] py-[0.6rem] text-[0.75rem] leading-[1.4] ${
                        m.fromUser ? "bg-[#196bff] text-white" : "bg-[#f3f4f6] text-[#1b1b1b]"
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.time && (
                      <div
                        className={`mt-1 text-[0.65rem] text-[#666666] ${
                          m.fromUser ? "pr-2 text-right" : "pl-2"
                        }`}
                      >
                        {m.time}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6">
        <h3 className="mb-4 text-[1.25rem] font-bold text-[#1b1b1b] max-[575.98px]:text-[1.1rem]">
          {cardTitle}
        </h3>
        <ul className="list-none p-0">
          {features.map((feature) => (
            <li
              key={feature}
              className="mb-3 flex items-start gap-3 text-[0.9rem] leading-[1.5] text-[#666666] last:mb-0 max-[575.98px]:text-[0.85rem]"
            >
              <span className="mt-[0.55rem] size-[0.5rem] shrink-0 rounded-full bg-[#196bff]" />
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
