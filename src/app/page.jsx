"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = ({}) => {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
  return <div>lkjklasdf</div>;
};

export default page;
