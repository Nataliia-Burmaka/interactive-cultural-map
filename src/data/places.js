export const categories = [
  "Architectural DNA",
  "Living Traditions",
  "Contemporary City",
  "Nature–Cultural Gems",
  "Sports Capital",
];

export const places = [
  {
    id: 1,
    title: "Hippos Stadium",
    category: "Sports Capital",
    dna: 4.5,
    image: "/images/hippos-stadium.jpg",
    description:
      "The beating heart of Jyväskylä’s sports culture. Where local heroes are made and community spirit comes alive through athletics.",
    shortImpact: "Key sports landmark",
    features: {
      busAccess: true,
      paidEntry: false,
      accessible: true,
    },
    coordinates: [62.2452, 25.7128],
    indicators: [
      { label: "Cultural Significance", value: 4 },
      { label: "Local Life", value: 5 },
      { label: "Unique Experience", value: 4 },
    ],
    impactSignals: [
      "Strong connection to local sports identity",
      "Active role in community life",
      "Recognized city venue",
      "Hosts events and shared experiences",
    ],
    liveEvents: [
      "Community Athletics Evening — Thu 18:00",
      "Junior Sports Day — Sat 12:00",
    ],
    story:
      "Hippos is one of the places where Jyväskylä’s sports culture becomes visible in everyday life.",
  },
  {
    id: 2,
    title: "University Museum",
    category: "Architectural DNA",
    dna: 3.9,
    image: "/images/university-museum.jpg",
    description:
      "Academic excellence meets architectural beauty. Discover the history of education and knowledge in Central Finland.",
    shortImpact: "Academic heritage site",
    features: {
      busAccess: true,
      paidEntry: false,
      accessible: true,
    },
    coordinates: [62.237174148209185, 25.733181119788114],
    indicators: [
      { label: "Cultural Significance", value: 4 },
      { label: "Local Life", value: 3 },
      { label: "Unique Experience", value: 3 },
    ],
    impactSignals: [
      "Connected to regional academic identity",
      "Preserves educational memory",
      "Adds intellectual depth to the city",
    ],
    liveEvents: [
      "Guided Museum Walk — Wed 15:00",
      "Education and Memory Talk — Fri 17:30",
    ],
    story:
      "The University Museum reflects Jyväskylä’s role as a city of learning, education, and cultural continuity.",
  },
  {
    id: 3,
    title: "Alvar Aalto Museum",
    category: "Architectural DNA",
    dna: 4.8,
    image: "/images/alvar-aalto-museum.jpg",
    description:
      "A key cultural landmark that reveals why Jyväskylä is deeply connected to Alvar Aalto’s legacy.",
    shortImpact: "Key cultural landmark",
    features: {
      busAccess: true,
      paidEntry: true,
      accessible: true,
    },
    coordinates: [62.23338467842017, 25.731369001222333],
    indicators: [
      { label: "Cultural Significance", value: 5 },
      { label: "Local Life", value: 4 },
      { label: "Unique Experience", value: 5 },
    ],
    impactSignals: [
      "Strong historical relevance and cultural recognition",
      "Unique and distinctive cultural experience",
      "Active presence in local community life",
      "Regular cultural programming and events",
      "Contributes to local economy and creative sector",
    ],
    liveEvents: [
      "Architecture Talk — Thu 18:00",
      "Exhibition Tour — Sat 14:00",
    ],
    story:
      "Alvar Aalto Museum helps explain why Jyväskylä is not just a city with architecture, but a city shaped by architectural thinking.",
  },
  {
    id: 4,
    title: "Craft Museum of Finland",
    category: "Living Traditions",
    dna: 4.4,
    image: "/images/craftsmens-quarter.jpg",
    description:
      "A place where local heritage, handmade culture, and everyday city identity meet.",
    shortImpact: "Living heritage area",
    features: {
      busAccess: true,
      paidEntry: false,
      accessible: false,
    },
    coordinates: [62.24198643964821, 25.745195061068237],
    indicators: [
      { label: "Cultural Significance", value: 4 },
      { label: "Local Life", value: 5 },
      { label: "Unique Experience", value: 4 },
    ],
    impactSignals: [
      "Supports local identity",
      "Keeps tradition visible in daily life",
      "Offers authentic human-scale experiences",
    ],
    liveEvents: [
      "Craft Workshop — Tue 16:00",
      "Local Makers Market — Sun 11:00",
    ],
    story:
      "This area connects visitors with the textures of local life, craft, memory, and continuity.",
  },
  {
    id: 5,
    title: "Harju Area",
    category: "Nature–Cultural Gems",
    dna: 4.2,
    image: "/images/harju-area.jpg",
    description:
      "A unique mix of nature, city views, and cultural meaning in the heart of Jyväskylä.",
    shortImpact: "Nature and identity landmark",
    features: {
      busAccess: true,
      paidEntry: false,
      accessible: false,
    },
    coordinates: [62.2445, 25.738],
    indicators: [
      { label: "Cultural Significance", value: 4 },
      { label: "Local Life", value: 4 },
      { label: "Unique Experience", value: 4 },
    ],
    impactSignals: [
      "Combines landscape and urban identity",
      "Popular with residents and visitors",
      "Creates memorable city views",
    ],
    liveEvents: ["Sunset Walk — Fri 20:00", "Outdoor Music Moment — Sat 19:00"],
    story:
      "Harju is one of those places where the natural form of the city and its emotional identity meet.",
  },
  {
    id: 6,
    title: "Lutakko",
    category: "Contemporary City",
    dna: 4.3,
    image: "/images/lutakko.jpg",
    description:
      "A lively area where post-industrial urban identity, events, and contemporary city culture come together.",
    shortImpact: "Contemporary urban district",
    features: {
      busAccess: true,
      paidEntry: false,
      accessible: true,
    },
    coordinates: [62.2395, 25.7585],
    indicators: [
      { label: "Cultural Significance", value: 4 },
      { label: "Local Life", value: 5 },
      { label: "Unique Experience", value: 4 },
    ],
    impactSignals: [
      "Represents modern city transformation",
      "Strong event and culture atmosphere",
      "Links everyday life with contemporary identity",
    ],
    liveEvents: [
      "Live Music Night — Thu 21:00",
      "Urban Culture Walk — Sat 16:00",
    ],
    story:
      "Lutakko shows how a city can transform industrial space into a living cultural district.",
  },
  {
    id: 7,
    title: "Matti Nykänen's Hill",
    category: "Sports Capital",
    dna: 4.6,
    image: "/images/nykanen-hill.jpg",
    description:
      "A landmark ski jumping hill associated with Finland’s Olympic legacy and one of its most iconic athletes.",
    shortImpact: "Olympic ski legacy",
    features: {
      busAccess: true,
      paidEntry: false,
      accessible: false,
    },
    coordinates: [62.259037, 25.683533],
    indicators: [
      { label: "Cultural Significance", value: 5 },
      { label: "Local Life", value: 3 },
      { label: "Unique Experience", value: 4 },
    ],
    impactSignals: [
      "Strong Olympic and national sports identity",
      "Associated with Matti Nykänen’s legacy",
      "Visible symbol of Jyväskylä as a sports city",
    ],
    liveEvents: [
      "Seasonal ski training sessions",
      "Public hill visits and viewpoints",
    ],
    story:
      "More than a sports structure, this hill carries the memory of Finnish excellence and the emotional weight of national victories.",
  },
  {
    id: 8,
    title: "Laajavuori Nature Trail",
    category: "Nature–Cultural Gems",
    dna: 4.5,
    image: "/images/laajavuori-trail.jpg",
    description:
      "A symbolic entry point into the Finnish forest experience, combining nature, movement, and quiet reflection.",
    shortImpact: "Forest experience gateway",
    features: {
      busAccess: true,
      paidEntry: false,
      accessible: true,
    },
    coordinates: [62.2614, 25.692738],
    indicators: [
      { label: "Cultural Significance", value: 4 },
      { label: "Local Life", value: 4 },
      { label: "Unique Experience", value: 5 },
    ],
    impactSignals: [
      "Direct access to Finnish forest culture",
      "Popular among locals for everyday recreation",
      "Seasonal transformation (snow, light, silence)",
    ],
    liveEvents: [
      "Guided nature walks — Sat 11:00",
      "Winter trail activities — seasonal",
    ],
    story:
      "Laajavuori is where the city dissolves into forest, and everyday life reconnects with something slower and deeper.",
  },
  {
    id: 9,
    title: "Kangas Old Paper Mill",
    category: "Contemporary City",
    dna: 4.7,
    image: "/images/kangas-paper-mill.jpg",
    description:
      "A former industrial site transformed into a vibrant creative district with culture, design, and urban life.",
    shortImpact: "Industrial → creative transformation",
    features: {
      busAccess: true,
      paidEntry: false,
      accessible: true,
    },
    coordinates: [62.2448, 25.7596],
    indicators: [
      { label: "Cultural Significance", value: 4 },
      { label: "Local Life", value: 5 },
      { label: "Unique Experience", value: 4 },
    ],
    impactSignals: [
      "Adaptive reuse of industrial heritage",
      "Creative industries and urban culture hub",
      "Mix of old structures and new functions",
    ],
    liveEvents: ["Art exhibitions — ongoing", "Community events and pop-ups"],
    story:
      "Kangas reflects how cities evolve — not by erasing the past, but by reworking it into something new and alive.",
  },

  {
    id: 10,
    title: "Toivola Old Courtyard",
    category: "Living Traditions",
    dna: 4.6,
    image: "/images/toivola-courtyard.jpg",
    description:
      "A preserved 19th-century courtyard that captures the feeling of everyday life from another time.",
    shortImpact: "Living historical courtyard",
    features: {
      busAccess: true,
      paidEntry: false,
      accessible: false,
    },
    coordinates: [62.23774692755986, 25.744743658377523],
    indicators: [
      { label: "Cultural Significance", value: 5 },
      { label: "Local Life", value: 4 },
      { label: "Unique Experience", value: 4 },
    ],
    impactSignals: [
      "Authentic preserved wooden architecture",
      "Strong sense of historical everyday life",
      "Crafts, small shops, and cultural atmosphere",
    ],
    liveEvents: ["Seasonal craft events", "Local cultural gatherings"],
    story:
      "Toivola is not a museum piece, but a lived fragment of history — a place where time feels layered rather than past.",
  },
];
