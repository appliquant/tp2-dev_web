/**
 * Vérifie si un des champs est vide
 * @param  {...any} champs Les champs à vérifier
 * @returns True si un des champs est vide, false sinon
 */
const verifierChamps = (...champs) => {
  let champVide = false;

  for (let i = 0; i < champs.length; i++) {
    if (champs[i] === undefined || champs[i] === "" || champs[i] === null) {
      champVide = true;
      break;
    }
  }

  return champVide;
}

module.exports = verifierChamps;