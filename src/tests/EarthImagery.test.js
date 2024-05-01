import React from 'react';
import { render, screen } from '@testing-library/react';
import BasicExample from '../components/About';

describe('BasicExample component', () => {
    it('renders Astronomy Picture of the Day card', () => {
      render(<BasicExample />);
      const apodCardTitles = screen.getAllByText(/Astronomy Picture of the Day \(APOD\)/i);
      expect(apodCardTitles.length).toBeGreaterThan(0);
  
      const apodExploreButtons = screen.getAllByRole('button', { name: /explore now/i });
      expect(apodExploreButtons.length).toBeGreaterThan(0);
    });
  
    it('renders Earth Imagery APIs card', () => {
      render(<BasicExample />);
      const earthCardTitles = screen.getAllByText(/Earth Imagery APIs \(Earth\)/i);
      expect(earthCardTitles.length).toBeGreaterThan(0);
  
      const earthExploreButtons = screen.getAllByRole('button', { name: /explore now/i });
      expect(earthExploreButtons.length).toBeGreaterThan(0);
    });
  });