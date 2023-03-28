import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import {
    Stack,
    Text,
    VStack,
    HStack,
    Button,
    Box,
    VisuallyHidden,
    useToast
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { SiMicrosoftexcel } from 'react-icons/si'
import { FaFileCsv, FaFilePdf, FaPrint } from 'react-icons/fa'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import BackendAxios from '@/lib/utils/axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const ExportPDF = () => {
    const doc = new jsPDF('landscape')

    doc.autoTable({ html: '#printable-table' })
    doc.output('dataurlnewwindow');
}

const FundRequests = () => {
    const Toast = useToast({
        position: 'top-right'
    })
    const [rowData, setRowData] = useState([])
    const [columnDefs, setColumnDefs] = useState([
        {
            field: "status",
            headerName: "Status",
            editable: true,
            singleClickEdit: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['processing', 'processed', 'reversed', 'delete']
            }
        },
        { headerName: "Request Timestamp", field: 'created_at' },
        { headerName: "Trnxn ID", field: 'transaction_id' },
        { headerName: "Amount", field: 'amount' },
        { headerName: "Requested Bank", field: 'bank_name' },
        { headerName: "Transaction Type", field: 'transaction_type' },
        { headerName: "Transaction Receipt", field: 'receipt' },
        { headerName: "User Name", field: 'name' },
        { headerName: "User ID", field: 'beneficiary_id' },
        { headerName: "Phone No.", field: 'phone_number' },
        { headerName: "Updated By", field: 'user_id' },
        { headerName: "Remarks", field: 'remarks' },
        {
            headerName: "Admin Remarks",
            field: 'admin_remarks',
            editable: true,
            singleClickEdit: true,
            cellEditor: 'agTextCellEditor',
        },
        { headerName: "Update Timestamp", field: 'updated_at' },
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

    function fetchRequests(pageLink) {
        BackendAxios.get(pageLink || '/api/admin/fetch-fund-requests').then(res => {
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
        fetchRequests()
    }, [])


    function onCellValueChanged(params) {
        if (params.data.status == "reversed" && !params.data.admin_rema) {
            return Toast({
                description: 'Please add your remarks also'
            })
        }
        BackendAxios.post(`/api/admin/update-fund-requests`, params.data).then(res=>{
            Toast({
                status: 'success',
                description: 'Request Updated'
            })
        }).catch(err=>{
            Toast({
                status: 'error',
                description: 'Error while updating'
            })
            console.log(err)
        })
    }

    return (
        <>
            <Layout pageTitle={'Fund Request'}>
                <Text fontWeight={'semibold'} fontSize={'lg'}>Fund Requests From Your Members</Text>

                <Box py={6}>
                    <Text fontWeight={'medium'} pb={4}>Search and manage fund requests</Text>
                    <HStack spacing={4} my={4}>
                        <Button size={['xs', 'sm']} colorScheme={'twitter'} leftIcon={<FaFileCsv />}>CSV</Button>
                        <Button size={['xs', 'sm']} colorScheme={'whatsapp'} leftIcon={<SiMicrosoftexcel />}>Excel</Button>
                        <Button size={['xs', 'sm']} colorScheme={'red'} leftIcon={<FaFilePdf />} onClick={ExportPDF}>PDF</Button>
                        <Button size={['xs', 'sm']} colorScheme={'facebook'} leftIcon={<FaPrint />} onClick={ExportPDF}>Print</Button>
                    </HStack>


                    <HStack spacing={2} py={4} bg={'white'} justifyContent={'center'}>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchRequests(pagination.first_page_url)}
                        ><BsChevronDoubleLeft />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchRequests(pagination.prev_page_url)}
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
                            onClick={() => fetchRequests(pagination.next_page_url)}
                        ><BsChevronRight />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchRequests(pagination.last_page_url)}
                        ><BsChevronDoubleRight />
                        </Button>
                    </HStack>
                    <Box className='ag-theme-alpine' w={'full'} h={['sm', 'xs']}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={rowData}
                            defaultColDef={{
                                filter: true,
                                floatingFilter: true,
                                resizable: true,
                            }}
                            onCellValueChanged={onCellValueChanged}
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
                            onClick={() => fetchRequests(pagination.first_page_url)}
                        ><BsChevronDoubleLeft />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchRequests(pagination.prev_page_url)}
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
                            onClick={() => fetchRequests(pagination.next_page_url)}
                        ><BsChevronRight />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={() => fetchRequests(pagination.last_page_url)}
                        ><BsChevronDoubleRight />
                        </Button>
                    </HStack>


                    <VisuallyHidden>
                        <table id='printable-table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {
                                        columnDefs.map((column, key) => {
                                            if (column.field != "receipt") {
                                                return (
                                                    <th key={key}>{column.headerName}</th>
                                                )
                                            }
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
                                                <td>{data.status}</td>
                                                <td>{data.created_at}</td>
                                                <td>{data.transaction_id}</td>
                                                <td>{data.amount}</td>
                                                <td>{data.bank_name}</td>
                                                <td>{data.transaction_type}</td>
                                                <td>{data.name}</td>
                                                <td>{data.beneficiary_id}</td>
                                                <td>{data.phone_number}</td>
                                                <td>{data.updated_at}</td>
                                                <td>{data.user_id}</td>
                                                <td>{data.remarks}</td>
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

export default FundRequests