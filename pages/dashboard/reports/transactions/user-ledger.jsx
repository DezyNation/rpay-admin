import React, { useState, useEffect } from 'react'
import Layout from '../../layout'
import {
    Box,
    Text,
    Button,
    InputGroup,
    InputRightAddon,
    Input,
    FormControl,
    FormLabel,
    useToast,
    VisuallyHidden,
    HStack,
} from '@chakra-ui/react'
import BackendAxios from '@/lib/utils/axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ExportPDF = () => {
    const doc = new jsPDF('landscape')

    doc.autoTable({ html: '#printable-table' })
    doc.output('dataurlnewwindow');
}



const UserLedger = () => {
    const [rowData, setrowData] = useState([])
    const [userId, setUserId] = useState("")
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

    function fetchLedger() {
        BackendAxios.get(`/api/admin/transactions-user/${userId}`).then((res) => {
            console.log(res.data)
            setrowData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <Layout pageTitle={'User Ledger'}>
                <Box p={4}>
                    <FormControl w={['full', 'xs']}>
                        <FormLabel py={2}>Type User ID To Get His Ledger</FormLabel>
                        <InputGroup>
                            <Input
                                name={'userId'}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder={'Enter User ID'}
                            />
                            <InputRightAddon
                                children={'Fetch'}
                                cursor={'pointer'}
                                onClick={() => fetchLedger()}
                            />
                        </InputGroup>
                    </FormControl>

                    <HStack mt={12} pb={4} justifyContent={'flex-end'}>
                        <Button colorScheme={'red'} onClick={ExportPDF} size={'sm'}>Export PDF</Button>
                    </HStack>
                    <Box className={'ag-theme-alpine'} h={'sm'}>
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
                                    <th>#</th>
                                    {
                                        columnDefs.map((column, key) => {
                                            return (
                                                <th key={key}>{column.headerName}</th>
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
                                                <td>{key + 1}</td>
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

                </Box>

            </Layout>
        </>
    )
}

export default UserLedger