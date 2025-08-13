import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useProfileViews } from '../hooks/useProfileViews';
import Avatar from '../components/UI/Avatar';
import { ProfileEditor } from '../components/Profile/ProfileEditor';
import { ProfileUpdateForm } from '../components/Profile/ProfileUpdateForm';
import { Edit, MapPin, Building, GraduationCap, Award, FolderOpen, FileText, Eye, ExternalLink, Plus, Camera } from 'lucide-react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export function Profile() {
  const {
    currentUser,
    loading: authLoading
  } = useAuth();
  const {
    profile,
    loading: profileLoading
  } = useProfile(currentUser?.id, !!currentUser?.id);
  const {
    profileViews
  } = useProfileViews(currentUser?.id);
  const [showEditor, setShowEditor] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  if (authLoading || profileLoading) {
    return /*#__PURE__*/_jsx("div", {
      className: "flex items-center justify-center h-screen",
      children: /*#__PURE__*/_jsx("div", {
        className: "animate-spin rounded-full h-16 w-16 border-b-4 border-[#0a66c2]"
      })
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "max-w-[1128px] mx-auto px-6",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "linkedin-card overflow-hidden mb-6",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "relative h-[200px] bg-gradient-to-r from-[#0a66c2] to-[#004182]",
          children: [profile?.coverPhoto && /*#__PURE__*/_jsx("img", {
            src: profile.coverPhoto,
            alt: "Cover",
            className: "w-full h-full object-cover"
          }), /*#__PURE__*/_jsx("button", {
            className: "absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all",
            children: /*#__PURE__*/_jsx(Camera, {
              className: "w-4 h-4 text-[#666666]"
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "px-6 pb-6 relative",
          children: [/*#__PURE__*/_jsx("div", {
            className: "relative flex justify-center lg:justify-start -mt-20",
            children: /*#__PURE__*/_jsxs("div", {
              className: "w-[160px] h-[160px] rounded-full border-4 border-white shadow-lg relative",
              children: [/*#__PURE__*/_jsx(Avatar, {
                name: profile?.displayName,
                className: "w-full h-full text-6xl"
              }), /*#__PURE__*/_jsx("button", {
                className: "absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors",
                children: /*#__PURE__*/_jsx(Camera, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            })
          }), /*#__PURE__*/_jsxs("div", {
            className: "text-center lg:text-left pt-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "flex justify-end",
              children: /*#__PURE__*/_jsx("button", {
                onClick: () => setShowUpdateForm(true),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Edit, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })
            }), /*#__PURE__*/_jsx("h1", {
              className: "text-[28px] font-semibold text-[#000000] mb-1",
              children: profile?.displayName || 'User'
            }), /*#__PURE__*/_jsx("p", {
              className: "text-[18px] text-[#666666] mb-2",
              children: profile?.headline || 'Software Engineer'
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[14px] text-[#666666]",
              children: [profile?.location && /*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-1",
                children: [/*#__PURE__*/_jsx(MapPin, {
                  className: "w-4 h-4"
                }), /*#__PURE__*/_jsx("span", {
                  children: profile.location
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-1",
                children: [/*#__PURE__*/_jsx(Eye, {
                  className: "w-4 h-4"
                }), /*#__PURE__*/_jsxs("span", {
                  className: "text-[#0a66c2] font-medium hover:underline cursor-pointer",
                  children: [profileViews, " profile views"]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "flex items-center space-x-1",
                children: /*#__PURE__*/_jsx("span", {
                  className: "text-[#0a66c2] font-medium hover:underline cursor-pointer",
                  children: "500+ connections"
                })
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex flex-wrap gap-3 mt-4",
              children: [/*#__PURE__*/_jsx("button", {
                className: "linkedin-btn-primary text-[14px] px-6 py-2 flex items-center space-x-2",
                children: /*#__PURE__*/_jsx("span", {
                  children: "Open to"
                })
              }), /*#__PURE__*/_jsx("button", {
                className: "linkedin-btn-secondary text-[14px] px-6 py-2 flex items-center space-x-2",
                children: /*#__PURE__*/_jsx("span", {
                  children: "Add profile section"
                })
              })]
            })]
          })]
        })]
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
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowEditor(true),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), profile?.bio ? /*#__PURE__*/_jsx("p", {
              className: "text-[14px] text-[#000000] leading-[1.6] whitespace-pre-wrap",
              children: profile.bio
            }) : /*#__PURE__*/_jsxs("div", {
              className: "text-center py-6",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-[14px] text-[#666666] mb-3",
                children: "Add a summary to highlight your personality or work experience"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowEditor(true),
                className: "linkedin-btn-secondary text-sm",
                children: "Add summary"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Experience"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowEditor(true),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), profile?.workExperience && profile.workExperience.length > 0 ? /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: profile.workExperience.map((exp, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0",
                  children: /*#__PURE__*/_jsx(Building, {
                    className: "w-6 h-6 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsx("h3", {
                    className: "text-[16px] font-semibold text-[#000000] mb-1",
                    children: exp.title
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
              }, index))
            }) : /*#__PURE__*/_jsx("p", {
              className: "text-[14px] text-[#666666]",
              children: "Show your experience to help others get to know you better"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Education"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowEditor(true),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), profile?.education && profile.education.length > 0 ? /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: profile.education.map((edu, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0",
                  children: /*#__PURE__*/_jsx(GraduationCap, {
                    className: "w-6 h-6 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsx("h3", {
                    className: "text-[16px] font-semibold text-[#000000] mb-1",
                    children: edu.school
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-[14px] text-[#000000] mb-1",
                    children: edu.degree
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-[12px] text-[#666666]",
                    children: [edu.startYear, " - ", edu.endYear || 'Present']
                  })]
                })]
              }, index))
            }) : /*#__PURE__*/_jsx("p", {
              className: "text-[14px] text-[#666666]",
              children: "Add your education to help others discover you"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Skills"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowEditor(true),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), profile?.skills && profile.skills.length > 0 ? /*#__PURE__*/_jsxs("div", {
              className: "flex flex-wrap gap-2",
              children: [profile.skills.slice(0, 15).map((skill, index) => /*#__PURE__*/_jsx("span", {
                className: "linkedin-skill-tag",
                children: skill
              }, index)), profile.skills.length > 15 && /*#__PURE__*/_jsxs("button", {
                className: "text-[14px] text-[#666666] hover:text-[#0a66c2] font-medium",
                children: ["Show all ", profile.skills.length, " skills"]
              })]
            }) : /*#__PURE__*/_jsx("p", {
              className: "text-[14px] text-[#666666]",
              children: "Add skills to showcase your expertise"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Achievements"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowEditor(true),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), profile?.achievements && profile.achievements.length > 0 ? /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: profile.achievements.map((ach, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0",
                  children: /*#__PURE__*/_jsx(Award, {
                    className: "w-6 h-6 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsx("h3", {
                    className: "text-[16px] font-semibold text-[#000000] mb-1",
                    children: ach.title
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-[14px] text-[#000000] mb-1",
                    children: ["Issued by ", ach.issuer]
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-[12px] text-[#666666]",
                    children: ach.date
                  }), ach.description && /*#__PURE__*/_jsx("p", {
                    className: "text-[14px] text-[#000000] mt-2 leading-[1.4]",
                    children: ach.description
                  })]
                })]
              }, index))
            }) : /*#__PURE__*/_jsx("p", {
              className: "text-[14px] text-[#666666]",
              children: "Showcase your awards, honors, and other achievements."
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Projects"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowEditor(true),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), profile?.projects && profile.projects.length > 0 ? /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: profile.projects.map((proj, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0",
                  children: /*#__PURE__*/_jsx(FolderOpen, {
                    className: "w-6 h-6 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsx("h3", {
                    className: "text-[16px] font-semibold text-[#000000] mb-1",
                    children: proj.name
                  }), proj.date && /*#__PURE__*/_jsx("p", {
                    className: "text-[12px] text-[#666666] mb-2",
                    children: proj.date
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-[14px] text-[#000000] leading-[1.4] mb-3",
                    children: proj.description
                  }), proj.technologies && /*#__PURE__*/_jsx("div", {
                    className: "flex flex-wrap gap-2 mb-3",
                    children: proj.technologies.map(tech => /*#__PURE__*/_jsx("span", {
                      className: "linkedin-skill-tag text-xs",
                      children: tech
                    }, tech))
                  }), proj.url && /*#__PURE__*/_jsxs("a", {
                    href: proj.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-[#0a66c2] font-medium text-[14px] hover:underline flex items-center",
                    children: ["Show Project ", /*#__PURE__*/_jsx(ExternalLink, {
                      className: "w-4 h-4 ml-1"
                    })]
                  })]
                })]
              }, index))
            }) : /*#__PURE__*/_jsx("p", {
              className: "text-[14px] text-[#666666]",
              children: "Add projects to highlight your practical experience."
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-[20px] font-semibold text-[#000000]",
                children: "Licenses & Certifications"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowEditor(true),
                className: "p-2 hover:bg-[#f3f2ef] rounded-full transition-colors",
                children: /*#__PURE__*/_jsx(Plus, {
                  className: "w-4 h-4 text-[#666666]"
                })
              })]
            }), profile?.certificates && profile.certificates.length > 0 ? /*#__PURE__*/_jsx("div", {
              className: "space-y-6",
              children: profile.certificates.map((cert, index) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0",
                  children: /*#__PURE__*/_jsx(FileText, {
                    className: "w-6 h-6 text-[#666666]"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsx("h3", {
                    className: "text-[16px] font-semibold text-[#000000] mb-1",
                    children: cert.name
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-[14px] text-[#000000] mb-1",
                    children: cert.issuer
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-[12px] text-[#666666]",
                    children: ["Issued ", cert.date]
                  }), cert.url && /*#__PURE__*/_jsxs("a", {
                    href: cert.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-[#0a66c2] font-medium text-[14px] hover:underline flex items-center mt-2",
                    children: ["Show credential ", /*#__PURE__*/_jsx(ExternalLink, {
                      className: "w-4 h-4 ml-1"
                    })]
                  })]
                })]
              }, index))
            }) : /*#__PURE__*/_jsx("p", {
              className: "text-[14px] text-[#666666]",
              children: "Add your professional licenses and certifications."
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "lg:col-span-1 space-y-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsx("h2", {
              className: "text-[20px] font-semibold text-[#000000] mb-4",
              children: "People Also Viewed"
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-4",
              children: [1, 2, 3, 4].map(i => /*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsxs("h4", {
                    className: "font-semibold text-sm",
                    children: ["User Name ", i]
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-xs text-gray-500",
                    children: ["User Headline ", i]
                  })]
                })]
              }, i))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "linkedin-card p-6",
            children: [/*#__PURE__*/_jsx("h2", {
              className: "text-[20px] font-semibold text-[#000000] mb-4",
              children: "People You May Know"
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-4",
              children: [1, 2, 3, 4].map(i => /*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsxs("h4", {
                    className: "font-semibold text-sm",
                    children: ["Potential Connection ", i]
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-gray-500",
                    children: "Mutual Connections"
                  }), /*#__PURE__*/_jsx("button", {
                    className: "linkedin-btn-secondary text-xs mt-1 px-3 py-1",
                    children: "Connect"
                  })]
                })]
              }, i))
            })]
          })]
        })]
      })]
    }), showEditor && /*#__PURE__*/_jsx(ProfileEditor, {
      profile: profile,
      onClose: () => setShowEditor(false)
    }), showUpdateForm && /*#__PURE__*/_jsx(ProfileUpdateForm, {
      onClose: () => setShowUpdateForm(false),
      initialData: {
        displayName: profile?.displayName || '',
        headline: profile?.headline || '',
        bio: profile?.bio || '',
        location: profile?.location || ''
      }
    })]
  });
}