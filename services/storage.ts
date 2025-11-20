import { AppData, Contact, Interaction, InteractionType, UserProfile } from '../types';

// Bumping version to v3 to force load of new rich seed data
const STORAGE_KEY = 'cultiva_app_data_v3';

// Helper for dates
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const MOCK_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Mamá',
    relation: 'Familia',
    frequencyDays: 3,
    keyInfo: 'Le encantan las orquídeas y saber si comí bien. Se preocupa si no contesto rápido.',
    interactions: [
      { id: 'i1', date: daysAgo(1), type: InteractionType.CALL, note: 'Hablamos de la receta de la abuela, me explicó el secreto de la salsa.' },
      { id: 'i2', date: daysAgo(4), type: InteractionType.MESSAGE, note: 'Le mandé foto del gato durmiendo en la maceta.' },
      { id: 'i1b', date: daysAgo(8), type: InteractionType.OUTING, note: 'Fuimos a comer el domingo. Me dio tuppers con comida para la semana.' },
      { id: 'i1c', date: daysAgo(12), type: InteractionType.CALL, note: 'Me llamó preocupada porque vio una noticia en la tele. La calmé.' }
    ],
    lastInteractionDate: daysAgo(1),
    aiProfile: "Mamá es protectora y detallista, le gusta cuidar a la familia a través de la comida y le interesa mucho mantener las tradiciones vivas. Su lenguaje de amor es el servicio y el tiempo de calidad.",
    aiIdeas: {
      messages: ["¡Hola ma! ¿Cómo amanecieron tus plantas hoy?", "¿Te falta algo del súper? Pasaré cerca.", "Foto rápida de mi almuerzo (para que veas que comí)."],
      calls: ["Preguntar por su salud reciente.", "Pedirle que me repita paso a paso esa receta.", "Planear la visita del domingo."],
      activities: ["Ir al vivero juntos a ver las orquídeas nuevas.", "Tomar un café el domingo por la tarde.", "Cocinar juntos por videollamada si no puedo ir."]
    }
  },
  {
    id: 'c2',
    name: 'Carlos (Uni)',
    relation: 'Amigo',
    frequencyDays: 7, // Weekly goal
    keyInfo: 'Fanático del cine y videojuegos. Siempre está ocupado programando en startups.',
    interactions: [
      { id: 'i3', date: daysAgo(25), type: InteractionType.OUTING, note: 'Fuimos a ver Dune 2. Nos quedamos debatiendo el final 2 horas.' },
      { id: 'i3b', date: daysAgo(35), type: InteractionType.MESSAGE, note: 'Compartimos memes sobre el bug de producción que tuvo en su trabajo.' },
      { id: 'i3c', date: daysAgo(42), type: InteractionType.CALL, note: 'Llamada rápida en Discord mientras jugábamos.' }
    ],
    lastInteractionDate: daysAgo(25), // WITHERED (Goal 7, Last 25)
    aiProfile: "Carlos es intelectual y algo introvertido, le gusta el análisis profundo de narrativas (cine/juegos) y le interesa la tecnología de vanguardia. Valora las conexiones intelectuales sobre las emocionales.",
    aiIdeas: {
      messages: ["¿Viste el trailer nuevo de Marvel?", "Meme de programación random.", "Hey, ¿sigues vivo o te comió el código?"],
      calls: ["Debatir sobre la última serie de HBO.", "Tech talk: ¿Qué estás aprendiendo ahora?", "Organizar sesión de gaming."],
      activities: ["Noche de juegos online.", "Ir al cine (IMAX).", "Hamburguesas y cervezas artesanales."]
    }
  },
  {
    id: 'c3',
    name: 'Tía Marta',
    relation: 'Familia',
    frequencyDays: 14, // Bi-weekly
    keyInfo: 'Vive en España. Le gusta que le mande fotos de la familia y recordar viejos tiempos.',
    interactions: [
      { id: 'i4', date: daysAgo(45), type: InteractionType.CALL, note: 'Cumpleaños del tío. Hablamos brevemente, se escuchaba mucha gente.' },
      { id: 'i4b', date: daysAgo(60), type: InteractionType.MESSAGE, note: 'Le envié las fotos de mi graduación que encontró mamá en un álbum.' },
      { id: 'i4c', date: daysAgo(90), type: InteractionType.CALL, note: 'Videollamada de año nuevo. Estaba muy emocionada.' }
    ],
    lastInteractionDate: daysAgo(45), // WITHERED (Goal 14, Last 45)
    aiProfile: "Tía Marta es nostálgica y muy familiar, le gusta sentirse incluida a pesar de la distancia y le interesa ver cómo crecen todos. Se siente sola a veces y agradece mucho la iniciativa.",
    aiIdeas: {
      messages: ["Foto familiar del fin de semana.", "¡Tía! Me acordé de ti por esta canción.", "¿Cuándo planean venir de visita?"],
      calls: ["Ponerla al día con los chismes familiares.", "Preguntar por su viaje a Madrid.", "Recordar anécdotas de la infancia."],
      activities: ["Videollamada con copa de vino.", "Ver fotos juntos en pantalla compartida.", "Enviar una carta física sorpresa."]
    }
  },
  {
    id: 'c4',
    name: 'Sofía (Trabajo)',
    relation: 'Trabajo',
    frequencyDays: 30,
    keyInfo: 'Mentora de diseño. Muy profesional pero amable. Le gusta el café de especialidad.',
    interactions: [
      { id: 'i5', date: daysAgo(5), type: InteractionType.MESSAGE, note: 'Me felicitó por el proyecto nuevo en LinkedIn. Le agradecí el apoyo.' },
      { id: 'i5b', date: daysAgo(20), type: InteractionType.OUTING, note: 'Café rápido cerca de la oficina. Me dio feedback sobre mi portafolio.' },
      { id: 'i5c', date: daysAgo(45), type: InteractionType.MESSAGE, note: 'Le compartí un artículo de tendencias UX 2025.' }
    ],
    lastInteractionDate: daysAgo(5),
    aiProfile: "Sofía es profesional y estructurada, le gusta ver crecer a sus mentoreados y le interesa mantenerse al día con tendencias de diseño. Actúa como una guía o hermana mayor en lo laboral.",
    aiIdeas: {
      messages: ["Artículo interesante de UX/UI.", "¡Gracias por el consejo del otro día!", "¿Tienes 5 min para una duda rápida?"],
      calls: ["Feedback de carrera.", "Tendencias de diseño 2024.", "Catch-up mensual."],
      activities: ["Café de networking.", "Ir a una charla de diseño.", "Co-working virtual."]
    }
  },
  {
    id: 'c5',
    name: 'Diego Gym',
    relation: 'Amigo',
    frequencyDays: 7,
    keyInfo: 'Partner de entrenamiento. Hablamos de dietas, rutinas y suplementos.',
    interactions: [
      { id: 'i6', date: daysAgo(2), type: InteractionType.MESSAGE, note: 'Coordinando hora para mañana, toca pierna.' },
      { id: 'i6b', date: daysAgo(5), type: InteractionType.OUTING, note: 'Entrenamos espalda. Me ayudó con mi récord personal.' },
      { id: 'i6c', date: daysAgo(9), type: InteractionType.MESSAGE, note: 'Me pasó el dato de una proteína en oferta.' },
      { id: 'i6d', date: daysAgo(15), type: InteractionType.OUTING, note: 'Salimos a correr al parque, 5k suaves.' }
    ],
    lastInteractionDate: daysAgo(2),
    aiProfile: "Diego es disciplinado y enérgico, le gusta la superación personal física y le interesa optimizar su rendimiento. Es un amigo práctico que motiva a través de la acción.",
    aiIdeas: {
      messages: ["¿A qué hora le damos hoy?", "Mira este PR que saqué.", "Meme de gym rat."],
      calls: ["Planificar la rutina de la semana.", "Hablar de suplementos.", "¿Nos inscribimos a la carrera?"],
      activities: ["Entrenar pierna (sufrir juntos).", "Ir a comer post-entreno.", "Salir a correr al parque."]
    }
  }
];

const INITIAL_DATA: AppData = {
  user: {
    name: 'Alex',
    age: '28',
    isOnboardingComplete: true
  },
  contacts: MOCK_CONTACTS,
};

export const loadData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return INITIAL_DATA;
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load data", e);
    return INITIAL_DATA;
  }
};

export const saveData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save data", e);
  }
};

// Helper to generate IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Helper to check if contact is withered (US-005)
export const isContactWithered = (contact: Contact): boolean => {
  if (!contact.lastInteractionDate) return true; 
  
  const lastDate = new Date(contact.lastInteractionDate);
  const today = new Date();
  
  // Calculate difference in days
  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  // Warning: diffDays includes today, so usually we want strictly greater
  return diffDays > contact.frequencyDays;
};