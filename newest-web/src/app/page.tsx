"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase";
import { getAnalytics } from "firebase/analytics";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
    router.replace("/home");
  }, [router]);

  return null;
}
