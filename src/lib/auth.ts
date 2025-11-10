import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";
import { polar, checkout, portal, usage, } from "@polar-sh/better-auth";
import {polarClient} from './polar'
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins:[
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
            products: [
                {
                    productId: "0f7fc8e4-098f-4f46-a381-a27f42e919f9",
                    slug: "Fuzion-Pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/Fuzion-Pro
                }
            ],
            successUrl: process.env.POLAR_SUCCESS_URL,
            authenticatedUsersOnly: true
        }),
        portal()
    ],
    })
  ]
});
