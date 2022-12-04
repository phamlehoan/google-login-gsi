const GOOGLE_USER_TOKEN_KEY = 'googleUserToken';

const createScript = () => {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  document.body.appendChild(script);
};

createScript();

const signIn = async (config) => {
  signOut();
  config.callback = "";
  const client = window.google.accounts.oauth2.initTokenClient(config);
  const tokenResponse = await new Promise((resolve, reject) => {
    try {
      client.callback = (resp) => {
        if (resp.error !== undefined) {
          reject(resp);
        }

        resolve(resp);
      };
      client.requestAccessToken({ prompt: "consent" });
    } catch (err) {
      console.error(err);
    }
  });

  localStorage.setItem(GOOGLE_USER_TOKEN_KEY, tokenResponse.access_token);
  return tokenResponse;
};

const isLoggedIn = async () => {
  const token = localStorage.getItem(GOOGLE_USER_TOKEN_KEY);
  if (!token) return false;

  const user = await getUserInfo();
  return !("error" in user)
}

const getUserInfo = async () => {
  const token = localStorage.getItem(GOOGLE_USER_TOKEN_KEY);
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
  const user = await response.json();

  if ("error" in user) signOut();

  return user;
}

const signOut = () => {
  localStorage.removeItem(GOOGLE_USER_TOKEN_KEY);
}

export { signIn, isLoggedIn, getUserInfo, signOut };
module.exports = { signIn, isLoggedIn, getUserInfo, signOut };
