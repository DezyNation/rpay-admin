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
import React, { useEffect } from 'react'
import {
  BsPower,
  BsSpeedometer,
  BsBriefcaseFill,
  BsCoin
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
import axios from "@/lib/utils/axios";
import Cookies from 'js-cookie'
var bcrypt = require('bcryptjs')
import { useRouter } from 'next/router'
import Link from 'next/link'

const menuOptions = [
  {
    type: "link",
    name: "profile",
    link: "/dashboard/profile?pageid=profile",
    icon: <FaUser />
  },
  {
    type: "link",
    name: "dashboard",
    link: "/dashboard?pageid=dashboard",
    icon: <BsSpeedometer />
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
    ]
  },
  {
    type: "accordion",
    name: "services",
    icon: <BsBriefcaseFill />,
    children: [
      {
        title: "aeps",
        link: "/dashboard/users/create-user?pageid=users",
        status: true,
      },
      {
        title: "bbps",
        link: "/dashboard/users/users-list?pageid=users",
        status: true,
      },
      {
        title: "recharge",
        link: "/dashboard/users/users-list?pageid=users",
        status: true,
      },
      {
        title: "dmt",
        link: "/dashboard/users/users-list?pageid=users",
        status: true,
      },
      {
        title: "payout",
        link: "/dashboard/users/users-list?pageid=users",
        status: true,
      },
      {
        title: "cms",
        link: "/dashboard/users/users-list?pageid=users",
        status: true,
      },
      {
        title: "lic",
        link: "/dashboard/users/users-list?pageid=users",
        status: true,
      },
      {
        title: "axis bank account",
        link: "/dashboard/users/users-list?pageid=users",
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
        title: "add money",
        link: "/dashboard/account/add-money?pageid=account",
        status: true,
      },
      {
        title: "wallet balance",
        link: "/dashboard/account/wallet-balance?pageid=account",
        status: true,
      },
      {
        title: "wallet transactions",
        link: "/dashboard/account/wallet-transactions?pageid=account",
        status: true,
      },
      {
        title: "add bank",
        link: "/dashboard/account/add-bank?pageid=account",
        status: true,
      },
    ]
  },
  {
    type: "accordion",
    name: "commission package",
    icon: <FaPercentage />,
    children: [
      {
        title: "create package",
        link: "/dashboard/commission-package/create-package?pageid=commission",
        status: true,
      },
      {
        title: "commission setup",
        link: "/dashboard/commission-package/commission-setup?pageid=commission",
        status: true,
      },
      {
        title: "view commission",
        link: "/dashboard/commission-package/view-commission?pageid=commission",
        status: true,
      },
    ]
  },
  {
    type: "accordion",
    name: "controls",
    link: "/dashboard/commission?pageid=commission",
    icon: <AiFillApi />,
    children: [
      {
        title: "add operator type",
        link: "/dashboard/controls/add-operator-category?pageId=controls",
        status: true,
      },
      {
        title: "add new operator",
        link: "/dashboard/controls/add-operator?pageId=controls",
        status: true,
      },
      {
        title: "add cms biller",
        link: "/dashboard/controls/add-cms-biller?pageId=controls",
        status: true,
      },
      {
        title: "manage banks",
        link: "/dashboard/controls/manage-banks?pageId=controls",
        status: true,
      },
    ]
  },
  {
    type: "accordion",
    name: "reports",
    link: "/dashboard/commission?pageid=commission",
    icon: <HiDocumentReport />,
    children: [
      {
        title: "dmt",
        link: "/dashboard",
        status: true,
      },
      {
        title: "aeps",
        link: "/dashboard",
        status: true,
      },
      {
        title: "bbps",
        link: "/dashboard",
        status: true,
      },
      {
        title: "recharge",
        link: "/dashboard",
        status: true,
      },
      {
        title: "matm",
        link: "/dashboard",
        status: true,
      },
      {
        title: "payout",
        link: "/dashboard",
        status: true,
      },
      {
        title: "cms",
        link: "/dashboard",
        status: true,
      },
      {
        title: "pg",
        link: "/dashboard",
        status: true,
      },
      {
        title: "qr code",
        link: "/dashboard",
        status: true,
      },
      {
        title: "virtual account",
        link: "/dashboard",
        status: true,
      },
      {
        title: "fund request",
        link: "/dashboard",
        status: true,
      },
      {
        title: "fund transfer",
        link: "/dashboard",
        status: true,
      },
      {
        title: "wallet-wallet transfer",
        link: "/dashboard",
        status: true,
      },
      {
        title: "lic report",
        link: "/dashboard",
        status: true,
      },
      {
        title: "fastag",
        link: "/dashboard",
        status: true,
      },
      {
        title: "axis account open",
        link: "/dashboard",
        status: true,
      },
      {
        title: "transaction ledger",
        link: "/dashboard",
        status: true,
      },
      {
        title: "daily sales",
        link: "/dashboard",
        status: true,
      },
      {
        title: "user ledger",
        link: "/dashboard",
        status: true,
      },
      {
        title: "login report",
        link: "/dashboard",
        status: true,
      },
    ]
  },
  {
    type: "link",
    name: "support tickets",
    link: "/dashboard/commission?pageid=commission",
    icon: <IoMdHelpBuoy />,
  },
  {
    type: "accordion",
    name: "website setup",
    link: "/dashboard/commission?pageid=commission",
    icon: <FaWrench />,
    children: [
      {
        title: "basic details",
        link: "/dashboard",
        status: true,
      },
      {
        title: "header",
        link: "/dashboard",
        status: true,
      },
      {
        title: "footer",
        link: "/dashboard",
        status: true,
      },
      {
        title: "email",
        link: "/dashboard",
        status: true,
      },
      {
        title: "sms",
        link: "/dashboard",
        status: true,
      },
      {
        title: "banner setup",
        link: "/dashboard",
        status: true,
      },
      {
        title: "notifications",
        link: "/dashboard",
        status: true,
      },
    ]
  },
]



