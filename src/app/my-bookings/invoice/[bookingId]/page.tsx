import InvoiceDetails from "@/components/InvoiceDetails";
import PaddingContainer from "@/components/PaddingContainer";
import axios from "axios";

interface BookingDetailsProps {
  params: {
    bookingId: string;
  };
}

const getInvoiceDetails = async (id: string) => {
  const response = await axios.get(`${process.env.SITE_URL}/api/booking`, {
    params: { bookingId: id },
  });
  return response.data;
};

const InvoiceDetailsPage = async ({ params }: BookingDetailsProps) => {
  const data = await getInvoiceDetails(params.bookingId);

  return (
    <PaddingContainer>
      <InvoiceDetails booking={data.booking} />
    </PaddingContainer>
  );
};

export default InvoiceDetailsPage;
