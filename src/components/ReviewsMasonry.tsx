import { REVIEWS } from "@/data/reviews";
import { StarIcon } from "@/components/icons";

/**
 * The 45-card review wall shared by /about and /reviews.
 *
 * The target uses a CSS `column-count` masonry (1 / 2 / 3 columns at
 * 576 / 992), not a grid — cards flow top-to-bottom within a column, so the
 * reading order differs from a row-major grid. Reproduced as-is.
 */
export function ReviewsMasonry() {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {REVIEWS.map((review, index) => (
        <div
          key={`${review.name}-${index}`}
          data-source={review.source}
          className="mb-6 inline-block w-full break-inside-avoid"
        >
          <article className="rounded-lg border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f8f9fa] font-semibold">
                {review.initials}
              </div>
              <div>
                <div className="font-semibold">{review.name}</div>
                <div className="text-sm text-[#6b7280]">{review.meta}</div>
              </div>
            </div>

            <p className="mb-3 text-[0.95rem] text-[#4b5563]">{review.text}</p>

            <div className="mt-2 flex items-center text-sm text-[#6b7280]">
              <span className="mr-2 flex text-[#ffc107]">
                {Array.from({ length: review.stars }, (_, i) => (
                  <StarIcon key={i} className="size-[0.9rem]" />
                ))}
              </span>
              <span className="mx-2">·</span>
              <span>{review.tail}</span>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
