export const formatTime = (timeMillis) => {
  const minutes = Math.floor(timeMillis / 60000);
  const seconds = ((timeMillis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
