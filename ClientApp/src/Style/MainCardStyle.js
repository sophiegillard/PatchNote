import logo from "@/assets/images/module_icon/base.png";
import messagerie from "@/assets/images/module_icon/messagerie.png";
import commande from "@/assets/images/module_icon/commande.png";
import menu from "@/assets/images/module_icon/menu.png";
import dashboard from "@/assets/images/module_icon/dashboard.png";
import livraison from "@/assets/images/module_icon/livraison.png";
import paiement from "@/assets/images/module_icon/paiement.png";
import services from "@/assets/images/module_icon/services.png";
import promotion from "@/assets/images/module_icon/promotion.png";
import légilsation from "@/assets/images/module_icon/legislation.png";
import hygiène from "@/assets/images/module_icon/hygiene.png";
import autre from "@/assets/images/module_icon/module_base.png";


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
    "Commande": commande,
    "Menu": menu,
    "Dashboard": dashboard,
    "Livraison": livraison,
    "Paiement": paiement,
    "Services": services,
    "Promotion": promotion,
    "Légilsation": légilsation,
    "Hygiène": hygiène,
    "Autre": autre
};