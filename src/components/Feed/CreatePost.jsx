import React, { useState } from 'react';
import { BarChart3, Smile, TrendingUp, MessageSquare } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import { Toast } from '../UI/Toast';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function CreatePost() {
  const [content, setContent] = useState('');
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const {
    createPost
  } = usePosts();
  const {
    currentUser
  } = useAuth();
  const {
    profile,
    loading: profileLoading
  } = useProfile(currentUser?.id);
  const showToast = (type, message) => {
    setToast({
      type,
      message
    });
  };
  const handleOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };
  const addOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, '']);
    }
  };
  const removeOption = index => {
    if (pollOptions.length > 2) {
      const newOptions = [...pollOptions];
      newOptions.splice(index, 1);
      setPollOptions(newOptions);
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) {
      showToast('error', 'Please add some content to your post.');
      return;
    }
    let pollData = undefined;
    if (showPollCreator) {
      if (!pollQuestion.trim() || pollOptions.some(opt => !opt.trim()) || pollOptions.length < 2) {
        showToast('error', 'Please fill out the poll question and at least two options.');
        return;
      }
      pollData = {
        question: pollQuestion,
        options: pollOptions.map((option, index) => ({
          id: `option-${index + 1}`,
          text: option,
          votes: []
        }))
      };
    }
    try {
      setLoading(true);
      await createPost(content, pollData);
      setContent('');
      setPollQuestion('');
      setPollOptions(['', '']);
      setShowPollCreator(false);
      showToast('success', 'Post created successfully!');
    } catch (error) {
      console.error('Failed to create post:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create post. Please try again.';
      showToast('error', errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Don't render if profile is still loading
  if (profileLoading) {
    return /*#__PURE__*/_jsx("div", {
      className: "linkedin-card p-4 mb-2",
      children: /*#__PURE__*/_jsx("div", {
        className: "animate-pulse",
        children: /*#__PURE__*/_jsxs("div", {
          className: "flex items-start space-x-3 mb-4",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-12 h-12 bg-gray-300 rounded-full"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex-1",
            children: [/*#__PURE__*/_jsx("div", {
              className: "h-12 bg-gray-300 rounded-full mb-3"
            }), /*#__PURE__*/_jsx("div", {
              className: "h-8 bg-gray-300 rounded"
            })]
          })]
        })
      })
    });
  }
  return /*#__PURE__*/_jsxs("div", {
    className: "linkedin-card mb-2",
    children: [toast && /*#__PURE__*/_jsx(Toast, {
      type: toast.type,
      message: toast.message,
      onClose: () => setToast(null)
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-4",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-start space-x-3",
        children: [/*#__PURE__*/_jsx("div", {
          className: "w-12 h-12 bg-[#0a66c2] rounded-full flex items-center justify-center flex-shrink-0",
          children: profile?.profilePicture ? /*#__PURE__*/_jsx("img", {
            src: profile.profilePicture,
            alt: profile.displayName || 'User profile',
            className: "w-12 h-12 rounded-full object-cover"
          }) : /*#__PURE__*/_jsx("span", {
            className: "text-white font-semibold text-lg",
            children: profile?.displayName?.charAt(0) || 'U'
          })
        }), /*#__PURE__*/_jsx("div", {
          className: "flex-1",
          children: /*#__PURE__*/_jsxs("form", {
            onSubmit: handleSubmit,
            children: [/*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx("textarea", {
                value: content,
                onChange: e => setContent(e.target.value),
                placeholder: "What do you want to talk about?",
                rows: 3,
                className: "w-full p-3 border border-[#d9d9d9] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-[#0a66c2] bg-white text-[#000000] placeholder-[#666666] text-sm",
                disabled: loading
              }), content.length > 0 && /*#__PURE__*/_jsx("div", {
                className: "absolute bottom-2 right-2",
                children: /*#__PURE__*/_jsx(Smile, {
                  className: "w-5 h-5 text-[#666666] cursor-pointer hover:text-[#0a66c2]"
                })
              })]
            }), showPollCreator && /*#__PURE__*/_jsxs("div", {
              className: "mt-4 space-y-3 p-3 border border-[#d9d9d9] rounded-lg bg-gray-50",
              children: [/*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Poll question",
                value: pollQuestion,
                onChange: e => setPollQuestion(e.target.value),
                className: "w-full p-2 border border-[#d9d9d9] rounded-md text-sm"
              }), pollOptions.map((option, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-2",
                children: [/*#__PURE__*/_jsx("input", {
                  type: "text",
                  placeholder: `Option ${index + 1}`,
                  value: option,
                  onChange: e => handleOptionChange(index, e.target.value),
                  className: "w-full p-2 border border-[#d9d9d9] rounded-md text-sm"
                }), pollOptions.length > 2 && /*#__PURE__*/_jsx("button", {
                  type: "button",
                  onClick: () => removeOption(index),
                  className: "text-gray-400 hover:text-gray-600",
                  children: "\xD7"
                })]
              }, index)), pollOptions.length < 4 && /*#__PURE__*/_jsx("button", {
                type: "button",
                onClick: addOption,
                className: "text-sm text-[#0a66c2] font-medium",
                children: "Add option"
              })]
            })]
          })
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between mt-4 pt-3 border-t border-[#d9d9d9]",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center space-x-1",
          children: [/*#__PURE__*/_jsxs("button", {
            type: "button",
            onClick: () => setShowPollCreator(!showPollCreator),
            className: `flex items-center space-x-2 text-[#666666] hover:bg-[#f3f2ef] px-3 py-2 rounded transition-colors ${showPollCreator ? 'bg-blue-100' : ''}`,
            disabled: loading,
            title: "Create a poll",
            children: [/*#__PURE__*/_jsx(BarChart3, {
              className: "w-5 h-5 text-[#378fe9]"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-sm font-medium hidden sm:inline",
              children: "Poll"
            })]
          }), /*#__PURE__*/_jsxs("button", {
            type: "button",
            className: "flex items-center space-x-2 text-[#666666] hover:bg-[#f3f2ef] px-3 py-2 rounded transition-colors",
            disabled: loading,
            title: "Add trending topic",
            children: [/*#__PURE__*/_jsx(TrendingUp, {
              className: "w-5 h-5 text-[#5f9b41]"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-sm font-medium hidden sm:inline",
              children: "Trending"
            })]
          }), /*#__PURE__*/_jsxs("button", {
            type: "button",
            className: "flex items-center space-x-2 text-[#666666] hover:bg-[#f3f2ef] px-3 py-2 rounded transition-colors",
            disabled: loading,
            title: "Ask a question",
            children: [/*#__PURE__*/_jsx(MessageSquare, {
              className: "w-5 h-5 text-[#c37d16]"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-sm font-medium hidden sm:inline",
              children: "Question"
            })]
          })]
        }), /*#__PURE__*/_jsx("button", {
          type: "submit",
          onClick: handleSubmit,
          disabled: loading || !content.trim(),
          className: "linkedin-btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm px-6 py-2",
          children: loading ? 'Posting...' : 'Post'
        })]
      })]
    })]
  });
}