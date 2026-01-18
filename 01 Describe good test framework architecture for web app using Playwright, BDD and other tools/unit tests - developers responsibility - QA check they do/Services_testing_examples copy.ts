// ============================================================================
// 4. SERVICES TEST - tests/unit/services/userService.test.ts
// ============================================================================
// Purpose: Test API calls, data transformation, error handling
// Format: Mock API → Call service → Verify response/side effects

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { userService } from '@/services/userService';
import { apiClient } from '@/lib/apiClient';

// Mock the API client
vi.mock('@/lib/apiClient');

interface User {
  id: string;
  email: string;
  name: string;
}

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getUser', () => {
    it('should fetch user and return formatted data', async () => {
      const mockResponse = {
        user_id: '123',
        user_email: 'test@example.com',
        user_name: 'John Doe',
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      const result = await userService.getUser('123');

      expect(result).toEqual({
        id: '123',
        email: 'test@example.com',
        name: 'John Doe',
      });
      expect(apiClient.get).toHaveBeenCalledWith('/users/123');
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      vi.mocked(apiClient.get).mockRejectedValue(error);

      await expect(userService.getUser('123')).rejects.toThrow(
        'Failed to fetch user'
      );
    });

    it('should handle not found error with specific message', async () => {
      const notFoundError = new Error('Not Found');
      (notFoundError as any).status = 404;
      vi.mocked(apiClient.get).mockRejectedValue(notFoundError);

      await expect(userService.getUser('999')).rejects.toThrow(
        'User not found'
      );
    });
  });

  describe('updateUser', () => {
    it('should send PUT request with updated data', async () => {
      const updateData = { name: 'Jane Doe', email: 'jane@example.com' };
      const mockResponse = { id: '123', ...updateData };

      vi.mocked(apiClient.put).mockResolvedValue(mockResponse);

      const result = await userService.updateUser('123', updateData);

      expect(result).toEqual(mockResponse);
      expect(apiClient.put).toHaveBeenCalledWith('/users/123', updateData);
    });

    it('should validate email format before sending', async () => {
      const invalidData = { email: 'invalid-email' };

      await expect(
        userService.updateUser('123', invalidData)
      ).rejects.toThrow('Invalid email format');

      expect(apiClient.put).not.toHaveBeenCalled();
    });

    it('should not send request if no changes', async () => {
      const result = await userService.updateUser('123', {});

      expect(result).toEqual({});
      expect(apiClient.put).not.toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should send DELETE request and return success', async () => {
      vi.mocked(apiClient.delete).mockResolvedValue({
        success: true,
      });

      const result = await userService.deleteUser('123');

      expect(result).toBe(true);
      expect(apiClient.delete).toHaveBeenCalledWith('/users/123');
    });

    it('should handle deletion errors', async () => {
      const error = new Error('Forbidden');
      (error as any).status = 403;
      vi.mocked(apiClient.delete).mockRejectedValue(error);

      await expect(userService.deleteUser('123')).rejects.toThrow(
        'Cannot delete user'
      );
    });
  });

  describe('caching behavior', () => {
    it('should return cached user within TTL', async () => {
      const mockResponse = {
        user_id: '123',
        user_email: 'test@example.com',
        user_name: 'John Doe',
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      // First call
      await userService.getUser('123');
      // Second call should use cache
      await userService.getUser('123');

      expect(apiClient.get).toHaveBeenCalledTimes(1);
    });

    it('should invalidate cache after TTL', async () => {
      vi.useFakeTimers();
      const mockResponse = {
        user_id: '123',
        user_email: 'test@example.com',
        user_name: 'John Doe',
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      await userService.getUser('123');
      vi.advanceTimersByTime(6 * 60 * 1000); // Advance 6 minutes
      await userService.getUser('123');

      expect(apiClient.get).toHaveBeenCalledTimes(2);
      vi.useRealTimers();
    });
  });
});
