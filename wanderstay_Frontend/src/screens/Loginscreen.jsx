import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function login() {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);
      const result = (await axios.post("/api/users/login", user)).data;
      setloading(false);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className=" bs mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          {error && <Error message="Invalid username or password" />}
          <a href="/home">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in to your account
            </h2>
          </a>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={login}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Registered Yet?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Loginscreen;
