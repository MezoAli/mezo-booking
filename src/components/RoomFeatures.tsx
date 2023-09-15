import { BsPeopleFill } from "react-icons/bs";
import { FaBed, FaBath } from "react-icons/fa";
import { TbToolsKitchen2, TbAirConditioning } from "react-icons/tb";
import { AiOutlineWifi } from "react-icons/ai";
import { MdFreeBreakfast, MdPets } from "react-icons/md";
import { GiVacuumCleaner } from "react-icons/gi";
import { RoomDocument } from "@/models/roomModel";

interface RoomFeaturesProps {
  room: RoomDocument;
}

const RoomFeatures = ({ room }: RoomFeaturesProps) => {
  return (
    <div className="flex flex-col gap-3 justify-start items-start w-full">
      <h3 className="font-semibold text-xl">Features : </h3>
      <div className="flex justify-center items-center gap-5 text-lg">
        <BsPeopleFill />
        <p>{room.guestCapacity} Guests</p>
      </div>

      <div className="flex justify-center items-center gap-5 text-lg">
        <FaBed />
        <p>{room.numOfBeds} Beds</p>
      </div>

      <div className="flex justify-center items-center gap-5 text-lg">
        <FaBath />
        <p>1 Baths</p>
      </div>

      <div className="flex justify-center items-center gap-5 text-lg">
        <TbToolsKitchen2 />
        <p>Kitchen</p>
      </div>
      {room.isInternet && (
        <div className="flex justify-center items-center gap-5 text-lg">
          <AiOutlineWifi />
          <p>WIFI</p>
        </div>
      )}
      {room.isBreakfast && (
        <div className="flex justify-center items-center gap-5 text-lg">
          <MdFreeBreakfast />
          <p>Breakfast</p>
        </div>
      )}
      {room.isPetsAllowed && (
        <div className="flex justify-center items-center gap-5 text-lg">
          <MdPets />
          <p>Pets Allowed</p>
        </div>
      )}
      {room.isAirConditioned && (
        <div className="flex justify-center items-center gap-5 text-lg">
          <TbAirConditioning />
          <p>AirConditioned</p>
        </div>
      )}
      {room.isRoomCleaning && (
        <div className="flex justify-center items-center gap-5 text-lg">
          <GiVacuumCleaner />
          <p>RoomCleaning</p>
        </div>
      )}
    </div>
  );
};

export default RoomFeatures;
