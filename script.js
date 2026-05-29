// Variables globales
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let quizMode = 'full';

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderFormulas();
    initQuiz();
    
    // Typeset MathJax après le chargement
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
});

// Gestion des onglets
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Retirer active de tous
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Ajouter active au sélectionné
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Retypeset MathJax
            if (window.MathJax) {
                MathJax.typesetPromise();
            }
        });
    });
}

// Affichage des formules (Partie 1)
function renderFormulas(filter = 'all') {
    const container = document.getElementById('formules-list');
    container.innerHTML = '';
    
    const filteredFormulas = filter === 'all' 
        ? formulesData 
        : formulesData.filter(f => f.theme === filter);
    
    filteredFormulas.forEach(formula => {
        const card = createFormulaCard(formula);
        container.appendChild(card);
    });
    
    // Retypeset MathJax
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

function createFormulaCard(formula) {
    const card = document.createElement('div');
    card.className = 'formula-card';
    
    const themeNames = {
        'mecanique': 'Mécanique',
        'energie': 'Énergie',
        'thermique': 'Thermique',
        'ondes': 'Ondes & Acoustique',
        'electricite': 'Électricité',
        'chimie': 'Chimie',
        'geometrie': 'Géométrie'
    };
    
    // En-tête avec formule et bouton toggle
    const header = document.createElement('div');
    header.className = 'formula-header';
    header.innerHTML = `
        <div class="formula-main">
            ${createTooltipFormula(formula)}
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="theme-badge">${themeNames[formula.theme]}</span>
            <span class="toggle-icon">▼</span>
        </div>
    `;
    
    // Détails déroulants
    const details = document.createElement('div');
    details.className = 'formula-details';
    
    formula.variables.forEach(variable => {
        const varInfo = document.createElement('div');
        varInfo.className = 'variable-info';
        varInfo.innerHTML = `<strong>$${variable.symbol}$</strong> : ${variable.name} - ${variable.unit}`;
        details.appendChild(varInfo);
    });
    
    // Toggle au clic
    header.addEventListener('click', () => {
        details.classList.toggle('open');
        header.querySelector('.toggle-icon').classList.toggle('open');
    });
    
    card.appendChild(header);
    card.appendChild(details);
    
    return card;
}

function createTooltipFormula(formula) {
    let formulaHtml = `$$${formula.formula}$$`;
    
    // Créer une version avec tooltips pour chaque variable
    const tooltipWrapper = document.createElement('div');
    tooltipWrapper.style.display = 'inline-block';
    
    // Pour chaque variable, créer un élément avec tooltip
    const variableElements = formula.variables.map(v => {
        return `
            <span class="variable-tooltip">
                <span class="tooltip-text">
                    <strong>$${v.symbol}$</strong> : ${v.name}<br>
                    Unité : ${v.unit}
                </span>
            </span>
        `;
    }).join('');
    
    return formulaHtml;
}

// Filtre de thème
document.getElementById('theme-filter')?.addEventListener('change', (e) => {
    renderFormulas(e.target.value);
});

// PARTIE 2: QUIZ
function initQuiz() {
    document.getElementById('start-quiz')?.addEventListener('click', startQuiz);
    document.getElementById('validate-answer')?.addEventListener('click', validateAnswer);
    document.getElementById('next-question')?.addEventListener('click', nextQuestion);
    document.getElementById('show-answer')?.addEventListener('click', showAnswer);
    document.getElementById('quit-quiz')?.addEventListener('click', quitQuiz);
    document.getElementById('restart-quiz')?.addEventListener('click', restartQuiz);
    
    // Auto-génération du tableau quand on tape la formule
    document.getElementById('formula-input')?.addEventListener('input', handleFormulaInput);
}

function startQuiz() {
    // Récupérer les thèmes sélectionnés
    const selectedThemes = Array.from(document.querySelectorAll('.theme-checkbox:checked'))
        .map(cb => cb.value);
    
    if (selectedThemes.length === 0) {
        alert('Veuillez sélectionner au moins un thème !');
        return;
    }
    
    // Filtrer les questions
    currentQuestions = formulesData.filter(f => selectedThemes.includes(f.theme));
    
    if (currentQuestions.length === 0) {
        alert('Aucune formule disponible pour les thèmes sélectionnés.');
        return;
    }
    
    // Mélanger les questions
    currentQuestions = shuffleArray(currentQuestions);
    
    quizMode = document.getElementById('quiz-mode').value;
    currentQuestionIndex = 0;
    score = 0;
    
    // Afficher la zone de quiz
    document.getElementById('quiz-config').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
        return;
    }
    
    const question = currentQuestions[currentQuestionIndex];
    
    // Mettre à jour le compteur
    document.getElementById('question-counter').textContent = 
        `Question ${currentQuestionIndex + 1} / ${currentQuestions.length}`;
    
    // Afficher la question
    document.getElementById('question-text').textContent = question.question;
    
    // Réinitialiser les champs
    document.getElementById('formula-input').value = '';
    document.getElementById('units-table').innerHTML = '';
    document.getElementById('units-table').style.display = 'none';
    document.getElementById('feedback').className = '';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('validate-answer').style.display = 'inline-block';
    
    // Afficher/masquer selon le mode
    if (quizMode === 'units') {
        // Mode unités: afficher la formule
        document.getElementById('formula-input-section').style.display = 'none';
        displayUnitsTable(question, true);
    } else if (quizMode === 'formula') {
        // Mode formule uniquement
        document.getElementById('formula-input-section').style.display = 'block';
    } else {
        // Mode complet
        document.getElementById('formula-input-section').style.display = 'block';
    }
    
    // Retypeset MathJax
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

function handleFormulaInput(e) {
    if (quizMode === 'units') return;
    
    const formulaText = e.target.value.trim();
    
    if (formulaText.length > 0) {
        const variables = extractVariables(formulaText);
        
        if (variables.length > 0 && quizMode === 'full') {
            displayUnitsTable(null, false, variables);
        }
    } else {
        document.getElementById('units-table').style.display = 'none';
    }
}

function extractVariables(formula) {
    // Extraire les variables (lettres uniques, groupes comme E_c, Delta, etc.)
    const matches = formula.match(/[a-zA-Z_]+[a-zA-Z0-9_]*/g);
    
    if (!matches) return [];
    
    // Filtrer et dédupliquer
    const variables = [...new Set(matches)].filter(v => 
        !['log', 'ln', 'sin', 'cos', 'tan', 'sqrt', 'pi'].includes(v.toLowerCase())
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
    
    html += `
            </tbody>
        </table>
    `;
    
    unitsTableDiv.innerHTML = html;
    
    // Retypeset MathJax
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

function validateAnswer() {
    const question = currentQuestions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    
    let isCorrect = false;
    
    if (quizMode === 'formula' || quizMode === 'full') {
        const userFormula = document.getElementById('formula-input').value.trim();
        isCorrect = checkFormula(userFormula, question.formula);
    }
    
    if (quizMode === 'units' || quizMode === 'full') {
        const unitsCorrect = checkUnits(question);
        isCorrect = quizMode === 'units' ? unitsCorrect : (isCorrect && unitsCorrect);
    }
    
    if (isCorrect) {
        score++;
        feedback.className = 'correct show';
        feedback.innerHTML = '✓ Correct ! Bravo !';
    } else {
        feedback.className = 'incorrect show';
        feedback.innerHTML = `✗ Incorrect. La bonne réponse est :<br>$$${question.formula}$$`;
    }
    
    document.getElementById('validate-answer').style.display = 'none';
    document.getElementById('next-question').style.display = 'inline-block';
    
    // Retypeset MathJax
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

function checkFormula(userFormula, correctFormula) {
    // Normaliser les formules
    const normalize = (f) => {
        return f.toLowerCase()
            .replace(/\s+/g, '')
            .replace(/\*/g, '')
            .replace(/\\/g, '')
            .replace(/\{/g, '')
            .replace(/\}/g, '')
            .replace(/times/g, '');
    };
    
    const normalizedUser = normalize(userFormula);
    const normalizedCorrect = normalize(correctFormula);
    
    // Vérification simple (peut être améliorée)
    return normalizedUser === normalizedCorrect || 
           checkFormulaVariations(normalizedUser, normalizedCorrect);
}

function checkFormulaVariations(user, correct) {
    // Gérer les variations comme a*b = b*a
    // Simplification basique
    const userVars = user.match(/[a-z_0-9]+/gi) || [];
    const correctVars = correct.match(/[a-z_0-9]+/gi) || [];
    
    return userVars.sort().join('') === correctVars.sort().join('');
}

function checkUnits(question) {
    const descInputs = document.querySelectorAll('.var-desc');
    const unitInputs = document.querySelectorAll('.var-unit');
    
    let allCorrect = true;
    
    descInputs.forEach((input, index) => {
        const varSymbol = input.dataset.var;
        const variable = question.variables.find(v => 
            v.symbol.replace(/\\/g, '').toLowerCase() === varSymbol.toLowerCase()
        );
        
        if (!variable) return;
        
        const userDesc = input.value.trim().toLowerCase();
        const correctDesc = variable.name.toLowerCase();
        
        // Vérification souple de la description
        if (!userDesc.includes(correctDesc.substring(0, 3)) && !correctDesc.includes(userDesc.substring(0, 3))) {
            allCorrect = false;
        }
    });
    
    unitInputs.forEach((input) => {
        const varSymbol = input.dataset.var;
        const variable = question.variables.find(v => 
            v.symbol.replace(/\\/g, '').toLowerCase() === varSymbol.toLowerCase()
        );
        
        if (!variable) return;
        
        const userUnit = input.value.trim().toLowerCase();
        const correctUnit = variable.unit.toLowerCase();
        
        // Vérification souple de l'unité
        if (!correctUnit.includes(userUnit) && userUnit.length > 0) {
            allCorrect = false;
        }
    });
    
    return allCorrect;
}

function showAnswer() {
    const question = currentQuestions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    
    let answer = `<strong>Réponse :</strong><br>$$${question.formula}$$<br><br>`;
    
    question.variables.forEach(v => {
        answer += `<strong>$${v.symbol}$</strong> : ${v.name} (${v.unit})<br>`;
    });
    
    feedback.className = 'info show';
    feedback.innerHTML = answer;
    
    // Retypeset MathJax
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    document.querySelector('.quiz-header').style.display = 'none';
    document.querySelector('.question-card').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    const percentage = Math.round((score / currentQuestions.length) * 100);
    
    let message = '';
    if (percentage >= 90) {
        message = '🎉 Excellent ! Tu maîtrises parfaitement !';
    } else if (percentage >= 70) {
        message = '👍 Très bien ! Continue comme ça !';
    } else if (percentage >= 50) {
        message = '👌 Pas mal ! Il faut encore réviser un peu.';
    } else {
        message = '📚 Il faut réviser davantage !';
    }
    
    document.getElementById('score-text').innerHTML = `
        Score : ${score} / ${currentQuestions.length} (${percentage}%)<br>
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
    
    currentQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
}

// Utilitaires
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}