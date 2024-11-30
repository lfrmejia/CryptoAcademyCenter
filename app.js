// Token helper functions
function getAccessToken() {
    return localStorage.getItem('accessToken');
}

function getIdToken() {
    return localStorage.getItem('idToken');
}

// Display user info if logged in
const displayUserInfo = (user) => {
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'block';
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('userInfo').textContent = JSON.stringify(user, null, 2);
};

// Check if tokens exist and fetch user info
window.onload = function () {
    const accessToken = getAccessToken();
    if (accessToken) {
        const auth0 = new auth0.WebAuth({
            domain: 'dev-v71b1kad1qrpea4h.us.auth0.com',
            clientID: 'S1OgDqikNDLbbspTD6EViRlQsq19gTMz'
        });

        auth0.client.userInfo(accessToken, (err, user) => {
            if (err) {
                console.error('Error fetching user info:', err);
                return;
            }
            displayUserInfo(user);
        });
    }
};
