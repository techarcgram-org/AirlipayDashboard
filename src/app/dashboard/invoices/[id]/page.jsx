import React from "react";
import styles from "./styles/invoice.module.css";

const page = () => {
  return (
    <div className={styles.invoice}>
      <h2 className={styles.title}>Earned Wage Access Reimbursement Invoice</h2>
      <div className={styles.invoice_number}>
        <h3>Invoice Number</h3>
        <p>7346823488349</p>
      </div>
      <div className={styles.invoice_date}>
        <h3>Date</h3>
        <p>7346823488349</p>
      </div>
      <div className={styles.address}>
        <div>
          <h3>To:</h3>
          <p>Njeiforbi Limited</p>
          <p>Molyko, Buea</p>
        </div>
        <div>
          <h3>From:</h3>
          <p>Techarcgram Company Limited</p>
          <p>Bakweri town, Buea </p>
        </div>
      </div>
      <div className={styles.summary}>
        <h2>Summary of Services</h2>
        <table>
          <thead>
            <th>DESCRIPTION</th>
            <th>QUANTITY</th>
            <th>AMOUNT</th>
          </thead>
          <tbody>
            <tr>
              <td>Total Earned Wage Access Requests</td>
              <td>
                <h3>100</h3>
              </td>
              <td>-</td>
            </tr>
            <tr>
              <td>Total Wages Advanced</td>
              <td>
                <h3>-</h3>
              </td>
              <td>500,000 XAF</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Total Amount Due</td>
              <td>-</td>
              <td>500,000 XAF</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className={styles.payment_terms}>
        <div className={styles.terms}>
          <h3>Payment Terms</h3>
          <div>
            <p>
              Payment is due upon receipt of this invoice. Please include the
              Invoice Number 2024-03-08 as the payment reference for Mobile
              Money transactions as well.
            </p>
          </div>
        </div>

        <div className={styles.banks}>
          <div>
            <p>For bank transfers: </p>
            <ul>
              <li>- Bank: UBA Cameroon</li>
              <li>- Account Name: Techarcgram Company Limited</li>
              <li>- Account Number: 123-456-789</li>
              <li>- SWIFT Code: FTBC1234X</li>
            </ul>
          </div>
          <div>
            <p>For Mobile Money: </p>
            <ul>
              <li>- Mtn Momo: (+237) 6XX XXX XXX</li>
              <li>- Orange Momo: (+237) 6XX XXX XXX</li>
              <li>- Name: Techarcgram company limited</li>
            </ul>
          </div>
        </div>

        <div className={styles.note}>
          <h3>NOTE</h3>
          <p>
            Please note, detailed transaction reports are available in the
            dashboard or upon request.
          </p>
          <p>
            By fulfilling this invoice, Acme Corp acknowledges that all listed
            services were provided by InstantPay Solutions as per the terms
            agreed upon by both parties.
          </p>
          <p>
            For any inquiries regarding this invoice, please contact Jane Smith
            at (098) 765-4321 or via email at janesmith@instantpaysolutions.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
