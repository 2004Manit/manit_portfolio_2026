import type { Metadata } from "next";
import Image from "next/image";
import { CaseHero, Chapter, Metrics, NextCase, Note, Prose, Shot } from "@/components/case/Case";
import { Reveal } from "@/components/Decor";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Housing DTU — Founder case study · Manit Agarwal",
  description:
    "How I took a zero-brokerage student-housing marketplace from a frustrating PG hunt to 3,000+ active users at 30% monthly retention.",
};

const growth = [
  { when: "48 hrs post-launch", users: "250" },
  { when: "10–12 days later", users: "600" },
  { when: "At IIF-DTU incubation", users: "1,200–1,300" },
  { when: "After fee re-onboarding", users: "~1,500" },
  { when: "10 days after flatmate feature", users: "~2,000" },
  { when: "Today", users: "3,000+" },
];

const quotes = [
  {
    q: "Best part? Zero brokerage! I saved ₹7,000 by finding my flat directly through Housing DTU. The platform is simple, listings are genuine, and everything is verified.",
    who: "Lakshya Dixit, 3rd Year B.Tech, DTU",
  },
  {
    q: "Stressed about finding a flatmate for my 2BHK? Housing DTU connected me with a fellow DTU student in just 3 days. Rent split, problem solved!",
    who: "Haaris Aftab, 3rd Year B.Tech, DTU",
  },
  {
    q: "As a fresher, I was lost searching for PGs near campus. Housing DTU showed verified listings with real photos. Contacted the owner via WhatsApp and moved in hassle-free!",
    who: "Avish Singh, 1st Year B.Tech, DTU",
  },
];

