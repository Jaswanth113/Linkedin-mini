import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PollDisplay({
  post
}) {
  const {
    currentUser
  } = useAuth();
  const {
    voteOnPoll
  } = usePosts();
  if (!post.poll) return null;
  const totalVotes = post.poll.options.reduce((sum, option) => sum + option.votes.length, 0);
  const userVote = post.poll.options.find(option => option.votes.includes(currentUser?.id || ''));
  const handleVote = optionId => {
    if (!currentUser) {
      // Or show a message to log in
      return;
    }
    voteOnPoll(post.id, optionId);
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "my-3 px-3",
    children: [/*#__PURE__*/_jsx("h4", {
      className: "font-semibold text-gray-800 mb-3",
      children: post.poll.question
    }), /*#__PURE__*/_jsx("div", {
      className: "space-y-2",
      children: post.poll.options.map(option => {
        const percentage = totalVotes > 0 ? option.votes.length / totalVotes * 100 : 0;
        const isUserChoice = userVote?.id === option.id;
        return /*#__PURE__*/_jsxs("button", {
          onClick: () => handleVote(option.id),
          className: `w-full text-left p-2 border rounded-md transition-all duration-200 ease-in-out ${isUserChoice ? 'border-blue-500 bg-blue-50 font-semibold' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`,
          disabled: !currentUser,
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex justify-between items-center",
            children: [/*#__PURE__*/_jsx("span", {
              className: "text-sm text-gray-700",
              children: option.text
            }), userVote && /*#__PURE__*/_jsxs("span", {
              className: "text-sm font-bold text-gray-800",
              children: [percentage.toFixed(0), "%"]
            })]
          }), userVote && /*#__PURE__*/_jsx("div", {
            className: "mt-1 h-2 bg-gray-200 rounded-full",
            children: /*#__PURE__*/_jsx("div", {
              className: "h-2 bg-blue-500 rounded-full",
              style: {
                width: `${percentage}%`
              }
            })
          })]
        }, option.id);
      })
    }), /*#__PURE__*/_jsxs("p", {
      className: "text-xs text-gray-500 mt-2",
      children: [totalVotes, " vote", totalVotes !== 1 ? 's' : '']
    })]
  });
}