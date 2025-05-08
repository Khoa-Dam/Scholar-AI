"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  BookOpen,
  Flag,
  DollarSign,
  CreditCard,
  MessageCircle,
  X,
  Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants";
import { ConnectKitButton } from "connectkit";

interface SidebarProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Sidebar({
  isMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Profile", href: ROUTES.Profile, icon: User },
    { label: "Study", href: ROUTES.Study, icon: BookOpen },
    { label: "Legal", href: ROUTES.Legal, icon: Flag },
    { label: "Finance", href: ROUTES.Finance, icon: DollarSign },
    { label: "Scholar Point", href: ROUTES.Scholar_Point, icon: CreditCard },
    { label: "Rewards", href: "/rewards", icon: Gift },
  ];

  /* ----------------------- layout & animation ----------------------- */

  // ❶ Animation cho mobile
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  // ❷ Lớp CSS — fixed chỉ trên mobile, desktop ở normal flow  ★ changed
  const sidebarClasses = cn(
    "flex flex-col min-h-screen w-64 shrink-0 bg-white py-4 border-r shadow-lg text-black",
    isMobile && "fixed inset-y-0 left-0 z-50"
  );

  /* ------------------------------------------------------------------ */

  return (
    <AnimatePresence>
      {(!isMobile || (isMobile && isSidebarOpen)) && (
        <motion.div
          className={sidebarClasses}
          initial={isMobile ? "closed" : false}
          animate={isMobile ? "open" : false}
          variants={sidebarVariants}
        >
          {/* Logo + Close button ------------------------------------------------ */}
          <div className="px-6 mb-8 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-8 h-8">
                <img
                  src="/logo/logo.svg"
                  alt="Scholar AI Logo"
                  className="w-full h-full"
                />
              </div>
              <h1 className="text-xl font-bold text-black">Scholar AI</h1>
            </motion.div>

            {isMobile && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          {/* Navigation --------------------------------------------------------- */}
          <motion.nav
            className="flex-1 px-4 space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gray-200 text-black"
                        : "text-black hover:bg-gray-100"
                    )}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Footer ------------------------------------------------------------- */}
          <motion.div
            className="mt-auto px-6 pt-6 pb-4 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* User box */}
            <div className="rounded-lg mb-4">
              <ConnectKitButton />
            </div>

            {/* AI Agent - Updated with Link and onClick handler */}
            <Link href={ROUTES.Ai || "/ai"}>
              <motion.button
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-white text-red-500 border border-red-500 hover:bg-red-50 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">AI Agent</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
