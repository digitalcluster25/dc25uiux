import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  
  it('renders with custom props', () => {
    const customProps = {
      // Add your test props here
    };
    render(<Button {...customProps} />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });
  

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Button className={customClass} />);
    expect(screen.getByTestId('button')).toHaveClass(customClass);
  });
});
