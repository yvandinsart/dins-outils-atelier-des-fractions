# Audit et refonte pédagogique — Din’s Outils, Atelier des fractions

**Date :** 18 octobre 2026  
**Statut :** prototype sur une branche indépendante, **aucune publication sur \`main\`**.

## 1. Périmètre étudié

Analyse statique du code source \`index.html\`, du manifeste PWA, du service worker, de la structure du dépôt et de ses ressources. Cette analyse ne remplace pas un test complet sur téléphone et TBI en conditions de classe.

## 2. Fonctions actuelles à préserver

Six missions opérationnelles dans le code :
- Représenter une fraction (observation, représentation interactive de parts ou d'objets) ;
- Fractions équivalentes (activités guidées, libres et de détection) ;
- Calculer la fraction d'un nombre ;
- Fractions et pourcentages ;
- Additionner des fractions ;
- Comparer des fractions.

Sont déjà présents : fraction scolaire à barre horizontale, visuels, messages d'aide/correction, paramètres mobiles, PWA installable, contrôles clavier partiels, libellés ARIA et prise en compte des mouvements réduits.

## 3. Lacunes confirmées dans la version publiée

| Domaine | Constat | Priorité |
| --- | --- | --- |
| Découverte | Pas de vidéo ni de parcours introductif dans le HTML actuel. | P1 |
| Évaluation | Pas de diagnostic global adaptatif initial. | P1 |
| Remédiation | Les aides sont propres à certains ateliers ; pas de bilan ciblé intermodules. | P1 |
| Progression | Pas de sauvegarde locale ni d'espace de suivi des acquis dans le code existant. | P2 |
| Maintenance | Application monolithique, HTML/CSS/JS principalement dans \`index.html\` (~271 Ko). | P2 |
| PWA | Service worker existant, mais cache à actualiser à chaque version. | P2 |
| Média | Vidéo de référence non encore stockée dans ce dépôt. | P1 |

## 4. Contenu de la branche prototype

Le prototype ajoute \`parcours-pedagogique.css\` et \`parcours-pedagogique.js\` sans supprimer aucun atelier.

Parcours :
1. **Je découvre** : lecteur vidéo de la vidéo maître, sous réserve de placer le MP4 à l'emplacement prévu.
2. **Je manipule** : accès à la mission de représentation déjà présente.
3. **Je m'évalue** : huit questions de diagnostic couvrant parts égales, écriture des fractions, équivalences, comparaison, fraction d'un nombre, pourcentages.
4. **Je progresse** : une question plus simple est insérée après la première erreur d'un domaine ; le bilan redirige vers les modules existants.

Les résultats du prototype restent uniquement en mémoire pendant la session. Aucun compte, stockage, trace nominative, envoi réseau ou suivi persistant n'a été ajouté.

## 5. Vidéo à placer avant intégration finale

Emplacement attendu : \`assets/videos/quest-ce-quune-fraction.mp4\`.

Le MP4 final validé existe dans les pièces fournies pendant la conversation, mais **n'a pas encore été déposé dans le dépôt GitHub**, en raison de la limite de transfert binaire de l'outil de modification du dépôt utilisé ici.

Le prototype signale explicitement l'absence du média si le fichier n'est pas trouvé. **Ne pas fusionner la branche en production avant d'avoir ajouté la vidéo et vérifié sa lecture.**

Le fichier final doit conserver la voix masculine validée et la prononciation **« Din’s Outi »**, sans consonne finale « z ».

## 6. Vérifications à effectuer avant validation

- Lire entièrement la vidéo sur Windows, mobile et TBI, avec volume et sous-titres si nécessaires.
- Tester une série de huit bonnes réponses et une série de réponses erronées (questions supplémentaires, score et remédiation).
- Tester les boutons d'accès aux missions et le retour vers la vidéo.
- Vérifier sur mobile les fractions verticales et l'absence de débordement.
- Vérifier la navigation clavier / lecteurs d'écran (y compris annonce des feedbacks).
- Effectuer une inspection du cache hors-ligne, surtout après changement de version.
- Contrôler les erreurs de console et l'absence de régression des six activités d'origine.
- Faire valider par l'enseignant la progression et les explications pédagogiques.

## 7. Après la validation du prototype

1. Ajouter le média vidéo au dépôt.
2. Corriger les éventuels défauts lors des tests réels.
3. Réaliser une harmonisation visuelle progressive des six ateliers, sans rupture fonctionnelle.
4. Renforcer le diagnostic (niveau adaptatif, typologie d'erreurs, aides illustrées).
5. Proposer, si demandé, une sauvegarde locale respectueuse des données des élèves.
6. Demander l'accord explicite avant toute fusion vers la branche publiée.

Ce document décrit une **préversion non validée pédagogiquement et non publiée**.
