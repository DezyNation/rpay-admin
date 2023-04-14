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
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useRouter } from 'next/router';

const ExportPDF = () => {
    const doc = new jsPDF('landscape')

    doc.autoTable({ html: '#printable-table' })
    doc.output('dataurlnewwindow');
}



const UserLedger = () => {
    const [userId, setUserId] = useState("")
    const [fetchedUserId, setFetchedUserId] = useState("")
    const [rowData, setRowData] = useState([])
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "Transaction ID",
            field: "transaction_id"
        },
        {
            headerName: "Done By",
            field: 'trigered_by'
        },
        {
            headerName: "Beneficiary",
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
            headerName: "Credit",
            field: "credit_amount"
        },
        {
            headerName: "Debit",
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
    const [printableRow, setPrintableRow] = useState(rowData)
    const [pagination, setPagination] = useState({
        current_page: "1",
        total_pages: "1",
        first_page_url: "",
        last_page_url: "",
        next_page_url: "",
        prev_page_url: "",
    })
    const Router = useRouter()
    const { user_id } = Router.query

    function fetchLedger(pageLink) {
        BackendAxios.get(pageLink || `/api/admin/transactions?page=1`).then((res) => {
            setPagination({
                current_page: res.data.current_page,
                total_pages: parseInt(res.data.last_page),
                first_page_url: res.data.first_page_url,
                last_page_url: res.data.last_page_url,
                next_page_url: res.data.next_page_url,
                prev_page_url: res.data.prev_page_url,
            })
            setRowData(res.data.data)
            setPrintableRow(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (Router.isReady && user_id) {
            BackendAxios.get(`/api/admin/transactions-user/${user_id}?page=1`).then((res) => {
                setPagination({
                    current_page: res.data.current_page,
                    total_pages: parseInt(res.data.last_page),
                    first_page_url: res.data.first_page_url,
                    last_page_url: res.data.last_page_url,
                    next_page_url: res.data.next_page_url,
                    prev_page_url: res.data.prev_page_url,
                })
                setRowData(res.data.data)
                setPrintableRow(res.data.data)
                setUserId(user_id)
            }).catch(err => {
                console.log(err)
            })
        }
        else {
            fetchLedger()
        }
    }, [Router.isReady])

    function fetchUserLedger() {
        // Logic to verifiy beneficiary details
        BackendAxios.post(`/api/admin/user/info/${userId}`).then((res) => {
            setFetchedUserId(res.data.data.id)
            fetchLedger(`/api/admin/transactions-user/${res.data.data.id}?page=1`)
        }).catch((err) => {
            Toast({
                status: 'error',
                description: 'User not found!'
            })
            setFetchedUserId("")
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
                                name={'userId'} value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder={'Enter User ID'}
                            />
                            <InputRightAddon
                                children={'Fetch'}
                                cursor={'pointer'}
                                onClick={() => fetchUserLedger()}
                            />
                        </InputGroup>
                    </FormControl>

                    <HStack mt={12} pb={4} justifyContent={'flex-end'}>
                        <Button colorScheme={'red'} onClick={ExportPDF} size={'sm'}>Export PDF</Button>
                    </HStack>
                    <HStack spacing={2} py={4} bg={'white'} justifyContent={'center'}>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchLedger(pagination.first_page_url)}
                        ><BsChevronDoubleLeft />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchLedger(pagination.prev_page_url)}
                        ><BsChevronLeft />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'solid'}
                        >{pagination.current_page}</Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchLedger(pagination.next_page_url)}
                        ><BsChevronRight />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchLedger(pagination.last_page_url)}
                        ><BsChevronDoubleRight />
                        </Button>
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
                            onFilterChanged={
                                (params) => {
                                    setPrintableRow(params.api.getRenderedNodes().map((item) => {
                                        return (
                                            item.data
                                        )
                                    }))
                                }
                            }
                        >

                        </AgGridReact>
                    </Box>
                    <HStack spacing={2} py={4} bg={'white'} justifyContent={'center'}>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchLedger(pagination.first_page_url)}
                        ><BsChevronDoubleLeft />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchLedger(pagination.prev_page_url)}
                        ><BsChevronLeft />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'solid'}
                        >{pagination.current_page}</Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchLedger(pagination.next_page_url)}
                        ><BsChevronRight />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchLedger(pagination.last_page_url)}
                        ><BsChevronDoubleRight />
                        </Button>
                    </HStack>

                    <VisuallyHidden>
                        <table id='printable-table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {
                                        columnDefs.filter((column) => {
                                            if (column.headerName != "Description") {
                                                return (
                                                    column
                                                )
                                            }
                                        }).map((column, key) => {
                                            return (
                                                <th key={key}>{column.headerName}</th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    printableRow.map((data, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{data.transaction_id}</td>
                                                <td>{data.done_by}</td>
                                                <td>{data.name}</td>
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