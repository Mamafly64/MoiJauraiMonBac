// Variables globales
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let quizMode = 'full';
let totalQuestions = 0;

// Helper pour obtenir la valeur du MathField (compatible avec MathLive)
function getFormulaInputValue() {
    const input = document.getElementById('formula-input');
    if (!input) return '';
    // MathLive math-field : utiliser .getValue() ou .value en LaTeX
    if (input.tagName === 'MATH-FIELD') {
        return (input.getValue && input.getValue('latex')) || input.value || '';
    }
    return input.value || '';
}

// Helper pour définir la valeur du MathField
function setFormulaInputValue(latex) {
    const input = document.getElementById('formula-input');
    if (!input) return;
    if (input.tagName === 'MATH-FIELD') {
        if (input.setValue) {
            input.setValue(latex, 'latex');
        }
    } else {
        input.value = latex;
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page chargée, initialisation...');
    console.log('Nombre de formules:', formulesData.length);
    console.log('Nombre de questions de cours:', questionsCoursDataWithConversions.length);
    
    initTooltipSystem();
    initTabs();
    renderFormulas('all');
    initQuiz();
    initMathModeToggle();

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

// Global custom confirmation box (reusable)
function showConfirmBox(message, onYes, onNo, opts) {
    // Prevent duplicates
    if (document.getElementById('global-confirm-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'global-confirm-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;';

    const box = document.createElement('div');
    box.style.cssText = 'background:var(--bg-card);color:var(--text-light);padding:1rem 1.1rem;border-radius:8px;max-width:560px;width:92%;border:1px solid var(--border);text-align:left;';
    const p = document.createElement('div');
    p.style.cssText = 'margin-bottom:0.8rem;color:#cfcfe8;font-size:1rem;';
    p.textContent = message;

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:0.6rem;justify-content:flex-end;';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = (opts && opts.noText) ? opts.noText : 'Annuler';
    cancelBtn.className = 'btn-secondary';
    const okBtn = document.createElement('button');
    okBtn.textContent = (opts && opts.yesText) ? opts.yesText : 'OK';
    okBtn.className = 'btn-primary';
    okBtn.style.cssText = 'min-width:88px;';

    btnRow.appendChild(cancelBtn);
    btnRow.appendChild(okBtn);
    box.appendChild(p);
    box.appendChild(btnRow);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    function clean() { try { overlay.remove(); } catch (e) {} }
    cancelBtn.addEventListener('click', function() { clean(); try { onNo && onNo(); } catch(e){} });
    okBtn.addEventListener('click', function() { clean(); try { onYes && onYes(); } catch(e){} });
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
        'nucleaire': 'Nucléaire',
        'geometrie': 'Géométrie',
        'conversions': 'Conversions'
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
        attachFormulaHandlers(formulaInput);
        formulaInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                validateAnswer();
            }
        });
    }
}

// Mapping and helpers for formula input transforms (name -> symbol, ^digits -> superscript)
const FORMULA_NAME_TO_SYMBOL = {
    'lambda': 'λ', 'theta': 'θ', 'teta': 'θ', 'delta': 'δ', 'pi': 'π',
    'sigma': 'σ', 'phi': 'φ', 'rho': 'ρ', 'alpha': 'α', 'beta': 'β',
    'gamma': 'γ', 'mu': 'μ', 'omega': 'ω'
};
const FORMULA_SUP_MAP = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹' };

function formulaReplaceCaretExponents(str) {
    return str.replace(/\^(\d+)/g, function(_, digits) {
        return digits.split('').map(d => FORMULA_SUP_MAP[d] || d).join('');
    });
}

function formulaReplaceNamesWithSymbols(str) {
    return str.replace(/\b([a-zA-Z]+)\b/g, function(m) {
        const low = m.toLowerCase();
        return FORMULA_NAME_TO_SYMBOL[low] || m;
    });
}

// Apply transforms to the formula input element (only for plain text input, not math-field)
function processFormulaInputTransforms(el) {
    if (!el) return;
    try {
        if (el.tagName === 'MATH-FIELD') return; // don't touch mathfield latex
        const before = el.value || '';
        const after = formulaReplaceNamesWithSymbols(formulaReplaceCaretExponents(before));
        if (after !== before) {
            const pos = el.selectionStart || 0;
            el.value = after;
            try { el.setSelectionRange(pos, pos); } catch (e) {}
            // visual feedback
            el.style.transition = 'background 0.18s';
            const prevBg = el.style.background;
            el.style.background = 'rgba(76,175,80,0.12)';
            setTimeout(() => { el.style.background = prevBg; }, 220);
        }
    } catch (e) { console.warn('processFormulaInputTransforms error', e); }
}

// Attach listeners to a formula input element (call when input exists or is recreated)
function attachFormulaHandlers(inputEl) {
    if (!inputEl) return;
    // avoid double-attaching by marking
    if (inputEl.__formulaHandlersAttached) return;
    inputEl.__formulaHandlersAttached = true;

    inputEl.addEventListener('input', function(e) {
        // Only transform in full/formula modes
        if (quizMode === 'units' || quizMode === 'cours') return;
        const v = inputEl.value || '';
        if (v.length > 0 && (/\s$/.test(v) || /\^\d+/.test(v))) {
            setTimeout(() => processFormulaInputTransforms(inputEl), 0);
        }
    });

    inputEl.addEventListener('blur', function() { processFormulaInputTransforms(inputEl); });
    inputEl.addEventListener('paste', function() { setTimeout(() => processFormulaInputTransforms(inputEl), 0); });
    inputEl.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            validateAnswer();
        }
    });
}

