/**
 * Cryptography and Password Analysis Utilities
 * Provides encryption, decryption, and password strength analysis
 */

// =========================
// Encryption/Decryption
// =========================

/**
 * Derives an encryption key from a PIN using SHA-256
 * @param {string} pin - PIN for key derivation
 * @returns {Promise<CryptoKey>} Derived encryption key
 */
async function deriveKey(pin) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return await window.crypto.subtle.importKey(
        'raw',
        hashBuffer,
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
    );
}

/**
 * Encrypts plaintext data using AES-GCM
 * @param {string} plaintext - Data to encrypt
 * @param {string} pin - PIN for encryption
 * @returns {Promise<string>} Base64-encoded encrypted data
 */
export async function encryptData(plaintext, pin) {
    try {
        const key = await deriveKey(pin);
        const encoder = new TextEncoder();
        const data = encoder.encode(plaintext);
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        
        const ciphertext = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            data
        );
        
        const combined = new Uint8Array(iv.length + ciphertext.byteLength);
        combined.set(iv);
        combined.set(new Uint8Array(ciphertext), iv.length);
        
        return btoa(String.fromCharCode(...combined));
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
}

/**
 * Decrypts encrypted data using AES-GCM
 * @param {string} encryptedBase64 - Base64-encoded encrypted data
 * @param {string} pin - PIN for decryption
 * @returns {Promise<string>} Decrypted plaintext
 */
export async function decryptData(encryptedBase64, pin) {
    try {
        const key = await deriveKey(pin);
        const combined = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
        
        const iv = combined.slice(0, 12);
        const ciphertext = combined.slice(12);
        
        const decrypted = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            ciphertext
        );
        
        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data - incorrect PIN?');
    }
}

// =========================
// Password Analysis
// =========================

/**
 * Calculates password entropy in bits
 * @param {string} password - Password to analyze
 * @returns {number} Entropy in bits
 */
export function calculateEntropy(password) {
    if (!password) return 0;
    
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 33;
    
    return Math.log2(Math.pow(charsetSize, password.length));
}

/**
 * Detects common patterns in passwords
 * @param {string} password - Password to analyze
 * @returns {Array<string>} List of detected patterns
 */
export function detectPatterns(password) {
    const patterns = [];
    
    // Sequential numbers
    if (/\d{3,}/.test(password)) {
        const nums = password.match(/\d+/g);
        if (nums) {
            nums.forEach(seq => {
                if (seq.length >= 3) {
                    const isSequential = seq.split('').every((d, i, arr) => 
                        i === 0 || parseInt(d) === parseInt(arr[i-1]) + 1
                    );
                    if (isSequential) patterns.push(`Sequential numbers: ${seq}`);
                }
            });
        }
    }
    
    // Repeated characters
    const repeats = password.match(/(.)\1{2,}/g);
    if (repeats) {
        patterns.push(`Repeated characters: ${repeats.join(', ')}`);
    }
    
    // Common words
    const commonWords = ['password', 'admin', 'user', 'qwerty', '123456'];
    commonWords.forEach(word => {
        if (password.toLowerCase().includes(word)) {
            patterns.push(`Common word: ${word}`);
        }
    });
    
    // Keyboard patterns
    const keyboardPatterns = ['qwerty', 'asdfgh', 'zxcvbn'];
    keyboardPatterns.forEach(pattern => {
        if (password.toLowerCase().includes(pattern)) {
            patterns.push(`Keyboard pattern: ${pattern}`);
        }
    });
    
    return patterns;
}

/**
 * Performs comprehensive password strength analysis
 * @param {string} password - Password to analyze
 * @returns {object} Analysis results with score, level, feedback, etc.
 */
export function analyzePasswordStrength(password) {
    const entropy = calculateEntropy(password);
    const patterns = detectPatterns(password);
    const length = password.length;
    
    let score = 0;
    let feedback = [];
    
    // Evaluate length
    if (length < 8) {
        feedback.push('⚠️ Too short (min 8 characters)');
    } else if (length >= 12) {
        score += 1;
        feedback.push('✓ Good length');
    } else {
        score += 0.5;
    }
    
    // Evaluate entropy
    if (entropy < 28) {
        feedback.push('⚠️ Very weak entropy');
    } else if (entropy < 36) {
        score += 0.5;
        feedback.push('⚠️ Weak entropy');
    } else if (entropy < 60) {
        score += 1;
        feedback.push('✓ Moderate entropy');
    } else {
        score += 2;
        feedback.push('✓ Strong entropy');
    }
    
    // Evaluate character variety
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    
    const charTypes = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;
    
    if (charTypes === 4) {
        score += 1;
        feedback.push('✓ Excellent character variety');
    } else if (charTypes === 3) {
        score += 0.5;
        feedback.push('✓ Good character variety');
    } else {
        feedback.push('⚠️ Limited character variety');
    }
    
    // Penalize patterns
    if (patterns.length > 0) {
        score -= patterns.length * 0.5;
        feedback.push(`⚠️ ${patterns.length} pattern(s) detected`);
    }
    
    // Normalize score (0-4)
    score = Math.max(0, Math.min(4, score));
    
    let level = 'Very Weak';
    let color = '#ff4d4f';
    
    if (score >= 3.5) {
        level = 'Very Strong';
        color = '#52c41a';
    } else if (score >= 2.5) {
        level = 'Strong';
        color = '#73d13d';
    } else if (score >= 1.5) {
        level = 'Moderate';
        color = '#faad14';
    } else if (score >= 0.5) {
        level = 'Weak';
        color = '#ff7a45';
    }
    
    return {
        score,
        level,
        color,
        entropy: entropy.toFixed(2),
        patterns,
        feedback,
        length
    };
}
