"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { BsPatchCheckFill, BsClipboardCheckFill, BsClipboardMinusFill } from "react-icons/bs";
import { FaUsers, FaUsersCog, FaUsersSlash } from "react-icons/fa";
import { FaUsersBetweenLines, FaMoneyBillTransfer } from "react-icons/fa6";
import { BiSolidErrorAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getMetrics } from "../GlobalRedux/Features/dashboardSlice";

const page = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.dashboard);
  const [admins, setAdmins] = useState(0)
  const [clients, setClients] = useState(0)
  const [invoices, setInvoices] = useState(0)
  const [transactions, setTransactions] = useState(0)
  const [users, setUsers] = useState(0)

  useEffect(() => {
    dispatch(getMetrics())
  }, [])

  useEffect(() => {
    if (data) {
      setAdmins(data?.admins)
      setClients(data?.clients)
      setInvoices(data?.invoices)
      setTransactions(data?.transactions)
      setUsers(data?.users)
    }
  }, [data])

  return (
    <div>
      <div className={styles.rows}>
        <h3>Admins</h3>
        <div className={styles.users}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.green}`}><FaUsers /></div>
            <div className={styles.detail}>
              <h3 className={styles.green}>{admins?.active}</h3>
              <p>Active</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.yellow}`}>< FaUsersBetweenLines /></div>
            <div className={styles.detail}>
              <h3 className={styles.yellow}>{admins?.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.purple}`}><FaUsersCog /></div>
            <div className={styles.detail}>
              <h3 className={styles.purple}>{admins?.deactivated}</h3>
              <p>Deactivated</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkred}`}><FaUsersSlash /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkred}>{admins?.blocked}</h3>
              <p>Blocked</p>
            </div>
          </div>
        </div>

        <h3>Users</h3>
        <div className={styles.users}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.green}`}><FaUsers /></div>
            <div className={styles.detail}>
              <h3 className={styles.green}>{users?.active}</h3>
              <p>Active</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.yellow}`}>< FaUsersBetweenLines /></div>
            <div className={styles.detail}>
              <h3 className={styles.yellow}>{users?.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.purple}`}><FaUsersCog /></div>
            <div className={styles.detail}>
              <h3 className={styles.purple}>{users?.deactivated}</h3>
              <p>Deactivated</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkred}`}><FaUsersSlash /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkred}>{users?.blocked}</h3>
              <p>Blocked</p>
            </div>
          </div>
        </div>

        <h3>Clients</h3>
        <div className={styles.users}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.green}`}><FaUsers /></div>
            <div className={styles.detail}>
              <h3 className={styles.green}>{clients?.active}</h3>
              <p>Active</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.yellow}`}>< FaUsersBetweenLines /></div>
            <div className={styles.detail}>
              <h3 className={styles.yellow}>{clients?.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.purple}`}><FaUsersCog /></div>
            <div className={styles.detail}>
              <h3 className={styles.purple}>{clients?.deactivated}</h3>
              <p>Deactivated</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkred}`}><FaUsersSlash /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkred}>{clients?.blocked}</h3>
              <p>Blocked</p>
            </div>
          </div>
        </div>

        <h3>Transactions</h3>
        <div className={styles.transactions}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkblue}`}><FaMoneyBillTransfer /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkblue}>{transactions?.all}</h3>
              <p>Total</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.green}`}><BsPatchCheckFill /></div>
            <div className={styles.detail}>
              <h3 className={styles.green}>{transactions?.success}</h3>
              <p>Successful</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkred}`}><BiSolidErrorAlt /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkred}>{transactions?.failed}</h3>
              <p>Failed</p>
            </div>
          </div>
        </div>

        <h3>Invoices</h3>
        <div className={styles.invoices}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.green}`}><BsClipboardCheckFill /></div>
            <div className={styles.detail}>
              <h3 className={styles.green}>{invoices?.paid}</h3>
              <p>Paid</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkred}`}><BsClipboardMinusFill /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkred}>{invoices?.unpaid}</h3>
              <p>Unpaid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default page;
