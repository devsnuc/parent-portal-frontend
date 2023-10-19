import React from "react";
import { useState } from "react";
import plusIcon from "../../../assets/images/plus.png";
import axios from "axios";
import routes from "../../../routes/apiroutes";
const Delete = () => {
  const [batchYr, setBatchYr] = useState();
  const [response, setResponse] = useState(""); // State to hold the API response message
  const [isSuccess, setIsSuccess] = useState(false); // State to track the success state

  const handleUpload = async () => {
    const data = {
      batchYear: batchYr,
    };

    try {
      const response = await axios.post(
        routes.delete,
        data
      );
      setResponse(response.data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error making POST request:", error);
      setResponse("Error Deleting");
      setIsSuccess(false);
    }
  };
  return (
    <div className="flex items-center gap-48 justify-center mx-16 mb-16">
      <div className="mt-4">
        <h1 className="text-[32px] outfit-700 font-medium">Delete Batch</h1>
        <p className="text-[16px] outfit-400">
          Use this Utility to delete all the Records of a particular Batch Year.
        </p>
        <p className="text-red-600 outfit-400">
          Records once deleted cannot be retrieved!
        </p>
      </div>
      <div className="">
        <label
          className="block mb-2 outfit-500 text-[16px] font-medium"
          htmlFor="fileInput"
        >
          Batch Year
        </label>
        <div className="flex ">
          <input
            type="text"
            placeholder="2023"
            value={batchYr}
            onChange={(e) => setBatchYr(e.target.value)}
            className={` flex px-2 py-3 outfit-300 border rounded-[8px] outline-none text-sm transition duration-150 ease-in-out `}
          />

          <button
            className="bg-black ml-4 outfit-400 shadow-md text-white flex items-center justify-center font-medium text-[16px] py-[10px] px-[16px] rounded-[10px]"
            type="submit"
            onClick={handleUpload}
          >
            <img src={plusIcon} className="w-[12px] mr-2" />
            Delete
          </button>
        </div>
        {response && (
          <div className="block mb-2 text-[16px]">
            <p
              className={`outfit-400 ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {response}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Delete;
