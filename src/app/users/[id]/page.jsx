"use client";

import { UserDetails } from "@/components";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <UserDetails
        email="charles1234@gmail.com"
        phoneNumber={+237670203775}
        join="07/07/2023"
        address="Molyko Buea"
        activated="08/12/2023"
        aBalance={5000}
        tAmount={5000}
        nBalance={5000}
        fee={5000}
      />
    </div>
  );
};

export default page;
