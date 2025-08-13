import React, { useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Toast({
  type,
  message,
  onClose,
  duration = 3000
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  return /*#__PURE__*/_jsx("div", {
    className: "fixed top-4 right-4 z-50 animate-in slide-in-from-right-2",
    children: /*#__PURE__*/_jsxs("div", {
      className: `flex items-center space-x-3 p-4 rounded-lg shadow-lg border ${type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`,
      children: [type === 'success' ? /*#__PURE__*/_jsx(Check, {
        className: "w-5 h-5 text-green-600"
      }) : /*#__PURE__*/_jsx(AlertCircle, {
        className: "w-5 h-5 text-red-600"
      }), /*#__PURE__*/_jsx("span", {
        className: "text-sm font-medium",
        children: message
      }), /*#__PURE__*/_jsx("button", {
        onClick: onClose,
        className: "text-gray-400 hover:text-gray-600 transition-colors",
        children: /*#__PURE__*/_jsx(X, {
          className: "w-4 h-4"
        })
      })]
    })
  });
}