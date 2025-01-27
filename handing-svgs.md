## Handeling SVG's in React and Nextjs

The process is pretty puch the same. **If you have an .svg file fuck that and turn that into code
using an online converter** after that make an /public/logos-svg folder in the root of your project
and put that svg code into a react function component and export that as default, kinda like this:

Note: One file for each logo

```javascript
// Logo.jsx
import React from "react";

const MyLogo = () => (
  <svg>
    <path
      d="M 44.00,39.00
      C 45.07,15.99 71.31,3.36 89.96,16.25
      94.58,19.44 98.52,24.79 100.53,30.00
      101.50,32.51 101.96,36.70 103.59,38.44
      105.05,40.00 108.88,41.13 111.00,42.36
      116.41,45.52 119.63,50.75 119.96,57.00
      120.45,66.46 116.19,73.35 107.00,76.40
      105.09,77.04 100.35,78.30 98.96,76.94
      96.59,75.31 98.42,71.81 98.96,70.00
      101.74,64.67 108.90,54.87 98.96,52.10
      97.55,51.94 94.57,52.00 93.00,52.10
      93.00,52.10 66.00,52.10 66.00,52.10
      56.10,51.83 60.61,46.21 53.00,44.31
      49.17,43.36 43.11,44.45 42.23,49.04
      41.29,53.97 46.44,54.81 48.11,58.27
      49.53,61.21 50.92,74.32 51.00,78.00
      42.87,77.82 35.17,76.74 29.97,69.71
      20.74,57.27 28.78,40.38 44.00,39.00 Z
    />
  </svg>
);

export default MyLogo;
```

**after that just make a all-logos.ts file in /public/logos-svg and import all the logos in this
and export them like so:**

```javascript
// all-logos.ts
export { default as MyLogo } from "./MyLogo";
```

**If you ever get confused just go to `https://github.com/code100x/cms/tree/main/public/footer-logos`
that's where i stole this trick from** (thanks sargam 😉 or whoever wrote that)
