// ========================================
// 📘 BASE DE DONNÉES DES FORMULES
// ========================================
const formulesData = [
    // ========== ÉLECTRICITÉ ==========
    {
        id: 1,
        theme: "electricite",
        formula: "P = U \\times I \\times \\cos(\\phi)",
        question: "Donner la relation permettant de déterminer la puissance active à partir de la tension, l'intensité du courant et le facteur de puissance.",
        variables: [
            { symbol: "P", name: "Puissance active", unit: "Watts (W)" },
            { symbol: "U", name: "Tension efficace", unit: "Volts (V)" },
            { symbol: "I", name: "Intensité efficace", unit: "Ampères (A)" },
            { symbol: "\\cos(\\phi)", name: "Facteur de puissance", unit: "sans unité" }
        ]
    },
    {
        id: 2,
        theme: "electricite",
        formula: "P = \\frac{E}{t}",
        question: "Donner une relation entre puissance, temps et énergie / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "P", name: "Puissance", unit: "Watts (W)" },
            { symbol: "E", name: "Énergie", unit: "Joules (J) ou Wh" },
            { symbol: "t", name: "Temps / Durée", unit: "secondes (s) ou heures (h)" }
        ]
    },
    {
        id: 3,
        theme: "electricite",
        formula: "S = U \\times I",
        question: "Donner la relation permettant de déterminer la puissance apparente / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "S", name: "Puissance apparente", unit: "Voltampères (VA)" },
            { symbol: "U", name: "Tension efficace", unit: "Volts (V)" },
            { symbol: "I", name: "Intensité efficace", unit: "Ampères (A)" }
        ]
    },
    {
        id: 4,
        theme: "electricite",
        formula: "P_j = R \\times I^2",
        question: "Donner la relation permettant de calculer la puissance dissipée par effet Joule / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "P_j", name: "Puissance dissipée par effet Joule", unit: "Watts (W)" },
            { symbol: "R", name: "Résistance", unit: "Ohms (Ω)" },
            { symbol: "I", name: "Intensité du courant", unit: "Ampères (A)" }
        ]
    },
    {
        id: 5,
        theme: "electricite",
        formula: "k = \\frac{P}{S}",
        question: "Donner la relation permettant de calculer le facteur de puissance / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "k", name: "Facteur de puissance", unit: "sans unité (ou cos φ)" },
            { symbol: "P", name: "Puissance active", unit: "Watts (W)" },
            { symbol: "S", name: "Puissance apparente", unit: "Voltampères (VA)" }
        ]
    },
    {
        id: 6,
        theme: "electricite",
        formula: "t = \\frac{Q}{I}",
        question: "Donner la relation donnant le temps de fonctionnement d'une batterie en fonction de sa capacité et de l'intensité du courant délivrée.",
        variables: [
            { symbol: "t", name: "Temps de fonctionnement", unit: "heures (h)" },
            { symbol: "Q", name: "Capacité de la batterie", unit: "Ampères-heures (Ah)" },
            { symbol: "I", name: "Intensité du courant", unit: "Ampères (A)" }
        ]
    },
    {
        id: 7,
        theme: "electricite",
        formula: "Q_{\\text{élec}} = U \\times I \\times \\sin(\\phi)",
        question: "Donner la relation permettant de calculer la puissance réactive / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "Q_{\\text{élec}}", name: "Puissance réactive", unit: "Volt-Ampères Réactifs (VAR)" },
            { symbol: "U", name: "Tension efficace", unit: "Volts (V)" },
            { symbol: "I", name: "Intensité efficace", unit: "Ampères (A)" },
            { symbol: "\\sin(\\phi)", name: "Sinus du déphasage", unit: "sans unité" }
        ]
    },
    {
        id: 8,
        theme: "electricite",
        formula: "U = R \\times I",
        question: "Donner une relation entre tension, résistance et intensité du courant / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "U", name: "Tension électrique", unit: "Volts (V)" },
            { symbol: "R", name: "Résistance", unit: "Ohms (Ω)" },
            { symbol: "I", name: "Intensité du courant", unit: "Ampères (A)" }
        ]
    },
    {
        id: 9,
        theme: "electricite",
        formula: "\\eta = \\frac{P_{\\text{utile}}}{P_{\\text{absorbée}}}",
        question: "Donner l'expression du rendement d'un système.",
        variables: [
            { symbol: "\\eta", name: "Rendement", unit: "sans unité (ou %)" },
            { symbol: "P_{\\text{utile}}", name: "Puissance utile", unit: "Watts (W)" },
            { symbol: "P_{\\text{absorbée}}", name: "Puissance absorbée", unit: "Watts (W)" }
        ]
    },

    // ========== ONDES ==========
    {
        id: 10,
        theme: "ondes",
        formula: "\\lambda = c \\times T",
        question: "Donner la relation entre longueur d'onde, célérité de la lumière et période / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "\\lambda", name: "Longueur d'onde", unit: "mètres (m)" },
            { symbol: "c", name: "Célérité de la lumière", unit: "m/s (≈3×10⁸ m/s)" },
            { symbol: "T", name: "Période", unit: "secondes (s)" }
        ]
    },
    {
        id: 11,
        theme: "ondes",
        formula: "E = h \\times f",
        question: "Donner une relation entre l'énergie, la fréquence et la constante de Planck - Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "E", name: "Énergie d'un photon", unit: "Joules (J)" },
            { symbol: "h", name: "Constante de Planck", unit: "J·s (≈6,63×10⁻³⁴)" },
            { symbol: "f", name: "Fréquence", unit: "Hertz (Hz)" }
        ]
    },
    {
        id: 12,
        theme: "ondes",
        formula: "f = \\frac{1}{T}",
        question: "Je connais la période d'une fonction périodique. Donner la relation permettant de calculer sa fréquence. Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "f", name: "Fréquence", unit: "Hertz (Hz)" },
            { symbol: "T", name: "Période", unit: "secondes (s)" }
        ]
    },
    {
        id: 13,
        theme: "ondes",
        formula: "L = 10 \\times \\log\\left(\\frac{I}{I_0}\\right)",
        question: "Donner la relation permettant de calculer le niveau sonore à partir de l'intensité sonore / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "L", name: "Niveau sonore", unit: "décibels (dB)" },
            { symbol: "I", name: "Intensité acoustique", unit: "W/m²" },
            { symbol: "I_0", name: "Intensité de référence", unit: "W/m² (10⁻¹² W/m²)" }
        ]
    },

    // ========== MÉCANIQUE ==========
    {
        id: 14,
        theme: "mecanique",
        formula: "v = \\frac{d}{t}",
        question: "Donner la relation entre vitesse, distance et temps.",
        variables: [
            { symbol: "v", name: "Vitesse linéaire", unit: "m/s" },
            { symbol: "d", name: "Distance parcourue", unit: "mètres (m)" },
            { symbol: "t", name: "Durée du parcours", unit: "secondes (s)" }
        ]
    },
    {
        id: 15,
        theme: "mecanique",
        formula: "P = m \\times g",
        question: "Donner une relation entre masse, poids et accélération de la pesanteur - Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "P", name: "Poids", unit: "Newtons (N)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "g", name: "Intensité de la pesanteur", unit: "N/kg ou m/s² (≈9,81)" }
        ]
    },
    {
        id: 16,
        theme: "mecanique",
        formula: "E_c = \\frac{1}{2} m \\times v^2",
        question: "Donner la relation permettant de calculer l'énergie cinétique.",
        variables: [
            { symbol: "E_c", name: "Énergie cinétique", unit: "Joules (J)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "v", name: "Vitesse linéaire", unit: "m/s" }
        ]
    },
    {
        id: 17,
        theme: "mecanique",
        formula: "M = F \\times d",
        question: "Donner la relation permettant de calculer le moment d'une force à partir de la force et du bras de levier.",
        variables: [
            { symbol: "M", name: "Moment de la force", unit: "N·m" },
            { symbol: "F", name: "Force appliquée", unit: "Newtons (N)" },
            { symbol: "d", name: "Bras de levier", unit: "mètres (m)" }
        ]
    },
    {
        id: 18,
        theme: "mecanique",
        formula: "\\omega = \\frac{n \\times 2\\pi}{60}",
        question: "Donner la relation permettant de convertir des tours/minute en rad/seconde.",
        variables: [
            { symbol: "\\omega", name: "Vitesse angulaire", unit: "rad/s" },
            { symbol: "n", name: "Vitesse de rotation", unit: "tr/min" },
            { symbol: "2\\pi", name: "Constante (un tour en radians)", unit: "rad" }
        ]
    },
    {
        id: 19,
        theme: "mecanique",
        formula: "v_{\\text{m/s}} = \\frac{v_{\\text{km/h}}}{3{,}6}",
        question: "Donner la relation permettant de convertir des km/h en m/s.",
        variables: [
            { symbol: "v_{\\text{m/s}}", name: "Vitesse en mètres par seconde", unit: "m/s" },
            { symbol: "v_{\\text{km/h}}", name: "Vitesse en kilomètres par heure", unit: "km/h" }
        ]
    },
    {
        id: 20,
        theme: "mecanique",
        formula: "\\sum \\vec{F} = m \\times \\vec{a}",
        question: "Donner l'expression du principe fondamental de la dynamique. Préciser l'unité et le nom des grandeurs.",
        variables: [
            { symbol: "\\sum \\vec{F}", name: "Somme des forces extérieures", unit: "Newtons (N)" },
            { symbol: "m", name: "Masse du système", unit: "kilogrammes (kg)" },
            { symbol: "\\vec{a}", name: "Vecteur accélération", unit: "m/s²" }
        ]
    },
    {
        id: 21,
        theme: "mecanique",
        formula: "P = \\frac{F}{S}",
        question: "Donner l'expression de la pression en fonction de la force et de la surface / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "P", name: "Pression", unit: "Pascals (Pa)" },
            { symbol: "F", name: "Force pressante", unit: "Newtons (N)" },
            { symbol: "S", name: "Surface de contact", unit: "m²" }
        ]
    },
    {
        id: 22,
        theme: "mecanique",
        formula: "\\rho = \\frac{m}{V}",
        question: "Donner une relation entre masse, masse volumique et volume - Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "\\rho", name: "Masse volumique", unit: "kg/m³" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "V", name: "Volume", unit: "m³" }
        ]
    },

    // ========== THERMIQUE ==========
    {
        id: 23,
        theme: "thermique",
        formula: "Q = m \\times c \\times \\Delta T",
        question: "Je veux connaître l'énergie nécessaire pour faire passer un objet d'une température initiale à une température finale. Quelle relation j'utilise ? Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "Q", name: "Énergie thermique", unit: "Joules (J)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "c", name: "Capacité thermique massique", unit: "J/(kg·K)" },
            { symbol: "\\Delta T", name: "Variation de température", unit: "Kelvin (K) ou °C" }
        ]
    },
    {
        id: 24,
        theme: "thermique",
        formula: "Q = m \\times L",
        question: "Donner une relation entre énergie, énergie massique de changements d'état et masse - Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "Q", name: "Énergie de changement d'état", unit: "Joules (J)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "L", name: "Chaleur latente massique", unit: "J/kg" }
        ]
    },
    {
        id: 25,
        theme: "thermique",
        formula: "R = \\frac{e}{\\lambda}",
        question: "Donner une relation entre épaisseur, résistance thermique et conductivité - Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "R", name: "Résistance thermique", unit: "m²·K/W" },
            { symbol: "e", name: "Épaisseur du matériau", unit: "mètres (m)" },
            { symbol: "\\lambda", name: "Conductivité thermique", unit: "W/(m·K)" }
        ]
    },

    // ========== CHIMIE ==========
    {
        id: 26,
        theme: "chimie",
        formula: "n = \\frac{m}{M}",
        question: "Donner une relation entre masse, masse molaire et quantité de matière / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "n", name: "Quantité de matière", unit: "moles (mol)" },
            { symbol: "m", name: "Masse", unit: "grammes (g)" },
            { symbol: "M", name: "Masse molaire", unit: "g/mol" }
        ]
    },
    {
        id: 27,
        theme: "chimie",
        formula: "pH = -\\log[H_3O^+]",
        question: "Donner une relation permettant de calculer le pH à partir de la concentration en ions oxonium.",
        variables: [
            { symbol: "pH", name: "Potentiel Hydrogène", unit: "sans unité" },
            { symbol: "[H_3O^+]", name: "Concentration en ions oxonium", unit: "mol/L" }
        ]
    },

    // ========== GÉOMÉTRIE (utile pour calculs techniques) ==========
    {
        id: 28,
        theme: "geometrie",
        formula: "S = \\pi \\times r^2",
        question: "Donner la relation permettant de calculer la surface d'un cercle.",
        variables: [
            { symbol: "S", name: "Surface / Aire", unit: "m²" },
            { symbol: "\\pi", name: "Constante pi", unit: "≈3,14" },
            { symbol: "r", name: "Rayon du cercle", unit: "mètres (m)" }
        ]
    }
    ,
    // ========== MÉCANIQUE DES FLUIDES (ajoutées depuis ancien fichier) ==========
    {
        id: 29,
        theme: "fluides",
        formula: "Q_v = S \\times v",
        question: "Donner la relation permettant de calculer le débit volumique à partir de la surface de section et de la vitesse moyenne du fluide / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "Q_v", name: "Débit volumique", unit: "m³/s" },
            { symbol: "S", name: "Surface de la section", unit: "m²" },
            { symbol: "v", name: "Vitesse moyenne du fluide", unit: "m/s" }
        ]
    },
    {
        id: 30,
        theme: "fluides",
        formula: "\\Delta P = \\rho \\times g \\times h",
        question: "Donner la relation permettant de calculer la différence de pression à partir de la masse volumique du fluide, l'intensité de la pesanteur et la hauteur / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "\\Delta P", name: "Différence de pression", unit: "Pascals (Pa)" },
            { symbol: "\\rho", name: "Masse volumique du fluide", unit: "kg/m³" },
            { symbol: "g", name: "Intensité de la pesanteur", unit: "m/s²" },
            { symbol: "h", name: "Différence de hauteur", unit: "mètres (m)" }
        ]
    },
    {
        id: 31,
        theme: "fluides",
        formula: "S_1 \\times v_1 = S_2 \\times v_2",
        question: "Donner la relation de continuité du débit à partir des surfaces et vitesses en deux points différents de la conduite / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "S_1", name: "Surface au point 1", unit: "m²" },
            { symbol: "v_1", name: "Vitesse au point 1", unit: "m/s" },
            { symbol: "S_2", name: "Surface au point 2", unit: "m²" },
            { symbol: "v_2", name: "Vitesse au point 2", unit: "m/s" }
        ]
    },
    {
        id: 32,
        theme: "fluides",
        formula: "P_{\\text{hyd}} = \\Delta P \\times Q_v",
        question: "Donner la relation permettant de calculer la puissance hydraulique à partir de la variation de pression et du débit volumique / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "P_{\\text{hyd}}", name: "Puissance hydraulique", unit: "Watts (W)" },
            { symbol: "\\Delta P", name: "Variation de pression", unit: "Pascals (Pa)" },
            { symbol: "Q_v", name: "Débit volumique", unit: "m³/s" }
        ]
    },
    {
        id: 33,
        theme: "fluides",
        formula: "\\frac{1}{2}\\rho v^2 + \\rho g z + P = \\text{cste}",
        question: "Donner l'équation de Bernoulli à partir de la vitesse du fluide, l'altitude et la pression statique / Préciser la signification de chaque terme et les conditions d'application.",
        variables: [
            { symbol: "\\rho", name: "Masse volumique", unit: "kg/m³" },
            { symbol: "v", name: "Vitesse du fluide", unit: "m/s" },
            { symbol: "g", name: "Pesanteur", unit: "m/s²" },
            { symbol: "z", name: "Altitude", unit: "mètres (m)" },
            { symbol: "P", name: "Pression statique", unit: "Pascals (Pa)" }
        ]
    },
    {
        id: 34,
        theme: "fluides",
        formula: "\\Delta P_r = \\Lambda \\times \\frac{L}{D} \\times \\frac{\\rho v^2}{2}",
        question: "Donner la formule des pertes de charge régulières (Darcy-Weisbach) à partir du coefficient de perte de charge, longueur et diamètre de la conduite et vitesse du fluide / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "\\Delta P_r", name: "Perte de charge", unit: "Pascals (Pa)" },
            { symbol: "\\Lambda", name: "Coefficient de perte de charge", unit: "sans unité" },
            { symbol: "L", name: "Longueur de la conduite", unit: "mètres (m)" },
            { symbol: "D", name: "Diamètre de la conduite", unit: "mètres (m)" },
            { symbol: "\\rho", name: "Masse volumique", unit: "kg/m³" },
            { symbol: "v", name: "Vitesse d'écoulement", unit: "m/s" }
        ]
    },
    // ========== PHYSIQUE NUCLÉAIRE (ajoutées depuis ancien fichier) ==========
    {
        id: 35,
        theme: "nucleaire",
        formula: "\\lambda = \\frac{\\ln(2)}{T_{1/2}}",
        question: "Donner la relation permettant de calculer la constante radioactive à partir de la demi-vie / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "\\lambda", name: "Constante radioactive", unit: "s⁻¹ (ou an⁻¹)" },
            { symbol: "T_{1/2}", name: "Demi-vie", unit: "secondes (s) ou années" }
        ]
    },
    {
        id: 36,
        theme: "nucleaire",
        formula: "A = \\lambda \\times N",
        question: "Donner la relation permettant de calculer l'activité à partir de la constante radioactive et du nombre de noyaux radioactifs / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "A", name: "Activité", unit: "Becquerels (Bq)" },
            { symbol: "\\lambda", name: "Constante radioactive", unit: "s⁻¹" },
            { symbol: "N", name: "Nombre de noyaux radioactifs", unit: "sans unité" }
        ]
    },
    {
        id: 37,
        theme: "nucleaire",
        formula: "E = \\Delta m \\times c^2",
        question: "Donner l'équivalence masse-énergie d'Einstein à partir du défaut de masse / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "E", name: "Énergie libérée", unit: "Joules (J)" },
            { symbol: "\\Delta m", name: "Défaut de masse", unit: "kilogrammes (kg)" },
            { symbol: "c", name: "Célérité de la lumière", unit: "m/s (≈3×10⁸)" }
        ]
    },
    {
        id: 38,
        theme: "nucleaire",
        formula: "N(t) = N_0 \\times e^{-\\lambda \\times t}",
        question: "Donner la loi de décroissance radioactive à partir du nombre initial de noyaux, de la constante radioactive et du temps / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "N(t)", name: "Nombre de noyaux à l'instant t", unit: "sans unité" },
            { symbol: "N_0", name: "Nombre de noyaux initiaux", unit: "sans unité" },
            { symbol: "\\lambda", name: "Constante radioactive", unit: "inverse du temps" },
            { symbol: "t", name: "Temps écoulé", unit: "s, h, jours ou ans" }
        ]
    },
    // ========== ÉNERGIE & RENDEMENT (ajoutées depuis ancien fichier) ==========
    {
        id: 39,
        theme: "energie",
        formula: "\\eta = \\frac{P_u}{P_a}",
        question: "Donner la relation permettant de calculer le rendement à partir de la puissance utile et de la puissance absorbée / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "\\eta", name: "Rendement", unit: "sans unité (ou % )" },
            { symbol: "P_u", name: "Puissance utile", unit: "Watts (W)" },
            { symbol: "P_a", name: "Puissance absorbée", unit: "Watts (W)" }
        ]
    },
    {
        id: 40,
        theme: "energie",
        formula: "E_m = E_c + E_p",
        question: "Donner la relation permettant de calculer l'énergie mécanique totale à partir de l'énergie cinétique et de l'énergie potentielle / Préciser l'unité et le nom de chacune des grandeurs.",
        variables: [
            { symbol: "E_m", name: "Énergie mécanique totale", unit: "Joules (J)" },
            { symbol: "E_c", name: "Énergie cinétique", unit: "Joules (J)" },
            { symbol: "E_p", name: "Énergie potentielle", unit: "Joules (J)" }
        ]
    }
    ,
    // ===== Nouvelles formules ajoutées : intensité sonore et [H3O+] depuis pH =====
    {
        id: 41,
        theme: "ondes",
        formula: "I = I_0 \\times 10^{L/10}",
        question: "Donner la relation permettant de calculer l'intensité acoustique I à partir du niveau sonore L (dB). Préciser l'unité et la valeur de référence.",
        variables: [
            { symbol: "I", name: "Intensité acoustique", unit: "W/m²" },
            { symbol: "I_0", name: "Intensité de référence (seuil d'audition)", unit: "W/m² (1×10⁻¹² W/m²)" },
            { symbol: "L", name: "Niveau sonore", unit: "décibels (dB)" }
        ]
    },
    {
        id: 42,
        theme: "chimie",
        formula: "[H_3O^+] = 10^{-pH}",
        question: "Donner la relation permettant de calculer la concentration des ions oxonium [H3O+] à partir du pH. Préciser l'unité.",
        variables: [
            { symbol: "[H_3O^+]", name: "Concentration en ions oxonium (hydronium)", unit: "mol/L" },
            { symbol: "pH", name: "Potentiel Hydrogène", unit: "sans unité" }
        ]
    }
];


