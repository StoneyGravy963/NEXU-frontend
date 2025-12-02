import type { User } from '../types/user';
import type { ChatConversation } from '../types/chat';

export const mockUsers: User[] = [
  {
    id: 1,
    nombre_usuario: 'EliasLopez',
    nombre_completo: 'Elias Lopez',
    correo_electronico: 'elias.lofe@hotmail.com',
    descripcion: 'Desarrollador Full-Stack con más de 5 años de experiencia. Apasionado por la tecnología y el código limpio.',
    habilidades: ['Desarrollo Web', 'Diseño UX', 'Bases de Datos', 'API REST'],
    carrera: 'Ingeniería de Software',
    genero: 'Masculino',
    fecha_nacimiento: '1990-01-15',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    nombre_usuario: 'Paolis',
    nombre_completo: 'Paolis Dueñas',
    correo_electronico: 'Paolis.Dueñas@ej.com',
    descripcion: 'Diseñadora UI/UX especializada en la creación de interfaces intuitivas y atractivas. Amante del minimalismo y la funcionalidad.',
    habilidades: ['Diseño UI', 'Diseño UX', 'Prototipado', 'Investigación de Usuarios'],
    carrera: 'Diseño Gráfico',
    genero: 'Femenino',
    fecha_nacimiento: '1992-05-20',
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    nombre_usuario: 'Jostino',
    nombre_completo: 'Jostino Langostino',
    correo_electronico: 'JostinoLang@ej.com',
    descripcion: 'Ingeniero de Software con experiencia en sistemas distribuidos y microservicios. Entusiasta de Python y Go.',
    habilidades: ['Microservicios', 'Sistemas Distribuidos', 'DevOps', 'Cloud Computing'],
    carrera: 'Ingeniería de Sistemas',
    genero: 'Masculino',
    fecha_nacimiento: '1988-11-01',
    avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

export const mockConversations: ChatConversation[] = [
    {
        id: 'conv-1',
        participants: [mockUsers[0], mockUsers[1]],
        messages: [
            { id: 'msg-1', authorId: 1, text: 'Hola Paolis, ¿cómo estás?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
            { id: 'msg-2', authorId: 2, text: '¡Hola Elias! Muy bien, ¿y tú? ¿Listo para el proyecto?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1) },
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
