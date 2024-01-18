import React, { useState, useEffect } from "react";
import Room from "../components/Room";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

import "antd/dist/reset.css";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  const [selectedDate, setSelectedDate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = (
          await axios.get(
            "https://wander-stay-9zcs.onrender.com/api/rooms/getallrooms"
          )
        ).data;
        console.log(response);
        setrooms(response);
        setduplicaterooms(response);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  // for date selection disable

  const disabledDate = (current) => {
    // Disable dates before today (including today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current && current.valueOf() < today.valueOf();
  };

  function filterByDate(dates) {
    setSelectedDate(dates);

    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));

    const temprooms = [];

    for (const room of duplicaterooms) {
      let availability = true;

      if (room.currentbookings.length > 0) {
        for (let booking of room.currentbookings) {
          const fromDateParts = booking.fromdate.split("-");
          const toDateParts = booking.todate.split("-");
          const fromSelectedParts = dates[0].format("DD-MM-YYYY").split("-");
          const toSelectedParts = dates[1].format("DD-MM-YYYY").split("-");

          const fromDate = new Date(
            fromDateParts[2],
            fromDateParts[1] - 1,
            fromDateParts[0]
          );
          const toDate = new Date(
            toDateParts[2],
            toDateParts[1] - 1,
            toDateParts[0]
          );
          const fromSelected = new Date(
            fromSelectedParts[2],
            fromSelectedParts[1] - 1,
            fromSelectedParts[0]
          );
          const toSelected = new Date(
            toSelectedParts[2],
            toSelectedParts[1] - 1,
            toSelectedParts[0]
          );

          if (
            (fromSelected >= fromDate && fromSelected <= toDate) ||
            (toSelected >= fromDate && toSelected <= toDate) ||
            (fromDate >= fromSelected && fromDate <= toSelected) ||
            (toDate >= fromSelected && toDate <= toSelected)
          ) {
            availability = false;
            break;
          }
        }
      }

      if (availability || room.currentbookings.length === 0) {
        temprooms.push(room);
      }
    }

    setrooms(temprooms);
  }

  function filterBySearch() {
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setrooms(temprooms);
  }
  function filterByType(e) {
    settype(e);
    if (e !== "all") {
      const temprooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );
      setrooms(temprooms);
    } else {
      setrooms(duplicaterooms);
    }
  }

  return (
    <div className="container mx-auto mb-5 ">
      <div className="p-3 flex flex-col md:flex-row justify-center items-center mt-5 space-y-3 md:space-y-0 md:space-x-3">
        <div className="w-full md:w-1/4 mb-2 md:mb-0">
          <div className="relative">
            <RangePicker
              format="DD-MM-YYYY"
              disabledDate={disabledDate}
              value={selectedDate}
              onChange={filterByDate}
            />
          </div>
        </div>

        <div className="w-full md:w-1/4">
          <input
            type="text"
            className="w-full border rounded ant-picker px-3 py-2"
            placeholder="Search Rooms"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="w-full md:w-1/4">
          <select
            className="w-full border rounded px-3 py-2"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="presidential-suite">Presidential-Suite</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {rooms.map((room) => (
              <div className="mt-3">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Homescreen;