// ========================================
// 📚 QUESTIONS DE COURS GÉNÉRALES
// ========================================
const questionsCoursData = [
    {
        id: 101,
        theme: "ondes",
        question: "Quel est le domaine de fréquences audibles par l'oreille humaine ?",
        reponse: "20 Hz à 20 000 Hz (ou 20 kHz)",
        acceptedAnswers: ["20 hz à 20000 hz", "20hz à 20khz", "20 à 20000", "20 à 20 000"]
    },
    {
        id: 102,
        theme: "ondes",
        question: "Entre quelles valeurs sont les longueurs d'ondes du spectre visible ?",
        reponse: "400 nm à 800 nm (environ)",
        acceptedAnswers: ["400 nm à 800 nm", "400 à 800 nm", "380 à 780"]
    },
    {
        id: 103,
        theme: "ondes",
        question: "Le fondamental d'un signal a pour fréquence 100 Hz, quelle est la fréquence du signal ?",
        reponse: "100 Hz",
        acceptedAnswers: ["100", "100 hz", "100hz"]
    },
    {
        id: 104,
        theme: "chimie",
        question: "Donner l'équation de combustion du propane C₃H₈.",
        reponse: "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O",
        acceptedAnswers: [
            "c3h8 + 5 o2 → 3 co2 + 4 h2o",
            "c3h8 + 5o2 = 3co2 + 4h2o",
            "c3h8+5o2->3co2+4h2o"
        ]
    },
    {
        id: 105,
        theme: "chimie",
        question: "Donner la définition d'une base.",
        reponse: "Une base est une espèce chimique capable de capter un proton H⁺ (ou donner des ions OH⁻)",
        acceptedAnswers: [
            "capte un proton",
            "capte h+",
            "donne oh-",
            "accepteur de proton"
        ]
    },
    {
        id: 106,
        theme: "chimie",
        question: "Donner la définition d'un réducteur.",
        reponse: "Un réducteur est une espèce chimique capable de céder un ou plusieurs électrons",
        acceptedAnswers: [
            "cède des électrons",
            "donne des électrons",
            "perd des électrons",
            "donneur d'électrons"
        ]
    },
    {
        id: 107,
        theme: "thermique",
        question: "Comment s'appelle le passage de l'état liquide à l'état gazeux ?",
        reponse: "Vaporisation (ou ébullition si chauffage)",
        acceptedAnswers: ["vaporisation", "ébullition", "evaporation"]
    }
];

