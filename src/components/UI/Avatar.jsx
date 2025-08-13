import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const Avatar = ({
  name,
  className = ''
}) => {
  const getInitials = name => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  // Using a consistent blue color as requested in the image.
  const avatarColor = 'bg-blue-600';
  return /*#__PURE__*/_jsx("div", {
    className: `rounded-full flex items-center justify-center text-white font-bold ${avatarColor} ${className}`,
    children: getInitials(name)
  });
};
export default Avatar;