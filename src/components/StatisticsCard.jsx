// import React from "react";
// import PropTypes from "prop-types";

// export function StatisticsCard({ color, icon, title, value, footer }) {
//   return (
//     <div className="relative bg-white border border-gray-100 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg p-5 max-w-xs w-full">
//       {/* Icon and Title Section */}
//       <div className="flex items-center space-x-4 mb-4">
//         <div
//           className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`}
//         >
//           {icon}
//         </div>
//         <div className="text-left">
//           <p className="text-gray-500 text-sm font-medium">{title}</p>
//           <p className="text-2xl font-bold text-gray-800">{value}</p>
//         </div>
//       </div>

//       {/* Footer Section */}
//       {footer && (
//         <div className="mt-2 text-gray-500 text-xs border-t pt-2">{footer}</div>
//       )}
//     </div>
//   );
// }

// StatisticsCard.propTypes = {
//   color: PropTypes.string.isRequired,
//   icon: PropTypes.node.isRequired,
//   title: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   footer: PropTypes.node,
// };

// export default StatisticsCard;
import React from "react";
import PropTypes from "prop-types";

export function StatisticsCard({ color, icon, title, value, footer }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm w-full">
      {/* Icon Section with Rounded Corner Border */}
      <div className="flex items-center space-x-4">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gray-200 ${color}`}
        >
          {icon}
        </div>
        <div className="text-left">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3"></div>

      {/* Footer Section */}
      {footer && <div className="text-sm text-gray-500">{footer}</div>}
    </div>
  );
}

StatisticsCard.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  footer: PropTypes.node,
};

export default StatisticsCard;
