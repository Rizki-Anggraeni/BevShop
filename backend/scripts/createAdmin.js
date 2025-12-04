/*
  One-time script to create or promote a user to admin.
  Usage:
    node scripts/createAdmin.js --email admin@example.com --password secret123
  Or run without args and follow prompts.

  This script reads backend .env for MONGODB_URI. Make sure backend/.env is configured.
*/
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const readline = require('readline');
const User = require('../src/models/User');
const { hashPassword } = require('../src/utils/helpers');

async function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans); }));
}

async function main() {
  const argv = require('minimist')(process.argv.slice(2));
  const email = argv.email || (await ask('Admin email: '));
  const password = argv.password || (await ask('Admin password: '));

  if (!email || !password) {
    console.error('Email and password are required');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not found in backend/.env');
    process.exit(1);
  }

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = 'admin';
    if (password) existing.password = await hashPassword(password);
    await existing.save();
    console.log(`Updated existing user ${email} to role=admin`);
  } else {
    const hashed = await hashPassword(password);
    const user = new User({ name: 'Admin', email, password: hashed, role: 'admin' });
    await user.save();
    console.log(`Created admin user ${email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
