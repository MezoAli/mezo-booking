import UploadImageForm from "@/components/admin/UploadImageForm";

interface UpdateRoomPageProps {
  params: {
    roomId: string;
  };
}

const UploadImagesPage = ({ params }: UpdateRoomPageProps) => {
  return <UploadImageForm />;
};

export default UploadImagesPage;
