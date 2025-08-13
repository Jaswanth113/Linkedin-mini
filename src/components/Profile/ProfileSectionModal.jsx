import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ProfileSectionModal({
  isOpen,
  onClose,
  title,
  children
}) {
  if (!isOpen) return null;
  return /*#__PURE__*/_jsx("div", {
    className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4",
    children: /*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "p-6 border-b border-gray-200 flex justify-between items-center",
        children: [/*#__PURE__*/_jsx("h3", {
          className: "text-2xl font-semibold text-gray-900",
          children: title
        }), /*#__PURE__*/_jsx("button", {
          onClick: onClose,
          className: "text-gray-400 hover:text-gray-600 text-3xl font-light",
          children: "\xD7"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "p-8",
        children: children
      })]
    })
  });
}