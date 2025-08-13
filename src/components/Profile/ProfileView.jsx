import { Calendar, FileText } from 'lucide-react';
import Avatar from '../UI/Avatar';
import { PostCard } from '../Feed/PostCard';
import { PeopleYouMightKnow } from '../Feed/PeopleYouMightKnow';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import { useProfile } from '../../hooks/useProfile';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ProfileView() {
  const {
    userId
  } = useParams();
  const {
    currentUser
  } = useAuth();
  const {
    profile: userProfile,
    loading: profileLoading
  } = useProfile(userId || currentUser?.id);
  const {
    getUserPosts
  } = usePosts();
  const profileId = userId || currentUser?.id;
  const userPosts = profileId ? getUserPosts(profileId) : [];
  if (profileLoading || !currentUser || !userProfile) {
    return /*#__PURE__*/_jsx("div", {
      children: "Loading..."
    });
  }
  const formatJoinDate = date => {
    if (!date) return '';
    const joinDate = date.toDate ? date.toDate() : new Date(date);
    return joinDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-6",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden",
      children: [/*#__PURE__*/_jsx("div", {
        className: "h-32 md:h-48 bg-gradient-to-r from-blue-50 to-indigo-100"
      }), /*#__PURE__*/_jsxs("div", {
        className: "p-6",
        children: [/*#__PURE__*/_jsx("div", {
          className: "relative",
          children: /*#__PURE__*/_jsx("div", {
            className: "absolute -top-20 md:-top-24",
            children: /*#__PURE__*/_jsx(Avatar, {
              name: userProfile.displayName,
              className: "w-28 h-28 md:w-36 md:h-36 text-5xl border-4 border-white rounded-full"
            })
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "pt-12 md:pt-16",
          children: [/*#__PURE__*/_jsx("h1", {
            className: "text-2xl font-bold text-gray-900 mb-1",
            children: userProfile.displayName
          }), /*#__PURE__*/_jsx("p", {
            className: "text-gray-600 mb-3",
            children: userProfile.headline || 'No headline provided'
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1",
            children: [/*#__PURE__*/_jsx("div", {
              className: "flex items-center",
              children: /*#__PURE__*/_jsx("span", {
                className: "text-sm text-gray-500",
                children: userProfile.email
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center",
              children: [/*#__PURE__*/_jsx(Calendar, {
                className: "w-4 h-4 mr-1.5"
              }), /*#__PURE__*/_jsxs("span", {
                children: ["Joined ", formatJoinDate(userProfile.createdAt)]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center",
              children: [/*#__PURE__*/_jsx(FileText, {
                className: "w-4 h-4 mr-1.5"
              }), /*#__PURE__*/_jsxs("span", {
                children: [userPosts.length, " posts"]
              })]
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6",
      children: [/*#__PURE__*/_jsx("h2", {
        className: "text-lg font-semibold text-gray-900 mb-4",
        children: "Your Posts"
      }), userPosts.length === 0 ? /*#__PURE__*/_jsx("p", {
        className: "text-gray-500 text-center py-8",
        children: "You haven't posted anything yet. Go to the home page to create your first post!"
      }) : /*#__PURE__*/_jsx("div", {
        className: "space-y-4",
        children: userPosts.map(post => /*#__PURE__*/_jsx(PostCard, {
          post: post
        }, post.id))
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6",
      children: [/*#__PURE__*/_jsx("h2", {
        className: "text-lg font-semibold text-gray-900 mb-4",
        children: "People you may know"
      }), /*#__PURE__*/_jsx(PeopleYouMightKnow, {})]
    })]
  });
}