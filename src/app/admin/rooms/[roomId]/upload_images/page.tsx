import UploadImageForm from "@/components/admin/UploadImageForm";
import axios from "axios";

interface UpdateRoomPageProps {
  params: {
    roomId: string;
  };
}

const getRoomData = async (roomId: string) => {
  try {
    const response = await axios.get(
      `${process.env.SITE_URL}/api/rooms/${roomId}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

const UploadImagesPage = async ({ params }: UpdateRoomPageProps) => {
  const roomData = await getRoomData(params?.roomId);
  return <UploadImageForm room={roomData?.room} />;
};

export default UploadImagesPage;
