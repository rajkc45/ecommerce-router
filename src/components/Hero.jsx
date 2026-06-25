import {useContext} from "react";
import {AuthContext} from "../context/Authcontext";

export default function Hero() {
  const data=useContext(AuthContext);
  return (
    <section className="border-b border-gray-100 bg-gradient-to-br from-indigo-50 via-white to-white px-10 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-indigo-600">
          New Season Arrivals
        </p>
    
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">

          Raj Dada {data.user?.name || "Guest"},
          <br />
          New StartUp / EndDown :
        </h1>
        <p className="mx-auto max-w-xl text-gray-500">
          Be fake , Wear Fake , Stay Fake , Hide your real identity niggas &#x2019;
        </p>
      </div>
    </section>
  );
}