import getStripe from "@/utils/get-stripejs";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const handleClick = async () => {
    const stripe = await getStripe();
    if (!stripe) return;
    // Create a new checkout session and redirect the user
    const response = await fetch("/api/checkout", { method: "POST" });
    const session = await response.json();
    const { id: sessionId } = session;

    if (sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    } else {
      console.error("Error: Failed to create checkout session");
    }
  };

  return (
    <>
      <Head>
        <title>JOJO Vesterbro X Distortion</title>
        <meta property="og:title" content="JOJO Vesterbro X Distortion" />
        <meta property="og:description" content="Inngang + Mat" />
        <meta property="og:image" content="/bg.jpg" />
      </Head>
      <div
        className="bg-cover bg-center h-screen w-full"
        style={{ backgroundImage: "url(/bg.jpg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8 relative">
          <p className="text-base font-semibold leading-8 text-brown uppercase">
            Velkomen til
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-widest text-brown uppercase sm:text-5xl">
            JOJO Vesterbro <br />X<br /> Distortion
          </h1>
          <div className="mt-52 flex justify-center">
            <button
              onClick={handleClick}
              className="bg-beige hover:bg-lightRed text-brown uppercase font-bold py-2 px-4 rounded"
            >
              Kjøp billett her
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
