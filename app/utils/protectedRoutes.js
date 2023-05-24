'use client';
import { useRouter } from "next/navigation";

const protectedRoutes = async () => {
    const router = useRouter();
    const res = await fetch(`${process.env.NEXT_PUBLIC_url}/api/auth/me`, {
        credentials: "include",
        cache: "no-store",
    });
    const data = await res.json();
    if (data.success === false) router.push("/signin");
};

export default protectedRoutes; 