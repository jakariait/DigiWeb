"use client"; // Required for client components in Next.js 13+

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2 } from "lucide-react";
import ImageComponent from "@/components/ImageComponent"; // Adjust path if needed
import useAuthAdminStore from "@/store/AuthAdminStore"; // Use alias or adjust if needed

const BrandUpload = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ✅ Use Next.js env variable
  const { token } = useAuthAdminStore();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getallcarousel`);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    if (apiUrl) fetchImages(); // avoid call on undefined URL
  }, [apiUrl]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imgSrc", file);

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/createcarousel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.imgSrc) {
        setImages((prevImages) => [...prevImages, response.data]);
      }
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = async (imageId) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Are you sure you want to delete this image?")
    ) {
      try {
        await axios.delete(`${apiUrl}/deletebyidcarousel/${imageId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImages((prevImages) =>
          prevImages.filter((img) => img._id !== imageId),
        );
      } catch (error) {
        console.error("Error deleting image", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 shadow bg-white rounded-lg">
      <h1 className="border-l-4 primaryBorderColor primaryTextColor mb-6 pl-2 text-lg font-semibold self-start">
        Manage Brands Logo
      </h1>

      <label className="cursor-pointer inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition duration-300">
        <Upload className="mr-2" size={18} />
        Select Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {loading && <p className="text-blue-500 mt-3">Uploading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <AnimatePresence>
          {images.length > 0 ? (
            images.map((image) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative bg-white shadow rounded-lg overflow-hidden"
              >
                <ImageComponent
                  imageName={image.imgSrc}
                  className="object-cover rounded-lg"
                />
                <button
                  onClick={() => handleImageDelete(image._id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow transition duration-300"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3">No images uploaded yet.</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrandUpload;
