import { Container } from "@/components/site/container";
import { LegalTabs } from "@/components/site/legal-tabs";
import { MobileBrief } from "@/components/site/mobile-brief";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export function LegalNavBand({ current }: { current: string }) {
  return (
    <section className="border-b border-border bg-card/25">
      <Container className="no-scrollbar overflow-x-auto py-2">
        <LegalTabs current={current} />
      </Container>
    </section>
  );
}

export function LegalDocument({
  current,
  statusTitle,
  statusDescription,
  sections,
  lastUpdated = "15 July 2026",
}: {
  current: string;
  statusTitle: string;
  statusDescription: string;
  sections: readonly LegalSection[];
  lastUpdated?: string;
}) {
  const mobileSections = sections.map((section) => ({
    title: section.title,
    description: section.paragraphs.join(" "),
    bullets: section.bullets,
  }));

  return (
    <>
      <LegalNavBand current={current} />
      <MobileBrief
        eyebrow="On this page"
        title="Open the section you need."
        description={statusDescription}
        items={mobileSections}
      />
      <section className="hidden py-16 md:block sm:py-24">
        <Container className="grid max-w-6xl gap-12 lg:grid-cols-[14rem_1fr]">
          <aside className="self-start lg:sticky lg:top-28">
            <p className="eyebrow">On this page</p>
            <nav
              aria-label="Document sections"
              className="mt-5 flex flex-col gap-1"
            >
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <span className="mr-2 font-mono text-[0.65rem] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="min-w-0">
            <Alert>
              <AlertTitle>{statusTitle}</AlertTitle>
              <AlertDescription>{statusDescription}</AlertDescription>
            </Alert>
            <div className="mt-10 flex flex-col gap-10">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 border-b border-border pb-10 last:border-0"
                >
                  <p className="font-mono text-xs text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-foreground">
                    {section.title}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4 text-base leading-7 text-muted-foreground">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets?.length ? (
                      <ul className="flex list-disc flex-col gap-2 pl-5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
            <p className="mt-10 font-mono text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
