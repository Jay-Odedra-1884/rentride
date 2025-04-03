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
import { useState } from "react";
import { motion } from "framer-motion";

function Page() {
  const [vehicles, setVehicles] = useState([
    {
      image: "/car1.svg",
      name: "BMW M4",
      passenger: "4",
      type: "Automatic",
      airConditioning: "Air Conditioning",
      doors: "4",
      rating: "4.8",
      price: "10000",
      rental: "City Rentals",
    },
    {
      image:
        "https://i.pinimg.com/736x/9e/ca/e5/9ecae5a5505b76b0f41b69eae06be1f9.jpg",
      name: "Mahindra Thar",
      passenger: "4",
      type: "Manual",
      airConditioning: "Air Conditioning",
      doors: "3",
      rating: "4.5",
      price: "5000",
      rental: "City Rentals",
    },
    {
      image:
        "https://wallpapers.com/images/hd/white-mahindra-bolero-side-view-v56o5ghhb4nm6s7r-2.png",
      name: "Mahindra Bolero",
      passenger: "7",
      type: "Manual",
      airConditioning: "Air Conditioning",
      doors: "5",
      rating: "4.9",
      price: "4000",
      rental: "Drive Easy",
    },
  ]);

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    passenger: "",
    type: "",
    airConditioning: "",
    doors: "",
    rating: "",
    price: "",
    rental: "",
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, documents: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicle = { ...formData };
    setVehicles((prev) => [...prev, newVehicle]); // Add new vehicle to the state
    // Reset form data after submission
    setFormData({
      image: "",
      name: "",
      passenger: "",
      type: "",
      airConditioning: "",
      doors: "",
      rating: "",
      price: "",
      rental: "",
      documents: null,
    });
  };

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
        <Drawer>
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
                    onSubmit={handleSubmit}
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
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <input
                          type="text"
                          placeholder="Brand Name"
                          name="brandName"
                          value={formData.brandName || ""}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <input
                          type="text"
                          placeholder="Car Number"
                          name="carNumber"
                          value={formData.carNumber || ""}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </motion.div>
                    </div>

                    <motion.div className="mb-6 mt-6" variants={itemVariants}>
                      <input
                        type="text"
                        placeholder="Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <motion.div variants={itemVariants}>
                        <input
                          type="text"
                          placeholder="Price (₹)"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-no-repeat"
                          style={{
                            backgroundImage:
                              'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l5 5 5-5z" fill="%23343a40"/></svg>\')',
                            backgroundPosition: "right 0.5rem center",
                            backgroundSize: "1.5em 1.5em",
                          }}
                        >
                          <option value="">Auto/Manual</option>
                          <option value="automatic">Automatic</option>
                          <option value="manual">Manual</option>
                        </select>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <select
                          name="airConditioning"
                          value={formData.airConditioning}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-no-repeat"
                          style={{
                            backgroundImage:
                              'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l5 5 5-5z" fill="%23343a40"/></svg>\')',
                            backgroundPosition: "right 0.5rem center",
                            backgroundSize: "1.5em 1.5em",
                          }}
                        >
                          <option value="">AC/Non-AC</option>
                          <option value="ac">AC</option>
                          <option value="nonac">Non-AC</option>
                        </select>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <motion.div variants={itemVariants}>
                        <input
                          type="number"
                          placeholder="Passenger"
                          name="passenger"
                          value={formData.passenger}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <input
                          type="number"
                          placeholder="Number of doors"
                          name="doors"
                          value={formData.doors}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </motion.div>
                    </div>

                    <motion.div className="mb-6" variants={itemVariants}>
                      <input
                        type="text"
                        placeholder="Car Owner Name"
                        name="rental"
                        value={formData.rental}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </motion.div>

                    <motion.div className="mb-8" variants={itemVariants}>
                      <input
                        type="file"
                        placeholder="Upload Docs."
                        name="documents"
                        onChange={handleFileChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </motion.div>

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
                          Submit
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
