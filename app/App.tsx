"use client";

import Live from "@/components/Live";
import Navbar from "@/components/Navbar";

const App = () => {
  return (
    <main className="h-screen overflow-hidden">
      <Navbar />

      <section className="flex h-full flex-row">
        <Live />
      </section>
    </main>
  );
};
export default App;
