import axios from "axios";
import React, { useEffect, useState } from "react";
import Vector from "../../assets/images/Vector.png";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import routes from "../../routes/apiroutes";
function Attendence() {
  const [isOpen, setIsOpen] = useState(false);
  const [sem, setSem] = useState("");
  const [marksData, setMarksData] = useState({});
  const token = JSON.parse(localStorage.getItem("user")).token;

  useEffect(() => {
    axios
      .get(routes.grades, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setMarksData(response.data.Grades);
        if (!sem && response.data.Grades && response.data.Grades.semesters) {
          const firstSemester = Object.keys(response.data.Grades.semesters)[0];
          setSem(firstSemester);
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [sem, token]);

  const handleSemesterSelection = (semester) => {
    setIsOpen(false);
    setTimeout(() => {
      setSem(semester);
    }, 200); // Set a slight delay to create the fade-out effect before updating the selected semester
  };

  return (
    <div>
      <div className="md:flex mx-10 md:w-[70%] mt-16 md:mx-auto justify-center">
        <div className="mx-auto">
          <h1 className="text-[32px] outfit-700">Your Ward's Attendance</h1>
        </div>

<div className="md:mx-auto w-[150px] relative">
          <div
            onClick={(e) => {
              setIsOpen(!isOpen);
            }}
            className={`duration-[400ms] hover:scale-[1.01] outfit-500 hover:cursor-pointer relative text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-[8px] px-[20px] py-[7px] md:w-[200px] md:px-[30px] md:py-[10px] mx-auto`}
          >
            {sem ? `Semester ${sem}` : "Select Semester"}
            <span className="absolute right-[20px]">
              <img
                alt="Arrow"
                className={`inline duration-[500ms] ${
                  isOpen === true ? "rotate-[180deg]" : "rotate-[0deg]"
                }`}
                src={Vector}
              ></img>
            </span>
          </div>

          <Transition
            show={isOpen}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref) => (
              <div
                ref={ref}
                className={`rounded-b-[10px] absolute divide-y divide-gray-100 md:divide-gray-300 md:w-[200px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none block max-h-[118px] md:max-h-[135px] overflow-y-auto bg-white`}
                style={{ top: "100%", position: "absolute", zIndex: 10 }}
              >
                {/* Dynamically generate the dropdown options based on semesters available */}
                {Object.keys(marksData.semesters || {}).map((semester) => (
                  <div
                    key={semester}
                    className={`group px-[20px] py-[7px] md:px-[30px] md:py-[10px] text-gray-700  hover:cursor-pointer hover:bg-gray-100 hover:text-gray-900 duration-[300ms] ${
                      sem === semester
                        ? "bg-gray-100 text-black outfit-500 "
                        : "outfit-300"
                    }`}
                    onClick={() => handleSemesterSelection(semester)}
                  >
                    <div className="group-hover:scale-[1.01] duration-[400ms]">{`Semester ${semester}`}</div>
                  </div>
                ))}
              </div>
            )}
          </Transition>
        </div>
      </div>

      {sem && marksData.semesters && marksData.semesters[sem] && (
        <div className="flex flex-col mt-12 md:px-16 overflow-x-auto md:w-full w-screen mb-16  px-10">
          <div className="md:p-1.5  inline-block align-middle md:w-full overflow-auto">
            <table className="table-auto border border-black min-w-full divide-y  divide-gray-200">
              <thead className={`text-white  bg-[#005197] text-[15px]`}>
                <tr>
                  <th
                    scope="col"
                    className="border outfit-600 border-black px-6 py-3 text-left"
                  >
                    Subject Code
                  </th>
                  <th
                    scope="col"
                    className="border outfit-600 border-black px-6 py-3  text-left "
                  >
                    Subject Title
                  </th>

                  <th
                    scope="col"
                    className="border outfit-600 border-black px-6 py-3 text-left"
                  >
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-gray-200 text-[14px]`}>
                {Object.entries(marksData.semesters[sem]).map(
                  ([subjectCode, subjectInfo]) => (
                    <tr key={subjectCode}>
                      <td className="border outfit-400 border-black px-6 py-4 whitespace-nowrap">
                        {subjectCode}
                      </td>
                      <td className="border outfit-400 border-black whitespace-pre px-6 py-4 ">
                        {subjectInfo.sub_title}
                      </td>

                      <td className="border border-black outfit-400 whitespace-pre px-6 py-4 ">
                        {subjectInfo.attendance}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
export default Attendence;
