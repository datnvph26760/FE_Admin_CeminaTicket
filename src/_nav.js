import React from 'react'
// import CIcon from '@coreui/icons-react'
// import {
//   cilBell,
//   cilCalculator,
//   cilChartPie,
//   cilCursor,
//   cilDescription,
//   cilDrop,
//   cilNotes,
//   cilPencil,
//   cilPuzzle,
//   cilSpeedometer,
//   cilStar,
// } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Vé',
    to: '/ve',
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Lịch Chiếu',
    to: '/buttons',
    // icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Lịch Chiếu',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Giá Vé Lịch Chiếu',
        to: '/buttons/button-groups',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Ghế',
    // icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Ghế',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Phòng Chiếu',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Loại Ghế',
        to: '/forms/checks-radios',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Hóa Đơn',
    // icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hóa Đơn',
        to: '/icons/coreui-icons',
      },
      {
        component: CNavItem,
        name: 'Hóa Đơn Đồ Ăn',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'Chi Tiết Thanh Toán',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Phim',
    // icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Thể Loại',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Ngôn Ngữ',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Quốc Gia',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Thông Tin Phim',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Đồ Ăn',
    // icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Đồ ăn',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Comboo',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Comboo Detail',
        to: '/notifications/modals',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Khách Hàng',
    // icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Khách Hàng',
        to: '/khach-hang',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Nhân Viên',
    // icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Nhân Viên',
        to: '/nhan-vien',
      },
      {
        component: CNavItem,
        name: 'Chức Vụ',
        to: '/chuc-vu',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Phương Thức Thanh Toán',
    to: '/charts',
  },
]

export default _nav
