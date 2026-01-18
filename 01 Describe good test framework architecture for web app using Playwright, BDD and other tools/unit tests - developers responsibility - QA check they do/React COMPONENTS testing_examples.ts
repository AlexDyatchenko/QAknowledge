// ============================================================================
// 3. COMPONENTS TEST - tests/unit/components/Button.test.tsx
// ============================================================================
// Purpose: Test React component rendering, props, and user interactions
// Format: Render → Query → Interact → Assert

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Button';

describe('Button', () => {
  describe('rendering', () => {
    it('should render button with text', () => {
      render(<Button>Click me </Button>);

      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('should render with primary variant by default', () => {
      render(<Button>Submit </Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-primary');
    });

    it('should apply secondary variant when specified', () => {
      render(<Button variant="secondary" > Cancel </Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-secondary');
    });

    it('should render as disabled when disabled prop is true', () => {
      render(<Button disabled > Disabled </Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should render with loading state', () => {
      render(<Button isLoading > Loading </Button>);

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-busy',
        'true'
      );
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('user interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={ handleClick } > Click </Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button disabled onClick = { handleClick } >
        Click
        </Button>
      );

      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button isLoading onClick = { handleClick } >
        Submit
        </Button>
      );

      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('size variations', () => {
    it('should support small size', () => {
      render(<Button size="small" > Small </Button>);

      expect(screen.getByRole('button')).toHaveClass('btn-small');
    });

    it('should support medium size', () => {
      render(<Button size="medium" > Medium </Button>);

      expect(screen.getByRole('button')).toHaveClass('btn-medium');
    });

    it('should support large size', () => {
      render(<Button size="large" > Large </Button>);

      expect(screen.getByRole('button')).toHaveClass('btn-large');
    });
  });

  describe('accessibility', () => {
    it('should have semantic button role', () => {
      render(<Button>Accessible </Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should support aria-label for icon-only buttons', () => {
      render(<Button aria - label="Close dialog" >✕</Button>);

      expect(screen.getByRole('button', { name: /close dialog/i }))
        .toBeInTheDocument();
    });
  });
});
