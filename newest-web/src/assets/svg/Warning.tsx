import * as React from "react";

const Warning: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="#F59E0B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.623 15.68 11.956 4.014a1.667 1.667 0 0 0-2.9 0L2.389 15.68a1.667 1.667 0 0 0 1.459 2.5H17.18a1.667 1.667 0 0 0 1.442-2.5ZM10.514 8.18v3.334M10.514 14.847h.009"
    />
  </svg>
);

export default Warning;
