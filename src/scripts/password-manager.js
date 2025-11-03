/**
 * PassFort Password Manager Script
 * Handles encryption, decryption, storage, and UI logic for managing passwords.
 * Uses AES-GCM via Web Crypto API for secure client-side encryption.
 */

// =========================
// Crypto Helpers
// =========================

/**
 * Derives a CryptoKey from the user's master key string.
 * @param {string} masterKey - The user's master password.
 * @returns {Promise<CryptoKey>} - The derived key for AES-GCM.
 */
async function getKey(masterKey) {
    const enc = new TextEncoder();
    return crypto.subtle.importKey(
        "raw",
        enc.encode(masterKey),
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
    );
}

/**
 * Encrypts a string using AES-GCM.
 * @param {string} data - The plaintext data to encrypt.
 * @param {CryptoKey} key - The AES-GCM key.
 * @returns {Promise<object>} - The encrypted data and IV.
 */
async function encryptData(data, key) {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        enc.encode(data)
    );
    return {
        iv: Array.from(iv), // Store IV as array for serialization
        data: Array.from(new Uint8Array(encrypted)) // Store encrypted data as array
    };
}

/**
 * Decrypts AES-GCM encrypted data.
 * @param {object} encrypted - The encrypted object with iv and data arrays.
 * @param {CryptoKey} key - The AES-GCM key.
 * @returns {Promise<string>} - The decrypted plaintext string.
 */
async function decryptData(encrypted, key) {
    const dec = new TextDecoder();
    const iv = new Uint8Array(encrypted.iv);
    const data = new Uint8Array(encrypted.data);
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        data
    );
    return dec.decode(decrypted);
}

// =========================
// State
// =========================

/**
 * Holds the derived CryptoKey for the current session.
 * @type {CryptoKey|null}
 */
let masterKeyObj = null;

// =========================
// UI Event Handlers
// =========================

/**
 * Handles unlocking the password manager with the master key.
 * Derives the key, hides the unlock section, and loads stored passwords.
 */
document.getElementById('unlock-btn').onclick = async function() {
    const masterKey = document.getElementById('master-key').value;
    masterKeyObj = await getKey(masterKey);
    document.getElementById('master-key-section').style.display = 'none';
    document.getElementById('manager-section').style.display = '';
    loadPasswords();
};

/**
 * Handles adding a new password entry.
 * Encrypts the entry and stores it in localStorage.
 */
document.getElementById('add-password-form').onsubmit = async function(e) {
    e.preventDefault();
    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const entry = JSON.stringify({ site, username, password });
    const encrypted = await encryptData(entry, masterKeyObj);
    let passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
    passwords.push(encrypted);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    e.target.reset();
    loadPasswords();
};

// =========================
// Password List Loader
// =========================

/**
 * Loads and decrypts all stored passwords, displaying them in the UI.
 * If decryption fails (wrong key), the entry is skipped.
 */
async function loadPasswords() {
    const list = document.getElementById('password-list');
    list.innerHTML = '';
    let passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
    for (const encrypted of passwords) {
        try {
            const decrypted = await decryptData(encrypted, masterKeyObj);
            const { site, username, password } = JSON.parse(decrypted);
            const li = document.createElement('li');
            li.textContent = `${site} | ${username} | ${password}`;
            list.appendChild(li);
        } catch {
            // If decryption fails (e.g., wrong master key), skip this entry
        }
    }
}
