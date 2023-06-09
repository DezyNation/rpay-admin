import React, { useEffect, useState } from 'react'
import {
  HStack,
  VStack,
  Stack,
  Text,
  Box,
  Image,
  Button,
  Show,
  Switch,
  useDisclosure,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react'
import Head from 'next/head'
import {
  BsPower,
  BsSpeedometer,
  BsBriefcaseFill,
  BsCoin,
  BsPercent
} from 'react-icons/bs'
import {
  FaUser,
  FaPercentage,
  FaWrench,
} from 'react-icons/fa'
import {
  IoIosFlash,
  IoMdHelpBuoy,
} from 'react-icons/io'
import {
  AiFillApi
} from 'react-icons/ai'
import {
  HiOutlineMenuAlt1,
  HiUserGroup,
  HiDocumentReport,
} from 'react-icons/hi'
import BackendAxios, { ClientAxios } from "@/lib/utils/axios";
import Cookies from 'js-cookie'
var bcrypt = require('bcryptjs')
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { AbilityBuilder, Abilities } from '@casl/ability'
import { BiChevronRight } from 'react-icons/bi'

const menuOptions = [
  {
    type: "accordion",
    name: "profile",
    link: "/dashboard/profile?pageid=profile",
    icon: <FaUser />,
    children: [
      {
        title: "reset password",
        link: "/dashboard/profile/reset-password?pageid=profile",
        status: true,
      },
      {
        title: "reset MPIN",
        link: "/dashboard/profile/reset-mpin?pageid=profile",
        status: true,
      },
    ]
  },
  {
    type: "link",
    name: "dashboard",
    link: "/dashboard?pageid=dashboard",
    icon: <BsSpeedometer />
  },
  {
    type: "link",
    name: "commission",
    icon: <BsPercent />,
    link: "/dashboard/commission-package?pageid=commission",
  },
  {
    type: "accordion",
    name: "users",
    icon: <HiUserGroup />,
    children: [
      {
        title: "create user",
        link: "/dashboard/users/create-user?pageid=users",
        status: true,
      },
      {
        title: "users list",
        link: "/dashboard/users/users-list?pageid=users",
        status: true,
      },
      {
        title: "manage user",
        link: "/dashboard/users/manage-user?pageid=users",
        status: true,
      },
      {
        title: "manage admins",
        link: "/dashboard/users/create-admin?pageid=users",
        status: true,
      },
    ]
  },
  {
    type: "accordion",
    name: "account",
    icon: <BsCoin />,
    children: [
      {
        title: "fund transfer",
        link: "/dashboard/account/fund-transfer?pageid=account",
        status: true,
      },
      {
        title: "fund request",
        link: "/dashboard/account/fund-request?pageid=account",
        status: true,
      },
      {
        title: "manage banks",
        link: "/dashboard/controls/manage-banks?pageid=account",
        status: true,
      },
    ]
  },
  {
    type: "accordion",
    name: "reports",
    icon: <HiDocumentReport />,
    children: [
      {
        title: "payout",
        link: "/dashboard/reports/payout?pageId=reports",
        status: true,
      },
      {
        title: "transaction ledger",
        link: "/dashboard/reports/transactions?pageId=reports",
        status: true,
      },
      {
        title: "daily sales",
        link: "/dashboard/reports/transactions/daily?pageId=reports",
        status: true,
      },
      {
        title: "user ledger",
        link: "/dashboard/reports/transactions/user-ledger?pageId=reports",
        status: true,
      },
    ]
  },
  {
    type: "link",
    name: "support tickets",
    link: "/dashboard/support-tickets?pageid=support",
    icon: <IoMdHelpBuoy />,
  },
]



const Layout = (props) => {
  const Router = useRouter()
  const { pageid } = Router.query
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [firmName, setFirmName] = useState("")
  const [userName, setUserName] = useState("NA")
  const [userType, setUserType] = useState("NA")
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  useEffect(() => {
    const activePage = typeof window !== 'undefined' ? document.getElementById(pageid) : document.getElementById("dashboard")
    if (activePage) {
      activePage.style.background = "#3C79F5"
      activePage.style.color = "#FFF"
    }

    setFirmName(process.env.NEXT_PUBLIC_ORGANISATION)
  }, [])

  // Feeding all user details to the sidepanel
  useEffect(() => {
    setUserName(localStorage.getItem("userName"))
    setUserType(localStorage.getItem("userType"))

  }, [])




  useEffect(() => {
    let authentic = bcrypt.compareSync(`${localStorage.getItem("userId") + process.env.NEXT_PUBLIC_SALT + localStorage.getItem("userName")}`, Cookies.get("verified"))
    if (authentic != true) {
      BackendAxios.post("/logout").then(() => {
        Cookies.remove("verified")
        localStorage.clear()
      })
      setTimeout(() => Router.push("/"), 2000)
    }
  }, [])


  async function logout() {
    await BackendAxios.post("/logout").then(() => {
      Cookies.remove("verified")
      localStorage.clear()
    })
    setTimeout(() => Router.push("/"), 2000)
  }

  return (
    <>
      <Head><title>{`Pesa24 Admin | ${props.pageTitle || "No Title"}`}</title></Head>
      <HStack spacing={0} alignItems={'flex-start'}>
        {/* Sidebar */}
        <Show above='md'>
          {
            isSidebarVisible &&
            <VStack
              position={'relative'}
              flex={2}
              bg={'white'}
              h={'100vh'}
              overflowY={'scroll'}
              overflowX={'visible'}
            >
              <VStack py={8}>
                <Image src='https://xsgames.co/randomusers/assets/avatars/male/8.jpg' boxSize={24} rounded={'full'} />
                <Text fontSize={'xl'} color={'#444'} textTransform={'capitalize'}>{userName}</Text>
                <Text fontSize={'sm'} color={'#666'} textTransform={'capitalize'}>{firmName} - {userType}</Text>
              </VStack>
              <VStack spacing={2} w={'full'}>
                {
                  menuOptions.map((item, key) => {
                    if (item.type == "link")
                      return (
                        <Link
                          href={item.link} key={key}
                          style={{ width: '100%' }}
                          id={item.name}
                        >
                          <HStack
                            px={4} py={2} spacing={3}
                            w={'full'} _hover={{ bg: 'aqua' }}
                          >
                            {item.icon}
                            <Text fontWeight={600} textTransform={'capitalize'}>{item.name}</Text>
                          </HStack>
                        </Link>
                      )

                    if (item.type == "accordion")
                      return (
                        <Accordion w={'full'} mb={2} allowToggle>

                          <AccordionItem>
                            <AccordionButton>
                              <HStack spacing={3} textAlign='left' w={'full'} alignItems={'center'}>
                                {item.icon}
                                <Text textTransform={'capitalize'} fontSize={'md'} fontWeight={'semibold'}>{item.name}</Text>
                              </HStack>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                              {
                                item.children.map((child, key) => {
                                  if (child.status) {
                                    return (
                                      <Link href={child.link} style={{ width: "100%" }}>
                                        <Text
                                          fontSize={'md'}
                                          textTransform={'capitalize'}
                                          p={2}
                                        >
                                          {child.title}
                                        </Text>
                                      </Link>
                                    )
                                  }
                                })
                              }
                            </AccordionPanel>
                          </AccordionItem>

                        </Accordion>
                      )

                  })
                }
              </VStack>
              <Box w={'full'} p={4} pt={8}>
                <Button
                  w={'full'} iconSpacing={4}
                  leftIcon={<BsPower />}
                  bg={'tomato'} boxShadow={'md'}
                  justifyContent={'flex-start'}
                  rounded={24} colorScheme={'red'}
                  onClick={() => logout()}
                >
                  Log Out
                </Button>
              </Box>
            </VStack>
          }
        </Show>
        <Box flex={9} h={'100vh'} overflowY={'scroll'}>
          <Stack
            p={3} bg={'blue.50'} spacing={4}
            boxShadow={'md'} direction={['column', 'row']}
            justifyContent={['center', 'space-between']}>
            <HStack w={'full'} justifyContent={'space-between'}>
              <Show below='md'>
                <Button variant={'unstyled'} onClick={onOpen}>
                  <HiOutlineMenuAlt1 fontSize={20} />
                </Button>
              </Show>
              <Show above='md'>
                <Button variant={'unstyled'} onClick={()=>setIsSidebarVisible(!isSidebarVisible)}>
                  <HiOutlineMenuAlt1 fontSize={20} />
                </Button>
              </Show>
              <Image src='/logo_long.png' w={16} />
            </HStack>
          </Stack>
          <Box
            p={4} minH={'full'}
            bg={'azure'} w={'full'}
          >
            {props.children}
          </Box>
        </Box>
      </HStack>


      {/* Mobile Menu Drawer */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={'left'}
        size={'full'}
      >
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack spacing={4}>
              <Image src='https://xsgames.co/randomusers/assets/avatars/male/8.jpg' boxSize={12} rounded={'full'} />
              <Box>
                <Text fontSize={'lg'}>Sangam Kumar</Text>
                <Text fontSize={'xs'}>Pesa24</Text>
              </Box>
            </HStack>
          </DrawerHeader>
          <DrawerBody>

          </DrawerBody>
          <DrawerFooter>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Layout