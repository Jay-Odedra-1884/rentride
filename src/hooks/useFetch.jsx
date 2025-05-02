"use client";

import React, { useState } from "react";
import { toast } from "sonner";

function useFetch(cb) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...arg) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...arg);
      console.log("✅ useFetch result:", response); 
      setData(response);
      setError(null);
    } catch (error) {
      console.error("❌ useFetch error:", error);
      setError(true);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
}

export default useFetch;
