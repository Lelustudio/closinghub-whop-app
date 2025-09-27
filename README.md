# ClosingHub - Whop App

Une application Whop pour connecter les Closers et les Entrepreneurs.

## 🚀 Fonctionnalités

- ✅ **Design professionnel** avec fond orange-noir-orange
- ✅ **Formulaires fonctionnels** (closer + entreprise)
- ✅ **Icônes personnalisées** 
- ✅ **Validation des données**
- ✅ **Interface responsive**
- ✅ **Messagerie privée** avec Whop
- ✅ **CTA Hire/Apply** avec envoi automatique
- ✅ **Gestion des conversations**
- ✅ **Templates de messages** personnalisés
- ✅ **Déploiement v0.1.1** - Toutes les phases terminées

## 🛠️ Technologies

- **Next.js 15** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Whop SDK** - Intégration Whop
- **Zod** - Validation des formulaires

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   ├── FormCloser.tsx   # Formulaire Closer
│   └── FormEntreprise.tsx # Formulaire Entreprise
├── lib/                 # Utilitaires
└── types/               # Types TypeScript

app/
├── closer/              # Pages Closer
├── entreprise/          # Pages Entreprise
└── api/                 # API Routes
```

## 🚀 Déploiement

Cette app est configurée pour être déployée sur Netlify avec un déploiement automatique depuis GitHub.

### Variables d'environnement

```env
WHOP_API_KEY=your_whop_api_key
NEXT_PUBLIC_WHOP_APP_ID=your_app_id
NEXT_PUBLIC_WHOP_AGENT_USER_ID=your_agent_user_id
NEXT_PUBLIC_WHOP_COMPANY_ID=your_company_id
```

## 📝 Pages disponibles

- `/` - Page d'accueil
- `/closer/create-profile` - Formulaire Closer
- `/entreprise/create-offer` - Formulaire Entreprise

## 🎨 Design

- **Fond** : Gradient orange-noir-orange (#FF4500 → #000000 → #FF4500)
- **Cartes** : Gradient noir avec transparence
- **Boutons** : Vert (#00FF04) avec gradient
- **Police** : Inter
- **Rayon** : 25px

## 🔧 Développement local

```bash
npm install
npm run dev
```

L'app sera disponible sur http://localhost:3000