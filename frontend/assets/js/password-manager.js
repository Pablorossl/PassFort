// ...existing code or create new file...

// Simple AES encryption/decryption using Web Crypto API
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

async function encryptData(data, key) {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        enc.encode(data)
    );
    return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encrypted))
    };
}

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

let masterKeyObj = null;

document.getElementById('unlock-btn').onclick = async function() {
    const masterKey = document.getElementById('master-key').value;
    masterKeyObj = await getKey(masterKey);
    document.getElementById('master-key-section').style.display = 'none';
    document.getElementById('manager-section').style.display = '';
    loadPasswords();
};

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
            // Wrong key or corrupted data
        }
    }
}
