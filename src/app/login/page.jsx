"use client";

import { FaRegEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginThunk } from "../GlobalRedux/Features/accountSlice";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    onSubmit: async (values) => {
      const response = await dispatch(loginThunk(values));
      if (response.meta.requestStatus === "fulfilled") {
        router.push("/dashboard");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col w-[30%] bg-white p-20 rounded-lg"
    >
      <p className="text-3xl font-bold mb-8 self-center">Log in</p>
      <div className="flex flex-col">
        <div className="flex border-solid border-2 border-gray-400 rounded p-2">
          <FaRegEnvelope size={"25px"} className="text-gray-400" />
          <input
            type="text"
            placeholder="username"
            className="text-gray-400 active:border-none focus:border-none focus:outline-none mx-2 w-full"
            {...formik.getFieldProps("username")}
          />
        </div>

        <div className="flex border-solid border-2 border-gray-400 rounded p-2 mt-4">
          <FaLock size={"25px"} className="text-gray-400" />
          <input
            type="password"
            placeholder="password"
            className="text-gray-400 active:border-none focus:border-none focus:outline-none mx-2 w-full"
            {...formik.getFieldProps("password")}
          />
        </div>
      </div>
      <div className="flex justify-between my-4 text-sm font-medium">
        <div className="">
          <input
            type="checkbox"
            name="remember"
            {...formik.getFieldProps("remember")}
          />
          <span className="ml-1">Remeber me</span>
        </div>
        <a href="" className=" text-blue-700">
          Forgot Password?
        </a>
      </div>
      <button type="submit" className=" bg-blue-800 text-white py-2 mt-8">
        Log in
      </button>
      <p className="text-sm mt-4 self-center">
        Can't Log in?{" "}
        <a href="" className=" text-blue-800">
          Contact admin
        </a>
      </p>
    </form>
  );
};
export default Login;
