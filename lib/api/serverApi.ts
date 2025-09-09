import { User } from "@/types/user";
import { api } from "./api";
import { cookies } from "next/headers";
import { CheckSessionRequest } from "./clientApi";


export const checkSession = async () => {
    const cookieStore = await cookies()
    const checkSessionRep = await api.get<CheckSessionRequest>('/auth/session', {
        headers: {
            Cookie: cookieStore.toString()
        }
    });
    
  return checkSessionRep;
};

export async function getUser(): Promise<User>{
    const cookieStore = await cookies()
    const getUserRep = await api.get<User>('/users/me', {
        headers: {
            Cookie:cookieStore.toString()
        }
    })

    return getUserRep.data;
}


