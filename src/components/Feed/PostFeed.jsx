import { PostCard } from './PostCard';
import { usePosts } from '../../hooks/usePosts';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PostFeed() {
  const {
    posts,
    loading
  } = usePosts();
  if (loading) {
    return /*#__PURE__*/_jsx("div", {
      className: "space-y-2",
      children: [...Array(3)].map((_, i) => /*#__PURE__*/_jsx("div", {
        className: "linkedin-card p-4",
        children: /*#__PURE__*/_jsxs("div", {
          className: "animate-pulse",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center space-x-3 mb-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-12 h-12 bg-gray-300 rounded-full"
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-1",
              children: [/*#__PURE__*/_jsx("div", {
                className: "h-4 bg-gray-300 rounded w-1/3 mb-2"
              }), /*#__PURE__*/_jsx("div", {
                className: "h-3 bg-gray-300 rounded w-1/4"
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "h-20 bg-gray-300 rounded mb-4"
          }), /*#__PURE__*/_jsx("div", {
            className: "h-8 bg-gray-300 rounded"
          })]
        })
      }, i))
    });
  }
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-2 feed-container",
    children: [/*#__PURE__*/_jsx("div", {
      className: "linkedin-card p-3",
      children: /*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center space-x-2",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-sm text-[#666666]",
            children: "Sort by:"
          }), /*#__PURE__*/_jsx("button", {
            className: "text-sm font-medium text-[#000000] hover:text-[#0a66c2]",
            children: "Top"
          })]
        }), /*#__PURE__*/_jsx("button", {
          className: "text-sm text-[#666666] hover:text-[#0a66c2]",
          children: "Recent"
        })]
      })
    }), posts.length > 0 ? posts.map(post => /*#__PURE__*/_jsx(PostCard, {
      post: post
    }, post.id)) : /*#__PURE__*/_jsxs("div", {
      className: "linkedin-card p-8 text-center",
      children: [/*#__PURE__*/_jsx("div", {
        className: "w-16 h-16 bg-[#f3f2ef] rounded-full flex items-center justify-center mx-auto mb-4",
        children: /*#__PURE__*/_jsx("span", {
          className: "text-2xl",
          children: "\uD83D\uDCDD"
        })
      }), /*#__PURE__*/_jsx("h3", {
        className: "text-[18px] font-semibold text-[#000000] mb-2",
        children: "Welcome to your feed!"
      }), /*#__PURE__*/_jsx("p", {
        className: "text-[14px] text-[#666666] mb-4 max-w-md mx-auto",
        children: "This is where you'll see updates from your network. Start by creating your first post to share your thoughts with the community."
      }), /*#__PURE__*/_jsx("p", {
        className: "text-[12px] text-[#666666]",
        children: "No posts yet. Be the first to share something!"
      })]
    })]
  });
}