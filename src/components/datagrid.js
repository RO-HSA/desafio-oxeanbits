import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'
import { Input } from '@progress/kendo-react-inputs';
import { filterBy } from "@progress/kendo-data-query"

import fetcher from '../utils/fetcher';

const DataGrid = () => {

    const [filter, setFilter] = useState()
      const [stocks, setStocks] = useState()
    
      const url = `https://brapi.dev/api/quote/list`
      const { data, isLoading } = useSWR(url, fetcher)
    
      useEffect(() => {
        if (!isLoading) {
          setStocks(data.stocks)
        }
      }, [isLoading, data])
    
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
              field: "sector",
              operator: "contains",
              value: value,
            },
          ],
        };
        setStocks(filterBy(data.stocks, filter));
      }
    return (
        <Grid
            style={{height: '920px', width: '100vw'}}
            data={filterBy(stocks, filter) || []}
            filterable={true}
            filter={filter}
            size='small'
            onFilterChange={(e) => setFilter(e.filter)}
            >
            <GridToolbar>
                <Input onChange={filterData} style={{width: '170px'}} placeholder='Search in all columns...' data-testid="search-all-columns"/>
            </GridToolbar>
            <Column field='stock' title='Stock' width={300} />
            <Column field='name' title='Company Name' width={300}/>
            <Column field='close' title='Close' width={300}/>
            <Column field='change' title='Change' width={300}/>
            <Column field='volume' title='Volume' width={300}/>
            <Column field='sector' title='Sector' width={300}/>
        </Grid>
    )
}

export default DataGrid;