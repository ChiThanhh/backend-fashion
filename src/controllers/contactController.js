const contactModel = require('../models/contactModel')

exports.createContact = async (req, res) => {
  const { name, email,phone, message } = req.body

  const { data: contactData, error: contactError } = await contactModel.insertContact({
    name,
    phone,
    email,
    message,
  })

  if (contactError) return res.status(500).json({ error: contactError.message })

  return res.status(201).json({
    message: 'Contact created successfully',
    data: contactData,
  })
}

exports.getAllContacts = async (req, res) => {
  const { data: contacts, error: contactsError } = await contactModel.getContacts()

  if (contactsError) return res.status(500).json({ error: contactsError.message })

  return res.status(200).json({
    message: 'Contacts fetched successfully',
    data: contacts,
  })
}   

exports.getContactById = async (req, res) => {
  const { id } = req.params

  const { data: contact, error: contactError } = await contactModel.getContactById(id)

  if (contactError) return res.status(500).json({ error: contactError.message })

  if (!contact) return res.status(404).json({ error: 'Contact not found' })

  return res.status(200).json({
    message: 'Contact fetched successfully',
    data: contact,
  })
}

exports.updateContact = async (req, res) => {
  const { id } = req.params
  const { name, email,phone, message } = req.body

  const { data: contactData, error: contactError } = await contactModel.updateContact(id, {
    name,
    email,
    phone,
    message,
  })

  if (contactError) return res.status(500).json({ error: contactError.message })

  return res.status(200).json({
    message: 'Contact updated successfully',
    data: contactData,
  })
}

exports.deleteContact = async (req, res) => {
  const { id } = req.params

  const { error: deleteError } = await contactModel.deleteContact(id)

  if (deleteError) return res.status(500).json({ error: deleteError.message })

  return res.status(200).json({
    message: 'Contact deleted successfully',
  })
}
