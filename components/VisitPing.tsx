"use client";

import { useEffect } from "react";

export function VisitPing() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("visit_pinged")) return;
      sessionStorage.setItem("visit_pinged", "1");
      fetch("/api/visits", { method: "POST", keepalive: true }).catch(() => {});
    } catch {
      // ignore
    }
  }, []);
  return null;
}
