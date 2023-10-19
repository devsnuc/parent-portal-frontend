import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import plusIcon from "../../../assets/images/plus.png";
import success from "../../../assets/images/success.png";
import routes from "../../../routes/apiroutes";
export default function MultiStepForm() {
  const [showModal, setShowModal] = useState(false);
  const [batch, setBatch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formArray = [1, 2, 3];
  const [downloadLink, setDownloadLink] = useState(null);
  const [formNo, setFormNo] = useState(formArray[0]);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(""); 
  const [isSuccess, setIsSuccess] = useState(false); 
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleBatch = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const getBatch = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleUpload = async (tableVal, e) => {
    e.preventDefault();
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      if (batch !== null && batch !== "") {
        formData.append("batch_yr", batch);
      }

      try {
        const response = await axios.post(
          `${routes.create}-${tableVal}-table`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (formData.has("batch_yr")) {
          formData.delete("batch_yr");
        }

        setBatch("");
        setResponse(response.data); // Update response message on success
        setIsSuccess(true); // Set the success state to true
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data], { type: "text/csv" })
        );
        setDownloadLink(downloadUrl);
      } catch (error) {
        setResponse("Error Inserting"); // Update response message on error
        setIsSuccess(false); // Set the success state to false
      } finally {
        setIsLoading(false); // Hide loading message once the response is received
      }
    }
  };

  const next = () => {
    if (formNo === 1 && isSuccess) {
      setFormNo(formNo + 1);
      setIsSuccess(false);
      setResponse("");
    } else if (formNo === 2 && isSuccess) {
      setFormNo(formNo + 1);
      setIsSuccess(false);
      setResponse("");
    } else {
      toast.error("Please Upload a File");
      setResponse(""); // Clear the response message
      setIsSuccess(false);
    }
  };
  const pre = () => {
    setFormNo(formNo - 1);
  };
  
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20 h-screen">
        <div className="mx-auto text-center mt-8 ">
          <h1 className="text-[32px] outfit-700 font-medium">
            Set Up a New Batch
          </h1>
          <p className="text-[16px] outfit-400">
            This Utility allows you to create a database for every new batch of
            students
          </p>
        </div>
        <div className="mt-8 mb-16 px-10">
          <ToastContainer />
          <div className="card rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white  p-8">
            <div className="flex justify-center items-center ">
              {formArray.map((v, i) => (
                <>
                  <React.Fragment key={i}>
                    <div
                      className={` my-3 outfit-500  rounded-full ${
                        formNo - 1 === i ||
                        formNo - 1 === i + 1 ||
                        formNo === formArray.length
                          ? "bg-[#005197] text-white "
                          : "bg-[#EFF0F6] text-[#6F6C90]"
                      } w-16 h-8 font-medium flex justify-center items-center`}
                    >
                      {v}
                    </div>
                    {i !== formArray.length - 1 && (
                      <div
                        className={` rounded-[40px] w-[98.091px] mx-2 h-[4px] ${
                          formNo === i + 2 || formNo === formArray.length
                            ? "bg-[#005197]"
                            : "bg-slate-300"
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                </>
              ))}
            </div>
            {formNo === 1 && (
              <div className="mt-4">
                <div>
                  <h1 className="text-[18px] text-red-600 outfit-500 font-medium">
                    Important Note
                  </h1>
                  <ul className="text-[16px] list-disc outfit-400 ml-4">
                    <li>
                      Insert the Records of the new batch using the upload
                      option below
                    </li>
                    <li>
                      To create entries for an older batch, Choose the batch
                      year manually
                    </li>
                  </ul>
                  <div className="mt-2">
                    <a
                      href="https://ssneduin-my.sharepoint.com/:f:/g/personal/webdev_snuchennai_edu_in/Epr8DQisDxlMvKSe1PBE8OIBzoFv0OYptQLs_xQDsH3m9A" target="_blank" rel="noopener noreferrer"
                      className=" outfit-600  text-red-600 flex  underline  font-medium text-[24px] "
                    >
                      Sample Excel Template
                    </a>
                  </div>
                </div>
                <form className="w-full mx-auto mt-4">
                  <div className="mb-4">
                    <label
                      className="block mb-2 outfit-500 text-[16px] font-medium"
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
                        className="bg-black outfit-400 shadow-md text-white flex items-center justify-center font-medium text-[16px] py-[10px] px-[16px] rounded-[10px]"
                        type="submit"
                        onClick={(e) => handleUpload("info", e)}
                      >
                        <img src={plusIcon} className="w-[12px] mr-2" />
                        Create
                      </button>
                    </div>

                    {isLoading && (
                      <div className="mt-2 text-[14px] text-gray-600 outfit-400">
                        Please Wait... Inserting in Progress
                      </div>
                    )}
                    {downloadLink && (
                      <div className="mt-4">
                        <a
                          href={downloadLink}
                          download={`parent_acc_passwords.csv`}
                          className=" outfit-600  text-blue-600 flex  underline  font-medium text-[24px]  mt-4 hover:text-gray-600"
                        >
                          Download CSV
                        </a>
                      </div>
                    )}
                  </div>
                </form>


                <div className="mt-4 flex justify-center items-center">
                  <button
                    onClick={next}
                    className="px-3 outfit-400 py-2 text-lg rounded-md font-medium w-full text-white bg-[#005197]"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {formNo === 2 && (
              <div className="mt-4">
                <div>
                  <h1 className="text-[18px] text-red-600 outfit-500 font-medium">
                    Important Note
                  </h1>
                  <ul className="text-[16px] list-disc outfit-400 ml-4">
                    <li>
                      Insert the Records of the new batch using the upload
                      option below
                    </li>
                    <li>
                      To create entries for an older batch, Choose the batch
                      year manually
                    </li>
                  </ul>
                  <div className="mt-2">
                    <a
                      href="https://ssneduin-my.sharepoint.com/:f:/g/personal/webdev_snuchennai_edu_in/Epr8DQisDxlMvKSe1PBE8OIBzoFv0OYptQLs_xQDsH3m9A?e=RSp36n"
                      className=" outfit-400  text-red-600 flex  underline  font-medium text-[16px] "
                    >
                      Sample Excel Template
                    </a>
                  </div>
                </div>
                <form className="w-full mx-auto mt-4">
                  <div className="mb-4">
                    <label
                      className="block mb-2 outfit-500 text-[16px] font-medium"
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
                        className="bg-black outfit-400 shadow-md text-white flex items-center justify-center font-medium text-[16px] py-[10px] px-[16px] rounded-[10px]"
                        type="submit"
                        onClick={(e) => handleUpload("grade", e)}
                      >
                        <img src={plusIcon} className="w-[12px] mr-2" />
                        Create
                      </button>
                    </div>
                  </div>
                </form>
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
                
                <div className="mt-4 gap-3 flex">
                  <button
                    onClick={pre}
                    className="px-4 py-2 text-lg  outfit-400 rounded-md flex font-medium outline outline-1 text-black outline-[#005197]"
                  >
                    Previous
                  </button>
                  <button
                    onClick={next}
                    className="px-4 py-2 text-lg outfit-400 rounded-md flex text-white font-medium bg-[#005197] ml-auto"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {formNo === 3 && (
              <div>
                <img src={success} className="w-32 mx-auto mt-4" />
                <div className="mx-auto mt-4 text-center">
                  <h1 className="text-[18px] outfit-500 font-medium">
                    Database has been Setup Successfully!
                  </h1>
                </div>
                <div className="mt-4 gap-3 flex">
                  <button
                    onClick={pre}
                    className="px-4 outfit-400 py-2 text-lg rounded-md flex font-medium outline outline-1 text-black outline-[#005197]"
                  >
                    Previous
                  </button>
                  
                </div>
              </div>
            )}
          </div>
          <div className="outfit-400 mt-8 text-[17px]">
            To choose batch year manually -{" "}
            <span
              className="text-brandblue cursor-pointer"
              onClick={handleBatch}
            >
              click here
            </span>
          </div>
        </div>
        {showModal === true ? (
          <>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center ">
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[100]"></div>
              <div className="relative w-[30%] rounded-xl bg-white shadow-2xl drop-shadow-2xl p-4 z-[101]">
                <div className="flex  text-center my-1 flex-col relative mb-[12px]">
                  <h1 className="outfit-500 text-[24px]">Enter Batch Year</h1>
                  <button
                    className=" text-black font-medium bottom-1 absolute h-full right-2 hover:scale-[1.2] duration-[300ms]"
                    onClick={handleModalClose}
                  >
                    X
                  </button>
                </div>
                <form onSubmit={(e) => getBatch(e)}>
                  <div className="text-[16px] mt-6 nuns-font-500 flex justify-center">
                    <input
                      type="text"
                      name="batch"
                      id="batch"
                      placeholder="Enter the batch year"
                      value={batch}
                      className="w-[90%] px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms] mb-6"
                      onChange={(e) => setBatch(e.target.value)}
                    />
                  </div>

                  <div className="flex nuns-font-500 text-[14px] md:text-[16px] items-center mb-2">
                    <button
                      className="bg-[#005197] outfit-500 mx-auto px-6 py-2.5 rounded-[10px] text-white  hover:bg-black duration-[300ms]"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
