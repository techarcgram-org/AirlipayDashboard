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
import { addClient } from "../../../GlobalRedux/Features/clientSlice";
import { createClientValidator } from "@/app/validatorSchemas/createClientValidator";
import Spinner from "@/components/Spinner";

const Page = () => {
  const [multiple, setMultiple] = useState(false);
  const [files, setFiles] = useState(null);
  const { loading, error } = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("files", files);
  }, [files]);

  return (
    <div className="flex justify-center max-w-full mx-auto bg-gray-300 p-4">
      <div className="max-w-3xl w-[48rem]">
        <div className="flex items-start my-3">
          <h2 className="capitalize text-2xl font-bold">create user</h2>
        </div>
        <div className="flex mb-4">
          <input
            type="checkbox"
            id="multiple"
            onChange={() => setMultiple(!multiple)}
          />
          <label className="ml-2 font-semibold" htmlFor="multiple">
            Add multiple users
          </label>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            baseSalary: "",
            dob: "",
            sex: "",
            clientId: "",
            city: "",
            street: "",
            region: "",
            primaryPhone: "",
            seconddaryPhone: "",
          }}
          // validationSchema={createClientValidator}
          onSubmit={async (values) => {
            console.log("USERVALUES", values);
            // const response = await dispatch(addClient(values));
            // if (response.meta.requestStatus === "fulfilled") {
            //   router.push("/dashboard/clients");
            // }
          }}
        >
          {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              {multiple ? (
                /* file upload */
                <div className="flex flex-col flex-between my-4 h-auto">
                  <p className="font-semibold ml-1 mb-2">
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
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
                            {(values.file?.size / 1024).toFixed(2)} MB
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
                </div>
              ) : (
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
              )}

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
