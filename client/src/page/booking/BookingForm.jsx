import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import style from "./booking.module.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { getHospitaBookingListById } from "../../service/hospitalData";
import Check from "../../component/check/Check";

export default function BookingForm() {
  const param = useParams();
  const { id } = param;
  const dispatch = useDispatch();
  // set for render date
  const [value, setValue] = useState();
  // set for date format
  const [date, setDate] = useState();
  const bookingList = useSelector((state) => state.hospitalReducer.hospitalById);
  const renderBooking = (arr) => {
    return arr.map((item, index) => {
      const { time, userConfirm } = item;
      return <Check key={index} time={time} userConfirm={userConfirm}></Check>;
    });
  };
  useEffect(() => {
    getHospitaBookingListById(dispatch, id);
  }, []);
  return (
    <div className={style["bg"]}>
      <div className={[`${style["main"]}`].join(" ")}>
        <h3 className="font-extrabold text-4xl text-green-800 text-center mb-10">Järvi-Pohjanmaan hospital</h3>
        <form action="" className="flex justify-center gap-5 ">
          <label className="flex flex-col justify-center">please select your date</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              closeOnSelect={true}
              label="Select date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                setDate(format(newValue, "dd/MM/yyyy"));
              }}
              renderInput={(params) => <TextField {...params} />}
              toolbarFormat="MM dd YY"
            />
          </LocalizationProvider>
        </form>
        <div className="flex flex-wrap w-4/5 m-auto gap-2 mt-10 justify-start">
          {Object.keys(bookingList).includes(date) ? renderBooking(bookingList[`${date}`]) : <p>! sorry we dont have schedule for {date} yet </p>}
        </div>
      </div>
    </div>
  );
}
