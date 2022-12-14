# Google Login GSI

[![npm](https://img.shields.io/npm/v/google-login-gsi)](https://www.npmjs.com/package/google-login-gsi) ![NPM](https://img.shields.io/npm/l/google-login-gsi)

Use Google Identity Services with your Javascript App easily

## Installation

- With **NPM**

```bash
npm i --save google-login-gsi
```

## How to use

### Import library

```js
import * as gAuth from "@types/google-login-gsi";

// or

const gAuth = require('google-login-gsi');
```

### SignIn
```js
const response = await gAuth.signIn({
  client_id: YOUR_GOOGLE_CLIENT_ID,
  scope: "profile email" // You can update your scope here
});
```

### Check user is logged in
```js
const isLoggedIn = await gAuth.isLoggedIn(); // Return boolean
```

### Get logged in user information
```js
const user = await gAuth.getUserInfo(); // Return an object
```

### Sign out
```js
gAuth.signOut();
```
