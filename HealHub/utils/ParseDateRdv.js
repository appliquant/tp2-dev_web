/**
 * Parse une date de rendez-vous au format "2020-12-31 10:00:00" en objet Date
 * @param {string} dateDebut 
 * @returns {Date} Renvoie un objet Date contenant la date et l'heure du rendez-vous
 */
const parseDateRdv = (dateDebut) => {
  const [_date, _temps] = dateDebut.split(" "); // "2020-12-31" "10:00:00"
  const [annee, mois, jour] = _date.split("-"); // 2020-12-31 -> 2020 12 31

  // Si il y a un temps, car il peut ne pas avoir de temps 
  // Dans "GET /rendezvous/medecins/:id?date=2020-12-31", il n y pas de temps
  if (_temps) {
    const [heure, minute, seconde] = _temps.split(":"); // 10:00:00 -> 10 00 00
    return new Date(annee, mois - 1, jour, heure, minute, seconde);
  }

  return new Date(annee, mois - 1, jour);
}

module.exports = parseDateRdv;