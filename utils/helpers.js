export const formatTime = (timeMillis) => {
  const minutes = Math.floor(timeMillis / 60000);
  const seconds = ((timeMillis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export function getRandomNumber(min, max) {
  let random = Math.round(Math.random() * (max - min) + min);
  // to make sure max is not inclusive
  return random >= max ? random - 1 : random;
}
