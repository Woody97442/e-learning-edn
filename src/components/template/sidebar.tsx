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
      {/* Sidebar */}
      <aside className="w-48 flex flex-col border-r bg-white">
        {/* Header */}
        <div className="p-4">
          <h2 className="text-lg text-center font-semibold edn-color-primary">
            Menu
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
                className="border-none">
                <AccordionTrigger className="edn-color-primary cursor-pointer bg-gray-100 rounded-none px-2 py-2 text-sm hover:no-underline">
                  {formation.title}
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="pl-2 space-y-1 edn-color-primary">
                    {formation.modules.map((module) => {
                      const active = location.pathname === module.href;
                      return (
                        <Link
                          key={module.id}
                          to={module.href}
                          className={`block rounded-md px-2 py-2 text-sm edn-color-primary hover:underline ${
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
        <div className="flex flex-col border-t p-4 space-y-2">
          <Link
            to="/badges"
            className=" text-center edn-color-primary cursor-pointer bg-gray-100 rounded-none px-2 py-2 text-sm hover:no-underline">
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
        <Outlet />
      </main>
    </div>
  );
}
