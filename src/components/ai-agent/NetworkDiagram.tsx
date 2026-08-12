import type { ComponentType } from "react";
import {
  BriefcaseBusiness,
  DollarSign,
  HeartPulse,
  Headset,
  Truck,
  User,
  Users,
} from "lucide-react";

interface DesktopNode {
  key: string;
  /** Full literal Tailwind position string — `.node-{position}` from the source. */
  position: string;
  border: string;
  gradient: string;
  iconColor?: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}

const DESKTOP_NODES: DesktopNode[] = [
  {
    key: "left-top",
    position: "left-[25%] top-[12%] lg:top-[15%] -translate-x-1/2 -translate-y-1/2",
    border: "border-[#ef4444]",
    gradient: "bg-[linear-gradient(135deg,#ec4899_0%,#db2777_100%)]",
    icon: BriefcaseBusiness,
    label: "Sales Operation AI Agent",
  },
  {
    key: "left-middle",
    position: "left-[12%] lg:left-[15%] top-[55%] -translate-x-1/2 -translate-y-1/2",
    border: "border-[#fbbf24]",
    gradient: "bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_100%)]",
    icon: Headset,
    label: "Customer Service AI Agent",
  },
  {
    key: "left-bottom",
    position: "left-[30%] top-[88%] lg:top-[85%] -translate-x-1/2 -translate-y-1/2",
    border: "border-[#10b981]",
    gradient: "bg-[linear-gradient(135deg,#14b8a6_0%,#0d9488_100%)]",
    icon: Users,
    label: "Human Resources AI Agent",
  },
  {
    key: "center",
    position: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    border: "border-[#8b5cf6]",
    gradient: "bg-[linear-gradient(135deg,#10b981_0%,#059669_100%)]",
    icon: User,
    label: "Cameron Brooks",
  },
  {
    key: "right-top",
    position: "right-[25%] top-[12%] lg:top-[15%] translate-x-1/2 -translate-y-1/2",
    border: "border-[#fbbf24]",
    gradient: "bg-[linear-gradient(135deg,#fbbf24_0%,#f59e0b_100%)]",
    icon: HeartPulse,
    label: "Healthcare AI Agent",
  },
  {
    key: "right-middle",
    position: "right-[12%] lg:right-[15%] top-[55%] translate-x-1/2 -translate-y-1/2",
    border: "border-[#14b8a6]",
    gradient: "bg-[linear-gradient(135deg,#f3f4f6_0%,#e5e7eb_100%)]",
    iconColor: "text-[#1b1b1b]",
    icon: DollarSign,
    label: "Finance & Banking AI Agent",
  },
  {
    key: "right-bottom",
    position: "right-[28%] lg:right-[30%] top-[88%] lg:top-[85%] translate-x-1/2 -translate-y-1/2",
    border: "border-[#ef4444]",
    gradient: "bg-[linear-gradient(135deg,#ec4899_0%,#db2777_100%)]",
    icon: Truck,
    label: "Transportation AI Agent",
  },
];

interface MobileNode {
  key: string;
  position: string;
  border: string;
  gradient: string;
  initials: string;
  label: string;
}

const MOBILE_NODES: MobileNode[] = [
  {
    key: "top",
    position: "left-1/2 top-[3%] sm:top-[5%] -translate-x-1/2",
    border: "border-[#ec4899]",
    gradient: "bg-[linear-gradient(135deg,#ec4899_0%,#db2777_100%)]",
    initials: "ET",
    label: "Email Triage AI Agent",
  },
  {
    key: "bottom-left",
    position: "left-[20%] sm:left-[25%] bottom-[5%] -translate-x-1/2",
    border: "border-[#fbbf24]",
    gradient: "bg-[linear-gradient(135deg,#fbbf24_0%,#f59e0b_100%)]",
    initials: "OM",
    label: "Order Management AI Agent",
  },
  {
    key: "bottom-right",
    position: "right-[20%] sm:right-[25%] bottom-[5%] translate-x-1/2",
    border: "border-[#8b5cf6]",
    gradient: "bg-[linear-gradient(135deg,#8b5cf6_0%,#7c3aed_100%)]",
    initials: "SO",
    label: "Sales Operation AI Agent",
  },
];

/**
 * `.network-diagram` (desktop, absolutely positioned nodes + SVG connector
 * layer) and `.network-diagram-mobile` (triangular 3-node layout). The target
 * swaps between them at the `md` breakpoint via Bootstrap's `d-md-none` /
 * `d-none d-md-block`.
 */
