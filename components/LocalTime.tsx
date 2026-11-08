"use client";

import { useEffect, useState } from "react";

const format = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit" }).format(new Date());

/** The current time in Milan, ticking once a minute. Renders nothing until mounted. */
export default function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums text-ivory">{time}</span>;
}
