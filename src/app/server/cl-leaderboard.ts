'use server';

import { kv } from '@vercel/kv';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';

interface LeaderboardEntry {
  id: number;
  name: string;
  points: number;
}

interface ILeaderboardResponse {
  data: string;
  error: string | null;
  status: string;
}

let memoryCache: {
  data: LeaderboardEntry[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const CACHE_KEY = 'leaderboard_data';

export async function getLeaderboardData(): Promise<ILeaderboardResponse> {
  try {
    // Check memory cache first
    if (memoryCache.data && Date.now() - memoryCache.timestamp < CACHE_DURATION) {
      console.log('Serving from memory cache');
      return { data: JSON.stringify(memoryCache.data), error: null, status: 'success' };
    }

    // Try Vercel KV
    try {
      const cachedData = await kv.get<LeaderboardEntry[]>(CACHE_KEY);
      if (cachedData) {
        console.log('Serving from KV cache');
        // Update memory cache
        memoryCache = {
          data: cachedData,
          timestamp: Date.now(),
        };
        return { data: JSON.stringify(cachedData), error: null, status: 'success' };
      }
    } catch (kvError) {
      console.warn('KV cache unavailable:', kvError);
    }

    // If no cache hit, fetch from Google Sheets
    console.log('Fetching from Google Sheets');
    const freshData = await fetchFromGoogleSheets();

    // Update both caches
    try {
      await kv.set(CACHE_KEY, freshData, { ex: CACHE_DURATION / 1000 });
    } catch (kvError) {
      console.warn('Failed to update KV cache:', kvError);
    }

    memoryCache = {
      data: freshData,
      timestamp: Date.now(),
    };

    return { data: JSON.stringify(memoryCache.data), error: null, status: 'success' };
  } catch (error) {
    if (memoryCache.data) {
      console.log('Serving stale memory cache due to error');
      return { data: JSON.stringify(memoryCache.data), error: null, status: 'success' };
    }
    return { data: "[]", error: (error as Error).message, status: 'success' };
  }
}

async function fetchFromGoogleSheets(): Promise<LeaderboardEntry[]> {
  const jwt = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth: jwt });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!A3:B',
  });

  if (!response.data.values) {
    throw new Error('No data found in sheet');
  }

  return response.data.values.map((row: string[], index: number) => ({
    id: index + 1,
    name: row[0],
    points: parseInt(row[1]),
  }));
}