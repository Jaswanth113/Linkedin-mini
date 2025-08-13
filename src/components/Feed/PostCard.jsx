import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageCircle, Repeat2, Send, Globe, Trash2 } from 'lucide-react';
import Avatar from '../UI/Avatar';
import { usePosts } from '../../hooks/usePosts';
import { useAuth } from '../../hooks/useAuth';
import { useProfileViews } from '../../hooks/useProfileViews';
import { useProfile } from '../../hooks/useProfile';
import { PollDisplay } from './PollDisplay';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PostCard({
  post
}) {
  const {
    currentUser
  } = useAuth();
  const {
    likePost,
    addComment,
    sharePost,
    isPostLikedByUser,
    deletePost
  } = usePosts();
  const {
    profile: authorProfile,
    loading: authorLoading
  } = useProfile(post.authorId);
  const {
    incrementPostImpressions
  } = useProfileViews(post.authorId);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    incrementPostImpressions();
  }, []);
  const handleLike = async () => {
    if (!currentUser) return;
    try {
      await likePost(post.id);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  const handleComment = async () => {
    if (!currentUser || !newComment.trim()) return;
    try {
      await addComment(post.id, newComment);
      setNewComment('');
      setShowComments(true);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const handleShare = async () => {
    if (!currentUser) return;
    try {
      await sharePost(post.id);
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };
  const formatTimestamp = timestamp => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w`;
    return date.toLocaleDateString();
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "linkedin-card mb-2",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "p-3",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-start justify-between",
        children: [/*#__PURE__*/_jsx("div", {
          className: "flex-1 min-w-0",
          children: authorLoading ? /*#__PURE__*/_jsxs("div", {
            className: "flex items-start space-x-2 animate-pulse",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-12 h-12 bg-gray-300 rounded-full"
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-1 space-y-2 py-1",
              children: [/*#__PURE__*/_jsx("div", {
                className: "h-4 bg-gray-300 rounded w-3/4"
              }), /*#__PURE__*/_jsx("div", {
                className: "h-3 bg-gray-300 rounded w-1/2"
              }), /*#__PURE__*/_jsx("div", {
                className: "h-3 bg-gray-300 rounded w-1/4"
              })]
            })]
          }) : /*#__PURE__*/_jsxs("div", {
            className: "flex items-start space-x-2",
            children: [/*#__PURE__*/_jsx(Avatar, {
              name: authorProfile?.displayName,
              className: "w-12 h-12"
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-1 min-w-0",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-1",
                children: [/*#__PURE__*/_jsx(Link, {
                  to: `/user/${post.authorId}`,
                  className: "font-semibold text-[#000000] text-sm hover:text-[#0a66c2] hover:underline",
                  children: authorProfile?.displayName || 'User'
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-[#666666] text-xs",
                  children: "\u2022 1st"
                })]
              }), authorProfile?.headline && /*#__PURE__*/_jsx("p", {
                className: "text-[#666666] text-xs leading-tight truncate",
                children: authorProfile.headline
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-1 text-[#666666] text-xs",
                children: [/*#__PURE__*/_jsx("span", {
                  children: formatTimestamp(post.createdAt)
                }), /*#__PURE__*/_jsx("span", {
                  children: "\u2022"
                }), /*#__PURE__*/_jsx(Globe, {
                  className: "w-3 h-3"
                })]
              })]
            })]
          })
        }), currentUser?.id === post.authorId && /*#__PURE__*/_jsx("button", {
          onClick: () => {
            if (window.confirm('Are you sure you want to delete this post?')) {
              deletePost(post.id);
            }
          },
          className: "text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors flex-shrink-0",
          title: "Delete post",
          children: /*#__PURE__*/_jsx(Trash2, {
            className: "w-4 h-4"
          })
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "mb-3",
        children: /*#__PURE__*/_jsx("p", {
          className: "text-[#000000] text-sm whitespace-pre-wrap break-words",
          children: post.content
        })
      }), post.poll && /*#__PURE__*/_jsx(PollDisplay, {
        post: post
      })]
    }), (post.likes?.length > 0 || post.comments?.length > 0 || post.shares > 0) && /*#__PURE__*/_jsx("div", {
      className: "px-3 pb-2",
      children: /*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between text-xs text-[#666666] pb-2 border-b border-[#d9d9d9]",
        children: [/*#__PURE__*/_jsx("div", {
          className: "flex items-center space-x-4",
          children: post.likes?.length > 0 && /*#__PURE__*/_jsxs("div", {
            className: "flex items-center space-x-1 hover:underline cursor-pointer",
            children: [/*#__PURE__*/_jsx("div", {
              className: "flex items-center -space-x-1",
              children: /*#__PURE__*/_jsx("div", {
                className: "w-4 h-4 bg-[#0a66c2] rounded-full flex items-center justify-center border border-white",
                children: /*#__PURE__*/_jsx(ThumbsUp, {
                  className: "w-2 h-2 text-white fill-current"
                })
              })
            }), /*#__PURE__*/_jsx("span", {
              children: post.likes.length
            })]
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center space-x-4",
          children: [post.comments?.length > 0 && /*#__PURE__*/_jsxs("button", {
            onClick: () => setShowComments(!showComments),
            className: "hover:underline",
            children: [post.comments.length, " comment", post.comments.length !== 1 ? 's' : '']
          }), post.shares > 0 && /*#__PURE__*/_jsxs("span", {
            className: "hover:underline cursor-pointer",
            children: [post.shares, " repost", post.shares !== 1 ? 's' : '']
          })]
        })]
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "px-3 py-1",
      children: /*#__PURE__*/_jsxs("div", {
        className: "flex items-center",
        children: [/*#__PURE__*/_jsxs("button", {
          onClick: handleLike,
          className: `linkedin-post-action ${isPostLikedByUser(post) ? 'active' : ''}`,
          children: [/*#__PURE__*/_jsx(ThumbsUp, {
            className: `w-5 h-5 ${isPostLikedByUser(post) ? 'fill-current' : ''}`
          }), /*#__PURE__*/_jsx("span", {
            className: "text-sm font-medium",
            children: "Like"
          })]
        }), /*#__PURE__*/_jsxs("button", {
          onClick: () => setShowComments(!showComments),
          className: "linkedin-post-action",
          children: [/*#__PURE__*/_jsx(MessageCircle, {
            className: "w-5 h-5"
          }), /*#__PURE__*/_jsx("span", {
            className: "text-sm font-medium",
            children: "Comment"
          })]
        }), /*#__PURE__*/_jsxs("button", {
          onClick: handleShare,
          className: "linkedin-post-action",
          children: [/*#__PURE__*/_jsx(Repeat2, {
            className: "w-5 h-5"
          }), /*#__PURE__*/_jsx("span", {
            className: "text-sm font-medium",
            children: "Repost"
          })]
        }), /*#__PURE__*/_jsxs("button", {
          className: "linkedin-post-action",
          children: [/*#__PURE__*/_jsx(Send, {
            className: "w-5 h-5"
          }), /*#__PURE__*/_jsx("span", {
            className: "text-sm font-medium",
            children: "Send"
          })]
        })]
      })
    }), showComments && /*#__PURE__*/_jsxs("div", {
      className: "px-3 pb-3 border-t border-[#d9d9d9] mt-2 pt-3",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-start space-x-2 mb-3",
        children: [currentUser && /*#__PURE__*/_jsx(Avatar, {
          name: currentUser.displayName,
          className: "w-8 h-8"
        }), /*#__PURE__*/_jsx("div", {
          className: "flex-1",
          children: /*#__PURE__*/_jsxs("div", {
            className: "flex items-center space-x-2",
            children: [/*#__PURE__*/_jsx("input", {
              type: "text",
              value: newComment,
              onChange: e => setNewComment(e.target.value),
              placeholder: "Add a comment...",
              className: "flex-1 px-3 py-2 border border-[#d9d9d9] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent bg-[#f3f2ef]",
              onKeyPress: e => e.key === 'Enter' && handleComment()
            }), /*#__PURE__*/_jsx("button", {
              onClick: handleComment,
              disabled: !newComment.trim(),
              className: "px-4 py-2 bg-[#0a66c2] text-white rounded-full text-xs font-medium hover:bg-[#004182] transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
              children: "Post"
            })]
          })
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "space-y-3",
        children: post.comments?.map(comment => /*#__PURE__*/_jsxs("div", {
          className: "flex items-start space-x-2",
          children: [/*#__PURE__*/_jsx(Avatar, {
            name: comment.authorName,
            className: "w-8 h-8"
          }), /*#__PURE__*/_jsx("div", {
            className: "flex-1",
            children: /*#__PURE__*/_jsxs("div", {
              className: "bg-[#f3f2ef] rounded-lg px-3 py-2",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-2 mb-1",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "font-semibold text-xs text-[#000000]",
                  children: comment.authorName
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-xs text-[#666666]",
                  children: formatTimestamp(comment.createdAt)
                })]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-[#000000]",
                children: comment.content
              })]
            })
          })]
        }, comment.id))
      })]
    })]
  });
}