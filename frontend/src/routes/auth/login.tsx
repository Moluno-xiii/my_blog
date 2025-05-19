import { createFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import type { FormEvent } from "react";
import useAuth from "../../context/AuthProvider";
import { handleError } from "../../lib/helpers";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { setUser, user, logout } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post("http://localhost:3000/login", data);
      localStorage.setItem("accessToken", String(response.data.accessToken));
      // localStorage.setItem("refreshToken", String(response.data.refreshToken));
      setUser(response.data.user);
      navigate({ to: "/admin", replace: true });
      // use context to manage user state.
    } catch (err) {
      const message = handleError(err, "response");
      console.error("unexpected error", message);
    }
  }

  // async function test() {
  //   try {
  //     const response = await axiosInstance.post("/admin");

  //     console.log("fetch result", response);
  //   } catch (err: unknown) {
  //     const status = (err as { response: { status: string } })?.response
  //       ?.status;
  //     console.log(status);
  //     const message = handleError(err, "response");
  //     console.error("unexpected error", message);
  //     console.error(err);
  //   }
  // }

  return (
    <>
      {user ? (
        <div className="flex flex-col items-center justify-center gap-y-2">
          <p>Welcome back, {user.email}</p>
          <button
            className="w-40 cursor-pointer rounded-md bg-indigo-600 p-2 transition-all duration-300 hover:bg-indigo-600/70"
            onClick={logout}
          >
            logout
          </button>
        </div>
      ) : (
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-y-5"
        >
          <section className="flex flex-col gap-y-2">
            <label htmlFor="email">Email</label>
            <input
              className="rounded-md border border-indigo-600 p-2 md:min-w-lg"
              required
              minLength={7}
              type="email"
              name="email"
            />
          </section>
          <section className="flex flex-col gap-y-2">
            <label htmlFor="password">Password</label>
            <input
              className="rounded-md border border-indigo-600 p-2 md:min-w-lg"
              required
              minLength={6}
              type="password"
              name="password"
            />
          </section>
          <button
            type="submit"
            className="w-40 cursor-pointer rounded-md bg-indigo-600 p-2 transition-all duration-300 hover:bg-indigo-600/70"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
}
