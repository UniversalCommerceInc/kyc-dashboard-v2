import React from "react";
import StatisticsCard from "../components/StatisticsCard";
import {
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { BiListCheck } from "react-icons/bi";
import {  Typography } from "@material-tailwind/react";
import { useMatricsQuery } from "../features/api/adminApiSlice";
// import Navbar from "../components/Navbar"
const Home = () => {
  // Fetch the statistics data from the API
  const { data, isLoading, isError } = useMatricsQuery();

  // Placeholder values while loading or in case of an error
  const defaultValues = {
    totalUsers: "Loading...",
    totalKycEntries: "Loading...",
    pendingKycCount: "Loading...",
    verifiedKycCount: "Loading...",
    rejectedKycCount: "Loading...",
    totalModerationChecks: "Loading...",
  };

  // Fallback to default values if loading or error
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

  return (
    <>
    {/* <Navbar/> */}
    <div className="mt-12 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Statistics Overview
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {statisticsCardsData.map((card) => (
          <StatisticsCard
            key={card.title}
            color={card.color}
            icon={card.icon}
            title={card.title}
            value={card.value}
            footer={card.footer}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
