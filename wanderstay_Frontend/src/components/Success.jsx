import React from "react";

function Success({ message }) {
  return (
    <div>
      <div
        className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-300 dark:bg-gray-800 dark:text-green-400"
        role="alert"
      >
        {message}
      </div>
    </div>
  );
}

export default Success;
