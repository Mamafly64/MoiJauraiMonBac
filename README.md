# Moi j'aurais mon bac wola

- Bibliothèque de formules et quiz conçu pour s'entraîner aux formules pour le bac de physique-chmie sti2d (formules, unités, QCM libre).
- Frontend simple HTML/CSS/JS, pas de backend. Les données et stats sont stockées localement dans `localStorage`.

**Fonctionnalités principales**
- Quiz en plusieurs modes : Complet (formule + unités), Formule seul, Unités seul, Questions de cours.
- Enregistrement de sessions et statistiques (graphique évolution, répartition par thème).
- Système basique de révision espacée : les questions ratées sont enregistrées et peuvent être réinjectées dans les quiz.

**Pour les développeurs**
- Points d'entrée : ouvrir `index.html` et modifier `data.js` pour ajouter/éditer formules.
- Transformer règles : rechercher `FORMULA_NAME_TO_SYMBOL` et `NAME_TO_SYMBOL` dans `script.js` pour ajuster les mappings nom→symbole.
- Transformations exposants : tables `FORMULA_SUP_MAP` / `SUP_MAP` (script.js).
- Modale confirm : fonction globale `showConfirmBox(message, onYes, onNo, opts)` dans `script.js` — `opts` permet de personnaliser les labels des boutons.
- Sauvegarde des erreurs : `recordQuestionError()` & `recordErrorSuccess()`.
- Injection d'erreurs : `injectErrorsIntoQuiz(currentQuestions, theme, percent)`.

