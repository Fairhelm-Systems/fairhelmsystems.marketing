"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  LockKeyhole,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const workTypes = [
  { value: "school-os", label: "School OS" },
  { value: "data-pipeline", label: "Data pipeline" },
  { value: "dashboard", label: "Dashboard / BI" },
  { value: "internal-system", label: "Internal system" },
  { value: "existing-product", label: "Existing product" },
  { value: "governed-ai", label: "Governed AI" },
] as const;

type WorkType = (typeof workTypes)[number]["value"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function workTypeLabel(value: WorkType | "") {
  return workTypes.find((option) => option.value === value)?.label ?? "Project";
}

export function ContactInquiry() {
  const [step, setStep] = useState<1 | 2>(1);
  const [workType, setWorkType] = useState<WorkType | "">("");
  const [problem, setProblem] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");

  const canContinue = Boolean(workType && problem.trim().length >= 20);
  const canCompose = Boolean(
    name.trim() && organization.trim() && emailPattern.test(email.trim()),
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === 1) {
      if (canContinue) {
        setStep(2);
      }
      return;
    }

    if (!canCompose) {
      return;
    }

    const subject = `Fairhelm inquiry — ${workTypeLabel(workType)}`;
    const body = [
      "Hello Fairhelm Systems,",
      "",
      `Area of work: ${workTypeLabel(workType)}`,
      "",
      "The operating problem:",
      problem.trim(),
      "",
      `Name: ${name.trim()}`,
      `Organization: ${organization.trim()}`,
      `Work email: ${email.trim()}`,
      "",
      "Regards,",
      name.trim(),
    ].join("\n");

    window.location.assign(
      `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <Card className="system-panel overflow-visible border border-border bg-card/90 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <CardHeader className="border-b border-border pb-5">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="eyebrow">Inquiry</p>
            <Badge variant="outline" className="font-mono text-[0.65rem]">
              Step {step} of 2
            </Badge>
          </div>
          <CardTitle className="text-2xl tracking-tight sm:text-3xl">
            {step === 1
              ? "Tell us what needs attention."
              : "Where should the conversation start?"}
          </CardTitle>
          <CardDescription className="max-w-2xl leading-6">
            {step === 1
              ? "Start with the operational reality. We will get to solutions after the problem is clear."
              : "Add enough context for a useful reply. Your mail client will open before anything is sent."}
          </CardDescription>

          <ol
            aria-label="Inquiry progress"
            className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-3 text-xs text-muted-foreground"
          >
            <li
              aria-current={step === 1 ? "step" : undefined}
              className={cn(
                "flex items-center gap-2",
                step === 1 && "text-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-full border border-border font-mono",
                  step === 1 &&
                    "border-primary bg-primary text-primary-foreground",
                  step === 2 && "border-primary/40 bg-primary/10 text-primary",
                )}
              >
                {step === 2 ? (
                  <Check aria-hidden="true" className="size-3.5" />
                ) : (
                  "1"
                )}
              </span>
              <span className="hidden sm:inline">The problem</span>
            </li>
            <li aria-hidden="true" className="h-px bg-border">
              <span
                className={cn(
                  "block h-px origin-left bg-primary transition-transform duration-500",
                  step === 1 ? "scale-x-0" : "scale-x-100",
                )}
              />
            </li>
            <li
              aria-current={step === 2 ? "step" : undefined}
              className={cn(
                "flex items-center gap-2",
                step === 2 && "text-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-full border border-border font-mono",
                  step === 2 &&
                    "border-primary bg-primary text-primary-foreground",
                )}
              >
                2
              </span>
              <span className="hidden sm:inline">Your details</span>
            </li>
          </ol>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="py-6">
            {step === 1 ? (
              <FieldSet>
                <FieldLegend>What kind of work?</FieldLegend>
                <FieldDescription>
                  Choose the closest fit. Precision can come in the
                  conversation.
                </FieldDescription>
                <ToggleGroup
                  aria-label="Area of work"
                  className="mt-1 flex w-full flex-wrap items-stretch gap-2"
                  value={workType ? [workType] : []}
                  onValueChange={(values) =>
                    setWorkType((values[0] as WorkType | undefined) ?? "")
                  }
                  variant="outline"
                  spacing={2}
                >
                  {workTypes.map((option) => (
                    <ToggleGroupItem
                      key={option.value}
                      type="button"
                      value={option.value}
                      className="h-9 flex-auto rounded-full border-border bg-background/45 px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:border-primary/50 data-[state=on]:bg-primary/12 data-[state=on]:text-foreground sm:flex-none sm:px-4 sm:text-sm"
                    >
                      {option.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>

                <FieldGroup className="mt-1">
                  <Field>
                    <div className="flex items-end justify-between gap-4">
                      <FieldLabel htmlFor="contact-problem">
                        What needs to work better?
                      </FieldLabel>
                      <span className="font-mono text-[0.65rem] text-muted-foreground">
                        {problem.length}/1200
                      </span>
                    </div>
                    <Textarea
                      id="contact-problem"
                      value={problem}
                      onChange={(event) => setProblem(event.target.value)}
                      maxLength={1200}
                      rows={7}
                      className="min-h-40 resize-y bg-background/45 p-4 leading-6"
                      placeholder="Describe the product, workflow, or system problem. What is breaking down, who is affected, and what outcome matters?"
                    />
                    <FieldDescription>
                      At least 20 characters. Do not include credentials or
                      sensitive records.
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>
            ) : (
              <FieldSet>
                <FieldLegend>Your details</FieldLegend>
                <FieldDescription>
                  These details are used only to prepare the email on your
                  device.
                </FieldDescription>
                <FieldGroup>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="contact-name">Your name</FieldLabel>
                      <Input
                        id="contact-name"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        className="h-11 bg-background/45 px-4"
                        placeholder="Name"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="contact-organization">
                        Organization
                      </FieldLabel>
                      <Input
                        id="contact-organization"
                        name="organization"
                        value={organization}
                        onChange={(event) =>
                          setOrganization(event.target.value)
                        }
                        autoComplete="organization"
                        className="h-11 bg-background/45 px-4"
                        placeholder="School, trust, or company"
                        required
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="contact-email">Work email</FieldLabel>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      className="h-11 bg-background/45 px-4"
                      placeholder="you@organization.com"
                      required
                    />
                  </Field>
                  <Alert className="border-primary/20 bg-primary/5">
                    <LockKeyhole aria-hidden="true" />
                    <AlertTitle>Local by design</AlertTitle>
                    <AlertDescription>
                      Nothing is uploaded or stored. The final action opens a
                      prepared draft in your mail client.
                    </AlertDescription>
                  </Alert>
                </FieldGroup>
              </FieldSet>
            )}
          </CardContent>

          <CardFooter className="justify-between gap-3 border-t border-border pt-5">
            {step === 2 ? (
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="rounded-full"
                onClick={() => setStep(1)}
              >
                <ArrowLeft data-icon="inline-start" />
                Back
              </Button>
            ) : (
              <p className="hidden text-xs text-muted-foreground sm:block">
                Be concrete. Skip the pitch deck.
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              className="ml-auto min-w-36 rounded-full"
              disabled={step === 1 ? !canContinue : !canCompose}
            >
              {step === 1 ? "Continue" : "Prepare email"}
              {step === 1 ? (
                <ArrowRight data-icon="inline-end" />
              ) : (
                <Mail data-icon="inline-end" />
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card size="sm" className="border border-border bg-card/65">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Mail aria-hidden="true" className="size-4" />
              <p className="eyebrow">Email</p>
            </div>
            <CardTitle className="mt-2 break-all text-base">
              {siteConfig.contactEmail}
            </CardTitle>
            <CardDescription>
              {siteConfig.contactEmailIsPlaceholder
                ? "Mailbox provisioning is in progress."
                : "For project and partnership discussions."}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href={`mailto:${siteConfig.contactEmail}`}
              className={cn(
                buttonVariants({ variant: "link", size: "sm" }),
                "h-auto px-0",
              )}
            >
              Open in mail client
              <ArrowRight data-icon="inline-end" />
            </Link>
          </CardFooter>
        </Card>

        <Card size="sm" className="border border-border bg-card/65">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Clock3 aria-hidden="true" className="size-4" />
              <p className="eyebrow">Operating base</p>
            </div>
            <CardTitle className="mt-2 text-base">India · IST</CardTitle>
            <CardDescription>
              Project discussions by appointment. UTC+5:30.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
