import Image from "next/image";

function Card() {
  return (
    <div className="w-max h-auto flex flex-col bg-gray-400">
      <div className="w-full h-1/3">
        <Image src="/car1.svg" width={300} height={300} alt="car" />
      </div>
      <h2 className="font-semibold text-xl">BMW M4</h2>
      <p className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 text-orange-300"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
        4.8
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <i class="fa-regular fa-user"></i>
            <span className="">2 Passagers</span>
          </div>
          <div className="flex gap-2 items-center">
            <i class="fa-regular fa-user"></i>
            <span className="">2 Passagers</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <i class="fa-regular fa-user"></i>
            <span className="">2 Passagers</span>
          </div>
          <div className="flex gap-2 items-center">
            <i class="fa-regular fa-user"></i>
            <span className="">2 Passagers</span>
          </div>
        </div>
      </div>
      <hr className="border-black" />
      <div>
        price
      </div>
    </div>
  );
}

export default Card;
