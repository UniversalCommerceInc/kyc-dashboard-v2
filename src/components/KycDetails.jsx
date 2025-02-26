// import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   FaEnvelope,
//   FaIdCard,
//   FaInfoCircle,
//   FaCalendarAlt,
//   FaFlag,
//   FaLocationArrow,
//   FaTimesCircle,
//   FaCheckCircle,
// } from "react-icons/fa";
// import { MdClose, MdDescription, MdFace } from "react-icons/md";
// import {
//   useGetKycDataQuery,
//   useUpdateKycStatusMutation,
// } from "../features/api/kycApiSlice";
// import { useParams } from "react-router-dom";

// /** Reusable circular indicator */
// const CircularIndicator = ({ score, label, color }) => {
//   const strokeWidth = 12;
//   const radius = 70;
//   const adjustedRadius = radius - strokeWidth / 2;
//   const circumference = 2 * Math.PI * adjustedRadius;
//   const dashoffset = circumference - score * circumference;

//   return (
//     <div className="relative w-48 h-48">
//       <svg
//         className="w-full h-full transform -rotate-90"
//         viewBox="0 0 160 160"
//       >
//         <circle
//           className="text-gray-300"
//           strokeWidth={strokeWidth}
//           stroke="currentColor"
//           fill="transparent"
//           r={adjustedRadius}
//           cx="80"
//           cy="80"
//         />
//         <circle
//           className={`${color} transition-all duration-500 ease-out`}
//           strokeWidth={strokeWidth}
//           strokeDasharray={circumference}
//           strokeDashoffset={dashoffset}
//           strokeLinecap="round"
//           stroke="currentColor"
//           fill="transparent"
//           r={adjustedRadius}
//           cx="80"
//           cy="80"
//         />
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="text-4xl font-bold text-gray-800">
//           {(score * 100).toFixed(1)}%
//         </span>
//         {label && <p className="text-sm text-gray-600 mt-1">{label}</p>}
//       </div>
//     </div>
//   );
// };

// const CustomerDetail = () => {
//   const { id } = useParams();
//   const { data: kycData, isLoading, error, refetch } = useGetKycDataQuery(id);
//   const [updateKycStatus, { isLoading: isUpdating }] =
//     useUpdateKycStatusMutation();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showMore, setShowMore] = useState(false);

//   // Selected category/subcategory
//   const [selectedCategory, setSelectedCategory] = useState("document");
//   // Reordered face subcategories: "comparison" first, "liveliness" second
//   const [selectedSubCategory, setSelectedSubCategory] = useState("ocr");

//   // Toggle to reveal OCR details & base64 images when there's no mismatch
//   const [showOcrDetails, setShowOcrDetails] = useState(false);

//   const kyc = kycData?.kyc;

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//     refetch();
//   };

//   const openImageModal = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setIsImageModalOpen(true);
//   };

//   const closeImageModal = () => {
//     setIsImageModalOpen(false);
//     setSelectedImage(null);
//   };

//   const handleStatusChange = async (status) => {
//     try {
//       if (kyc?.kycStatus === status) {
//         toast(`User's KYC is already ${status.toLowerCase()}`, {
//           icon: status === "Verified" ? "✅" : "❌",
//           style: {
//             background: status === "Verified" ? "#a7f3d0" : "#fecaca",
//             color: "#333",
//           },
//         });
//         return;
//       }
//       await updateKycStatus({ id, status }).unwrap();
//       toast.success(`KYC status updated to ${status}`);
//     } catch (err) {
//       toast.error("Failed to update KYC status. Please try again.");
//     }
//   };

//   // Loading / Error states
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-2xl text-blue-500 font-bold animate-pulse">
//           Loading KYC details...
//         </p>
//       </div>
//     );
//   }

//   if (error || !kyc) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-2xl text-red-500 font-bold">
//           Error loading KYC details. Please try again later.
//         </p>
//       </div>
//     );
//   }
//   const result = kyc?.moderation?.document?.liveness?.data?.[0]?.data?.result;
//   const isSpoof = result?.toLowerCase() === "spoof";

//   // Decide color gradient & icon based on result
//   const gradientClass = isSpoof
//     ? "bg-gradient-to-r from-red-500 to-red-600"
//     : "bg-gradient-to-r from-green-500 to-green-600";

//   const Icon = isSpoof ? FaTimesCircle : FaCheckCircle;
//   /** Helpers */
//   const formatScorePercentage = (score, decimals = 2) =>
//     (score * 100).toFixed(decimals) + "%";

//   const getIndicatorColor = (score) => {
//     if (score < 0.5) return "text-red-500";
//     if (score < 0.8) return "text-yellow-500";
//     return "text-green-500";
//   };

// // Document → OCR data
// const ocrScore = kyc?.moderation?.document?.ocr?.recognitionResult?.data?.[0]?.data?.score || 0;
// const mismatchResults = kyc?.moderation?.document?.ocr?.mismatchResults;
// const recognizedOcrData = kyc?.moderation?.document?.ocr?.recognitionResult?.data?.[0]?.data?.ocr || {};

// const { portrait, ghostPortrait, documentFrontSide } =
//   kyc?.moderation?.document?.ocr?.recognitionResult?.data?.[0]?.data?.image || {};

// // Face → reorder subcategories: "comparison" first, "liveliness" second
// const faceComparisonScore =
//   kyc?.moderation?.face?.comparison?.data?.[0]?.data?.similarity || 0;
// const faceComparisonResult =
//   kyc?.moderation?.face?.comparison?.data?.[0]?.data?.result || "";

// const faceLivenessScore =
//   kyc?.moderation?.face?.liveness?.data?.[0]?.data?.liveness_score || 0;
// const faceLivenessResult =
//   kyc?.moderation?.face?.liveness?.data?.[0]?.data?.result || "";

// // Decide if it's a match
// const isMatch = faceComparisonResult?.toLowerCase() === "same";
//   const isFailed = kyc?.moderation?.status === "Failed";

//   // Optional color styling
//   const matchGradientClass = isMatch
//     ? "bg-gradient-to-r from-green-100 to-green-200"
//     : "bg-gradient-to-r from-red-100 to-red-200";

//   const matchIcon = isMatch ? FaCheckCircle : FaTimesCircle;
//   const matchText = isMatch
//     ? "Selfie image and document face are a match."
//     : "Selfie image and document face do not match.";

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
//       <Toaster position="top-center" reverseOrder={false} />

