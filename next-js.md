## Some common and annoying things in next.js & there quick solutions

<br>

## 1. Changing fonts

Changing fonts in next.js is a little it different here's how it works: <br>
**Firstly if you have custom fonts then may god help you,** but if you wanna choose something from
google fonts then it's simple enough.

**open the layout.tsx or .jsx file in the app/ folder (you'r using app router right?) by default**
**it's something like this:**

```js
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Here Above there are two fonts being used geistSans, geistMono just change it to**
**whatever you wanna use like so:**

```js
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "jae-Commerce",
  description: "just another e-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.className} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
```

**i wanna use Montserrat so i just import Montserrat from next/font/google and make a variable of**
**it subsets just write latin and the variable so you can change the font weight with css**

`NOTE: some fonts are not variable, if that's the case for you(for eg. Roboto), then you gotta do a
little bit of work to get variable fonts(when using tailwindcss)`

STEP 1: Set the weight to an array of all the supported weights, don't forget to set subset and
variable as well

```js
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "jae-Commerce",
  description: "just another e-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} antialiased`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

STEP 2: Add this to the tailwindcss config extend part

```js
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme"; **<---------- also import this**

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#050316",
        background: "#fbfbfe",
        primary: "#27ce27",
        secondary: "#e5ffdb",
        accent: "#84ff3d",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans], **<-------- add this here**
      },
    },
  },
  plugins: [],
} satisfies Config;
```

<br>

## 2. Merging routes/ route groups (app router)

**In nextjs we can merge routes using (route_name) folder, the folder structure would look like:**

```
app/
└─ (auth)
    ├── signup/
    |   └── page.tsx
    ├── signin/
    |   └── page.tsx
    |
    └── layout.tsx
```

**NOTE: All the folders whose names are written in brackets like this `(folder)` are ignored by the
app router (but not by nextjs) i.e. there will be no `api/auth` route instead there will be**
**`api/signup` and `api/signin` routes**

Since the (auth) folder will be ignored by the app router but not by nextjs as a whole we can put
the layout.tsx file there to share a same layout for all the routes under the `(auth)` folder

<br>

## 3. SSR (server side rendering)

**SSR in brief** means render the webpage i.e. the html on the server and send the html directly instead
of doing it the react way i.e. send an empty html page with just a div with id="main" which is then
targated by react and then it renders the whole page. **(causes waterfalling problem <= a pretty name
for multiple requests problem)**

#### React way code:

```javascript
export default function Home() {
    const [todos, setTodos] = useState<null | []TodoInterface>();
    const [loading, setLoading] = useState<boolean>(true);

    async function fetchTodos() {
        const res = await axios.get("gettodos.com/bulk");
        const result = res.data;

        return result;
    }

    // This runs on the client hence a (CSR)client side rendered component
    useEffect(() => {
        fetchTodos()
        .then((result) => {
            setTodos(result);
            setLoading(false);
        })
    }, []);

    if(loading) {
        return <LoadingUI />
    }

    return <div>
        {todos!.map(todo => <Todo title={todo.title} status={todo.status}/>)}
    </div>
}
```

#### In Next-js:

**Just make the component async and the request will stay pending until all the async stuff is**
**finished and then only when the html is loaded its sent to client which can we crawled by bots,**
**making it better for SEO(search engine optimization) this is SSR**

```javascript
export default async function Home() {
    const res = await axios.get("gettodos.com/bulk");
    const todos = res.data;

    return <div>
        {todos!.map(todo => <Todo title={todo.title} status={todo.status}/>)}
    </div>
}
```

#### `NOTE: if you wanna add loading ui just make a loading.tsx file right next to page.tsx`

<br>

## 4. '@' Import alias In Next-js

Go to tsconfig.json file in the root of your project directory, it looks like this:

```js
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
        <------------------ *Import alias here*
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

<br>

## 5. Dynamic routes /post/[slug]

### Client component

```typescript
// for example route could be like /chatroom/[roomid]

export default function Room() {
  const { roomid: roomId } = useParams();

  return <div>
    <h1>Roomid: {roomId}</h1>
  </div>
}
```

### Server component

**Here the slug is the parameter that can be accessed like so:**

```typescript
// /post/[slug]/page.tsx
type tParams = Promise<{ postId: string }>

export default async function Page({ params }: { params: tParams }) {
  // NOTE: params are async in Nextjs 15 for some reason so just do this to avoid the warning
  const { postId } = await params;

  return (
    <div className="flex justify-center items-center">
      <h1 className="text-2xl">PostId: {postId}</h1>
    </div>
  );
}
```

**The folder structure should be like:**

```
app/
├── posts/
|   └── [postId]/
|         └── page.tsx
├── layout.tsx
└── page.tsx
```

<br>

## 6. Catch-All Segment

**A folder or file in the form `/docs/[...slug]` will match all segments in that position (e.g.,
`/docs/anything/here` will be matched by `[...slug]`).**

And the slug can be accessed by similar:

```typescript
// /docs/[...slug]/page.tsx
type tParams = Promise<{ slug: string }>;

export default async function ({ params }: { params: tParams }) {
  const { slug } = await params;

  return <div>Hi i'm server rendered slug: {slug}</div>;
}
```

**The folder structure should be like:**

```
app/
├── docs/
|   └── [...slug]/
|         └── page.tsx
├── layout.tsx
└── page.tsx
```

**NOTE: You can also use double brackets like `[[...slug]]` to make the catch-all optional (so it can
match /docs as well as /docs/anything/here).**

**Also if you are wondering why are we doing all this type tParam businness here is because npm run
build doesn't work if we don't, why you may ask read this (i'm too lazy to explain):**
`https://nextjs.org/docs/messages/sync-dynamic-apis`

<br>

## 7. Custom Notfound page in nextjs

**All right that's simple enough just make a `not-found.tsx` file in the root of your page and nextjs
app router should pick it up automatically**

```typescript
// not-found.tsx

export default function NotFound() {
  return <div>
    Not found
  </div>
}
```

**The folder structure should be like:**

```
app/
├── layout.tsx
├── not-found.tsx  <------ this file
└── page.tsx
```

<br>

## 8. API routes in nextjs i.e. Server routes (/api/something)

**So doing server routes/api routes in Nextjs is simple enough(using app directory) we just make a
simple `app/api/` folder in the app directory and there you can add any folder with a routes.ts file
init and export functions (or handlers) named GET, POST, PUT, PATCH, DELETE, etc... depending on the
methods your route supports**

Official docs: <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers">routing/route-handlers</a>

A simple example would be:

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    msg: "Hi you just hit the /api/user route",
  });
}
```

you can also do dynamic routes like a catch all [...slug] exactly similar to the 6. point above, here's
the official website <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments">link</a>

And a quick example from nextjs docs:

```typescript
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;
}
```

`**NOTE(taken from nextjs docs): In addition to supporting the native Request and Response APIs,
Next.js extends them with NextRequest and NextResponse to provide convenient helpers for advanced
use cases.**`

Here's the docs <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers#extended-nextrequest-and-nextresponse-apis">link</a>

<br>

## 9. Redirecting or Linking or Navigation in Next.js

official docs: <a href="https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating">link</a>

There are four ways to redirect in Next.js shown in the above docs, i'll just show three ways, two
for client side and one for server side.

**For the client side:** it's simple enough just use the useRouter() hook from "next/navigation" when
you are redirect programatically or use the <Link> component from "next/link" when you wanna use an
<a> tag.

**For server side:** use the redirect("path/here") function from "next/navigation".

There are a few more advanced ways just read the docs for those.

<br>

## 10. Middlewares in Next.js

official docs: <a href="https://nextjs.org/docs/app/building-your-application/routing/middleware">link</a>

**Start by making a single middleware.ts file in the root of your project right next to the app folder
i.e. `/src/middleware.ts` if using the src directory**

```typescript
//  /src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware runs on api/auth/everything route");
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: "/api/auth/:nextauth",
};
```

**Alright now in this middleware.ts file you need to make a function with the `EXACT name middleware` and
this function can we async if using async await. By default this function will run for all the routes
but it can be limited to run only on specific routes if you export a variable name config.**
This is explained well in the matching paths section of the <a href="https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths">docs</a>

<br>

## 11. Accessing SearchQuery parameters in Nextjs

### Frontend:

Official docs <a href="https://nextjs.org/docs/app/api-reference/functions/use-search-params">link</a>

**In order to access the search query parameters of the url for example something like:**
`http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Fprofile` **here if
you wanna access the callbackUrl parameter you can use the useSearchParams() hook**

code example:

```typescript
"use client"

import { useSearchParams } from "next/navigation"

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get("search");

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>
      Search: {search}
  </>
}
```

**NOTE: Remember to wrap this component in <Suspense> since if you don't you'll get an error during
build. Docs: <a>https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout</a>**

### Backend:

Officail docs <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers#url-query-parameters">link</a>

**Basically just copy exactly what's in the docs page example, like so:**

```typescript
import { type NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // query is "hello" for /api/search?query=hello
```
