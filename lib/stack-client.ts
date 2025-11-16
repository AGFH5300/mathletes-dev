"use client"

import { StackClientApp } from "@stackframe/stack"

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/admin/login",
    afterSignIn: "/admin/dashboard",
    afterSignOut: "/",
  },
})
