import logo from "@/assets/images/module_icon/module_base.png";
import absences from "@/assets/images/module_icon/module_absences.png";
import bulletin from "@/assets/images/module_icon/module_bulletin.png";
import debug from "@/assets/images/module_icon/module_debug.png";
import discipline from "@/assets/images/module_icon/module_discipline.png";
import distributeurs from "@/assets/images/module_icon/module_distributeurs.png";
import evenements from "@/assets/images/module_icon/module_evenements.png";
import financier from "@/assets/images/module_icon/module_financier.png";
import fwb from "@/assets/images/module_icon/module_fwb.png";
import garderie from "@/assets/images/module_icon/module_garderie.png";
import importation from "@/assets/images/module_icon/module_import.png";
import internat from "@/assets/images/module_icon/module_internat.png";
import journauxEducateurs from "@/assets/images/module_icon/module_journaux_educateurs.png";
import journalDeClasse from "@/assets/images/module_icon/module_journal_classe.png";
import messagerie from "@/assets/images/module_icon/module_messagerie.png";
import pedagogique from "@/assets/images/module_icon/module_pedagogique.png";
import plaine from "@/assets/images/module_icon/module_plaine.png";
import pointages from "@/assets/images/module_icon/module_pointage.png";
import ramassages from "@/assets/images/module_icon/module_ramassage.png";
import reunionParents from "@/assets/images/module_icon/module_reunions_parents.png";
import reservationLocaux from "@/assets/images/module_icon/module_locaux.png";
import retards from "@/assets/images/module_icon/module_retards.png";
import repas from "@/assets/images/module_icon/module_repas.png";
import suiviPedagogique from "@/assets/images/module_icon/module_suivi_pedagogique.png";
import valvesNews from "@/assets/images/module_icon/module_valves.png";
import webshop from "@/assets/images/module_icon/module_webshop.png";


export const categoryColors = {
    'New feature': 'gradientColors.newFeatureEnd',
    'Improvement': 'gradientColors.updateEnd',
    'Bug fix': 'gradientColors.bugFixEnd',
    'Other': 'gradientColors.otherEnd',
    // Add more category-color mappings here
};
export const moduleColors = {
    'New feature': 'gradientColors.newFeatureStart',
    'Improvement': 'gradientColors.updateStart',
    'Bug fix': 'gradientColors.bugFixStart',
    'Other': 'gradientColors.otherStart',
    // Add more category-color mappings here
};

export const categoryGradients = {
    'New feature': `linear(to-r, gradientColors.newFeatureStart, gradientColors.newFeatureEnd)`,
    'Improvement':`linear(to-r, gradientColors.updateStart, gradientColors.updateEnd)`,
    'Bug fix': `linear(to-r, gradientColors.bugFixStart, gradientColors.bugFixEnd)`,
    'Other': `linear(to-r, gradientColors.otherStart, gradientColors.otherEnd)`,
    // Add more category-color mappings here
};
export const TextGradients = {
    'New feature': `linear(to-b, gradientColorsTransparent.newFeatureStart, gradientColorsTransparent.newFeatureEnd)`,
    'Improvement':`linear(to-b, gradientColorsTransparent.updateStart, gradientColorsTransparent.updateEnd)`,
    'Bug fix': `linear(to-b, gradientColorsTransparent.bugFixStart, gradientColorsTransparent.bugFixEnd)`,
    'Other': `linear(to-b, gradientColorsTransparent.otherStart, gradientColorsTransparent.otherEnd)`,
    // Add more category-color mappings here
};

export const moduleIcons = {
    'Base': logo,
    'Messagerie': messagerie,
    'Réservation locaux': reservationLocaux,
    'Valves et news': valvesNews,
    'Distributeurs': distributeurs,
    'Évènements': evenements,
    'Plaines': plaine,
    'Garderie': garderie,
    'Internat': internat,
    "Repas": repas,
    "Webshop": webshop,
    "Financier": financier,
    "Coda": logo,
    "Pédagogique": pedagogique,
    "Discipline": discipline,
    "Absences": absences,
    "Bulletin": bulletin,
    "Suivi pédagogique": suiviPedagogique,
    "Réunions parents": reunionParents,
    "Journal de classe": journalDeClasse,
    "Ramassages": ramassages,
    "Pointages": pointages,
    "ISBW": logo,
    "Importation": importation,
    "Retards": retards,
    "Debug": debug,
    "Journaux éducateurs": journauxEducateurs,
    "FWB": fwb,
};