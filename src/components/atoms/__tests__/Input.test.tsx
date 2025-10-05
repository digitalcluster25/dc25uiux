import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from '../Input';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  
  it('renders with custom props', () => {
    const customProps = {
      // Add your test props here
    };
    render(<Input {...customProps} />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });
  

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Input className={customClass} />);
    expect(screen.getByTestId('input')).toHaveClass(customClass);
  });
});
