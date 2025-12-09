# 🧪 Tests - Architecture DDD

## Vue d'ensemble

Cette suite de tests est organisée selon les principes du **Domain-Driven Design (DDD)**, facilitant la maintenance et l'évolutivité.

## Structure

```
project/tests/
├── codecept.conf.js          # Configuration racine CodeceptJS
├── entrypoint.js             # Point d'entrée chargeant tous les domaines
├── _shared/                  # 🔧 Shared Kernel (utilitaires communs)
│   ├── support/              # Fonctions utilitaires
│   │   ├── assertions.js     # Assertions (fichiers, répertoires, contenu)
│   │   ├── commands.js       # Exécution de commandes shell
│   │   ├── config.js         # Configuration centralisée
│   │   ├── filesystem.js     # Opérations sur le système de fichiers
│   │   └── tables.js         # Utilitaires pour les tables Gherkin
│   ├── steps/                # Steps génériques
│   │   ├── given.js          # Steps Given partagés
│   │   ├── when.js           # Steps When partagés
│   │   └── then.js           # Steps Then partagés
│   └── index.js              # Export unifié
│
├── copier/                   # 📦 Domaine: Génération de templates
├── ansible/                  # 🔧 Domaine: Gestion de configuration
├── renovate/                 # 🔄 Domaine: Mise à jour des dépendances
└── devsecops/                # 🔐 Domaine: Phases du pipeline
```

## Principes

### 1. Organisation par domaine métier
Chaque domaine a son propre dossier autonome avec features et steps.

### 2. Shared Kernel
Les utilitaires et steps communs sont centralisés dans `_shared/`.

### 3. Bounded Contexts
Chaque domaine peut évoluer indépendamment.

### 4. Langage Ubiquitaire
Le nommage est cohérent avec le vocabulaire DevSecOps.

## Exécution

```bash
# Exécuter tous les tests
task test

# Exécuter un domaine spécifique
task test -- --grep "@copier"
task test -- --grep "@ansible"
task test -- --grep "@renovate"
task test -- --grep "@project"

# Mode TDD (watch)
task test:tdd
```

## Ajouter un nouveau domaine

1. Créer le dossier `project/tests/<domain>/`
2. Ajouter `features/` et `steps/`
3. Créer `<domain>.steps.js` qui appelle `registerSharedSteps()`
4. Ajouter le require dans `entrypoint.js`
5. Ajouter le chemin des features dans `codecept.conf.js`
6. Créer un `README.md` pour documenter le domaine

## Tags disponibles

| Tag | Description |
|-----|-------------|
| `@copier` | Tests de génération Copier |
| `@ansible` | Tests d'intégration Ansible |
| `@renovate` | Tests de configuration Renovate |
| `@project` | Tests du mode project |
| `@scaffolding` | Tests de scaffolding |
| `@default` | Tests avec paramètres par défaut |
