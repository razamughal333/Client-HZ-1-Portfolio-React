import { motion } from "framer-motion";
import { useLanguage } from "../i18n/useLanguage";
import { INSTAGRAM_ACCOUNTS } from "../data/instagramAccounts";
import SectionHeading from "./ui/SectionHeading";
import StaggerContainer, { StaggerItem } from "./motion/StaggerContainer";

function InstagramIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AccountCard({ account }) {
  const { t } = useLanguage();
  return (
    <StaggerItem>
      <motion.a
        href={account.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        data-cursor-label="Open"
        aria-label={`${account.name} on Instagram`}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
      >
        {/* Animated gradient sheen on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120px circle at var(--x,50%) var(--y,0%), var(--accent-soft), transparent 70%)",
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-xl transition-transform duration-300 group-hover:scale-110">
              {account.emoji}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--accent)] transition-transform duration-300 group-hover:rotate-12">
              <InstagramIcon />
            </span>
          </div>

          <h3 className="font-serif text-lg text-[var(--ink)]">{account.name}</h3>
          <p className="mt-1 text-sm font-medium text-[var(--accent)]">{account.niche}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{account.tagline}</p>
        </div>

        <span className="relative mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
          {t.instagram.viewCta}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </span>
      </motion.a>
    </StaggerItem>
  );
}

function InstagramAccounts() {
  const { t } = useLanguage();

  return (
    <section id="instagram" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <SectionHeading eyebrow={t.instagram.eyebrow} heading={t.instagram.heading} body={t.instagram.body} />
      <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {INSTAGRAM_ACCOUNTS.map((account) => (
          <AccountCard key={account.url} account={account} />
        ))}
      </StaggerContainer>
    </section>
  );
}

export default InstagramAccounts;
