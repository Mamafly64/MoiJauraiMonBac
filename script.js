// Variables globales
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let quizMode = 'full';
let totalQuestions = 0;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page chargée, initialisation...');
    console.log('Nombre de formules:', formulesData.length);
    
    initTooltipSystem();
    initTabs();
    renderFormulas('all');
    initQuiz();

    // FIX : filtre thème dans DOMContentLoaded
    const themeFilter = document.getElementById('theme-filter');
    if (themeFilter) {
        themeFilter.addEventListener('change', function() {
            renderFormulas(this.value);
        });
    }
});

// Gestion des onglets
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            console.log('Changement onglet:', targetTab);
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            setTimeout(() => {
                if (window.MathJax) {
                    MathJax.typesetPromise();
                }
            }, 100);
        });
    });
}

// Affichage des formules
function renderFormulas(filter) {
    console.log('Render formulas, filtre:', filter);
    const container = document.getElementById('formules-list');
    
    if (!container) {
        console.error('Container formules-list introuvable');
        return;
    }
    
    container.innerHTML = '';
    
    const filteredFormulas = filter === 'all' 
        ? formulesData 
        : formulesData.filter(f => f.theme === filter);
    
    console.log('Formules filtrées:', filteredFormulas.length);
    
    filteredFormulas.forEach(formula => {
        const card = createFormulaCard(formula);
        container.appendChild(card);
    });
    
    setTimeout(() => {
        if (window.MathJax) {
            MathJax.typesetPromise().then(function() {
                refreshTooltips();
            });
        }
    }, 100);
}

function createFormulaCard(formula) {
    const card = document.createElement('div');
    card.className = 'formula-card';
    card.dataset.formulaId = formula.id;
    
    const themeNames = {
        'mecanique': 'Mécanique',
        'energie': 'Énergie',
        'thermique': 'Thermique',
        'ondes': 'Ondes & Acoustique',
        'electricite': 'Électricité',
        'chimie': 'Chimie',
        'fluides': 'Fluides',
        'nucleaire': 'Nucléaire'
    };
    
    const header = document.createElement('div');
    header.className = 'formula-header';
    header.innerHTML = `
        <div class="formula-main">
            $$${formula.formula}$$
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="theme-badge">${themeNames[formula.theme]}</span>
            <span class="toggle-icon">▼</span>
        </div>
    `;
    
    const details = document.createElement('div');
    details.className = 'formula-details';
    
    formula.variables.forEach(variable => {
        const varInfo = document.createElement('div');
        varInfo.className = 'variable-info';
        varInfo.innerHTML = `<strong>$${variable.symbol}$</strong> : ${variable.name} - ${variable.unit}`;
        details.appendChild(varInfo);
    });
    
    header.addEventListener('click', function() {
        details.classList.toggle('open');
        header.querySelector('.toggle-icon').classList.toggle('open');
        setTimeout(() => {
            if (window.MathJax) {
                MathJax.typesetPromise();
            }
        }, 100);
    });
    
    card.appendChild(header);
    card.appendChild(details);
    
    return card;
}

// Filtre de thème (déplacé dans DOMContentLoaded)

// QUIZ
function initQuiz() {
    const startBtn = document.getElementById('start-quiz');
    const validateBtn = document.getElementById('validate-answer');
    const nextBtn = document.getElementById('next-question');
    const skipBtn = document.getElementById('skip-question');
    const quitBtn = document.getElementById('quit-quiz');
    const restartBtn = document.getElementById('restart-quiz');
    const formulaInput = document.getElementById('formula-input');
    
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
    if (validateBtn) {
        validateBtn.addEventListener('click', validateAnswer);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
    if (skipBtn) {
        skipBtn.addEventListener('click', skipQuestion);
    }
    if (quitBtn) {
        quitBtn.addEventListener('click', quitQuiz);
    }
    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }
    if (formulaInput) {
        formulaInput.addEventListener('input', handleFormulaInput);
    }
}

