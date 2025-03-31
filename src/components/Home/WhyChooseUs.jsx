"use client";

import Image from "next/image";
import Badge from "../ui/Badge";

function WhyChooseUs() {
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 mt-10">
      <div>
        <Image
          src="/whyChooseUsCar.png"
          width={1600}
          height={150}
          alt="WhyChooseUs Car"
        />
      </div>
      <div className="flex flex-col items-center md:items-start gap-5 mt-15">
        <Badge text="Why Choose Us" />
        <span className="font-semibold text-lg md:text-3xl">
          We offer the best experience with our rental deals
        </span>
        <div className="flex flex-col items-center md:items-start gap-10 md:text-lg">
          <div className="text-center md:text-start w-1/2 md:w-full flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
            <Badge
              text={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                </svg>
              }
              width="w-20"
              height="h-20"
              imageHeight={42}
              imageWidth={42}
              className="mb-2"
            />
            <div className="flex flex-col gap-1 md:justify-start md:items-start">
              <p className="text-lg font-semibold">Best price guaranteed</p>
              <p className="text-gray-400">
                Find a lower price? We’ll refund you 100% of the difference.
              </p>
            </div>
          </div>
          <div className="text-center md:text-start w-1/2 md:w-full flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
            <Badge
              text={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              width="w-20"
              height="h-20"
              imageHeight={42}
              imageWidth={42}
              className="mb-2"
            />
            <div className=" flex flex-col gap-1 md:justify-start md:items-start">
              <p className="text-lg font-semibold">Experience driver</p>
              <p className="text-gray-400">
                Don’t have driver? Don’t worry, we have many experienced driver
                for you.
              </p>
            </div>
          </div>
          <div className="text-center md:text-start w-1/2 md:w-full flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">

            <Badge
              text={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 0 0-.266.112L8.78 21.53A.75.75 0 0 1 7.5 21v-3.955a48.842 48.842 0 0 1-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              width="w-20"
              height="h-20"
              imageHeight={42}
              imageWidth={42}
              className="mb-2"
            />
            <div className=" flex flex-col gap-1 md:justify-start md:items-start">
              <p className="text-lg font-semibold">24 hour car delivery</p>
              <p className="text-gray-400">
                Book your car anytime and we will deliver it directly to you.
              </p>
            </div>
          </div>
          <div className="text-center md:text-start w-1/2 md:w-full flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
            <Badge
              text={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                    clipRule="evenodd"
                  />
                  <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                  <path
                    fillRule="evenodd"
                    d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              width="w-20"
              height="h-20"
              imageHeight={42}
              imageWidth={42}
              className="mb-2"
            />
            <div className=" flex flex-col gap-1 md:justify-start md:items-start">
              <p className="text-lg font-semibold">24/7 technical support</p>
              <p className="text-gray-400">
                Have a question? Contact Rentcars support any time when you have
                problem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
