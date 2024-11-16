import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { z } from 'zod';
import { Contact } from './models/Contact.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const ContactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().min(1),
  jobTitle: z.string().min(1),
});

// Create contact
app.post('/api/contacts', async (req, res) => {
  try {
    const data = ContactSchema.parse(req.body);
    const contact = await Contact.create(data);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Invalid contact data' });
  }
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ lastName: 1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Update contact
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = ContactSchema.parse(req.body);
    const contact = await Contact.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Invalid contact data' });
  }
});

// Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});