function startQuiz() {
    console.log('Démarrage quiz');
    
    const selectedThemes = Array.from(document.querySelectorAll('.theme-checkbox:checked'))
        .map(cb => cb.value);
    
    console.log('Thèmes sélectionnés:', selectedThemes);
    
    if (selectedThemes.length === 0) {
        alert('Veuillez sélectionner au moins un thème !');
        return;
    }
    
    let availableQuestions = formulesData.filter(f => selectedThemes.includes(f.theme));
    
    console.log('Questions disponibles:', availableQuestions.length);
    
    if (availableQuestions.length === 0) {
        alert('Aucune formule disponible pour les thèmes sélectionnés.');
        return;
    }
    
    // Mélanger les questions
    availableQuestions = shuffleArray(availableQuestions);
    
    // Sélectionner le nombre de questions
    const quizCount = document.getElementById('quiz-count').value;
    if (quizCount === 'all') {
        currentQuestions = availableQuestions;
    } else {
        const count = parseInt(quizCount);
        currentQuestions = availableQuestions.slice(0, Math.min(count, availableQuestions.length));
    }
    
    totalQuestions = currentQuestions.length;
    quizMode = document.getElementById('quiz-mode').value;
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById('quiz-config').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    
    loadQuestion();
}

function loadQuestion() {
    console.log('Chargement question', currentQuestionIndex);
    
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
        return;
    }
    
    const question = currentQuestions[currentQuestionIndex];
    
    document.getElementById('question-counter').textContent = 
        `Question ${currentQuestionIndex + 1} / ${totalQuestions}`;
    
    document.getElementById('question-text').textContent = question.question;
    
    document.getElementById('formula-input').value = '';
    document.getElementById('units-table').innerHTML = '';
    document.getElementById('units-table').style.display = 'none';
    
    const feedback = document.getElementById('feedback');
    feedback.className = '';
    feedback.removeAttribute('style');
    feedback.innerHTML = '';
    
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('validate-answer').style.display = 'inline-block';
    document.getElementById('skip-question').style.display = 'inline-block';
    
    if (quizMode === 'units') {
        document.getElementById('formula-input-section').style.display = 'none';
        displayUnitsTable(question, true);
    } else if (quizMode === 'full') {
        document.getElementById('formula-input-section').style.display = 'block';
        // Afficher le tableau des variables de la question pour que
        // l'utilisateur puisse remplir descriptions et unités
        displayUnitsTable(question, false);
    } else {
        document.getElementById('formula-input-section').style.display = 'block';
        document.getElementById('units-table').style.display = 'none';
    }
    
    setTimeout(() => {
        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    }, 100);
}

function handleFormulaInput(e) {
    if (quizMode === 'units') return;
    // En mode full, le tableau des unités est affiché depuis les variables
    // de la question courante, pas depuis la saisie utilisateur
    // → rien à faire ici, le tableau est déjà affiché dans loadQuestion
}

function extractVariables(formula) {
    const matches = formula.match(/[a-zA-Z_]+[a-zA-Z0-9_]*/g);
    
    if (!matches) return [];
    
    const variables = [...new Set(matches)].filter(v => 
        !['log', 'ln', 'sin', 'cos', 'tan', 'sqrt', 'pi', 'Delta'].includes(v)
    );
    
    return variables;
}

