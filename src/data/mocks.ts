import type { User } from "../types/user";
import type { ChatConversation } from "../types/chat";

export const mockUsers: User[] = [
  {
    id: '1',
    name: "Jostino",
    email: "Jostino@example.com",
    is_active: true,
    career: "Software Engineer",
    gender: "Female",
    date_of_birth: "1990-05-15",
    bio: "Passionate about coding and open source.",
    skills: ["Python", "JavaScript", "React"],
    avatarUrl: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: '2',
    name: "Elias",
    email: "Elias@example.com",
    is_active: true,
    career: "UX Designer",
    gender: "Male",
    date_of_birth: "1988-11-20",
    bio: "Creating intuitive user experiences.",
    skills: ["Figma", "Sketch", "User Research"],
    avatarUrl: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: '3',
    name: "Sergio",
    email: "Sergio@example.com",
    is_active: true,
    career: "Data Scientist",
    gender: "Male",
    date_of_birth: "1992-03-01",
    bio: "Analyzing data for meaningful insights.",
    skills: ["R", "Python", "Machine Learning"],
    avatarUrl: "https://i.pravatar.cc/150?img=3"
  },
];

export const mockConversations: ChatConversation[] = [
  {
    id: "conv1",
    participants: [mockUsers[0], mockUsers[1]],
    messages: [
      {
        id: "msg1",
        authorId: mockUsers[0].id!,
        text: "ola",
        timestamp: "2023-10-26T10:00:00Z",
      },
      {
        id: "msg2",
        authorId: mockUsers[1].id!,
        text: "ola popo",
        timestamp: "2023-10-26T10:05:00Z",
      },
    ],
    unreadCount: 0
  },
  {
    id: "conv2",
    participants: [mockUsers[0], mockUsers[2]],
    messages: [
      {
        id: "msg3",
        authorId: mockUsers[0].id!,
        text: "El jajas",
        timestamp: "2023-10-26T11:00:00Z",
      },
      {
        id: "msg4",
        authorId: mockUsers[2].id!,
        text: "Soy yo ese",
        timestamp: "2023-10-26T11:07:00Z",
      },
    ],
    unreadCount: 2
  },
];