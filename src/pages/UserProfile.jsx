import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { usePosts } from '../hooks/usePosts';
import { useProfileViews } from '../hooks/useProfileViews';
import Avatar from '../components/UI/Avatar';
import { PostCard } from '../components/Feed/PostCard';
import { ProfileSectionModal } from '../components/Profile/ProfileSectionModal';
import { Edit, Eye, TrendingUp, ArrowLeft, Plus, Briefcase, Award, FolderOpen, FileText, ExternalLink, GraduationCap } from 'lucide-react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function SectionForm({
  section,
  onSave,
  onClose
}) {
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (section) {
      if (section.type === 'skills') {
        // The skills array is passed directly in section.data
        setFormData({
          skills: (section.data || []).join(', ')
        });
      } else {
        setFormData(section.data || {});
      }
    }
  }, [section]);
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (section.type === 'skills') {
      // For skills, convert the string back to an array and pass it inside an object.
      onSave({
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      });
    } else {
      // For other sections, just pass the form data directly.
      onSave(formData);
    }
  };
  const renderFormFields = () => {
    if (!section) return /*#__PURE__*/_jsx("p", {
      children: "Something went wrong."
    });
    switch (section.type) {
      case 'skills':
        return /*#__PURE__*/_jsx("textarea", {
          name: "skills",
          value: formData.skills || '',
          onChange: handleChange,
          placeholder: "Enter skills, separated by commas",
          className: "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
          rows: 4
        });
      case 'education':
        return /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("input", {
            name: "school",
            value: formData.school || '',
            onChange: handleChange,
            placeholder: "School or University",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "degree",
            value: formData.degree || '',
            onChange: handleChange,
            placeholder: "Degree",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "fieldOfStudy",
            value: formData.fieldOfStudy || '',
            onChange: handleChange,
            placeholder: "Field of Study",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex space-x-4",
            children: [/*#__PURE__*/_jsx("input", {
              name: "startYear",
              value: formData.startYear || '',
              onChange: handleChange,
              placeholder: "Start Year",
              className: "w-full p-2 border border-gray-300 rounded-md"
            }), /*#__PURE__*/_jsx("input", {
              name: "endYear",
              value: formData.endYear || '',
              onChange: handleChange,
              placeholder: "End Year (or expected)",
              className: "w-full p-2 border border-gray-300 rounded-md"
            })]
          })]
        });
      case 'workExperience':
        return /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("input", {
            name: "title",
            value: formData.title || '',
            onChange: handleChange,
            placeholder: "Job Title",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "company",
            value: formData.company || '',
            onChange: handleChange,
            placeholder: "Company",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "location",
            value: formData.location || '',
            onChange: handleChange,
            placeholder: "Location",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex space-x-4",
            children: [/*#__PURE__*/_jsx("input", {
              name: "startDate",
              value: formData.startDate || '',
              onChange: handleChange,
              placeholder: "Start Date",
              className: "w-full p-2 border border-gray-300 rounded-md"
            }), /*#__PURE__*/_jsx("input", {
              name: "endDate",
              value: formData.endDate || '',
              onChange: handleChange,
              placeholder: "End Date (or 'Present')",
              className: "w-full p-2 border border-gray-300 rounded-md"
            })]
          }), /*#__PURE__*/_jsx("textarea", {
            name: "description",
            value: formData.description || '',
            onChange: handleChange,
            placeholder: "Description",
            className: "w-full p-2 border border-gray-300 rounded-md",
            rows: 3
          })]
        });
      case 'projects':
        return /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("input", {
            name: "name",
            value: formData.name || '',
            onChange: handleChange,
            placeholder: "Project Name",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "date",
            value: formData.date || '',
            onChange: handleChange,
            placeholder: "Date (e.g., Jan 2023)",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "url",
            value: formData.url || '',
            onChange: handleChange,
            placeholder: "Project URL",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("textarea", {
            name: "description",
            value: formData.description || '',
            onChange: handleChange,
            placeholder: "Description",
            className: "w-full p-2 border border-gray-300 rounded-md",
            rows: 3
          })]
        });
      case 'certificates':
        return /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("input", {
            name: "name",
            value: formData.name || '',
            onChange: handleChange,
            placeholder: "Certificate Name",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "issuer",
            value: formData.issuer || '',
            onChange: handleChange,
            placeholder: "Issuing Organization",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "date",
            value: formData.date || '',
            onChange: handleChange,
            placeholder: "Issue Date",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "url",
            value: formData.url || '',
            onChange: handleChange,
            placeholder: "Credential URL",
            className: "w-full p-2 border border-gray-300 rounded-md"
          })]
        });
      case 'achievements':
        return /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("input", {
            name: "title",
            value: formData.title || '',
            onChange: handleChange,
            placeholder: "Honor or Award Title",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "issuer",
            value: formData.issuer || '',
            onChange: handleChange,
            placeholder: "Issuer",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("input", {
            name: "date",
            value: formData.date || '',
            onChange: handleChange,
            placeholder: "Date",
            className: "w-full p-2 border border-gray-300 rounded-md"
          }), /*#__PURE__*/_jsx("textarea", {
            name: "description",
            value: formData.description || '',
            onChange: handleChange,
            placeholder: "Description",
            className: "w-full p-2 border border-gray-300 rounded-md",
            rows: 3
          })]
        });
      default:
        return /*#__PURE__*/_jsx("p", {
          children: "Something went wrong."
        });
    }
  };
  return /*#__PURE__*/_jsxs("form", {
    onSubmit: handleSubmit,
    className: "space-y-6",
    children: [renderFormFields(), /*#__PURE__*/_jsxs("div", {
      className: "flex justify-end pt-4 border-t border-gray-200",
      children: [/*#__PURE__*/_jsx("button", {
        type: "button",
        onClick: onClose,
        className: "mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition",
        children: "Cancel"
      }), /*#__PURE__*/_jsx("button", {
        type: "submit",
        className: "px-4 py-2 text-sm font-medium text-white bg-[#0a66c2] rounded-md hover:bg-[#004182] transition",
        children: "Save"
      })]
    })]
  });
}
export function UserProfile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const {
    userId: routeUserId
  } = useParams();
  const {
    currentUser,
    loading: authLoading
  } = useAuth();
  const [userId, setUserId] = useState(undefined);
  useEffect(() => {
    // This effect runs when authentication is complete.
    // It sets the userId for the profile we need to load.
    if (!authLoading) {
      setUserId(routeUserId || currentUser?.id);
    }
  }, [authLoading, routeUserId, currentUser]);

  // The profile hook is enabled only when we have a valid userId.
  const {
    profile,
    loading: profileLoading,
    error,
    updateProfile
  } = useProfile(userId, !!userId);
  const isOwnProfile = !authLoading && !profileLoading && !!currentUser && !!profile && currentUser.id === profile.id;
  const {
    getUserPosts
  } = usePosts();
  const {
    profileViews,
    postImpressions
  } = useProfileViews(userId);
  const [isSectionModalOpen, setSectionModalOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  useEffect(() => {
    // Self-correcting effect: If the user is viewing their own profile
    // and their displayName in the database doesn't match their auth displayName,
    // update the database profile.
    if (isOwnProfile && profile && currentUser?.displayName && profile.displayName !== currentUser.displayName) {
      updateProfile({
        displayName: currentUser.displayName
      });
    }
  }, [isOwnProfile, profile, currentUser, updateProfile]);
  const openSectionModal = (type, data = {}, index) => {
    if (type === 'skills') {
      setCurrentSection({
        type,
        data: profile?.skills || []
      });
    } else {
      setCurrentSection({
        type,
        data,
        index
      });
    }
    setSectionModalOpen(true);
  };
  const closeSectionModal = () => {
    setSectionModalOpen(false);
    setCurrentSection(null);
  };
  const handleProfileFormChange = e => {
    setProfileFormData(prev => prev ? {
      ...prev,
      [e.target.name]: e.target.value
    } : null);
  };
  const handleProfileFormSubmit = async e => {
    e.preventDefault();
    if (profileFormData) {
      await updateProfile(profileFormData);
      setShowEditModal(false);
    }
  };
  const handleSectionSave = async formData => {
    if (!profile || !currentSection) return;
    const {
      type,
      index
    } = currentSection;
    try {
      if (type === 'skills') {
        // Handle skills update
        await updateProfile({
          skills: formData.skills
        });
      } else {
        // Handle updates for arrays of objects (Experience, Education, etc.)
        const currentItems = profile[type] || [];
        let updatedItems;
        if (index !== undefined) {
          // Update an existing item
          updatedItems = [...currentItems];
          updatedItems[index] = {
            ...updatedItems[index],
            ...formData
          };
        } else {
          // Add a new item
          const newItem = {
            id: Date.now().toString(),
            ...formData
          };
          updatedItems = [...currentItems, newItem];
        }
        await updateProfile({
          [type]: updatedItems
        });
      }
      closeSectionModal(); // Close modal on successful save
    } catch (err) {
      console.error('Failed to save section:', err);
      // Optionally: show an error message to the user
    }
  };
  const userPosts = userId ? getUserPosts(userId) : [];

  // Show a loading spinner if we are waiting for auth or for the profile data to load.
  if (authLoading || userId && profileLoading) {
    return /*#__PURE__*/_jsx("div", {
      className: "flex items-center justify-center h-screen",
      children: /*#__PURE__*/_jsx("div", {
        className: "animate-spin rounded-full h-16 w-16 border-b-4 border-[#0a66c2]"
      })
    });
  }
  if (error) {
    return /*#__PURE__*/_jsx("div", {
      className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8",
      children: /*#__PURE__*/_jsxs("div", {
        className: "bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center",
        children: [/*#__PURE__*/_jsx("h2", {
          className: "text-2xl font-semibold text-gray-900 mb-2",
          children: "Error"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-600 mb-6",
          children: error
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/",
          className: "bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold py-3 px-6 rounded-full transition-colors",
          children: [/*#__PURE__*/_jsx(ArrowLeft, {
            className: "w-5 h-5 mr-2 inline"
          }), "Back to Home"]
        })]
      })
    });
  }
  if (!profile) {
    return /*#__PURE__*/_jsx("div", {
      className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8",
      children: /*#__PURE__*/_jsx("div", {
        className: "bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center",
        children: /*#__PURE__*/_jsxs("div", {
          className: "flex flex-col items-center justify-center",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4",
            children: /*#__PURE__*/_jsx("span", {
              className: "text-gray-500 font-bold text-3xl",
              children: "?"
            })
          }), /*#__PURE__*/_jsx("h2", {
            className: "text-2xl font-semibold text-gray-900 mb-2",
            children: "User Not Found"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-gray-600 mb-6",
            children: "This profile could not be loaded."
          }), /*#__PURE__*/_jsxs(Link, {
            to: "/",
            className: "bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold py-3 px-6 rounded-full transition-colors",
            children: [/*#__PURE__*/_jsx(ArrowLeft, {
              className: "w-5 h-5 mr-2 inline"
            }), "Back to Home"]
          })]
        })
      })
    });
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      children: [/*#__PURE__*/_jsx("div", {
        className: "mb-6",
        children: /*#__PURE__*/_jsxs(Link, {
          to: "/",
          className: "inline-flex items-center text-[#0a66c2] hover:text-[#004182] font-medium",
          children: [/*#__PURE__*/_jsx(ArrowLeft, {
            className: "w-5 h-5 mr-2"
          }), "Back to Feed"]
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "linkedin-card overflow-hidden mb-6",
        children: [/*#__PURE__*/_jsx("div", {
          className: "relative h-[200px] bg-gradient-to-r from-[#0a66c2] to-[#004182]",
          children: profile?.coverPhoto && /*#__PURE__*/_jsx("img", {
            src: profile.coverPhoto,
            alt: "Cover",
            className: "w-full h-full object-cover"
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "px-6 pb-6 relative",
          children: [/*#__PURE__*/_jsx("div", {
            className: "relative flex justify-center lg:justify-start -mt-20",
            children: /*#__PURE__*/_jsxs("div", {
              className: "w-[160px] h-[160px] rounded-full border-4 border-white shadow-lg relative",
              children: [/*#__PURE__*/_jsx(Avatar, {
                name: profile.displayName,
                className: "w-full h-full text-6xl"
              }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                onClick: () => openSectionModal('profilePicture', {
                  profilePicture: profile.profilePicture,
                  coverPhoto: profile.coverPhoto
                }),
                className: "absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors",
                children: /*#__PURE__*/_jsx(Edit, {
                  className: "w-4 h-4 text-gray-600"
                })
              })]
            })
          }), /*#__PURE__*/_jsxs("div", {
            className: "text-center lg:text-left pt-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "flex justify-end",
              children: isOwnProfile && /*#__PURE__*/_jsx("button", {
                onClick: () => openSectionModal('profileSummary', {
                  displayName: profile.displayName,
                  headline: profile.headline,
                  location: profile.location,
                  bio: profile.bio
                }),
                className: "p-2 hover:bg-gray-200 rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Edit, {
                  className: "w-5 h-5 text-gray-600"
                })
              })
            }), /*#__PURE__*/_jsx("h1", {
              className: "text-[28px] font-semibold text-[#000000] mb-1",
              children: profile.displayName
            }), /*#__PURE__*/_jsx("p", {
              className: "text-[18px] text-[#666666] mb-2",
              children: profile.headline
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm text-gray-500 mb-4",
              children: profile.location
            }), /*#__PURE__*/_jsx("div", {
              className: "mt-4 flex flex-wrap gap-3",
              children: !isOwnProfile && /*#__PURE__*/_jsxs("div", {
                className: "flex space-x-2",
                children: [/*#__PURE__*/_jsx("button", {
                  className: "linkedin-btn-primary px-6 py-2 flex items-center",
                  children: "Connect"
                }), /*#__PURE__*/_jsx("button", {
                  className: "linkedin-btn-secondary px-6 py-2 flex items-center",
                  children: "Message"
                })]
              })
            })]
          })]
        })]
      }), showEditModal && /*#__PURE__*/_jsx("div", {
        className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4",
        children: /*#__PURE__*/_jsx("div", {
          className: "bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto",
          children: /*#__PURE__*/_jsxs("form", {
            onSubmit: handleProfileFormSubmit,
            className: "p-6",
            children: [/*#__PURE__*/_jsx("h2", {
              className: "text-2xl font-bold mb-6",
              children: "Edit Basic Info"
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-4",
              children: [/*#__PURE__*/_jsx("input", {
                type: "text",
                name: "displayName",
                value: profileFormData?.displayName || '',
                onChange: handleProfileFormChange,
                className: "w-full p-2 border rounded",
                placeholder: "Your Name"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                name: "headline",
                value: profileFormData?.headline || '',
                onChange: handleProfileFormChange,
                className: "w-full p-2 border rounded",
                placeholder: "Your Headline"
              }), /*#__PURE__*/_jsx("textarea", {
                name: "bio",
                value: profileFormData?.bio || '',
                onChange: handleProfileFormChange,
                className: "w-full p-2 border rounded",
                placeholder: "About you"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                name: "location",
                value: profileFormData?.location || '',
                onChange: handleProfileFormChange,
                className: "w-full p-2 border rounded",
                placeholder: "Location"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                name: "website",
                value: profileFormData?.website || '',
                onChange: handleProfileFormChange,
                className: "w-full p-2 border rounded",
                placeholder: "Website URL"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                name: "linkedin",
                value: profileFormData?.linkedin || '',
                onChange: handleProfileFormChange,
                className: "w-full p-2 border rounded",
                placeholder: "LinkedIn Profile URL"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "mt-6 flex justify-end space-x-4",
              children: [/*#__PURE__*/_jsx("button", {
                type: "button",
                onClick: () => setShowEditModal(false),
                className: "px-4 py-2 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200",
                children: "Cancel"
              }), /*#__PURE__*/_jsx("button", {
                type: "submit",
                className: "px-4 py-2 rounded-md bg-[#0a66c2] text-white hover:bg-[#004182]",
                children: "Save"
              })]
            })]
          })
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "lg:col-span-2 space-y-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "About"
              }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                onClick: () => openSectionModal('basic', {
                  bio: profile.bio
                }),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Edit, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-[14px] text-[#000000] leading-[1.4] whitespace-pre-wrap",
              children: profile.bio || 'No bio available.'
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Experience"
              }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                onClick: () => openSectionModal('workExperience'),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: profile.workExperience?.map((exp, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0",
                  children: /*#__PURE__*/_jsx(Briefcase, {
                    className: "w-6 h-6 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between",
                    children: [/*#__PURE__*/_jsx("h3", {
                      className: "text-[16px] font-semibold text-[#000000] mb-1",
                      children: exp.title
                    }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                      onClick: () => openSectionModal('workExperience', exp, index),
                      className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                      children: /*#__PURE__*/_jsx(Edit, {
                        className: "w-4 h-4 text-[#666666]"
                      })
                    })]
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-[14px] text-[#000000] mb-1",
                    children: exp.company
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-[12px] text-[#666666] mb-1",
                    children: [exp.startDate, " - ", exp.endDate || 'Present']
                  }), exp.location && /*#__PURE__*/_jsx("p", {
                    className: "text-[12px] text-[#666666] mb-2",
                    children: exp.location
                  }), exp.description && /*#__PURE__*/_jsx("p", {
                    className: "text-[14px] text-[#000000] leading-[1.4] whitespace-pre-wrap",
                    children: exp.description
                  })]
                })]
              }, exp.id || index))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Education"
              }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                onClick: () => openSectionModal('education'),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: profile.education?.map((edu, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0",
                  children: /*#__PURE__*/_jsx(GraduationCap, {
                    className: "w-6 h-6 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between",
                    children: [/*#__PURE__*/_jsx("h3", {
                      className: "text-[16px] font-semibold text-[#000000] mb-1",
                      children: edu.school
                    }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                      onClick: () => openSectionModal('education', edu, index),
                      className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                      children: /*#__PURE__*/_jsx(Edit, {
                        className: "w-4 h-4 text-[#666666]"
                      })
                    })]
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-[14px] text-[#000000] mb-1",
                    children: [edu.degree, ", ", edu.fieldOfStudy]
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-[12px] text-[#666666] mb-2",
                    children: [edu.startYear, " - ", edu.endYear || 'Present']
                  })]
                })]
              }, edu.id || index))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Projects"
              }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                onClick: () => openSectionModal('projects'),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: profile.projects?.map((proj, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0",
                  children: /*#__PURE__*/_jsx(FolderOpen, {
                    className: "w-6 h-6 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between",
                    children: [/*#__PURE__*/_jsx("h3", {
                      className: "text-[16px] font-semibold text-[#000000] mb-1",
                      children: proj.name
                    }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                      onClick: () => openSectionModal('projects', proj, index),
                      className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                      children: /*#__PURE__*/_jsx(Edit, {
                        className: "w-4 h-4 text-[#666666]"
                      })
                    })]
                  }), proj.date && /*#__PURE__*/_jsx("p", {
                    className: "text-[12px] text-[#666666] mb-2",
                    children: proj.date
                  }), proj.description && /*#__PURE__*/_jsx("p", {
                    className: "text-[14px] text-[#000000] leading-[1.4] whitespace-pre-wrap mb-2",
                    children: proj.description
                  }), proj.url && /*#__PURE__*/_jsxs("a", {
                    href: proj.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-[14px] text-[#0a66c2] hover:underline font-medium flex items-center",
                    children: ["View Project ", /*#__PURE__*/_jsx(ExternalLink, {
                      className: "w-4 h-4 ml-1"
                    })]
                  })]
                })]
              }, proj.id || index))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Licenses & Certifications"
              }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                onClick: () => openSectionModal('certificates'),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: profile.certificates?.map((cert, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0",
                  children: /*#__PURE__*/_jsx(FileText, {
                    className: "w-6 h-6 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between",
                    children: [/*#__PURE__*/_jsx("h3", {
                      className: "text-[16px] font-semibold text-[#000000] mb-1",
                      children: cert.name
                    }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                      onClick: () => openSectionModal('certificates', cert, index),
                      className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                      children: /*#__PURE__*/_jsx(Edit, {
                        className: "w-4 h-4 text-[#666666]"
                      })
                    })]
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-[14px] text-[#000000] mb-1",
                    children: cert.issuer
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-[12px] text-[#666666] mb-2",
                    children: ["Issued ", cert.date]
                  }), cert.url && /*#__PURE__*/_jsxs("a", {
                    href: cert.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-[14px] text-[#0a66c2] hover:underline font-medium flex items-center",
                    children: ["Show credential ", /*#__PURE__*/_jsx(ExternalLink, {
                      className: "w-4 h-4 ml-1"
                    })]
                  })]
                })]
              }, cert.id || index))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Skills & Languages"
              }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                onClick: () => openSectionModal('skills'),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Edit, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-[16px] font-semibold text-[#000000] mb-3",
                children: "Skills"
              }), /*#__PURE__*/_jsx("div", {
                className: "flex flex-wrap gap-2",
                children: profile.skills?.map(skill => /*#__PURE__*/_jsx("span", {
                  className: "bg-[#eef3f8] text-[#0a66c2] rounded-full px-3 py-1 text-[14px] font-medium",
                  children: skill
                }, skill))
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "mt-6",
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-[16px] font-semibold text-[#000000] mb-3",
                children: "Languages"
              }), /*#__PURE__*/_jsx("div", {
                className: "flex flex-wrap gap-2",
                children: profile.languages?.map(lang => /*#__PURE__*/_jsx("span", {
                  className: "bg-[#eef3f8] text-[#0a66c2] rounded-full px-3 py-1 text-[14px] font-medium",
                  children: lang
                }, lang))
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Honors & Awards"
              }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                onClick: () => openSectionModal('achievements'),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: profile.achievements?.map((ach, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0",
                  children: /*#__PURE__*/_jsx(Award, {
                    className: "w-6 h-6 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between",
                    children: [/*#__PURE__*/_jsx("h3", {
                      className: "text-[16px] font-semibold text-[#000000] mb-1",
                      children: ach.title
                    }), isOwnProfile && /*#__PURE__*/_jsx("button", {
                      onClick: () => openSectionModal('achievements', ach, index),
                      className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                      children: /*#__PURE__*/_jsx(Edit, {
                        className: "w-4 h-4 text-[#666666]"
                      })
                    })]
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-[14px] text-[#000000] mb-1",
                    children: ["Issued by ", ach.issuer]
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-[12px] text-[#666666] mb-2",
                    children: ["Issued on ", ach.date]
                  }), ach.description && /*#__PURE__*/_jsx("p", {
                    className: "text-[14px] text-[#000000] leading-[1.4] whitespace-pre-wrap",
                    children: ach.description
                  })]
                })]
              }, ach.id || index))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsx("h2", {
              className: "text-[20px] font-semibold text-[#000000] mb-4",
              children: "Posts"
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: userPosts.length > 0 ? userPosts.map(post => /*#__PURE__*/_jsx(PostCard, {
                post: post
              }, post.id)) : /*#__PURE__*/_jsx("p", {
                className: "text-gray-500",
                children: "This user hasn't posted anything yet."
              })
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "lg:col-span-1 space-y-6",
          children: isOwnProfile && /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsx("h2", {
              className: "text-[20px] font-semibold text-[#000000] mb-4",
              children: "Analytics"
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-4",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center text-gray-700",
                children: [/*#__PURE__*/_jsx(Eye, {
                  className: "w-5 h-5 mr-3 text-[#666666]"
                }), /*#__PURE__*/_jsx("span", {
                  className: "font-semibold",
                  children: profileViews
                }), /*#__PURE__*/_jsx("span", {
                  className: "ml-2",
                  children: "profile views"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center text-gray-700",
                children: [/*#__PURE__*/_jsx(TrendingUp, {
                  className: "w-5 h-5 mr-3 text-[#666666]"
                }), /*#__PURE__*/_jsx("span", {
                  className: "font-semibold",
                  children: postImpressions
                }), /*#__PURE__*/_jsx("span", {
                  className: "ml-2",
                  children: "post impressions"
                })]
              })]
            })]
          })
        })]
      }), /*#__PURE__*/_jsx(ProfileSectionModal, {
        isOpen: isSectionModalOpen,
        onClose: closeSectionModal,
        title: currentSection ? `${currentSection.index !== undefined ? 'Edit' : 'Add'} ${currentSection.type.charAt(0).toUpperCase() + currentSection.type.slice(1)}` : '',
        children: currentSection && /*#__PURE__*/_jsx(SectionForm, {
          section: currentSection,
          onSave: handleSectionSave,
          onClose: closeSectionModal
        })
      })]
    })
  });
}