function displayUnitsTable(question, showFormula, customVariables = null) {
    const unitsTableDiv = document.getElementById('units-table');
    unitsTableDiv.style.display = 'block';
    
    let html = '';
    
    if (showFormula && question) {
        html += `<div style="margin-bottom: 1rem; font-size: 1.2rem;">
            Formule : $$${question.formula}$$
        </div>`;
    }
    
    html += `
        <table class="units-input-table">
            <thead>
                <tr>
                    <th>Variable</th>
                    <th>Description</th>
                    <th>Unité</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    const variables = customVariables || question.variables.map(v => v.symbol.replace(/\\/g, ''));
    
    variables.forEach(varSymbol => {
        html += `
            <tr>
                <td><strong>${varSymbol}</strong></td>
                <td><input type="text" class="var-desc" data-var="${varSymbol}" placeholder="Description"></td>
                <td><input type="text" class="var-unit" data-var="${varSymbol}" placeholder="Unité"></td>
            </tr>
        `;
    });
    
    html += `</tbody></table>`;
    
    unitsTableDiv.innerHTML = html;
    
    setTimeout(() => {
        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    }, 100);
}

function buildVariablesHTML(question) {
    let html = '<strong>Variables :</strong><br>';
    html += '<table style="width:100%;border-collapse:collapse;margin-top:0.5rem;">';
    html += '<tr style="background:rgba(108,99,255,0.15);">';
    html += '<th style="padding:0.4rem 0.6rem;text-align:left;border:1px solid #2d2d44;">Symbole</th>';
    html += '<th style="padding:0.4rem 0.6rem;text-align:left;border:1px solid #2d2d44;">Description</th>';
    html += '<th style="padding:0.4rem 0.6rem;text-align:left;border:1px solid #2d2d44;">Unité</th>';
    html += '</tr>';
    question.variables.forEach(v => {
        html += '<tr>';
        html += `<td style="padding:0.4rem 0.6rem;border:1px solid #2d2d44;"><strong>$${v.symbol}$</strong></td>`;
        html += `<td style="padding:0.4rem 0.6rem;border:1px solid #2d2d44;">${v.name}</td>`;
        html += `<td style="padding:0.4rem 0.6rem;border:1px solid #2d2d44;">${v.unit}</td>`;
        html += '</tr>';
    });
    html += '</table>';
    return html;
}

function validateAnswer() {
    console.log('Validation réponse');

    const question = currentQuestions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');

    let formulaCorrect = true;
    let unitsCorrect = true;
    let feedbackHTML = '';

    if (quizMode === 'formula' || quizMode === 'full') {
        const userFormula = document.getElementById('formula-input').value.trim();
        formulaCorrect = checkFormula(userFormula, question.formula);
    }

    if (quizMode === 'units' || quizMode === 'full') {
        unitsCorrect = checkUnits(question);
    }

    const isCorrect = formulaCorrect && unitsCorrect;

    if (isCorrect) {
        score++;
        feedback.className = 'correct show';
        feedbackHTML = '<strong>✓ Correct ! Bravo !</strong><br><br>';
    } else {
        feedback.className = 'incorrect show';
        feedbackHTML = '<strong>✗ Incorrect.</strong><br><br>';
        if (!formulaCorrect) {
            feedbackHTML += `<strong>La bonne formule :</strong><br>$$${question.formula}$$<br><br>`;
        }
        if (!unitsCorrect) {
            feedbackHTML += '<strong>Certaines descriptions ou unités étaient vides ou incorrectes.</strong><br><br>';
        }
    }

    // Toujours afficher la correction complète
    feedbackHTML += '<strong>📋 Correction complète :</strong><br><br>';
    feedbackHTML += `<strong>Formule :</strong> $$${question.formula}$$<br><br>`;
    feedbackHTML += buildVariablesHTML(question);

    feedback.innerHTML = feedbackHTML;

    document.getElementById('validate-answer').style.display = 'none';
    document.getElementById('skip-question').style.display = 'none';
    document.getElementById('next-question').style.display = 'inline-block';

    setTimeout(() => {
        if (window.MathJax) {
            MathJax.typesetPromise([feedback]);
        }
    }, 150);
}

function skipQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');

    // FIX : skip = mauvaise réponse, on ne touche pas au score
    feedback.className = 'incorrect show';
    let feedbackHTML = `<strong>❌ Question passée — 0 point</strong><br><br>`;
    feedbackHTML += `<strong>La bonne formule :</strong><br>$$${question.formula}$$<br><br>`;
    feedbackHTML += buildVariablesHTML(question);

    feedback.innerHTML = feedbackHTML;

    document.getElementById('validate-answer').style.display = 'none';
    document.getElementById('skip-question').style.display = 'none';
    document.getElementById('next-question').style.display = 'inline-block';

    setTimeout(() => {
        if (window.MathJax) {
            MathJax.typesetPromise([feedback]);
        }
    }, 100);
}

function checkFormula(userFormula, correctFormula) {
    const normalize = (f) => {
        return f.toLowerCase()
            // Supprimer les commandes LaTeX structurelles
            .replace(/\\frac\s*\{([^}]*)\}\s*\{([^}]*)\}/g, '($1)/($2)')
            .replace(/\\times/g, '*')
            .replace(/\\cdot/g, '*')
            .replace(/\\sqrt\s*\{([^}]*)\}/g, 'sqrt($1)')
            .replace(/\\left/g, '')
            .replace(/\\right/g, '')
            .replace(/\\/g, '')
            .replace(/[\{\}]/g, '')
            // Normaliser opérateurs
            .replace(/\s+/g, '')
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            // Supprimer les multiplications explicites pour comparaison
            .replace(/\*/g, '')
            // Supprimer underscores et chiffres d'indice
            .replace(/_/g, '')
            .replace(/\^/g, '^');
    };

    const normalizedUser = normalize(userFormula);
    const normalizedCorrect = normalize(correctFormula);

    console.log('User normalisé:', normalizedUser);
    console.log('Correct normalisé:', normalizedCorrect);

    if (normalizedUser === normalizedCorrect) return true;

    // Tolérance : vérifier les membres de l'équation indépendamment
    const splitEquation = (f) => f.split('=').map(s => s.trim());
    const userParts = splitEquation(normalizedUser);
    const correctParts = splitEquation(normalizedCorrect);

    if (userParts.length === 2 && correctParts.length === 2) {
        // Accepter si les deux membres correspondent (même ordre ou inversé)
        return (userParts[0] === correctParts[0] && userParts[1] === correctParts[1]) ||
               (userParts[0] === correctParts[1] && userParts[1] === correctParts[0]);
    }

    return false;
}

function checkUnits(question) {
    // Vérifie que tous les champs sont remplis (non vides)
    // La vraie correction est affichée dans le feedback de toute façon
    const descInputs = document.querySelectorAll('.var-desc');
    const unitInputs = document.querySelectorAll('.var-unit');

    if (descInputs.length === 0 && unitInputs.length === 0) {
        // Aucun tableau affiché → on ne pénalise pas
        return true;
    }

    let allFilled = true;

    descInputs.forEach((input) => {
        if (input.value.trim().length === 0) allFilled = false;
    });

    unitInputs.forEach((input) => {
        if (input.value.trim().length === 0) allFilled = false;
    });

    return allFilled;
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    document.querySelector('.quiz-header').style.display = 'none';
    document.querySelector('.question-card').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let message = '';
    if (percentage >= 90) {
        message = 'Excellent ! Tu maîtrises parfaitement !';
    } else if (percentage >= 70) {
        message = 'Très bien ! Continue comme ça !';
    } else if (percentage >= 50) {
        message = 'Pas mal ! Il faut encore réviser un peu.';
    } else {
        message = 'Il faut réviser davantage !';
    }
    
    document.getElementById('score-text').innerHTML = `
        Score : ${score} / ${totalQuestions} (${percentage}%)<br><br>
        ${message}
    `;
}

function quitQuiz() {
    if (confirm('Voulez-vous vraiment quitter le quiz ?')) {
        resetQuiz();
    }
}

function restartQuiz() {
    resetQuiz();
}

function resetQuiz() {
    document.getElementById('quiz-config').style.display = 'block';
    document.getElementById('quiz-area').style.display = 'none';
    document.querySelector('.quiz-header').style.display = 'flex';
    document.querySelector('.question-card').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';

    // FIX : nettoyer le feedback complètement
    const feedback = document.getElementById('feedback');
    feedback.className = '';
    feedback.removeAttribute('style');
    feedback.innerHTML = '';

    // FIX : nettoyer le tableau des unités
    const unitsTable = document.getElementById('units-table');
    unitsTable.innerHTML = '';
    unitsTable.style.display = 'none';

    document.getElementById('formula-input').value = '';

    currentQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    totalQuestions = 0;
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
// ==============================================================
// SYSTÈME TOOLTIP SVG SUR LES FORMULES
// ==============================================================

function initTooltipSystem() {
    if (document.getElementById('formula-tooltip')) return;
    var tip = document.createElement('div');
    tip.id = 'formula-tooltip';
    tip.style.cssText = 'position:fixed;background:#1a1a2e;border:1px solid #6c63ff;color:#e4e4e7;padding:0.6rem 1rem;border-radius:8px;font-size:0.85rem;pointer-events:none;z-index:99999;opacity:0;transition:opacity 0.15s ease;max-width:260px;box-shadow:0 4px 15px rgba(0,0,0,0.5);line-height:1.5;';
    document.body.appendChild(tip);
}

// Table de correspondance data-c (hex) -> caractère lisible
var DATA_C_MAP = {
    // Lettres italiques majuscules (Mathematical Italic)
    '1D434': 'A', '1D435': 'B', '1D436': 'C', '1D437': 'D',
    '1D438': 'E', '1D439': 'F', '1D43A': 'G', '1D43B': 'H',
    '1D43C': 'I', '1D43D': 'J', '1D43E': 'K', '1D43F': 'L',
    '1D440': 'M', '1D441': 'N', '1D442': 'O', '1D443': 'P',
    '1D444': 'Q', '1D445': 'R', '1D446': 'S', '1D447': 'T',
    '1D448': 'U', '1D449': 'V', '1D44A': 'W', '1D44B': 'X',
    '1D44C': 'Y', '1D44D': 'Z',
    // Lettres italiques minuscules
    '1D44E': 'a', '1D44F': 'b', '1D450': 'c', '1D451': 'd',
    '1D452': 'e', '1D453': 'f', '1D454': 'g', '210E': 'h',
    '1D456': 'i', '1D457': 'j', '1D458': 'k', '1D459': 'l',
    '1D45A': 'm', '1D45B': 'n', '1D45C': 'o', '1D45D': 'p',
    '1D45E': 'q', '1D45F': 'r', '1D460': 's', '1D461': 't',
    '1D462': 'u', '1D463': 'v', '1D464': 'w', '1D465': 'x',
    '1D466': 'y', '1D467': 'z',
    // Lettres normales (pour \text)
    '41': 'A', '42': 'B', '43': 'C', '44': 'D', '45': 'E',
    '46': 'F', '47': 'G', '48': 'H', '49': 'I', '4A': 'J',
    '4B': 'K', '4C': 'L', '4D': 'M', '4E': 'N', '4F': 'O',
    '50': 'P', '51': 'Q', '52': 'R', '53': 'S', '54': 'T',
    '55': 'U', '56': 'V', '57': 'W', '58': 'X', '59': 'Y', '5A': 'Z',
    '61': 'a', '62': 'b', '63': 'c', '64': 'd', '65': 'e',
    '66': 'f', '67': 'g', '68': 'h', '69': 'i', '6A': 'j',
    '6B': 'k', '6C': 'l', '6D': 'm', '6E': 'n', '6F': 'o',
    '70': 'p', '71': 'q', '72': 'r', '73': 's', '74': 't',
    '75': 'u', '76': 'v', '77': 'w', '78': 'x', '79': 'y', '7A': 'z',
    // Chiffres
    '30': '0', '31': '1', '32': '2', '33': '3', '34': '4',
    '35': '5', '36': '6', '37': '7', '38': '8', '39': '9',
    // Grecs
    '1D6FC': 'alpha', '1D6FD': 'beta', '1D6FE': 'gamma', '1D6FF': 'delta',
    '1D700': 'epsilon', '1D701': 'zeta', '1D702': 'eta', '1D703': 'theta',
    '1D704': 'iota', '1D705': 'kappa', '1D706': 'lambda', '1D707': 'mu',
    '1D708': 'nu', '1D709': 'xi', '1D70B': 'pi', '1D70C': 'rho',
    '1D70E': 'sigma', '1D70F': 'tau', '1D710': 'upsilon', '1D719': 'phi',
    '1D711': 'phi2', '1D712': 'chi', '1D713': 'psi', '1D714': 'omega',
    '1D6E5': 'Delta', '1D6F7': 'Phi', '1D6F9': 'Psi', '1D6FA': 'Omega',
    '1D6E9': 'Theta', '1D6EC': 'Lambda', '1D6F4': 'Sigma', '1D6E4': 'Gamma',
    '3B5': 'epsilon', '3B8': 'theta', '3BB': 'lambda', '3C1': 'rho',
    '3C6': 'phi', '3C9': 'omega', '394': 'Delta', '3A6': 'Phi',
    '3A9': 'Omega', '3A3': 'Sigma', '3A0': 'Pi', '39B': 'Lambda',
    // Opérateurs
    '3D': '=', 'D7': 'times', '2B': '+', '2212': '-',
    '28': '(', '29': ')', '2061': 'apply',
    // Sigma somme
    '2211': 'sum'
};

function refreshTooltips() {
    var cards = document.querySelectorAll('.formula-card');
    cards.forEach(function(card) {
        var fid = parseInt(card.dataset.formulaId);
        var fdata = null;
        for (var i = 0; i < formulesData.length; i++) {
            if (formulesData[i].id === fid) { fdata = formulesData[i]; break; }
        }
        if (!fdata) return;

        var main = card.querySelector('.formula-main');
        if (!main) return;

        var svg = main.querySelector('svg');
        if (!svg) return;

        // Agrandir le viewBox du SVG et autoriser l'overflow pour les hitbox
        svg.style.overflow = 'visible';
        var container = main.querySelector('mjx-container');
        if (container) container.style.overflow = 'visible';

        // Construire le mapping pour cette formule
        var vmap = buildVarMapSVG(fdata);

        // Trouver les groupes <g data-mml-node="mi"> = variables
        // et <g data-mml-node="msub"> = variables avec indice
        // et <g data-mml-node="mover"> = Delta x, vec x
        var groups = svg.querySelectorAll('g[data-mml-node]');

        groups.forEach(function(g) {
            var nodeType = g.getAttribute('data-mml-node');

            // On ne s'intéresse qu'aux mi, msub, msup, msubsup, mover, mrow contenant des variables
            if (['mi', 'msub', 'msup', 'msubsup', 'mover'].indexOf(nodeType) === -1) return;

            // Extraire le texte de ce groupe via les data-c des <use>
            var gText = extractTextFromG(g);
            if (!gText) return;

            // Chercher un match
            var matched = matchVarSVG(gText, nodeType, g, vmap);
            if (!matched) return;

            // Vérifier qu'on n'a pas déjà attaché le tooltip
            if (g.getAttribute('data-tip-attached')) return;
            g.setAttribute('data-tip-attached', '1');

            g.style.cursor = 'help';

            // Ajouter un rectangle invisible pour agrandir la hitbox
            try {
                var bbox = g.getBBox();
                var pad = 8;
                var hitRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                hitRect.setAttribute('x', bbox.x - pad);
                hitRect.setAttribute('y', bbox.y - pad);
                hitRect.setAttribute('width', bbox.width + pad * 2);
                hitRect.setAttribute('height', bbox.height + pad * 2);
                hitRect.setAttribute('fill', 'transparent');
                hitRect.setAttribute('stroke', 'none');
                hitRect.style.pointerEvents = 'all';
                hitRect.style.cursor = 'help';
                g.insertBefore(hitRect, g.firstChild);
            } catch(e) {}

            var matchedVar = matched;
            g.addEventListener('mouseenter', function(e) {
                showTip(e, matchedVar);
            });
            g.addEventListener('mousemove', function(e) {
                moveTip(e);
            });
            g.addEventListener('mouseleave', function() {
                hideTip();
            });
        });
    });
}

function extractTextFromG(g) {
    var uses = g.querySelectorAll('use');
    var parts = [];
    uses.forEach(function(u) {
        var dc = u.getAttribute('data-c');
        if (dc && DATA_C_MAP[dc]) {
            parts.push(DATA_C_MAP[dc]);
        }
    });
    return parts.join('');
}

function buildVarMapSVG(fdata) {
    var map = {};
    // Pour chaque variable, on crée des clés de matching
    fdata.variables.forEach(function(v) {
        var sym = v.symbol;

        // 1. Lettre simple : "P", "m", "v", etc.
        if (sym.match(/^[A-Za-z]$/)) {
            map[sym] = v;
            return;
        }

        // 2. Indice simple : "P_j", "E_c", "U_1", "Q_v", etc.
        var subMatch = sym.match(/^([A-Za-z])_\{?([^}\\]*)\}?$/);
        if (subMatch) {
            map['sub:' + subMatch[1] + subMatch[2]] = v;
            return;
        }

        // 3. Indice avec \text : "P_{\text{méc}}", "Q_{\text{élec}}", etc.
        var textSubMatch = sym.match(/^([A-Za-z])_\{\\text\{([^}]*)\}\}$/);
        if (textSubMatch) {
            map['sub:' + textSubMatch[1] + textSubMatch[2]] = v;
            return;
        }

        // 4. Indice composé : "R_{\text{th}}", "P_{\text{hyd}}"
        // déjà couvert par #3

        // 5. Lettre grecque seule : "\omega", "\theta", "\rho", etc.
        var greekMatch = sym.match(/^\\([a-zA-Z]+)$/);
        if (greekMatch) {
            map['greek:' + greekMatch[1]] = v;
            return;
        }

        // 6. Delta + lettre : "\Delta t", "\Delta P", "\Delta m"
        var deltaMatch = sym.match(/^\\Delta\s+([A-Za-z])$/);
        if (deltaMatch) {
            map['delta:' + deltaMatch[1]] = v;
            return;
        }

        // 7. Fonctions trig : "\cos(\phi)", "\sin(\phi)"
        var trigMatch = sym.match(/^\\(cos|sin|tan|log|ln)/);
        if (trigMatch) {
            map['func:' + sym] = v;
            return;
        }

        // 8. Vec : "\vec{F}", "\vec{a}"
        var vecMatch = sym.match(/^\\vec\{([A-Za-z])\}$/);
        if (vecMatch) {
            map['vec:' + vecMatch[1]] = v;
            return;
        }

        // 9. Sum vec : "\sum \vec{F}"
        if (sym.indexOf('\\sum') !== -1) {
            map['sum:' + sym] = v;
            return;
        }

        // 10. Complexe : stocker tel quel
        map['raw:' + sym] = v;
    });

    return map;
}

function matchVarSVG(gText, nodeType, gEl, vmap) {
    // Match direct par lettre simple
    if (gText.length === 1 && vmap[gText]) {
        return vmap[gText];
    }

    // Match par indice : nodeType=msub -> parent contient base + indice
    if (nodeType === 'msub') {
        var children = gEl.querySelectorAll(':scope > g[data-mml-node]');
        if (children.length >= 2) {
            var base = extractTextFromG(children[0]);
            var sub = extractTextFromG(children[1]);
            var key = 'sub:' + base + sub;
            if (vmap[key]) return vmap[key];
            // Essayer avec les noms mappés
            for (var k in vmap) {
                if (k.indexOf('sub:') === 0 && k.indexOf(base) !== -1) {
                    return vmap[k];
                }
            }
        }
    }

    // Match par lettre grecque
    var greekNames = ['alpha','beta','gamma','delta','epsilon','zeta','eta',
        'theta','iota','kappa','lambda','mu','nu','xi','pi','rho','sigma',
        'tau','upsilon','phi','phi2','chi','psi','omega',
        'Delta','Phi','Psi','Omega','Theta','Lambda','Sigma','Gamma'];

    for (var gi = 0; gi < greekNames.length; gi++) {
        if (gText === greekNames[gi]) {
            var gk = 'greek:' + greekNames[gi];
            if (vmap[gk]) return vmap[gk];
            // Essayer variantes
            if (greekNames[gi] === 'phi2') {
                if (vmap['greek:phi']) return vmap['greek:phi'];
            }
        }
    }

    // Match Delta + lettre via mover
    if (nodeType === 'mover' || nodeType === 'mi') {
        for (var dk in vmap) {
            if (dk.indexOf('delta:') === 0) {
                var dLetter = dk.replace('delta:', '');
                if (gText.indexOf('Delta') !== -1 && gText.indexOf(dLetter) !== -1) {
                    return vmap[dk];
                }
            }
        }
    }

    // Match fonctions : cos, sin, etc.
    if (gText === 'cos' || gText === 'sin' || gText === 'tan' || gText === 'log' || gText === 'ln') {
        for (var fk in vmap) {
            if (fk.indexOf('func:') === 0 && fk.indexOf(gText) !== -1) {
                return vmap[fk];
            }
        }
    }

    // Match sum
    if (gText === 'sum' || gText.indexOf('sum') !== -1) {
        for (var sk in vmap) {
            if (sk.indexOf('sum:') === 0) return vmap[sk];
        }
    }

    return null;
}

function showTip(e, varInfo) {
    var tip = document.getElementById('formula-tooltip');
    if (!tip) return;
    var cleanSym = varInfo.symbol
        .replace(/\\/g, '')
        .replace(/[{}]/g, '')
        .replace(/text/g, '');
    tip.innerHTML =
        '<div style="color:#6c63ff;font-weight:700;margin-bottom:0.3rem;font-size:0.95rem;">' + escapeHtml(cleanSym) + '</div>' +
        '<div style="margin-bottom:0.25rem;color:#e4e4e7;">' + escapeHtml(varInfo.name) + '</div>' +
        '<div style="color:#a1a1aa;font-size:0.8rem;">Unité : ' + escapeHtml(varInfo.unit) + '</div>';
    moveTip(e);
    tip.style.opacity = '1';
}

function moveTip(e) {
    var tip = document.getElementById('formula-tooltip');
    if (!tip) return;
    var x = e.clientX + 16;
    var y = e.clientY + 16;
    if (x + 270 > window.innerWidth) x = e.clientX - 270;
    if (y + 90 > window.innerHeight) y = e.clientY - 90;
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
}

function hideTip() {
    var tip = document.getElementById('formula-tooltip');
    if (tip) tip.style.opacity = '0';
}

function escapeHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
