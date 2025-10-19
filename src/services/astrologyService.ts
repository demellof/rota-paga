// This file is designed to be used in a Vite environment (React app)
// where import.meta.env is available.

const API_URL = "https://json.astrologyapi.com/v1";

// Type definition for birth data
export interface BirthData {
  dob: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
  lat: number;
  lon: number;
  tzone?: number; // Timezone, defaults to UTC if not provided
}

const getAuthHeader = (userId: string, apiKey: string) => {
  const authString = `${userId}:${apiKey}`;
  const encodedAuthString = btoa(authString); // Use btoa for browser environment
  return `Basic ${encodedAuthString}`;
};

export const getNatalChart = async (userData: BirthData) => {
  const userId = import.meta.env.VITE_ASTROLOGY_API_USER_ID;
  const apiKey = import.meta.env.VITE_ASTROLOGY_API_KEY;

  if (!userId || !apiKey) {
    throw new Error("API credentials are not configured in the environment.");
  }

  const [year, month, day] = userData.dob.split('-').map(Number);
  const [hour, min] = userData.time.split(':').map(Number);

  const response = await fetch(`${API_URL}/natal_chart`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(userId, apiKey),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      day,
      month,
      year,
      hour,
      min,
      lat: userData.lat,
      lon: userData.lon,
      tzone: userData.tzone || 0,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch natal chart: ${response.status} ${errorBody}`);
  }

  return response.json();
};

/**
 * A specific function for the Vite application to test the API connection.
 * It automatically uses the environment variables from import.meta.env.
 */
export const testApiConnection = () => {
    const userId = import.meta.env.VITE_ASTROLOGY_API_USER_ID;
    const apiKey = import.meta.env.VITE_ASTROLOGY_API_KEY;
    // We can reuse the getNatalChart function for a simple connection test
    const testData: BirthData = {
        dob: "2000-01-01",
        time: "12:00",
        lat: 0,
        lon: 0,
    };
    console.log("Running API connection test...");
    getNatalChart(testData)
        .then(data => console.log("API Connection Test Successful:", data))
        .catch(error => console.error("API Connection Test Failed:", error));
};
};
