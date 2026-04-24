import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StepCard from './StepCard';

describe('StepCard', () => {
  const mockStep = {
    id: 1,
    title: 'Test Step',
    timeline: 'Jan 1',
    description: 'This is a test description.',
    icon: '🚀'
  };

  it('renders correctly with given props', () => {
    render(<StepCard step={mockStep} />);
    
    expect(screen.getByText('Test Step')).toBeInTheDocument();
    expect(screen.getByText('Jan 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
  });
});
