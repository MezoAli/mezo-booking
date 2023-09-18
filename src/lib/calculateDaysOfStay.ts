import moment from "moment";

const calculateDaysOfStay = (checkInDate: Date, checkOutDate: Date) => {
  const startDate = moment(checkInDate);
  const endDate = moment(checkOutDate);

  return endDate.diff(startDate, "days");
};

export default calculateDaysOfStay;
