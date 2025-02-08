"use client";
import { AnimatedShinyTextDemo } from "@/components/fs";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useState } from "react";

const Bgremoval = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(file);
      setPreview(objectUrl);
      console.log(preview);
    }
  };

  const removebg = async () => {
    if (!image) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image_file", image);
    formData.append("size", "auto");

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "RkmG8MqycfbykwQ4v5KjwqXx",
        },
        body: formData,
      });
      const blob = await response.blob();
      setOutput(URL.createObjectURL(blob));
    } catch (e) {
      console.log(e + "error while removing bg");
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 bg-black [background-size:20px_20px] [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_3px)]" />

      <div className="relative z-10 p-6 flex flex-col items-center">
        <AnimatedShinyTextDemo />
        <p className=" text-white text-7xl mt-8 font-bold">
          Bg
          <AuroraText>
            <i>Gone</i>
          </AuroraText>
        </p>

        <p className=" text-zinc-300 text-md tracking-widest pt-3">
          Remove backgrounds instantly with ease.
        </p>
        <div className=" flex gap-8">
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Uploaded Preview"
                className=" rounded shadow-lg"
                width={200}
              />
            </div>
          )}
          {output && (
            <div className="mt-4">
              <img
                src={output}
                alt="Uploaded Preview"
                className=" rounded shadow-lg"
                width={200}
              />
            </div>
          )}
        </div>
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Select Image
          <input
            type="file"
            onChange={handleChange}
            accept="image/*"
            className="hidden"
          />
        </label>
        <button className=" bg-white" onClick={removebg}>
          remove bg
        </button>
      </div>
    </div>
  );
};

export default Bgremoval;
