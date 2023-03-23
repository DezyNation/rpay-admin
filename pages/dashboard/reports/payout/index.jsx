import React, { useState, useEffect } from 'react'
import Layout from '../../layout'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  Box,
  Button,
} from '@chakra-ui/react'

const Index = () => {
  const [rowData, setRowData] = useState([])
  const [colDefs, setColDefs] = useState([])

  return (
    <>
      <Layout pageTitle={'Payout Reports'}>

        <Box className={'ag-theme-alpine'}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
          >
          </AgGridReact>
        </Box>

      </Layout>
    </>
  )
}

export default Index