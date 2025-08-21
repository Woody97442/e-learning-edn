"use client";

import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/getFormationList.json") // à remplacer par la vraie route de votre API
      .then((res) => res.json())
      .then((data: Formation[]) => setFormations(data));
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-[calc(100vh-160px)]">
      {/* Bouton hamburger visible que sur mobile */}
      <Button
        className="md:hidden m-2 fixed top-20 -left-6 z-40"
        onClick={() => setIsOpen(!isOpen)}>
        <span className="text-xl font-bold translate-x-2">{">"}</span>
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r transform transition-transform duration-300 z-50 md:z-40 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:h-auto md:flex md:flex-col md:w-48`}>
        {/* Header */}
        <div className="p-4">
          <h2 className="text-lg text-center font-semibold edn-color-primary">
            Formations
          </h2>
          <Separator className="mt-2" />
        </div>

        {/* Scrollable area */}
        <ScrollArea className="flex-1 px-2">
          <Accordion
            type="single"
            collapsible
            className="w-full ">
            {formations.map((formation) => (
              <AccordionItem
                key={formation.id}
                value={String(formation.id)}
                className="border-none py-1">
                <AccordionTrigger className="edn-color-primary cursor-pointer bg-gray-100 rounded-none px-2 py-2 text-sm hover:no-underline">
                  {formation.title}
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="pl-2 space-y-1 edn-color-primary my-2">
                    {formation.modules.map((module) => {
                      const active = location.pathname === module.href;
                      return (
                        <Link
                          key={module.id}
                          to={module.href}
                          className={`block rounded-none px-2 py-2 text-sm edn-color-primary hover:underline ${
                            active ? "bg-gray-100 font-medium" : ""
                          }`}>
                          {module.title}
                        </Link>
                      );
                    })}
                  </nav>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>

        {/* Fixed bottom area */}
        <div className="flex flex-col border-t p-4 space-y-2 fixed bottom-0 w-full">
          <Link
            to="/badges"
            className="edn-color-primary cursor-pointer bg-gray-100 rounded-none px-2 py-2 text-sm hover:no-underline">
            Mes Badges
          </Link>
          <Button
            variant="edn_hover"
            className="cursor-pointer"
            onClick={() => {
              handleLogout();
            }}>
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Un overlay sombre quand la sidebar est ouverte sur mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        <Outlet />
      </main>
    </div>
  );
}