const Layout = (props) => {
  const Router = useRouter()
  const { pageid } = Router.query
  const { isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    const activePage = typeof window !== 'undefined' ? document.getElementById(pageid) : document.getElementById("dashboard")
    if (activePage) {
      activePage.style.background = "#3C79F5"
      activePage.style.color = "#FFF"
    }
  }, [])


  useEffect(() => {
    let authentic = bcrypt.compareSync(`${localStorage.getItem("userId") + process.env.NEXT_PUBLIC_SALT + localStorage.getItem("userName")}`, Cookies.get("verified"))
    if (authentic != true) {
      axios.post("/logout").then(() => {
        Cookies.remove("verified")
      })
      setTimeout(() => Router.push("/"), 2000)
    }
  }, [])

  useEffect(() => {
    axios.get("/sanctum/csrf-cookie")
  }, [])

  async function logout() {
    await axios.post("/logout").then(() => {
      Cookies.remove("verified")
    })
    setTimeout(() => Router.push("/"), 2000)
  }

  return (
    <>
      <Head><title>{`Pesa24 Admin | ${props.pageTitle || "No Title"}`}</title></Head>
      <HStack spacing={0} alignItems={'flex-start'}>
        {/* Sidebar */}
        <Show above='md'>
          <VStack
            flex={2}
            bg={'white'}
            h={'100vh'}
            overflowY={'scroll'}
          >
            <VStack py={8}>
              <Image src='https://xsgames.co/randomusers/assets/avatars/male/8.jpg' boxSize={24} rounded={'full'} />
              <Text fontSize={'xl'} color={'#444'}>Sangam Kumar</Text>
              <Text fontSize={'sm'} color={'#666'}>Dezynation - Admin</Text>
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
        </Show>
        <Box flex={9} h={'100vh'} overflowY={'scroll'}>
          <Stack
            p={3} bg={'blue.50'} spacing={4}
            boxShadow={'md'} direction={['column', 'row']}
            justifyContent={['center', 'space-between']}>
            <HStack justifyContent={'space-between'}>
              <Show below='md'>
                <Button variant={'unstyled'} onClick={onOpen}>
                  <HiOutlineMenuAlt1 fontSize={20} />
                </Button>
              </Show>
              <Image src='/logo_long.png' w={16} />
            </HStack>
            <HStack spacing={6}>
              <HStack spacing={2}>
                <Text fontSize={'xs'}>AePS</Text>
                <Switch id={'aepsStatus'} />
              </HStack>
              <HStack spacing={2}>
                <Text fontSize={'xs'}>DMT</Text>
                <Switch id={'dmtStatus'} />
              </HStack>
              <HStack spacing={2}>
                <Text fontSize={'xs'}>BBPS</Text>
                <Switch id={'bbpsStatus'} />
              </HStack>
              <HStack spacing={2}>
                <Text fontSize={'xs'}>Recharge</Text>
                <Switch id={'rechargeStatus'} />
              </HStack>
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