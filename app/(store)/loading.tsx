import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full size-32 border-b-2 border-white" />
    </div>
  );
};

export default loading;
