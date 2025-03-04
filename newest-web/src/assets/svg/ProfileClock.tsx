import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    {...props}
  >
    <g
      stroke="#6B7280"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <path d="M6.791 11.024a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
      <path d="M6.791 3.024v3l2 1" />
    </g>
  </svg>
);
export default SvgComponent;
