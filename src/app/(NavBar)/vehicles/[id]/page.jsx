"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getVehicleById } from "../../../../../actions/vehicle";
import { FaSnowflake, FaCogs, FaIdCard, FaCarSide } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { GiCarDoor } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { IoIosCheckbox } from "react-icons/io";
import Image from "next/image";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const bookingSchema = z
  .object({
    pickupLocation: z.string().min(1, "Pickup location is required"),
    dropoffLocation: z.string().min(1, "Dropoff location is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  // Check that startTime is not in the past
  .refine(
    (data) => {
      const start = new Date(data.startTime);
      const now = new Date();
      return start >= now;
    },
    {
      path: ["startTime"],
      message: "Invalid Date and Time",
    }
  )
  // Check that endTime is after startTime
  .refine(
    (data) => {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      return end > start;
    },
    {
      path: ["endTime"],
      message: "Invalid Date and Time",
    }
  );

export default function CarDetail() {
  const router = useRouter();
  const [data, setData] = useState();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      user: "User Name",
      text: "Just took a test drive of the new Creta last weekend — and wow, Hyundai really nailed the interior this time.",
    },
  ]);

  useEffect(() => {
    const featchVehicleById = async () => {
      try {
        const vehicle = await getVehicleById(id);
        setData(vehicle);
        console.log(vehicle);
        console.log("i am here");
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    featchVehicleById();
  }, []);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([{ user: "User Name", text: comment }, ...comments]);
      setComment("");
    }
  };

  // Booking Form (pop up)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
    document.getElementById("book_ride_form").close();
  };

  
  if (!data) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading vehicle details...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white px-4 md:px-16 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="text-xl rounded-lg p-2 border w-fit text-gray-500 hover:bg-gray-100 mb-4 cursor-pointer hover:text-black hover:scale-105 transition-all duration-200"
      >
        <HiArrowLeft className="text-2xl h-5 w-5  " />
      </button>

      {/* Top Section */}
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Left - Car Image */}
        <div className="bg-[#dcebfb] rounded-xl w-full lg:w-1/2 p-4 flex justify-center items-center">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="object-contain h-[250px] mt-10"
          />
          {/* <Image src={data.imageUrl} width={400} height={300} alt={data.name} /> */}
        </div>

        {/* Right - Car Info */}
        <div className="w-full lg:w-1/2 space-y-2 pr-20">
          <div className="flex items-start justify-between ">
            <div>
              <h1 className="text-3xl font-bold">{data.name}</h1>
              <p className="text-gray-600">
                By {data.owner?.name || "OwnerName"}
              </p>
              {console.log(data)}
            </div>
            <div className="flex items-center text-yellow-500 font-semibold text-lg">
              ⭐ {data.rating?.toFixed(1) || "No rating"}
            </div>
          </div>

          <div className="text-sm text-gray-700 pt-3 space-y-2">
            <div className="flex items-center gap-2">
              <FaCarSide /> {data.passengerCapacity} Passengers
            </div>
            <div className="flex items-center gap-2">
              <FaCogs /> {data.gearType}
            </div>
            {data.airConditioning ? (
              <div className="flex items-center gap-2">
                <FaSnowflake /> Air Conditioning
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaSnowflake /> NON-AC
              </div>
            )}
            <div className="flex items-center gap-2">
              <GiCarDoor />
              {data.doors} Doors
            </div>
            <div className="flex items-center gap-2">
              <FaIdCard /> {data.vehicleNumber}
            </div>
            <div className="flex items-center gap-2">🏷️ {data.brandName}</div>
            <div className="flex items-center gap-2">🚗 Type: {data.type}</div>
            <div className="flex items-center gap-2 ">
              <span className="text-xl text-green-500">
                {data.isBooked ? <FcCancel /> : <IoIosCheckbox />}
              </span>
              Status: {data.isBooked ? "Not Available" : "Available"}
            </div>
          </div>
          <br />
          <br />
          <br />

          <div className="text-xl font-semibold mt-4">
            Price: <span className="text-orange-500">{data.price}₹</span>
            <span className="text-gray-500"> /Day</span>
          </div>

          {data.isBooked ? (
            <div className="mt-2 w-full py-2 rounded-lg bg-gray-300 text-gray-600 text-center font-semibold cursor-not-allowed">
              Booked
            </div>
          ) : (
            <button
              onClick={() =>
                document.getElementById("book_ride_form")?.showModal()
              }
              className="mt-2 bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Rent Now →
            </button>
          )}
        </div>
      </div>

      {/* Comment Input */}
      <div className="mt-6 border rounded-xl px-4 py-2 flex justify-between items-center h-30">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add Comments here.........."
          className=" text-lg w-full bg-transparent focus:outline-none "
        />
        <button
          onClick={handleCommentSubmit}
          className="text-l bg-blue-600 px-4 py-2 rounded-xl  text-white font-normal hover:bg-blue-700 cursor-pointer"
        >
          Post
        </button>
      </div>

      {/* Popup */}
      <dialog
        id="book_ride_form"
        className="modal modal-bottom sm:modal-middle rounded-3xl sm:w-1/2 w-full"
      >
        <div className="flex justify-center items-center h-auto w-full p-4">
          <form
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-4xl bg-white rounded-3xl p-6 border"
          >
            <h3 className="text-2xl font-bold mb-6">Book Your Ride</h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Pickup Location */}
              <div>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  name="pickupLocation"
                  {...register("pickupLocation", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                {errors.pickupLocation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pickupLocation.message}
                  </p>
                )}
              </div>

              {/* Dropoff Location */}
              <div>
                <input
                  type="text"
                  placeholder="Enter dropoff location"
                  name="dropoffLocation"
                  {...register("dropoffLocation", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                {errors.dropoffLocation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dropoffLocation.message}
                  </p>
                )}
              </div>

              {/* Start Time */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  {...register("startTime", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              {/* End Time */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  {...register("endTime", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endTime.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="modal-action grid sm:grid-cols-2 gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Book Ride
                </button>
                <button
                  type="button"
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg"
                  onClick={() => {
                    reset();
                    document.getElementById("book_ride_form").close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
