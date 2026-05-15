import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sugar Land Bike Fest collects and uses your information.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl font-semibold text-golden mb-3">{title}</h2>
      <div className="text-cream/80 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="relative z-10 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-golden mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-cream leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-cream/60 text-sm">Last updated: May 2026</p>
        </div>

        {/* Content */}
        <div className="rounded-3xl bg-[#0e0c0a]/60 backdrop-blur-md border border-white/10 px-6 sm:px-10 py-10">

          <Section title="Who We Are">
            <p>
              Sugar Land Bike Fest is a community cycling festival hosted by the Fort Bend Mountain Bike Association (FBMBA), located in Sugar Land, Texas. This site is operated at{" "}
              <span className="text-cream">sugarlandbikefest.com</span>.
            </p>
            <p>
              Questions about this policy can be directed to:{" "}
              <a href="mailto:hello@sugarlandbikefest.com" className="text-sunset hover:underline underline-offset-2">
                hello@sugarlandbikefest.com
              </a>
            </p>
          </Section>

          <Section title="What We Collect">
            <p>We only collect information you provide directly to us:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-cream">Email address</strong> — when you sign up for event updates via the "Get Updates" form.</li>
              <li><strong className="text-cream">Name, email, and message</strong> — when you submit a sponsorship inquiry, volunteer application, or contact form.</li>
            </ul>
            <p>
              We do not collect payment information, track you across other websites, or use advertising cookies.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1">
              <li>To send you event updates, schedule announcements, and news about Sugar Land Bike Fest (if you subscribed).</li>
              <li>To respond to sponsorship inquiries, volunteer applications, and other messages you send us.</li>
              <li>To improve the site and understand general interest in the event.</li>
            </ul>
            <p>We will never sell, rent, or share your personal information with third parties for their own marketing purposes.</p>
          </Section>

          <Section title="Email Communications">
            <p>
              If you subscribe to our mailing list, you can unsubscribe at any time by clicking the unsubscribe link in any email we send, or by emailing us at{" "}
              <a href="mailto:hello@sugarlandbikefest.com" className="text-sunset hover:underline underline-offset-2">
                hello@sugarlandbikefest.com
              </a>{" "}
              with the subject "Unsubscribe."
            </p>
            <p>
              In compliance with CAN-SPAM, our mailing address is:<br />
              <span className="text-cream">Fort Bend Mountain Bike Association · 1210 Oak Glen Drive, Sugar Land, TX 77479</span>
            </p>
          </Section>

          <Section title="Third-Party Services">
            <p>We may use the following third-party services to operate this site and communicate with you:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-cream">Vercel</strong> — website hosting. Subject to Vercel&apos;s privacy policy.</li>
              <li><strong className="text-cream">Email/mailing list provider</strong> — to send event updates to subscribers. We will update this section when a provider is selected.</li>
              <li><strong className="text-cream">Google Maps</strong> — embedded map on the Location section. Google may set cookies when you interact with the map.</li>
            </ul>
          </Section>

          <Section title="Cookies">
            <p>
              This site does not use tracking or advertising cookies. Our hosting provider (Vercel) may set technical cookies necessary to serve the site. No personal data is stored in cookies by us.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              We retain your email address on our mailing list until you unsubscribe. Form submissions are retained only as long as needed to respond to your inquiry.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>You can contact us at any time to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request a copy of the information we hold about you.</li>
              <li>Ask us to correct or delete your information.</li>
              <li>Opt out of any communications.</li>
            </ul>
            <p>
              Email us at{" "}
              <a href="mailto:hello@sugarlandbikefest.com" className="text-sunset hover:underline underline-offset-2">
                hello@sugarlandbikefest.com
              </a>{" "}
              and we will respond within 30 days.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this policy as the event grows and new services are added. The "Last updated" date at the top of this page will reflect any changes. Continued use of the site after changes are posted constitutes acceptance of the updated policy.
            </p>
          </Section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-cream/60 hover:text-sunset transition underline underline-offset-2">
            ← Back to Sugar Land Bike Fest
          </Link>
        </div>
      </div>
    </div>
  );
}
