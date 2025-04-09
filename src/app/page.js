import Hero from "@/components/Home/Hero";
import HowItsWorks from "@/components/Home/HowItsWorks";
import PopularDeals from "@/components/Home/PopularDeals";
import SearchInput from "@/components/Home/SearchInput";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import NavBar from "@/components/NavBar";
import { checkUser } from "@/lib/checkUser";
import { Divide } from "lucide-react";
import Image from "next/image";

export default async function Home() {
    await  checkUser();
  return (
     <div>
      {/* harsh */}
       <NavBar />
    <div className="w-full h-auto mb-10">
      <Hero />
      <SearchInput />
      <HowItsWorks />
      <Image src="/companyList.png" width={1550} height={100} alt="company" />
      <WhyChooseUs />
      {/* <PopularDeals /> */}
    </div>
     </div>
  );
}
