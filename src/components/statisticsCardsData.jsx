// import {
//   FaUsers,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaClipboardList,
// } from "react-icons/fa";
// import { BiListCheck } from "react-icons/bi";

// const statisticsCardsData = [
//   {
//     icon: <FaUsers className="text-white w-6 h-6" />,
//     title: "Total Users",
//     value: "3",
//     footer: <span className="text-green-500 font-semibold">Active users</span>,
//     color: "bg-blue-500",
//   },
//   {
//     icon: <BiListCheck className="text-white w-6 h-6" />,
//     title: "Total KYC Entries",
//     value: "4",
//     footer: <span className="text-gray-500">All-time entries</span>,
//     color: "bg-gray-800",
//   },
//   {
//     icon: <FaClipboardList className="text-white w-6 h-6" />,
//     title: "Pending KYC",
//     value: "3",
//     footer: (
//       <span className="text-yellow-500 font-semibold">
//         Awaiting verification
//       </span>
//     ),
//     color: "bg-yellow-500",
//   },
//   {
//     icon: <FaCheckCircle className="text-white w-6 h-6" />,
//     title: "Verified KYC",
//     value: "0",
//     footer: (
//       <span className="text-green-500 font-semibold">Approved users</span>
//     ),
//     color: "bg-green-500",
//   },
//   {
//     icon: <FaTimesCircle className="text-white w-6 h-6" />,
//     title: "Rejected KYC",
//     value: "1",
//     footer: <span className="text-red-500 font-semibold">Not approved</span>,
//     color: "bg-red-500",
//   },
//   {
//     icon: <FaClipboardList className="text-white w-6 h-6" />,
//     title: "Total Moderation Checks",
//     value: "4",
//     footer: (
//       <span className="text-purple-500 font-semibold">Checks performed</span>
//     ),
//     color: "bg-purple-500",
//   },
// ];

// export default statisticsCardsData;
import {
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { BiListCheck } from "react-icons/bi";
import { Typography } from "@material-tailwind/react";
import { useMatricsQuery } from "../features/api/adminApiSlice";

export default function StatisticsCards() {
  // Fetching data from the API
  const { data, isLoading, isError } = useMatricsQuery();

  // Placeholder values while data is loading or in case of an error
  const defaultValues = {
    totalUsers: "Loading...",
    totalKycEntries: "Loading...",
    pendingKycCount: "Loading...",
    verifiedKycCount: "Loading...",
    rejectedKycCount: "Loading...",
    totalModerationChecks: "Loading...",
  };

  // Fallback to default values if API is loading or returns an error
  const statisticsData = isLoading || isError ? defaultValues : data?.data;

  const statisticsCardsData = [
    {
      icon: <FaUsers className="w-6 h-6 text-white" />,
      title: "Total Users",
      value: statisticsData?.totalUsers || "0",
      footer: (
        <Typography className="font-normal text-gray-600">Active users</Typography>
      ),
      color: "bg-blue-500",
    },
    {
      icon: <BiListCheck className="w-6 h-6 text-white" />,
      title: "Total KYC Entries",
      value: statisticsData?.totalKycEntries || "0",
      footer: (
        <Typography className="font-normal text-gray-600">All-time entries</Typography>
      ),
      color: "bg-gray-800",
    },
    {
      icon: <FaClipboardList className="w-6 h-6 text-white" />,
      title: "Pending KYC",
      value: statisticsData?.pendingKycCount || "0",
      footer: (
        <Typography className="font-normal text-gray-600">
          Awaiting verification
        </Typography>
      ),
      color: "bg-yellow-500",
    },
    {
      icon: <FaCheckCircle className="w-6 h-6 text-white" />,
      title: "Verified KYC",
      value: statisticsData?.verifiedKycCount || "0",
      footer: (
        <Typography className="font-normal text-gray-600">Approved users</Typography>
      ),
      color: "bg-green-500",
    },
    {
      icon: <FaTimesCircle className="w-6 h-6 text-white" />,
      title: "Rejected KYC",
      value: statisticsData?.rejectedKycCount || "0",
      footer: (
        <Typography className="font-normal text-gray-600">Not approved</Typography>
      ),
      color: "bg-red-500",
    },
    {
      icon: <FaClipboardList className="w-6 h-6 text-white" />,
      title: "Total Moderation Checks",
      value: statisticsData?.totalModerationChecks || "0",
      footer: (
        <Typography className="font-normal text-gray-600">
          Checks performed
        </Typography>
      ),
      color: "bg-purple-500",
    },
  ];

  // Return cards or a loading/error message
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statisticsCardsData.map((card, index) => (
        <div
          key={index}
          className={`flex items-center p-4 rounded-lg shadow-lg ${card.color}`}
        >
          <div className="mr-4">{card.icon}</div>
          <div>
            <Typography className="font-bold text-white">{card.title}</Typography>
            <Typography className="font-semibold text-white text-lg">
              {card.value}
            </Typography>
            {card.footer}
          </div>
        </div>
      ))}
    </div>
  );
}
