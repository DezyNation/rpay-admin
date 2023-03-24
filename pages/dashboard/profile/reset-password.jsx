import React from 'react'
import {
  Box,
  Stack,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast
} from '@chakra-ui/react'
import { useFormik } from "formik";
import Layout from '../layout';
import BackendAxios from '@/lib/utils/axios';

const ResetPassword = () => {
  const Toast = useToast({
    position: 'top-right'
  })

  const PasswordFormik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    }
  })


  function handlePasswordReset() {
    BackendAxios.post('/api/user/new-password', JSON.stringify({
      old_password: PasswordFormik.values.old_password,
      new_password: PasswordFormik.values.new_password,
      new_password_confirmation: PasswordFormik.values.new_password_confirmation,
    })).then((res) => {
      Toast({
        status: 'success',
        title: 'Success',
        description: 'Your password was changed succesfully.'
      })
    }).catch((err) => {
      Toast({
        status: 'error',
        title: 'Error Occured',
        description: err.message
      })
    })
  }


  return (
    <>
      <Layout pageTitle={'Reset Password'}>
        <Box
          bg={'white'}
          boxShadow={'md'}
          p={6} w={['full', 'md']}
          rounded={16} mx={'auto'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text fontSize={'lg'} mb={12}>Reset Your Password</Text>
          <VStack spacing={8}>
            <FormControl>
              <FormLabel textAlign={'center'}>Enter Old Passwod</FormLabel>
              <Input
                name={'old_password'}
                onChange={PasswordFormik.handleChange}
              />
            </FormControl>
            <FormControl >
              <FormLabel textAlign={'center'}>Enter New Password</FormLabel>
              <Input
                name={'new_password'} type={'password'}
                onChange={PasswordFormik.handleChange}
              />
            </FormControl>
            <FormControl >
              <FormLabel textAlign={'center'}>Confirm New Password</FormLabel>
              <Input
                name={'new_password_confirmation'}
                onChange={PasswordFormik.handleChange}
              />
            </FormControl>
            <Button colorScheme={'twitter'} onClick={handlePasswordReset}>Done</Button>
          </VStack>
        </Box>
      </Layout>
    </>
  )
}

export default ResetPassword