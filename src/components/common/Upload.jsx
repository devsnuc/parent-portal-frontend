import axios from "axios";
import React from "react";
import routes from "../../routes/apiroutes";
import { useState } from "react";
import plusIcon from "../../assets/images/plus.png";
const Marks = ({ tableName }) => {
  const [file, setFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [batchYr, setBatchYr] = useState();
  const [response, setResponse] = useState(""); // State to hold the API response message
  const [isSuccess, setIsSuccess] = useState(false); //
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("year", batchYr);

      try {
        let url = "";
        if (selectedOption === "insert") {
          url = routes.inserting_existing;
        } else if (selectedOption === "update") {
          url = `${routes.update_table}${tableName}`;
        }
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setResponse(response.data); // Update response message on success
        setIsSuccess(true);
        console.log(response.data);

        console.log("Success");
      } catch (error) {
        console.error("Error uploading", error);
        setResponse("Error Inserting"); // Update response message on error
        setIsSuccess(false);
      }
    }
  };
  return (
    <div className="w-full ">
      <div className="mx-20 mt-[40px]">
        <div className={`flex flex-col`}>
          {/* <div className="w-1/4">{supercontent}</div> */}
          <div className="">
            <form className="w-full mx-auto" onSubmit={handleUpload}>
              <div className="mb-4 gap-16 flex">
                <div className="">
                  <label
                    className="block mb-2 outfit-500 text-[16px] font-medium"
                    htmlFor="fileInput"
                  >
                    Batch Year
                  </label>
                  <input
                    type="text"
                    placeholder="2023"
                    value={batchYr}
                    onChange={(e) => setBatchYr(e.target.value)}
                    className={` flex px-2 py-3 outfit-300 border rounded-[8px] outline-none text-sm transition duration-150 ease-in-out mb-4`}
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block mb-2  outfit-500 text-[16px] font-medium"
                    htmlFor="fileInput"
                  >
                    Upload File:
                  </label>

                  <div className="flex items-center">
                    <input
                      className="block w-full mr-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                      id="file_input"
                      type="file"
                      onChange={handleFileChange}
                    />

                    <button
                      className="bg-black shadow-md outfit-400 text-white flex items-center justify-center font-medium text-[16px] py-[10px] px-[16px] rounded-[10px]"
                      type="submit"
                      onClick={(e) => handleUpload(e)}
                    >
                      <img src={plusIcon} className="w-[12px] mr-2" />
                      Publish
                    </button>
                  </div>
                  <div className="flex outfit-400 mt-2 items-center">
                    <label className="mx-2">
                      <input
                        className="mr-2"
                        type="radio"
                        value="insert"
                        checked={selectedOption === "insert"}
                        onChange={handleOptionChange}
                      />
                      Insert
                    </label>
                    <label className="mx-2">
                      <input
                        className="mr-2"
                        type="radio"
                        value="update"
                        checked={selectedOption === "update"}
                        onChange={handleOptionChange}
                      />
                      Update
                    </label>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marks;
