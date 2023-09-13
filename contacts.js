import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  };
  
async function getContactById(contactId) {
    const contacts = await listContacts();
    const searchedContact = contacts.find((contact) => contact.id === contactId);
    return searchedContact;
  };
  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return filteredContacts;
  };
  
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    const newListOfContacts = contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(newListOfContacts, null, 2));
    return newListOfContacts;
  }

  export {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }