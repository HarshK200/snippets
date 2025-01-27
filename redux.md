## Redux for state management in react and next.js stuff

**redux official guide: https://redux.js.org/usage/nextjs**
<br>

## 1. How to setup redux

**NOTE: first things first we don't use redux we don't use react-redux we use _redux toolkit_ cause**
**that is the new library**

- **Alright first step install:**

```
npm install @reduxjs/toolkit react-redux
```

- **now create a this folder structure (you are using the src folder right?)**

```
project_root/
└─ src/
    ├── app/
    ├── lib/
        └── store.ts
```

**Now all the code we write will go in the redux/store.ts file**

#### **BUT!!! its quite different when you are doing it in nextjs vs plane reactjs**

instead of having a global store varible we have a makestore function since we make the store per
request since we don't want the store to be modified by multiple requests hence we make a store for
each request

**Code in store.ts:**
```typescript
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {},
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
```
