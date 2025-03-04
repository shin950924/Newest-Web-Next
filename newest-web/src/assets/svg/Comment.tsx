import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke="#6B7280"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.431 20.25a9 9 0 1 0-3.9-3.9l-2 5.9 5.9-2Z"
    />
  </svg>
);
export default SvgComponent;
