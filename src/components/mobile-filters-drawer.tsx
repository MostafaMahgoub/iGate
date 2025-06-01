"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type React from "react";

interface MobileFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function MobileFiltersDrawer({
  isOpen,
  onClose,
  title,
  children,
}: MobileFiltersDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="w-[85vw] sm:w-[385px] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="font-philosopher text-xl">
            {title}
          </DrawerTitle>
        </DrawerHeader>
        <div className="mt-6">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
