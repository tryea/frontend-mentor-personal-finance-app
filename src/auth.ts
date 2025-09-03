import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const loginUrl = `${process.env.API_BASE_URL}${process.env.API_PREFIX}/auth/login`;
        console.log("Attempting to log in at:", loginUrl);

        try {
          const res = await fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            console.error("Login failed with status:", res.status, res.statusText);
            const errorBody = await res.text();
            console.error("Error body:", errorBody);
            return null;
          }

          const user = await res.json();

          if (user) {
            return user;
          }
        } catch (error) {
          console.error("Error during login fetch:", error);
          return null;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});