export default function HousingDtu() {
  return (
    <main className="grid-paper">
      <CaseHero
        bg="/images/hills-projects.jpg"
        title="Housing DTU"
        lede="A zero-brokerage, verified student-housing marketplace — from a frustrating PG hunt to 3,000+ active users."
        meta={["Founder & Product Lead", "Dec 2025 – Present", "Delhi", "Incubated at IIF-DTU"]}
        links={[{ label: "housingdtu.in", href: "https://housingdtu.in/" }]}
      />

      <Metrics
        items={[
          { value: "3,000+", label: "Active users", note: "On a campus of 10,000+ DTU students." },
          { value: "30%", label: "Monthly retention", note: "Students coming back month over month." },
          { value: "250+", label: "Users in 48 hours", note: "At launch, with zero paid spend." },
          { value: "~40%", label: "Active-user lift", note: "In 2 weeks after shipping flatmate matching." },
        ]}
      />

      <Chapter n={1} kicker="The problem" title="PG hunting was a hustle">
        <Prose>
          <p>
            Three years ago, my friends and I were fresh admits to DTU, hunting for a PG near campus. Listings on the big property portals
            were unreliable — misleading photos, outdated rates, wrong locations. We ended up searching offline for days, 3–4 hours at a time,
            and settled for one more out of exhaustion than confidence.
          </p>
          <p>
            The idea: a platform listing every nearby PG with verified location, images, video, amenities, contact details and rent — all
            checked by us before it goes live.
          </p>
        </Prose>
      </Chapter>

      <Chapter n={2} kicker="Validation" title="Talking to students before writing code">
        <Prose>
          <p>
            I talked to as many students as I could and ran a Google Form to widen the sample. Most called PG-hunting &ldquo;a hustle&rdquo;,
            relying on offline visits or hand-me-down PGs from seniors. In all, <strong>100+ user interviews</strong> fed a PRD and{" "}
            <strong>7 Figma screens</strong>.
          </p>
        </Prose>
        <Note label="The insight that reshaped the product" color="butter">
          <p>
            A student living in a flat told me flat-hunting was <em>worse</em> than PG-hunting — no dedicated listings at all, just broker
            groups with limited postings and high brokerage. So Housing DTU became a complete, brokerage-free platform for{" "}
            <strong>PGs and flats</strong>.
          </p>
        </Note>
      </Chapter>

      <Chapter n={3} kicker="Building V1" title="Built page by page in 2–2.5 months">
        <Prose>
          <p>
            I started from custom Figma designs, then built the product with Claude Code, page by page — authentication, contact-detail
            security, a privacy policy and terms. One deliberate investment: a <strong>gamified, self-serve listing form</strong> so owners
            could submit every detail themselves, with our team verifying each listing before it went live. The build wrapped by the end of
            February 2026.
          </p>
        </Prose>
        <Shot src="/images/shot-housingdtu.jpg" alt="Housing DTU homepage" caption="housingdtu.in" w={1920} h={1200} />
      </Chapter>

      <Chapter n={4} kicker="Go-to-market · supply" title="Earning owners' trust">
        <Note label="Attempt one" color="pink">
          <p>
            We went door-to-door pitching PG owners a free listing. Most didn&apos;t trust two students with no track record — after dozens
            of PGs, we had <strong>five listings</strong>.
          </p>
        </Note>
        <Note label="What changed" color="mint">
          <p>
            Not the offer — the framing. We ended every pitch with proof: &ldquo;these properties are already listed with us — look at the
            pages we build for them.&rdquo; Social proof and FOMO turned the conversion rate around; owners who&apos;d said no came back.
          </p>
        </Note>
        <Note label="Cracking flats" color="blue">
          <p>
            Flat owners had no channel reaching them except brokers, whom we&apos;d excluded on purpose. We asked friends for owner contacts
            and walked area to area looking for &ldquo;flat for rent&rdquo; boards. Only 5–6 leads — but they converted well.
          </p>
        </Note>
      </Chapter>

      <Chapter n={5} kicker="Launch · demand" title="250+ users in 48 hours">
        <Prose>
          <p>
            With ~12–13 PGs and 5 flats live, we shifted to demand. We designed posters in Canva, papered every corner of campus and backed it
            with a social push. <strong>250+ users signed up in 48 hours</strong> — the first real signal that demand existed beyond our
            interview sample.
          </p>
        </Prose>
      </Chapter>

      <Chapter n={6} kicker="Monetization" title="Testing willingness to pay">
        <Prose>
          <p>
            I introduced a <strong>₹199 one-time listing fee</strong> per property — deliberately low, designed purely to test whether
            owners would pay anything at all. Re-pitched with our growth story attached, <strong>12 of ~15 properties</strong> approached
            listed (10 PGs, 2 flats) — a far higher hit rate than the first door-to-door push.
          </p>
          <p>
            Today <strong>26 owners have paid to list</strong> (20 PGs, 6 flats) — <strong>₹5,200 in revenue</strong> — and owners have
            started reaching out to us first.
          </p>
        </Prose>
      </Chapter>

      <Chapter n={7} kicker="External validation" title="Incubated at IIF-DTU">
        <div className="grid items-start gap-6 sm:grid-cols-[minmax(0,1fr)_240px]">
          <Prose>
            <p>
              I built a pitch deck and applied to IIF-DTU, our college incubator. After 6–7 selection rounds and a final panel interview,
              Housing DTU was accepted and <strong>pre-seed funded</strong>. We were at 1,200–1,300 active users — and for the first time,
              users and investors had both independently validated what we were building.
            </p>
          </Prose>
          <Reveal rotate={3}>
            <Image
              src="/images/housingdtu-preseed.png"
              alt="Announcement: Housing DTU backed by IIF DTU, pre-seed grant"
              width={640}
              height={674}
              className="h-auto w-full rounded-[20px] shadow-[var(--shadow-card)] ring-4 ring-white"
            />
          </Reveal>
        </div>
      </Chapter>

      <Chapter n={8} kicker="The real unlock" title="Flatmate matching">
        <Note label="The signal" color="pink">
          <p>
            Growth had cooled to ~1,500 users. Then I noticed message after message in a college WhatsApp group: &ldquo;flatmate required,
            zero brokerage.&rdquo; We&apos;d been so focused on listings that we&apos;d missed an adjacent, equally real problem — something
            WhatsApp, LinkedIn and contact-page data all pointed to.
          </p>
        </Note>
        <Note label="What I shipped — in 5–6 days" color="butter">
          <ul>
            <li>Anyone with a flat can list it for the same ₹199 fee.</li>
            <li>Anyone without one can post a query (name, budget, contact, flatmates needed) or browse existing ones.</li>
            <li>Every submission is verified by a phone call before it goes live — the same trust model as core listings.</li>
          </ul>
        </Note>
        <Note label="The result" color="mint">
          <ul>
            <li>75–80 new users a day; ~2,000 users within the first 10 days.</li>
            <li>
              Active users up <strong>~40% in two weeks</strong>, average engagement time up <strong>30 seconds</strong>.
            </li>
            <li>Still the sharpest growth lever we&apos;ve pulled.</li>
          </ul>
        </Note>
      </Chapter>

      <Chapter n={9} kicker="A failure" title="The feature I pulled">
        <Prose>
          <p>
            Seeing students around me pay steep fees for AI resume tools while chasing internships, I built AI resume, cover-letter, LinkedIn DM and cold-email generation inside
            Housing DTU. It failed almost immediately — near-zero adoption, high churn. We pulled it after a couple of weeks.
          </p>
        </Prose>
        <Note label="The lesson" color="lavender">
          <p>
            A product has to solve <strong>one specific problem for one specific audience</strong>, with a clear USP. Stretching a platform
            across unrelated problems dilutes focus until nothing lands. So instead of bolting job tools onto Housing DTU, I spun the idea
            out as its own sharply-scoped product: <strong>Compass AI</strong>.
          </p>
        </Note>
      </Chapter>

      <Chapter n={10} kicker="Growth at a glance" title="From 250 to 3,000+">
        <Reveal>
          <ol className="relative space-y-3 border-l-2 border-dashed border-ink/20 pl-6">
            {growth.map((g, i) => (
              <li key={g.when} className="relative">
                <span
                  className="absolute -left-[33px] top-1/2 size-4 -translate-y-1/2 rounded-full ring-4 ring-cream"
                  style={{ background: i === growth.length - 1 ? "#34c75a" : "#bbdafe" }}
                />
                <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
                  <span className="text-[15px] font-semibold text-ink-2">{g.when}</span>
                  <span className="font-display text-xl font-extrabold tracking-tight">{g.users}</span>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <Prose>
          <p>
            Today: <strong>3,000+ active users</strong> at <strong>30% monthly retention</strong>, 43 active listings and 24K+ page views.
            Next up: a proper user dashboard and an integrated online payment gateway.
          </p>
        </Prose>
      </Chapter>

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-4">
        <Reveal>
          <h2 className="display text-[clamp(30px,4.6vw,56px)]">What users say</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.who} delay={i * 0.06} rotate={[-2, 1.5, -1][i]}>
              <figure className="h-full rounded-[18px] bg-white p-6 shadow-[var(--shadow-card)]">
                <blockquote className="text-[15.5px] leading-relaxed text-ink">&ldquo;{q.q}&rdquo;</blockquote>
                <figcaption className="mt-4 text-[13px] font-bold text-ink-2">— {q.who}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <NextCase href="/work/holiday-tribe" title="Holiday Tribe" kicker="Next case study · PM Internship" />
      <Footer />
    </main>
  );
}