function startQuiz() {
    console.log('Démarrage quiz');
    
    quizMode = document.getElementById('quiz-mode').value;
    
    const selectedThemes = Array.from(document.querySelectorAll('.theme-checkbox:checked'))
        .map(cb => cb.value);
    
    console.log('Mode:', quizMode);
    console.log('Thèmes sélectionnés:', selectedThemes);
    
    if (selectedThemes.length === 0) {
        alert('Veuillez sélectionner au moins un thème !');
        return;
    }
    
    // Choisir la source de données selon le mode
    let sourceData = (quizMode === 'cours') ? questionsCoursDataWithConversions : formulesData;
    
    let availableQuestions = sourceData.filter(f => selectedThemes.includes(f.theme));
    
    console.log('Questions disponibles:', availableQuestions.length);
    
    if (availableQuestions.length === 0) {
        alert('Aucune question disponible pour les thèmes sélectionnés.');
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
    
    // Injecter les questions d'erreurs anciennes si demandé
    const reviewToggle = document.getElementById('review-errors-toggle');
    const reviewPercentInput = document.getElementById('review-errors-percent');
    const firstTheme = selectedThemes[0];
    if (reviewToggle && reviewToggle.checked) {
        let pct = 20;
        if (reviewPercentInput) {
            const v = parseInt(reviewPercentInput.value);
            if (!isNaN(v) && v >= 0 && v <= 100) pct = v;
        }
        currentQuestions = injectErrorsIntoQuiz(currentQuestions, firstTheme, pct);
    }
    
    // Mélanger à nouveau pour que les questions d'erreurs ne soient pas toutes à la fin
    currentQuestions = shuffleArray(currentQuestions);
    
    totalQuestions = currentQuestions.length;
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
    
    // Afficher le texte de la question ou juste "Formule:" selon le mode
    let questionHTML = '';
    if (quizMode === 'units') {
        // Mode unités uniquement : juste afficher "Formule:"
        questionHTML = '<strong>Formule:</strong>';
    } else {
        // Autres modes : afficher la question complète
        questionHTML = question.question;
        if (question.isOldError) {
            questionHTML += ' <span class="error-badge-in-quiz">Ancienne erreur</span>';
        }
    }
    
    document.getElementById('question-text').innerHTML = questionHTML;
    
    setFormulaInputValue('');
    document.getElementById('units-table').innerHTML = '';
    document.getElementById('units-table').style.display = 'none';
    
    // Effacer complètement le feedback précédent
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = '';
    feedback.className = '';
    feedback.style.background = '';
    feedback.style.border = '';
    feedback.style.borderRadius = '';
    feedback.style.padding = '';
    
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('validate-answer').style.display = 'inline-block';
    document.getElementById('skip-question').style.display = 'inline-block';
    
    // Adaptation selon le mode
    if (quizMode === 'cours') {
        // Mode cours : juste un champ texte
        document.getElementById('formula-input-section').style.display = 'block';
        document.getElementById('units-table').style.display = 'none';
    } else if (quizMode === 'units') {
        // Mode unités seul
        document.getElementById('formula-input-section').style.display = 'none';
        displayUnitsTable(question, true);
    } else if (quizMode === 'full') {
        // Mode complet : formule + unités
        document.getElementById('formula-input-section').style.display = 'block';
        displayUnitsTable(question, false);
    } else {
        // Mode formule seule
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
    if (quizMode === 'units' || quizMode === 'cours') return;
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
    
    // Build table always; only the Variable column content is toggled by the checkbox in full mode
    const variables = customVariables || (question && question.variables ? question.variables.map(v => v.symbol.replace(/\\/g, '')) : []);

    // Checkbox control only shown in full mode
    if (!showFormula) {
        html += `<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.6rem;">
            <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;color:#a1a1aa;">
                <input type="checkbox" id="toggle-show-variables" style="width:1.1rem;height:1.1rem;" />
                <span style="font-size:0.95rem;">Afficher les variables</span>
            </label>
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

    variables.forEach(varSymbol => {
        // variable cell contains both an input (for manual entry) and a text span (for revealed symbol)
        html += `
            <tr>
                <td>
                    <input type="text" class="var-symbol-input" data-var="${varSymbol}" placeholder="Symbole (ex: v)" style="display:block;width:6.5rem;padding:0.25rem;border-radius:4px;border:1px solid #444;background:rgba(37,37,77,0.9);color:#e4e4e7;" />
                    <span class="var-symbol-text" data-var="${varSymbol}" style="display:none;font-weight:700;">${varSymbol}</span>
                </td>
                <td><input type="text" class="var-desc" data-var="${varSymbol}" placeholder="Description"></td>
                <td><input type="text" class="var-unit" data-var="${varSymbol}" placeholder="Unité"></td>
            </tr>`;
    });

    html += `</tbody></table>`;

    unitsTableDiv.innerHTML = html;

    // List inputs created
    const created = unitsTableDiv.querySelectorAll('.var-symbol-input');
    

    // Attach checkbox behavior: toggles visibility of variable symbols vs manual input
    const toggle = document.getElementById('toggle-show-variables');
    if (toggle) {
        

        toggle.addEventListener('change', function(ev) {
            const checked = this.checked;
            const inputs = unitsTableDiv.querySelectorAll('.var-symbol-input');
            const texts = unitsTableDiv.querySelectorAll('.var-symbol-text');
            // Only confirm when turning ON (revealing the variables)
            if (checked) {
                ev.preventDefault();
                // show confirmation
                showConfirmBox('frro c\'est de la triche un peu, t\'es sûr tu veux afficher les variables?', function() {
                    // Yes: keep checked and reveal symbols
                    try { toggle.checked = true; } catch(e) {}
                    inputs.forEach(i => { i.style.display = 'none'; });
                    texts.forEach(s => { s.style.display = 'inline'; });
                }, function() {
                    // No: uncheck and keep inputs visible
                    try { toggle.checked = false; } catch(e) {}
                    inputs.forEach(i => { i.style.display = 'block'; });
                    texts.forEach(s => { s.style.display = 'none'; });
                }, { noText: 'nn wlh pardon', yesText: 'oui je suis un tricheur monocouille' });
            } else {
                // turning off: hide symbols, show inputs
                inputs.forEach(i => { i.style.display = 'block'; });
                texts.forEach(s => { s.style.display = 'none'; });
            }
        });
    }
    
    // Helper: map written names to symbols (expanded)
    const NAME_TO_SYMBOL = {
        'lambda': 'λ',
        'theta': 'θ',
        'teta': 'θ',
        'delta': 'δ',
        'pi': 'π',
        'sigma': 'σ',
        'phi': 'φ',
        'rho': 'ρ',
        'alpha': 'α',
        'beta': 'β',
        'gamma': 'γ',
        'mu': 'μ',
        'omega': 'ω'
    };

    const SUP_MAP = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹' };

    function replaceCaretExponents(str) {
        // Replace sequences like ^2 or ^23 with superscript characters
        const result = str.replace(/\^(\d+)/g, function(_, digits) {
            return digits.split('').map(d => SUP_MAP[d] || d).join('');
        });
        // silent transform
        if (result !== str) { /* replaced caret exponents */ }
        return result;
    }

    function replaceNamesWithSymbols(str) {
        // Replace full words only (case-insensitive)
        const result = str.replace(/\b([a-zA-Z]+)\b/g, function(m) {
            const low = m.toLowerCase();
            const replacement = NAME_TO_SYMBOL[low] || m;
            return replacement;
        });
        if (result !== str) { /* replaced names with symbols */ }
        return result;
    }

    function processVarInputEl(el) {
        if (!el) return;

        function doTransforms() {
            let v = el.value || '';
            const newV = replaceNamesWithSymbols(replaceCaretExponents(v));
            if (newV !== v) {
                const selStart = el.selectionStart;
                const selEnd = el.selectionEnd;
                el.value = newV;
                // try to keep cursor near previous position
                try {
                    el.setSelectionRange(selStart, selEnd);
                } catch (e) {}
            }
        }

        // On blur: apply transforms
        el.addEventListener('blur', function() { doTransforms(); });

        // On input: if the last char is a space OR if we detect a caret exponent pattern, apply transforms
        el.addEventListener('input', function(e) {
            const v = el.value || '';
            if (v.length > 0 && (/\s$/.test(v) || /\^\d+/.test(v))) {
                setTimeout(doTransforms, 0);
            }
        });

        // On keydown: when the user presses space, Enter or Tab, apply transforms after insertion
        el.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Enter' || e.key === 'Tab') {
                setTimeout(doTransforms, 0);
            }
        });

        // On paste: process after paste
        el.addEventListener('paste', function() { setTimeout(doTransforms, 0); });
    }

    // Debounce timers per element
    const debounceMap = new WeakMap();
    unitsTableDiv.addEventListener('input', function(e) {
        const el = e.target;
        if (!el || !el.classList || !el.classList.contains('var-symbol-input')) return;

        // Always schedule a transform shortly after input (debounced)
        if (debounceMap.has(el)) clearTimeout(debounceMap.get(el));
        const t = setTimeout(() => {
            const before = el.value || '';
            const transformed = replaceNamesWithSymbols(replaceCaretExponents(before));
            if (transformed !== before) {
                const pos = el.selectionStart;
                el.value = transformed;
                try { el.setSelectionRange(pos, pos); } catch (e) {}
                // small visual flash to indicate change
                el.style.transition = 'background 0.18s';
                const prevBg = el.style.background;
                el.style.background = 'rgba(76,175,80,0.12)';
                setTimeout(() => { el.style.background = prevBg; }, 220);
                // transformed
            }
        }, 80);
        debounceMap.set(el, t);
    });

    unitsTableDiv.addEventListener('keydown', function(e) {
        const el = e.target;
        if (!el || !el.classList || !el.classList.contains('var-symbol-input')) return;
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Tab') {
            setTimeout(() => {
                const before = el.value || '';
                const transformed = replaceNamesWithSymbols(replaceCaretExponents(before));
                if (transformed !== before) {
                    const pos = el.selectionStart;
                    el.value = transformed;
                    try { el.setSelectionRange(pos, pos); } catch (e) {}
                }
            }, 0);
        }
    });

    unitsTableDiv.addEventListener('blur', function(e) {
        const el = e.target;
        if (!el || !el.classList || !el.classList.contains('var-symbol-input')) return;
        const before = el.value || '';
        const transformed = replaceNamesWithSymbols(replaceCaretExponents(before));
        if (transformed !== before) {
            el.value = transformed;
        }
    }, true);

    unitsTableDiv.addEventListener('paste', function(e) {
        const el = e.target;
        if (!el || !el.classList || !el.classList.contains('var-symbol-input')) return;
        setTimeout(() => {
            const before = el.value || '';
            const transformed = replaceNamesWithSymbols(replaceCaretExponents(before));
            if (transformed !== before) el.value = transformed;
        }, 0);
    });
    
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

function validateAnswer(skipEmptyCheck = false, showSelfEval = true) {
    console.log('Affichage de la correction');

    const userFormula = getFormulaInputValue().trim();
    
    // Vérifier que la formule n'est pas vide (sauf pour le mode cours et unités)
    if (!userFormula && quizMode !== 'units' && quizMode !== 'cours' && !skipEmptyCheck) {
        alert('Veuillez entrer une formule avant de valider!');
        return;
    }

    const question = currentQuestions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    let feedbackHTML = '';

    if (quizMode === 'cours') {
        const userAnswer = getFormulaInputValue().trim();

        feedbackHTML += '<div style="margin-bottom: 1rem;">';
        feedbackHTML += '<strong style="color: #a1a1aa;">Votre reponse :</strong>';
        feedbackHTML += '<div class="user-answer-box">';
        feedbackHTML += '<code style="color: #e4e4e7;">' + escapeHtml(userAnswer || '(vide)') + '</code>';
        feedbackHTML += '</div>';
        feedbackHTML += '</div>';

        feedbackHTML += '<div style="margin-bottom: 1rem;">';
        feedbackHTML += '<strong style="color: #4caf50;">Reponse attendue :</strong>';
        feedbackHTML += '<div class="correction-box">';
        feedbackHTML += '<code style="color: #e4e4e7;">' + escapeHtml(question.reponse) + '</code>';
        feedbackHTML += '</div>';
        feedbackHTML += '</div>';

    } else {
        if (quizMode !== 'units' && userFormula) {
            feedbackHTML += '<div style="margin-bottom: 1rem;">';
            feedbackHTML += '<strong style="color: #a1a1aa;">Votre reponse :</strong>';
            feedbackHTML += '<div class="user-answer-box">$$' + userFormula + '$$</div>';
            feedbackHTML += '</div>';
        }

        feedbackHTML += '<div style="margin-bottom: 1rem;">';
        feedbackHTML += '<strong style="color: #4caf50;">Formule correcte :</strong>';
        feedbackHTML += '<div class="correction-box">$$' + question.formula + '$$</div>';
        feedbackHTML += '</div>';

        feedbackHTML += '<div style="margin-bottom: 1rem;">';
        feedbackHTML += buildVariablesHTML(question);
        feedbackHTML += '</div>';
    }

    if (showSelfEval) {
        feedbackHTML += '<div class="self-eval-container">';
        feedbackHTML += '<button class="self-eval-btn full" onclick="recordScore(1)">1 point</button>';
        feedbackHTML += '<button class="self-eval-btn half" onclick="recordScore(0.5)">0.5 point</button>';
        feedbackHTML += '<button class="self-eval-btn zero" onclick="recordScore(0)">0 point</button>';
        feedbackHTML += '</div>';
    }

    feedback.className = 'show';
    feedback.style.background = 'rgba(108, 99, 255, 0.05)';
    feedback.style.border = '1px solid rgba(108, 99, 255, 0.2)';
    feedback.style.borderRadius = '8px';
    feedback.style.padding = '1.5rem';
    feedback.innerHTML = feedbackHTML;

    document.getElementById('validate-answer').style.display = 'none';
    document.getElementById('skip-question').style.display = 'none';
    // Show the "Suivant" button if self-eval is hidden (e.g. after "Passer")
    if (showSelfEval) {
        document.getElementById('next-question').style.display = 'none';
    } else {
        const nextBtnEl = document.getElementById('next-question');
        if (nextBtnEl) {
            nextBtnEl.style.display = 'inline-block';
            nextBtnEl.classList.add('btn-primary');
            nextBtnEl.classList.remove('btn-secondary');
            // Ensure label is user-friendly
            try { nextBtnEl.textContent = 'Suivant'; } catch (e) {}
        }
    }

    setTimeout(() => {
        if (window.MathJax) {
            MathJax.typesetPromise([feedback]);
        }
    }, 150);
}

function recordScore(points) {
    const question = currentQuestions[currentQuestionIndex];
    if (question) {
        // Enregistrer le score localement sur l'objet question pour le session summary
        question.userScore = points;
        question.isCorrect = (points === 1);

        if (points < 1) {
            // Enregistrer une erreur si la réponse est incorrecte, sauf si déjà enregistrée via "passer"
            if (!question._skipRecorded) {
                recordQuestionError(question.id, question, quizMode || 'formules');
            }
        } else if (question.isOldError && points === 1) {
            // Si c'était une ancienne erreur et on l'a réussie, marquer le succès
            recordErrorSuccess(question.id);
        }
    }

    score += points;
    console.log('Score +' + points + ' | Total: ' + score);

    currentQuestionIndex++;
    loadQuestion();
}




function skipQuestion() {
    // Marquer la question comme passée (0 point), enregistrer l'erreur, puis afficher la correction
    const question = currentQuestions[currentQuestionIndex];
    if (question) {
        question.userScore = 0;
        question.isCorrect = false;
        // Mark to avoid double-recording when user later presses a self-eval button
        question._skipRecorded = true;
        // Record the error now
        recordQuestionError(question.id, question, quizMode || 'formules');
    }
    // Show correction even if input is empty, but hide self-eval buttons when skipping
    validateAnswer(true, false);
    // Ensure the next button is visible and self-eval controls hidden (robust fallback)
    try {
        const nextBtnEl = document.getElementById('next-question');
        if (nextBtnEl) {
            nextBtnEl.style.display = 'inline-block';
            nextBtnEl.classList.add('btn-primary');
            nextBtnEl.classList.remove('btn-secondary');
            nextBtnEl.textContent = 'Suivant';
        }
        const feedback = document.getElementById('feedback');
        if (feedback) {
            const evalBox = feedback.querySelector('.self-eval-container');
            if (evalBox) evalBox.style.display = 'none';
        }
    } catch (e) {}
}

// 🆕 Fonction de validation des réponses de cours
function checkCoursAnswer(userAnswer, question) {
    if (!userAnswer || userAnswer.length === 0) return false;
    
    const normalize = (str) => {
        return str.toLowerCase()
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/[àáâãäå]/g, 'a')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôõö]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[×*]/g, '')
            .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (m) => '0123456789'['₀₁₂₃₄₅₆₇₈₉'.indexOf(m)])
            .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (m) => '0123456789'['⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(m)])
            .replace(/[^a-z0-9.,+\-=>/()]/g, '');
    };
    
    const normalizedUser = normalize(userAnswer);
    const normalizedCorrect = normalize(question.reponse);
    
    // Vérification exacte
    if (normalizedUser === normalizedCorrect) return true;
    
    // Vérification des réponses acceptées
    if (question.acceptedAnswers) {
        for (let accepted of question.acceptedAnswers) {
            if (normalize(accepted) === normalizedUser) return true;
        }
    }
    
    // Vérification partielle (au moins 80% de similarité)
    if (normalizedUser.length > 5 && normalizedCorrect.includes(normalizedUser)) {
        return true;
    }
    
    return false;
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
    const descInputs = document.querySelectorAll('.var-desc');
    const unitInputs = document.querySelectorAll('.var-unit');

    if (descInputs.length === 0 && unitInputs.length === 0) {
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
        message = 'Excellent ! Tu maitrises parfaitement !';
    } else if (percentage >= 70) {
        message = 'Tres bien ! Continue comme ca !';
    } else if (percentage >= 50) {
        message = 'Pas mal ! Il faut encore reviser un peu.';
    } else {
        message = 'Il faut reviser davantage !';
    }

    document.getElementById('score-text').innerHTML =
        'Score : ' + score + ' / ' + totalQuestions + ' (' + percentage + '%)<br><br>' +
        message;
    
    // Enregistrer la session de quiz
    const selectedThemesArray = Array.from(document.querySelectorAll('.theme-checkbox:checked'))
        .map(cb => cb.value);

    saveQuizSession(selectedThemesArray.length ? selectedThemesArray : ['mixed'], score, totalQuestions, currentQuestions);
}

function quitQuiz() {
    showConfirmBox('Voulez-vous vraiment quitter le quiz ?', function() { resetQuiz(); }, function() {});
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

    const feedback = document.getElementById('feedback');
    feedback.className = '';
    feedback.removeAttribute('style');
    feedback.innerHTML = '';

    const unitsTable = document.getElementById('units-table');
    unitsTable.innerHTML = '';
    unitsTable.style.display = 'none';

    setFormulaInputValue('');

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
        var groups = svg.querySelectorAll('g[data-mml-node]');

        groups.forEach(function(g) {
            var nodeType = g.getAttribute('data-mml-node');

            if (['mi', 'msub', 'msup', 'msubsup', 'mover'].indexOf(nodeType) === -1) return;

            var gText = extractTextFromG(g);
            if (!gText) return;

            var matched = matchVarSVG(gText, nodeType, g, vmap);
            if (!matched) return;

            if (g.getAttribute('data-tip-attached')) return;
            g.setAttribute('data-tip-attached', '1');

            g.style.cursor = 'help';

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
    fdata.variables.forEach(function(v) {
        var sym = v.symbol;

        if (sym.match(/^[A-Za-z]$/)) {
            map[sym] = v;
            return;
        }

        var subMatch = sym.match(/^([A-Za-z])_\{?([^}\\]*)\}?$/);
        if (subMatch) {
            map['sub:' + subMatch[1] + subMatch[2]] = v;
            return;
        }

        var textSubMatch = sym.match(/^([A-Za-z])_\{\\text\{([^}]*)\}\}$/);
        if (textSubMatch) {
            map['sub:' + textSubMatch[1] + textSubMatch[2]] = v;
            return;
        }

        var greekMatch = sym.match(/^\\([a-zA-Z]+)$/);
        if (greekMatch) {
            map['greek:' + greekMatch[1]] = v;
            return;
        }

        var deltaMatch = sym.match(/^\\Delta\s+([A-Za-z])$/);
        if (deltaMatch) {
            map['delta:' + deltaMatch[1]] = v;
            return;
        }

        var trigMatch = sym.match(/^\\(cos|sin|tan|log|ln)/);
        if (trigMatch) {
            map['func:' + sym] = v;
            return;
        }

        var vecMatch = sym.match(/^\\vec\{([A-Za-z])\}$/);
        if (vecMatch) {
            map['vec:' + vecMatch[1]] = v;
            return;
        }

        if (sym.indexOf('\\sum') !== -1) {
            map['sum:' + sym] = v;
            return;
        }

        map['raw:' + sym] = v;
    });

    return map;
}

function matchVarSVG(gText, nodeType, gEl, vmap) {
    if (gText.length === 1 && vmap[gText]) {
        return vmap[gText];
    }

    if (nodeType === 'msub') {
        var children = gEl.querySelectorAll(':scope > g[data-mml-node]');
        if (children.length >= 2) {
            var base = extractTextFromG(children[0]);
            var sub = extractTextFromG(children[1]);
            var key = 'sub:' + base + sub;
            if (vmap[key]) return vmap[key];
            for (var k in vmap) {
                if (k.indexOf('sub:') === 0 && k.indexOf(base) !== -1) {
                    return vmap[k];
                }
            }
        }
    }

    var greekNames = ['alpha','beta','gamma','delta','epsilon','zeta','eta',
        'theta','iota','kappa','lambda','mu','nu','xi','pi','rho','sigma',
        'tau','upsilon','phi','phi2','chi','psi','omega',
        'Delta','Phi','Psi','Omega','Theta','Lambda','Sigma','Gamma'];

    for (var gi = 0; gi < greekNames.length; gi++) {
        if (gText === greekNames[gi]) {
            var gk = 'greek:' + greekNames[gi];
            if (vmap[gk]) return vmap[gk];
            if (greekNames[gi] === 'phi2') {
                if (vmap['greek:phi']) return vmap['greek:phi'];
            }
        }
    }

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

    if (gText === 'cos' || gText === 'sin' || gText === 'tan' || gText === 'log' || gText === 'ln') {
        for (var fk in vmap) {
            if (fk.indexOf('func:') === 0 && fk.indexOf(gText) !== -1) {
                return vmap[fk];
            }
        }
    }

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

// ======================================
// GESTION DU MODE MATH (LaTeX)
// ======================================

let isMathModeActive = false;

function initMathModeToggle() {
    const toggleBtn = document.getElementById('toggle-math-mode');
    if (!toggleBtn) return;
    
    toggleBtn.addEventListener('click', function() {
        const input = document.getElementById('formula-input');
        isMathModeActive = !isMathModeActive;
        
        if (isMathModeActive) {
            // Passer en mode Math (MathLive)
            const currentValue = input.value;
            const section = document.getElementById('formula-input-section');
            
            section.innerHTML = '';
            
            const container = document.createElement('div');
            container.style.cssText = 'display: flex; gap: 0.5rem; align-items: flex-start;';
            
            const mathField = document.createElement('math-field');
            mathField.id = 'formula-input';
            mathField.style.cssText = 'flex: 1; border: 1px solid #444; padding: 0.5rem; border-radius: 4px; min-height: 40px; background: rgba(255,255,255,0.03);';
            
            container.appendChild(mathField);
            
            // Restaurer la valeur
            if (currentValue) {
                if (mathField.setValue) {
                    mathField.setValue(currentValue, 'latex');
                }
            }
            
            // Ajouter le bouton retour
            const backBtn = document.createElement('button');
            backBtn.id = 'toggle-math-mode';
            backBtn.textContent = 'Texte';
            backBtn.style.cssText = 'padding: 0.6rem 0.8rem; background: #333; color: #a1a1aa; border: 1px solid #444; border-radius: 4px; cursor: pointer; font-size: 0.8rem; white-space: nowrap; transition: all 0.2s;';
            
            container.appendChild(backBtn);
            section.appendChild(container);
            
            // Réattacher l'event listener au nouveau bouton
            backBtn.addEventListener('click', initMathModeToggle);
            
            toggleBtn.style.display = 'none';
            
            // Charger MathLive si nécessaire
            setTimeout(() => {
                if (window.MathJax) {
                    MathJax.typesetPromise();
                }
            }, 100);
        } else {
            // Revenir en mode Texte Simple
            const currentValue = getFormulaInputValue();
            const section = document.getElementById('formula-input-section');
            
            section.innerHTML = '';
            
            const container = document.createElement('div');
            container.style.cssText = 'display: flex; gap: 0.5rem; align-items: flex-start;';
            
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.id = 'formula-input';
            textInput.placeholder = 'Entrez votre réponse...';
            textInput.style.cssText = 'flex: 1; padding: 0.6rem; border-radius: 6px; border: 1px solid #444; background: rgba(37,37,77,0.9); color: #e4e4e7; font-size: 1rem;';
            textInput.value = currentValue;
            
            container.appendChild(textInput);
            // Attach handlers (transforms, Enter key, paste, blur)
            attachFormulaHandlers(textInput);
            
            // Ajouter le bouton toggle
            const mathBtn = document.createElement('button');
            mathBtn.id = 'toggle-math-mode';
            mathBtn.textContent = 'Math';
            mathBtn.style.cssText = 'padding: 0.6rem 0.8rem; background: #333; color: #a1a1aa; border: 1px solid #444; border-radius: 4px; cursor: pointer; font-size: 0.8rem; white-space: nowrap; transition: all 0.2s;';
            
            container.appendChild(mathBtn);
            section.appendChild(container);
            
            const small = document.createElement('small');
            small.style.cssText = 'color: #a1a1aa; display: block; margin-top: 0.5rem;';
            small.textContent = 'Cliquez sur "Math" pour accéder à l\'éditeur LaTeX avancé';
            section.appendChild(small);
            
            // Réattacher l'event listener
            mathBtn.addEventListener('click', initMathModeToggle);
        }
    });
}

// ======================================
// SYSTEME DE STATISTIQUES ET REVISION ESPACEE
// ======================================

// Charger les stats depuis localStorage
function loadStats() {
    const stored = localStorage.getItem('quizStats');
    if (!stored) {
        return {
            sessions: [],
            errors: {},
            totalQuestions: 0,
            totalCorrect: 0
        };
    }
    return JSON.parse(stored);
}

// Sauvegarder les stats dans localStorage
function saveStats(stats) {
    localStorage.setItem('quizStats', JSON.stringify(stats));
}

// Enregistrer les erreurs de questions (répétition espacée)
function recordQuestionError(questionId, questionData, themeId) {
    const stats = loadStats();
    if (!stats.errors) stats.errors = {};
    
    const errorKey = questionId.toString();
    if (!stats.errors[errorKey]) {
        stats.errors[errorKey] = {
            questionId: questionId,
            questionText: questionData.question || 'Sans titre',
            theme: themeId,
            failCount: 0,
            successCount: 0,
            lastFail: null,
            nextReview: null
        };
    }
    
    stats.errors[errorKey].failCount++;
    stats.errors[errorKey].lastFail = new Date().getTime();
    // Prochaine révision dans 1 jour (86400000 ms)
    stats.errors[errorKey].nextReview = new Date().getTime() + 86400000;
    
    saveStats(stats);
}

// Obtenir les questions à réviser (erreurs anciennes)
function getErrorsToReview() {
    const stats = loadStats();
    const now = new Date().getTime();
    const errors = [];
    
    for (let key in stats.errors) {
        if (stats.errors[key].nextReview <= now || !stats.errors[key].nextReview) {
            errors.push({ ...stats.errors[key], id: key });
        }
    }
    
    return errors;
}

// Marquer une erreur comme réussie
function recordErrorSuccess(questionId) {
    const stats = loadStats();
    const errorKey = questionId.toString();
    
    if (stats.errors && stats.errors[errorKey]) {
        stats.errors[errorKey].successCount++;
        // Si 3 succès, on supprime l'erreur
        if (stats.errors[errorKey].successCount >= 3) {
            delete stats.errors[errorKey];
        } else {
            // Sinon, prochaine révision dans 2-3 jours
            stats.errors[errorKey].nextReview = new Date().getTime() + (2 + Math.random()) * 86400000;
        }
    }
    
    saveStats(stats);
}

// Enregistrer un résultat de quiz complet
function saveQuizSession(themeId, score, totalQuestions, questionsData) {
    const stats = loadStats();

    // Accept either an array of themes or a comma-separated string
    let themesArr = [];
    if (Array.isArray(themeId)) {
        themesArr = themeId.slice();
    } else if (typeof themeId === 'string') {
        themesArr = themeId.split(',').map(s => s.trim()).filter(s => s.length > 0);
    }
    if (themesArr.length === 0) themesArr = ['mixed'];

    const session = {
        date: new Date().getTime(),
        dateStr: new Date().toLocaleDateString('fr-FR'),
        theme: themesArr.join(', '), // legacy string for older code
        themes: themesArr, // canonical array form
        score: score,
        totalQuestions: totalQuestions,
        rate: Math.round((score / totalQuestions) * 100)
    };

    // Construire un breakdown par thème à partir des questions du quiz (plus précis)
    const breakdown = {};
    if (questionsData && Array.isArray(questionsData)) {
        questionsData.forEach(q => {
            const t = q.theme || (Array.isArray(themesArr) && themesArr[0]) || 'mixed';
            if (!breakdown[t]) breakdown[t] = { total: 0, correct: 0 };
            breakdown[t].total += 1;
            if (q.userScore !== undefined) {
                if (q.userScore === 1) breakdown[t].correct += 1;
            }
        });
    }

    session.themeBreakdown = breakdown;

    if (!stats.sessions) stats.sessions = [];
    stats.sessions.push(session);

    stats.totalQuestions = (stats.totalQuestions || 0) + totalQuestions;
    stats.totalCorrect = (stats.totalCorrect || 0) + score;

    // Enregistrer les erreurs (utiliser theme array pour recordQuestionError)
    if (questionsData && Array.isArray(questionsData)) {
        questionsData.forEach((q, idx) => {
            if (q.result !== undefined && q.result < 1) {
                // Pass the first theme as themeId for error record (keeps previous behavior)
                recordQuestionError(q.id, q, themesArr[0] || 'mixed');
            }
        });
    }

    saveStats(stats);
}

// Afficher les statistiques
function renderStats() {
    const stats = loadStats();
    
    // Stat cards
    const totalQuizzes = (stats.sessions || []).length;
    const totalQuestions = stats.totalQuestions || 0;
    const totalCorrect = stats.totalCorrect || 0;
    const globalRate = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const errorCount = Object.keys(stats.errors || {}).length;
    
    document.getElementById('stat-total-quizzes').textContent = totalQuizzes;
    document.getElementById('stat-total-questions').textContent = totalQuestions;
    document.getElementById('stat-global-rate').textContent = globalRate + '%';
    document.getElementById('stat-errors-pending').textContent = errorCount;
    
    // Graphique évolution
    renderEvolutionChart(stats);
    
    // Graphique par thème
    renderThemeChart(stats);
    
    // Tableau par thème
    renderThemeTable(stats);
    
    // Liste des erreurs à réviser
    renderErrorsList();
    
    // Historique
    renderHistory(stats);
}

// Graphique d'évolution du taux de réussite
function renderEvolutionChart(stats) {
    const canvas = document.getElementById('chart-evolution');
    if (!canvas) return;
    
    const sessions = (stats.sessions || []).slice(-10); // Derniers 10 quiz
    
    const labels = sessions.map(s => s.dateStr);
    const data = sessions.map(s => s.rate);
    
    if (window.evolutionChart) {
        window.evolutionChart.destroy();
    }
    
    window.evolutionChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Taux de réussite (%)',
                data: data,
                borderColor: '#6c63ff',
                backgroundColor: 'rgba(108, 99, 255, 0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#6c63ff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: { color: '#e4e4e7' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { color: '#a1a1aa' },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                },
                x: {
                    ticks: { color: '#a1a1aa' },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });
}

// Graphique taux de réussite par thème
function renderThemeChart(stats) {
    const canvas = document.getElementById('chart-by-theme');
    if (!canvas) return;

    // Prefer aggregating from per-session breakdowns (accurate by question).
    const themeMap = {};
    (stats.sessions || []).forEach(session => {
        if (session.themeBreakdown && Object.keys(session.themeBreakdown).length) {
            for (const t in session.themeBreakdown) {
                if (!themeMap[t]) themeMap[t] = { total: 0, correct: 0 };
                themeMap[t].total += session.themeBreakdown[t].total || 0;
                themeMap[t].correct += session.themeBreakdown[t].correct || 0;
            }
        } else {
            // Fallback: try to infer from session.themes/session.theme (evenly split)
            let themes = [];
            if (Array.isArray(session.themes) && session.themes.length) themes = session.themes.slice();
            else if (typeof session.theme === 'string' && session.theme.trim().length) {
                themes = session.theme.split(',').map(s => s.trim()).filter(s => s.length > 0);
            }
            if (themes.length === 0) themes = ['mixed'];
            const n = themes.length;
            const perTotal = (session.totalQuestions || 0) / n;
            const perCorrect = (session.score || 0) / n;
            themes.forEach(t => {
                if (!themeMap[t]) themeMap[t] = { total: 0, correct: 0 };
                themeMap[t].total += perTotal;
                themeMap[t].correct += perCorrect;
            });
        }
    });

    const labels = Object.keys(themeMap);
    const data = labels.map(theme => {
        const t = themeMap[theme];
        return t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
    });

    const colors = [
        '#6c63ff', '#ff6b9d', '#00d4ff', '#ffa500', '#4ade80',
        '#f43f5e', '#06b6d4', '#eab308', '#ec4899', '#8b5cf6'
    ];

    if (window.themeChart) {
        window.themeChart.destroy();
    }

    window.themeChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderColor: '#1e1e2e'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: { color: '#e4e4e7' }
                }
            }
        }
    });
}

// Tableau détail par thème
function renderThemeTable(stats) {
    // Per user request: remove detailed per-theme table. Clear the container.
    const container = document.getElementById('theme-stats-table');
    if (!container) return;
    container.innerHTML = '';
}

// Afficher les erreurs à réviser
function renderErrorsList() {
    const container = document.getElementById('errors-list');
    if (!container) return;
    
    const stats = loadStats();
    const errors = Object.keys(stats.errors || {}).map(key => ({
        ...stats.errors[key],
        id: key
    }));
    
    if (errors.length === 0) {
        container.innerHTML = '<p style="color:#a1a1aa;">Aucune erreur à réviser pour le moment. Continuez vos quiz!</p>';
        return;
    }
    
    let html = '<div class="errors-grid">';
    
    errors.forEach(error => {
        html += `
            <div class="error-card">
                <div class="error-header">
                    <span class="error-badge">Ancienne erreur</span>
                    <span class="error-theme">${error.theme}</span>
                    <span class="error-count" style="margin-left:auto;background:#2b2b3d;color:#fff;padding:0.2rem 0.5rem;border-radius:6px;font-size:0.85rem;">Échecs: ${error.failCount}</span>
                </div>
                <p class="error-question">${escapeHtml(error.questionText)}</p>
                <div class="error-stats">
                    <span>Succès: ${error.successCount}</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Afficher l'historique
function renderHistory(stats) {
    const container = document.getElementById('history-list');
    if (!container) return;
    
    const sessions = (stats.sessions || []).slice().reverse().slice(0, 10);
    
    if (sessions.length === 0) {
        container.innerHTML = '<p style="color:#a1a1aa;">Aucune session enregistrée.</p>';
        return;
    }
    
    let html = '<div class="history-list">';
    
    sessions.forEach(session => {
        html += `
            <div class="history-item">
                <div class="history-date">${session.dateStr}</div>
                <div class="history-theme">${session.theme}</div>
                <div class="history-result">${session.score}/${session.totalQuestions}</div>
                <div class="history-rate"><strong>${session.rate}%</strong></div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Injecter des questions d'erreurs anciennes dans un quiz
function injectErrorsIntoQuiz(currentQuestions, theme, percent=20) {
    const errors = getErrorsToReview();
    const errorQuestions = errors.filter(e => e.theme === theme || !theme);

    if (errorQuestions.length === 0 || percent <= 0) return currentQuestions;

    // Injecter un pourcentage configurable des questions (par défaut 20%)
    const desiredCount = Math.ceil(currentQuestions.length * (percent / 100));
    const toInject = errorQuestions.slice(0, Math.min(desiredCount, errorQuestions.length));

    toInject.forEach(error => {
        const originalQuestion = formulesData.find(q => q.id == error.questionId);
        if (originalQuestion) {
            const injectedQuestion = {
                ...originalQuestion,
                isOldError: true,
                errorData: error
            };
            currentQuestions.push(injectedQuestion);
        }
    });

    return currentQuestions;
}

// Afficher un badge pour les questions d'erreur
function getQuestionBadge(question) {
    if (question.isOldError) {
        return '<span class="error-badge-in-quiz">Ancienne erreur</span>';
    }
    return '';
}

// Initialiser le système de stats
function initStats() {
    const statsTab = document.getElementById('stats');
    if (!statsTab) return;
    
    // Bouton pour afficher/cacher la liste des erreurs (ne supprime rien)
    const toggleErrorsBtn = document.getElementById('toggle-errors');
    const errorsListDiv = document.getElementById('errors-list');
    if (toggleErrorsBtn && errorsListDiv) {
        toggleErrorsBtn.addEventListener('click', function() {
            if (errorsListDiv.style.display === 'none' || !errorsListDiv.style.display) {
                // Show and render errors
                renderErrorsList();
                errorsListDiv.style.display = 'block';
                this.textContent = 'Masquer les erreurs';
            } else {
                errorsListDiv.style.display = 'none';
                this.textContent = 'Afficher les erreurs';
            }
        });
    }
    
    // Afficher les stats au chargement
    renderStats();

    // Gestion suppression des données (select + bouton en bas de la page)
    const deleteBtn = document.getElementById('delete-data-btn');
    const deleteSelect = document.getElementById('delete-data-select');
    if (deleteBtn && deleteSelect) {
        deleteBtn.addEventListener('click', function() {
            const choice = deleteSelect.value;
            const stats = loadStats();
            if (choice === 'sessions') {
                showConfirmBox('Supprimer toutes les sessions (historique) ?', function() {
                    stats.sessions = [];
                    stats.totalQuestions = 0;
                    stats.totalCorrect = 0;
                    saveStats(stats);
                    renderStats();
                    alert('Suppression effectuée.');
                }, function() {});
                return;
            } else if (choice === 'errors') {
                showConfirmBox('Supprimer toutes les erreurs enregistrées ?', function() {
                    stats.errors = {};
                    saveStats(stats);
                    renderStats();
                    alert('Suppression effectuée.');
                }, function() {});
                return;
            } else if (choice === 'all') {
                showConfirmBox('Réinitialiser toutes les statistiques (sessions + erreurs) ?', function() {
                    stats.sessions = [];
                    stats.errors = {};
                    stats.totalQuestions = 0;
                    stats.totalCorrect = 0;
                    saveStats(stats);
                    renderStats();
                    alert('Suppression effectuée.');
                }, function() {});
                return;
            }
        });
    }
}

// Écouter les changements d'onglets pour afficher les stats
document.addEventListener('DOMContentLoaded', function() {
    const statsBtn = document.querySelector('[data-tab="stats"]');
    if (statsBtn) {
        statsBtn.addEventListener('click', function() {
            setTimeout(() => renderStats(), 100);
        });
    }
    
    initStats();
});