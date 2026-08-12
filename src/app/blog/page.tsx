import type { Metadata } from "next";
import Image from "@/components/Image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InnerHero } from "@/components/InnerHero";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Home - Design Centura Blog",
  description:
    "Read real customer reviews of Design Centura. Explore testimonials from Trustpilot, Google, Facebook and more.",
};

interface BlogPost {
  title: string;
  href: string;
  image: string;
  category: string;
  date: string;
  excerpt: string;
}

/**
 * /blog is a separate WordPress install with its own theme, and it currently
 * publishes exactly one post — reproduced here rather than padded out.
 *
 * Individual post pages are out of scope, so the card links out to the real
 * remote article. The thumbnail is downloaded into public/ rather than
 * hotlinked.
 */
const POSTS: BlogPost[] = [
  {
    title: "How Many Logos Should a Business Have for Long Term...",
    href: "https://designcentura.com/blog/how-many-logos-should-a-business-have/",
    image: "/images/blog/how-many-logos.png",
    category: "Design Centura",
    date: "April 20, 2026",
    excerpt:
      "The most overlooked branding issue in growing companies is not creativity but structural clarity....",
  },
];

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <InnerHero
          eyebrow="Blog"
          title={
            <>
              Recent <span>Blogs</span>
            </>
          }
          lead="Design Centura is essentially an institution where simple ideas are converted into brilliant and passionate products."
        />

        <section className="py-12">
          <div className="dc-container">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {POSTS.map((post) => (
                <article
                  key={post.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_6px_20px_rgba(29,78,216,0.08)]"
                >
                  <a
                    href={post.href}
                    className="block w-full overflow-hidden bg-[#f6f8ff]"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={554}
                      height={368}
                      className="h-full w-full object-cover transition-transform duration-[350ms] ease-in-out group-hover:scale-[1.06]"
                    />
                  </a>

                  <div className="flex flex-col px-[18px] pt-[18px] pb-5">
                    <div className="mb-2 flex items-center gap-2 text-[13px] font-extrabold text-[#196bff] capitalize">
                      {post.category}
                    </div>
                    <h3 className="mb-2 text-base font-semibold">
                      <Link href={post.href} className="no-underline">
                        {post.title}
                      </Link>
                    </h3>
                    <div className="mb-2 text-[0.8rem] text-[#6b7280]">
                      {post.date}
                    </div>
                    <p className="text-[0.9rem] text-[#4b5563]">{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
