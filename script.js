function showAlert() {
    alert("Thanks for visiting CryptoAcademyCenter!");
  }

import createAuth0Client from '@auth0/auth0-spa-js';

let auth0Client;

async function initAuth0() {
  auth0Client = await createAuth0Client({
    domain: 'dev-v71b1kad1qrpea4h.us.auth0.com',
    client_id: 'S1OgDqikNDLbbspTD6EViRlQsq19gTMz',
    redirect_uri: window.location.origin,
  });
}

initAuth0();



  // Base API URL
const COINCAP_API = "https://api.coincap.io/v2";

// Function to fetch live cryptocurrency prices
async function fetchLivePrices() {
  try {
    const response = await fetch(`${COINCAP_API}/prices?ids=bitcoin,ethereum,cardano&vs_currencies=usd`);
    const data = await response.json();
    displayPrices(data.data);
  } catch (error) {
    console.error("Error fetching live prices:", error);
  }
}

// Function to display live prices
function displayPrices(prices) {
  const priceContainer = document.getElementById("price-container");
  priceContainer.innerHTML = ""; // Clear existing content

  const cryptocurrencies = {
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
    cardano: "Cardano"
  };

  for (const [id, info] of Object.entries(cryptocurrencies)) {
    const priceInfo = prices.find(price => price.id === id);
    if (priceInfo) {
      const priceItem = document.createElement("div");
      priceItem.className = "price-item";
      priceItem.innerHTML = `
        <h3>${info}</h3>
        <p>$${parseFloat(priceInfo.priceUsd).toFixed(2)}</p>
      `;
      priceContainer.appendChild(priceItem);
    }
  }
}

// Function to fetch historical data for market trends
async function fetchHistoricalData() {
  try {
    const response = await fetch(`${COINCAP_API}/assets/bitcoin/history?interval=d1&start=${getPastTimestamp(10)}&end=${Date.now()}`);
    const data = await response.json();
    displayMarketTrends(data.data);
  } catch (error) {
    console.error("Error fetching historical data:", error);
  }
}

// Function to display market trends using Chart.js
function displayMarketTrends(prices) {
  const ctx = document.getElementById("market-chart").getContext("2d");
  
  const labels = prices.map(entry => new Date(entry.time).toLocaleDateString());
  const values = prices.map(entry => parseFloat(entry.priceUsd));

 

  window.marketChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Bitcoin Price (Last 10 Days)",
        data: values,
        borderColor: "#2980b9",
        backgroundColor: "rgba(41, 128, 185, 0.2)",
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Price in USD'
          }
        }
      }
    }
  });
}

// Helper function to get timestamp for past days
function getPastTimestamp(days) {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(pastDate.getDate() - days);
  return pastDate.getTime();
}

// Function to fetch and display CoinCap market data
async function fetchMarketData() {
  try {
    const response = await fetch(`${COINCAP_API}/markets?limit=10&exchange=binance`);
    const data = await response.json();
    displayMarketData(data.data);
  } catch (error) {
    console.error("Error fetching market data:", error);
  }
}

// Function to display market data in the table
function displayMarketData(markets) {
  const marketsTableBody = document.querySelector("#markets-table tbody");
  marketsTableBody.innerHTML = ""; // Clear existing rows

  markets.forEach(market => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${market.exchangeId.toUpperCase()}</td>
      <td>${market.baseSymbol}</td>
      <td>${market.quoteSymbol}</td>
      <td>$${parseFloat(market.priceUsd).toFixed(2)}</td>
      <td>$${parseFloat(market.volumeUsd24Hr).toFixed(2)}</td>
    `;
    marketsTableBody.appendChild(row);
  });
}

// Function to fetch and display historical performance data
async function fetchHistoricalPerformance() {
  try {
    const response = await fetch(`${COINCAP_API}/assets/ethereum/history?interval=d1&start=${getPastTimestamp(10)}&end=${Date.now()}`);
    const data = await response.json();
    displayHistoricalPerformance(data.data);
  } catch (error) {
    console.error("Error fetching historical performance data:", error);
  }
}

// Function to display historical performance
function displayHistoricalPerformance(data) {
  const historyContainer = document.getElementById("history-container");
  historyContainer.innerHTML = ""; // Clear existing content

  const table = document.createElement("table");
  table.id = "history-table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Date</th>
        <th>Price USD</th>
      </tr>
    </thead>
    <tbody>
      ${data.map(entry => `
        <tr>
          <td>${new Date(entry.time).toLocaleDateString()}</td>
          <td>$${parseFloat(entry.priceUsd).toFixed(2)}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  
  historyContainer.appendChild(table);
}

// Initialize Dashboard on Page Load
document.addEventListener("DOMContentLoaded", () => {
  fetchLivePrices();
  fetchHistoricalData();
  fetchMarketData();
  fetchHistoricalPerformance();
});

