import React, { useState } from 'react'
import Layout from '../layout'
import {
    Stack,
    Text,
    VStack,
    HStack,
    Button,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Input,
    Box,
    FormControl,
    FormLabel,
    PinInput,
    PinInputField,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { SiMicrosoftexcel } from 'react-icons/si'
import { FaFileCsv, FaFilePdf, FaPrint } from 'react-icons/fa'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const FundTransfer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const Formik = useFormik({
        initialValues: {
            userName: "",
            firmName: "",
            phone: "",
            transactionId: "",
            fromDate: null,
            toDate: null,
        }
    })

    const verifyBeneficiary = () => {
        // Logic to verifiy beneficiary details
    }


    const [rowData, setRowData] = useState([
        {}
    ])

    const [columnDefs, setColumnDefs] = useState([
        { field: "actions" },
        { headerName: "request datetime", field: 'created_at' },
        { headerName: "Trnxn ID", field: 'transaction_id' },
        { headerName: "amount", field: 'amount' },
        { headerName: "requested bank", field: 'bank_name' },
        { headerName: "transaction type", field: 'transaction_type' },
        { headerName: "transaction receipt", field: 'receipt' },
        { headerName: "user name", field: 'name' },
        { headerName: "user id", field: 'beneficiary_id' },
        { headerName: "phone no.", field: 'phone_number' },
        { headerName: "update datetime", field: 'updated_at' },
        { headerName: "updated by", field: 'user_id' },
        { headerName: "remarks", field: 'remarks' },
    ])

    return (
        <>
            <Layout pageTitle={'Fund Request'}>
                <Text fontWeight={'semibold'} fontSize={'lg'}>Fund Requests From Your Members</Text>

                <Box py={6}>
                    <Text fontWeight={'medium'} pb={4}>Search and manage fund requests</Text>
                    <HStack spacing={4} my={4}>
                        <Button size={['xs', 'sm']} colorScheme={'twitter'} leftIcon={<FaFileCsv />}>CSV</Button>
                        <Button size={['xs', 'sm']} colorScheme={'whatsapp'} leftIcon={<SiMicrosoftexcel />}>Excel</Button>
                        <Button size={['xs', 'sm']} colorScheme={'red'} leftIcon={<FaFilePdf />}>PDF</Button>
                        <Button size={['xs', 'sm']} colorScheme={'facebook'} leftIcon={<FaPrint />}>Print</Button>
                    </HStack>
                    <Box className='ag-theme-alpine' w={'full'} h={['sm', 'xs']}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={rowData}
                            defaultColDef={{
                                filter: true,
                                floatingFilter: true,
                            }}
                        >

                        </AgGridReact>
                    </Box>
                </Box>


                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Confirm Transaction</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack>
                                <FormControl w={['full', 'xs']}>
                                    <FormLabel>Enter Your MPIN</FormLabel>
                                    <HStack spacing={4}>
                                        <PinInput
                                            name={'mpin'} otp
                                            onChange={Formik.handleChange}
                                        >
                                            <PinInputField bg={'aqua'} />
                                            <PinInputField bg={'aqua'} />
                                            <PinInputField bg={'aqua'} />
                                            <PinInputField bg={'aqua'} />
                                        </PinInput>
                                    </HStack>
                                </FormControl>
                            </VStack>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant='ghost' onClick={onClose}>Cancel</Button>
                            <Button colorScheme='blue' mr={3} onClick={Formik.handleSubmit}>Done</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Layout>
        </>
    )
}

export default FundTransfer