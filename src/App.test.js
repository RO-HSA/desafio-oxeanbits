import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import DataGrid from './components/datagrid';

jest.mock('./components/datagrid', () => jest.fn(() => null));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders DataGrid component', async () => {
    render(<App />);

    await waitFor(() => expect(DataGrid).toHaveBeenCalled());
  });
});