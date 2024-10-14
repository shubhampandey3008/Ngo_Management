'use server';

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function handleSignOut()
{
    try {
        await signOut();
    } catch (error) {
        console.log("Sign Out failed with the error :" , error )
        return false
    }

    return true;
}