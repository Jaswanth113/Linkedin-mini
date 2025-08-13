import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      setTimeout(() => {
        navigate('/', {
          replace: true
        });
      }, 100);
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
      setLoading(false);
    }
  }
  return /*#__PURE__*/_jsx("div", {
    className: "min-h-screen bg-[#f3f2ef] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8",
    children: /*#__PURE__*/_jsxs("div", {
      className: "max-w-md w-full",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "text-center mb-8",
        children: [/*#__PURE__*/_jsx("div", {
          className: "flex justify-center mb-6",
          children: /*#__PURE__*/_jsx("div", {
            className: "w-12 h-12 bg-[#0a66c2] rounded flex items-center justify-center",
            children: /*#__PURE__*/_jsx("span", {
              className: "text-white font-bold text-2xl",
              children: "in"
            })
          })
        }), /*#__PURE__*/_jsx("h1", {
          className: "text-3xl font-light text-[#000000] mb-2",
          children: "Sign in"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-base text-[#000000]",
          children: "Stay updated on your professional world"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "linkedin-card p-6",
        children: [/*#__PURE__*/_jsxs("form", {
          onSubmit: handleSubmit,
          className: "space-y-6",
          children: [error && /*#__PURE__*/_jsx("div", {
            className: "bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm",
            children: error
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                htmlFor: "email",
                className: "linkedin-form-label",
                children: "Email or phone"
              }), /*#__PURE__*/_jsx("input", {
                id: "email",
                name: "email",
                type: "email",
                required: true,
                value: email,
                onChange: e => setEmail(e.target.value),
                className: "linkedin-input h-12",
                placeholder: "Email or phone"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                htmlFor: "password",
                className: "linkedin-form-label",
                children: "Password"
              }), /*#__PURE__*/_jsxs("div", {
                className: "relative",
                children: [/*#__PURE__*/_jsx("input", {
                  id: "password",
                  name: "password",
                  type: showPassword ? 'text' : 'password',
                  required: true,
                  value: password,
                  onChange: e => setPassword(e.target.value),
                  className: "linkedin-input h-12 pr-10",
                  placeholder: "Password"
                }), /*#__PURE__*/_jsx("button", {
                  type: "button",
                  className: "absolute inset-y-0 right-0 pr-3 flex items-center",
                  onClick: () => setShowPassword(!showPassword),
                  children: showPassword ? /*#__PURE__*/_jsx(EyeOff, {
                    className: "h-5 w-5 text-[#666666]"
                  }) : /*#__PURE__*/_jsx(Eye, {
                    className: "h-5 w-5 text-[#666666]"
                  })
                })]
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "text-sm",
            children: /*#__PURE__*/_jsx("a", {
              href: "#",
              className: "font-medium text-[#0a66c2] hover:text-[#004182]",
              children: "Forgot password?"
            })
          }), /*#__PURE__*/_jsx("button", {
            type: "submit",
            disabled: loading,
            className: "w-full linkedin-btn-primary h-12 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed",
            children: loading ? 'Signing in...' : 'Sign in'
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "mt-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative",
            children: [/*#__PURE__*/_jsx("div", {
              className: "absolute inset-0 flex items-center",
              children: /*#__PURE__*/_jsx("div", {
                className: "w-full border-t border-[#d9d9d9]"
              })
            }), /*#__PURE__*/_jsx("div", {
              className: "relative flex justify-center text-sm",
              children: /*#__PURE__*/_jsx("span", {
                className: "px-2 bg-white text-[#666666]",
                children: "or"
              })
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "mt-6 text-center",
            children: /*#__PURE__*/_jsxs("p", {
              className: "text-base text-[#000000]",
              children: ["New to LinkedIn?", ' ', /*#__PURE__*/_jsx(Link, {
                to: "/signup",
                className: "font-medium text-[#0a66c2] hover:text-[#004182]",
                children: "Join now"
              })]
            })
          })]
        })]
      })]
    })
  });
}