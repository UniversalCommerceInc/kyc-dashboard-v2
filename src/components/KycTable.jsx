import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetKycAllDataQuery } from "../features/api/kycApiSlice";

const KycTable = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 20; // Set entries per page to 20

  // Fetch data using RTK Query
  const { data: kycData, isLoading, error } = useGetKycAllDataQuery();

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <p className="text-blue-500 font-semibold">Loading KYC data...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching KYC data:", error);
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-semibold">Error loading KYC data</p>
      </div>
    );
  }

  // Handle empty data
  if (!kycData?.kycs || kycData.kycs.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">No KYC entries found.</p>
      </div>
    );
  }

  // Calculate pagination details
  const totalPages = Math.ceil(kycData.kycs.length / entriesPerPage);
  const currentData = kycData.kycs.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 md:p-8 w-full md:w-[80%] mx-auto">
      <h1 className="text-center text-[24px] md:text-[32px] font-bold mb-6">
        KYC List
      </h1>

      <div className="overflow-x-auto py-2">
        <table className="min-w-[97.5%] text-center bg-white border-zinc-300">
          <thead>
            <tr className="border-b text-sm">
              <TableHead />
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <TableRow
                key={item.id || index}
                item={item}
                navigate={navigate}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-3 py-1 mx-1 border rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 mx-1 border rounded-lg ${
              currentPage === index + 1 ? "bg-gray-300" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 mx-1 border rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KycTable;

const TableHead = () => {
  return (
    <>
      <th className="py-2 px-4 border-b">Avatar</th>
      <th className="py-2 px-4 border-b">Name</th>
      <th className="py-2 px-4 border-b">Email</th>
      <th className="py-2 px-4 border-b">Document Type</th>
      <th className="py-2 px-4 border-b">Status</th>
    </>
  );
};
const documentTypeMapping = {
  "aadhaar-card": "Aadhaar Card",
  passport: "Passport",
  "pan-card": "PAN Card",
  dl: "Driving Licence",
  "voter-id": "Voter ID",
};
const TableRow = ({ item, navigate }) => {
  return (
    <tr
      className="cursor-pointer text-sm hover:scale-105 transition"
      onClick={() =>
        navigate(`/dashboard/customer/${item.id}`, { state: { item } })
      }
    >
      <td className="py-4 px-4 border-b">
        <img
          src={item?.selfieImage?.trim()}
          alt="Avatar"
          crossOrigin="anonymous"
          className="w-10 h-10 rounded-full mx-auto object-cover"
        />
      </td>
      <td className="py-4 px-4 border-b">{item.name}</td>
      <td className="py-4 px-4 border-b">{item.email}</td>
      <td className="py-4 px-4 border-b capitalize">
        {/* {item.documentType} */}
        {documentTypeMapping[item.documentType] || item.documentType}
      </td>

      <td className="py-4 px-4 border-b">
        <span
          className={`px-6 py-1 rounded-full text-sm text-white ${
            item.status === "Verified"
              ? "bg-green-500"
              : item.status === "Rejected"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          {item.status}
        </span>
      </td>
    </tr>
  );
};
