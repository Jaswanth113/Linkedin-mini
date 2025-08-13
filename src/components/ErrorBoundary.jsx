import React, { Component } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export class ErrorBoundary extends Component {
  state = {
    hasError: false
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/_jsx("div", {
        className: "min-h-screen bg-[#f3f2ef] flex items-center justify-center p-4",
        children: /*#__PURE__*/_jsxs("div", {
          className: "bg-white rounded-lg shadow-lg p-8 max-w-md w-full",
          children: [/*#__PURE__*/_jsx("h1", {
            className: "text-2xl font-bold text-red-600 mb-4",
            children: "Something went wrong"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-gray-700 mb-4",
            children: "An error occurred while loading the application. Please try refreshing the page."
          }), this.state.error && /*#__PURE__*/_jsxs("details", {
            className: "text-sm text-gray-600",
            children: [/*#__PURE__*/_jsx("summary", {
              className: "cursor-pointer mb-2",
              children: "Error details"
            }), /*#__PURE__*/_jsx("pre", {
              className: "bg-gray-100 p-2 rounded text-xs overflow-auto",
              children: this.state.error.message
            })]
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => window.location.reload(),
            className: "linkedin-btn-primary w-full",
            children: "Refresh Page"
          })]
        })
      });
    }
    return this.props.children;
  }
}