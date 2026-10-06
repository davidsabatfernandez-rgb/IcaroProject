import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { Landing } from "@/sections/landing";
export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Landing />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
