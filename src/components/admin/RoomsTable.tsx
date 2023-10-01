"use client";
import { RoomDocument } from "@/models/roomModel";
import Link from "next/link";
import { AiOutlineEdit, AiOutlineFileImage } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

interface RoomsTableProps {
  rooms: RoomDocument[];
}

const RoomsTable = ({ rooms }: RoomsTableProps) => {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      {rooms.length === 0 && (
        <p className="text-2xl text-center my-4 font-semibold">
          You Do Not Have Any Rooms
        </p>
      )}
      {rooms.length > 0 && (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Room Id
              </th>
              <th scope="col" className="px-6 py-3">
                Room Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              return (
                <tr
                  key={room?._id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 truncate py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {room?._id}
                  </th>
                  <td className="px-6 py-4 truncate">{room?.name}</td>

                  <td className="px-6 py-4 flex justify-center gap-1 items-center">
                    <Link
                      href={"#"}
                      className="px-2 py-1 text-xl bg-green-600 rounded-md text-white hover:bg-green-900 transition duration-150 ease-in-out"
                    >
                      <AiOutlineEdit />
                    </Link>
                    <Link
                      href={"#"}
                      className="px-2 py-1 text-xl bg-blue-600 rounded-md text-white hover:bg-blue-900 transition duration-150 ease-in-out"
                    >
                      <AiOutlineFileImage />
                    </Link>
                    <button className="px-2 text-xl py-1 bg-brand rounded-md text-white hover:bg-red-900 transition duration-150 ease-in-out">
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoomsTable;
