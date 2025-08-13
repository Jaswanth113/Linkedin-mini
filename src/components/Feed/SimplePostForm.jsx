import React, { useState } from 'react';
import { usePosts } from '../../hooks/usePosts';
import { useAuth } from '../../hooks/useAuth';
import { Send, AlertCircle, Check } from 'lucide-react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export function SimplePostForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const {
    createPost
  } = usePosts();
  const {
    currentUser
  } = useAuth();
  const showMessage = (type, text) => {
    setMessage({
      type,
      text
    });
    setTimeout(() => setMessage(null), 3000);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!content.trim()) {
      showMessage('error', 'Please enter some content');
      return;
    }
    if (!currentUser) {
      showMessage('error', 'You must be logged in to post');
      return;
    }
    try {
      setLoading(true);
      console.log('Attempting to create post with content:', content);
      console.log('Current user:', currentUser);
      await createPost(content);
      setContent('');
      showMessage('success', 'Post created successfully!');
    } catch (error) {
      console.error('Failed to create post:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create post';
      showMessage('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "linkedin-card p-4 mb-4",
    children: [/*#__PURE__*/_jsx("h3", {
      className: "text-lg font-semibold mb-4",
      children: "Create a Simple Post"
    }), message && /*#__PURE__*/_jsxs("div", {
      className: `mb-4 p-3 rounded-lg flex items-center space-x-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`,
      children: [message.type === 'success' ? /*#__PURE__*/_jsx(Check, {
        className: "w-4 h-4"
      }) : /*#__PURE__*/_jsx(AlertCircle, {
        className: "w-4 h-4"
      }), /*#__PURE__*/_jsx("span", {
        className: "text-sm font-medium",
        children: message.text
      })]
    }), /*#__PURE__*/_jsxs("form", {
      onSubmit: handleSubmit,
      children: [/*#__PURE__*/_jsx("textarea", {
        value: content,
        onChange: e => setContent(e.target.value),
        placeholder: "What's on your mind?",
        rows: 3,
        className: "w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent",
        disabled: loading
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex justify-between items-center mt-3",
        children: [/*#__PURE__*/_jsx("div", {
          className: "text-sm text-gray-500",
          children: currentUser ? `Posting as: ${currentUser.displayName || currentUser.email}` : 'Not logged in'
        }), /*#__PURE__*/_jsx("button", {
          type: "submit",
          disabled: loading || !content.trim(),
          className: "linkedin-btn-primary disabled:opacity-50 disabled:cursor-not-allowed",
          children: loading ? 'Posting...' : /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(Send, {
              className: "w-4 h-4 mr-2"
            }), "Post"]
          })
        })]
      })]
    })]
  });
}