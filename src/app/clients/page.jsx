"use client";

import bankAccounts from "@/utils/data/banks";
import { Tab, Table } from "../../components";
import data from "../../constant/data";
import transactions from "@/utils/data/payment";

const Page = () => {
  console.log(transactions)
  return (
    <div>
      <Tab
        options={[
          "Transactions",
          "Activity Feed",
          "User Roster",
          "Bank Accounts",
          "Payment History",
        ]}
        defaultTab="Transactions"
      >
        <Table
          tab="Transactions"
          users={data.clientsTable}
          columns={data.clientColumns}
        />
        <div tab="Activity Feed" className="mx-auto flex-center items-center">
          <h3>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto
            vero voluptate nostrum, ad quidem delectus earum nesciunt,
            laudantium aut quo fugit aperiam nobis cumque voluptatem vel
            reiciendis dolor ratione est perferendis magni et. Ex tempora
            blanditiis tenetur eligendi laudantium, officia consequuntur
            provident debitis rerum totam reiciendis accusantium architecto sunt
            vitae quod cupiditate obcaecati. Iusto quaerat impedit deserunt
            molestiae iure eos.
          </h3>
        </div>
        <Table
          tab="User Roster"
          users={data.clientsTable}
          columns={data.clientColumns}
        />
        <Table
          tab="Bank Accounts"
          users={bankAccounts}
          columns={data.banksColumns}
        />
        <Table
          tab="Payment History"
          users={transactions}
          columns={data.paymentColumns}
        />
      </Tab>
    </div>
  );
};

export default Page;
