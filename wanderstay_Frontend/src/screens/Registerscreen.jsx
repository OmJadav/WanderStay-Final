import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Minimum password length is 4 characters
    return password.length >= 4;
  };

  async function register() {
    if (
      password === cpassword &&
      isEmailValid(email) &&
      isPasswordValid(password)
    ) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };

      try {
        setloading(true);
        const result = (
          await axios.post(
            "https://wander-stay-9zcs.onrender.com/api/users/register",
            user
          )
        ).data;
        setloading(false);
        setsuccess(true);

        setname("");
        setemail("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        console.error(error);
        setloading(false);
        seterror(true);
      }
    } else {
      if (!isEmailValid(email)) {
        alert("Please enter a valid email address.");
      } else if (!isPasswordValid(password)) {
        alert("Password must be at least 4 characters long.");
      } else {
        alert("Password Not Matched!!");
      }
    }
  }
  return (
    <>
      {loading && <Loader />}
      <div className="flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className=" bs mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          {success && <Success message={"Registration Success.."} />}
          {error && <Error message={"Something went wrong"} />}

          <a href="/home">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register
            </h2>
          </a>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="cpassword"
                  value={cpassword}
                  onChange={(e) => {
                    setcpassword(e.target.value);
                  }}
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={register}
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Have an Account?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-black hover:text-gray-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Registerscreen;
