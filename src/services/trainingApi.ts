import { store } from '../store';
import { config } from '../config/env';

const BASE_URL = '/training';

// Get the base URL for trade identity API
const getApiBaseUrl = (): string => {
  return config.apiEndpoints.tradeIdentity;
};

export interface TrainingSession {
  date: string; // Format: dd/MM/yyyy
  startTime: string; // Format: HH:mm:ss
  endTime: string; // Format: HH:mm:ss
}

export interface Training {
  trainingId: number;
  firstSession: TrainingSession;
  secondSession: TrainingSession;
  thirdSession?: TrainingSession;
}

export interface CreateTrainingRequest {
  firstSession: {
    date: string; // Format: dd/MM/yyyy
    startTime: string; // Format: HH:mm
    endTime: string; // Format: HH:mm
  };
  secondSession: {
    date: string; // Format: dd/MM/yyyy
    startTime: string; // Format: HH:mm
    endTime: string; // Format: HH:mm
  };
  thirdSession?: {
    date: string; // Format: dd/MM/yyyy
    startTime: string; // Format: HH:mm
    endTime: string; // Format: HH:mm
  };
}

export interface CreateTrainingResponse extends Training {}

export interface EnrolledUser {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  status: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  originCountry: string | null;
  destinationCountry: string | null;
  productType: string | null;
  roles: string | null;
  appNotificationEnabled: boolean;
  emailNotificationEnabled: boolean;
  phoneNotificationEnabled: boolean;
}

// Get auth token from Redux store
const getAuthToken = (): string | null => {
  const state = store.getState();
  return state.auth.token;
};

/**
 * Get all training schedules
 */
export const getAllTrainings = async (): Promise<Training[]> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${getApiBaseUrl()}${BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trainings:', error);
    throw error;
  }
};

/**
 * Create a new training schedule
 */
export const createTraining = async (
  data: CreateTrainingRequest
): Promise<CreateTrainingResponse> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${getApiBaseUrl()}${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating training:', error);
    throw error;
  }
};

/**
 * Enroll a user in a training schedule
 */
export const enrollUserInTraining = async (
  userId: number,
  trainingId: number
): Promise<string> => {
  try {
    const token = getAuthToken();
    const response = await fetch(
      `${getApiBaseUrl()}/training/user/${userId}/training/${trainingId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Error enrolling user in training:', error);
    throw error;
  }
};

/**
 * Get all trainings for a specific user (enrolled trainings)
 */
export const getUserTrainings = async (userId: number): Promise<Training[]> => {
  try {
    const token = getAuthToken();
    const response = await fetch(
      `${getApiBaseUrl()}/training/user/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user trainings:', error);
    throw error;
  }
};

/**
 * Get all enrolled users for a specific training
 */
export const getEnrolledUsers = async (trainingId: number): Promise<EnrolledUser[]> => {
  try {
    const token = getAuthToken();
    const response = await fetch(
      `${getApiBaseUrl()}${BASE_URL}/${trainingId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching enrolled users:', error);
    throw error;
  }
};

/**
 * Delete a training schedule
 */
export const deleteTraining = async (trainingId: number): Promise<string> => {
  try {
    const token = getAuthToken();
    const response = await fetch(
      `${getApiBaseUrl()}${BASE_URL}/${trainingId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Error deleting training:', error);
    throw error;
  }
};

/**
 * Utility: Convert Date object to dd/MM/yyyy format
 */
export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Utility: Parse dd/MM/yyyy string to Date object
 */
export const parseDDMMYYYYToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Utility: Format time from HH:mm:ss to HH:mm
 */
export const formatTimeToHHMM = (time: string): string => {
  return time.slice(0, 5); // '13:00:00' -> '13:00'
};

/**
 * Utility: Get day name and formatted date for display
 */
export const getDisplayDate = (dateString: string): string => {
  const date = parseDDMMYYYYToDate(dateString);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayName = dayNames[date.getDay()];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  
  return `${dayName}, ${day} ${month}`;
};