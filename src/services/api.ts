import { HealthLog } from '../state/HealthContext';

// On web (Expo web / browser), the frontend is served from the same origin as the backend,
// so relative URLs work. On native (iOS/Android device), use your machine's LAN IP.
// To use a physical device, set EXPO_PUBLIC_API_URL in your .env file, e.g.:
//   EXPO_PUBLIC_API_URL=http://192.168.1.100:5000/api
const API_BASE_URL =
  (typeof process !== 'undefined' && (process.env as any).EXPO_PUBLIC_API_URL) ||
  'http://localhost:5000/api';

export interface Patient {
  userId: string;
  patientName: string;
  contactNumber?: string;
}

export interface SavedPatientSummary {
  userId: string;
  patientName: string;
  contactNumber?: string;
  recordCount: number;
  lastLogDate?: string;
}

export async function fetchSavedPatientsApi(): Promise<SavedPatientSummary[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/patients`);
    const data = await response.json();
    if (response.ok && data.success) {
      return data.patients || [];
    }
    return [];
  } catch (err) {
    console.warn('Backend API fetch saved patients error:', err);
    return [];
  }
}

export async function deletePatientAccountApi(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/${encodeURIComponent(userId)}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return response.ok && data.success;
  } catch (err) {
    console.warn('Backend API delete patient error:', err);
    return false;
  }
}

export async function loginPatientApi(
  userId: string,
  patientName?: string,
  contactNumber?: string
): Promise<Patient> {
  const response = await fetch(`${API_BASE_URL}/patients/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, patientName, contactNumber }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to authenticate patient');
  }

  return data.patient;
}

export async function fetchPatientLogsApi(userId: string): Promise<HealthLog[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/${encodeURIComponent(userId)}/logs`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to fetch patient logs');
    }

    return (data.logs || []).map((log: any) => ({
      ...log,
      createdAt: new Date(log.createdAt || log.eventDateTime),
      eventDateTime: new Date(log.eventDateTime),
    }));
  } catch (err) {
    console.warn('Backend API fetch logs error:', err);
    return [];
  }
}

export async function savePatientLogApi(userId: string, log: HealthLog): Promise<HealthLog> {
  const response = await fetch(`${API_BASE_URL}/patients/${encodeURIComponent(userId)}/logs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to save patient log');
  }

  return {
    ...data.log,
    createdAt: new Date(data.log.createdAt || data.log.eventDateTime),
    eventDateTime: new Date(data.log.eventDateTime),
  };
}

export async function deletePatientLogApi(userId: string, logId: string): Promise<boolean> {
  const response = await fetch(
    `${API_BASE_URL}/patients/${encodeURIComponent(userId)}/logs/${encodeURIComponent(logId)}`,
    {
      method: 'DELETE',
    }
  );

  const data = await response.json();
  return response.ok && data.success;
}
