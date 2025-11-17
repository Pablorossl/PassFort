/**
 * Storage Module
 * Manages encrypted password storage using IndexedDB and Web Crypto API
 */

// =========================
// Imports
// =========================
import { encryptData, decryptData } from './crypto-utils.js';

// =========================
// Configuration
// =========================
const DB_NAME = 'PassFortDB';
const DB_VERSION = 1;
const STORE_NAME = 'passwords';

// =========================
// Database Initialization
// =========================

/**
 * Initializes and returns the IndexedDB database
 * Creates object stores and indexes if they don't exist
 * @returns {Promise<IDBDatabase>} Database instance
 */
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                store.createIndex('site', 'site', { unique: false });
                store.createIndex('createdAt', 'createdAt', { unique: false });
            }
        };
    });
}

// =========================
// CRUD Operations
// =========================

/**
 * Saves a password entry to IndexedDB with encryption
 * @param {string} site - Website name
 * @param {string} username - Username or email
 * @param {string} password - Plain text password (will be encrypted)
 * @param {string} pin - PIN for encryption
 * @param {string} notes - Optional notes
 * @returns {Promise<number>} ID of the saved entry
 */
export async function savePassword(site, username, password, pin, notes = '') {
    try {
        const db = await initDB();
        const encrypted = await encryptData(password, pin);
        
        const entry = {
            site,
            username,
            password: encrypted,
            notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(entry);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error('Save error:', error);
        throw error;
    }
}

/**
 * Retrieves all password entries from IndexedDB
 * Passwords remain encrypted until decrypted with PIN
 * @returns {Promise<Array>} Array of password entries
 */
export async function getAllPasswords() {
    try {
        const db = await initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error('Get all error:', error);
        throw error;
    }
}

/**
 * Retrieves a specific password entry by ID and decrypts it
 * @param {number} id - Entry ID
 * @param {string} pin - PIN for decryption
 * @returns {Promise<object>} Decrypted password entry
 */
export async function getPassword(id, pin) {
    try {
        const db = await initDB();
        
        const entry = await new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(id);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
        
        if (entry) {
            entry.password = await decryptData(entry.password, pin);
        }
        
        return entry;
    } catch (error) {
        console.error('Get password error:', error);
        throw error;
    }
}

/**
 * Deletes a password entry from IndexedDB
 * @param {number} id - Entry ID to delete
 * @returns {Promise<boolean>} Success status
 */
export async function deletePassword(id) {
    try {
        const db = await initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);
            
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error('Delete error:', error);
        throw error;
    }
}

// =========================
// Export Functionality
// =========================

/**
 * Exports all passwords to a CSV file
 * Decrypts all passwords before export
 * @param {string} pin - PIN for decryption
 * @returns {Promise<boolean>} Success status
 */
export async function exportToCSV(pin) {
    try {
        const passwords = await getAllPasswords();
        
        // Decrypt all passwords
        const decrypted = await Promise.all(
            passwords.map(async (entry) => ({
                ...entry,
                password: await decryptData(entry.password, pin)
            }))
        );
        
        // Create CSV content
        const headers = ['Site', 'Username', 'Password', 'Notes', 'Created', 'Updated'];
        const rows = decrypted.map(p => [
            p.site,
            p.username,
            p.password,
            p.notes || '',
            p.createdAt,
            p.updatedAt
        ]);
        
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
        
        // Download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `passfort-export-${Date.now()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
    } catch (error) {
        console.error('Export error:', error);
        throw error;
    }
}
