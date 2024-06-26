"use client";

import React, { useEffect, useState } from "react";
import { SelectInput, TextInput } from "@/components/";
import { Formik } from "formik";
import data from "@/constant/data";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../../../GlobalRedux/Features/clientSlice";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

const Page = () => {
  // const [files, setFiles] = useState(null);
  const { loading } = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   console.log("files", files);
  // }, [files]);

  return (
    <div className="flex justify-center max-w-full mx-auto bg-gray-300 p-4">
      <div className="max-w-3xl">
        <div className="flex items-start my-3">
          <h2 className="capitalize text-2xl font-bold">create client</h2>
        </div>
        <Formik
          initialValues={{
            name: "",
            street: "",
            primaryPhone: "",
            city: "",
            taxId: "",
            bankAccountNumber: "",
            nextPaymentDate: "",
            email: "",
            secondaryPhone: "",
            region: "",
            bank: "",
            clientCommision: "",
            industry: "",
            password: "",
            confirmPassword: "",
            file: null,
          }}
          // validationSchema={createClientValidator}
          onSubmit={async (values) => {
            const response = await dispatch(addClient(values));
            if (response.meta.requestStatus === "fulfilled") {
              router.push("/dashboard/clients");
            }
          }}
        >
          {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex justify-between">
                {/* First Column */}
                <div className="w-1/2 mr-2">
                  <TextInput
                    label="Client Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Client Name"
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
                    label="Tax ID"
                    name="taxId"
                    value={values.taxId}
                    onChange={handleChange}
                    placeholder="1234567890"
                    type="text"
                    required
                  />
                </div>

                {/* Second Column */}
                <div className="w-1/2 ml-2">
                  <TextInput
                    label="Next Payment Date"
                    name="nextPaymentDate"
                    value={values.nextPaymentDate}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    type="date"
                    required
                  />
                  <SelectInput
                    label="Bank Name"
                    name="bank"
                    // value={values.bank}
                    onChange={handleChange}
                    options={data.cameroonBanks}
                    required
                  />
                  <TextInput
                    label="Bank Account Number"
                    name="bankAccountNumber"
                    value={values.bankAccountNumber}
                    onChange={handleChange}
                    placeholder="10091005125"
                    type="text"
                    required
                  />
                  <TextInput
                    label="Client Commission"
                    name="clientCommision"
                    value={values.clientCommision}
                    onChange={handleChange}
                    placeholder=""
                    type="number"
                  />
                  <TextInput
                    label="Industry"
                    name="industry"
                    value={values.industry}
                    onChange={handleChange}
                    placeholder="Littoral"
                    type="text"
                  />
                  <TextInput
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                  />
                  <TextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    type="password"
                  />
                </div>
              </div>
              {/* file upload */}
              {/* <div className="mx-auto my-4 w-[90%] md:w-[50%] h-auto">
                <p className=" font-semibold ml-1 mb-2">
                  Upload Employee Roaser:
                </p>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {!values.file ? (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          CSV (MAX. 12Mb)
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">
                          {values.file?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                          {values.file?.size} kb
                        </p>
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      name="file"
                      className="hidden"
                      onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                        setFiles(event.currentTarget.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div> */}

              <button
                type="submit"
                className="w-full bg-[#3F5F90] py-2 mt-8 capitalize text-white text-center text-xl cursor-pointer"
              >
                {loading ? (
                  <Spinner size={25} loading={true} />
                ) : (
                  "register client"
                )}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
