const formulesData = [
    {
        id: 1,
        theme: "energie",
        formula: "E = P \\times t",
        question: "Donner une relation entre puissance, temps et énergie.",
        variables: [
            { symbol: "E", name: "Énergie", unit: "Joules (J)" },
            { symbol: "P", name: "Puissance", unit: "Watts (W)" },
            { symbol: "t", name: "Temps", unit: "secondes (s)" }
        ]
    },
    {
        id: 2,
        theme: "thermique",
        formula: "e = R \\times \\lambda",
        question: "Donner une relation entre épaisseur, résistance thermique et conductivité.",
        variables: [
            { symbol: "e", name: "Épaisseur", unit: "mètres (m)" },
            { symbol: "R", name: "Résistance thermique", unit: "K/W" },
            { symbol: "\\lambda", name: "Conductivité thermique", unit: "W/(m·K)" }
        ]
    },
    {
        id: 3,
        theme: "chimie",
        formula: "m = M \\times n",
        question: "Donner une relation entre masse, masse molaire et quantité de matière.",
        variables: [
            { symbol: "m", name: "Masse", unit: "grammes (g)" },
            { symbol: "M", name: "Masse molaire", unit: "g/mol" },
            { symbol: "n", name: "Quantité de matière", unit: "moles (mol)" }
        ]
    },
    {
        id: 4,
        theme: "ondes",
        formula: "\\lambda = c \\times T",
        question: "Donner une relation entre longueur d'onde, célérité de la lumière et période.",
        variables: [
            { symbol: "\\lambda", name: "Longueur d'onde", unit: "mètres (m)" },
            { symbol: "c", name: "Célérité de la lumière", unit: "m/s" },
            { symbol: "T", name: "Période", unit: "secondes (s)" }
        ]
    },
    {
        id: 5,
        theme: "thermique",
        formula: "Q = m \\times c \\times \\Delta T",
        question: "Je veux connaître l'énergie nécessaire pour faire passer un objet d'une température initiale à une température finale. Quelle relation j'utilise ?",
        variables: [
            { symbol: "Q", name: "Énergie thermique", unit: "Joules (J)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "c", name: "Capacité thermique massique", unit: "J/(kg·K)" },
            { symbol: "\\Delta T", name: "Variation de température", unit: "Kelvin (K) ou °C" }
        ]
    },
    {
        id: 6,
        theme: "mecanique",
        formula: "P = m \\times g",
        question: "Donner une relation entre masse, poids et accélération de la pesanteur.",
        variables: [
            { symbol: "P", name: "Poids", unit: "Newtons (N)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "g", name: "Accélération de la pesanteur", unit: "m/s²" }
        ]
    },
    {
        id: 7,
        theme: "mecanique",
        formula: "\\sum \\vec{F} = m \\times \\vec{a}",
        question: "Donner le principe fondamental de la dynamique.",
        variables: [
            { symbol: "\\sum \\vec{F}", name: "Somme des forces", unit: "Newtons (N)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "\\vec{a}", name: "Accélération", unit: "m/s²" }
        ]
    },
    {
        id: 8,
        theme: "ondes",
        formula: "E = h \\times f",
        question: "Donner une relation entre l'énergie, la fréquence et la constante de Planck.",
        variables: [
            { symbol: "E", name: "Énergie", unit: "Joules (J)" },
            { symbol: "h", name: "Constante de Planck", unit: "J·s (6.626×10⁻³⁴)" },
            { symbol: "f", name: "Fréquence", unit: "Hertz (Hz)" }
        ]
    },
    {
        id: 9,
        theme: "thermique",
        formula: "Q = m \\times L",
        question: "Donner une relation entre énergie, énergie massique de changements d'état et masse.",
        variables: [
            { symbol: "Q", name: "Énergie", unit: "Joules (J)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "L", name: "Énergie massique de changement d'état", unit: "J/kg" }
        ]
    },
    {
        id: 10,
        theme: "geometrie",
        formula: "S = \\pi \\times r^2",
        question: "Donner la relation permettant de calculer la surface d'un cercle.",
        variables: [
            { symbol: "S", name: "Surface", unit: "mètres carrés (m²)" },
            { symbol: "\\pi", name: "Pi", unit: "≈ 3.14159" },
            { symbol: "r", name: "Rayon", unit: "mètres (m)" }
        ]
    },
    {
        id: 11,
        theme: "ondes",
        formula: "L = 10 \\times \\log_{10}\\left(\\frac{I}{I_0}\\right)",
        question: "Donner la relation permettant de calculer le niveau sonore à partir de l'intensité sonore.",
        variables: [
            { symbol: "L", name: "Niveau sonore", unit: "décibels (dB)" },
            { symbol: "I", name: "Intensité sonore", unit: "W/m²" },
            { symbol: "I_0", name: "Intensité de référence", unit: "W/m² (10⁻¹²)" }
        ]
    },
    {
        id: 12,
        theme: "mecanique",
        formula: "p = \\frac{F}{S}",
        question: "Donner une relation entre pression, force et surface.",
        variables: [
            { symbol: "p", name: "Pression", unit: "Pascals (Pa)" },
            { symbol: "F", name: "Force", unit: "Newtons (N)" },
            { symbol: "S", name: "Surface", unit: "mètres carrés (m²)" }
        ]
    },
    {
        id: 13,
        theme: "electricite",
        formula: "S = U \\times I",
        question: "Donner la relation permettant de déterminer la puissance apparente.",
        variables: [
            { symbol: "S", name: "Puissance apparente", unit: "Voltampères (VA)" },
            { symbol: "U", name: "Tension", unit: "Volts (V)" },
            { symbol: "I", name: "Intensité", unit: "Ampères (A)" }
        ]
    },
    {
        id: 14,
        theme: "energie",
        formula: "E_c = \\frac{1}{2} \\times m \\times v^2",
        question: "Donner la relation permettant de calculer l'énergie cinétique.",
        variables: [
            { symbol: "E_c", name: "Énergie cinétique", unit: "Joules (J)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "v", name: "Vitesse", unit: "m/s" }
        ]
    },
    {
        id: 15,
        theme: "ondes",
        formula: "I = \\frac{P}{S}",
        question: "Donner une relation entre intensité acoustique, puissance et surface.",
        variables: [
            { symbol: "I", name: "Intensité acoustique", unit: "W/m²" },
            { symbol: "P", name: "Puissance acoustique", unit: "Watts (W)" },
            { symbol: "S", name: "Surface de propagation", unit: "mètres carrés (m²)" }
        ]
    }
];const formulesData = [
    {
        id: 1,
        theme: "energie",
        formula: "E = P \\times t",
        question: "Donner une relation entre puissance, temps et énergie.",
        variables: [
            { symbol: "E", name: "Énergie", unit: "Joules (J)" },
            { symbol: "P", name: "Puissance", unit: "Watts (W)" },
            { symbol: "t", name: "Temps", unit: "secondes (s)" }
        ]
    },
    {
        id: 2,
        theme: "thermique",
        formula: "e = R \\times \\lambda",
        question: "Donner une relation entre épaisseur, résistance thermique et conductivité.",
        variables: [
            { symbol: "e", name: "Épaisseur", unit: "mètres (m)" },
            { symbol: "R", name: "Résistance thermique", unit: "K/W" },
            { symbol: "\\lambda", name: "Conductivité thermique", unit: "W/(m·K)" }
        ]
    },
    {
        id: 3,
        theme: "chimie",
        formula: "m = M \\times n",
        question: "Donner une relation entre masse, masse molaire et quantité de matière.",
        variables: [
            { symbol: "m", name: "Masse", unit: "grammes (g)" },
            { symbol: "M", name: "Masse molaire", unit: "g/mol" },
            { symbol: "n", name: "Quantité de matière", unit: "moles (mol)" }
        ]
    },
    {
        id: 4,
        theme: "ondes",
        formula: "\\lambda = c \\times T",
        question: "Donner une relation entre longueur d'onde, célérité de la lumière et période.",
        variables: [
            { symbol: "\\lambda", name: "Longueur d'onde", unit: "mètres (m)" },
            { symbol: "c", name: "Célérité de la lumière", unit: "m/s" },
            { symbol: "T", name: "Période", unit: "secondes (s)" }
        ]
    },
    {
        id: 5,
        theme: "thermique",
        formula: "Q = m \\times c \\times \\Delta T",
        question: "Je veux connaître l'énergie nécessaire pour faire passer un objet d'une température initiale à une température finale. Quelle relation j'utilise ?",
        variables: [
            { symbol: "Q", name: "Énergie thermique", unit: "Joules (J)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "c", name: "Capacité thermique massique", unit: "J/(kg·K)" },
            { symbol: "\\Delta T", name: "Variation de température", unit: "Kelvin (K) ou °C" }
        ]
    },
    {
        id: 6,
        theme: "mecanique",
        formula: "P = m \\times g",
        question: "Donner une relation entre masse, poids et accélération de la pesanteur.",
        variables: [
            { symbol: "P", name: "Poids", unit: "Newtons (N)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "g", name: "Accélération de la pesanteur", unit: "m/s²" }
        ]
    },
    {
        id: 7,
        theme: "mecanique",
        formula: "\\sum \\vec{F} = m \\times \\vec{a}",
        question: "Donner le principe fondamental de la dynamique.",
        variables: [
            { symbol: "\\sum \\vec{F}", name: "Somme des forces", unit: "Newtons (N)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "\\vec{a}", name: "Accélération", unit: "m/s²" }
        ]
    },
    {
        id: 8,
        theme: "ondes",
        formula: "E = h \\times f",
        question: "Donner une relation entre l'énergie, la fréquence et la constante de Planck.",
        variables: [
            { symbol: "E", name: "Énergie", unit: "Joules (J)" },
            { symbol: "h", name: "Constante de Planck", unit: "J·s (6.626×10⁻³⁴)" },
            { symbol: "f", name: "Fréquence", unit: "Hertz (Hz)" }
        ]
    },
    {
        id: 9,
        theme: "thermique",
        formula: "Q = m \\times L",
        question: "Donner une relation entre énergie, énergie massique de changements d'état et masse.",
        variables: [
            { symbol: "Q", name: "Énergie", unit: "Joules (J)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "L", name: "Énergie massique de changement d'état", unit: "J/kg" }
        ]
    },
    {
        id: 10,
        theme: "geometrie",
        formula: "S = \\pi \\times r^2",
        question: "Donner la relation permettant de calculer la surface d'un cercle.",
        variables: [
            { symbol: "S", name: "Surface", unit: "mètres carrés (m²)" },
            { symbol: "\\pi", name: "Pi", unit: "≈ 3.14159" },
            { symbol: "r", name: "Rayon", unit: "mètres (m)" }
        ]
    },
    {
        id: 11,
        theme: "ondes",
        formula: "L = 10 \\times \\log_{10}\\left(\\frac{I}{I_0}\\right)",
        question: "Donner la relation permettant de calculer le niveau sonore à partir de l'intensité sonore.",
        variables: [
            { symbol: "L", name: "Niveau sonore", unit: "décibels (dB)" },
            { symbol: "I", name: "Intensité sonore", unit: "W/m²" },
            { symbol: "I_0", name: "Intensité de référence", unit: "W/m² (10⁻¹²)" }
        ]
    },
    {
        id: 12,
        theme: "mecanique",
        formula: "p = \\frac{F}{S}",
        question: "Donner une relation entre pression, force et surface.",
        variables: [
            { symbol: "p", name: "Pression", unit: "Pascals (Pa)" },
            { symbol: "F", name: "Force", unit: "Newtons (N)" },
            { symbol: "S", name: "Surface", unit: "mètres carrés (m²)" }
        ]
    },
    {
        id: 13,
        theme: "electricite",
        formula: "S = U \\times I",
        question: "Donner la relation permettant de déterminer la puissance apparente.",
        variables: [
            { symbol: "S", name: "Puissance apparente", unit: "Voltampères (VA)" },
            { symbol: "U", name: "Tension", unit: "Volts (V)" },
            { symbol: "I", name: "Intensité", unit: "Ampères (A)" }
        ]
    },
    {
        id: 14,
        theme: "energie",
        formula: "E_c = \\frac{1}{2} \\times m \\times v^2",
        question: "Donner la relation permettant de calculer l'énergie cinétique.",
        variables: [
            { symbol: "E_c", name: "Énergie cinétique", unit: "Joules (J)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "v", name: "Vitesse", unit: "m/s" }
        ]
    },
    {
        id: 15,
        theme: "ondes",
        formula: "I = \\frac{P}{S}",
        question: "Donner une relation entre intensité acoustique, puissance et surface.",
        variables: [
            { symbol: "I", name: "Intensité acoustique", unit: "W/m²" },
            { symbol: "P", name: "Puissance acoustique", unit: "Watts (W)" },
            { symbol: "S", name: "Surface de propagation", unit: "mètres carrés (m²)" }
        ]
    }
];