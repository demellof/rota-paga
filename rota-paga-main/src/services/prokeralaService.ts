// src/services/prokeralaService.ts

const TOKEN_URL = 'https://api.prokerala.com/token';
const API_BASE_URL = 'https://api.prokerala.com/v2/astrology';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

const getAccessToken = async (): Promise<string> => {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const VITE_PROKERALA_CLIENT_ID = import.meta.env.VITE_PROKERALA_CLIENT_ID;
  const VITE_PROKERALA_CLIENT_SECRET = import.meta.env.VITE_PROKERALA_CLIENT_SECRET;

  if (!VITE_PROKERALA_CLIENT_ID || !VITE_PROKERALA_CLIENT_SECRET) {
      throw new Error("Missing Prokerala API credentials in .env file.");
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', VITE_PROKERALA_CLIENT_ID);
  params.append('client_secret', VITE_PROKERALA_CLIENT_SECRET);

  try {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch access token: ${errorData.error_description || response.statusText}`);
    }

    const data: TokenResponse = await response.json();

    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;

    return accessToken;
  } catch (error) {
    console.error("Error fetching Prokerala access token:", error);
    throw error;
  }
};

export const fetchGeoDetails = async (locationName: string) => {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_BASE_URL}/location/geo-details`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'location': locationName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching geo details for ${locationName}:`, error);
    throw error;
  }
};
