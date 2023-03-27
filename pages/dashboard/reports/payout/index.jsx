import React, { useState, useEffect } from 'react'
import Layout from '../../layout'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  Box,
  Button,
  Text,
  HStack,
  VisuallyHidden,
} from '@chakra-ui/react'
import BackendAxios from '@/lib/utils/axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

const ExportPDF = () => {
  const doc = new jsPDF('landscape')

  doc.autoTable({ html: '#printable-table' })
  doc.output('dataurlnewwindow');
}

const Index = () => {
  const [rowData, setRowData] = useState([])
  const [colDefs, setColDefs] = useState([
    {
      headerName: "Payout ID",
      field: "payout_id",
    },
    {
      headerName: "Amount",
      field: "amount",
    },
    {
      headerName: "Beneficiary",
      field: "beneficiary_name",
    },
    {
      headerName: "Account",
      field: "account_number",
    },
    {
      headerName: "Reference ID",
      field: "reference_id",
    },
    {
      headerName: "Status",
      field: "status",
      editable: true,
      cellEditor: 'agGridSelectEditor',
      cellEditorParams: {
        values: ['processing', 'processed', 'reversed']
      }
    },
    {
      headerName: "Created By User",
      field: "user_id",
    },
    {
      headerName: "Timestamp",
      field: "created_at",
    },
  ])

  function onColumnMoved(params) {
    var columnState = JSON.stringify(params.columnApi.getColumnState());
    localStorage.setItem('payout_reportsColumns', columnState);
  }

  function onGridReady(params) {
    var columnState = JSON.parse(localStorage.getItem('payout_reportsColumns'));
    if (columnState) {
      params.columnApi.applyColumnState({state: columnState, applyOrder: true});
    }
  }

  useEffect(() => {
    BackendAxios.post('/api/admin/razorpay/fetch-payout').then((res) => {
      console.log(res.data)
      setRowData(res.data.map((payout) => {
        return payout
      }))
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <Layout pageTitle={'Payout Reports'}>

        <HStack my={8} justifyContent={'space-between'}>
          <Text fontSize={'lg'} fontWeight={'semibold'}>Payout Report</Text>
          <Button colorScheme={'red'} onClick={ExportPDF} size={'sm'}>Export PDF</Button>
        </HStack>
        <Box className={'ag-theme-alpine'} h={'sm'}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={{
              filter: true,
              floatingFilter: true,
              resizable: true,
            }}
            onColumnMoved={onColumnMoved}
            onGridReady={onGridReady}
          >
          </AgGridReact>
        </Box>

        <VisuallyHidden>
          <table id={'printable-table'}>
            <thead>
              <tr>
                <td>#</td>
                {
                  colDefs.map((def, key) => {
                    return <th key={key}>{def.headerName}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                rowData.map((data, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{data.payout_id}</td>
                      <td>{data.amount}</td>
                      <td>{data.beneficiary_name}</td>
                      <td>{data.account_number}</td>
                      <td>{data.reference_id}</td>
                      <td>{data.status}</td>
                      <td>{data.user_id}</td>
                      <td>{data.timestamp}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </VisuallyHidden>

      </Layout>
    </>
  )
}

export default Index