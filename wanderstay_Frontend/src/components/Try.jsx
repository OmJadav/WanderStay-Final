import React, { useEffect, useState } from "react";
import axios from "axios";

const Try = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://wander-stay-9zcs.onrender.com/api/rooms/getallrooms"
        );

        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Render your fetched data */}
      {rooms?.map((room) => (
        <div key={room._id}>{room.name}</div>
      ))}
      xyz
    </>
  );
};

export default Try;
