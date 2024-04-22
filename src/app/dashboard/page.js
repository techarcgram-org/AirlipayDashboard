"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { BsPatchCheckFill, BsClipboardCheckFill, BsClipboardMinusFill } from "react-icons/bs";
import { FaUsers, FaUsersCog, FaUsersSlash } from "react-icons/fa";
import { FaUsersBetweenLines, FaMoneyBillTransfer } from "react-icons/fa6";
import { BiSolidErrorAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../GlobalRedux/Features/userSlice";
import { listAdmins } from "../GlobalRedux/Features/adminSlice";
import { readClients } from "../GlobalRedux/Features/clientSlice";
import { readTransactions } from "../GlobalRedux/Features/transactionSlice";

const page = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.clients);
  const { admins } = useSelector((state) => state.admins);
  const { users } = useSelector((state) => state.users);
  const { transactions } = useSelector((state) => state.transactions);

  const [txnData, setTxnData] = useState([])
  const [successfulTxn, setSuccessfulTxn] = useState([])
  const [failedTxn, setFailedTxn] = useState([])

  const [adminData, setAdminData] = useState([])
  const [pendingAdmins, setPendingAdmins] = useState([])
  const [activeAdmins, setActiveAdmins] = useState([])
  const [decAdmins, setDecAdmins] = useState([])
  const [blockedAdmins, setBlockedAdmins] = useState([])

  const [userData, setUserData] = useState([])
  const [pendinUsers, setPendinUsers] = useState([])
  const [activUsers, setActivUsers] = useState([])
  const [decUsers, setDecUsers] = useState([])
  const [blockeUsers, setBlockeUsers] = useState([])

  const [clientData, setClientData] = useState([])
  const [pendingClients, setPendingClients] = useState([])
  const [activeClients, setActiveClients] = useState([])
  const [decClients, setDecClients] = useState([])
  const [blockedClients, setBlockeClients] = useState([])

  const categorizeTxns = () => {
    const success = txnData.filter(txn => txn.status === 'SUCCESS');
    const failed = txnData.filter(txn => txn.status === 'FAILED');

    setSuccessfulTxn(success);
    setFailedTxn(failed);
  };

  const categorizeAdmins = () => {
    const pending = adminData.filter(admin => admin.accounts.account_status === 'PENDING');
    const active = adminData.filter(admin => admin.accounts.account_status === 'ACTIVE');
    const declined = adminData.filter(admin => admin.accounts.account_status === 'DEACTIVATED');
    const blocked = adminData.filter(admin => admin.accounts.account_status === 'BLOCKED');

    setPendingAdmins(pending);
    setActiveAdmins(active);
    setDecAdmins(declined);
    setBlockedAdmins(blocked);
  };

  const categorizeUsers = () => {
    const pending = userData.filter(user => user.account_status === 'PENDING');
    const active = userData.filter(user => user.account_status === 'ACTIVE');
    const declined = userData.filter(user => user.account_status === 'DEACTIVATED');
    const blocked = userData.filter(user => user.account_status === 'BLOCKED');

    setPendinUsers(pending);
    setActivUsers(active);
    setDecUsers(declined);
    setBlockeUsers(blocked);
  };

  const categorizeClients = () => {
    const pending = clientData.filter(client => client.accounts.account_status === 'PENDING');
    const active = clientData.filter(client => client.accounts.account_status === 'ACTIVE');
    const declined = clientData.filter(client => client.accounts.account_status === 'DEACTIVATED');
    const blocked = clientData.filter(client => client.accounts.account_status === 'BLOCKED');

    setPendingClients(pending);
    setActiveClients(active);
    setDecClients(declined);
    setBlockeClients(blocked);
  };

  useEffect(() => {
    dispatch(listUsers())
    dispatch(listAdmins())
    dispatch(readClients())
    dispatch(readTransactions())
  }, [])

  useEffect(() => {
    setAdminData(admins)
    setUserData(users)
    setClientData(data)
    setTxnData(transactions)
  }, [users, admins, data, transactions])

  useEffect(() => {
    categorizeAdmins()
  }, [adminData])

  useEffect(() => {
    categorizeUsers()
  }, [userData])

  useEffect(() => {
    categorizeClients()
  }, [clientData])

  useEffect(() => {
    categorizeTxns()
  }, [txnData])

  return (
    <div>
      <div className={styles.rows}>
        <h3>Admins</h3>
        <div className={styles.users}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.green}`}><FaUsers /></div>
            <div className={styles.detail}>
              <h3 className={styles.green}>{activeAdmins?.length}</h3>
              <p>Active</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.yellow}`}>< FaUsersBetweenLines /></div>
            <div className={styles.detail}>
              <h3 className={styles.yellow}>{pendingAdmins?.length}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.purple}`}><FaUsersCog /></div>
            <div className={styles.detail}>
              <h3 className={styles.purple}>{decAdmins?.length}</h3>
              <p>Deactivated</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkred}`}><FaUsersSlash /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkred}>{blockedAdmins?.length}</h3>
              <p>Blocked</p>
            </div>
          </div>
        </div>

        <h3>Users</h3>
        <div className={styles.users}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.green}`}><FaUsers /></div>
            <div className={styles.detail}>
              <h3 className={styles.green}>{activUsers?.length}</h3>
              <p>Active</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.yellow}`}>< FaUsersBetweenLines /></div>
            <div className={styles.detail}>
              <h3 className={styles.yellow}>{pendinUsers?.length}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.purple}`}><FaUsersCog /></div>
            <div className={styles.detail}>
              <h3 className={styles.purple}>{decUsers?.length}</h3>
              <p>Deactivated</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkred}`}><FaUsersSlash /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkred}>{blockeUsers?.length}</h3>
              <p>Blocked</p>
            </div>
          </div>
        </div>

        <h3>Clients</h3>
        <div className={styles.users}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.green}`}><FaUsers /></div>
            <div className={styles.detail}>
              <h3 className={styles.green}>{activeClients?.length}</h3>
              <p>Active</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.yellow}`}>< FaUsersBetweenLines /></div>
            <div className={styles.detail}>
              <h3 className={styles.yellow}>{pendingClients?.length}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.purple}`}><FaUsersCog /></div>
            <div className={styles.detail}>
              <h3 className={styles.purple}>{decClients?.length}</h3>
              <p>Deactivated</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkred}`}><FaUsersSlash /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkred}>{blockedClients?.length}</h3>
              <p>Blocked</p>
            </div>
          </div>
        </div>

        <h3>Transactions</h3>
        <div className={styles.transactions}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkblue}`}><FaMoneyBillTransfer /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkblue}>{txnData?.length}</h3>
              <p>Total</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.green}`}><BsPatchCheckFill /></div>
            <div className={styles.detail}>
              <h3 className={styles.green}>{successfulTxn?.length}</h3>
              <p>Successful</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkred}`}><BiSolidErrorAlt /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkred}>{failedTxn?.length}</h3>
              <p>Failed</p>
            </div>
          </div>
        </div>

        <h3>Invoices</h3>
        <div className={styles.invoices}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.green}`}><BsClipboardCheckFill /></div>
            <div className={styles.detail}>
              <h3 className={styles.green}>0</h3>
              <p>Paid</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.darkred}`}><BsClipboardMinusFill /></div>
            <div className={styles.detail}>
              <h3 className={styles.darkred}>0</h3>
              <p>Unpaid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default page;
