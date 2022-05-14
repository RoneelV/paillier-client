import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [modelOpen, setModelOpen] = useState(true);
  return (
    <div>
      {modelOpen ? (
        <div
          className="
        bg-red-400
          bg-opacity-10
          fixed
          top-0
          left-0
          w-full
          min-h-screen
          h-full
          flex
          items-center
          justify-center
          px-4
          py-5
          "
        >
          <div
            className="
            w-full
            max-w-[570px]
            rounded-[20px]
            bg-white
            py-12
            px-8
            md:py-[60px] md:px-[70px]
            text-center
            "
          >
            <h3 className="font-bold text-dark text-xl sm:text-2xl pb-2">
              Greetings, Agent Anon!
            </h3>
            <span className="inline-block bg-primary h-1 w-[90px] mx-auto rounded mb-6"></span>
            <p className="text-base text-body-color leading-relaxed mb-10">
              We have come up with a new technology, seems to be promising for
              protracted clandenstine missions. This simulation will help you
              understand how it works. Click to More Info to understand it or go
              directly to the simulation.
            </p>
            <div className="flex flex-wrap -mx-3">
              <div className="w-1/2 px-3">
                <button
                  className="
                  block
                  text-center
                  w-full
                  p-3
                  text-base
                  font-medium
                  rounded-lg
                  text-dark
                  border border-[#E9EDF9]
                  hover:bg-red-600 hover:text-white hover:border-red-600
                  transition
                  "
                  onClick={() => setModelOpen(false)}
                >
                  More Info
                </button>
              </div>
              <div className="w-1/2 px-3">
                <Link
                  to="/map"
                  className="
                  block
                  text-center
                  w-full
                  p-3
                  text-base
                  font-medium
                  rounded-lg
                  bg-primary
                  border border-primary
                  hover:bg-blue-600 hover:text-white hover:border-blue-600
                  transition
                  "
                >
                  Direct To Simulation
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="bg-gray-50">
            <div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
              <div className="max-w-xl mx-auto text-center">
                <h1 className="text-3xl font-extrabold sm:text-5xl">
                  Exchange and process information securely.
                  <strong className="font-extrabold text-red-700 sm:block">
                    Without secure communication.
                  </strong>
                </h1>

                <p className="mt-4 sm:leading-relaxed sm:text-xl">
                  With our advanced cryptographic algorithms and techniques.
                  Homomorphic encryption lets you process encrypted data without
                  requiring any decryption.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <a
                    className="block w-full px-12 py-3 text-sm font-medium text-white bg-red-600 rounded shadow sm:w-auto active:bg-red-500 hover:bg-red-700 focus:outline-none focus:ring"
                    href="#faqs"
                  >
                    How this works &#8595;
                  </a>
                  <Link
                    className="block w-full px-12 py-3 text-sm font-medium text-red-600 rounded shadow sm:w-auto hover:text-red-700 active:text-red-500 focus:outline-none focus:ring"
                    to="/map"
                  >
                    Let's start
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section
            className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex"
            id="faqs"
          >
            <div className="bg-white border border-gray-200 divide-y divide-gray-200 rounded-xl mx-auto">
              <details className="p-6 group" open>
                <summary className="flex items-center justify-between cursor-pointer">
                  <h5 className="text-lg font-medium text-gray-900">
                    So what exactly does this 'product' do?
                  </h5>

                  <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </summary>

                <p className="mt-4 leading-relaxed text-gray-700">
                  It lets you know whether you are in proximity of any secret
                  bases, without letting the server know your location, or the
                  server giving you the location of the bases. It doesn't
                  require secure channel, and still prevents any eavesdroppers
                  from getting the information.
                </p>
              </details>

              <details className="p-6 group" open>
                <summary className="flex items-center justify-between cursor-pointer">
                  <h5 className="text-lg font-medium text-gray-900">
                    So what exactly am I supposed to do?
                  </h5>

                  <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </summary>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Imagine you are an secret agent lost in Russia. You don't know
                  the locations of the secret bases, and have no means of
                  securely contacting the higher ups. There are Russians
                  everywhere
                  <em> potentially</em> eavesdropping on you, even though they
                  won't triangulate your location based on the origin of your
                  signals you send or receive. You can send the location with
                  this application without worrying about anyone eavesdropping
                  on you. It will let you if you are in proximity of any of the
                  bases.
                </p>
              </details>

              <details className="p-6 group">
                <summary className="flex items-center justify-between cursor-pointer">
                  <h5 className="text-lg font-medium text-gray-900">
                    So how does this work?
                  </h5>

                  <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </summary>

                <p className="mt-4 leading-relaxed text-gray-700">
                  So this application with generate a pair of public and private
                  keys, encrpyt your location with them, and send the public key
                  and the encrypted location. The server will calculate the
                  offsets of your location to the locations of the bases
                  homomorphically, and return them. The client then will decrypt
                  them and will determine if your location is inside any of the
                  regions.
                </p>
              </details>
              <details className="p-6 group">
                <summary className="flex items-center justify-between cursor-pointer">
                  <h5 className="text-lg font-medium text-gray-900">
                    Wait so wouldn't anyone be able to find out the locations of
                    the bases based on the offsets?
                  </h5>

                  <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </summary>

                <p className="mt-4 leading-relaxed text-gray-700">
                  The server will multiply the offsets with any random number,
                  so clients won't be able to determine the actual locations of
                  the bases. The offsets will still have the original signs, and
                  so the client will be able to determine if you are inside
                  based on the signs of the offsets.
                </p>
              </details>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
