import { handleRedirectCallback, getUser, checkAuthentication, login, logout } from './auth';

// When the page loads, check if a redirect callback is present
window.onload = async () => {
  if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
    // Handle the redirect callback
    await handleRedirectCallback();
  }

  const isAuthenticated = await checkAuthentication();
  if (isAuthenticated) {
    // Display user profile and authenticated options
    const user = await getUser();
    document.getElementById('welcomeMessage').innerText = `Welcome, ${user.name}`;
    document.getElementById('logoutButton').style.display = 'inline-block';
  } else {
    // Show login button if not authenticated
    document.getElementById('loginButton').style.display = 'inline-block';
  }
};

// Login button click handler
document.getElementById('loginButton').addEventListener('click', () => {
  login();
});

// Logout button click handler
document.getElementById('logoutButton').addEventListener('click', () => {
  logout();
});
