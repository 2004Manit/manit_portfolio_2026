import type { Metadata } from "next";
import { CaseHero, Chapter, Flow, Metrics, NextCase, Note, Prose, PullQuote, Shot } from "@/components/case/Case";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Holiday Tribe — PM Internship case study · Manit Agarwal",
  description:
    "Tara AI chat revamp, itinerary page redesign and the Beat the Price Simulator — A/B-tested product work from my PM internship at Holiday Tribe.",
};

export default function HolidayTribe() {
  return (
    <main className="grid-paper">
      <CaseHero
        bg="/images/hero-sky-hill.jpg"
        title="Holiday Tribe"
        lede="Finding where a travel funnel leaked — then shipping A/B-tested fixes, plus an AI tool sales leadership adopted."
        meta={["Product Management Intern", "May 2026 – Aug 2026", "Gurugram"]}
      />

      <Metrics
        items={[
          { value: "40→60%", label: "Itinerary → advisor call", note: "After shipping the new Tara AI flow via A/B test (+50% relative)." },
          { value: "~50%", label: "More itineraries / session", note: "Generated per Tara AI session after the new flow." },
          { value: "~20%", label: "Book Now → quotation", note: "Lift from the redesigned itinerary page, cookie-randomized A/B test." },
          { value: "40", label: "Bookings converted", note: "Through the Beat the Price Simulator — 60 comparisons a week." },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-16">
        <Prose>
          <p>
            Over the summer I took ownership of three parts of the product: the <strong>Tara AI chat revamp</strong>, the{" "}
            <strong>self-assisted tour package customization flow</strong> on the itinerary page, and the competitive{" "}
            <strong>&ldquo;Beat the Price&rdquo;</strong> flow for handling quote-matching requests. Both funnel changes — Tara AI and the itinerary
            page — shipped behind A/B tests.
          </p>
        </Prose>
      </div>

      <Chapter n={1} kicker="Tara AI · conversational funnel" title="Fixing a 5-message drop-off">
        <Note label="The signal" color="pink">
          <p>
            I analyzed <strong>16.8K+ chat messages across 2.8K sessions</strong> in SQL and located where users were leaving: around the{" "}
            <strong>5th message</strong> of a conversation with Tara AI.
          </p>
        </Note>
        <Note label="The diagnosis" color="blue">
          <p>The drop-off traced back to a top-of-funnel intent mismatch.</p>
        </Note>
        <Note label="What I designed" color="butter">
          <p>An intent-triggered questionnaire with context retention.</p>
        </Note>
        <Note label="The result" color="mint">
          <ul>
            <li>Shipped the new Tara flow behind an A/B test.</li>
            <li>
              Itineraries generated per session up <strong>~50%</strong>.
            </li>
            <li>
              Itinerary → advisor-call conversion from <strong>40% to 60%</strong> (+50% relative).
            </li>
          </ul>
        </Note>
      </Chapter>

      <Chapter n={2} kicker="Self-serve customization" title="Redesigning the itinerary page">
        <Note label="The signal" color="pink">
          <p>
            Funnel and persona analysis pinpointed the <strong>itinerary-detail page</strong> as the mid-funnel drop-off.
          </p>
        </Note>
        <Note label="Before" color="lavender">
          <ul>
            <li>An oversized main image dominating the centre of the page.</li>
            <li>No way for travellers to customise the trip.</li>
            <li>All content centre-aligned in a single pane.</li>
            <li>A dated, inconsistent colour and design language.</li>
          </ul>
        </Note>
        <Shot
          src="/images/ht-itinerary.jpg"
          alt="Redesigned Holiday Tribe itinerary page with day-by-day plan on the left and a booking panel on the right"
          caption="The redesigned itinerary detail page"
          w={1862}
          h={982}
        />
        <Note label="After" color="butter">
          <ul>
            <li>A two-pane layout: the trip on the left, a booking panel on the right.</li>
            <li>Highlights / Itinerary / Stays tabs with day-by-day navigation.</li>
            <li>In-line customisation — add an activity to any day, edit travel dates and travellers.</li>
            <li>Two clear next steps: Book Now with the per-person price, or talk to a holiday advisor.</li>
          </ul>
        </Note>
        <Note label="How it shipped" color="blue">
          <p>
            I coordinated with Engineering and Design on the end-to-end redesign and validated it with a{" "}
            <strong>cookie-randomized A/B test</strong>.
          </p>
        </Note>
        <Note label="The result" color="mint">
          <ul>
            <li>
              Book Now → quotation conversion up <strong>~20%</strong>.
            </li>
            <li>
              <strong>29% of users</strong> built above-default itineraries.
            </li>
          </ul>
        </Note>
      </Chapter>

      <PullQuote
        quote="Self-serve flows in travel can get messy very quickly—balancing complex inventory, pricing logic, and dynamic itineraries while keeping the user experience intuitive is no easy feat. Manit dove right into our package edit feature set, demonstrating a sharp product sense, strong problem-solving skills, and a genuine empathy for traveler pain points."
        name="Mohib Ahmed"
        title="Product Manager, Holiday Tribe · managed Manit directly"
        photo="/images/mohib-ahmed.jpg"
      />

      <Chapter n={3} kicker="AI tooling · self-initiated" title="The Beat the Price Simulator">
        <Note label="The problem" color="pink">
          <p>
            Matching a competitor&apos;s quote meant comparing two packages by hand — checking the same gates, weighted dimensions and
            price-driving differences every time.
          </p>
        </Note>
        <Shot
          src="/images/ht-simulator.jpg"
          alt="Comparability Simulator interface comparing our package with a competitor's"
          caption="Upload both quotes in any format, pick the competitor tier, run the comparison."
          w={1897}
          h={1036}
          tilt={1.5}
        />
        <Note label="What I built" color="butter">
          <ul>
            <li>Self-initiated and solo-built as a <strong>Claude skill</strong>.</li>
            <li>Parses competitor quotes in any format — PDF, image or link.</li>
            <li>Applies the discount rules for the competitor&apos;s tier.</li>
            <li>
              Auto-logs every comparison to <strong>Google Drive via MCP</strong>.
            </li>
          </ul>
        </Note>
        <Note label="The result" color="mint">
          <p>
            Adopted by sales leadership — processing <strong>60 comparisons a week</strong> with <strong>40 bookings converted</strong>.
          </p>
        </Note>
      </Chapter>

      <Chapter n={4} kicker="Lead generation · Maldives" title="An app-less WhatsApp funnel">
        <Prose>
          <p>
            I built a lead-generation funnel for Maldives packages that never asks the traveller to install anything — it runs from a Meta ad
            straight into WhatsApp (Gallabox).
          </p>
        </Prose>
        <Flow steps={["Meta Ads", "WhatsApp qualification flow", "Package carousel", "Seller handoff"]} />
        <Note label="Safety net" color="blue">
          <p>A CRM fallback captures anyone who drops off mid-flow.</p>
        </Note>
        <Note label="Early signal" color="mint">
          <p>
            <strong>70% fewer sellers</strong> needed per booking.
          </p>
        </Note>
      </Chapter>

      <NextCase href="/work/housing-dtu" title="Housing DTU" kicker="Next case study · Founder" />
      <Footer />
    </main>
  );
}
