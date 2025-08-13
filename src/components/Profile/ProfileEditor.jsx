import { useState, useRef, useEffect } from 'react';
import { Camera, X, Trash2, Check, AlertCircle, Search } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AVAILABLE_SKILLS = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'Go', 'Ruby', 'Ruby on Rails', 'PHP', 'Laravel', 'C#', '.NET', 'Swift', 'Kotlin', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'AWS', 'Docker', 'Kubernetes', 'Git', 'Agile Methodologies', 'Scrum'];
const AVAILABLE_LANGUAGES = ['English', 'Spanish', 'Mandarin Chinese', 'Hindi', 'French', 'Arabic', 'Bengali', 'Russian', 'Portuguese', 'Indonesian'];
export function ProfileEditor({
  onClose,
  profile
}) {
  const {
    updateProfile,
    addEducation,
    removeEducation,
    addWorkExperience,
    removeWorkExperience,
    addAchievement,
    removeAchievement,
    addProject,
    removeProject,
    addCertificate,
    removeCertificate
  } = useProfile(profile?.id, !!profile?.id);
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [skillSearch, setSkillSearch] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');
  const profilePicRef = useRef(null);
  const coverPhotoRef = useRef(null);

  // Form states
  const [basicInfo, setBasicInfo] = useState({
    displayName: '',
    headline: '',
    bio: '',
    location: ''
  });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    issuer: '',
    date: '',
    description: ''
  });

  // Education form
  const [educationForm, setEducationForm] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: ''
  });

  // Work experience form
  const [workForm, setWorkForm] = useState({
    company: '',
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  // Project form
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    url: '',
    technologies: [],
    date: ''
  });

  // Certificate form
  const [certificateForm, setCertificateForm] = useState({
    name: '',
    issuer: '',
    url: '',
    date: ''
  });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setBasicInfo({
        displayName: profile.displayName || '',
        headline: profile.headline || '',
        bio: profile.bio || '',
        location: profile.location || ''
      });
      setSelectedSkills(profile.skills || []);
      setSelectedLanguages(profile.languages || []);
    }
  }, [profile]);
  const handleAddSkill = skill => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  const handleRemoveSkill = skill => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };
  const handleAddLanguage = lang => {
    if (!selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };
  const handleRemoveLanguage = lang => {
    setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
  };
  const showMessage = (type, text) => {
    setMessage({
      type,
      text
    });
    setTimeout(() => setMessage(null), 3000);
  };
  const handleImageUpload = async (file, type) => {
    if (!profile) return;
    const imageType = type === 'profile' ? 'profilePicture' : 'coverPhoto';
    setIsUploading(true);
    showMessage('success', `Uploading ${type === 'profile' ? 'profile picture' : 'cover photo'}...`);
    const storageRef = ref(storage, `user-uploads/${profile.id}/${imageType}/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateProfile({
        [imageType]: downloadURL
      });
      showMessage('success', `${type === 'profile' ? 'Profile picture' : 'Cover photo'} updated successfully.`);
    } catch (error) {
      console.error('Error uploading image:', error);
      showMessage('error', 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  const handleSaveBasicInfo = async () => {
    try {
      setLoading(true);
      await updateProfile(basicInfo);
      showMessage('success', 'Basic information saved successfully!');
    } catch (error) {
      console.error('Error saving basic info:', error);
      showMessage('error', 'Failed to save basic information. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleSaveSkills = async () => {
    try {
      setLoading(true);
      await updateProfile({
        skills: selectedSkills
      });
      showMessage('success', 'Skills updated successfully!');
    } catch (error) {
      console.error('Error saving skills:', error);
      showMessage('error', 'Failed to save skills. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleSaveLanguages = async () => {
    try {
      setLoading(true);
      await updateProfile({
        languages: selectedLanguages
      });
      showMessage('success', 'Languages updated successfully!');
    } catch (error) {
      console.error('Error saving languages:', error);
      showMessage('error', 'Failed to save languages. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleAddEducation = async () => {
    if (!educationForm.school || !educationForm.degree) {
      showMessage('error', 'Please fill in all required fields.');
      return;
    }
    try {
      setLoading(true);
      await addEducation(educationForm);
      setEducationForm({
        school: '',
        degree: '',
        fieldOfStudy: '',
        startYear: '',
        endYear: ''
      });
      showMessage('success', 'Education added successfully!');
    } catch (error) {
      console.error('Error adding education:', error);
      showMessage('error', 'Failed to add education. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleAddWorkExperience = async () => {
    if (!workForm.company || !workForm.title) {
      showMessage('error', 'Please fill in all required fields.');
      return;
    }
    try {
      setLoading(true);
      await addWorkExperience(workForm);
      setWorkForm({
        company: '',
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
      showMessage('success', 'Work experience added successfully!');
    } catch (error) {
      console.error('Error adding work experience:', error);
      showMessage('error', 'Failed to add work experience. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleAddAchievement = async () => {
    if (!newAchievement.title.trim()) {
      showMessage('error', 'Please enter an achievement title.');
      return;
    }
    try {
      setLoading(true);
      await addAchievement(newAchievement);
      setNewAchievement({
        title: '',
        issuer: '',
        date: '',
        description: ''
      });
      showMessage('success', 'Achievement added successfully!');
    } catch (error) {
      console.error('Error adding achievement:', error);
      showMessage('error', 'Failed to add achievement. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleAddProject = async () => {
    if (!projectForm.name || !projectForm.description) {
      showMessage('error', 'Please fill in all required fields.');
      return;
    }
    try {
      setLoading(true);
      await addProject(projectForm);
      setProjectForm({
        name: '',
        description: '',
        url: '',
        technologies: [],
        date: ''
      });
      showMessage('success', 'Project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error);
      showMessage('error', 'Failed to add project. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleAddCertificate = async () => {
    if (!certificateForm.name || !certificateForm.issuer) {
      showMessage('error', 'Please fill in all required fields.');
      return;
    }
    try {
      setLoading(true);
      await addCertificate(certificateForm);
      setCertificateForm({
        name: '',
        issuer: '',
        url: '',
        date: ''
      });
      showMessage('success', 'Certificate added successfully!');
    } catch (error) {
      console.error('Error adding certificate:', error);
      showMessage('error', 'Failed to add certificate. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const tabs = [{
    id: 'basic',
    label: 'Basic Info'
  }, {
    id: 'education',
    label: 'Education'
  }, {
    id: 'experience',
    label: 'Experience'
  }, {
    id: 'skills',
    label: 'Skills'
  }, {
    id: 'achievements',
    label: 'Achievements'
  }, {
    id: 'projects',
    label: 'Projects'
  }, {
    id: 'certificates',
    label: 'Certificates'
  }];
  return /*#__PURE__*/_jsx("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
    children: /*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between p-6 border-b border-gray-200",
        children: [/*#__PURE__*/_jsx("h2", {
          className: "text-xl font-semibold text-gray-900",
          children: "Edit Profile"
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
      }), /*#__PURE__*/_jsx("div", {
        className: "flex border-b border-gray-200",
        children: tabs.map(tab => /*#__PURE__*/_jsx("button", {
          onClick: () => setActiveTab(tab.id),
          className: `px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-[#0a66c2] text-[#0a66c2]' : 'border-transparent text-gray-500 hover:text-gray-700'}`,
          children: tab.label
        }, tab.id))
      }), /*#__PURE__*/_jsxs("div", {
        className: "p-6",
        children: [activeTab === 'basic' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-lg font-medium text-gray-900 mb-4",
              children: "Profile Picture"
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center space-x-4",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "relative",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-24 h-24 bg-[#0a66c2] rounded-full flex items-center justify-center",
                  children: profile?.profilePicture ? /*#__PURE__*/_jsx("img", {
                    src: profile.profilePicture,
                    alt: "Profile",
                    className: "w-24 h-24 rounded-full object-cover"
                  }) : /*#__PURE__*/_jsx("span", {
                    className: "text-white font-bold text-2xl",
                    children: profile?.displayName?.charAt(0) || 'U'
                  })
                }), /*#__PURE__*/_jsx("button", {
                  onClick: () => profilePicRef.current?.click(),
                  disabled: isUploading,
                  className: "absolute bottom-0 right-0 bg-[#0a66c2] text-white p-2 rounded-full hover:bg-[#004182] transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                  children: isUploading ? /*#__PURE__*/_jsx("div", {
                    className: "flex items-center justify-center",
                    children: /*#__PURE__*/_jsx("div", {
                      className: "w-4 h-4 border-2 border-white border-t-transparent animate-spin"
                    })
                  }) : /*#__PURE__*/_jsx(Camera, {
                    className: "w-4 h-4"
                  })
                })]
              }), /*#__PURE__*/_jsx("input", {
                ref: profilePicRef,
                type: "file",
                accept: "image/*",
                onChange: e => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'profile');
                },
                className: "hidden"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-lg font-medium text-gray-900 mb-4",
              children: "Cover Photo"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx("div", {
                className: "h-32 bg-gradient-to-r from-[#0a66c2] to-[#004182] rounded-lg",
                children: profile?.coverPhoto && /*#__PURE__*/_jsx("img", {
                  src: profile.coverPhoto,
                  alt: "Cover",
                  className: "w-full h-32 rounded-lg object-cover"
                })
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => coverPhotoRef.current?.click(),
                disabled: isUploading,
                className: "absolute top-2 right-2 bg-white text-gray-700 p-2 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                children: /*#__PURE__*/_jsx(Camera, {
                  className: "w-4 h-4"
                })
              }), /*#__PURE__*/_jsx("input", {
                ref: coverPhotoRef,
                type: "file",
                accept: "image/*",
                onChange: e => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'cover');
                },
                className: "hidden"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Full Name"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                value: basicInfo.displayName,
                onChange: e => setBasicInfo({
                  ...basicInfo,
                  displayName: e.target.value
                }),
                className: "linkedin-input"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Headline"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                value: basicInfo.headline,
                onChange: e => setBasicInfo({
                  ...basicInfo,
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
                value: basicInfo.bio,
                onChange: e => setBasicInfo({
                  ...basicInfo,
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
                value: basicInfo.location,
                onChange: e => setBasicInfo({
                  ...basicInfo,
                  location: e.target.value
                }),
                placeholder: "e.g., San Francisco, CA",
                className: "linkedin-input"
              })]
            }), /*#__PURE__*/_jsx("button", {
              onClick: handleSaveBasicInfo,
              disabled: loading,
              className: "linkedin-btn-primary",
              children: loading ? 'Saving...' : 'Save Changes'
            })]
          })]
        }), activeTab === 'education' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "text-lg font-medium text-gray-900",
            children: "Education"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-gray-500",
            children: "Education section coming soon."
          })]
        }), activeTab === 'experience' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "text-lg font-medium text-gray-900",
            children: "Work Experience"
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-gray-50 p-4 rounded-lg",
            children: [/*#__PURE__*/_jsx("h4", {
              className: "font-medium text-gray-900 mb-4",
              children: "Add Work Experience"
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [/*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Company",
                value: workForm.company,
                onChange: e => setWorkForm({
                  ...workForm,
                  company: e.target.value
                }),
                className: "linkedin-input"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Title",
                value: workForm.title,
                onChange: e => setWorkForm({
                  ...workForm,
                  title: e.target.value
                }),
                className: "linkedin-input"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Location",
                value: workForm.location,
                onChange: e => setWorkForm({
                  ...workForm,
                  location: e.target.value
                }),
                className: "linkedin-input"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Start Date",
                value: workForm.startDate,
                onChange: e => setWorkForm({
                  ...workForm,
                  startDate: e.target.value
                }),
                className: "linkedin-input"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "End Date (or present)",
                value: workForm.endDate,
                onChange: e => setWorkForm({
                  ...workForm,
                  endDate: e.target.value
                }),
                className: "linkedin-input",
                disabled: workForm.current
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center md:col-span-2",
                children: [/*#__PURE__*/_jsx("input", {
                  type: "checkbox",
                  id: "currentJob",
                  checked: workForm.current,
                  onChange: e => setWorkForm({
                    ...workForm,
                    current: e.target.checked,
                    endDate: e.target.checked ? 'Present' : ''
                  }),
                  className: "h-4 w-4 text-[#0a66c2] focus:ring-[#0a66c2] border-gray-300 rounded"
                }), /*#__PURE__*/_jsx("label", {
                  htmlFor: "currentJob",
                  className: "ml-2 block text-sm text-gray-900",
                  children: "I currently work here"
                })]
              }), /*#__PURE__*/_jsx("textarea", {
                placeholder: "Description",
                value: workForm.description,
                onChange: e => setWorkForm({
                  ...workForm,
                  description: e.target.value
                }),
                rows: 4,
                className: "linkedin-input md:col-span-2"
              })]
            }), /*#__PURE__*/_jsx("button", {
              onClick: handleAddWorkExperience,
              disabled: loading,
              className: "linkedin-btn-primary mt-4",
              children: loading ? 'Adding...' : 'Add Experience'
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-4",
            children: profile?.workExperience?.map((exp, index) => /*#__PURE__*/_jsx("div", {
              className: "linkedin-card p-4",
              children: /*#__PURE__*/_jsxs("div", {
                className: "flex justify-between items-start",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("h4", {
                    className: "font-semibold text-gray-900",
                    children: exp.title
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-gray-600",
                    children: [exp.company, " \xB7 ", exp.location]
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-sm text-gray-500",
                    children: [exp.startDate, " - ", exp.endDate || 'Present']
                  }), exp.description && /*#__PURE__*/_jsx("p", {
                    className: "text-sm text-gray-700 mt-2 whitespace-pre-line",
                    children: exp.description
                  })]
                }), /*#__PURE__*/_jsx("button", {
                  onClick: () => removeWorkExperience(index),
                  className: "text-red-600 hover:text-red-800",
                  children: /*#__PURE__*/_jsx(Trash2, {
                    className: "w-4 h-4"
                  })
                })]
              })
            }, exp.id))
          })]
        }), activeTab === 'skills' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-8",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-lg font-medium text-gray-900 mb-4",
              children: "Skills"
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-gray-50 p-4 rounded-lg",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-2 mb-4",
                children: [/*#__PURE__*/_jsx(Search, {
                  className: "w-5 h-5 text-gray-400"
                }), /*#__PURE__*/_jsx("input", {
                  type: "text",
                  placeholder: "Search for skills...",
                  value: skillSearch,
                  onChange: e => setSkillSearch(e.target.value),
                  className: "linkedin-input w-full"
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "max-h-40 overflow-y-auto space-y-2 mb-4",
                children: AVAILABLE_SKILLS.filter(skill => skill.toLowerCase().includes(skillSearch.toLowerCase()) && !selectedSkills.includes(skill)).map(skill => /*#__PURE__*/_jsx("button", {
                  onClick: () => handleAddSkill(skill),
                  className: "w-full text-left p-2 rounded-md hover:bg-gray-200 transition-colors text-sm",
                  children: skill
                }, skill))
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "mt-4",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium text-gray-800 mb-2",
                children: "Your Skills"
              }), selectedSkills.length > 0 ? /*#__PURE__*/_jsx("div", {
                className: "flex flex-wrap gap-2",
                children: selectedSkills.map(skill => /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center bg-[#0a66c2] text-white text-sm font-medium px-3 py-1 rounded-full",
                  children: [/*#__PURE__*/_jsx("span", {
                    children: skill
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => handleRemoveSkill(skill),
                    className: "ml-2 text-white hover:bg-white/20 rounded-full p-0.5",
                    children: /*#__PURE__*/_jsx(X, {
                      className: "w-3 h-3"
                    })
                  })]
                }, skill))
              }) : /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "No skills added yet."
              })]
            }), /*#__PURE__*/_jsx("button", {
              onClick: handleSaveSkills,
              disabled: loading,
              className: "linkedin-btn-primary mt-4",
              children: loading ? 'Saving...' : 'Save Skills'
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-lg font-medium text-gray-900 mb-4",
              children: "Languages"
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-gray-50 p-4 rounded-lg",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-2 mb-4",
                children: [/*#__PURE__*/_jsx(Search, {
                  className: "w-5 h-5 text-gray-400"
                }), /*#__PURE__*/_jsx("input", {
                  type: "text",
                  placeholder: "Search for languages...",
                  value: languageSearch,
                  onChange: e => setLanguageSearch(e.target.value),
                  className: "linkedin-input w-full"
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "max-h-40 overflow-y-auto space-y-2 mb-4",
                children: AVAILABLE_LANGUAGES.filter(lang => lang.toLowerCase().includes(languageSearch.toLowerCase()) && !selectedLanguages.includes(lang)).map(lang => /*#__PURE__*/_jsx("button", {
                  onClick: () => handleAddLanguage(lang),
                  className: "w-full text-left p-2 rounded-md hover:bg-gray-200 transition-colors text-sm",
                  children: lang
                }, lang))
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "mt-4",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium text-gray-800 mb-2",
                children: "Your Languages"
              }), selectedLanguages.length > 0 ? /*#__PURE__*/_jsx("div", {
                className: "flex flex-wrap gap-2",
                children: selectedLanguages.map(lang => /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center bg-[#0a66c2] text-white text-sm font-medium px-3 py-1 rounded-full",
                  children: [/*#__PURE__*/_jsx("span", {
                    children: lang
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => handleRemoveLanguage(lang),
                    className: "ml-2 text-white hover:bg-white/20 rounded-full p-0.5",
                    children: /*#__PURE__*/_jsx(X, {
                      className: "w-3 h-3"
                    })
                  })]
                }, lang))
              }) : /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "No languages added yet."
              })]
            }), /*#__PURE__*/_jsx("button", {
              onClick: handleSaveLanguages,
              disabled: loading,
              className: "linkedin-btn-primary mt-4",
              children: loading ? 'Saving...' : 'Save Languages'
            })]
          })]
        }), activeTab === 'achievements' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "text-lg font-medium text-gray-900",
            children: "Achievements"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-gray-500",
            children: "Achievements section coming soon."
          })]
        }), activeTab === 'projects' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "text-lg font-medium text-gray-900",
            children: "Projects"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-gray-500",
            children: "Projects section coming soon."
          })]
        }), activeTab === 'certificates' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "text-lg font-medium text-gray-900",
            children: "Certificates"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-gray-500",
            children: "Certificates section coming soon."
          })]
        }), activeTab === 'skills' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "text-lg font-medium text-gray-900",
            children: "Skills & Languages"
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-gray-50 p-4 rounded-lg",
            children: [/*#__PURE__*/_jsx("h4", {
              className: "font-medium text-gray-900 mb-2",
              children: "Add Skills"
            }), /*#__PURE__*/_jsx("input", {
              type: "text",
              placeholder: "Search for skills...",
              value: skillSearch,
              onChange: e => setSkillSearch(e.target.value),
              className: "linkedin-input mb-4"
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto border p-2 rounded-md",
              children: AVAILABLE_SKILLS.filter(skill => skill.toLowerCase().includes(skillSearch.toLowerCase())).map(skill => /*#__PURE__*/_jsxs("label", {
                className: "flex items-center space-x-2 p-1 rounded-md hover:bg-gray-100 cursor-pointer",
                children: [/*#__PURE__*/_jsx("input", {
                  type: "checkbox",
                  checked: selectedSkills.includes(skill),
                  onChange: e => {
                    if (e.target.checked) {
                      setSelectedSkills([...selectedSkills, skill]);
                    } else {
                      setSelectedSkills(selectedSkills.filter(s => s !== skill));
                    }
                  },
                  className: "rounded text-[#0a66c2] focus:ring-[#0a66c2]"
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-sm text-gray-700",
                  children: skill
                })]
              }, skill))
            }), /*#__PURE__*/_jsx("button", {
              onClick: handleSaveSkills,
              disabled: loading,
              className: "linkedin-btn-primary mt-4",
              children: loading ? 'Saving...' : 'Save Skills'
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-gray-50 p-4 rounded-lg",
            children: [/*#__PURE__*/_jsx("h4", {
              className: "font-medium text-gray-900 mb-2",
              children: "Add Languages"
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto border p-2 rounded-md",
              children: AVAILABLE_LANGUAGES.map(language => /*#__PURE__*/_jsxs("label", {
                className: "flex items-center space-x-2 p-1 rounded-md hover:bg-gray-100 cursor-pointer",
                children: [/*#__PURE__*/_jsx("input", {
                  type: "checkbox",
                  checked: selectedLanguages.includes(language),
                  onChange: e => {
                    if (e.target.checked) {
                      setSelectedLanguages([...selectedLanguages, language]);
                    } else {
                      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
                    }
                  },
                  className: "rounded text-[#0a66c2] focus:ring-[#0a66c2]"
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-sm text-gray-700",
                  children: language
                })]
              }, language))
            }), /*#__PURE__*/_jsx("button", {
              onClick: handleSaveLanguages,
              disabled: loading,
              className: "linkedin-btn-primary mt-4",
              children: loading ? 'Saving...' : 'Save Languages'
            })]
          })]
        }), activeTab === 'achievements' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "text-lg font-medium text-gray-900",
            children: "Achievements"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex space-x-2",
            children: [/*#__PURE__*/_jsx("input", {
              type: "text",
              placeholder: "Title",
              value: newAchievement.title,
              onChange: e => setNewAchievement({
                ...newAchievement,
                title: e.target.value
              }),
              className: "linkedin-input"
            }), /*#__PURE__*/_jsx("input", {
              type: "text",
              placeholder: "Issuer",
              value: newAchievement.issuer,
              onChange: e => setNewAchievement({
                ...newAchievement,
                issuer: e.target.value
              }),
              className: "linkedin-input"
            }), /*#__PURE__*/_jsx("input", {
              type: "text",
              placeholder: "Date",
              value: newAchievement.date,
              onChange: e => setNewAchievement({
                ...newAchievement,
                date: e.target.value
              }),
              className: "linkedin-input"
            }), /*#__PURE__*/_jsx("textarea", {
              placeholder: "Description (optional)",
              value: newAchievement.description,
              onChange: e => setNewAchievement({
                ...newAchievement,
                description: e.target.value
              }),
              className: "linkedin-input h-24"
            }), /*#__PURE__*/_jsx("button", {
              onClick: handleAddAchievement,
              disabled: loading || !newAchievement.title.trim(),
              className: "linkedin-btn-primary",
              children: loading ? 'Adding...' : 'Add'
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-2",
            children: profile?.achievements?.map(achievement => /*#__PURE__*/_jsx("div", {
              className: "linkedin-card p-4",
              children: /*#__PURE__*/_jsxs("div", {
                className: "flex justify-between items-start",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("h4", {
                    className: "font-semibold text-gray-900",
                    children: achievement.title
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-gray-600",
                    children: [achievement.issuer, " - ", achievement.date]
                  }), achievement.description && /*#__PURE__*/_jsx("p", {
                    className: "text-sm text-gray-500 mt-2",
                    children: achievement.description
                  })]
                }), /*#__PURE__*/_jsx("button", {
                  onClick: () => achievement.id && removeAchievement(achievement.id),
                  className: "text-red-600 hover:text-red-800",
                  children: /*#__PURE__*/_jsx(Trash2, {
                    className: "w-4 h-4"
                  })
                })]
              })
            }, achievement.id))
          })]
        }), activeTab === 'projects' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "text-lg font-medium text-gray-900",
            children: "Projects"
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-gray-50 p-4 rounded-lg",
            children: [/*#__PURE__*/_jsx("h4", {
              className: "font-medium text-gray-900 mb-4",
              children: "Add Project"
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-4",
              children: [/*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Project Name",
                value: projectForm.name,
                onChange: e => setProjectForm({
                  ...projectForm,
                  name: e.target.value
                }),
                className: "linkedin-input"
              }), /*#__PURE__*/_jsx("textarea", {
                placeholder: "Description",
                value: projectForm.description,
                onChange: e => setProjectForm({
                  ...projectForm,
                  description: e.target.value
                }),
                rows: 3,
                className: "linkedin-input"
              }), /*#__PURE__*/_jsx("input", {
                type: "url",
                placeholder: "Project URL (optional)",
                value: projectForm.url,
                onChange: e => setProjectForm({
                  ...projectForm,
                  url: e.target.value
                }),
                className: "linkedin-input"
              })]
            }), /*#__PURE__*/_jsx("button", {
              onClick: handleAddProject,
              disabled: loading,
              className: "linkedin-btn-primary mt-4",
              children: loading ? 'Adding...' : 'Add Project'
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-4",
            children: profile?.projects?.map(project => /*#__PURE__*/_jsx("div", {
              className: "linkedin-card p-4",
              children: /*#__PURE__*/_jsxs("div", {
                className: "flex justify-between items-start",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("h4", {
                    className: "font-semibold text-gray-900",
                    children: project.name
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-gray-600",
                    children: project.description
                  }), project.url && /*#__PURE__*/_jsx("a", {
                    href: project.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-[#0a66c2] hover:underline text-sm",
                    children: "View Project"
                  })]
                }), /*#__PURE__*/_jsx("button", {
                  onClick: () => project.id && removeProject(project.id),
                  className: "text-red-600 hover:text-red-800",
                  children: /*#__PURE__*/_jsx(Trash2, {
                    className: "w-4 h-4"
                  })
                })]
              })
            }, project.id))
          })]
        }), activeTab === 'certificates' && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "text-lg font-medium text-gray-900",
            children: "Certificates"
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-gray-50 p-4 rounded-lg",
            children: [/*#__PURE__*/_jsx("h4", {
              className: "font-medium text-gray-900 mb-4",
              children: "Add Certificate"
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [/*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Certificate Name",
                value: certificateForm.name,
                onChange: e => setCertificateForm({
                  ...certificateForm,
                  name: e.target.value
                }),
                className: "linkedin-input"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Issuing Organization",
                value: certificateForm.issuer,
                onChange: e => setCertificateForm({
                  ...certificateForm,
                  issuer: e.target.value
                }),
                className: "linkedin-input"
              }), /*#__PURE__*/_jsx("input", {
                type: "url",
                placeholder: "Certificate URL (optional)",
                value: certificateForm.url,
                onChange: e => setCertificateForm({
                  ...certificateForm,
                  url: e.target.value
                }),
                className: "linkedin-input"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Date",
                value: certificateForm.date,
                onChange: e => setCertificateForm({
                  ...certificateForm,
                  date: e.target.value
                }),
                className: "linkedin-input"
              })]
            }), /*#__PURE__*/_jsx("button", {
              onClick: handleAddCertificate,
              disabled: loading,
              className: "linkedin-btn-primary mt-4",
              children: loading ? 'Adding...' : 'Add Certificate'
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-4",
            children: profile?.certificates?.map(cert => /*#__PURE__*/_jsx("div", {
              className: "linkedin-card p-4",
              children: /*#__PURE__*/_jsxs("div", {
                className: "flex justify-between items-start",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("h4", {
                    className: "font-semibold text-gray-900",
                    children: cert.name
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-gray-600",
                    children: cert.issuer
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-sm text-gray-500",
                    children: cert.date
                  }), cert.url && /*#__PURE__*/_jsx("a", {
                    href: cert.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-[#0a66c2] hover:underline text-sm",
                    children: "View Certificate"
                  })]
                }), /*#__PURE__*/_jsx("button", {
                  onClick: () => cert.id && removeCertificate(cert.id),
                  className: "text-red-600 hover:text-red-800",
                  children: /*#__PURE__*/_jsx(Trash2, {
                    className: "w-4 h-4"
                  })
                })]
              })
            }, cert.id))
          })]
        })]
      })]
    })
  });
}