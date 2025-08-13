import { Header } from './Header';
import { useAuth } from '../../hooks/useAuth';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Layout({
  children
}) {
  const {
    currentUser,
    loading: authLoading
  } = useAuth();

  // Show loading state while auth or profile is loading
  if (authLoading) {
    return /*#__PURE__*/_jsx("div", {
      className: "min-h-screen bg-[#f3f2ef] flex items-center justify-center",
      children: /*#__PURE__*/_jsx("div", {
        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-[#0a66c2]"
      })
    });
  }

  // If no user is authenticated, don't render the layout
  if (!currentUser) {
    return null;
  }
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen bg-[#f3f2ef]",
    children: [/*#__PURE__*/_jsx(Header, {}), /*#__PURE__*/_jsx("main", {
      className: "max-w-[1128px] mx-auto px-4 py-6",
      children: children
    })]
  });
}