//       {/* ============= MAIN WRAPPER ============= */}
//       <div className="max-w-5xl mx-auto rounded-[2.5rem] shadow-2xl p-8 sm:p-12 bg-white/40 backdrop-blur-xl border border-white/20">
//         <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8">
//           Customer KYC Details
//         </h1>

//         {/* ============= PERSONAL INFO ============= */}
//         <div className="bg-white/70 p-6 md:p-8 rounded-[1.5rem] shadow-xl mb-6 border border-white/40 transition-transform hover:scale-[1.005]">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Personal Information
//           </h2>
//           <div className="flex flex-col items-center sm:flex-row sm:items-start mb-4">
//             <img
//               src={kyc.selfieImage}
//               alt="Selfie"
//               crossOrigin="anonymous"
//               onClick={() => openImageModal(kyc.selfieImage)}
//               className="w-20 h-20 rounded-full object-cover shadow-lg mb-4 sm:mb-0 sm:mr-4 border-4 border-indigo-200 cursor-pointer hover:opacity-90 hover:scale-105 transform transition-all"
//             />
//             <div className="flex-grow text-center sm:text-left">
//               <p className="text-xl font-medium text-gray-800">{kyc.name}</p>
//               <p className="text-gray-500 flex items-center justify-center sm:justify-start mt-2 sm:mt-1">
//                 <FaEnvelope className="mr-1 text-gray-400" /> {kyc.email}
//               </p>
//             </div>
//             <div className="mt-2 sm:mt-0 sm:ml-4">
//               <span
//                 className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md ${
//                   kyc.kycStatus === "Rejected"
//                     ? "bg-red-600"
//                     : kyc.kycStatus === "Verified"
//                     ? "bg-green-600"
//                     : "bg-yellow-500"
//                 }`}
//               >
//                 {kyc.kycStatus}
//               </span>
//             </div>
//           </div>

//           {/* Contact Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//             <DetailItem icon={<FaEnvelope />} label="Email" value={kyc.email} />
//             <DetailItem
//               icon={<FaIdCard />}
//               label="ID Number"
//               value={kyc.idNumber}
//             />
//             <DetailItem
//               icon={<FaInfoCircle />}
//               label="Nationality"
//               value={kyc.nationality}
//             />
//             <DetailItem
//               icon={<FaCalendarAlt />}
//               label="Date of Birth"
//               value={new Date(kyc.dob).toLocaleDateString()}
//             />
//             <DetailItem
//               icon={<FaFlag />}
//               label="Country of Residence"
//               value={kyc.countryOfResidence}
//             />
//             <DetailItem
//               icon={<FaLocationArrow />}
//               label="Address"
//               value={`${kyc.addressLine1}, ${kyc.city}, ${kyc.state} - ${kyc.zipCode}`}
//             />
//           </div>
//         </div>

//         {/* ============= DOCUMENT INFO ============= */}
//         <div className="bg-white/70 p-6 md:p-8 rounded-[1.5rem] shadow-xl mb-6 border border-white/40 transition-transform hover:scale-[1.005]">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Document Information
//           </h2>
//           <div className="flex items-center mb-4">
//             <img
//               src={kyc.documentImage}
//               crossOrigin="anonymous"
//               alt="Document"
//               onClick={() => openImageModal(kyc.documentImage)}
//               className="w-32 h-20 rounded-lg shadow-lg mr-4 border-4 border-gray-300 cursor-pointer hover:opacity-90 hover:scale-105 transform transition-all"
//             />
//             <div className="flex-grow">
//               <p className="text-gray-800">
//                 <strong>Document Type:</strong> {kyc.documentType}
//               </p>
//               <p className="mt-2 text-gray-800">
//                 <strong>ID Number:</strong> {kyc.idNumber}
//               </p>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//             <DetailItem
//               icon={<FaCalendarAlt />}
//               label="Issue Date"
//               value={new Date(kyc.idIssueDate).toLocaleDateString()}
//             />
//             {kyc.idExpiryDate && (
//                  <DetailItem
//                  icon={<FaCalendarAlt />}
//                  label="Expiry Date"
//                  value={new Date(kyc.idExpiryDate).toLocaleDateString()}
//                />
//             )}
         
//             <DetailItem
//               icon={<FaFlag />}
//               label="Issuing Country"
//               value={kyc.idIssuingCountry}
//             />
//           </div>
//         </div>

//         {/* ============= MODERATION CHECKS ACTION ============= */}
//         <div className="p-6 md:p-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-[1.5rem] shadow-xl flex flex-col sm:flex-row items-center justify-between mb-8">
//           <div className="flex items-center">
//             <div className="w-14 h-14 flex items-center justify-center bg-indigo-500 text-white rounded-full shadow-md">
//               <FaInfoCircle className="text-2xl" />
//             </div>
//             <div className="ml-4">
//               <p className="text-xl font-semibold text-indigo-900">
//                 Review Moderation Checks
//               </p>
//               <p className="text-sm text-indigo-700">
//                 Check document and face verification results.
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={toggleModal}
//             className="mt-4 sm:mt-0 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 font-bold"
//           >
//             Check Now
//           </button>
//         </div>

//         {/* ============= ACTION BUTTONS ============= */}
//         <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-10">
//           <ActionButton
//             buttonText="Approve"
//             onClick={() => handleStatusChange("Verified")}
//             isLoading={isUpdating}
//           />
//           <ActionButton
//             buttonText="Decline"
//             onClick={() => handleStatusChange("Rejected")}
//             isLoading={isUpdating}
//           />
//         </div>
//       </div>

//       {/* ============= MODAL: Moderation Results ============= */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
//           <div className="bg-white/80 w-full max-w-4xl rounded-[2rem] shadow-2xl p-6 sm:p-8 relative overflow-y-auto max-h-[90vh] border border-white/40">
//             <button
//               onClick={toggleModal}
//               className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-transform transform hover:scale-125"
//             >
//               <MdClose className="text-3xl" />
//             </button>


//            { kyc?.moderation?.status === "Failed" ||  kyc?.moderation?.status === "Pending"? (
//       <div className="flex items-center justify-center min-h-[16rem] bg-gray-50">
//       <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-md shadow-md">
//         {/* Animated Spinner */}
//         <div className="relative inline-flex items-center justify-center">
//           <span
//             className={`inline-block w-16 h-16 rounded-full border-4 border-gray-300 animate-spin
//              ${isFailed ? "border-t-red-500" : "border-t-indigo-600"}`}
//           />
//         </div>

//         {/* Title Message */}
//         <h2
//           className={`text-xl font-semibold ${
//             isFailed ? "text-red-600" : "text-indigo-600"
//           }`}
//         >
//           {isFailed ? "Moderation Failed" : "Moderation Pending"}
//         </h2>

//         {/* Subtext */}
//         <p className="text-sm text-gray-500 text-center max-w-xs">
//           {isFailed
//             ? "Your document verification failed. Please try again or contact support."
//             : "We’re currently reviewing your documents. Please wait..."}
//         </p>
//       </div>
//     </div>
    
//   //   <div className="flex flex-col items-center justify-center h-64">
//   //   <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4 animate-spin" />
//   //   <p className="text-lg font-semibold text-gray-700">
//   //   {/* {Moderation is ${kyc?.moderation?.status}} */}

//   //   {kyc?.moderation?.status === "Failed" ? "Moderation Failed" : "Moderation Pending"}
//   //   </p>
//   // </div>
  
//   ) : (
//           <>
//              <div className="text-center mb-8">
//               <h2 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
//                 Moderation Results
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 Review the results of the moderation process below.
//               </p>
//             </div>

//             {/* ============= CATEGORY CARDS ============= */}
//             <div className="flex flex-wrap justify-center gap-6 mb-8">
//               {/* Document Card */}
//               <div
//                 onClick={() => {
//                   setSelectedCategory("document");
//                   setSelectedSubCategory("ocr");
//                   setShowOcrDetails(false);
//                 }}
//                 className={`cursor-pointer w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center p-4 rounded-xl shadow-lg transition-transform hover:scale-105 ${
//                   selectedCategory === "document"
//                     ? "border-4 border-green-500"
//                     : "border border-gray-200"
//                 } bg-white/90`}
//               >
//                 <MdDescription className="text-5xl sm:text-6xl text-green-600 mb-2" />
//                 <span className="text-xl sm:text-2xl font-bold text-gray-800">
//                   Document
//                 </span>
//               </div>

//               {/* Face Card */}
//               <div
//                 onClick={() => {
//                   setSelectedCategory("face");
//                   // Reorder to set default subcategory to "comparison"
//                   setSelectedSubCategory("comparison");
//                 }}
//                 className={`cursor-pointer w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center p-4 rounded-xl shadow-lg transition-transform hover:scale-105 ${
//                   selectedCategory === "face"
//                     ? "border-4 border-blue-500"
//                     : "border border-gray-200"
//                 } bg-white/90`}
//               >
//                 <MdFace className="text-5xl sm:text-6xl text-blue-600 mb-2" />
//                 <span className="text-xl sm:text-2xl font-bold text-gray-800">
//                   Face
//                 </span>
//               </div>
//             </div>

//             {/* ============= SUBCATEGORY TOGGLES ============= */}
//             <div className="flex justify-center mb-8">
//               {/* ----------- Document Toggles ----------- */}
//               {selectedCategory === "document" && (
//                 <div className="relative inline-flex items-center justify-between bg-gray-100 rounded-full p-1 w-64 sm:w-72">
//                   <div
//                     className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-green-600 to-green-700 rounded-full transition-transform duration-300"
//                     style={{
//                       transform:
//                         selectedSubCategory === "ocr"
//                           ? "translateX(0%)"
//                           : "translateX(100%)",
//                     }}
//                   ></div>
//                   <button
//                     onClick={() => {
//                       setSelectedSubCategory("ocr");
//                       setShowOcrDetails(false);
//                     }}
//                     className={`relative flex-1 text-center py-2 font-semibold ${
//                       selectedSubCategory === "ocr"
//                         ? "text-white"
//                         : "text-gray-800"
//                     }`}
//                   >
//                     OCR
//                   </button>

//                   <button
//                     onClick={() => setSelectedSubCategory("liveliness")}
//                     className={`relative flex-1 text-center py-2 font-semibold ${
//                       selectedSubCategory === "liveliness"
//                         ? "text-white"
//                         : "text-gray-800"
//                     }`}
//                   >
//                     Liveliness
//                   </button>
//                 </div>
//               )}

//               {/* ----------- Face Toggles (Comparison first, Liveliness second) ----------- */}
//               {selectedCategory === "face" && (
//                 <div className="relative inline-flex items-center justify-between bg-gray-100 rounded-full p-1 w-64 sm:w-72">
//                   {/* We move the highlight based on "comparison" vs. "liveliness" */}
//                   <div
//                     className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full transition-transform duration-300"
//                     style={{
//                       transform:
//                         selectedSubCategory === "comparison"
//                           ? "translateX(0%)"
//                           : "translateX(100%)",
//                     }}
//                   ></div>

//                   {/* Button 1: Comparison */}
//                   <button
//                     onClick={() => setSelectedSubCategory("comparison")}
//                     className={`relative flex-1 text-center py-2 font-semibold ${
//                       selectedSubCategory === "comparison"
//                         ? "text-white"
//                         : "text-gray-800"
//                     }`}
//                   >
//                     Comparison
//                   </button>

//                   {/* Button 2: Liveliness */}
//                   <button
//                     onClick={() => setSelectedSubCategory("liveliness")}
//                     className={`relative flex-1 text-center py-2 font-semibold ${
//                       selectedSubCategory === "liveliness"
//                         ? "text-white"
//                         : "text-gray-800"
//                     }`}
//                   >
//                     Liveliness
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* ============= DETAILS SECTION ============= */}
//             <div className="mb-8 space-y-8">
//               {/* -------------- Document → OCR -------------- */}
//               {selectedCategory === "document" && selectedSubCategory === "ocr" && (
//                 <div>
//                   <div className="flex flex-col items-center mb-6">
//                     <h3 className="mt-6 text-2xl sm:text-3xl font-semibold text-green-800">
//                       OCR Inspection
//                     </h3>
//                   </div>

//                   {/* OCR Score */}
//                   <div className="flex flex-col items-center mb-6">
//                     <CircularIndicator
//                       score={ocrScore}
//                       label="OCR Score"
//                       color={getIndicatorColor(ocrScore)}
//                     />
//                     <h4 className="mt-2 text-lg font-semibold text-gray-800">
//                       {formatScorePercentage(ocrScore)}
//                     </h4>
//                   </div>

//                   {/* Mismatch or Verified Fields */}
//                   {!kyc.moderation.document.ocr.isMatch ? (
//                     // ---------- Mismatch Results ----------
//                     <div className="space-y-4">
//                     {Object.entries(mismatchResults).map(([field, details]) => (
//                       <div
//                         key={field}
//                         className="p-4 sm:p-6 rounded-2xl shadow-lg bg-gradient-to-br from-red-100 to-red-200 border-l-8 border-red-500 transition-transform hover:scale-[1.01]"
//                       >
//                         <h4 className="text-lg sm:text-xl font-bold text-red-700 capitalize mb-1">
//                           {field.replace(/([A-Z])/g, " $1")}
//                         </h4>
                  
//                         {/* For the address field, show the similarity score badge */}
//                         {field === "address" && details.similarityScore !== undefined && (
//                           <div className="mb-2">
//                             <div className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full">
//                               Address Similarity Score: {(details.similarityScore * 100).toFixed(1)}%
//                             </div>
//                           </div>
//                         )}
                  
//                         <p className="text-sm sm:text-base text-gray-800">
//                           <strong>OCR Value:</strong> {details.ocrValue}
//                         </p>
//                         <p className="text-sm sm:text-base text-gray-800">
//                           <strong>KYC Value:</strong> {details.kycValue}
//                         </p>
//                         <p className="text-sm sm:text-base text-red-600 italic mt-1">
//                           {details.reason}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
                  
//                   ) : (
//                     // ---------- All Verified + "See More" ----------
//                     <div>
//                       <p className="text-xl text-gray-800 text-center mt-4 font-semibold">
//                         All fields have been verified and matched.
//                       </p>

//                       {/* <div className="flex justify-center mt-4">
//                         <button
//                           onClick={() => setShowOcrDetails(!showOcrDetails)}
//                           className="px-5 py-2 bg-green-600 text-white rounded-full font-bold shadow hover:bg-green-700 transition-transform transform hover:scale-105"
//                         >
//                           {showOcrDetails
//                             ? "Hide Recognized Data & Images"
//                             : "Show Recognized Data & Images"}
//                         </button>
//                       </div> */}

//                       {/* Show recognized data + base64 images when toggled */}
//                       {/* {showOcrDetails && ( */}
//                         <div className="mt-8 space-y-8">
//                           {/* Recognized OCR Data */}
//                           <div>
//                             <h4 className="text-xl font-bold text-gray-800 mb-4">
//                               Recognized Data
//                             </h4>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             {Object.entries(recognizedOcrData).filter(([field]) => field !== "validState").map(([field, value]) => (
//   <div
//     key={field}
//     className="p-4 sm:p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 border-l-4 border-green-300 transition-transform hover:scale-[1.01]"
//   >
//     <h5 className="text-lg sm:text-xl font-semibold text-green-700 capitalize mb-2">
//       {field.replace(/([A-Z])/g, " $1")}
//     </h5>
//     <p className="text-gray-800 break-words">
//       {String(value)}
//     </p>
//   </div>
// ))}

//                             </div>
//                           </div>

//                           {/* Base64 Images */}
                     
//                              {/* Toggle for Additional OCR Data */}
                        
//                         </div>
//                       {/* )} */}
//                     </div>
//                   )}
//                        {/* <div className="mt-6 text-center">
//                       <button
//                         onClick={() => setShowMore(!showMore)}
//                         className="text-indigo-500 font-bold underline"
//                       >
//                         {showMore ? "Show Less" : "Show More"}
//                       </button>
//                       {showMore && (
//                         <div
//                           className="prose max-w-none mt-4 text-left p-4 bg-white rounded-xl shadow-md"
//                           dangerouslySetInnerHTML={{
//                             __html:
//                               kyc.moderation.document.ocr.recognitionResult
//                                 .data[1],
//                           }}
//                         />
//                       )}
//                     </div> */}

// <div className="mt-6 text-center">
//                           <button
//                         onClick={() => setShowMore(!showMore)}
//                         className="text-indigo-500 font-bold underline mt-4"
//                       >
//                         {showMore ? "Show Less" : "Show More"}
//                       </button>
//                       {showMore && (
//                         <>
//                          <h4 className="text-xl font-bold text-gray-800 mb-4">
//                               Extracted Images
//                             </h4>
//                             <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
//                               {portrait && (
//                                 <div className="flex flex-col items-center">
//                                   <p className="mb-2 font-semibold text-gray-700">
//                                     Portrait
//                                   </p>
//                                   <img
//                                 src={`data:image/jpeg;base64,${portrait}`}
//                                     alt="OCR Portrait"
//                                     className="max-w-xs rounded-lg shadow-lg cursor-pointer border-2 border-gray-300 hover:scale-105 transition-transform"
//                                     // onClick={() => openImageModal(portrait)}
//                                   />
//                                 </div>
//                               )}
//                               {ghostPortrait && (
//                                 <div className="flex flex-col items-center">
//                                   <p className="mb-2 font-semibold text-gray-700">
//                                     Ghost Portrait
//                                   </p>
//                                   <img
//                                     src={`data:image/jpeg;base64,${ghostPortrait}`}
//                                     alt="Ghost Portrait"
//                                     className="max-w-xs rounded-lg shadow-lg cursor-pointer border-2 border-gray-300 hover:scale-105 transition-transform"
//                                     // onClick={() => openImageModal(ghostPortrait)}
//                                   />
//                                 </div>
//                               )}
//                               {documentFrontSide && (
//                                 <div className="flex flex-col items-center">
//                                   <p className="mb-2 font-semibold text-gray-700">
//                                     Document Front Side
//                                   </p>
//                                   <img
//                                     src={`data:image/jpeg;base64,${documentFrontSide}`}
//                                     alt="Document Front"
//                                     className="max-w-xs rounded-lg shadow-lg cursor-pointer border-2 border-gray-300 hover:scale-105 transition-transform"
//                                     // onClick={() =>
//                                     //   openImageModal(documentFrontSide)
//                                     // }
//                                   />
//                                 </div>
//                               )}
//                             </div>
//                         </>
//                       )}
                           
//                           </div>
//                 </div>
//               )}

//               {/* -------------- Document → Liveliness -------------- */}
//               {selectedCategory === "document" &&
//                 selectedSubCategory === "liveliness" && (
//                   <div className="max-w-lg mx-auto">
//                   <h3 className="text-2xl sm:text-3xl font-semibold text-yellow-700 mb-6 text-center">
//                     Liveliness Checks
//                   </h3>
            
//                   {/* Flex container to align label & result horizontally */}
//                   <div className="flex items-center justify-center space-x-4">
//                     {/* Label */}
//                     <span className="text-xl text-gray-800 font-semibold">
//                       Result:
//                     </span>
            
//                     {/* Dynamic Result Capsule */}
//                     <div
//                       className={`px-6 py-2 flex items-center space-x-2 rounded-full text-white font-bold shadow-md transition-all ${gradientClass}`}
//                     >
//                       <Icon className="text-2xl sm:text-3xl" />
//                       <span>{isSpoof ? "Spoof Detected" : "Genuine"}</span>
//                     </div>
//                   </div>
//                 </div>
//                 )}

//               {/* -------------- Face → Comparison (FIRST) -------------- */}
//               {selectedCategory === "face" &&
//                 selectedSubCategory === "comparison" && (
//                   <div className="flex flex-col items-center">
//                   <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">
//                     Face Inspection
//                   </h3>
            
//                   {/* Circular Indicator for Similarity */}
//                   <CircularIndicator
//                     score={faceComparisonScore}
//                     label="Similarity"
//                     color={getIndicatorColor(faceComparisonScore)}
//                   />
            
//                   {/* Conditional result styling */}
//                   <div
//                     className={`mt-4 p-4 rounded-lg shadow-md w-full max-w-lg flex items-center justify-center space-x-3 ${matchGradientClass}`}
//                   >
//                     {/* Icon */}
//                     {React.createElement(matchIcon, {
//                       className: `text-3xl ${
//                         isMatch ? "text-green-700" : "text-red-700"
//                       }`,
//                     })}
            
//                     {/* Text */}
//                     <p
//                       className={`text-lg font-semibold ${
//                         isMatch ? "text-green-800" : "text-red-800"
//                       }`}
//                     >
//                       {matchText}
//                     </p>
//                   </div>
            
//                   {/* Face coordinates, etc. */}
//                   {/* <div className="mt-6 w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-gray-800">
//                     <p className="text-sm sm:text-base mb-2">
//                       <strong>Face 1 Coordinates:</strong> x1:{" "}
//                       {kyc.moderation.face.comparison.data[0].data.face1.x1}, y1:{" "}
//                       {kyc.moderation.face.comparison.data[0].data.face1.y1}, x2:{" "}
//                       {kyc.moderation.face.comparison.data[0].data.face1.x2}, y2:{" "}
//                       {kyc.moderation.face.comparison.data[0].data.face1.y2}
//                     </p>
//                     <p className="text-sm sm:text-base">
//                       <strong>Face 2 Coordinates:</strong> x1:{" "}
//                       {kyc.moderation.face.comparison.data[0].data.face2.x1}, y1:{" "}
//                       {kyc.moderation.face.comparison.data[0].data.face2.y1}, x2:{" "}
//                       {kyc.moderation.face.comparison.data[0].data.face2.x2}, y2:{" "}
//                       {kyc.moderation.face.comparison.data[0].data.face2.y2}
//                     </p>
//                   </div> */}
//                 </div>
//                 )}

//               {/* -------------- Face → Liveliness (SECOND) -------------- */}
//               {selectedCategory === "face" &&
//                 selectedSubCategory === "liveliness" && (
//                   <div className="flex flex-col items-center">
//                     <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-6">
//                       Liveliness Checks
//                     </h3>
//                     <CircularIndicator
//                       score={faceLivenessScore}
//                       label="Liveness Score"
//                       color={getIndicatorColor(faceLivenessScore)}
//                     />
//                     <p className="text-xl text-gray-800 text-center mt-6">
//                       The above circle shows the face liveness confidence.
//                     </p>
//                   </div>
//                 )}
//             </div>
//           </>
//         )}
//           </div>
//         </div>
//       )}

//       {/* ============= IMAGE MODAL ============= */}
//       {isImageModalOpen && selectedImage && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
//           <div className="relative">
//             <img
//              src={`
           
//               ${selectedImage}` }
//               crossOrigin="anonymous"
//               alt="Full View"
//               className="max-w-full max-h-screen rounded-2xl shadow-2xl"
//             />
//             <button
//               onClick={closeImageModal}
//               className="absolute top-3 right-3 text-white hover:text-red-500"
//             >
//               <MdClose className="text-3xl" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* --------- DetailItem Component --------- */
// const DetailItem = ({ icon, label, value }) => (
  
//   <div className="flex items-center">
//     <div className="flex items-center justify-center rounded-xl bg-indigo-100 p-3 mr-4 shadow-md">
//       {icon}
//     </div>
//     <div className="text-lg">
//       <strong>{label}:</strong> {value}
//     </div>
//   </div>
// );

// /* --------- ActionButton Component --------- */
// const ActionButton = ({ buttonText, onClick, isLoading }) => (
//   <button
//     onClick={onClick}
//     className={`px-8 py-3 rounded-full font-bold shadow-lg transition-transform transform hover:scale-105 ${
//       isLoading
//         ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//         : buttonText === "Approve"
//         ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
//         : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
//     }`}
//     disabled={isLoading}
//   >
//     {isLoading ? "Processing..." : buttonText}
//   </button>
// );

// export default CustomerDetail;


import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaEnvelope,
  FaIdCard,
  FaInfoCircle,
  FaCalendarAlt,
  FaFlag,
  FaLocationArrow,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { MdClose, MdDescription, MdFace } from "react-icons/md";
import { useGetKycDataQuery, useUpdateKycStatusMutation } from "../features/api/kycApiSlice";
import { useParams } from "react-router-dom";

/** Reusable circular indicator for scores */
const CircularIndicator = ({ score, label, color }) => {
  const strokeWidth = 12;
  const radius = 70;
  const adjustedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * adjustedRadius;
  const dashoffset = circumference - score * circumference;
  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        <circle
          className="text-gray-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={adjustedRadius}
          cx="80"
          cy="80"
        />
        <circle
          className={`${color} transition-all duration-500 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={adjustedRadius}
          cx="80"
          cy="80"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gray-800">
          {(score * 100).toFixed(1)}%
        </span>
        {label && <p className="text-sm text-gray-600 mt-1">{label}</p>}
      </div>
    </div>
  );
};

const CustomerDetail = () => {
  const { id } = useParams();
  const { data: kycData, isLoading, error, refetch } = useGetKycDataQuery(id);
  const [updateKycStatus, { isLoading: isUpdating }] = useUpdateKycStatusMutation();

  // Modal and image modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  // Loader for moderation check
  const [isLoadingz, setIsLoadingz] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [loaderShown, setLoaderShown] = useState(false);

  // For selecting which card’s details to show (default "ocr")
  const [selectedCard, setSelectedCard] = useState("ocr");
  const [showMore, setShowMore] = useState(false);

  const kyc = kycData?.kyc;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    refetch();
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  // const handleClick = () => {
  //   if (!loaderShown) {
  //     setIsLoadingz(true);
  //     setLoaderShown(true);
  //     setMessageIndex(0);
  //     const intervalId = setInterval(() => {
  //       setMessageIndex((prevIndex) => {
  //         const nextIndex = prevIndex + 1;
  //         if (nextIndex >= messages.length) clearInterval(intervalId);
  //         return nextIndex;
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       setIsLoadingz(false);
  //       toggleModal();
  //     }, 3000);
  //   } else {
  //     toggleModal();
  //   }
  // };


  const handleStatusChange = async (status) => {
    try {
      if (kyc?.kycStatus === status) {
        toast(`User's KYC is already ${status.toLowerCase()}`, {
          icon: status === "Verified" ? "✅" : "❌",
          style: {
            background: status === "Verified" ? "#a7f3d0" : "#fecaca",
            color: "#333",
          },
        });
        return;
      }
      await updateKycStatus({ id, status }).unwrap();
      toast.success(`KYC status updated to ${status}`);
    } catch (err) {
      toast.error("Failed to update KYC status. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-blue-500 font-bold animate-pulse">
          Loading KYC details...
        </p>
      </div>
    );
  }
  if (error || !kyc) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-red-500 font-bold">
          Error loading KYC details. Please try again later.
        </p>
      </div>
    );
  }
  
const { portrait, ghostPortrait, documentFrontSide } =
  kyc?.moderation?.document?.ocr?.recognitionResult?.data?.[0]?.data?.image || {};
  // Helpers
  const formatScorePercentage = (score, decimals = 2) =>
    (score * 100).toFixed(decimals) + "%";
  const getIndicatorColor = (score) => {
    if (score < 0.5) return "text-red-500";
    if (score < 0.8) return "text-yellow-500";
    return "text-green-500";
  };

  // --- OCR Mapping ---
  const ocrScore =
    kyc?.moderation?.document?.ocr?.recognitionResult?.data?.[0]?.data?.score || 0;
  const mismatchResults = kyc?.moderation?.document?.ocr?.mismatchResults;
  const recognizedOcrData =
    kyc?.moderation?.document?.ocr?.recognitionResult?.data?.[0]?.data?.ocr || {};

  // --- Face Mapping (using new API paths) ---
  const faceComparisonData = kyc?.moderation?.face?.comparison?.data?.[0]?.data || {};
  const faceComparisonScore = faceComparisonData.similarity || 0;
  const faceComparisonResult = faceComparisonData.result || "";

  const faceLivenessData = kyc?.moderation?.face?.liveness?.data?.[0]?.data || {};
  const faceLivenessScore = faceLivenessData.liveness_score || 0;
  const faceLivenessResult = faceLivenessData.result || "";

  const isMatch = faceComparisonResult?.toLowerCase() === "same";
  const isFailed = kyc?.moderation?.status === "Failed";

  const matchGradientClass = isMatch
    ? "bg-gradient-to-r from-green-100 to-green-200"
    : "bg-gradient-to-r from-red-100 to-red-200";
  const matchIcon = isMatch ? FaCheckCircle : FaTimesCircle;
  const matchText = isMatch
    ? "Selfie image and document face are a match."
    : "Selfie image and document face do not match.";
    const livenessResultClass = faceLivenessResult.toLowerCase() === "spoof"
    ? "bg-gradient-to-r from-red-500 to-red-700"
    : "bg-gradient-to-r from-green-500 to-green-700";

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-5xl mx-auto rounded-[2.5rem] shadow-2xl p-8 sm:p-12 bg-white/40 backdrop-blur-xl border border-white/20">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8">
          Customer KYC Details
        </h1>

        {/* PERSONAL INFO SECTION */}
        <div className="bg-white/70 p-6 md:p-8 rounded-[1.5rem] shadow-xl mb-6 border border-white/40 transition-transform hover:scale-[1.005]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h2>
          <div className="flex flex-col items-center sm:flex-row sm:items-start mb-4">
            <img
              src={kyc.selfieImage}
              alt="Selfie"
              crossOrigin="anonymous"
              onClick={() => openImageModal(kyc.selfieImage)}
              className="w-20 h-20 rounded-full object-cover shadow-lg mb-4 sm:mb-0 sm:mr-4 border-2 border-blue-300 cursor-pointer hover:opacity-90 hover:scale-105 transition-all"
            />
            <div className="flex-grow text-center sm:text-left">
              <p className="text-xl font-medium text-gray-800">{kyc.name}</p>
              <p className="text-gray-500 flex items-center justify-center sm:justify-start">
                <FaEnvelope className="mr-1 text-gray-400" /> {kyc.email}
              </p>
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md ${
                  kyc.kycStatus === "Rejected"
                    ? "bg-red-600"
                    : kyc.kycStatus === "Verified"
                    ? "bg-green-600"
                    : "bg-yellow-500"
                }`}
              >
                {kyc.kycStatus}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <DetailItem icon={<FaEnvelope />} label="Email" value={kyc.email} />
            <DetailItem icon={<FaIdCard />} label="ID Number" value={kyc.idNumber} />
            <DetailItem icon={<FaInfoCircle />} label="Nationality" value={kyc.nationality} />
            <DetailItem icon={<FaCalendarAlt />} label="Date of Birth" value={new Date(kyc.dob).toLocaleDateString()} />
            <DetailItem icon={<FaFlag />} label="Country of Residence" value={kyc.countryOfResidence} />
            <DetailItem icon={<FaLocationArrow />} label="Address" value={`${kyc.addressLine1}, ${kyc.city}, ${kyc.state} - ${kyc.zipCode}`} />
          </div>
        </div>

        {/* DOCUMENT INFO SECTION */}
        <div className="bg-white/70 p-6 rounded-lg shadow-xl mb-6 transition-transform hover:scale-[1.005]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Document Information</h2>
          <div className="flex items-center mb-4">
            <img
              src={kyc.documentImage}
              crossOrigin="anonymous"
              alt="Document"
              onClick={() => openImageModal(kyc.documentImage)}
              className="w-32 h-20 rounded-lg shadow-lg mr-4 border-2 border-gray-300 cursor-pointer hover:opacity-90 transition-opacity transform hover:scale-105"
            />
            <div className="flex-grow">
              <p className="text-gray-800">
                <strong>Document Type:</strong> {kyc.documentType}
              </p>
              <p className="mt-2 text-gray-800">
                <strong>ID Number:</strong> {kyc.idNumber}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <DetailItem icon={<FaCalendarAlt />} label="Issue Date" value={new Date(kyc.idIssueDate).toLocaleDateString()} />
            {kyc.idExpiryDate && (
              <DetailItem icon={<FaCalendarAlt />} label="Expiry Date" value={new Date(kyc.idExpiryDate).toLocaleDateString()} />
            )}
            <DetailItem icon={<FaFlag />} label="Issuing Country" value={kyc.idIssuingCountry} />
          </div>
        </div>

        {/* MODERATION CHECKS ACTION */}
        <div className="p-4 bg-blue-100 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-blue-300 text-blue-700 rounded-full">
            <FaInfoCircle className="text-xl" />
          </div>
          <div className="flex-grow">
            <p className="text-gray-800 font-medium mb-2">Review Moderation Checks</p>
            <p className="text-sm text-gray-600">Check document and face verification results.</p>
          </div>
          <div className="w-full sm:w-auto">
            <button
              onClick={toggleModal}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105 whitespace-nowrap"
            >
              Check Now
            </button>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-10">
          <ActionButton
            buttonText="Approve"
            onClick={() => handleStatusChange("Verified")}
            isLoading={isUpdating}
          />
          <ActionButton
            buttonText="Decline"
            onClick={() => handleStatusChange("Rejected")}
            isLoading={isUpdating}
          />
        </div>
      </div>

    

     {/* MODERATION RESULTS MODAL */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
    <div className="bg-white/90 w-full max-w-4xl rounded-2xl shadow-2xl p-8 sm:p-10 relative overflow-y-auto max-h-[90vh] animate-fadeInDown">
      <button
        onClick={toggleModal}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-transform transform hover:scale-125"
      >
        <MdClose className="text-3xl" />
      </button>

      {/* Modal Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900">Moderation Results</h2>
        <p className="text-gray-600 mt-2">Review the results of the moderation process below.</p>
      </div>

      {(kyc?.moderation?.status === "Failed" ||
        kyc?.moderation?.status === "Pending") ? (
        <div className="flex items-center justify-center min-h-[16rem] bg-gray-50">
          <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-md shadow-md">
            <div className="relative inline-flex items-center justify-center">
              <span
                className={`inline-block w-16 h-16 rounded-full border-4 border-gray-300 animate-spin ${
                  isFailed ? "border-t-red-500" : "border-t-indigo-600"
                }`}
              />
            </div>
            <h2 className={`text-xl font-semibold ${isFailed ? "text-red-600" : "text-indigo-600"}`}>
              {isFailed ? "Moderation Failed" : "Moderation Pending"}
            </h2>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              {isFailed
                ? "Your document verification failed. Please try again or contact support."
                : "We’re currently reviewing your documents. Please wait..."}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Moderation Results
            </h2>
            <p className="text-gray-600 mt-2">
              Review the results of the moderation process below.
            </p>
          </div> */}

          {/* Premium 3-Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* OCR Card */}
            <div
              onClick={() => setSelectedCard("ocr")}
              className={`p-6 rounded-2xl shadow-xl cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 ${
                kyc?.moderation?.document?.ocr?.isMatch
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                  : "bg-gradient-to-r from-red-400 to-red-600 text-white"
              } ${
                selectedCard === "ocr" ? "ring-4 ring-green-300" : "ring-2 ring-transparent"
              }`}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <span className="mr-2">OCR Match</span>
                {kyc?.moderation?.document?.ocr?.isMatch ? (
                  <FaCheckCircle className="text-2xl" />
                ) : (
                  <FaTimesCircle className="text-2xl" />
                )}
              </h3>
              <p className="text-lg">
                {kyc?.moderation?.document?.ocr?.isMatch ? "Matched" : "Mismatched"}
              </p>
            </div>

            {/* Face Match Card */}
            <div
              onClick={() => setSelectedCard("face")}
              className={`p-6 rounded-2xl shadow-xl cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 ${
                faceComparisonData?.result?.toLowerCase() === "same"
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                  : "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
              } ${
                selectedCard === "face" ? "ring-4 ring-blue-500" : "ring-2 ring-transparent"
              }`}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <span className="mr-2">Face Match</span>
                {faceComparisonData?.result?.toLowerCase() === "same" ? (
                  <FaCheckCircle className="text-2xl" />
                ) : (
                  <FaTimesCircle className="text-2xl" />
                )}
              </h3>
              <p className="text-lg">
                {faceComparisonData?.result?.toLowerCase() === "same"
                  ? "Matched"
                  : "Not Matched"}
              </p>
           
            </div>

            {/* Face Liveliness Card */}
            <div
              onClick={() => setSelectedCard("liveliness")}
              className={`p-6 rounded-2xl shadow-xl cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 ${
                faceLivenessData?.result?.toLowerCase() === "spoof"
                  ? "bg-gradient-to-r from-red-400 to-red-600 text-white"
                  : "bg-gradient-to-r from-green-400 to-green-600 text-white"
              } ${
                selectedCard === "liveliness" ? "ring-4 ring-yellow-300" : "ring-2 ring-transparent"
              }`}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <span className="mr-2">Face Liveliness</span>
                {faceLivenessData?.result?.toLowerCase() === "spoof" ? (
                  <FaTimesCircle className="text-2xl" />
                ) : (
                  <FaCheckCircle className="text-2xl" />
                )}
              </h3>
              <p className="text-lg">
                {faceLivenessData?.result?.toLowerCase() === "spoof" ? "Failed" : "Passed"}
              </p>
              
            </div>
          </div>

          {/* DETAILS SECTION */}
          {selectedCard === "ocr" && (
            <div className="mb-8">
              {!kyc?.moderation?.document?.ocr?.isMatch ? (
                // Mismatch Results
                <div className="space-y-4">
                  {Object.entries(mismatchResults || {}).map(([field, details]) => (
                    <div
                      key={field}
                      className="p-4 sm:p-6 rounded-2xl shadow-lg bg-gradient-to-br from-red-100 to-red-200 border-l-8 border-red-500 transition-transform hover:scale-[1.01]"
                    >
                      <h4 className="text-lg sm:text-xl font-bold text-red-700 capitalize mb-1">
                        {field.replace(/([A-Z])/g, " $1")}
                      </h4>
                      {field === "address" && details.similarityScore !== undefined && (
                        <div className="mb-2">
                          <div className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full">
                            Address Similarity Score: {(details.similarityScore * 100).toFixed(1)}%
                          </div>
                        </div>
                      )}
                      <p className="text-sm sm:text-base text-gray-800">
                        <strong>OCR Value:</strong> {details.ocrValue}
                      </p>
                      <p className="text-sm sm:text-base text-gray-800">
                        <strong>KYC Value:</strong> {details.kycValue}
                      </p>
                      <p className="text-sm sm:text-base text-red-600 italic mt-1">
                        {details.reason}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                // All fields matched → Recognized OCR Data
                <div className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-l-8 border-green-500">
                <div className="flex items-center mb-6">
                  <svg
                    className="w-8 h-8 text-green-600 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="text-2xl font-semibold text-green-700">
                    OCR Matched Successfully
                  </h3>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  All OCR values have been verified and matched with the
                  provided KYC data.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(recognizedOcrData)
                            .filter(([key]) => key !== "validState")
                            .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex flex-col bg-white p-4 rounded-md shadow border border-gray-200"
                      >
                        <h4 className="text-sm font-bold text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </h4>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {value}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              )}

<div className="mt-6 text-center">
                          <button
                        onClick={() => setShowMore(!showMore)}
                        className="text-indigo-500 font-bold underline mt-4"
                      >
                        {showMore ? "Show Less" : "Show More"}
                      </button>
                      {showMore && (
                        <>
                         <h4 className="text-xl font-bold text-gray-800 mb-4">
                              Extracted Images
                            </h4>
                            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                              {portrait && (
                                <div className="flex flex-col items-center">
                                  <p className="mb-2 font-semibold text-gray-700">
                                    Portrait
                                  </p>
                                  <img
                                src={`data:image/jpeg;base64,${portrait}`}
                                    alt="OCR Portrait"
                                    className="max-w-xs rounded-lg shadow-lg cursor-pointer border-2 border-gray-300 hover:scale-105 transition-transform"
                                    // onClick={() => openImageModal(portrait)}
                                  />
                                </div>
                              )}
                              {ghostPortrait && (
                                <div className="flex flex-col items-center">
                                  <p className="mb-2 font-semibold text-gray-700">
                                    Ghost Portrait
                                  </p>
                                  <img
                                    src={`data:image/jpeg;base64,${ghostPortrait}`}
                                    alt="Ghost Portrait"
                                    className="max-w-xs rounded-lg shadow-lg cursor-pointer border-2 border-gray-300 hover:scale-105 transition-transform"
                                    // onClick={() => openImageModal(ghostPortrait)}
                                  />
                                </div>
                              )}
                              {documentFrontSide && (
                                <div className="flex flex-col items-center">
                                  <p className="mb-2 font-semibold text-gray-700">
                                    Document Front Side
                                  </p>
                                  <img
                                    src={`data:image/jpeg;base64,${documentFrontSide}`}
                                    alt="Document Front"
                                    className="max-w-xs rounded-lg shadow-lg cursor-pointer border-2 border-gray-300 hover:scale-105 transition-transform"
                                    // onClick={() =>
                                    //   openImageModal(documentFrontSide)
                                    // }
                                  />
                                </div>
                              )}
                            </div>
                        </>
                      )}
                           
                          </div>
            </div>
          )}

          {selectedCard === "face" && (
            <div className="mb-8">
              <div className="flex flex-col items-center">
                <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">
                  Face Inspection
                </h3>
                {/* Circular Indicator for Similarity */}
                <CircularIndicator
                  score={faceComparisonScore}
                  label="Similarity"
                  color={getIndicatorColor(faceComparisonScore)}
                />
                {/* Conditional result styling */}
                <div
                  className={`mt-4 p-4 rounded-lg shadow-md w-full max-w-lg flex items-center justify-center space-x-3 ${matchGradientClass}`}
                >
                  {/* Icon */}
                  {React.createElement(matchIcon, {
                    className: `text-3xl ${isMatch ? "text-green-700" : "text-red-700"}`,
                  })}
                  {/* Text */}
                  <p
                    className={`text-lg font-semibold ${
                      isMatch ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {matchText}
                  </p>
                </div>
                {/* Additional face details can be added here if needed */}
              </div>
            </div>
          )}

