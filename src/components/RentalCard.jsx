import Image from "next/image"
import Link from "next/link"

function RentalCard({data}) {
  return (
    <div>
      <div className="h-auto flex flex-col gap-2 rounded-xl p-4 hover:scale-105 hover:border-black transition-all duration-300 border">
      <div className="w-full h-36 flex items-center overflow-hidden">
        <Image src={data.imageUrl} width={250} height={300} alt="car" />
      </div>
      <div className="flex justify-between">
      <h2 className="font-semibold text-xl">{data.name}</h2>
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
      </div>
      <hr className="border-black" />
      <div className="flex items-center justify-between text-xl">
        <span className="font-semibold">Price</span>
        <span><span className="text-orange-400">{data.price}₹</span>/day</span>
      </div>
      <div className="bg-black text-white text-center p-2 rounded-md mt-4 cursor-pointer hover:bg-black hover:scale-105 transition-all duration-300">
        Edit Details
      </div>
    </div>
    </div>
  )
}

export default RentalCard
