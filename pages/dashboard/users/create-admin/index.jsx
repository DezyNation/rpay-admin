import React, { useState, useEffect } from 'react'
import Layout from '../../layout'
import {
  Box,
  useToast,
  Stack,
  Text,
  VStack,
  HStack,
  Button,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Input,
  FormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react'
import BackendAxios from '@/lib/utils/axios'
import { useFormik } from 'formik'

const CreateAdmin = () => {
  const Toast = useToast({
    position: 'top-right'
  })
  const [fetchedUser, setFetchedUser] = useState({
    user_name: "",
    firm_name: "",
    wallet: "",
    phone: "",
    role: ""
  })

  const Formik = useFormik({
    initialValues: {
      beneficiaryId: "",
      amount: "",
      transactionType: "transfer",
      remarks: "",
      mpin: "",
      role: "",
    }
  })

  const verifyBeneficiary = () => {
    // Logic to verifiy beneficiary details
    BackendAxios.post(`/api/admin/user/info/${Formik.values.beneficiaryId}`).then((res) => {
      console.log(res.data.data)
      setFetchedUser({
        ...fetchedUser,
        user_name: res.data.data.first_name + " " + res.data.data.last_name,
        firm_name: res.data.data.firm_name,
        phone: res.data.data.phone_number,
        wallet: res.data.data.wallet,
        role: res.data.data.roles[0].name

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
        role: ""
      })
    })
  }

  return (
    <>
      <Layout pageTitle={'Create Admin'}>
        <Text fontSize={'lg'} fontWeight={'semibold'} my={4}>Manage Admin Members</Text>

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
                  onChange={Formik.handleChange}
                  placeholder={'Enter User ID'}
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
              (<Stack
                p={4} bg={'blue.50'}
                border={'1px'}
                borderColor={'blue.200'}
                rounded={16} my={4}
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
              </Stack>

              ) : null
          }

          {
            fetchedUser.role == "admin" ? (
              <Box my={4}>
                <Button colorScheme={'whatsapp'}>Make Retailer</Button>

                <Flex direction={'row'} gap={10} flexWrap={'wrap'}>
                  <Button border={'1px solid blue'}>Create User</Button>
                </Flex>
              </Box>

            ) : <Button colorScheme={'twitter'}>Make Admin</Button>
          }
        </Box>
      </Layout>
    </>
  )
}

export default CreateAdmin