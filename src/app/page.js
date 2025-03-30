import Hero from "@/components/Home/Hero";
import HowItsWorks from "@/components/Home/HowItsWorks";
import SearchInput from "@/components/Home/SearchInput";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-auto mb-10">
      <Hero />
      <SearchInput />
      <HowItsWorks />
    </div>
  );
}
