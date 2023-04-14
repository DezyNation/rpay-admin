import React, { useState, useEffect, useMemo } from 'react'
import {
    Box,
    Stack,
    Text,
    Button,
} from '@chakra-ui/react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Layout from '../layout';
import BackendAxios from '@/lib/utils/axios';

const SupportTickets = () => {
    const [rowData, setRowData] = useState([])
    const [columnDefs, setColumnDefs] = useState([
        {
            field: "id",
            headerName: "Ticket ID"
        },
        {
            field: "title",
            headerName: "Title",
        },
        {
            field: "body",
            headerName: "Message",
        },
        {
            field: "attachments",
            headerName: "Attachments",
            cellRenderer: 'attachmentRenderer'
        },
        {
            field: "transaction_id",
            headerName: "Linked Transaction ID",
        },
        {
            field: "status",
            headerName: "Status",
        },
        {
            field: "created_at",
            headerName: "Created At",
        },
        {
            field: "updated_at",
            headerName: "Updated At",
        },
    ])

    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            filter: true,
            floatingFilter: true
        };
    }, []);


    const attachmentRenderer = (params) => {
        return (
            <Button size={'xs'} colorScheme={'twitter'}>Download</Button>
        )
    }

    useEffect(() => {
        BackendAxios.get('/api/admin/tickets').then(res => {
            setRowData(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }, [])

    return (
        <>
            <Layout pageTitle={'Support Tickets'}>
                <Box w={'full'} h={12}></Box>
                <Box h={'sm'} w={'full'} className='ag-theme-alpine'>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        components={{
                            'attachmentRenderer': attachmentRenderer
                        }}
                    >

                    </AgGridReact>
                </Box>
            </Layout>
        </>
    )
}

export default SupportTickets