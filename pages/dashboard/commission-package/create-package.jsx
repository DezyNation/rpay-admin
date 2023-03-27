import React, { useState } from 'react'
import {
    Box,
    Text,
    Stack,
    HStack,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    Switch
} from '@chakra-ui/react'
import Layout from '../layout'
import { useFormik } from 'formik'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CreatePackage = () => {

    const [rowData, setRowData] = useState([
    ])

    const [columnDefs, setColumnDefs] = useState([
        { field: "s. no." },
        { field: "package name" },
        { field: "assigned to" },
        { field: "is default" },
        { field: "status" },
        { field: "actions" },
    ])

    const Formik = useFormik({
        initialValues: {
            packageName: "",
            category: "",
            isDefault: false,
            status: false,
        }
    })

    return (
        <>
            <Layout pageTitle={'Create Package'}>
                <Box p={3} bg={'twitter.500'} color={'white'}>
                    <Text>Create Commission Packages To Be Assigned To Your Members</Text>
                </Box>
                <Stack
                    spacing={6} my={6}
                    direction={['column', 'row']}
                >
                    <FormControl w={'xs'}>
                        <FormLabel>Package Name</FormLabel>
                        <Input
                            name={'packageName'} bg={'white'}
                            placeholder={'Enter package name'}
                            onChange={Formik.handleChange}
                        />
                    </FormControl>
                </Stack>
                
                <HStack justifyContent={'flex-end'}>
                    <Button colorScheme={'twitter'}>Create</Button>
                </HStack>

                <Box mt={6}>
                    <Text fontWeight={'medium'} pb={4}>Packages you created</Text>
                    <Box className='ag-theme-alpine' w={'full'} h={['sm', 'xs']}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={rowData}
                        >

                        </AgGridReact>
                    </Box>
                </Box>
            </Layout>
        </>
    )
}

export default CreatePackage