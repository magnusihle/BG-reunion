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
        <title>Bjørnegård, 10 års jubileum</title>
        <meta property="og:title" content="Bjørnegård, 10 års jubileum" />
        <meta property="og:description" content="Inngang + Mat" />
        <meta property="og:image" content="/bg-r.jpg" />
      </Head>
      <div
        className="bg-cover bg-center h-screen w-full"
        style={{ backgroundImage: "url(/bg-r.jpg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 pt-20 text-center sm:pt-80 lg:px-8 relative">
          <p className="text-base font-semibold leading-8 text-darkGreen sm:text-green uppercase">
            Velkomen til
          </p>
          <h1 className="sm:mt-4 text-3xl font-bold tracking-widest text-green uppercase sm:text-5xl">
            Bjørnegård <br /> 10 års jubileum
          </h1>
          <div className="mt-[55vh] sm:mt-40 flex justify-center">
            <button
              onClick={handleClick}
              className="bg-blue text-gray uppercase font-bold py-2 px-4 rounded"
            >
              Kjøp inngang
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
