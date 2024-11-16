const API_URL = 'http://localhost:3000/api';

export async function getContacts() {
  const response = await fetch(`${API_URL}/contacts`);
  if (!response.ok) throw new Error('Failed to fetch contacts');
  return response.json();
}

export async function createContact(data: any) {
  const response = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create contact');
  return response.json();
}

export async function updateContact(id: string, data: any) {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update contact');
  return response.json();
}

export async function deleteContact(id: string) {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete contact');
  return true;
}