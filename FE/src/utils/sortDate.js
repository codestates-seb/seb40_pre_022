export const sortDate = (date) => {
  const orderedDate = date.sort((a, b) => new Date(b) - new Date(a));
  return orderedDate;
};
