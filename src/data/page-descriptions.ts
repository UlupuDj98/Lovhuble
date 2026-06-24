export const pageDescriptions: Record<string, string> = {
  // Categorie principali
  'sex-toys':
    "Vibratori, dildo, masturbatori e molto altro: una selezione accurata pensata per soddisfare ogni desiderio, da solo o in compagnia.",
  'abbigliamento':
    "Lingerie, body, costumi e accessori sensuali scelti per valorizzare il corpo e accendere la fantasia in ogni occasione.",
  'bdsm':
    "Kit bondage, costrittivi, strumenti di impatto e accessori per chi vuole esplorare il piacere con consapevolezza e rispetto.",
  'salute-benessere':
    "Lubrificanti, oli da massaggio e prodotti per la cura del corpo: tutto il necessario per vivere la sessualità in modo sano e piacevole.",
  'giochi':
    "Giochi da tavolo erotici, gadget e kit pensati per animare le serate di coppia e rompere la routine con creatività e leggerezza.",
  'bambole':
    "Bambole realistiche di alta qualità per un’esperienza sensoriale autentica, con materiali sicuri e finiture curate nel dettaglio.",

  // Categorie cross-cutting
  'best-seller':
    "I prodotti più amati dai nostri clienti: i più venduti, i più votati, quelli che parlano da soli.",
  'novita':
    "Le ultime novità appena arrivate in catalogo: sii il primo a scoprire prodotti inediti e tendenze del momento.",
  'offerte':
    "Prezzi ridotti su una selezione di prodotti scelti: il modo migliore per scoprire nuove esperienze senza rinunciare alla qualità.",

  // Subcategorie — Sex Toys
  'sex-toys-donna':
    "Vibratori clitoridei, rabbit, stimolatori punto G e tutto ciò che è pensato per il piacere femminile.",
  'sex-toys-uomo':
    "Masturbatori, stroker, anelli e dispositivi progettati per amplificare il piacere maschile.",
  'sex-toys-coppia':
    "Vibratori telecomandati, anelli vibranti e toy pensati per essere vissuti in due, arricchendo ogni momento di intimità.",

  // Subcategorie — Abbigliamento
  'lingerie-classica':
    "Reggiseni, slip, completi e babydoll in pizzo, satin e chiffon per sentirsi irresistibili ogni giorno.",
  'sexy-apparel':
    "Body, corsetti, tute e capi che esaltano le forme con un tocco provocante e raffinato.",
  'accessori-lingerie':
    "Calze, giarrettiere, guanti e complementi per completare ogni look con sensualità e stile.",
  'costumi-roleplay':
    "Costumi a tema, uniformi e outfit per il gioco di ruolo erotico: dai classici alle fantasie più originali.",

  // Subcategorie — BDSM
  'bondage':
    "Corde, manette, bende e kit di immobilizzazione per esplorare il bondage in sicurezza, dal livello base all’avanzato.",
  'impatto-sensazione':
    "Frustate, paddle, piume e strumenti di sensazione per chi vuole giocare con intensità e controllo.",
  'mobili-attrezzature':
    "Croci, sgabelli, barre di posizionamento e accessori strutturali per chi vuole portare l’esperienza BDSM a un livello superiore.",

  // Subcategorie — Salute e Benessere
  'lubrificanti':
    "Lubrificanti a base acqua, silicone e ibridi: compatibilità garantita con i materiali dei tuoi toy per il massimo comfort.",
  'massaggio':
    "Oli sensuali, candele da massaggio e set pensati per trasformare ogni tocco in un momento di puro piacere.",
  'cura-corpo':
    "Detergenti intimi, toy cleaner e prodotti per la cura personale: igiene e benessere prima di tutto.",

  // Subcategorie — Giochi e Gadget
  'giochi-tavolo':
    "Carte, dadi e giochi da tavolo erotici per rompere il ghiaccio e stimolare la complicità di coppia.",
  'gadget-regali':
    "Gadget originali, kit sorpresa e idee regalo per addii al celibato, compleanni o semplicemente per stupire.",
};

export function getPageDescription(slug: string): string | undefined {
  return pageDescriptions[slug];
}
