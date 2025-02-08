"use client";
import { AnimatedShinyTextDemo } from "@/components/fs";
import { AuroraText } from "@/components/magicui/aurora-text";
import { div, p } from "motion/react-client";
import { useState } from "react";

const Bgremoval = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [output, setOutput] = useState<string | undefined>();
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
    <div className="relative w-full min-h-screen">
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
        <div className=" border border-dashed   items-center mt-14 h-[250px] px-4  w-[450px] flex gap-8">
          {!image && (
            <div className=" ml-8  w-96 flex justify-center">
              <label
                className="bg-neutral-900 mt-4   text-white px-8 py-5 cursor-pointer relative 
  transition-all duration-200 -translate-x-[5px] translate-y-0
  shadow-[-5px_7px_0px_rgba(255,255,255,5)]
  hover:-translate-x-[2px] hover:translate-y-[4px]
  hover:shadow-[-2px_2px_0px_rgba(255,255,255,5)]"
              >
                Upload Image
                <input
                  type="file"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          )}
          {preview && (
            <div className="">
              <img
                src={preview}
                alt="Uploaded Preview"
                className=" rounded shadow-lg"
                width={200}
              />
            </div>
          )}
          {loading ? (
            <div className=" ml-6 ">
              <img className=" " width={130} src={"/magic.gif"} alt="" />
            </div>
          ) : (
            <div>
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
          )}
        </div>
        <div className=" flex gap-5 justify-center">
          {image && (
            <div>
              <button
                onClick={removebg}
                className="bg-black mt-4 text-white px-6 py-4 cursor-pointer relative 
  transition-all duration-200 -translate-x-[5px] translate-y-0
  shadow-[-5px_7px_0px_rgba(255,255,255,5)]
  hover:-translate-x-[2px] hover:translate-y-[4px]
  hover:shadow-[-2px_2px_0px_rgba(255,255,255,5)]"
              >
                Remove BG
              </button>
            </div>
          )}
          {output && (
            <a
              href={output}
              className="bg-black mt-4 text-white px-6 py-4 cursor-pointer relative 
  transition-all duration-200 -translate-x-[5px] translate-y-0
  shadow-[-5px_7px_0px_rgba(255,255,255,5)]
  hover:-translate-x-[2px] hover:translate-y-[4px]
  hover:shadow-[-2px_2px_0px_rgba(255,255,255,5)]"
              download={"bgremoved.png"}
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bgremoval;
