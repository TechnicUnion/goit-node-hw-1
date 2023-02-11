const fs = require('fs/promises')
const path = require('path')
const { randomUUID } = require("crypto");

const contactsPath = path.resolve('./db/contacts.json')

async function listContacts() {
    const list = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(list))
}

async function getContactById(contactId) {
    const list = await fs.readFile(contactsPath, "utf-8");
    const filter = JSON.parse(list).filter(item => item.id === contactId)
    console.log(filter)
}

async function removeContact(contactId) {
    const list = await fs.readFile(contactsPath, "utf-8");
    const filter = JSON.parse(list).filter(item => item.id !== contactId)
    fs.writeFile(contactsPath, JSON.stringify(filter), "utf8")
    console.log(filter)
    
}

async function addContact(name, email, phone) {
    
    const newContact = {
     id: randomUUID(),
        name,
        email,
        phone,
    }
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    list.push( newContact)

  
fs.writeFile(contactsPath, JSON.stringify(list), "utf8")
     console.log(list)
}




module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}