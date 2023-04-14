import React, { useMemo, useEffect, useState } from 'react'
import Layout from '../layout'
import {
    Box,
    Text,
    HStack,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Switch,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CommissionStructure from '@/lib/commission-structure/CommissionStructure'
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight, BsTrash } from 'react-icons/bs'
import { useFormik } from 'formik'
import BackendAxios from '@/lib/utils/axios'
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";


const CommissionSetup = () => {
    const [packageSearchQuery, setPackageSearchQuery] = useState("")
    const Toast = useToast({
        position: 'top-right'
    })
    const [modalStatus, setModalStatus] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [gridObject, setGridObject] = useState({})
    const [allPackages, setAllPackages] = useState([])
    const [selectedPackage, setSelectedPackage] = useState("")
    const [pagination, setPagination] = useState({
        current_page: "1",
        total_pages: "1",
        first_page_url: "",
        last_page_url: "",
        next_page_url: "",
        prev_page_url: "",
    })

    const Formik = useFormik({
        initialValues: {
            package_name: "",
            is_default: "0",
            is_active: "0",
        },
        onSubmit: values => {
            if (!values.package_name) {
                return Toast({
                    description: 'Package name can not be empty'
                })
            }
            BackendAxios.post('/api/admin/create-package', values).then(() => {
                fetchAllPackages()
                Toast({
                    status: 'success',
                    description: 'Package Created'
                })
            }).catch(err => {
                Toast({
                    status: 'error',
                    description: err.message
                })
            })
        }
    })

    function fetchAllPackages(pageLink) {
        BackendAxios.get(pageLink || '/api/admin/packages?page=1').then(res => {
            setPagination({
                current_page: res.data.current_page,
                total_pages: parseInt(res.data.last_page),
                first_page_url: res.data.first_page_url,
                last_page_url: res.data.last_page_url,
                next_page_url: res.data.next_page_url,
                prev_page_url: res.data.prev_page_url,
            })
            setAllPackages(res.data.data)
        }).catch(err => {
            Toast({
                status: 'error',
                description: `Error while fetching packages`
            })
        })
    }
    function fetchAllCommission(selectedPackageId){
        BackendAxios.get(`api/admin/commissions/${selectedPackageId}`).then(res=>{
            setRowData(res.data)
            setModalStatus(true)
        }).catch(err=>{
            Toast({
                status: "error",
                description: "Error while fetching commission"
            })
        })
    }

    function onCellValueChange(params) {
        if (params.data.from && params.data.to && params.data.commission) {
            BackendAxios.post(`/api/admin/update-package`, { ...params.data, package_id: selectedPackage }).then(() => {
                Toast({
                    status: 'success',
                    description: `Commission Updated`
                })
            }).catch(err => {
                Toast({
                    status: 'error',
                    description: `Error while updating commission`
                })
            })
            console.log({ ...params.data, package_id: selectedPackage })
        }
    }

    const SwitchCellRender = (params) => {
        return (
            <Switch
                defaultChecked={params.value === 1}
                onChange={() => {
                    params.node.setDataValue("is_flat", params.value == 1 ? 0 : 1)
                }}
            ></Switch>
        )
    }

    const ActionsCellRender = (params) => {
        return (
            <HStack spacing={4} h={'full'} alignItems={'center'}>
                <Button
                    rounded={'full'}
                    size={'xs'}
                    colorScheme={'whatsapp'}
                    fontSize={'sm'}
                    onClick={() => params.api.applyTransaction({ add: [{ is_flat: 1 }] })}
                >
                    +
                </Button>
                <Button
                    rounded={'full'}
                    size={'xs'}
                    colorScheme={'red'}
                    onClick={() => params.api.applyTransaction({ remove: params.api.getSelectedRows() })}
                >
                    <BsTrash />
                </Button>
            </HStack>
        )

    }

    function searchPackage() {

    }


    const [rowData, setRowData] = useState([
    ])

    const [columnDefs, setColumnDefs] = useState([
    ])



    function handleModal(keyword, packageId) {
        setSelectedPackage(packageId)
        const structure = CommissionStructure.find((item) => {
            if (item.id == keyword) {
                setModalTitle(item.title)
                return item
            }
        })
        if (structure) {
            setGridObject(structure)
            setColumnDefs(structure.columnDefs)
            fetchAllCommission(packageId)
        }
    }


    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            editable: true,
            singleClickEdit: true,
            filter: true,
            floatingFilter: true,
        };
    }, []);

    useEffect(() => {
        fetchAllPackages('/api/admin/packages?page=1')
    }, [])




    return (
        <>
            <Layout pageTitle={'Define Commission Rate'}>
                <Box p={3} bg={'twitter.500'} color={'white'}>
                    <Text>Create New Commission Package</Text>
                </Box>
                <Stack
                    spacing={6} my={6}
                    direction={['column', 'row']}
                >
                    <FormControl w={'xs'}>
                        <FormLabel>Package Name</FormLabel>
                        <Input
                            name={'package_name'} bg={'white'}
                            placeholder={'Enter package name'}
                            onChange={Formik.handleChange}
                        />
                    </FormControl>
                    <FormControl w={'xs'}>
                        <FormLabel>Is Default</FormLabel>
                        <Select name='is_default' onChange={Formik.handleChange}>
                            <option value="0" selected>No</option>
                            <option value="1">Yes</option>
                        </Select>
                    </FormControl>
                    <FormControl w={'xs'}>
                        <FormLabel>Is Active</FormLabel>
                        <Select name='is_active' onChange={Formik.handleChange}>
                            <option value="0" selected>No</option>
                            <option value="1">Yes</option>
                        </Select>
                    </FormControl>
                </Stack>

                <HStack justifyContent={'flex-end'} mb={8}>
                    <Button colorScheme={'twitter'} onClick={Formik.handleSubmit}>Create</Button>
                </HStack>

                <Box mt={'28'}>
                    <Text color={'#555'}>Commission Setup For Existing Packages</Text>
                    <HStack mt={6} mb={2}>
                        <Input
                            value={packageSearchQuery}
                            bg={'white'} w={['full', 'xs']}
                            onChange={(e) => setPackageSearchQuery(e.target.value)}
                            placeholder={'Enter commission package name to search'}
                        />
                        <Button onClick={searchPackage} colorScheme={'twitter'}>Search</Button>
                    </HStack>

                    <HStack spacing={2} mt={12} py={4} bg={'white'} justifyContent={'center'}>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={()=>fetchAllPackages(pagination.first_page_url)}
                        ><BsChevronDoubleLeft />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={()=>fetchAllPackages(pagination.prev_page_url)}
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
                            onClick={()=>fetchAllPackages(pagination.next_page_url)}
                        ><BsChevronRight />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                            onClick={()=>fetchAllPackages(pagination.last_page_url)}
                        ><BsChevronDoubleRight />
                        </Button>
                    </HStack>
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>#</Th>
                                    <Th>User Name</Th>
                                    <Th>Package Name</Th>
                                    <Th>Total Users</Th>
                                    <Th>Default</Th>
                                    <Th>Status</Th>
                                    <Th>Payout</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allPackages.map((item, key) => {
                                        return (
                                            <Tr key={key}>
                                                <Td>{key + 1}</Td>
                                                {/* Name of person who created these packages */}
                                                <Td>{item.user_id}</Td>
                                                <Td>{item.name}</Td>
                                                <Td>0</Td>
                                                <Td><Switch defaultChecked={item.is_default === 1}></Switch></Td>
                                                <Td><Switch defaultChecked={item.is_active === 1}></Switch></Td>
                                                <Td>
                                                    {/* Payout */}
                                                    <Button
                                                        size={'sm'}
                                                        colorScheme={'blue'}
                                                        onClick={() => handleModal("4", item.id)}
                                                    >
                                                        Set Commission
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <HStack spacing={2} py={4} bg={'white'} justifyContent={'center'}>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                        ><BsChevronDoubleLeft />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
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
                        ><BsChevronRight />
                        </Button>
                        <Button
                            colorScheme={'twitter'}
                            fontSize={12} size={'xs'}
                            variant={'outline'}
                        ><BsChevronDoubleRight />
                        </Button>
                    </HStack>
                </Box>
            </Layout>



            {/* Commission Modal */}
            <Modal
                isOpen={modalStatus}
                onClose={() => setModalStatus(false)}
                size={'3xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textTransform={'capitalize'}>
                        Edit Commission for {modalTitle}
                        <ModalCloseButton />
                    </ModalHeader>
                    <ModalBody>
                        <Box className='ag-theme-alpine' h={['sm']}>
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                components={{
                                    'switchCellRender': SwitchCellRender,
                                    'actionsCellRender': ActionsCellRender,
                                }}
                                rowSelection={'single'}
                                onCellValueChanged={onCellValueChange}
                            >

                            </AgGridReact>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <HStack justifyContent={'flex-end'} spacing={4}>
                            <Button
                                variant={'ghost'}
                                onClick={() => setModalStatus(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme={'twitter'}>
                                Save
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CommissionSetup