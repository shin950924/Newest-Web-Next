import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke="#6B7280"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 14.25c1.49-1.46 3-3.21 3-5.5a5.5 5.5 0 0 0-5.5-5.5c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.75c0 2.3 1.5 4.05 3 5.5l7 7 7-7Z"
    />
  </svg>
);
export default SvgComponent;
