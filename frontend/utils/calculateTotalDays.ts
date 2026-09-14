
const calculateTotalDays = (dateRange: { from?: Date; to?: Date }) => {
  if (!dateRange || !dateRange.from) return 0;
  if (!dateRange.to) return 1;

  const diffInTime = dateRange.to.getTime() - dateRange.from.getTime();
  const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));
  
  return diffInDays + 1; 
};

export default calculateTotalDays