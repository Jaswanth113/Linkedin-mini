import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Home, Users, Briefcase, MessageCircle, Bell, User, ChevronDown, Grid3X3 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Header() {
  const {
    currentUser,
    logout
  } = useAuth();
  const {
    profile,
    loading: profileLoading
  } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };
  const handleSearch = e => {
    e.preventDefault();
    // TODO: Implement search functionality
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Don't render header if user is not authenticated
  if (!currentUser) {
    return null;
  }
  const isActive = path => location.pathname === path;
  return /*#__PURE__*/_jsx("header", {
    className: "bg-white border-b border-[#d9d9d9] sticky top-0 z-50",
    children: /*#__PURE__*/_jsx("div", {
      className: "max-w-[1128px] mx-auto px-6",
      children: /*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between h-[52px]",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center space-x-2 flex-1",
          children: [/*#__PURE__*/_jsx(Link, {
            to: "/",
            className: "flex-shrink-0 mr-2",
            children: /*#__PURE__*/_jsx("div", {
              className: "flex items-center",
              children: /*#__PURE__*/_jsx("div", {
                className: "w-8 h-8 bg-[#0a66c2] rounded flex items-center justify-center",
                children: /*#__PURE__*/_jsx("span", {
                  className: "text-white font-bold text-lg",
                  children: "in"
                })
              })
            })
          }), /*#__PURE__*/_jsx("div", {
            className: "hidden md:flex flex-1 max-w-[280px]",
            children: /*#__PURE__*/_jsx("form", {
              onSubmit: handleSearch,
              className: "w-full",
              children: /*#__PURE__*/_jsxs("div", {
                className: "relative",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                  children: /*#__PURE__*/_jsx(Search, {
                    className: "h-4 w-4 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsx("input", {
                  type: "text",
                  value: searchQuery,
                  onChange: e => setSearchQuery(e.target.value),
                  placeholder: "Search",
                  className: "block w-full pl-10 pr-3 py-2 border-0 rounded-sm leading-5 bg-[#edf3f8] placeholder-[#666666] focus:outline-none focus:placeholder-[#999999] focus:ring-1 focus:ring-[#0a66c2] focus:bg-white text-sm h-[34px]"
                })]
              })
            })
          })]
        }), /*#__PURE__*/_jsxs("nav", {
          className: "flex items-center mx-4",
          children: [/*#__PURE__*/_jsxs(Link, {
            to: "/",
            className: `linkedin-nav-item ${isActive('/') ? 'active' : ''}`,
            children: [/*#__PURE__*/_jsx(Home, {
              className: "h-6 w-6 mb-1"
            }), /*#__PURE__*/_jsx("span", {
              children: "Home"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-nav-item relative",
            children: [/*#__PURE__*/_jsx(Users, {
              className: "h-6 w-6 mb-1"
            }), /*#__PURE__*/_jsx("span", {
              children: "My Network"
            }), /*#__PURE__*/_jsx("div", {
              className: "absolute -top-1 -right-1 w-2 h-2 bg-[#0a66c2] rounded-full"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-nav-item",
            children: [/*#__PURE__*/_jsx(Briefcase, {
              className: "h-6 w-6 mb-1"
            }), /*#__PURE__*/_jsx("span", {
              children: "Jobs"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-nav-item relative",
            children: [/*#__PURE__*/_jsx(MessageCircle, {
              className: "h-6 w-6 mb-1"
            }), /*#__PURE__*/_jsx("span", {
              children: "Messaging"
            }), /*#__PURE__*/_jsx("div", {
              className: "absolute -top-1 -right-1 w-2 h-2 bg-[#0a66c2] rounded-full"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-nav-item relative",
            children: [/*#__PURE__*/_jsx(Bell, {
              className: "h-6 w-6 mb-1"
            }), /*#__PURE__*/_jsx("span", {
              children: "Notifications"
            }), /*#__PURE__*/_jsx("div", {
              className: "absolute -top-1 -right-1 w-2 h-2 bg-[#0a66c2] rounded-full"
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center space-x-2",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative",
            ref: dropdownRef,
            children: [/*#__PURE__*/_jsxs("button", {
              onClick: () => setShowProfileDropdown(!showProfileDropdown),
              className: `linkedin-nav-item ${isActive('/profile') ? 'active' : ''}`,
              children: [/*#__PURE__*/_jsx("div", {
                className: "w-6 h-6 bg-[#0a66c2] rounded-full flex items-center justify-center mb-1",
                children: profile && !profileLoading && profile.profilePicture ? /*#__PURE__*/_jsx("img", {
                  src: profile.profilePicture,
                  alt: profile.displayName,
                  className: "w-6 h-6 rounded-full object-cover"
                }) : /*#__PURE__*/_jsx(User, {
                  className: "h-3 w-3 text-white"
                })
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "mr-1",
                  children: "Me"
                }), /*#__PURE__*/_jsx(ChevronDown, {
                  className: "h-3 w-3"
                })]
              })]
            }), showProfileDropdown && /*#__PURE__*/_jsxs("div", {
              className: "absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-linkedin border border-[#d9d9d9] py-2 z-50 animate-in",
              children: [/*#__PURE__*/_jsx("div", {
                className: "px-4 py-3 border-b border-[#d9d9d9]",
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center space-x-3",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "w-12 h-12 bg-[#0a66c2] rounded-full flex items-center justify-center",
                    children: profile && !profileLoading && profile.profilePicture ? /*#__PURE__*/_jsx("img", {
                      src: profile.profilePicture,
                      alt: profile.displayName,
                      className: "w-12 h-12 rounded-full object-cover"
                    }) : /*#__PURE__*/_jsx(User, {
                      className: "h-6 w-6 text-white"
                    })
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [/*#__PURE__*/_jsx("p", {
                      className: "text-sm font-semibold text-[#000000] truncate",
                      children: profile?.displayName || 'User'
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-xs text-[#666666] truncate",
                      children: profile?.headline || 'Professional'
                    })]
                  })]
                })
              }), /*#__PURE__*/_jsx(Link, {
                to: "/profile",
                className: "block px-4 py-2 text-sm text-[#000000] hover:bg-[#f3f2ef] transition-colors",
                onClick: () => setShowProfileDropdown(false),
                children: "View Profile"
              }), /*#__PURE__*/_jsx("div", {
                className: "border-t border-[#d9d9d9] my-1"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => {
                  setShowProfileDropdown(false);
                  handleLogout();
                },
                className: "block w-full text-left px-4 py-2 text-sm text-[#000000] hover:bg-[#f3f2ef] transition-colors",
                children: "Sign Out"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-nav-item",
            children: [/*#__PURE__*/_jsx(Grid3X3, {
              className: "h-6 w-6 mb-1"
            }), /*#__PURE__*/_jsx("span", {
              children: "Work"
            })]
          })]
        })]
      })
    })
  });
}