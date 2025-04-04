'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getVehicleById } from "../../../../../actions/vehicle";

export default function CarDetail() {
  
  const router = useRouter();
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    const featchVehicleById = async () => {
      try{
        const vehicle = await getVehicleById(id);
        setData(vehicle);
        console.log(vehicle);
        console.log("i am here");
      }
      catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    }

    featchVehicleById();
  }, []);

    return (
      <div>
        {data.name}
    </div>
    );
  }
  