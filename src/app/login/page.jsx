"use client";
import React from "react";
import { TextInput } from "@/components";

const Page =()=>{
    const checkbox =({label, checked, onchange})
    return (
        <>
        <div>
            <TextInput label={Email}/>
            <TextInput label={Password}/>

            <input
            type="checkbox"
            checked={checked}
            onchange={onchange}/>
            <label>Remeber me</label>

            <div className="button ">
                <button >
                    Login
                </button>
            </div>
        </div>
        </>
    );
};
export default Page