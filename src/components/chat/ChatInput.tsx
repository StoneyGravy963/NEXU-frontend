import React, { useState } from 'react';

const ChatInput: React.FC = () => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      console.log('Mensaje enviado:', text); // Simulate sending
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Enviar
      </button>
    </form>
  );
};

export default ChatInput;
