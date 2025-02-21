import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kycId: null,
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    setKycId: (state, action) => {
      state.kycId = action.payload;
    },
    clearKycId: (state) => {
      state.kycId = null;
    },
  },
});


// model info for kyc detaild
// {isModalOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
//     <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl p-8 relative overflow-y-auto max-h-[90vh] animate-fadeIn">
//       {/* Close Button */}
//       <button
//         onClick={toggleModal}
//         className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-transform transform hover:scale-125"
//       >
//         <MdClose className="text-3xl" />
//       </button>

//       {/* Modal Header */}
//       <div className="text-center mb-8">
//         <h2 className="text-4xl font-extrabold text-gray-900">
//           Moderation Results
//         </h2>
//         <p className="text-gray-600 mt-2">
//           Review the results of the moderation process below.
//         </p>
//       </div>

//       {/* Animated Cards Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {/* OCR Match Card */}
//         <div
//           className={`p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${
//             kyc.moderation.ocr.ocrMatch
//               ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
//               : "bg-gradient-to-r from-red-400 to-red-600 text-white"
//           }`}
//         >
//           <h3 className="text-lg font-bold mb-4">OCR Match</h3>
//           <div className="flex items-center">
//             {kyc.moderation.ocr.ocrMatch ? (
//               <FaCheck className="text-3xl mr-3" />
//             ) : (
//               <FaTimes className="text-3xl mr-3" />
//             )}
//             <span>
//               {kyc.moderation.ocr.ocrMatch ? "Matched" : "Mismatched"}
//             </span>
//           </div>
//         </div>

//         {/* Face Match Card */}
//         <div
//           className={`p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${
//             kyc.moderation.faceMatch.match
//               ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
//               : "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
//           }`}
//         >
//           <h3 className="text-lg font-bold mb-4">Face Match</h3>
//           <div className="flex items-center">
//             {kyc.moderation.faceMatch.match ? (
//               <FaCheck className="text-3xl mr-3" />
//             ) : (
//               <FaTimes className="text-3xl mr-3" />
//             )}
//             <span>
//               {kyc.moderation.faceMatch.match
//                 ? 
//                 // `Confidence: ${(kyc.moderation.faceMatch.matchConfidence * 100).toFixed(
//                 //     2
//                 //   )}%`
//                 "Matched"
//                 : "Not Matched"}
//             </span>
//           </div>
//         </div>

//         {/* Liveliness Check Details Card */}
//         <div
//           className={`p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${
//             kyc.moderation.liveliness.passed
//               ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
//               : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
//           }`}
//         >
//           <h3 className="text-lg font-bold mb-4">Liveliness Check</h3>
//           <div>
//             <p>{kyc.moderation.liveliness.livelinessDetails}</p>
//           </div>
//         </div>
//       </div>

//       {/* OCR Mismatch Details */}
//       {!kyc.moderation.ocr.ocrMatch && (
//         <div className="mb-8">
//           <h3 className="text-2xl font-semibold text-red-600 mb-4">
//             OCR Mismatch Details
//           </h3>
//           <div className="space-y-6">
//             {Object.entries(kyc.moderation.ocr.ocrMismatchDetails).map(
//               ([field, details]) => (
//                 <div
//                   key={field}
//                   className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-red-100 to-red-200 border-l-4 border-red-500 transform transition-transform hover:scale-105"
//                 >
//                   <h4 className="text-lg font-bold text-red-700 capitalize mb-2">
//                     {field.replace(/([A-Z])/g, " $1")}
//                   </h4>
//                   <p className="text-sm text-gray-700">
//                     <strong>OCR Value:</strong> {details.ocrValue}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <strong>KYC Value:</strong> {details.kycValue}
//                   </p>
//                   <p className="text-sm text-red-600 italic mt-2">
//                     {details.reason}
//                   </p>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       )}

//       {/* Footer Section */}
//       <div className="text-center mt-8">
//         <button
//           onClick={toggleModal}
//           className="px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-md shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}


export const { setKycId, clearKycId } = kycSlice.actions;

export default kycSlice.reducer;
