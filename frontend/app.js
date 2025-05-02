const API_BASE = "http://localhost:5000/api";

// DOM Elements
const contactForm = document.getElementById('contact-form');
const phoneForm = document.getElementById('phone-form');
const contactsContainer = document.getElementById('contacts-container');
const contactSelect = document.getElementById('contact_id');

// State
let currentContactId = null;
let currentPhoneId = null;

// Fetch all contacts
async function fetchContacts() {
    try {
        const response = await fetch(`${API_BASE}/contacts`);
        const contacts = await response.json();
        
        // Display contacts
        displayContacts(contacts);
        
        // Update contact dropdown
        updateContactDropdown(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
}

// Display contacts in the UI
function displayContacts(contacts) {
    contactsContainer.innerHTML = '';
    
    contacts.forEach(contact => {
        const contactEl = document.createElement('div');
        contactEl.className = 'contact-item';
        contactEl.innerHTML = `
            <div class="contact-info">
                <h3>${contact.first_name} ${contact.last_name}</h3>
                <p>${contact.email || 'No email'}</p>
                <div class="phone-numbers" id="phones-${contact.id}"></div>
            </div>
            <div class="contact-actions">
                <button onclick="editContact(${contact.id})">Edit</button>
                <button onclick="deleteContact(${contact.id})">Delete</button>
            </div>
        `;
        contactsContainer.appendChild(contactEl);
        
        // Fetch and display phone numbers for this contact
        fetchPhones(contact.id);
    });
}

// Fetch phone numbers for a contact
async function fetchPhones(contactId) {
    try {
        const response = await fetch(`${API_BASE}/contacts/${contactId}/phones`);
        const phones = await response.json();
        displayPhones(contactId, phones);
    } catch (error) {
        console.error('Error fetching phones:', error);
    }
}

// Display phone numbers
function displayPhones(contactId, phones) {
    const phoneContainer = document.getElementById(`phones-${contactId}`);
    if (!phoneContainer) return;
    
    phoneContainer.innerHTML = phones.length ? `
        <h4>Phone Numbers:</h4>
        <ul>
            ${phones.map(phone => `
                <li>
                    ${phone.phone_type}: ${phone.phone_number}
                    <button onclick="editPhone(${phone.id}, '${phone.phone_type}', '${phone.phone_number}', ${phone.contact_id})">Edit</button>
                    <button onclick="deletePhone(${phone.id})">Delete</button>
                </li>
            `).join('')}
        </ul>
    ` : '';
}

// Update contact dropdown
function updateContactDropdown(contacts) {
    contactSelect.innerHTML = '<option value="">Select Contact</option>';
    contacts.forEach(contact => {
        const option = document.createElement('option');
        option.value = contact.id;
        option.textContent = `${contact.first_name} ${contact.last_name}`;
        contactSelect.appendChild(option);
    });
}

// Form event listeners
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const contactData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value
    };
    
    try {
        if (currentContactId) {
            // Update existing contact
            await fetch(`${API_BASE}/contacts/${currentContactId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            });
        } else {
            // Create new contact
            await fetch(`${API_BASE}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            });
        }
        
        resetContactForm();
        fetchContacts();
    } catch (error) {
        console.error('Error saving contact:', error);
    }
});

phoneForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const phoneData = {
        phone_type: document.getElementById('phone_type').value,
        phone_number: document.getElementById('phone_number').value,
        contact_id: document.getElementById('contact_id').value
    };
    
    try {
        if (currentPhoneId) {
            // Update existing phone
            await fetch(`${API_BASE}/phones/${currentPhoneId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(phoneData)
            });
        } else {
            // Create new phone
            await fetch(`${API_BASE}/contacts/${phoneData.contact_id}/phones`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(phoneData)
            });
        }
        
        resetPhoneForm();
        fetchContacts();
    } catch (error) {
        console.error('Error saving phone:', error);
    }
});

// Edit functions
function editContact(id) {
    fetch(`${API_BASE}/contacts/${id}`)
        .then(res => res.json())
        .then(contact => {
            document.getElementById('first_name').value = contact.first_name;
            document.getElementById('last_name').value = contact.last_name;
            document.getElementById('email').value = contact.email || '';
            
            currentContactId = id;
            document.getElementById('contact-form-title').textContent = 'Edit Contact';
            document.getElementById('cancel-edit').style.display = 'inline-block';
        });
}

function editPhone(id, type, number, contactId) {
    document.getElementById('phone_type').value = type;
    document.getElementById('phone_number').value = number;
    document.getElementById('contact_id').value = contactId;
    
    currentPhoneId = id;
    document.getElementById('phone-form-title').textContent = 'Edit Phone';
    document.getElementById('cancel-phone-edit').style.display = 'inline-block';
    document.getElementById('contact_id').disabled = true;
}

// Delete functions
async function deleteContact(id) {
    if (confirm('Are you sure you want to delete this contact?')) {
        try {
            await fetch(`${API_BASE}/contacts/${id}`, { method: 'DELETE' });
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    }
}

async function deletePhone(id) {
    if (confirm('Are you sure you want to delete this phone number?')) {
        try {
            await fetch(`${API_BASE}/phones/${id}`, { method: 'DELETE' });
            fetchContacts();
        } catch (error) {
            console.error('Error deleting phone:', error);
        }
    }
}

// Reset forms
function resetContactForm() {
    contactForm.reset();
    currentContactId = null;
    document.getElementById('contact-form-title').textContent = 'Add New Contact';
    document.getElementById('cancel-edit').style.display = 'none';
}

function resetPhoneForm() {
    phoneForm.reset();
    currentPhoneId = null;
    document.getElementById('phone-form-title').textContent = 'Add Phone Number';
    document.getElementById('cancel-phone-edit').style.display = 'none';
    document.getElementById('contact_id').disabled = false;
}

// Cancel buttons
document.getElementById('cancel-edit').addEventListener('click', resetContactForm);
document.getElementById('cancel-phone-edit').addEventListener('click', resetPhoneForm);

// Initialize
fetchContacts();