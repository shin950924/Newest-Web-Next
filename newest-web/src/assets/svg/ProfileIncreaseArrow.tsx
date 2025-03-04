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
      stroke="#A855F7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <path d="m14.901 4.667-5.667 5.666L5.901 7l-4.333 4.333" />
      <path d="M10.901 4.667h4v4" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.234 0h16v16h-16z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
