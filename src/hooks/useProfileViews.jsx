import { useState, useEffect } from 'react';
export function useProfileViews(userId) {
  const [profileViews, setProfileViews] = useState(0);
  const [postImpressions, setPostImpressions] = useState(0);
  useEffect(() => {
    if (userId) {
      loadStats();
    }
  }, [userId]);
  const loadStats = () => {
    // Load stats from localStorage
    const storedViews = localStorage.getItem(`profileViews_${userId}`);
    const storedImpressions = localStorage.getItem(`postImpressions_${userId}`);
    if (storedViews) {
      setProfileViews(parseInt(storedViews));
    }
    if (storedImpressions) {
      setPostImpressions(parseInt(storedImpressions));
    }
  };
  const incrementProfileViews = () => {
    if (!userId) return;
    const newViews = profileViews + 1;
    setProfileViews(newViews);
    localStorage.setItem(`profileViews_${userId}`, newViews.toString());
  };
  const incrementPostImpressions = () => {
    if (!userId) return;
    const newImpressions = postImpressions + 1;
    setPostImpressions(newImpressions);
    localStorage.setItem(`postImpressions_${userId}`, newImpressions.toString());
  };
  return {
    profileViews,
    postImpressions,
    incrementProfileViews,
    incrementPostImpressions
  };
}