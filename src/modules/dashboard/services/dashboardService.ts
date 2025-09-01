import { DashboardOverviewResponse, ApiError } from '../domain/types';

const API_BASE_URL = 'https://fm-finance-be.ersaptaaristo.dev/api/v1';

export const dashboardService = {
  async getOverview(): Promise<DashboardOverviewResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/overview`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || `HTTP error! status: ${response.status}`,
          status: response.status,
        } as ApiError;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error && typeof error === 'object' && 'status' in error) {
        throw error as ApiError;
      }
      throw {
        message: error instanceof Error ? error.message : 'Network error occurred',
        status: 0,
      } as ApiError;
    }
  },
};