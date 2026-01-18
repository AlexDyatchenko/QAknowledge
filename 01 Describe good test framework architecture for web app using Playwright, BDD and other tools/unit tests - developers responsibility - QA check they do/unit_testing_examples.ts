// ============================================================================
// 1. UTILS TEST - tests/unit/utils/formatCurrency.test.ts
// ============================================================================
// Purpose: Test pure functions with clear inputs/outputs
// Format: Arrange → Act → Assert (AAA pattern)

import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/utils/formatCurrency';

describe('formatCurrency', () => {
  describe('valid inputs', () => {
    it('should format USD amount with 2 decimal places', () => {
      // Arrange
      const amount = 1234.5;

      // Act
      const result = formatCurrency(amount, 'USD');

      // Assert
      expect(result).toBe('$1,234.50');
    });

    it('should handle EUR with proper symbol', () => {
      const result = formatCurrency(1234.5, 'EUR');
      expect(result).toBe('€1,234.50');
    });

    it('should round to nearest cent', () => {
      expect(formatCurrency(10.666, 'USD')).toBe('$10.67');
      expect(formatCurrency(10.664, 'USD')).toBe('$10.66');
    });

    it('should format zero amount', () => {
      expect(formatCurrency(0, 'USD')).toBe('$0.00');
    });

    it('should handle large numbers', () => {
      expect(formatCurrency(1000000, 'USD')).toBe('$1,000,000.00');
    });
  });

  describe('edge cases', () => {
    it('should handle negative amounts', () => {
      expect(formatCurrency(-99.99, 'USD')).toBe('-$99.99');
    });

    it('should throw error for invalid currency', () => {
      expect(() => formatCurrency(100, 'INVALID')).toThrow(
        'Unsupported currency: INVALID'
      );
    });

    it('should handle very small positive numbers', () => {
      expect(formatCurrency(0.01, 'USD')).toBe('$0.01');
    });
  });

  describe('localization', () => {
    it('should respect locale parameter for decimal separator', () => {
      // German locale uses comma as decimal separator
      const result = formatCurrency(1234.5, 'EUR', 'de-DE');
      expect(result).toBe('€1.234,50');
    });
  });
});