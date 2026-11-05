import {redirect} from "next/navigation";
import {getSessionUser} from "@/lib/auth";
import AdminClient from "./client";
export default async function AdminPage(){const user=await getSessionUser();if(user?.role!=="ADMIN")redirect("/admin/login");return <AdminClient/>;}
