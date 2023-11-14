"use client"

import { AddUser } from '@/components'
import EditCompnent from '@/components/common/EditComponet'
import Modal from '@/components/common/modal'
import React from 'react'
// import Login from './login/page'

const page = () => {
  return (
    <Modal>
      {/* <EditCompnent /> */}
      <AddUser />
      {/* <Login /> */}
    </Modal>
  )
}

export default page