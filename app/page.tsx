"use client";
import { useState } from "react";

const Bgremoval = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(file);
      setPreview(objectUrl);
      console.log(preview);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black [background-size:20px_20px] [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_3px)]" />

      {/* Content container */}
      <div className="relative z-10 p-6 flex flex-col items-center">
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Select Image
          <input
            type="file"
            onChange={handleChange}
            accept="image/*"
            className="hidden"
          />
        </label>

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Uploaded Preview"
              className="max-w-sm rounded shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bgremoval;
