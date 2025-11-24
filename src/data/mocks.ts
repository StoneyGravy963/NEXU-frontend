import type { User } from '../types/user';
import type { ChatConversation } from '../types/chat';

export const mockUsers: User[] = [
  {
    id: 1,
    nombre_usuario: 'johndoe',
    nombre_completo: 'John Doe',
    correo_electronico: 'john.doe@example.com',
    biografia: 'Desarrollador Full-Stack con más de 5 años de experiencia. Apasionado por la tecnología y el código limpio.',
    habilidades: ['Desarrollo Web', 'Diseño UX', 'Bases de Datos', 'API REST'],
    reputacion: 85,
    tags: ['React', 'Node.js', 'TypeScript', 'Líder de Proyecto'],
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    nombre_usuario: 'janesmith',
    nombre_completo: 'Jane Smith',
    correo_electronico: 'jane.smith@example.com',
    biografia: 'Diseñadora UI/UX especializada en la creación de interfaces intuitivas y atractivas. Amante del minimalismo y la funcionalidad.',
    habilidades: ['Diseño UI', 'Diseño UX', 'Prototipado', 'Investigación de Usuarios'],
    reputacion: 92,
    tags: ['Figma', 'Sketch', 'Adobe XD'],
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    nombre_usuario: 'peterjones',
    nombre_completo: 'Peter Jones',
    correo_electronico: 'peter.jones@example.com',
    biografia: 'Ingeniero de Software con experiencia en sistemas distribuidos y microservicios. Entusiasta de Python y Go.',
    habilidades: ['Microservicios', 'Sistemas Distribuidos', 'DevOps', 'Cloud Computing'],
    reputacion: 88,
    tags: ['Python', 'Go', 'Docker', 'Kubernetes'],
    avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

export const mockConversations: ChatConversation[] = [
    {
        id: 'conv-1',
        participants: [mockUsers[0], mockUsers[1]],
        messages: [
            { id: 'msg-1', authorId: 1, text: 'Hola Jane, ¿cómo estás?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
            { id: 'msg-2', authorId: 2, text: '¡Hola John! Muy bien, ¿y tú? ¿Listo para el proyecto?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1) },
            { id: 'msg-3', authorId: 1, text: '¡Más que listo! He estado revisando tus diseños y son geniales.', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
        ],
        unreadCount: 1,
    },
    {
        id: 'conv-2',
        participants: [mockUsers[0], mockUsers[2]],
        messages: [
            { id: 'msg-4', authorId: 1, text: 'Hey Peter, necesito tu ayuda con un tema de Docker.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
            { id: 'msg-5', authorId: 2, text: 'Claro, dime qué necesitas.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1) },
        ],
        unreadCount: 0,
    }
];
