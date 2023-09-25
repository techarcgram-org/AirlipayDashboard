import Link from 'next/link';
import React from 'react'

const SidebarCard = ({to,text,icon}) => {
  return (
    <div>
      <Link href={to}>
        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            router.pathname == "/billing"
              ? "bg-orange-100 text-orange-500"
              : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
          }`}
        >
          <div className="mr-2">
            {icon}
            {/* <CreditCardIcon className="h-5 w-5" /> */}
          </div>
          <div>
            <p>{text}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SidebarCard