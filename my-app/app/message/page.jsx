"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MessageIndex() {
  const router = useRouter();
  useEffect(() => { router.replace("/message/principal"); }, [router]);
  return null;
}
