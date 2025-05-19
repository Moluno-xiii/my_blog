import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Welcome to my blog
      <ul>links to blog post, about, and others</ul>
    </div>
  );
}