// ========================================
// 🌡️ FONCTION DE GÉNÉRATION DE CHANGEMENTS D'ÉTAT
// ========================================
function generateWaterStateQuestions(count = 8) {
    const stateChanges = [
        {
            from: "solide",
            to: "liquide",
            name: "Fusion",
            aliases: ["fusion"],
            question: (temp) => `Comment s'appelle le passage de l'état solide à l'état liquide (ex: glace → eau) ?`,
            acceptedAnswers: ["fusion", "fonte"]
        },
        {
            from: "liquide",
            to: "gaz",
            name: "Vaporisation",
            aliases: ["vaporisation", "ébullition", "évaporation"],
            question: (temp) => `Comment s'appelle le passage de l'état liquide à l'état gazeux (ex: eau → vapeur) ?`,
            acceptedAnswers: ["vaporisation", "ébullition", "evaporation", "évaporation"]
        },
        {
            from: "gaz",
            to: "liquide",
            name: "Condensation",
            aliases: ["condensation", "liquéfaction"],
            question: (temp) => `Comment s'appelle le passage de l'état gazeux à l'état liquide (ex: vapeur → eau) ?`,
            acceptedAnswers: ["condensation", "liquéfaction"]
        },
        {
            from: "liquide",
            to: "solide",
            name: "Solidification",
            aliases: ["solidification", "congélation"],
            question: (temp) => `Comment s'appelle le passage de l'état liquide à l'état solide (ex: eau → glace) ?`,
            acceptedAnswers: ["solidification", "congélation", "gel"]
        },
        {
            from: "solide",
            to: "gaz",
            name: "Sublimation",
            aliases: ["sublimation"],
            question: (temp) => `Comment s'appelle le passage direct de l'état solide à l'état gazeux sans passer par le liquide (ex: glace sèche) ?`,
            acceptedAnswers: ["sublimation"]
        },
        {
            from: "gaz",
            to: "solide",
            name: "Déposition",
            aliases: ["déposition", "desublimation"],
            question: (temp) => `Comment s'appelle le passage direct de l'état gazeux à l'état solide sans passer par le liquide (ex: formation du givre) ?`,
            acceptedAnswers: ["déposition", "desublimation"]
        }
    ];

    const questions = [];
    const usedIndices = new Set();

    for (let i = 0; i < Math.min(count, stateChanges.length); i++) {
        let stateIndex;
        do {
            stateIndex = Math.floor(Math.random() * stateChanges.length);
        } while (usedIndices.has(stateIndex) && usedIndices.size < stateChanges.length);
        usedIndices.add(stateIndex);

        const state = stateChanges[stateIndex];
        questions.push({
            id: 300 + i,
            theme: "thermique",
            question: state.question(),
            reponse: state.name,
            acceptedAnswers: state.acceptedAnswers
        });
    }

    return questions;
}

