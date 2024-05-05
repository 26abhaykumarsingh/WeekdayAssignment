export const capitalize = (text) => {
  //capitalize first letter of string
  return (
    text?.toString().slice(0, 1).toUpperCase() + text?.slice(1).toLowerCase()
  );
};
