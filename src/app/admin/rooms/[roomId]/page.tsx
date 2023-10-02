interface UpdateRoomPageProps {
  params: {
    roomId: string;
  };
}

const UpdateRoomPage = ({ params }: UpdateRoomPageProps) => {
  return <div>UpdateRoomPage - id : {params.roomId}</div>;
};

export default UpdateRoomPage;
