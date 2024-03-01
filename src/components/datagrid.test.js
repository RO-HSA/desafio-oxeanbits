import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DataGrid from './datagrid';
import useSWR from 'swr';

jest.mock('swr');

describe('DataGrid Component', () => {
  it('renders without crashing', () => {
      useSWR.mockReturnValue({ data: undefined, isLoading: true });

      render(<DataGrid />);

      expect(<DataGrid />).toBeDefined();
  });

  it('renders with data', async () => {
      const mockData = {
          stocks: [
              { stock: 'MGLU3', name: 'MAGAZINE LUIZA', close: 2.13, change: -1.84331797, volume: 75685900, sector: 'Retail Trade' },
          ],
      };

      useSWR.mockReturnValue({ data: mockData, isLoading: false });

      render(<DataGrid />);

      expect(screen.getByText('MGLU3')).toBeInTheDocument();
  });

  it('filters data correctly', async () => {
    const mockData = {
      stocks: [
        { stock: 'MGLU3', name: 'MAGAZINE LUIZA', close: 2.13, change: -1.84331797, volume: 75685900, sector: 'Retail Trade' },
        { stock: 'ABEV3', name: 'AMBEV S/A', close: 12.58, change: -6.46840149, volume: 88182100, sector: 'Consumer Non-Durables' },
      ],
    };

    useSWR.mockReturnValue({ data: mockData, isLoading: false });

    render(<DataGrid />);

    fireEvent.change(screen.getByPlaceholderText('Search in all columns...'), { target: { value: 'MGLU3' } });

    const gridCellArr = await screen.findAllByRole('gridcell');
    expect(gridCellArr[0]).toHaveTextContent('MGLU3');
  });
});
