import React from "react";
import Navbar from "./Navbar";
import Upload from "../../components/common/Upload";
const AdminMarks = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col  mx-10 mt-16">
        <div className="mx-20 mb-6">
          <h1 className="text-[32px] outfit-700 font-medium">Update Grades</h1>
          <div className="mt-6">
            <h1 className="text-[18px]   text-red-600 outfit-500 font-medium">
              Important Note
            </h1>
            <ul className="text-[16px] mt-2 list-disc ml-4 outfit-400">
              <li>Use the Insert Option to add new records to the database</li>

              <li>
                Use the Update Option to update grades of existing records
              </li>
            </ul>
          </div>
        </div>
        <Upload tableName="grades" />
      </div>
    </div>
  );
};

export default AdminMarks;
