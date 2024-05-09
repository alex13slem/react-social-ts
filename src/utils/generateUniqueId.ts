function generateUniqueId() {
  // Get the current timestamp in milliseconds
  const timestamp = Date.now();

  // Generate a random number between 0 and 1
  const random = Math.random();

  // Convert the random number to a base 36 string
  const randomString = random.toString(36).substring(2, 7);

  // Combine the timestamp and random string into a unique ID
  return timestamp + randomString;
}

export default generateUniqueId;
