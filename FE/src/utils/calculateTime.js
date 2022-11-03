export const calculateTime = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  );
  if (betweenTime < 1) return "Just now";
  if (betweenTime < 60) {
    if (betweenTime >= 1 && betweenTime < 2) return `1 min ago`;
    return `${betweenTime} mins ago`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    if (betweenTimeHour === 1) return `1 hour ago`;
    return `${betweenTimeHour} hours ago`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    if (betweenTimeDay === 1) return `1 day ago`;
    return `${betweenTimeDay} days ago`;
  }

  return `${Math.floor(betweenTimeDay / 365)} years ago`;
};
