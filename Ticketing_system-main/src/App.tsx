import { useState } from 'react';

interface Ticket {
  id: number;
  title: string;
  category: string;
  description: string;
  status: string;
}

const categories = ['Hardware', 'Software', 'Network', 'Database'];
const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

const TicketingSystem = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 1, title: 'Ticket 1', category: 'Hardware', description: 'Description 1', status: 'Open' },
    { id: 2, title: 'Ticket 2', category: 'Software', description: 'Description 2', status: 'In Progress' },
    { id: 3, title: 'Ticket 3', category: 'Network', description: 'Description 3', status: 'Resolved' },
  ]);

  const [newTicket, setNewTicket] = useState<Ticket>({
    id: 0,
    title: '',
    category: '',
    description: '',
    status: '',
  });

  const [editing, setEditing] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);

  const handleAddTicket = () => {
    setTickets([...tickets, { ...newTicket, id: tickets.length + 1 }]);
    setNewTicket({ id: 0, title: '', category: '', description: '', status: '' });
  };

  const handleDeleteTicket = (id: number) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditing(true);
    setCurrentTicket(ticket);
  };

  const handleUpdateTicket = () => {
    if (currentTicket) {
      setTickets(
        tickets.map((ticket) => (ticket.id === currentTicket.id ? { ...currentTicket, ...newTicket } : ticket))
      );
      setEditing(false);
      setCurrentTicket(null);
      setNewTicket({ id: 0, title: '', category: '', description: '', status: '' });
    }
  };

  const handlePrintTicket = (ticket: Ticket) => {
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <h1>${ticket.title}</h1>
      <p>Category: ${ticket.category}</p>
      <p>Description: ${ticket.description}</p>
      <p>Status: ${ticket.status}</p>
    `;
    document.body.appendChild(printContent);
    window.print();
    document.body.removeChild(printContent);
  };

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Ticketing System</h1>
      <div className="flex flex-wrap justify-between mb-4">
        <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={newTicket.title}
            onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            value={newTicket.category}
            onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            value={newTicket.status}
            onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
          >
            <option value="">Select Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={newTicket.description}
          onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
        />
      </div>
      <div className="flex justify-between mb-4">
        {editing ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleUpdateTicket}
          >
            Update Ticket
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddTicket}
          >
            Add Ticket
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="border px-4 py-2">{ticket.id}</td>
                <td className="border px-4 py-2">{ticket.title}</td>
                <td className="border px-4 py-2">{ticket.category}</td>
                <td className="border px-4 py-2">{ticket.status}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleEditTicket(ticket)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDeleteTicket(ticket.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handlePrintTicket(ticket)}
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketingSystem;