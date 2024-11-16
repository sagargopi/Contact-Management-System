import React from 'react';
import { Users } from 'lucide-react';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';
import type { Contact, ContactFormData } from './types/contact';
import * as api from './services/api';

function App() {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [editingContact, setEditingContact] = React.useState<Contact | null>(null);
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const data = await api.getContacts();
      setContacts(data);
    } catch (err) {
      setError('Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = async (data: ContactFormData) => {
    try {
      const newContact = await api.createContact(data);
      setContacts((prev) => [...prev, newContact]);
      setIsFormVisible(false);
    } catch (err) {
      setError('Failed to create contact');
    }
  };

  const handleEditContact = async (data: ContactFormData) => {
    if (!editingContact) return;
    
    try {
      const updatedContact = await api.updateContact(editingContact.id, data);
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === editingContact.id ? updatedContact : contact
        )
      );
      setEditingContact(null);
      setIsFormVisible(false);
    } catch (err) {
      setError('Failed to update contact');
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await api.deleteContact(id);
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  const startEditing = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormVisible(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <Users className="h-10 w-10 text-indigo-600" />
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Contact Management
              </h1>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
                <button
                  onClick={() => setError(null)}
                  className="float-right font-bold"
                >
                  ×
                </button>
              </div>
            )}
            
            <div className="px-4 py-8 sm:px-0">
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => {
                    setEditingContact(null);
                    setIsFormVisible(!isFormVisible);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isFormVisible ? 'Cancel' : 'Add New Contact'}
                </button>
              </div>

              {isFormVisible && (
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                  <ContactForm
                    onSubmit={editingContact ? handleEditContact : handleAddContact}
                    initialData={editingContact || undefined}
                    isEdit={!!editingContact}
                  />
                </div>
              )}

              <div className="bg-white shadow rounded-lg">
                <ContactTable
                  contacts={contacts}
                  onEdit={startEditing}
                  onDelete={handleDeleteContact}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;