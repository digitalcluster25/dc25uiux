import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Flex } from '../Flex';

describe('Flex', () => {
  it('renders without crashing', () => {
    render(<Flex />);
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });

  
  it('renders with custom props', () => {
    const customProps = {
      // Add your test props here
    };
    render(<Flex {...customProps} />);
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });
  

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Flex className={customClass} />);
    expect(screen.getByTestId('flex')).toHaveClass(customClass);
  });
});
