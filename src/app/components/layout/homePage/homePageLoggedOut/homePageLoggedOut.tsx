import JoinUsButton from "./joinUsButton";
import { PageShell } from "@/app/components/layout/pageShell";
import { Link2, Pencil, Share2 } from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Sign in",
    body: "Use Google. We create your page — no extra account to remember."
  },
  {
    icon: Pencil,
    title: "Add your handles",
    body: "Pick Instagram, GitHub, LinkedIn, and the rest. Type the username you already use."
  },
  {
    icon: Share2,
    title: "Share one URL",
    body: "Put it in a bio, resume, or chat. People tap through to every profile from one place."
  }
];

const HomePageLoggedOut = () => {
  return (
    <PageShell width="wide" className="pb-20">
      <section className="mx-auto max-w-2xl pt-6 text-center sm:pt-10">
        <p className="text-sm font-medium text-muted-foreground">A public page for your online self</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          All your socials,
          <br />
          one simple link.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
          socials is a lightweight page you control. Collect the profiles you already have, then share a single URL instead of a list of usernames.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <JoinUsButton />
          <p className="text-xs text-muted-foreground">Free. Takes about a minute.</p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-sm">
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 text-center">
            <p className="font-medium">Your name</p>
            <p className="text-sm text-muted-foreground">@yourname</p>
          </div>
          <div className="space-y-2">
            {["Instagram", "GitHub", "LinkedIn"].map((name) => (
              <div key={name} className="flex items-center justify-between rounded-xl bg-muted/80 px-4 py-3 text-sm">
                <span>{name}</span>
                <span className="text-muted-foreground">Open →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center text-xl font-semibold tracking-tight">How it works</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border bg-card p-5 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">Step {index + 1}</p>
              <step.icon className="mt-3 h-5 w-5" strokeWidth={1.75} />
              <h3 className="mt-3 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border bg-card px-6 py-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight">Ready to put everything in one place?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Sign in, add a couple of handles, and you have a page you can send to anyone.
        </p>
        <div className="mt-6">
          <JoinUsButton />
        </div>
      </section>
    </PageShell>
  );
};

export default HomePageLoggedOut;
