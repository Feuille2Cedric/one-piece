<div align="center">
  <img src="assets/jolly-roger.svg" width="112" alt="Emblème de Grand Line Quiz">
  <h1>Grand Line Quiz</h1>
  <p><strong>10 000 questions françaises pour conquérir l’univers de One Piece.</strong></p>
  <p>Quiz classique, défis rapides, survie tactique, défi quotidien et memory local à deux joueurs.</p>

  <p><strong><a href="https://feuille2cedric.github.io/one-piece/">Jouer en ligne</a></strong></p>
</div>

## Lancer le jeu

Ouvrir simplement `index.html` dans un navigateur récent. Aucun compte, serveur ou programme d’installation n’est nécessaire. Les scores, classements et rangs sont conservés dans le navigateur sous la clé indépendante `onePieceQuizStats`.

## Modes disponibles

| Mode | Format | Particularité |
|---|---|---|
| **Route de Grand Line** | 5 à 50 questions, quatre choix | Série multiplicatrice, bonus de rapidité calculé au dixième de seconde, trois pouvoirs et cinq Top 10 |
| **Gear Rush** | 60 secondes, deux choix | Une bonne réponse ajoute 3 secondes, une erreur en retire 4, multiplicateur jusqu’à ×4 |
| **Guerre au Sommet** | 12 adversaires, 5 vies | Choix tactique avant chaque réponse : offensive, équilibre ou observation |
| **Log Pose du jour** | 7 questions quotidiennes | Parcours identique durant toute la journée avec difficulté ascendante |
| **Den Den Vrai / Faux** | 15 messages, 3 erreurs maximum | Transformer un fait du quiz en affirmation à confirmer ou rejeter |
| **Memory du Sunny 1V1** | 6, 8, 10 ou 12 paires | Deux joueurs locaux ; une paire trouvée reste visible et permet de rejouer |

Les tirages interdisent deux réponses identiques dans une même partie. Le Memory reste limité à quatre lignes : le nombre de colonnes augmente avec la difficulté.

## Banque de questions

`wiki-bank.js` contient littéralement **10 000 lignes-question distinctes** :

| Difficulté | Questions |
|---|---:|
| Facile | 3 000 |
| Moyen | 3 000 |
| Difficile | 2 500 |
| Impossible | 1 500 |
| **Total** | **10 000** |

Chaque entrée comprend une formulation française, une réponse exacte, quatre propositions différentes, une explication, une signature unique et l’adresse de la fiche source. Les thèmes couvrent l’histoire, les personnages, Fruits du Démon, lieux, équipages, organisations, techniques, objets, navires et éléments d’univers.

La banque contient **8 000 questions narratives** qui interrogent sur une action, un personnage, un lieu, un groupe ou un élément précis de l’histoire. Elles exploitent aussi les sous-pages `/Histoire` des personnages. Aucun énoncé narratif ne contient de blanc `[…]` ni l’ancien gabarit répétitif « au cœur de cette scène ». Le générateur corrige les articles autour du terme masqué et choisit une interrogation adaptée à la nature réelle de la réponse. Les distracteurs sont regroupés par type et les noms propres conservent tous une capitalisation cohérente : la bonne réponse ne peut pas être reconnue grâce à sa seule majuscule.

Chaque difficulté contient désormais tous les thèmes disponibles. Lorsque plusieurs catégories sont sélectionnées, le tirage les distribue équitablement au lieu de reproduire les proportions brutes de la banque. Au sein de la catégorie Histoire, il alterne également personnages, lieux, groupes, éléments et événements. Les réponses récurrentes et les héros principaux restent favorisés dans les niveaux accessibles, tandis que les détails rares sont réservés aux niveaux supérieurs.

La banque est générée par `tools/build_one_piece_bank.py` depuis l’API publique de [One Piece Encyclopédie](https://onepiece.fandom.com/fr/wiki/One_Piece_Encyclop%C3%A9die). Le générateur parcourt l’index encyclopédique, extrait les sections Résumé, Histoire et Synopsis, puis exclut les contenus non canoniques, jeux vidéo, produits dérivés, pages de doublage, pages trop pauvres et doublons. Il contrôle ensuite le total, les formulations, les signatures, les quatre choix, le nettoyage du wikicode et la répartition des difficultés.

## Illustrations

Aucune image du Wiki n’est téléchargée dans le projet. Lorsque la fiche source fournit une miniature, son URL distante est conservée dans la question et l’image n’est chargée qu’après validation de la réponse. Les propositions restent uniquement textuelles.

Les deux éléments graphiques locaux sont des SVG originaux :

- `assets/jolly-roger.svg` pour l’identité du jeu ;
- `assets/luffy-gum-gum-slider-v2.png` pour la jauge de 5 à 50 questions. Cette illustration locale montre Luffy entier lançant un coup de poing élastique ; le rayon interactif est aligné sur le centre du poing après contrôle dans le navigateur.

## Progression

Les rangs utilisent la même courbe exigeante que le jeu Dragon Ball : Mousse, Matelot, Pirate d’East Blue, Supernova, Capitaine pirate, Corsaire redouté, Commandant d’Empereur, Empereur des mers, Seigneur des pirates et Roi des Pirates.

La Route de Grand Line enregistre un Top 10 général et un Top 10 séparé pour chaque difficulté. Les classements One Piece ne partagent aucune donnée avec le jeu Dragon Ball.

## Structure

```text
one piece/
├── assets/
│   ├── jolly-roger.svg
│   └── luffy-gum-gum-slider-v2.png
├── tools/
│   └── build_one_piece_bank.py
├── app.js
├── gameplay.css
├── HISTORIQUE_PROMPTS.md
├── index.html
├── one-piece.css
├── polish.css
├── questions.js
├── README.md
├── SOURCES.md
├── styles.css
└── wiki-bank.js
```

## Régénérer et vérifier

```powershell
python tools\build_one_piece_bank.py
```

Le chargement du jeu refuse automatiquement une banque qui ne contient pas exactement 10 000 questions, qui possède une signature répétée, une mauvaise répartition des difficultés ou des propositions invalides.
