"use client";

import { RoomDocument, Image as RoomImage } from "@/models/roomModel";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

interface UploadImageFormProps {
  room: RoomDocument;
}

const UploadImageForm = ({ room }: UploadImageFormProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<RoomImage[]>(
    room?.images
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files || [];
      Array.from(files).forEach((file) => {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onloadend = () => {
          if (fr.result) {
            const result = fr.result;
            setImages((prev: any) => [...prev, result]);
            setPreviewImages((prev: any) => [...prev, result]);
          }
        };
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/admin/rooms/${room?._id}/upload_images`,
        images
      );
      toast.success(response?.data?.message);
      console.log(response.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full justify-start items-start">
      <h2 className="text-2xl font-semibold">Upload Images For {room?.name}</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-start justify-start"
      >
        <input
          type="file"
          multiple
          onChange={(e) => handleChange(e)}
          placeholder="Choose Images"
        />
        <button
          type="submit"
          className="bg-blue-400 rounded-md px-4 py-2 transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {previewImages.length > 0 && (
        <div className="flex flex-col justify-start items-start gap-2 w-full py-3 border-b">
          <p>Selected Images</p>
          <div className="w-full gap-3 grid grid-cols-1 md:grid-cols-2">
            {previewImages.map((img) => {
              return (
                <Image
                  src={img}
                  key={img}
                  alt={img}
                  width={300}
                  height={200}
                  className="border rounded-md shadow-sm"
                />
              );
            })}
          </div>
        </div>
      )}
      {uploadedImages.length > 0 && (
        <div className="flex flex-col justify-start items-start gap-2 w-full py-3 border-b">
          <p>Room Images</p>
          <div className="w-full gap-3 grid grid-cols-1 md:grid-cols-2">
            {uploadedImages.map((img) => {
              return (
                <div
                  key={img.public_id}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <div className="w-[280px] h-[280px] rounded-md shadow-sm bg-gray-400 relative">
                    <Image
                      src={img.url}
                      key={img.public_id}
                      alt="room-image"
                      fill
                      className="border rounded-md shadow-sm"
                    />
                  </div>
                  <button className="px-4 py-2 rounded-md bg-brand text-white hover:bg-red-900 transition duration-150 ease-in-out">
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImageForm;
