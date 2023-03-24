import React, { useState, useEffect } from 'react'
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
    useToast
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import BackendAxios from '@/lib/utils/axios'
import Layout from '../layout';
import axios from 'axios';
import { createCanBoundTo } from '@casl/react';

const FundTransfer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [permissions, setPermissions] = useState([])

    const Toast = useToast({
        position: 'top-right'
    })
    const [fetchedUser, setFetchedUser] = useState({
        user_name: "",
        firm_name: "",
        wallet: "",
        phone: "",
    })
    const TransferFormik = useFormik({
        initialValues: {
            beneficiaryId: "",
            amount: "",
            transactionType: "transfer",
            remarks: "",
            mpin: "",
        },
        onSubmit: values => {
            if (values.transactionType == "reversal" && !values.remarks) {
                Toast({
                    description: 'Remarks are mandatory'
                })
            }
            else {
                BackendAxios.post(`/api/admin/new-fund`, values).then(res => {
                    Toast({
                        status: 'success',
                        description: 'Transaction successful!'
                    })
                }).catch(err => {
                    Toast({
                        status: 'error',
                        description: err.message
                    })
                })
            }
        }
    })

    const verifyBeneficiary = () => {
        // Logic to verifiy beneficiary details
        BackendAxios.post(`/api/admin/user/info/${TransferFormik.values.beneficiaryId}`).then((res) => {
            console.log(res.data.data)
            setFetchedUser({
                ...fetchedUser,
                user_name: res.data.data.first_name + " " + res.data.data.last_name,
                firm_name: res.data.data.firm_name,
                phone: res.data.data.phone_number,
                wallet: res.data.data.wallet,

            })
        }).catch((err) => {
            Toast({
                status: 'error',
                description: 'User not found!'
            })
            setFetchedUser({
                user_name: "",
                firm_name: "",
                wallet: "",
                phone: "",
            })
        })
    }


    const [rowData, setRowData] = useState([
        {}
    ])

    const [columnDefs, setColumnDefs] = useState([
        { headerName: "Trnxn ID", field: 'transaction_id' },
        { headerName: "Beneficiary Name", field: 'name' },
        { headerName: "Beneficiary ID", field: 'user_id' },
        { headerName: "Phone", field: 'phone_number' },
        { headerName: "Amount", field: 'amount' },
        { headerName: "Transaction Type", field: 'transaction_type' },
        { headerName: "Datetime", field: 'created_at' },
        { headerName: "Remarks", field: 'remarks' },
    ])

    useEffect(() => {
        BackendAxios.get('/api/admin/fetch-admin-funds').then(res => {
            console.log(res)
            setRowData(res.data.slice(0,10))
        }).catch(err => {
            Toast({
                status: 'error',
                description: 'Could not fetch transactions'
            })
        })
    },[])

    return (
        <>
            <Layout pageTitle={'Fund Transfer'}>
                <Text fontWeight={'semibold'} fontSize={'lg'}>Fund Transfer</Text>

                {/* Fund Transfer Form */}
                <Box py={6}>
                    <Box
                        rounded={16}
                        overflow={'hidden'}
                    >
                        <Box
                            bg={'twitter.500'}
                            p={3} color={'white'}
                        >
                            <Text>Transfer Funds To Any Registered User</Text>
                        </Box>
                        <Box p={4}>
                            <Stack
                                direction={['column', 'row']}
                                spacing={6} py={6}
                            >
                                <FormControl w={['full', 'xs']}>
                                    <FormLabel>User ID</FormLabel>
                                    <InputGroup>
                                        <Input
                                            name={'beneficiaryId'}
                                            onChange={TransferFormik.handleChange}
                                            placeholder={'Enter Beneficiary User ID'}
                                        />
                                        <InputRightAddon
                                            children={'Verify'}
                                            cursor={'pointer'}
                                            onClick={() => verifyBeneficiary()}
                                        />
                                    </InputGroup>
                                </FormControl>
                            </Stack>
                            {
                                fetchedUser.user_name ?
                                    <Stack
                                        p={4} bg={'blue.50'}
                                        border={'1px'}
                                        borderColor={'blue.200'}
                                        rounded={16}
                                        direction={['column', 'row']}
                                        spacing={6} justifyContent={'space-between'}
                                        textTransform={'capitalize'}
                                    >
                                        <Box>
                                            <Text fontWeight={'medium'}>Beneficiary Name</Text>
                                            <Text>{fetchedUser.user_name}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight={'medium'}>Firm Name</Text>
                                            <Text>{fetchedUser.firm_name}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight={'medium'}>Current Balance</Text>
                                            <Text>₹ {fetchedUser.wallet}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight={'medium'}>Phone</Text>
                                            <Text>{fetchedUser.phone}</Text>
                                        </Box>
                                    </Stack> : null
                            }
                            <Stack
                                direction={['column', 'row']}
                                py={8} justifyContent={'space-between'}
                            >
                                <FormControl w={['full', 'xs']}>
                                    <FormLabel>Enter Amount</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon
                                            children={'₹'}
                                        />
                                        <Input
                                            name={'amount'}
                                            onChange={TransferFormik.handleChange}
                                            placeholder={'Enter Amount To Transfer'}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl w={['full', 'xs']}>
                                    <FormLabel>Transaction Type</FormLabel>
                                    <Select
                                        name={'transactionType'}
                                        bg={'white'}
                                        onChange={TransferFormik.handleChange}
                                    >
                                        <option value="transfer">Transfer</option>
                                        <option value="reversal">Reversal</option>
                                    </Select>
                                </FormControl>
                                {/* <FormControl w={['full', 'xs']}>
                                    <FormLabel>Schedule Transaction</FormLabel>
                                    <Input
                                        type={'date'}
                                        name={'scheduledDate'}
                                        onChange={TransferFormik.handleChange}
                                    />
                                </FormControl> */}
                            </Stack>
                            <FormControl py={6}>
                                <FormLabel>Remarks (optional)</FormLabel>
                                <Input
                                    placeholder='Enter here...'
                                    bg={'white'} name={'remarks'}
                                    onChange={TransferFormik.handleChange}
                                />
                            </FormControl>

                            <HStack justifyContent={'flex-end'}>
                                <Button
                                    type='submit' onClick={onOpen}
                                    colorScheme={'twitter'}>Enter MPIN</Button>
                            </HStack>
                        </Box>
                    </Box>
                </Box>


                <Box py={6}>
                    <Text fontWeight={'medium'} pb={4}>Recent Transfers</Text>
                    <Box className='ag-theme-alpine' w={'full'} h={['sm', 'xs']}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={rowData}
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
                                            onComplete={value => TransferFormik.setFieldValue('mpin', value)}
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
                            <Button colorScheme='blue' mr={3} onClick={TransferFormik.handleSubmit}>Done</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Layout>
        </>
    )
}

export default FundTransfer