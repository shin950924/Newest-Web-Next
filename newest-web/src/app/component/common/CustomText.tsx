import React from "react";

interface CustomTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  className,
  style = {},
}) => {
  const mergedStyle: React.CSSProperties = {
    ...style,
    color: style.color ? style.color : "#000",
  };

  return (
    <div className={className} style={mergedStyle}>
      {children}
    </div>
  );
};

export default CustomText;