{selectedCard === "liveliness" && (
        <div className="mb-8">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-6">Liveliness Checks</h3>
            <CircularIndicator
              score={faceLivenessData.liveness_score || 0}
              label="Liveness Score"
              color={getIndicatorColor(faceLivenessData.liveness_score || 0)}
            />
            <p className="text-xl text-gray-800 text-center mt-6">The above circle shows the face liveness confidence.</p>
            <p className={`text-lg font-semibold text-white px-4 py-2 rounded-lg mt-4 shadow-lg ${livenessResultClass}`}>
              <strong>Result:</strong> {faceLivenessResult}
            </p>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  </div>
)}


      {/* IMAGE MODAL */}
      {isImageModalOpen && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
          <div className="relative">
            <img
              src={selectedImage}
              crossOrigin="anonymous"
              alt="Full View"
              className="max-w-full max-h-screen rounded-lg shadow-lg"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-3 right-3 text-white hover:text-red-500"
            >
              <MdClose className="text-3xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for rendering detail items with icons.
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="flex items-center justify-center rounded-lg bg-blue-100 p-3 mr-3 shadow-md">
      {icon}
    </div>
    <div>
      <strong>{label}:</strong> {value}
    </div>
  </div>
);

// Helper component for rendering action buttons.
const ActionButton = ({ buttonText, onClick, isLoading }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 ${
      isLoading
        ? "bg-gray-300"
        : buttonText === "Approve"
        ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
        : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
    }`}
    disabled={isLoading}
  >
    {isLoading ? "Processing..." : buttonText}
  </button>
);

export default CustomerDetail;
