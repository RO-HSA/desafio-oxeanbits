import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'
import { Input } from '@progress/kendo-react-inputs';
import { filterBy } from "@progress/kendo-data-query"

import fetcher from './utils/fetcher';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

function App() {
  const [filter, setFilter] = useState()
  const [stocks, setStocks] = useState()

  const url = `https://brapi.dev/api/quote/list?token=${process.env.API_TOKEN}`
  const { data, isLoading } = useSWR(url, fetcher)

  useEffect(() => {
    if (!isLoading) {
      setStocks(data.stocks)
    }
  }, [isLoading])

  const filterData = (e) => {
    let value = e.target.value;
    let filter = {
      logic: "or",
      filters: [
        {
          field: "stock",
          operator: "contains",
          value: value,
        },
        {
          field: "name",
          operator: "contains",
          value: value,
        },
        {
          field: "close",
          operator: "eq",
          value: value,
        },
        {
          field: "change",
          operator: "eq",
          value: value,
        },
        {
          field: "volume",
          operator: "contains",
          value: value,
        },
        {
          field: "market_cap",
          operator: "contains",
          value: value,
        },
        {
          field: "sector",
          operator: "contains",
          value: value,
        },
        {
          field: "type",
          operator: "contains",
          value: value,
        },
      ],
    };
    setStocks(filterBy(data.stocks, filter));
  }

  return (
    <div className="App">
      <Grid
        style={{height: '100%', width: '100%'}}
        data={stocks}
        filterable={true}
        filter={filter}
        onFilterChange={(e) => setFilter(e.filter)}
      >
        <GridToolbar>
          <Input onChange={filterData}/>
        </GridToolbar>
        <Column field='stock' title='Stock'/>
        <Column field='name' title='Company Name'/>
        <Column field='close' title='Close'/>
        <Column field='change' title='Change'/>
        <Column field='volume' title='Volume'/>
        <Column field='market_cap' title='Market Cap'/>
        <Column field='sector' title='Sector'/>
        <Column field='type' title='Type'/>
      </Grid>
    </div>
  );
}

export default App;
