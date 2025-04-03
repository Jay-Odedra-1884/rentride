'use client'

import { useRouter } from "next/navigation";

export default function CarDetail() {

  const router = useRouter();
    return (
      <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 w-full max-w-6xl relative flex flex-col md:flex-row gap-8">
          
          {/* Back Button */}
          <button
            onClick={() => {router.back()}}
            className="absolute top-4 left-4 text-gray-600 text-2xl font-bold hover:text-blue-600"
          >
            ←
          </button>
  
          {/* Left: Car Image */}
          <div className="bg-[#f1f5fb] rounded-xl flex justify-center items-center md:w-1/2 p-4">
            <img
              src={"/car4.svg"}
              // alt={car.name}
              className="w-full h-auto object-contain"
            />
          </div>
  
          {/* Right: Details */}
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">BMW M4</h2>
            
            <div className="text-gray-600 space-y-1 text-sm">
              <div className="flex gap-4 flex-wrap">
                <span>👤 BMW M4</span>
                <span>⚙️ FAST</span>
                <span>❄️ SECURE</span>
                {/* <span>🚪 {car.features[3]}</span> */}
              </div>
            </div>

            {/* Car Angles Gallery */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">More Angles</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {["/angle1.png", "/angle2.png", "/angle3.png"].map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Angle ${index + 1}`}
                      className="w-28 h-20 rounded-lg object-cover border border-gray-200 shadow-sm hover:scale-105 transition"
                    />
                  ))}
                </div>
              </div>
  
            <div className="flex items-center gap-2 text-gray-700 text-lg">
              <span className="text-yellow-500 text-xl">★</span>
              <span>10/10</span>
              <span className="text-sm text-gray-500">(10/10 reviews)</span>
            </div>
  
            {/* Reviews (Mock) */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg px-4 py-3 text-sm w-60 shrink-0"
                >
                  <p className="font-semibold">@xyz</p>
                  <p className="text-gray-600 mt-1">
                    A ride experience is very good. Highly recommended to everyone.
                  </p>
                </div>
              ))}
            </div>

            
  
            {/* Price */}
            <div className="text-xl font-semibold">
              Price:{" "}
              <span className="text-orange-500 font-bold">1900$</span>
              <span className="text-gray-500 text-base"> /Day</span>
            </div>
  
            {/* CTA */}
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">
              Rent Now →
            </button>
          </div>
        </div>
      </div>
    );
  }
  