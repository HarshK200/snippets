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

#### One. On the server component which can easily be done with:

```typescript
export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  console.log(session);
}
```

#### Two. On the server api route which can also be done exactly the same as above no difference:

```typescript
export async function GET() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return NextResponse.json({ authenticated: session ? true : false });
}
```

#### Thrid. On the client side (now this requires a bit of work)

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

<br>

## 2. Adding Custom key-value pair in the JWT that is created by next-auth

<a href="https://next-auth.js.org/configuration/callbacks">Official Callbacks docs</a>

**Alright so in order to do this you need to overwrite one of the callbacks in the /src/app/api/[...nextauth]/routes.ts
where you wrote the credentials provider**

This is explained well in this <a href="https://youtu.be/2kgqPvs0j_I?si=gQPfRnY7Z1re2Nyo&t=1542">video(timestamped): </a>

In the docs there are four callbacks mentioned:

- signIn
- redirect
- session
- jwt

**we are interested in the last two i.e. session and jwt**

**The flow of authentication is like so:**

```
async function authorize  <--------- defined in the provider object
      |
      |
      |
    jwt() callback        <----- this passes the token to session() callback
      |
      |
      |
    session() callback    <----- this uses the token that was passed from jwt() callback
```

we wanna add custom key to our jwt token, Alright here's how this is works in order to pass some
custom key through we have to return it from the `async function authorize()` then pass it through
the `jwt() callback` and then use it in the `session() callback`

So what we do is let's say we want `firstname`, `lastname` and `id` as the custom fields we can
return these fields from the user our `authorize function` and then in the `jwt() callback` as well
we can spread the token fields and add the extra fields we want from the user object.
`NOTE: the user object is only awailable when user is logining-in, for all other cases the its undefined`
also after this we can in the `session() callback` we can access those properties from the token,
and return them as a user field.

**Example:**

```typescript
export const authOptions: AuthOptions = {
  providers: [
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
        // ...auth logic and check against db here

        // this will be what goes into the jwt token by next-auth
        return {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as User;

        return {
          ...token,
          id: u.id,
          firstname: u.firstname,
          lastname: u.lastname,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          firstname: token.firstname,
          lastname: token.lastname,
        },
      };
    },
  },
};
```
