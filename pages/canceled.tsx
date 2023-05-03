// pages/canceled.tsx

import { useRouter } from "next/router";
import { useEffect } from "react";

const CanceledPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page after 5 seconds
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, [router]);

  return (
    <div className="bg-blue h-screen w-screen">
      <div className="flex flex-col mx-auto max-w-7xl px-6 bg-blue justify-center h-full py-32 text-center sm:py-40 lg:px-8 relative">
        <h1 className="text-2xl text-beige font-bold uppercase">
          Kjøpet ditt ble kansellert
        </h1>
        <p className="mt-12 text-beige uppercase">
          Du vil bli omdirigert til hjemmesiden om kort tid
        </p>
      </div>
    </div>
  );
};

export default CanceledPage;
