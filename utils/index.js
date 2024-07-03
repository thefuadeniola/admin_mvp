export function convertTimestampToCustomFormat(timestamp) {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);

    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    // Get the hours and minutes
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Determine AM/PM and adjust hours
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Adjust for 0 hour to be 12

    // Format hours and minutes
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = minutes;

    // Combine into the final format
    return `${day}.${month}.${year} - ${formattedHours}.${formattedMinutes} ${ampm}`;
}

export function shortenString(str) {
    if (str.length <= 5) {
      return str;
    }
    return str.substring(0, 5) + '...';
  }
  
export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
