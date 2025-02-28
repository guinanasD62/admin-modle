export const getInitials = (name: any) => {
  // Split the name into words
  const words = name.trim().split(/\s+/);

  // Get the first letter of the first and second word
  const initials = words.slice(0, 2).map((word: any) => word.charAt(0).toUpperCase()).join('');

  return initials;
}


export const formatUrl = (url: any) => {
  // Check if the URL starts with http:// or https://
  if (!/^https?:\/\//i.test(url)) {
    // Prepend http:// if no protocol is found
    return `http://${url}`;
  }
  return url;
};