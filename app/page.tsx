"use client";
import { AnimatedShinyTextDemo } from "@/components/fs";
import { AuroraText } from "@/components/magicui/aurora-text";
import { IconBrandGithub, IconBrandX } from "@tabler/icons-react";
import { useState } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Bgremoval = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>();
  const [output, setOutput] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(file);
      setPreview(objectUrl);
      setOutput(undefined);
      setError(null);
    }
  };

  const removebg = async () => {
    if (!image) return;

    // const apiKey = process.env.NEXT_PUBLIC_API;
    // if (!apiKey) {
    //   setError("API key is not configured");
    //   return;
    // }
    // console.log(apiKey);

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image_file", image);
    formData.append("size", "auto");

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "RkmG8MqycfbykwQ4v5KjwqXx",
        } as HeadersInit,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      setOutput(URL.createObjectURL(blob));
    } catch (e) {
      console.error("Error while removing background:", e);
      setError("Failed to remove background. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Button = ({ onClick, children }: ButtonProps) => (
    <button
      onClick={onClick}
      className="bg-black mt-4 text-white px-6 py-4 cursor-pointer relative 
        transition-all duration-200 -translate-x-[5px] translate-y-0
        shadow-[-5px_7px_0px_rgba(255,255,255,5)]
        hover:-translate-x-[2px] hover:translate-y-[4px]
        hover:shadow-[-2px_2px_0px_rgba(255,255,255,5)]"
    >
      {children}
    </button>
  );

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0 bg-black [background-size:20px_20px] [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_3px)]" />
      <div className="relative z-10 p-6">
        <div className="gap-2 flex justify-end">
          <a
            href="https://github.com/akshitvigg/bg-remove"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="cursor-pointer hover:bg-slate-200 active:scale-95 transition-all duration-300 rounded-md px-3 flex py-2 bg-white">
              <p className="text-md font-bold mr-1">Star me on</p>
              <IconBrandGithub size={22} />
            </div>
          </a>
          <a
            href="https://x.com/AkshitVig4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="hover:bg-slate-200 active:scale-95 transition-all duration-300 rounded-md cursor-pointer px-3 flex py-2 bg-white">
              <p className="text-md font-bold mr-1">Follow me on</p>
              <IconBrandX size={22} />
            </div>
          </a>
        </div>

        <div className="flex flex-col items-center">
          <AnimatedShinyTextDemo />
          <p className="text-white text-4xl md:text-7xl mt-8 font-bold">
            Bg
            <AuroraText>
              <i>Gone</i>
            </AuroraText>
          </p>
          <p className="text-zinc-300 text-md md:text-md tracking-widest pt-3">
            Remove backgrounds instantly with ease.
          </p>

          {error && (
            <div className="mt-4 text-red-500 bg-red-100 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <div className="border border-dashed items-center mt-14 min-h-[250px] p-4 w-full max-w-[450px] flex flex-col md:flex-row gap-8 justify-center">
            <div className="flex flex-col items-center gap-4">
              {!image ? (
                <label
                  className="bg-neutral-900 mt-4 text-white px-8 py-5 cursor-pointer relative 
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
              ) : (
                <img
                  src={preview}
                  alt="Uploaded Preview"
                  className="rounded shadow-lg max-w-[200px] w-full h-auto"
                />
              )}
            </div>

            {loading ? (
              <div className="flex justify-center">
                <img className="w-32" src="/magic.gif" alt="Loading..." />
              </div>
            ) : (
              output && (
                <div className="flex flex-col items-center">
                  <img
                    src={output}
                    alt="Processed Image"
                    className="rounded shadow-lg max-w-[200px] w-full h-auto"
                  />
                </div>
              )
            )}
          </div>

          <div className="flex flex-wrap gap-5 justify-center mt-4">
            {image && !output && !loading && (
              <Button onClick={removebg}>Remove BG</Button>
            )}
            {output && (
              <>
                <a
                  href={output}
                  className="bg-black mt-4 text-white px-6 py-4 cursor-pointer relative 
                    transition-all duration-200 -translate-x-[5px] translate-y-0
                    shadow-[-5px_7px_0px_rgba(255,255,255,5)]
                    hover:-translate-x-[2px] hover:translate-y-[4px]
                    hover:shadow-[-2px_2px_0px_rgba(255,255,255,5)]"
                  download="bgremoved.png"
                >
                  Download
                </a>
                <label
                  className="bg-black mt-4 text-white px-6 py-4 cursor-pointer relative 
                  transition-all duration-200 -translate-x-[5px] translate-y-0
                  shadow-[-5px_7px_0px_rgba(255,255,255,5)]
                  hover:-translate-x-[2px] hover:translate-y-[4px]
                  hover:shadow-[-2px_2px_0px_rgba(255,255,255,5)]"
                >
                  Upload New
                  <input
                    type="file"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bgremoval;
