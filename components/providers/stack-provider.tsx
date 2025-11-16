"use client"

import type React from "react"

import { StackProvider } from "@stackframe/stack"
import { stackClientApp } from "@/lib/stack-client"

export function AppStackProvider({ children }: { children: React.ReactNode }) {
  return <StackProvider app={stackClientApp}>{children}</StackProvider>
}
