const formulesData = [
    // ========== ÉLECTRICITÉ ==========
    {
        id: 1,
        theme: "electricite",
        formula: "P = U \\times I \\times \\cos(\\phi)",
        question: "Donner la relation de la puissance active monophasée.",
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
        question: "Donner une relation entre puissance, énergie et temps.",
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
        question: "Donner la relation permettant de déterminer la puissance apparente.",
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
        question: "Donner la formule de la perte en ligne par effet Joule.",
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
        question: "Donner la relation du facteur de puissance.",
        variables: [
            { symbol: "k", name: "Facteur de puissance", unit: "sans unité (ou cos φ)" },
            { symbol: "P", name: "Puissance active", unit: "Watts (W)" },
            { symbol: "S", name: "Puissance apparente", unit: "Voltampères (VA)" }
        ]
    },
    {
        id: 6,
        theme: "electricite",
        formula: "Q = I \\times t",
        question: "Donner la relation pour l'autonomie ou la charge d'une batterie.",
        variables: [
            { symbol: "Q", name: "Charge électrique / Capacité", unit: "Coulombs (C) ou Ah" },
            { symbol: "I", name: "Intensité du courant", unit: "Ampères (A)" },
            { symbol: "t", name: "Temps de fonctionnement", unit: "secondes (s) ou heures (h)" }
        ]
    },
    {
        id: 7,
        theme: "electricite",
        formula: "Q_{\\text{élec}} = U \\times I \\times \\sin(\\phi)",
        question: "Donner la formule de la puissance réactive.",
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
        formula: "m = \\frac{U_2}{U_1}",
        question: "Donner le rapport de transformation d'un transformateur.",
        variables: [
            { symbol: "m", name: "Rapport de transformation", unit: "sans unité" },
            { symbol: "U_2", name: "Tension au secondaire", unit: "Volts (V)" },
            { symbol: "U_1", name: "Tension au primaire", unit: "Volts (V)" }
        ]
    },
    {
        id: 9,
        theme: "electricite",
        formula: "\\epsilon = N \\times I",
        question: "Donner la formule de la force magnétomotrice.",
        variables: [
            { symbol: "\\epsilon", name: "Force magnétomotrice", unit: "Ampères-tours (At)" },
            { symbol: "N", name: "Nombre de spires", unit: "sans unité" },
            { symbol: "I", name: "Intensité du courant", unit: "Ampères (A)" }
        ]
    },

    // ========== MÉCANIQUE ==========
    {
        id: 10,
        theme: "mecanique",
        formula: "v = \\frac{d}{\\Delta t}",
        question: "Donner la relation de la vitesse linéaire générale.",
        variables: [
            { symbol: "v", name: "Vitesse linéaire", unit: "m/s" },
            { symbol: "d", name: "Distance parcourue", unit: "mètres (m)" },
            { symbol: "\\Delta t", name: "Durée du parcours", unit: "secondes (s)" }
        ]
    },
    {
        id: 11,
        theme: "mecanique",
        formula: "P = m \\times g",
        question: "Donner une relation entre masse, poids et accélération de la pesanteur.",
        variables: [
            { symbol: "P", name: "Poids", unit: "Newtons (N)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "g", name: "Intensité de la pesanteur", unit: "N/kg ou m/s² (≈9.81)" }
        ]
    },
    {
        id: 12,
        theme: "mecanique",
        formula: "E_c = \\frac{1}{2} m \\times v^2",
        question: "Donner la relation permettant de calculer l'énergie cinétique de translation.",
        variables: [
            { symbol: "E_c", name: "Énergie cinétique", unit: "Joules (J)" },
            { symbol: "m", name: "Masse", unit: "kilogrammes (kg)" },
            { symbol: "v", name: "Vitesse linéaire", unit: "m/s" }
        ]
    },
    {
        id: 13,
        theme: "mecanique",
        formula: "\\omega = \\frac{\\theta}{\\Delta t}",
        question: "Donner la relation de la vitesse angulaire moyenne.",
        variables: [
            { symbol: "\\omega", name: "Vitesse angulaire", unit: "rad/s" },
            { symbol: "\\theta", name: "Angle de rotation", unit: "radians (rad)" },
            { symbol: "\\Delta t", name: "Durée du balayage", unit: "secondes (s)" }
        ]
    },
    {
        id: 14,
        theme: "mecanique",
        formula: "\\omega = \\frac{n \\times 2\\pi}{60}",
        question: "Comment convertir une vitesse de rotation en tr/min vers rad/s ?",
        variables: [
            { symbol: "\\omega", name: "Vitesse angulaire", unit: "rad/s" },
            { symbol: "n", name: "Vitesse de rotation", unit: "tr/min" },
            { symbol: "2\\pi", name: "Constante (un tour en radians)", unit: "rad" }
        ]
    },
    {
        id: 15,
        theme: "mecanique",
        formula: "v = R \\times \\omega",
        question: "Donner la relation entre vitesse linéaire et vitesse angulaire en périphérie.",
        variables: [
            { symbol: "v", name: "Vitesse linéaire (tangentielle)", unit: "m/s" },
            { symbol: "R", name: "Rayon de la trajectoire", unit: "mètres (m)" },
            { symbol: "\\omega", name: "Vitesse angulaire", unit: "rad/s" }
        ]
    },
    {
        id: 16,
        theme: "mecanique",
        formula: "M = F \\times d",
        question: "Donner la formule du moment d'une force (couple).",
        variables: [
            { symbol: "M", name: "Moment de la force", unit: "N·m" },
            { symbol: "F", name: "Force appliquée", unit: "Newtons (N)" },
            { symbol: "d", name: "Bras de levier", unit: "mètres (m)" }
        ]
    },
    {
        id: 17,
        theme: "mecanique",
        formula: "P_{\\text{méc}} = T \\times \\omega",
        question: "Donner la formule de la puissance mécanique de rotation.",
        variables: [
            { symbol: "P_{\\text{méc}}", name: "Puissance mécanique", unit: "Watts (W)" },
            { symbol: "T", name: "Couple / Moment", unit: "N·m" },
            { symbol: "\\omega", name: "Vitesse angulaire", unit: "rad/s" }
        ]
    },
    {
        id: 18,
        theme: "mecanique",
        formula: "\\sum \\vec{F} = m \\times \\vec{a}",
        question: "Donner le principe fondamental de la dynamique.",
        variables: [
            { symbol: "\\sum \\vec{F}", name: "Somme des forces extérieures", unit: "Newtons (N)" },
            { symbol: "m", name: "Masse du système", unit: "kilogrammes (kg)" },
            { symbol: "\\vec{a}", name: "Vecteur accélération", unit: "m/s²" }
        ]
    },
    {
        id: 19,
        theme: "mecanique",
        formula: "P = \\frac{F}{S}",
        question: "Donner une relation entre pression, force et surface.",
        variables: [
            { symbol: "P", name: "Pression", unit: "Pascals (Pa)" },
            { symbol: "F", name: "Force pressante", unit: "Newtons (N)" },
            { symbol: "S", name: "Surface de contact", unit: "m²" }
        ]
    },
    {
        id: 20,
        theme: "mecanique",
        formula: "E_{cr} = \\frac{1}{2} J \\times \\omega^2",
        question: "Donner la formule de l'énergie cinétique de rotation.",
        variables: [
            { symbol: "E_{cr}", name: "Énergie cinétique de rotation", unit: "Joules (J)" },
            { symbol: "J", name: "Moment d'inertie", unit: "kg·m²" },
            { symbol: "\\omega", name: "Vitesse angulaire", unit: "rad/s" }
        ]
    },

    // ========== MÉCANIQUE DES FLUIDES ==========
    {
        id: 21,
        theme: "fluides",
        formula: "Q_v = S \\times v",
        question: "Donner la relation du débit volumique d'un fluide.",
        variables: [
            { symbol: "Q_v", name: "Débit volumique", unit: "m³/s" },
            { symbol: "S", name: "Surface de la section", unit: "m²" },
            { symbol: "v", name: "Vitesse moyenne du fluide", unit: "m/s" }
        ]
    },
    {
        id: 22,
        theme: "fluides",
        formula: "\\Delta P = \\rho \\times g \\times h",
        question: "Donner le principe fondamental de l'hydrostatique.",
        variables: [
            { symbol: "\\Delta P", name: "Différence de pression", unit: "Pascals (Pa)" },
            { symbol: "\\rho", name: "Masse volumique du fluide", unit: "kg/m³" },
            { symbol: "g", name: "Intensité de la pesanteur", unit: "m/s²" },
            { symbol: "h", name: "Différence de hauteur", unit: "mètres (m)" }
        ]
    },
    {
        id: 23,
        theme: "fluides",
        formula: "S_1 \\times v_1 = S_2 \\times v_2",
        question: "Donner la relation de continuité (conservation du débit).",
        variables: [
            { symbol: "S_1", name: "Surface au point 1", unit: "m²" },
            { symbol: "v_1", name: "Vitesse au point 1", unit: "m/s" },
            { symbol: "S_2", name: "Surface au point 2", unit: "m²" },
            { symbol: "v_2", name: "Vitesse au point 2", unit: "m/s" }
        ]
    },
    {
        id: 24,
        theme: "fluides",
        formula: "P_{\\text{hyd}} = \\Delta P \\times Q_v",
        question: "Donner la formule de la puissance hydraulique.",
        variables: [
            { symbol: "P_{\\text{hyd}}", name: "Puissance hydraulique", unit: "Watts (W)" },
            { symbol: "\\Delta P", name: "Variation de pression", unit: "Pascals (Pa)" },
            { symbol: "Q_v", name: "Débit volumique", unit: "m³/s" }
        ]
    },
    {
        id: 25,
        theme: "fluides",
        formula: "\\frac{1}{2}\\rho v^2 + \\rho g z + P = \\text{cste}",
        question: "Donner l'équation de Bernoulli pour un fluide parfait.",
        variables: [
            { symbol: "\\rho", name: "Masse volumique", unit: "kg/m³" },
            { symbol: "v", name: "Vitesse du fluide", unit: "m/s" },
            { symbol: "g", name: "Pesanteur", unit: "m/s²" },
            { symbol: "z", name: "Altitude", unit: "mètres (m)" },
            { symbol: "P", name: "Pression statique", unit: "Pascals (Pa)" }
        ]
    },
    {
        id: 26,
        theme: "fluides",
        formula: "\\Delta P_r = \\Lambda \\times \\frac{L}{D} \\times \\frac{\\rho v^2}{2}",
        question: "Donner la formule des pertes de charge régulières (Darcy-Weisbach).",
        variables: [
            { symbol: "\\Delta P_r", name: "Perte de charge", unit: "Pascals (Pa)" },
            { symbol: "\\Lambda", name: "Coefficient de perte de charge", unit: "sans unité" },
            { symbol: "L", name: "Longueur de la conduite", unit: "mètres (m)" },
            { symbol: "D", name: "Diamètre de la conduite", unit: "mètres (m)" },
            { symbol: "\\rho", name: "Masse volumique", unit: "kg/m³" },
            { symbol: "v", name: "Vitesse d'écoulement", unit: "m/s" }
        ]
    },

    // ========== THERMIQUE ==========
    {
        id: 27,
        theme: "thermique",
        formula: "\\Phi = \\frac{\\Delta T}{R_{\\text{th}}}",
        question: "Donner la formule du flux thermique.",
        variables: [
            { symbol: "\\Phi", name: "Flux thermique", unit: "Watts (W)" },
            { symbol: "\\Delta T", name: "Différence de température", unit: "K ou °C" },
            { symbol: "R_{\\text{th}}", name: "Résistance thermique totale", unit: "K/W ou °C/W" }
        ]
    },
    {
        id: 28,
        theme: "thermique",
        formula: "R_{\\text{th}} = \\frac{e}{\\lambda \\times S}",
        question: "Donner la relation de la résistance thermique d'une paroi.",
        variables: [
            { symbol: "R_{\\text{th}}", name: "Résistance thermique", unit: "K/W" },
            { symbol: "e", name: "Épaisseur de la paroi", unit: "mètres (m)" },
            { symbol: "\\lambda", name: "Conductivité thermique", unit: "W/(m·K)" },
            { symbol: "S", name: "Surface de la paroi", unit: "m²" }
        ]
    },
    {
        id: 29,
        theme: "thermique",
        formula: "Q = m \\times c \\times (\\theta_f - \\theta_i)",
        question: "Je veux connaître l'énergie nécessaire pour faire passer un objet d'une température initiale à une température finale. Quelle relation j'utilise ?",
        variables: [
            { symbol: "Q", name: "Quantité de chaleur", unit: "Joules (J)" },
            { symbol: "m", name: "Masse du corps", unit: "kilogrammes (kg)" },
            { symbol: "c", name: "Capacité thermique massique", unit: "J/(kg·K)" },
            { symbol: "\\theta_f - \\theta_i", name: "Variation de température", unit: "K ou °C" }
        ]
    },
    {
        id: 30,
        theme: "thermique",
        formula: "Q = m \\times L",
        question: "Donner une relation entre énergie, énergie massique de changements d'état et masse.",
        variables: [
            { symbol: "Q", name: "Quantité de chaleur", unit: "Joules (J)" },
            { symbol: "m", name: "Masse changeant d'état", unit: "kilogrammes (kg)" },
            { symbol: "L", name: "Chaleur latente massique", unit: "J/kg" }
        ]
    },

    // ========== PHYSIQUE NUCLÉAIRE ==========
    {
        id: 31,
        theme: "nucleaire",
        formula: "\\lambda = \\frac{\\ln(2)}{T_{1/2}}",
        question: "Donner la relation entre constante radioactive et demi-vie.",
        variables: [
            { symbol: "\\lambda", name: "Constante radioactive", unit: "s⁻¹ (ou an⁻¹)" },
            { symbol: "T_{1/2}", name: "Demi-vie", unit: "secondes (s) ou années" }
        ]
    },
    {
        id: 32,
        theme: "nucleaire",
        formula: "A = \\lambda \\times N",
        question: "Donner la relation entre l'activité et le nombre de noyaux.",
        variables: [
            { symbol: "A", name: "Activité", unit: "Becquerels (Bq)" },
            { symbol: "\\lambda", name: "Constante radioactive", unit: "s⁻¹" },
            { symbol: "N", name: "Nombre de noyaux radioactifs", unit: "sans unité" }
        ]
    },
    {
        id: 33,
        theme: "nucleaire",
        formula: "E = \\Delta m \\times c^2",
        question: "Donner l'équivalence masse-énergie d'Einstein.",
        variables: [
            { symbol: "E", name: "Énergie libérée", unit: "Joules (J)" },
            { symbol: "\\Delta m", name: "Défaut de masse", unit: "kilogrammes (kg)" },
            { symbol: "c", name: "Célérité de la lumière", unit: "m/s (≈3×10⁸)" }
        ]
    },
    {
        id: 34,
        theme: "nucleaire",
        formula: "N(t) = N_0 \\times e^{-\\lambda \\times t}",
        question: "Donner la loi de décroissance radioactive.",
        variables: [
            { symbol: "N(t)", name: "Nombre de noyaux à l'instant t", unit: "sans unité" },
            { symbol: "N_0", name: "Nombre de noyaux initiaux", unit: "sans unité" },
            { symbol: "\\lambda", name: "Constante radioactive", unit: "inverse du temps" },
            { symbol: "t", name: "Temps écoulé", unit: "s, h, jours ou ans" }
        ]
    },

    // ========== ONDES & ACOUSTIQUE ==========
    {
        id: 35,
        theme: "ondes",
        formula: "f = \\frac{1}{T}",
        question: "Donner la relation de la fréquence d'une onde.",
        variables: [
            { symbol: "f", name: "Fréquence", unit: "Hertz (Hz)" },
            { symbol: "T", name: "Période de l'onde", unit: "secondes (s)" }
        ]
    },
    {
        id: 36,
        theme: "ondes",
        formula: "\\lambda = c \\times T",
        question: "Donner une relation entre longueur d'onde, célérité et période.",
        variables: [
            { symbol: "\\lambda", name: "Longueur d'onde", unit: "mètres (m)" },
            { symbol: "c", name: "Célérité de l'onde", unit: "m/s" },
            { symbol: "T", name: "Période de l'onde", unit: "secondes (s)" }
        ]
    },
    {
        id: 37,
        theme: "ondes",
        formula: "N = 10 \\log\\left(\\frac{I}{I_0}\\right)",
        question: "Donner la relation permettant de calculer le niveau sonore en dB.",
        variables: [
            { symbol: "N", name: "Niveau sonore", unit: "Décibels (dB)" },
            { symbol: "I", name: "Intensité acoustique reçue", unit: "W/m²" },
            { symbol: "I_0", name: "Intensité de référence", unit: "W/m² (10⁻¹²)" }
        ]
    },
    {
        id: 38,
        theme: "ondes",
        formula: "I = \\frac{P}{S}",
        question: "Donner une relation entre intensité acoustique, puissance et surface.",
        variables: [
            { symbol: "I", name: "Intensité acoustique", unit: "W/m²" },
            { symbol: "P", name: "Puissance acoustique", unit: "Watts (W)" },
            { symbol: "S", name: "Surface de propagation", unit: "m²" }
        ]
    },

    // ========== CHIMIE ==========
    {
        id: 39,
        theme: "chimie",
        formula: "\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]",
        question: "Donner la formule du calcul du pH.",
        variables: [
            { symbol: "\\text{pH}", name: "Potentiel Hydrogène", unit: "sans unité (0-14)" },
            { symbol: "[\\text{H}_3\\text{O}^+]", name: "Concentration en ions oxonium", unit: "mol/L" }
        ]
    },
    {
        id: 40,
        theme: "chimie",
        formula: "n = \\frac{m}{M}",
        question: "Donner une relation entre masse, masse molaire et quantité de matière.",
        variables: [
            { symbol: "n", name: "Quantité de matière", unit: "moles (mol)" },
            { symbol: "m", name: "Masse de l'échantillon", unit: "grammes (g)" },
            { symbol: "M", name: "Masse molaire", unit: "g/mol" }
        ]
    },

    // ========== ÉNERGIE & RENDEMENT ==========
    {
        id: 41,
        theme: "energie",
        formula: "\\eta = \\frac{P_u}{P_a}",
        question: "Donner la formule du rendement d'un système.",
        variables: [
            { symbol: "\\eta", name: "Rendement", unit: "sans unité (ou %)" },
            { symbol: "P_u", name: "Puissance utile", unit: "Watts (W)" },
            { symbol: "P_a", name: "Puissance absorbée", unit: "Watts (W)" }
        ]
    },
    {
        id: 42,
        theme: "energie",
        formula: "E_m = E_c + E_p",
        question: "Donner la formule de l'énergie mécanique totale.",
        variables: [
            { symbol: "E_m", name: "Énergie mécanique totale", unit: "Joules (J)" },
            { symbol: "E_c", name: "Énergie cinétique", unit: "Joules (J)" },
            { symbol: "E_p", name: "Énergie potentielle", unit: "Joules (J)" }
        ]
    }
];