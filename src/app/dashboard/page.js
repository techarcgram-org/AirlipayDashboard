"use client";

import React from "react";
import styles from "./styles.module.css"
import { BsPatchCheckFill, BsClipboardCheckFill, BsClipboardMinusFill } from "react-icons/bs";
import { FaUsers, FaUsersCog, FaUsersSlash } from "react-icons/fa";
import { FaUsersBetweenLines, FaMoneyBillTransfer } from "react-icons/fa6";
import { BiSolidErrorAlt } from "react-icons/bi";

const page = () => {
  return <div>
    <div className={styles.rows}>
      <h3>Admins</h3>
      <div className={styles.users}>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.green}`}><FaUsers /></div>
          <div className={styles.detail}>
            <h3 className={styles.green}>24</h3>
            <p>Active</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.yellow}`}>< FaUsersBetweenLines /></div>
          <div className={styles.detail}>
            <h3 className={styles.yellow}>24</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.purple}`}><FaUsersCog /></div>
          <div className={styles.detail}>
            <h3 className={styles.purple}>24</h3>
            <p>Deactivated</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.darkred}`}><FaUsersSlash /></div>
          <div className={styles.detail}>
            <h3 className={styles.darkred}>24</h3>
            <p>Blocked</p>
          </div>
        </div>
      </div>

      <h3>Users</h3>
      <div className={styles.users}>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.green}`}><FaUsers /></div>
          <div className={styles.detail}>
            <h3 className={styles.green}>24</h3>
            <p>Active</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.yellow}`}>< FaUsersBetweenLines /></div>
          <div className={styles.detail}>
            <h3 className={styles.yellow}>24</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.purple}`}><FaUsersCog /></div>
          <div className={styles.detail}>
            <h3 className={styles.purple}>24</h3>
            <p>Deactivated</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.darkred}`}><FaUsersSlash /></div>
          <div className={styles.detail}>
            <h3 className={styles.darkred}>24</h3>
            <p>Blocked</p>
          </div>
        </div>
      </div>

      <h3>Clients</h3>
      <div className={styles.clients}>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.green}`}><FaUsers /></div>
          <div className={styles.detail}>
            <h3 className={styles.green}>24</h3>
            <p>Active</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.purple}`}><FaUsersSlash /></div>
          <div className={styles.detail}>
            <h3 className={styles.purple}>24</h3>
            <p>Inctive</p>
          </div>
        </div>
      </div>

      <h3>Transactions</h3>
      <div className={styles.transactions}>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.darkblue}`}><FaMoneyBillTransfer /></div>
          <div className={styles.detail}>
            <h3 className={styles.darkblue}>24</h3>
            <p>Total</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.green}`}><BsPatchCheckFill /></div>
          <div className={styles.detail}>
            <h3 className={styles.green}>24</h3>
            <p>Successful</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.darkred}`}><BiSolidErrorAlt /></div>
          <div className={styles.detail}>
            <h3 className={styles.darkred}>24</h3>
            <p>Failed</p>
          </div>
        </div>
      </div>

      <h3>Invoices</h3>
      <div className={styles.invoices}>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.green}`}><BsClipboardCheckFill /></div>
          <div className={styles.detail}>
            <h3 className={styles.green}>24</h3>
            <p>Paid</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.darkred}`}><BsClipboardMinusFill /></div>
          <div className={styles.detail}>
            <h3 className={styles.darkred}>24</h3>
            <p>Unpaid</p>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default page;
