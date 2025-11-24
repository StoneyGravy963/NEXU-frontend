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
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        className="w-full bg-gray-700 text-white rounded-l-lg px-4 py-2 focus:outline-none"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
        Enviar
      </button>
    </form>
  );
};

export default ChatInput;
