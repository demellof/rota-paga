// This file is designed to be used in a Vite environment (React app)
// where import.meta.env is available.

const API_URL = "https://json.astrologyapi.com/v1";

const getAuthHeader = (userId: string, apiKey: string) => {
  const authString = `${userId}:${apiKey}`;
  const encodedAuthString = btoa(authString); // Use btoa for browser environment
  return `Basic ${encodedAuthString}`;
};

/**
 * A generic function to test the API connection.
 * It requires credentials to be passed as arguments, making it environment-agnostic.
 * @param userId - The AstrologyAPI User ID.
 * @param apiKey - The AstrologyAPI Key.
 */
export const testApiConnectionWithCredentials = async (userId: string, apiKey: string) => {
  if (!userId || !apiKey) {
    console.error("User ID and API Key must be provided.");
    return;
  }
  try {
    const response = await fetch(`${API_URL}/planets`, {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(userId, apiKey),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        lat: 0,
        lon: 0,
        tzone: 0,
      }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const data = await response.json();
    console.log("API Connection Test Successful:", data);
  } catch (error) {
    console.error("API Connection Test Failed:", error);
  }
};

/**
 * A specific function for the Vite application to test the API connection.
 * It automatically uses the environment variables from import.meta.env.
 */
export const testApiConnection = () => {
    const userId = import.meta.env.VITE_ASTROLOGY_API_USER_ID;
    const apiKey = import.meta.env.VITE_ASTROLOGY_API_KEY;
    return testApiConnectionWithCredentials(userId, apiKey);
};
