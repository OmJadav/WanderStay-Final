import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Divider, Space, Tag } from "antd";
import backendUrl from "../urlHelper/urlHelper";

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  });

  return (
    <div className="ml-3 mt-3 bs mr-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1 className="h1-heading font-bold">My Profile</h1>
          <br />
          <h1 className="h1-heading">Name : {user.name}</h1>
          <h1 className="h1-heading">Email : {user.email}</h1>
          <h1 className="h1-heading">{user.isAdmin ? "Admin : YES" : null}</h1>
          <h1 className="h1-heading">Userid: {user._id}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = await (
          await axios.post(`${backendUrl}/api/bookings/getbookingsbyuserid`, {
            userid: user._id,
          })
        ).data;
        console.log(response);
        setbookings(response);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(error);
      }
    };

    fetchData();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const result = (
        await axios.post(`${backendUrl}/api/bookings/cancelbooking`, {
          bookingid,
          roomid,
        })
      ).data;
      console.log(result);
      setloading(false);
      Swal.fire(
        "Your Booking has been cancelled",
        "refund will credit  to your account very soon!!",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire("Oops", "Somthing went wrong", "error");
    }
  }
  return (
    <div className="container mx-auto flex justify-center">
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/2">
        {loading && <Loader />}
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => {
            return (
              <div
                key={booking._id}
                className="bg-white bs p-4 rounded-md shadow-md mb-4"
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  {booking.room}
                </h1>
                <p className="text-gray-600">Booking ID: {booking._id}</p>
                <p>
                  <b>Check In</b>: {booking.fromdate}
                </p>
                <p>
                  <b>Check Out</b>: {booking.todate}
                </p>
                <p>
                  <b>Amount</b>: ₹ {booking.totalamount}
                </p>
                <p>
                  <b>Status</b>:{" "}
                  {booking.status === "booked" ? (
                    <span className="inline-block font-bold uppercase py-1 px-2 text-xs rounded-md bg-green-500/20 text-green-600">
                      CONFIRMED
                    </span>
                  ) : (
                    <span className="inline-block font-bold uppercase py-1 px-2 text-xs rounded-md bg-red-500/20 text-red-700">
                      CANCELLED
                    </span>
                  )}
                </p>
                {booking.status !== "cancelled" && (
                  <div className="text-right">
                    <button
                      className="bg-black text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        cancelBooking(booking._id, booking.roomid);
                      }}
                    >
                      CANCEL BOOKING
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <h2>You Don't Have Any Bookings Yet!!</h2>
        )}
      </div>
    </div>
  );
}
