import createAuth0Client from '@auth0/auth0-spa-js';

// Define your Auth0 credentials
const AUTH0_DOMAIN = 'dev-v71b1kad1qrpea4h.us.auth0.com'; // Auth0 dashboard
const AUTH0_CLIENT_ID = 'S1OgDqikNDLbbspTD6EViRlQsq19gTMz'; // Auth0 dashboard
const REDIRECT_URI = window.location.origin;

let auth0Client;

async function initAuth0() {
  auth0Client = await createAuth0Client({
    domain: AUTH0_DOMAIN,
    client_id: AUTH0_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
  });
}

// Handle login
async function login() {
  await auth0Client.loginWithRedirect();
}

// Check if the user is authenticated
async function checkAuthentication() {
  const isAuthenticated = await auth0Client.isAuthenticated();
  return isAuthenticated;
}

// Handle redirect callback
async function handleRedirectCallback() {
  const result = await auth0Client.handleRedirectCallback();
  console.log('Redirect callback:', result);
}

// Get user profile
async function getUser() {
  const user = await auth0Client.getUser();
  console.log('User Profile:', user);
  return user;
}

// Log out the user
async function logout() {
  auth0Client.logout({
    returnTo: window.location.origin,
  });
}

// Initialize Auth0 Client
initAuth0();

export { login, checkAuthentication, handleRedirectCallback, getUser, logout };
