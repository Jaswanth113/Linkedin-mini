import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export function ProtectedRoute({
  children
}) {
  const {
    currentUser,
    loading
  } = useAuth();
  if (loading) {
    return /*#__PURE__*/_jsx("div", {
      className: "min-h-screen bg-[#f3f2ef] flex items-center justify-center",
      children: /*#__PURE__*/_jsx("div", {
        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-[#0a66c2]"
      })
    });
  }
  if (!currentUser) {
    return /*#__PURE__*/_jsx(Navigate, {
      to: "/login"
    });
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: children
  });
}