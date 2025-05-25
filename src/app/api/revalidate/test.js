// Script pour tester la revalidation localement
// Usage: node src/app/api/revalidate/test.js

const BASE_URL = process.env.PORTFOLIO_BASE_URL || "http://localhost:3000";
const SECRET = process.env.REVALIDATE_SECRET || "SAIBOU_2002France$";

async function testRevalidation() {
  // Chemins à tester
  const paths = ["/", "/experience", "/projects"];
  
  const url = `${BASE_URL}/api/revalidate?secret=${SECRET}`;
  
  console.log(`🚀 Envoi d'une requête de revalidation à ${url}`);
  console.log(`📂 Chemins à revalider: ${paths.join(", ")}`);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paths }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log("✅ Revalidation réussie!");
      console.log(`📝 Réponse: `, data);
    } else {
      console.error("❌ Échec de la revalidation");
      console.error(`📝 Réponse: `, data);
    }
  } catch (error) {
    console.error("❌ Erreur lors de la requête:");
    console.error(error);
  }
}

testRevalidation();

// Instructions pour l'utilisation:
/*
Pour exécuter ce script:
1. Assurez-vous que votre serveur Next.js est en cours d'exécution
2. Exécutez: node src/app/api/revalidate/test.js

Vous pouvez aussi l'utiliser avec des variables d'environnement:
PORTFOLIO_BASE_URL=https://votre-site.com REVALIDATE_SECRET=votre_secret node src/app/api/revalidate/test.js
*/ 