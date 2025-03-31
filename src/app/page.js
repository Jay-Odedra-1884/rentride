import Hero from "@/components/Home/Hero";
import HowItsWorks from "@/components/Home/HowItsWorks";
import PopularDeals from "@/components/Home/PopularDeals";
import SearchInput from "@/components/Home/SearchInput";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-auto mb-10">
      <Hero />
      <SearchInput />
      <HowItsWorks />
      <Image src="/companyList.png" width={1550} height={100} alt="company" />
      <WhyChooseUs />
      <PopularDeals />
    </div>
  );
}
