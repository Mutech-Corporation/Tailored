import type { Metadata } from "next";
import { Suspense } from "react";
import { WebStepForm } from "@/components/WebStepForm";

export const metadata: Metadata = {
  title: "Multi-Step Form",
  description:
    "Tell us about your business and we'll start designing your custom logo.",
};

/**
 * web-step.php — where the homepage hero's "Get's started" form submits.
 *
 * Deliberately renders no SiteHeader/SiteFooter: upstream this is a standalone
 * full-screen flow with only its own logo in the corner.
 */
export default function WebStepPage() {
  return (
    <Suspense fallback={null}>
      <WebStepForm />
    </Suspense>
  );
}
