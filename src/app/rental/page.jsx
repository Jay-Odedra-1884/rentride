"use client";

import RentalCard from "@/components/RentalCard";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/useFetch";
import { createVehicle } from "../../../actions/vehicle";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  vehicleNumber: z
    .string()
    .regex(/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/, {
      message: "Invalid vehicle number",
    }),
  airConditioning: z.boolean(),
  // OwnerName: z.string().min(1, { message: "Owner name is required" }),
});

function page() {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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


  const {data:newVehicle,loading:createVehicleLoading,error,fn:createVehicleFn} = useFetch(createVehicle)

  

  const onSubmit = async (data) => {
    try {
      await createVehicleFn(data);
      reset();
      setIsDrawerOpen(false);
      toast.success("Vehicle created successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(()=>{
    if(error){
      toast.error(error.message)
      console.log(error.message)
    }
  },[error])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="px-10 mt-6">
      <div className="flex justify-between">
        <h2 className="font-semibold text-3xl">My Cars</h2>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger>
            <div className="bg-black text-white cursor-pointer px-4 py-1 rounded-sm">
              + Add new car
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                <div className="flex justify-center items-center h-auto w-full px-4">
                  <motion.form
                    className="w-full max-w-4xl bg-white rounded-3xl p-6 border"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <motion.h2
                      className="text-2xl font-bold mb-6"
                      variants={itemVariants}
                    >
                      Car details
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div variants={itemVariants}>
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
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <input
                          type="text"
                          placeholder="Brand Name"
                          name="brandName"
                          {...register("brandName", { required: true })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.brandName && (
                          <p className="text-red-500">
                            Please enter valid Brand
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <input
                          type="text"
                          placeholder="GJXXAXXXX"
                          name="vehicleNumber"
                          {...register("vehicleNumber", { required: true })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.vehicleNumber && (
                          <p className="text-red-500">
                            Please enter number (ex:GJ12B1234)
                          </p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div className="mb-6 mt-6" variants={itemVariants}>
                      <input
                        type="text"
                        placeholder="Image URL"
                        name="imageUrl"
                        {...register("imageUrl", { required: true })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                      {errors.imageUrl && (
                        <p className="text-red-500">Please enter URL</p>
                      )}
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <motion.div variants={itemVariants}>
                        <input
                          type="number"
                          placeholder="price(₹)"
                          name="price"
                          {...register("price", {
                            required: true,
                            setValueAs: (v) =>
                              v === "" ? undefined : Number(v),
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.price && (
                          <p className="text-red-500">Please enter price</p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
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
                          <p className="text-red-500">
                            Please select gear type
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
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
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <motion.div variants={itemVariants}>
                        <input
                          type="number"
                          placeholder="Passenger Capacity"
                          name="passengerCapacity"
                          {...register("passengerCapacity", {
                            required: true,
                            setValueAs: (v) =>
                              v === "" ? undefined : Number(v),
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.passengerCapacity && (
                          <p className="text-red-500">
                            Please enter valid passenger capacity
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <input
                          type="number"
                          placeholder="Number of doors"
                          name="doors"
                          {...register("doors", { required: true, setValueAs: (v) => v === "" ? undefined : Number(v) })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.doors && (
                          <p className="text-red-500">
                            Please enter valid number of doors
                          </p>
                        )}
                      </motion.div>
                      <motion.div variants={itemVariants}>
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
                          <p className="text-red-500">
                            Please select vehicle type
                          </p>
                        )}
                      </motion.div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <motion.div
                        className="flex justify-start"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <DrawerClose>
                          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg">
                            Cancel
                          </button>
                        </DrawerClose>
                      </motion.div>

                      <motion.div
                        className="flex justify-end"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg"
                        >
                          {createVehicleLoading ? "Creating..." : "Create"}
                        </button>
                      </motion.div>
                    </div>
                  </motion.form>
                </div>
              </DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="mt-4 flex gap-3 flex-wrap">
        {vehicles.map((vehicle, index) => (
          <RentalCard data={vehicle} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Page;
