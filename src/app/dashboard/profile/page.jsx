"use client";

import React, { useEffect, useState } from "react";
import UserDetails from "../../../components/user/profile";
import { useDispatch, useSelector } from "react-redux";
import { readClient } from "../../GlobalRedux/Features/clientSlice";
import { listAdmin } from "../../GlobalRedux/Features/adminSlice";
import { listUser } from "../../GlobalRedux/Features/userSlice";
import moment from "moment";
import Loading from "../loading";

const page = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.clients);
  const { admins } = useSelector((state) => state.admins);
  const { user } = useSelector((state) => state.users);

  const [role, setRole] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    (async () => {
      const role = localStorage.getItem("airlypayUserRole");
      const userId = localStorage.getItem("airlipayUserId");
      setRole(role);
      if (role === "CLIENT") {
        dispatch(readClient(parseInt(userId)));
      }
      if (role === "ADMIN") {
        dispatch(listAdmin(parseInt(userId)));
      }
      if (role === "USER") {
        dispatch(listUser(parseInt(userId)));
      }
    })();
  }, []);

  useEffect(() => {
    if (role === "ADMIN") {
      setUserData(admins);
    }
    if (role === "USER") {
      setUserData(user);
    }
    if (role === "CLIENT") {
      setUserData(data);
    }
  }, [role, data, admins, user]);

  if (!userData) {
    return <Loading />;
  }

  console.log(userData);

  return (
    <div>
      <UserDetails
        name={userData?.name}
        email={userData?.accounts?.email}
        phoneNumber={userData?.addresses?.primary_phone_number}
        join={moment(userData?.created_at).format("DD/MM/YYYY HH:mm")}
        address={userData?.addresses?.city}
        status={userData?.accounts?.account_status}
        activated={moment(userData?.accounts?.activation_date).format(
          "DD/MM/YYYY HH:mm"
        )}
      />
    </div>
  );
};

export default page;
