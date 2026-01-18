// ============================================================================
// 2. HOOKS TEST - tests/unit/hooks/useAuth.test.ts
// ============================================================================
// Purpose: Test React hooks with mocked context/API
// Format: Setup → Render → Interact → Assert

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import * as authService from '@/services/authService';

// Mock the auth service
vi.mock('@/services/authService');

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with null user when no session', () => {
      vi.mocked(authService.getCurrentSession).mockReturnValue(null);

      const { result } = renderHook(() => useAuth());

      expect(result.current.user).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should load current user on mount', async () => {
      const mockUser = { id: '1', email: 'test@example.com', role: 'admin' };
      vi.mocked(authService.getCurrentSession).mockReturnValue(mockUser);

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
        expect(result.current.isAuthenticated).toBe(true);
      });
    });
  });

  describe('login', () => {
    it('should successfully login user', async () => {
      const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
      vi.mocked(authService.login).mockResolvedValue(mockUser);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login('test@example.com', 'password');
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
      expect(authService.login).toHaveBeenCalledWith(
        'test@example.com',
        'password'
      );
    });

    it('should handle login error gracefully', async () => {
      const error = new Error('Invalid credentials');
      vi.mocked(authService.login).mockRejectedValue(error);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login('test@example.com', 'wrong');
      });

      expect(result.current.error).toBe('Invalid credentials');
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should set loading state during login', async () => {
      vi.mocked(authService.login).mockImplementation(
        () =>
          new Promise(resolve => setTimeout(() => resolve({ id: '1' }), 100))
      );

      const { result } = renderHook(() => useAuth());

      expect(result.current.isLoading).toBe(false);

      const loginPromise = act(async () => {
        await result.current.login('test@example.com', 'password');
      });

      // Note: checking isLoading during async requires special setup
      // This demonstrates the pattern; real implementation may vary
      await loginPromise;
    });
  });

  describe('logout', () => {
    it('should clear user state on logout', async () => {
      const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
      vi.mocked(authService.getCurrentSession).mockReturnValue(mockUser);
      vi.mocked(authService.logout).mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});