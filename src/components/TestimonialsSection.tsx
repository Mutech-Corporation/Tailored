"use client";

import { useRef, useState } from "react";
import { VolumeMuteIcon, VolumeUpIcon } from "@/components/icons";
import type { VideoTestimonial } from "@/types";

const TESTIMONIALS: VideoTestimonial[] = [
  {
    name: "Brian Kenzo",
    src: "/videos/videoplayback1.mp4",
    poster: "/images/video-thumbnail01.webp",
  },
  {
    name: "Kim",
    src: "/videos/videoplayback2.mp4",
    poster: "/images/video-thumbnail02.webp",
  },
  {
    name: "Ben Grinder",
    src: "/videos/videoplayback3.mp4",
    poster: "/images/video-thumbnail03.webp",
  },
  {
    name: "Elizabeth",
    src: "/videos/videoplayback4.mp4",
    poster: "/images/video-thumbnail04.webp",
  },
];

/**
 * Client feedback — four vertical clips that play on hover.
 *
 * Leaving a card fully resets it (pause, seek to 0, re-mute), and unmuting one
 * card mutes every other, matching the target's JS exactly.
 */
export function TestimonialsSection() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);

  const handleEnter = (index: number) => {
    void videoRefs.current[index]?.play().catch(() => {
      /* autoplay can be refused before any user gesture — harmless here */
    });
  };

  const handleLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.muted = true;
    setUnmutedIndex((current) => (current === index ? null : current));
  };

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.muted) {
      videoRefs.current.forEach((other) => {
        if (other) other.muted = true;
      });
      video.muted = false;
      void video.play().catch(() => {});
      setUnmutedIndex(index);
    } else {
      video.muted = true;
      setUnmutedIndex(null);
    }
  };

  return (
    <section className="py-12">
      <div className="dc-container bg-white">
        <div className="mb-6 flex justify-center">
          <div className="w-full text-center lg:w-3/4">
            <p className="dc-eyebrow">Testimonial</p>
            <h2 className="dc-section-title">
              Client <span className="text-[#196bff]">Feedback</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={item.name}
              className="group relative overflow-hidden rounded-xl"
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={() => handleLeave(index)}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="h-full w-full rounded-[20px] object-cover"
                muted
                loop
                playsInline
                poster={item.poster}
              >
                <source src={item.src} type="video/mp4" />
              </video>

              <button
                type="button"
                aria-label={
                  unmutedIndex === index
                    ? `Mute ${item.name}'s testimonial`
                    : `Unmute ${item.name}'s testimonial`
                }
                onClick={(event) => {
                  event.stopPropagation();
                  toggleMute(index);
                }}
                className="absolute right-2.5 bottom-2.5 z-[2] flex size-[2.225rem] items-center justify-center rounded-full border-none bg-black/60 text-white"
              >
                {unmutedIndex === index ? (
                  <VolumeUpIcon className="size-4" />
                ) : (
                  <VolumeMuteIcon className="size-4" />
                )}
              </button>

              <div className="absolute bottom-[25px] left-[15px] flex w-[calc(100%-30px)] items-center rounded-[18px] border border-white/50 bg-[#1d4ed8] px-[15px] py-2.5 transition-opacity duration-300 group-hover:invisible group-hover:opacity-0">
                <span className="ml-2.5 text-2xl font-semibold text-white">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
