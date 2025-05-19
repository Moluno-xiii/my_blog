import { createFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setError("");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if (data.confirmPassword !== data.password) {
      setError("Password fields don't match!!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/signup", data);
      navigate({ to: "/auth/login" });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-y-5 md:mx-auto md:w-fit"
    >
      <section className="flex min-w-full flex-col gap-y-2">
        <label htmlFor="email">Email</label>
        <input
          className="min-w-full rounded-md border border-indigo-600 p-2 md:min-w-lg"
          required
          minLength={7}
          type="email"
          name="email"
        />
      </section>
      <section className="flex min-w-full flex-col gap-y-2">
        <label htmlFor="password">Password</label>
        <input
          className="min-w-full rounded-md border border-indigo-600 p-2 md:min-w-lg"
          required
          minLength={6}
          type="password"
          name="password"
        />
      </section>
      <section className="flex min-w-full flex-col gap-y-2">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="min-w-full rounded-md border border-indigo-600 p-2 md:min-w-lg"
          required
          minLength={6}
          type="password"
          name="confirmPassword"
        />
      </section>
      <span className="self-start text-sm text-red-500">
        {error ? error : null}
      </span>
      <button
        type="submit"
        className="w-40 cursor-pointer rounded-md bg-indigo-600 p-2 transition-all duration-300 hover:bg-indigo-600/70"
      >
        Submit
      </button>
    </form>
  );
}
