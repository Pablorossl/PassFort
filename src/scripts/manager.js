/**
 * Password Manager Script
 * Handles CRUD operations for saved passwords with encryption
 */

// =========================
// Imports
// =========================
import { getAllPasswords, getPassword, deletePassword, exportToCSV, savePassword } from './storage.js';

// =========================
// Password List Management
// =========================

/**
 * Loads and displays all saved passwords from IndexedDB
 * Passwords are shown encrypted until user provides PIN
 */
window.loadPasswords = async function() {
    try {
        console.log('Loading passwords...'); // Debug
        const passwords = await getAllPasswords();
        console.log('Passwords loaded:', passwords.length); // Debug
        
        const listDiv = document.getElementById('passwordList');
        
        // Show empty state if no passwords found
        if (!passwords || passwords.length === 0) {
            listDiv.innerHTML = '<p style="text-align: center; color: #b6c2e1;">No passwords saved yet. Go to <a href="generator.html">Generator</a> to create and save one.</p>';
            return;
        }
        
        // Render password list
        listDiv.innerHTML = passwords.map(p => `
            <div style="background: rgba(0,0,0,0.2); padding: 1em; border-radius: 8px; margin-bottom: 1em; border-left: 3px solid #00adb5;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1em;">
                    <div style="flex: 1; min-width: 200px;">
                        <h3 style="margin: 0 0 0.3em 0; font-size: 1.1em; color: #7ecbff;">${escapeHtml(p.site)}</h3>
                        <p style="margin: 0; font-size: 0.9em; color: #b6c2e1;">${escapeHtml(p.username || 'No username')}</p>
                        <p style="margin: 0.3em 0 0 0; font-size: 0.8em; color: #7ecbff;">Created: ${new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div style="display: flex; gap: 0.5em; flex-wrap: wrap;">
                        <button onclick="viewPassword(${p.id})" 
                                style="padding: 0.5em 1em; background: #00adb5; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                            👁️ View
                        </button>
                        <button onclick="deletePasswordEntry(${p.id})" 
                                style="padding: 0.5em 1em; background: #ff4d4f; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Load error:', error);
        alert('❌ Error loading passwords: ' + error.message);
    }
};

/**
 * Escapes HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// =========================
// Password Actions
// =========================

/**
 * Views a specific password by decrypting it with PIN
 * @param {number} id - Password entry ID
 */
window.viewPassword = async function(id) {
    const pin = prompt('Enter PIN to decrypt this password:');
    if (!pin) return;
    
    try {
        console.log('Viewing password ID:', id);
        const entry = await getPassword(id, pin);
        
        // Display password details in formatted alert
        const message = `
🔐 Password for ${entry.site}
━━━━━━━━━━━━━━━━━━━━━━━
Password: ${entry.password}
Username: ${entry.username || 'N/A'}
Notes: ${entry.notes || 'N/A'}
━━━━━━━━━━━━━━━━━━━━━━━
Created: ${new Date(entry.createdAt).toLocaleString()}
        `;
        
        alert(message);
        
        // Auto-copy password to clipboard
        navigator.clipboard.writeText(entry.password);
        alert('✅ Password copied to clipboard!');
    } catch (error) {
        console.error('View error:', error);
        alert('❌ Error: ' + error.message);
    }
};

/**
 * Deletes a password entry after confirmation
 * @param {number} id - Password entry ID
 */
window.deletePasswordEntry = async function(id) {
    if (!confirm('⚠️ Are you sure you want to delete this password?\n\nThis action cannot be undone.')) return;
    
    try {
        console.log('Deleting password ID:', id);
        await deletePassword(id);
        alert('✅ Password deleted successfully');
        loadPasswords(); // Reload list
    } catch (error) {
        console.error('Delete error:', error);
        alert('❌ Error deleting password: ' + error.message);
    }
};

/**
 * Exports all passwords to CSV file after decryption
 */
window.exportPasswords = async function() {
    const pin = prompt('Enter PIN to decrypt and export all passwords:');
    if (!pin) return;
    
    try {
        console.log('Exporting passwords...');
        await exportToCSV(pin);
        alert('✅ Passwords exported successfully!\n\n⚠️ Keep this file secure and delete it after use.');
    } catch (error) {
        console.error('Export error:', error);
        alert('❌ Export failed: ' + error.message);
    }
};

// =========================
// Form Handling
// =========================

/**
 * Handles the add new password form submission
 * Encrypts password with user-provided PIN before saving
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addPasswordForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const site = document.getElementById('newSite').value.trim();
            const username = document.getElementById('newUsername').value.trim();
            const password = document.getElementById('newPassword').value.trim();
            const notes = document.getElementById('newNotes').value.trim();
            
            // Validate required fields
            if (!site || !password) {
                alert('❌ Site name and password are required');
                return;
            }
            
            // Get PIN for encryption
            const pin = prompt('Enter a 4-6 digit PIN to encrypt this password:');
            if (!pin || pin.length < 4) {
                alert('❌ PIN must be at least 4 digits');
                return;
            }
            
            try {
                // Save encrypted password
                await savePassword(site, username, password, pin, notes);
                alert('✅ Password saved successfully!');
                
                // Clear form
                form.reset();
                
                // Reload password list if visible
                const listDiv = document.getElementById('passwordList');
                if (listDiv.innerHTML.includes('border-left')) {
                    loadPasswords();
                }
            } catch (error) {
                console.error('Save error:', error);
                alert('❌ Error saving password: ' + error.message);
            }
        });
    }
});
