"use client"

import { AddUser } from '@/components'
import EditCompnent from '@/components/common/EditComponet'
import Modal from '@/components/common/modal'
import React from 'react'

const page = () => {
  return (
    <Modal>
      {/* <EditCompnent /> */}
      <AddUser />
    </Modal>
  );
};

export default page