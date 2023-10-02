interface UpdateRoomPageProps {
  params: {
    roomId: string;
  };
}

const UploadImagesPage = ({ params }: UpdateRoomPageProps) => {
  return <div>UploadImagesPage id : {params.roomId}</div>;
};

export default UploadImagesPage;
