import * as React from "react";

const XOrange: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <path
      stroke="#F59E0B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m12.577 4.68-8 8M4.577 4.68l8 8"
    />
  </svg>
);

export default XOrange;
