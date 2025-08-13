import React, { useState } from 'react';
import { X, AlertCircle, Check } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ProfileUpdateForm({
  onClose,
  initialData
}) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const {
    updateProfile
  } = useProfile();
  const showMessage = (type, text) => {
    setMessage({
      type,
      text
    });
    setTimeout(() => setMessage(null), 3000);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.displayName.trim()) {
      showMessage('error', 'Display name is required.');
      return;
    }
    try {
      setLoading(true);
      await updateProfile(formData);
      showMessage('success', 'Profile updated successfully!');
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsx("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
    children: /*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded-lg max-w-md w-full",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between p-6 border-b border-gray-200",
        children: [/*#__PURE__*/_jsx("h2", {
          className: "text-xl font-semibold text-gray-900",
          children: "Update Profile"
        }), /*#__PURE__*/_jsx("button", {
          onClick: onClose,
          className: "text-gray-500 hover:text-gray-700",
          children: /*#__PURE__*/_jsx(X, {
            className: "w-6 h-6"
          })
        })]
      }), message && /*#__PURE__*/_jsxs("div", {
        className: `mx-6 mt-4 p-3 rounded-lg flex items-center space-x-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`,
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
        className: "p-6 space-y-4",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("label", {
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "Display Name *"
          }), /*#__PURE__*/_jsx("input", {
            type: "text",
            value: formData.displayName,
            onChange: e => setFormData({
              ...formData,
              displayName: e.target.value
            }),
            className: "linkedin-input",
            required: true
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("label", {
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "Headline"
          }), /*#__PURE__*/_jsx("input", {
            type: "text",
            value: formData.headline,
            onChange: e => setFormData({
              ...formData,
              headline: e.target.value
            }),
            placeholder: "e.g., Software Engineer at Tech Company",
            className: "linkedin-input"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("label", {
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "Bio"
          }), /*#__PURE__*/_jsx("textarea", {
            value: formData.bio,
            onChange: e => setFormData({
              ...formData,
              bio: e.target.value
            }),
            rows: 4,
            placeholder: "Tell us about yourself...",
            className: "linkedin-input"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("label", {
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "Location"
          }), /*#__PURE__*/_jsx("input", {
            type: "text",
            value: formData.location,
            onChange: e => setFormData({
              ...formData,
              location: e.target.value
            }),
            placeholder: "e.g., San Francisco, CA",
            className: "linkedin-input"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex space-x-3 pt-4",
          children: [/*#__PURE__*/_jsx("button", {
            type: "button",
            onClick: onClose,
            className: "flex-1 linkedin-btn-secondary",
            children: "Cancel"
          }), /*#__PURE__*/_jsx("button", {
            type: "submit",
            disabled: loading,
            className: "flex-1 linkedin-btn-primary",
            children: loading ? 'Saving...' : 'Save Changes'
          })]
        })]
      })]
    })
  });
}