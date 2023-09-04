"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const SearchPage = () => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  console.log(category);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (location.trim() === "") {
      toast.error("Please enter valid inputs for location");
    } else if (category === "") {
      toast.error("Please select category");
    } else {
      router.push(`/?location=${location}&category=${category}`);
    }
  };
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="border border-cyan-400 shadow-md rounded-md p-8 flex flex-col gap-5 justify-center items-center">
        <h3 className="text-2xl text-[#EC194E]">Search Rooms</h3>
        <form
          className="flex flex-col gap-5 justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center w-full">
            <label htmlFor="location" className="text-lg font-semibold">
              Location
            </label>
            <input
              type="text"
              placeholder="Ex: New York"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border w-full text-[#EC194E] border-blue-400 px-3 py-2 focus:outline-none focus:border-blue-600 rounded-md mx-5"
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <label htmlFor="category" className="text-lg font-semibold">
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              defaultValue="Select Option"
              className="border w-full text-[#EC194E] border-blue-400 px-3 py-2 focus:outline-none focus:border-blue-600 rounded-md mx-5"
            >
              <option value="Select Option" disabled>
                Select Option
              </option>
              <option value="Single">Single</option>
              <option value="Twins">Twins</option>
              <option value="King">King</option>
            </select>
          </div>
          <button
            type="submit"
            className="rounded-md bg-[#EC194E] text-white px-5 py-2"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
