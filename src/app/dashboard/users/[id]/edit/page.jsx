"use client";

import React, { useEffect, useState } from "react";
import {
  CheckboxInput,
  FileInput,
  SelectInput,
  TextInput,
} from "@/components/";
import { Formik } from "formik";
import data from "@/constant/data";
import { useDispatch, useSelector } from "react-redux";
// import { addClient } from "../../../GlobalRedux/Features/clientSlice";
// import { createClientValidator } from "@/app/validatorSchemas/createClientValidator";
import Spinner from "@/components/Spinner";
import { useRouter, useSearchParams } from "next/navigation";

const Page = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("router", router, searchParams.get("name"));
  const { loading, error } = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center max-w-full mx-auto bg-gray-300 p-4">
      <div className="max-w-3xl w-[48rem]">
        <div className="flex items-start my-3">
          <h2 className="capitalize text-2xl font-bold">edit user</h2>
        </div>
        <Formik
          initialValues={{
            name: searchParams.get("name"),
            email: searchParams.get("email"),
            baseSalary: searchParams.get("baseSalary"),
            dob: searchParams.get("dob"),
            sex: searchParams.get("sex"),
            clientId: "",
            city: searchParams.get("city"),
            street: searchParams.get("street"),
            region: searchParams.get("region"),
            primaryPhone: searchParams.get("primaryPhone"),
            seconddaryPhone: searchParams.get("secondaryPhone"),
          }}
          // validationSchema={createClientValidator}
          onSubmit={async (values) => {
            console.log(values);
            // const response = await dispatch(addClient(values));
            // if (response.meta.requestStatus === "fulfilled") {
            //   router.push("/dashboard/clients");
            // }
          }}
        >
          {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <div className="flex justify-between">
                {/* First Column */}
                <div className="w-1/2 mr-2">
                  <TextInput
                    label="Full Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="User full name"
                    type="text"
                    required
                  />
                  <TextInput
                    label="Email Address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    type="email"
                    required
                  />
                  <TextInput
                    label="Date of Birth"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    placeholder="DD/MM/YY"
                    type="date"
                    required
                  />
                  <SelectInput
                    label="Sex"
                    name="sex"
                    value={values.sex}
                    onChange={handleChange}
                    options={data.sex}
                    required
                  />
                  <TextInput
                    label="Base Salary"
                    name="baseSalary"
                    value={values.baseSalary}
                    onChange={handleChange}
                    placeholder="10000"
                    type="number"
                    required
                  />
                </div>

                {/* Second Column */}
                <div className="w-1/2 ml-2">
                  <div className="flex items-center w-full justify-between">
                    <TextInput
                      label="Street"
                      name="street"
                      value={values.street}
                      onChange={handleChange}
                      placeholder="Street"
                      type="text"
                      half
                      additionalStyles={{ marginRight: 12 }}
                      required
                    />
                    <TextInput
                      label="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      placeholder="city"
                      type="text"
                      half
                      additionalStyles={{ marginLeft: 12 }}
                      required
                    />
                  </div>
                  <SelectInput
                    label="Region"
                    name="region"
                    // value={values.region}
                    options={data.regionsInCameroon}
                    onChange={handleChange}
                    type="select"
                    required
                  />
                  <TextInput
                    label="Primary Phone"
                    name="primaryPhone"
                    value={values.primaryPhone}
                    onChange={handleChange}
                    placeholder="670000000"
                    type="number"
                    required
                  />
                  <TextInput
                    label="Secondary Phone Number"
                    name="secondaryPhone"
                    value={values.secondaryPhone}
                    onChange={handleChange}
                    type="number"
                    placeholder="673000000"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3F5F90] py-2 mt-8 capitalize text-white text-center text-xl cursor-pointer"
              >
                {loading ? <Spinner size={25} loading={true} /> : "update user"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
