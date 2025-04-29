"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  deleteVehicle,
  getVehicleById,
  updateVehicle,
} from "../../../../../actions/vehicle";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { BarLoader } from "react-spinners";

const formSchema = z.object({
  name: z.string().min(1, { message: "Car name is required" }),
  brandName: z.string().min(1, { message: "Brand name is required" }),
  imageUrl: z.string().url({ message: "Invalid URL" }),
  type: z.enum([
    "CAR",
    "TRUCK",
    "BIKE",
    "SUV",
    "SEDAN",
    "VAN",
    "ELECTRIC",
    "LUXURY",
  ]),
  gearType: z.enum(["AUTOMATIC", "MANUAL"]),
  doors: z.number(),
  passengerCapacity: z
    .number()
    .min(1, { message: "Passenger capacity is required" }),
  price: z.number().min(1, { message: "Price is required" }),
  rating: z
    .number()
    .min(0)
    .max(5, { message: "Rating must be between 0 and 5" }),
  vehicleNumber: z.string().regex(/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/, {
    message: "Invalid vehicle number",
  }),
  airConditioning: z.boolean(),
  // OwnerName: z.string().min(1, { message: "Owner name is required" }),
});

function page() {
  const [data, setData] = useState();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const featchVehicleById = async () => {
      try {
        const vehicle = await getVehicleById(id);
        setData(vehicle);
        reset(vehicle);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    featchVehicleById();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brandName: "",
      imageUrl: null,
      type: undefined,
      gearType: undefined,
      doors: undefined,
      passengerCapacity: undefined,
      price: undefined,
      rating: 0.0,
      vehicleNumber: "",
      airConditioning: true,
    },
  });

  const watchedImageUrl = watch("imageUrl");

  const {
    data: updatedData,
    loading: updateLoading,
    error: updateError,
    fn: updateVehicleFn,
  } = useFetch(updateVehicle);

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
      await updateVehicleFn(id, data);
      router.push("/rental");
      toast.success("Vehicle updated successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (updateError) {
      toast.error(updateError.message);
      console.log(updateError.message);
    }
  }, [updateError]);

  const {
    data: deletedData,
    loading: deleteLoading,
    error: deleteError,
    fn: deleteVehicleFn,
  } = useFetch(deleteVehicle);

  const handleDelete = async () => {
    let confirmation = confirm(
      "⚠️ Warning: Deleting this car listing is permanent and cannot be undone. Once deleted, all related data will be lost."
    );
    if (confirmation) {
      await deleteVehicleFn(id);
      router.push("/rental");
      toast.success("Vehicle deleted successfully");
    }
  };

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError.message);
      console.log(deleteError.message);
    }
  }, [deleteError]);
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center mt-10">
      {data ? (
        <div className="w-full">
          <div className="w-full flex flex-wrap md:flex-nowrap">
            <div className="w-full md:w-2/3 flex justify-center items-center border rounded-3xl">
              <Image
                src={watchedImageUrl || data.imageUrl}
                width={300}
                height={300}
                alt="Car Image"
              />
            </div>
            <div className="flex justify-center items-center h-auto w-full">
              <form
                className="w-full max-w-4xl bg-white rounded-3xl p-6 border"
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className="text-2xl font-bold mb-6">Car details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Car Name"
                      name="name"
                      {...register("name", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    {errors.name && (
                      <p className="text-red-500">
                        Please enter valid car name
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Brand Name"
                      name="brandName"
                      {...register("brandName", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    {errors.brandName && (
                      <p className="text-red-500">Please enter valid Brand</p>
                    )}
                  </div>
                </div>

                <div className="mb-6 mt-6">
                  <input
                    type="text"
                    placeholder="Image URL"
                    onChange={(event) => setImage(event.target.value)}
                    name="imageUrl"
                    {...register("imageUrl", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  {errors.imageUrl && (
                    <p className="text-red-500">Please enter URL</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <input
                      type="number"
                      placeholder="price(₹)"
                      name="price"
                      {...register("price", {
                        required: true,
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    {errors.price && (
                      <p className="text-red-500">Please enter price</p>
                    )}
                  </div>

                  <div>
                    <select
                      name="gearType"
                      {...register("gearType", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-no-repeat"
                      style={{
                        backgroundImage:
                          'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l5 5 5-5z" fill="%23343a40"/></svg>\')',
                        backgroundPosition: "right 0.5rem center",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option value="">Auto/Manual</option>
                      <option value="AUTOMATIC">Automatic</option>
                      <option value="MANUAL">Manual</option>
                    </select>
                    {errors.gearType && (
                      <p className="text-red-500">Please select gear type</p>
                    )}
                  </div>

                  <div>
                    <select
                      name="airConditioning"
                      {...register("airConditioning", {
                        required: true,
                        setValueAs: (v) => v === "true",
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-no-repeat"
                      style={{
                        backgroundImage:
                          'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l5 5 5-5z" fill="%23343a40"/></svg>\')',
                        backgroundPosition: "right 0.5rem center",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option value="">AC/NonAC</option>
                      <option value="true">AC</option>
                      <option value="false">Non-AC</option>
                    </select>
                    {errors.airConditioning && (
                      <p className="text-red-500">Please select</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <input
                      type="number"
                      placeholder="Passenger Capacity"
                      name="passengerCapacity"
                      {...register("passengerCapacity", {
                        required: true,
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    {errors.passengerCapacity && (
                      <p className="text-red-500">
                        Please enter valid passenger capacity
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Number of doors"
                      name="doors"
                      {...register("doors", {
                        required: true,
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    {errors.doors && (
                      <p className="text-red-500">
                        Please enter valid number of doors
                      </p>
                    )}
                  </div>
                  <div>
                    <select
                      name="type"
                      {...register("type", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-no-repeat"
                      style={{
                        backgroundImage:
                          'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l5 5 5-5z" fill="%23343a40"/></svg>\')',
                        backgroundPosition: "right 0.5rem center",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option value="">Vehicle Type</option>
                      <option value="CAR">CAR</option>
                      <option value="TRUCK">TRUCK</option>
                      <option value="BIKE">BIKE</option>
                      <option value="SUV">SUV</option>
                      <option value="SEDAN">SEDAN</option>
                      <option value="VAN">VAN</option>
                      <option value="ELECTRIC">ELECTRIC</option>
                      <option value="LUXURY">LUXURY</option>
                    </select>
                    {errors.type && (
                      <p className="text-red-500">Please select vehicle type</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                      {updateLoading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>
            {/* <p className="text-red-500">⚠️ Warning: Deleting this car listing is permanent and cannot be undone. Once deleted, all related data will be lost.</p> */}
          </div>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
          <BarLoader color="#3b82f6" height={6} width={150} />
        </div>
      )}
    </div>
  );
}

export default page;
