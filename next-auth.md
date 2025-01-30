## Quick notes and snippets on next-auth library

## 1. Setting up the next-auth library

**official docs to <a href="https://next-auth.js.org/getting-started/example">old guide,</a>
<a href="https://next-auth.js.org/configuration/initialization#route-handlers-app">new guide</a>**

**Alright first step we install the library by using the command:**

```
npm install next-auth
```

**Now create a new file in the /app/api/auth/[...nextauth]/route.ts and a file in /src/lib/auth.ts
(this one is just for cleaner code)**

The folder structure should look like:

```
src/
└─ api
|   ├── auth/
|   |   └─ [...nextauth]/
|   |           └─ route.ts
└─ lib/
    └─ auth.ts      <---- this file exports auth options
```

**Alright now time for the starter code:**

```typescript
// /api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

```typescript
// /src/lib/auth.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    // you can add more providers here
    CredentialsProvider({
      name: "Signin",
      credentials: {
        firstname: {
          label: "First Name",
          type: "text",
          placeholder: "firstname",
        },
        lastname: {
          label: "Last Name",
          type: "text",
          placeholder: "lastname",
        },
        email: {
          label: "email",
          type: "email",
          placeholder: "jhondoe@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "enter your password",
        },
      },

      async authorize(credentials, req) {
        const user = {
          id: "uesrUUID1",
          email: credentials?.email,
          firstname: credentials?.firstname,
          lastname: credentials?.lastname,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
```

**ok now that that's done you can go ahead and test this out by going to localhost:3000/api/auht/signin.
After successful signin next-auth would have put some cookies including the jwt token in your browser.**

**Alright so we've done a successful signin now we wanna access the data in the jwt, there are mostly
three times you'll need this data:**

#### 1. On the server component which can easily be done with:

```typescript
export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  console.log(session);
}
```

#### 2. On the server api route which can also be done exactly the same as above no difference:

```typescript
export async function GET() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return NextResponse.json({ authenticated: session ? true : false });
}
```

#### 3. On the client side (now this requires a bit of work)

**Now on the client side next-auth expects you to wrap your application in a session provider and
then you can use useSession() hook on the client**
**`NOTE: what this useSession() hook is going to do is make an HTTP request from the client to the
server to get the session information`**

**First start off by making a `providers.tsx` file in the app/ directory and then put this code init:**

(this is pretty self explainatory)

```typescript
// app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
```

**Now in the `layout.tsx` wrap the children with this providers component like so:**

```typescript
// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} antialiased`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

Now in any of your client components you can have use the `useSession()` hook to get the session
information like so:

```typescript
"use client";
import { useSession } from "next-auth/react";

export default function ClientSession() {
  const session = useSession();

  return (
    <div className="flex flex-col">
      <h1>Client session:</h1>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
```
