"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

// Définition des items du menu
const navItems = [
  {
    label: "ACCUEIL",
    href: "https://www.ecoledunumerique.re/",
    color: "text-teal-500 font-semibold hover:text-teal-400 bg-clip-text",
    hex: "#20b6b5",
  },
  {
    label: "Les parcours",
    color: "text-teal-500 bg-clip-text cursor-pointer",
    href: "https://www.ecoledunumerique.re/",
    hex: "#20b6b5",
    children: [
      {
        label: "[Bac+ 2] TP – Technicien Supérieur Systèmes et Réseaux",
        href: "https://www.ecoledunumerique.re/les-parcours__trashed/technicien-superieur-systemes-et-reseaux/",
      },
      {
        label: "[Bac +2] BTS Communication",
        href: "https://www.ecoledunumerique.re/les-parcours__trashed/bts-communication/",
      },
      {
        label: "[Bac+3] Bachelor Chef de Projet Web et Stratégie Digitale",
        href: "https://www.ecoledunumerique.re/les-parcours__trashed/bachelor-digital-cpw-2/",
      },
      {
        label: "[Bac+3] Concepteur Développeur Web Full Stack",
        href: "https://www.ecoledunumerique.re/les-parcours__trashed/concepteur-developpeur-web-full-stack/",
      },
      {
        label:
          "[Bac+3] Bachelor Administrateur Systèmes, Réseaux et Cybersécurité",
        href: "https://www.ecoledunumerique.re/les-parcours__trashed/administrateur-systemes-reseaux-cybersecurite/",
      },
      {
        label: "[Bac+5] Manager Marketing Digital et Communication",
        href: "https://www.ecoledunumerique.re/manager-marketing-digital-et-communication/",
      },
      {
        label: "[Bac+5] Expert Réseaux, Infrastructures et Sécurité",
        href: "https://www.ecoledunumerique.re/les-parcours__trashed/expert-reseaux-infrastructure-securite/",
      },
      {
        label: "[Bac+5] Expert en Architecture et Développement Logiciel",
        href: "https://www.ecoledunumerique.re/les-parcours__trashed/expert-architecture-et-developpement-logiciel/",
      },
    ],
  },
  {
    label: "Contacter l’EDN",
    color: "text-blue-600 bg-clip-text cursor-pointer",
    href: "https://www.ecoledunumerique.re/contact-ecole-du-numerique-la-reunion/",
    hex: "#373cf5",
    children: [
      {
        label: "Professionnel ou étudiant ? Contactez nous !",
        href: "https://www.ecoledunumerique.re/alternance-numerique-a-la-reunion-etudiants-entreprises-edn/",
      },
      {
        label: "Les aides pour les entreprises et collectivités",
        href: "https://www.ecoledunumerique.re/contact-ecole-du-numerique-la-reunion/lapprentissage-avantages-pour-lentreprise/",
      },
      {
        label: "Résultats & Performances",
        href: "https://www.ecoledunumerique.re/resultats-performances/",
      },
      {
        label: "Réclamations & Difficultés",
        href: "https://www.ecoledunumerique.re/reclamations-difficultes/",
      },
    ],
  },
  {
    label: "L’École Du Numérique",
    color: "text-blue-600 bg-clip-text cursor-pointer",
    hex: "#373cf5",
    href: "https://www.ecoledunumerique.re/ecole-du-numerique/",
    children: [
      {
        label: "Actualités",
        href: "https://www.ecoledunumerique.re/ecole-du-numerique/actualites/",
      },
      {
        label: "Focus Apprenti",
        href: "https://www.ecoledunumerique.re/ecole-du-numerique/actualites/focus-apprenti/",
      },
      {
        label: "Les différents types d’alternance et les rémunérations",
        href: "https://www.ecoledunumerique.re/lalternance/",
      },
      {
        label: "Ma formation, mon métier",
        href: "https://www.ecoledunumerique.re/ecole-du-numerique/ma-formation-mon-metier/",
      },
    ],
  },
  {
    label: "Admission",
    href: "https://www.ecoledunumerique.re/admission/",
    color: "text-blue-600 hover:text-blue-500 bg-clip-text cursor-pointer",
  },
];

export default function NavBar() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {navItems.map((item, i) => (
          <NavigationMenuItem key={i}>
            {item.children ? (
              <>
                <NavigationMenuTrigger
                  className={item.color}
                  style={{
                    color: item.hex,
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}>
                  <Link
                    to={item.href ?? "#"}
                    className={`${item.color} `}>
                    {item.label}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className=" bg-white p-2"
                  style={{
                    borderRadius: "0px",
                    marginTop: "22px",
                    boxShadow: "none",
                    borderTop: "3px solid #c8d300",
                    width: "200px",
                  }}>
                  <ul className="flex flex-col">
                    {item.children.map((child, j) => (
                      <li
                        key={j}
                        className="px-2">
                        <NavigationMenuLink asChild>
                          <Link
                            to={child.href}
                            className="block text-sm "
                            style={{ borderRadius: "0px", fontSize: "12px" }}>
                            {child.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  to={item.href ?? "#"}
                  className={`${item.color} `}
                  style={{ fontSize: "13px", fontWeight: "bold" }}>
                  {item.label}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
