#!/usr/bin/env node

/**
 * Admin Dashboard Quick Test Script
 * This script helps test the admin dashboard features
 */

const readline = require('readline');
const https = require('http');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BASE_URL = 'http://localhost:5000/api';
let adminToken = '';

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

function makeRequest(method, endpoint, data = null, token = '') {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + endpoint);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body),
          });
        } catch {
          resolve({
            status: res.statusCode,
            data: body,
          });
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function loginAsAdmin() {
  console.log('\n🔐 LOGIN AS ADMIN\n');
  const email = await question('Admin Email: ');
  const password = await question('Admin Password: ');

  try {
    const response = await makeRequest('POST', '/auth/login', {
      email,
      password,
    });

    if (response.status === 200) {
      adminToken = response.data.token;
      console.log('✅ Login successful!');
      console.log(`Token: ${adminToken.slice(0, 20)}...`);
      return true;
    } else {
      console.log('❌ Login failed:', response.data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function getAllUsers() {
  console.log('\n👥 FETCHING ALL USERS\n');
  try {
    const response = await makeRequest('GET', '/admin/users', null, adminToken);
    if (response.status === 200) {
      console.log(`✅ Found ${response.data.length} users:`);
      response.data.forEach((user) => {
        console.log(`  - ${user.email} (${user.role}) - ${user.fullName}`);
      });
    } else {
      console.log('❌ Error:', response.data.message);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

async function getAllOrders() {
  console.log('\n📋 FETCHING ALL ORDERS\n');
  try {
    const response = await makeRequest('GET', '/admin/orders', null, adminToken);
    if (response.status === 200) {
      console.log(`✅ Found ${response.data.length} orders:`);
      response.data.forEach((order) => {
        console.log(
          `  - Order ID: ${order._id.slice(-8)} | Amount: Rp${order.totalAmount} | Status: ${order.status}`
        );
      });
    } else {
      console.log('❌ Error:', response.data.message);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

async function getAllProducts() {
  console.log('\n🥤 FETCHING ALL PRODUCTS\n');
  try {
    const response = await makeRequest('GET', '/products', null, adminToken);
    if (response.status === 200) {
      console.log(`✅ Found ${response.data.length} products:`);
      response.data.slice(0, 5).forEach((product) => {
        console.log(`  - ${product.name} | Rp${product.price} | Stock: ${product.stock}`);
      });
      if (response.data.length > 5) {
        console.log(`  ... and ${response.data.length - 5} more`);
      }
    } else {
      console.log('❌ Error:', response.data.message);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

async function addProduct() {
  console.log('\n➕ ADD NEW PRODUCT\n');
  const name = await question('Product Name: ');
  const category = await question('Category (juice/soda/coffee/energy/water): ');
  const price = await question('Price (Rp): ');
  const stock = await question('Stock: ');
  const description = await question('Description: ');
  const image = await question('Image URL (optional): ');

  try {
    const response = await makeRequest(
      'POST',
      '/products',
      {
        name,
        category,
        price: parseInt(price),
        stock: parseInt(stock),
        description,
        image: image || '',
      },
      adminToken
    );

    if (response.status === 201) {
      console.log('✅ Product added successfully!');
      console.log(`Product ID: ${response.data._id}`);
    } else {
      console.log('❌ Error:', response.data.message);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

async function getStats() {
  console.log('\n📊 DASHBOARD STATISTICS\n');
  try {
    const response = await makeRequest('GET', '/admin/stats', null, adminToken);
    if (response.status === 200) {
      console.log('✅ Statistics:');
      console.log(`  Users: ${response.data.totalUsers}`);
      console.log(`  Products: ${response.data.totalProducts}`);
      console.log(`  Orders: ${response.data.totalOrders}`);
      console.log(`  Total Revenue: Rp${response.data.totalRevenue.toLocaleString()}`);
    } else {
      console.log('❌ Error:', response.data.message);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

async function showMenu() {
  console.log('\n📋 ADMIN DASHBOARD TEST MENU\n');
  console.log('1. Get All Users');
  console.log('2. Get All Orders');
  console.log('3. Get All Products');
  console.log('4. Add New Product');
  console.log('5. Get Dashboard Stats');
  console.log('6. Exit');

  const choice = await question('\nSelect option (1-6): ');

  switch (choice) {
    case '1':
      await getAllUsers();
      break;
    case '2':
      await getAllOrders();
      break;
    case '3':
      await getAllProducts();
      break;
    case '4':
      await addProduct();
      break;
    case '5':
      await getStats();
      break;
    case '6':
      console.log('\n👋 Goodbye!');
      rl.close();
      return false;
    default:
      console.log('❌ Invalid option');
  }

  return true;
}

async function main() {
  console.log('🚀 ADMIN DASHBOARD TEST SCRIPT\n');
  console.log('Make sure backend is running on http://localhost:5000');

  const loggedIn = await loginAsAdmin();
  if (!loggedIn) {
    rl.close();
    process.exit(1);
  }

  let running = true;
  while (running) {
    running = await showMenu();
  }
}

main().catch(console.error);
