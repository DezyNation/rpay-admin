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

const Ledger = () => {
    const [rowData, setrowData] = useState([])
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "Transaction ID",
            field: "transaction_id"
        },
        {
            headerName: "Done By",
            field: "trigered_by"
        },
        {
            headerName: "User Name",
            field: "name"
        },
        {
            headerName: "Description",
            field: "transaction_for"
        },
        {
            headerName: "Type",
            field: "service_type"
        },
        {
            headerName: "Credit Amount",
            field: "credit_amount"
        },
        {
            headerName: "Debit Amount",
            field: "debit_amount"
        },
        {
            headerName: "Opening Balance",
            field: "opening_balance"
        },
        {
            headerName: "Closing Balance",
            field: "closing_balance"
        },
        {
            headerName: "Timestamp",
            field: "created_at"
        },
    ])

    useEffect(()=>{
        BackendAxios.get('/api/admin/transactions-period').then((res)=>{
            console.log(res.data)
            setrowData(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])


    return (
        <>
            <Layout pageTitle={'Transactions Ledger'}>
                <HStack my={4} justifyContent={'space-between'}>
                    <Text fontSize={'lg'} fontWeight={'semibold'}>Transactions Ledger</Text>
                    <Button onClick={ExportPDF} colorScheme={'red'} size={'sm'}>Export PDF</Button>
                </HStack>

                <Box className='ag-theme-alpine' h={'sm'}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        defaultColDef={{
                            filter: true,
                            floatingFilter: true,
                            resizable: true,
                        }}
                    >

                    </AgGridReact>
                </Box>

                <VisuallyHidden>
                    <table id='printable-table'>
                        <thead>
                            <tr>
                                <td>#</td>
                                {
                                    columnDefs.map((column, key) => {
                                        return (
                                            <td key={key}>{column.headerName}</td>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rowData.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{data.transaction_id}</td>
                                            <td>{data.trigered_by}</td>
                                            <td>{data.name}</td>
                                            <td>{data.description}</td>
                                            <td>{data.service_type}</td>
                                            <td>{data.credit_amount}</td>
                                            <td>{data.debit_amount}</td>
                                            <td>{data.opening_balance}</td>
                                            <td>{data.closing_balance}</td>
                                            <td>{data.created_at}</td>
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

export default Ledger