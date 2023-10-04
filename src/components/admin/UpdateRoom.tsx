"use client";

import { RoomDocument } from "@/models/roomModel";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface UpdateRoomFormProps {
  room: RoomDocument;
}

const UpdateRoomForm = ({ room }: UpdateRoomFormProps) => {
  const [name, setName] = useState(room?.name);
  const [description, setDescription] = useState(room?.description);
  const [address, setAddress] = useState(room?.address);
  const [pricePerNight, setPricePerNight] = useState(
    String(room?.pricePerNight)
  );
  const [guestCapacity, setGuestCapacity] = useState(
    String(room?.guestCapacity)
  );
  const [numOfBeds, setNumOfBeds] = useState(String(room?.numOfBeds));
  const [category, setCategory] = useState<any>(room?.category);
  const [isInternet, setIsInternet] = useState(room?.isInternet);
  const [isBreakfast, setIsBreakfast] = useState(room?.isBreakfast);
  const [isAirConditioned, setIsAirConditioned] = useState(
    room?.isAirConditioned
  );
  const [isPetsAllowed, setIsPetsAllowed] = useState(room?.isPetsAllowed);
  const [isRoomCleaning, setIsRoomCleaning] = useState(room?.isRoomCleaning);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomData = {
      name,
      description,
      address,
      pricePerNight: +pricePerNight,
      guestCapacity: +guestCapacity,
      numOfBeds: +numOfBeds,
      category,
      isInternet,
      isBreakfast,
      isAirConditioned,
      isPetsAllowed,
      isRoomCleaning,
      user: session?.user?._id,
    };
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/admin/rooms/${room?._id}`,
        roomData,
        {
          params: {
            path: `/admin/rooms`,
          },
        }
      );
      toast.success(response.data.message);
      router.push("/admin/rooms");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full justify-start items-start"
    >
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          id="room_name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label
          htmlFor="room_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Room Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          id="room_address"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label
          htmlFor="room_address"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Address
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <textarea
          id="room_description"
          cols={30}
          rows={5}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label
          htmlFor="room_description"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Description
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="number"
          id="num_of_beds"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={numOfBeds}
          onChange={(e) => setNumOfBeds(e.target.value)}
          required
        />
        <label
          htmlFor="num_of_beds"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Number Of Beds
        </label>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 w-full">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            id="guest_capacity"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={guestCapacity}
            onChange={(e) => setGuestCapacity(e.target.value)}
            required
          />
          <label
            htmlFor="guest_capacity"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Guest Capacity
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            id="price_per_night"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            required
          />
          <label
            htmlFor="price_per_night"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Price Per Night
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6 w-full">
        <div className="flex items-center mb-4">
          <input
            id="internet"
            type="checkbox"
            checked={isInternet}
            onChange={(e) => setIsInternet(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="internet"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Internet
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="breakfast"
            type="checkbox"
            checked={isBreakfast}
            onChange={(e) => setIsBreakfast(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="breakfast"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Breakfast
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 w-full">
        <div className="flex items-center mb-4">
          <input
            id="aircondition"
            type="checkbox"
            checked={isAirConditioned}
            onChange={(e) => setIsAirConditioned(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="aircondition"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Air Condition
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="pets_allowed"
            type="checkbox"
            checked={isPetsAllowed}
            onChange={(e) => setIsPetsAllowed(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="pets_allowed"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Pets Allowed
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 w-full">
        <div className="flex items-center mb-4">
          <input
            id="room_cleaning"
            type="checkbox"
            checked={isRoomCleaning}
            onChange={(e) => setIsRoomCleaning(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="room_cleaning"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Room Cleaning
          </label>
        </div>
        <div className="flex items-center mb-4">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="King">King</option>
            <option value="Single">Single</option>
            <option value="Twins">Twins</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="text-white transition duration-150 ease-in-out bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? "Loading..." : " Update"}
      </button>
    </form>
  );
};

export default UpdateRoomForm;
