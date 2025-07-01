"use client"

import type React from "react"

import { AppShell } from "@/components/layout/AppShell"
import { RoleSwitcher } from "@/components/RoleSwitcher"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell>
      {children}
      <RoleSwitcher />
    </AppShell>
  )
}
