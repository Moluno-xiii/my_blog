import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex min-h-dvh min-w-dvw flex-col gap-y-4 px-3 md:px-6">
      <header className="flex flex-row justify-center rounded-lg border border-indigo-400 p-3">
        Navbar should be here somewhere
      </header>
      <section className="flex min-w-full flex-1 flex-col">
        <Outlet />
      </section>
    </div>
  );
}
