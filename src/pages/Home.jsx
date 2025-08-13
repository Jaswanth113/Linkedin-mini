import { CreatePost } from '../components/Feed/CreatePost';
import { PostFeed } from '../components/Feed/PostFeed';
import { PeopleYouMightKnow } from '../components/Feed/PeopleYouMightKnow';
import { NewsSection } from '../components/Feed/NewsSection';
import { useAuth } from '../hooks/useAuth';

// A simple placeholder for the profile summary
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ProfileSummaryCard = ({
  user
}) => /*#__PURE__*/_jsxs("div", {
  className: "bg-white p-4 rounded-lg shadow-md text-center",
  children: [/*#__PURE__*/_jsx("div", {
    className: "w-20 h-20 mx-auto bg-gray-300 rounded-full mb-2"
  }), /*#__PURE__*/_jsx("h3", {
    className: "font-bold text-lg",
    children: user?.displayName || 'Guest User'
  }), /*#__PURE__*/_jsx("p", {
    className: "text-sm text-gray-500",
    children: "Welcome to your dashboard!"
  })]
});
export function Home() {
  const {
    currentUser
  } = useAuth();
  return /*#__PURE__*/_jsx("div", {
    className: "bg-gray-100 min-h-screen",
    children: /*#__PURE__*/_jsx("div", {
      className: "container mx-auto p-4",
      children: /*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "hidden md:block md:col-span-1 lg:col-span-1 space-y-6",
          children: [/*#__PURE__*/_jsx(ProfileSummaryCard, {
            user: currentUser
          }), /*#__PURE__*/_jsx(PeopleYouMightKnow, {})]
        }), /*#__PURE__*/_jsxs("div", {
          className: "col-span-1 md:col-span-3 lg:col-span-2 space-y-6",
          children: [/*#__PURE__*/_jsx(CreatePost, {}), /*#__PURE__*/_jsx(PostFeed, {})]
        }), /*#__PURE__*/_jsx("div", {
          className: "hidden lg:block lg:col-span-1 space-y-6",
          children: /*#__PURE__*/_jsx(NewsSection, {})
        })]
      })
    })
  });
}