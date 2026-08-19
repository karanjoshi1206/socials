import JoinUsButton from "./joinUsButton";
import { PageShell } from "@/app/components/layout/pageShell";

const HomePageLoggedOut = () => {
  return (
    <PageShell width="narrow" className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="mb-3 text-sm font-medium text-muted-foreground">Socials</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">All your links, one page.</h1>
      <p className="mt-4 text-muted-foreground">Add your handles, share one URL.</p>
      <div className="mt-8">
        <JoinUsButton />
      </div>
    </PageShell>
  );
};

export default HomePageLoggedOut;
