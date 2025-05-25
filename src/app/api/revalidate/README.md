# API de Revalidation pour le Portfolio

Cette API permet de revalider les pages statiques du portfolio lorsque le contenu est mis à jour via le dashboard d'administration.

## Configuration

### Variables d'Environnement

Vous devez configurer les variables d'environnement suivantes dans votre fichier `.env.local` et sur votre plateforme d'hébergement (comme Vercel) :

```env
# Secret utilisé pour la revalidation (identique à celui du dashboard admin)
REVALIDATE_SECRET=SAIBOU_2002France$

# URL de base du portfolio (à titre informatif)
PORTFOLIO_BASE_URL=http://localhost:3000

# URI de connexion MongoDB (si nécessaire pour la récupération directe des données)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

## Utilisation

L'API de revalidation est accessible à l'URL `/api/revalidate` et attend une requête POST avec les paramètres suivants :

1. Un token secret dans l'URL : `?secret=SAIBOU_2002France$`
2. Un corps de requête JSON contenant un tableau de chemins à revalider :

```json
{
  "paths": ["/", "/experience", "/projects"]
}
```

### Exemple de requête

```bash
curl -X POST "https://votre-portfolio.com/api/revalidate?secret=SAIBOU_2002France$" \
  -H "Content-Type: application/json" \
  -d '{"paths":["/", "/experience", "/projects"]}'
```

## Sécurité

- Ne partagez jamais la valeur de `REVALIDATE_SECRET` publiquement
- Assurez-vous que cette valeur est identique dans le projet portfolio et dans le dashboard admin
- L'API vérifie ce secret à chaque requête pour garantir que seuls les clients autorisés peuvent déclencher une revalidation

## Dépannage

Si la revalidation ne fonctionne pas comme prévu :

1. Vérifiez les logs serveur pour voir si l'API de revalidation est correctement appelée
2. Assurez-vous que les chemins à revalider correspondent aux routes réelles de votre application
3. Vérifiez que les variables d'environnement sont correctement configurées
4. Confirmez que votre application utilise bien la fonctionnalité de génération statique qui peut être revalidée 