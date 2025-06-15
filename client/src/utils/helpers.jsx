// src/utils/helpers.js
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};