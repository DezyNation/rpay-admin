import React, { useMemo } from 'react'
import Layout from '../layout'
import {
    Box,
    Text,
    HStack,
    Button,
    FormControl,
    Input,
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
    useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { GridApi } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useEffect } from 'react'
import CommissionStructure from '@/lib/commission-structure/CommissionStructure'
import { BsTrash } from 'react-icons/bs'
import SearchBox from '@/HOC/SearchBox'


const CommissionSetup = () => {
    const [packageSearchQuery, setPackageSearchQuery] = useState("")
    const [operatorSearchQuery, setOperatorSearchQuery] = useState("")
    const [modalStatus, setModalStatus] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [gridObject, setGridObject] = useState({})


    const SwitchCellRender = (params) => {
        console.log(params)
        return (
            <Switch> {params.value}</Switch>
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
                >
                    +
                </Button>
                <Button
                    rounded={'full'}
                    size={'xs'}
                    colorScheme={'red'}
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



    function handleModal(keyword) {
        const structure = CommissionStructure.find((item) => {
            if (item.id == keyword) {
                setModalTitle(item.title)
                setModalStatus(true)
                return item
            }
        })
        if (structure) {
            setGridObject(structure)
            setColumnDefs(structure.columnDefs)
            setRowData(structure.rowData)

        }
    }


    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            singleClickEditable: true,
            filter: true,
            floatingFilter: true,
        };
    }, []);


    return (
        <>
            <Layout pageTitle={'Define Commission Rate'}>
                <SearchBox searchTitle={'Find Commission Package'}>
                    <HStack>
                        <Input
                            value={packageSearchQuery}
                            bg={'white'}
                            onChange={(e) => setPackageSearchQuery(e.target.value)}
                            placeholder={'Enter commission package name to search'}
                        />
                        <Button onClick={searchPackage} colorScheme={'twitter'}>Search</Button>
                    </HStack>
                </SearchBox>

                <Box my={6}>
                    <Text>Set commission for your packages</Text>

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
                                    <Th>Operator Commission</Th>
                                    <Th>AePS</Th>
                                    <Th>AePS Mini Statement</Th>
                                    <Th>AePS Aadhaar Pay</Th>
                                    <Th>Payout</Th>
                                    <Th>DMT</Th>
                                    <Th>MATM</Th>
                                    <Th>CMS</Th>
                                    <Th>LIC</Th>
                                    <Th>PAN</Th>
                                    <Th>Deposit Fees</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>1</Td>
                                    {/* Name of person who created these packages */}
                                    <Td>Admin</Td>
                                    <Td>Plan A</Td>
                                    <Td>0</Td>
                                    <Td><Switch></Switch></Td>
                                    <Td><Switch></Switch></Td>
                                    <Td>
                                        {/* Operator-wise Commission */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("1")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Withdrawal */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("2")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Mini Statement */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("11")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Aadhaar Pay */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("3")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* Payout */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("4")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* DMT */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("5")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* MATM */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("6")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* CMS */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("8")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* LIC */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("9")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* PAN */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("10")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* Money Deposit */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("7")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>2</Td>
                                    {/* Name of person who created these packages */}
                                    <Td>Admin</Td>
                                    <Td>Plan B</Td>
                                    <Td>0</Td>
                                    <Td><Switch></Switch></Td>
                                    <Td><Switch></Switch></Td>
                                    <Td>
                                        {/* Operator-wise Commission */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("1")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Withdrawal */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("2")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Mini Statement */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("11")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Aadhaar Pay */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("3")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* Payout */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("4")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* DMT */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("5")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* MATM */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("6")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* CMS */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("8")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* LIC */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("9")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* PAN */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("10")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* Money Deposit */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("7")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>3</Td>
                                    {/* Name of person who created these packages */}
                                    <Td>Admin</Td>
                                    <Td>Plan C</Td>
                                    <Td>0</Td>
                                    <Td><Switch></Switch></Td>
                                    <Td><Switch></Switch></Td>
                                    <Td>
                                        {/* Operator-wise Commission */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("1")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Withdrawal */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("2")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Mini Statement */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("11")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Aadhaar Pay */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("3")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* Payout */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("4")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* DMT */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("5")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* MATM */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("6")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* CMS */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("8")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* LIC */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("9")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* PAN */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("10")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* Money Deposit */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("7")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>4</Td>
                                    {/* Name of person who created these packages */}
                                    <Td>Admin</Td>
                                    <Td>Whitelabel</Td>
                                    <Td>0</Td>
                                    <Td><Switch></Switch></Td>
                                    <Td><Switch></Switch></Td>
                                    <Td>
                                        {/* Operator-wise Commission */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("1")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Withdrawal */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("2")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Mini Statement */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("11")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* AePS Aadhaar Pay */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("3")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* Payout */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("4")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* DMT */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("5")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* MATM */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("6")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* CMS */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("8")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* LIC */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("9")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* PAN */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("10")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                    <Td>
                                        {/* Money Deposit */}
                                        <Button
                                            size={'sm'}
                                            colorScheme={'blue'}
                                            onClick={() => handleModal("7")}
                                        >
                                            Set Commission
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
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