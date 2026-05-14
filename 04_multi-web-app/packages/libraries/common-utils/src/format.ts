export const formatTimestamp = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
};