export function NetworkDiagram() {
  return (
    <div className="relative py-12">
      {/* Desktop: absolutely positioned mesh, visible md and up. */}
      <div className="hidden md:block">
        <div className="relative flex min-h-[500px] w-full items-center justify-center lg:min-h-[600px]">
          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full md:max-[1366px]:left-1/2 md:max-[1366px]:max-w-[875px] md:max-[1366px]:-translate-x-1/2"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid meet"
          >
            <line x1="500" y1="275" x2="160" y2="50" stroke="#196bff" strokeWidth="2" strokeDasharray="6,4" opacity="0.4" />
            <line x1="500" y1="275" x2="50" y2="300" stroke="#196bff" strokeWidth="2" strokeDasharray="6,4" opacity="0.4" />
            <line x1="500" y1="275" x2="230" y2="510" stroke="#196bff" strokeWidth="2" strokeDasharray="6,4" opacity="0.4" />
            <line x1="500" y1="275" x2="840" y2="50" stroke="#196bff" strokeWidth="2" strokeDasharray="6,4" opacity="0.4" />
            <line x1="500" y1="275" x2="950" y2="300" stroke="#196bff" strokeWidth="2" strokeDasharray="6,4" opacity="0.4" />
            <line x1="500" y1="275" x2="765" y2="510" stroke="#196bff" strokeWidth="2" strokeDasharray="6,4" opacity="0.4" />
            <line x1="160" y1="50" x2="50" y2="300" stroke="#196bff" strokeWidth="2" strokeDasharray="6,4" opacity="0.25" />
            <line x1="50" y1="300" x2="230" y2="510" stroke="#196bff" strokeWidth="2" strokeDasharray="6,4" opacity="0.25" />
            <line x1="840" y1="50" x2="950" y2="300" stroke="#196bff" strokeWidth="2" strokeDasharray="6,4" opacity="0.25" />
            <line x1="950" y1="300" x2="765" y2="510" stroke="#196bff" strokeWidth="2" strokeDasharray="6,4" opacity="0.25" />
          </svg>

          {DESKTOP_NODES.map(({ key, position, border, gradient, iconColor, icon: Icon, label }) => (
            <div
              key={key}
              className={`absolute flex flex-col items-center gap-3 ${position} ${key === "center" ? "z-20" : "z-10"}`}
            >
              <div
                className={`flex size-20 items-center justify-center rounded-full border-4 bg-white p-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(255,42,64,0.3)] lg:size-[90px] ${border}`}
              >
                <div className={`flex size-full items-center justify-center rounded-full text-[2rem] lg:text-[2.5rem] ${gradient} ${iconColor ?? "text-white"}`}>
                  <Icon className="size-[0.85em]" />
                </div>
              </div>
              <div className="mt-2 rounded-3xl bg-[#196bff] px-[0.8rem] py-[0.4rem] text-center text-[0.75rem] font-semibold whitespace-nowrap text-white shadow-[0_4px_12px_rgba(255,42,64,0.25)] lg:px-[1.2rem] lg:py-[0.6rem] lg:text-[0.9rem]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: triangular 3-node layout, hidden md and up. */}
      <div className="relative my-2 py-2 sm:my-4 sm:py-4 md:hidden">
        <div className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden px-1 py-3 sm:min-h-[300px] sm:px-2 sm:py-4">
          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <line x1="50" y1="15" x2="20" y2="85" stroke="#196bff" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
            <line x1="50" y1="15" x2="80" y2="85" stroke="#196bff" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
            <line x1="20" y1="85" x2="80" y2="85" stroke="#196bff" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
          </svg>

          {MOBILE_NODES.map(({ key, position, border, gradient, initials, label }) => (
            <div key={key} className={`absolute z-10 flex flex-col items-center gap-3 ${position}`}>
              <div
                className={`flex size-[70px] items-center justify-center rounded-full border-[4px] bg-white p-[5px] shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] sm:size-20 sm:border-[5px] ${border}`}
              >
                <div className={`flex size-full items-center justify-center rounded-full text-[1.25rem] font-bold text-white sm:text-[1.5rem] ${gradient}`}>
                  {initials}
                </div>
              </div>
              <div className="max-w-[100px] rounded-[20px] bg-[#196bff] px-[0.8rem] py-[0.4rem] text-center text-[0.75rem] font-semibold whitespace-normal text-white shadow-[0_4px_12px_rgba(255,42,64,0.25)] sm:max-w-none sm:px-4 sm:py-2 sm:text-[0.85rem] sm:whitespace-nowrap">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
