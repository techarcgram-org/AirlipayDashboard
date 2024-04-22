"use client";

import React, { useEffect, useState } from "react";
import { SelectInput, TextInput } from "@/components/";
import { Formik } from "formik";
import data from "@/constant/data";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Spinner";
import { updateAdmin, listAdmin } from "@/app/GlobalRedux/Features/adminSlice";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const Page = () => {
  const { loading, admins } = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    dispatch(listAdmin(id));
  }, [id]);

  useEffect(() => {
    const getUser = () => {
      if (
        typeof admins === "object" &&
        admins !== null &&
        !Array.isArray(admins)
      ) {
        const formattedData = {
          id: admins?.id,
          name: admins?.name,
          email: admins?.accounts?.email,
          primaryPhone: admins?.addresses?.primary_phone_number,
          city: admins?.addresses?.city,
          region: admins?.addresses?.region,
          street: admins?.addresses?.street,
          mobileMoneyNumber: admins?.mobile_money_number,
          secondaryPhone: admins?.addresses?.secondery_phone_number,
        };
        setUser(formattedData);
      }
    };
    getUser();
  }, [admins]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center max-w-full mx-auto bg-gray-300 p-4">
      <div className="max-w-3xl w-[48rem]">
        <div className="flex items-start my-3">
          <h2 className="capitalize text-2xl font-bold">Edit admin</h2>
        </div>
        <Formik
          initialValues={user || {}}
          onSubmit={async (values) => {
            const response = await dispatch(updateAdmin(values));
            if (response.meta.requestStatus === "fulfilled") {
              router.push("/dashboard/admins");
            }
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
                    label="Primary Phone"
                    name="primaryPhone"
                    value={values.primaryPhone}
                    onChange={handleChange}
                    placeholder="670000000"
                    type="number"
                    required
                  />
                  <TextInput
                    label="Mobile Money Number"
                    name="mobileMoneyNumber"
                    value={values.mobileMoneyNumber}
                    onChange={handleChange}
                    placeholder="670000000"
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
                    label="Secondary Phone Number"
                    name="secondaryPhone"
                    value={values.secondaryPhone}
                    onChange={handleChange}
                    type="number"
                    placeholder="673000000"
                  />
                  <TextInput
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#3F5F90] py-2 mt-8 capitalize text-white text-center text-xl cursor-pointer"
              >
                {loading ? (
                  <Spinner size={25} loading={true} />
                ) : (
                  "update admin"
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