// Générer les questions de changements d'état
const waterStateQuestions = generateWaterStateQuestions(6);

// ========================================
// 🔄 FONCTION DE GÉNÉRATION DE CONVERSIONS ALÉATOIRES
// ========================================
function generateRandomConversions(count = 5) {
    const conversionRules = [
        { from: "cm", to: "m", factor: 0.01, fromName: "centimètres", toName: "mètres" },
        { from: "mm", to: "m", factor: 0.001, fromName: "millimètres", toName: "mètres" },
        { from: "g", to: "kg", factor: 0.001, fromName: "grammes", toName: "kilogrammes" },
        { from: "nm", to: "m", factor: 1e-9, fromName: "nanomètres", toName: "mètres" },
        { from: "μm", to: "m", factor: 1e-6, fromName: "micromètres", toName: "mètres" },
        { from: "km", to: "m", factor: 1000, fromName: "kilomètres", toName: "mètres" },
        { from: "mg", to: "g", factor: 0.001, fromName: "milligrammes", toName: "grammes" },
        { from: "μg", to: "g", factor: 1e-6, fromName: "microgrammes", toName: "grammes" }
    ];

    const conversions = [];
    const usedIndices = new Set();

    for (let i = 0; i < count; i++) {
        let ruleIndex;
        do {
            ruleIndex = Math.floor(Math.random() * conversionRules.length);
        } while (usedIndices.has(ruleIndex) && usedIndices.size < conversionRules.length);
        usedIndices.add(ruleIndex);

        const rule = conversionRules[ruleIndex];
        const value = Math.floor(Math.random() * 5000) + 10;
        const result = (value * rule.factor);
        
        let resultStr;
        let acceptedAnswersArr = [];
        
        if (result < 0.0001 && result > 0) {
            const exponent = Math.floor(Math.log10(result));
            const mantissa = (result / Math.pow(10, exponent)).toFixed(1);
            resultStr = `${mantissa}×10⁻${Math.abs(exponent)} ${rule.toName}`;
            acceptedAnswersArr = [
                result.toFixed(15).replace(/0+$/, ''),
                result.toString(),
                result.toExponential(1),
                mantissa + "*10^" + exponent
            ];
        } else {
            resultStr = `${result} ${rule.toName}`;
            acceptedAnswersArr = [
                result.toString(),
                result.toFixed(2),
                result.toFixed(3)
            ];
        }

        conversions.push({
            id: 200 + i,
            theme: "conversions",
            question: `Convertir ${value} ${rule.from} en ${rule.to} (vous pouvez utiliser les puissances de 10)`,
            reponse: resultStr,
            acceptedAnswers: acceptedAnswersArr
        });
    }

    return conversions;
}

// Générer les questions de conversion aléatoires lors du chargement
const randomConversions = generateRandomConversions(5);

// Combiner toutes les questions
const questionsCoursDataWithConversions = questionsCoursData.concat(waterStateQuestions).concat(randomConversions);