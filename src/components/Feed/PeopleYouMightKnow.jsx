import { useState, useEffect } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Avatar from '../UI/Avatar';
import { useConnections } from '../../hooks/useConnections';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PeopleYouMightKnow() {
  const {
    currentUser
  } = useAuth();
  const {
    getConnectionStatus,
    sendConnectionRequest,
    acceptConnectionRequest,
    declineConnectionRequest,
    removeConnection,
    loading: connectionsLoading
  } = useConnections();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const usersCollection = collection(db, 'profiles');
        const q = query(usersCollection, limit(10)); // Fetch more to have options for filtering
        const usersSnapshot = await getDocs(q);
        const usersList = usersSnapshot.docs.map(doc => doc.data()).filter(user => user.id !== currentUser.id) // Filter out the current user
        .slice(0, 5); // Take the first 5
        setSuggestedUsers(usersList);
      } catch (error) {
        console.error('Error fetching suggested users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentUser]);
  const handleDismiss = userId => {
    console.log('Dismissing user:', userId);
    // TODO: Implement dismiss logic
  };
  return /*#__PURE__*/_jsx("div", {
    className: "linkedin-card",
    children: /*#__PURE__*/_jsxs("div", {
      className: "p-4",
      children: [/*#__PURE__*/_jsx("h3", {
        className: "text-lg font-semibold text-[#000000] mb-4",
        children: "People you may know"
      }), /*#__PURE__*/_jsx("div", {
        className: "space-y-4",
        children: connectionsLoading || loading ? /*#__PURE__*/_jsx("p", {
          className: "text-xs text-gray-500",
          children: "Loading suggestions..."
        }) : suggestedUsers.length === 0 ? /*#__PURE__*/_jsx("p", {
          className: "text-xs text-gray-500",
          children: "No new suggestions right now."
        }) : suggestedUsers.map(user => /*#__PURE__*/_jsxs("div", {
          className: "flex items-start space-x-3",
          children: [/*#__PURE__*/_jsx(Link, {
            to: `/user/${user.id}`,
            className: "flex-shrink-0",
            children: /*#__PURE__*/_jsx(Avatar, {
              name: user.displayName,
              className: "w-12 h-12"
            })
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex-1 min-w-0",
            children: [/*#__PURE__*/_jsx(Link, {
              to: `/user/${user.id}`,
              className: "block",
              children: /*#__PURE__*/_jsx("h4", {
                className: "font-semibold text-[#000000] text-sm hover:text-[#0a66c2] hover:underline",
                children: user.displayName
              })
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-[#666666] mb-1 line-clamp-2",
              children: user.headline || 'No headline'
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center space-x-2",
              children: [renderConnectButton(getConnectionStatus(user.id), user.id), /*#__PURE__*/_jsx("button", {
                onClick: () => handleDismiss(user.id),
                className: "p-1 text-[#666666] hover:text-[#000000] hover:bg-[#f3f2ef] rounded-full transition-colors",
                title: "Dismiss",
                children: /*#__PURE__*/_jsx(X, {
                  className: "w-3 h-3"
                })
              })]
            })]
          })]
        }, user.id))
      }), /*#__PURE__*/_jsx("div", {
        className: "mt-4 pt-3 border-t border-[#d9d9d9]",
        children: /*#__PURE__*/_jsx("button", {
          className: "text-sm text-[#666666] hover:text-[#0a66c2] font-medium",
          children: "Show more"
        })
      })]
    })
  });
  function renderConnectButton(status, targetUserId) {
    switch (status) {
      case 'not_connected':
        return /*#__PURE__*/_jsx("button", {
          onClick: () => sendConnectionRequest(targetUserId),
          className: "px-3 py-1 text-sm font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[#e6f0f8]",
          children: "Connect"
        });
      case 'pending_sent':
        return /*#__PURE__*/_jsx("button", {
          disabled: true,
          className: "px-3 py-1 text-sm font-semibold text-gray-500 border border-gray-300 rounded-full cursor-not-allowed",
          children: "Pending"
        });
      case 'pending_received':
        return /*#__PURE__*/_jsxs("div", {
          className: "flex space-x-2",
          children: [/*#__PURE__*/_jsx("button", {
            onClick: () => acceptConnectionRequest(targetUserId),
            className: "px-3 py-1 text-sm font-semibold text-green-600 border border-green-600 rounded-full hover:bg-green-50",
            children: "Accept"
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => declineConnectionRequest(targetUserId),
            className: "p-1.5 rounded-full hover:bg-gray-200",
            children: /*#__PURE__*/_jsx(X, {
              className: "w-4 h-4 text-gray-500"
            })
          })]
        });
      case 'connected':
        return /*#__PURE__*/_jsx("button", {
          onClick: () => removeConnection(targetUserId),
          className: "px-3 py-1 text-sm font-semibold text-gray-700 border border-gray-400 rounded-full hover:bg-gray-100",
          children: "Connected"
        });
      default:
        return null;
    }
  }
}