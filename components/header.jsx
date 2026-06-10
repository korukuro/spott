"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, UserButton, Show, useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "../hooks/useStoreUserEffect";
import { Badge, Building, Crown, Plus, Ticket, User } from "lucide-react";
import OnboardingModal from "./onboarding-modal";
import { useOnboarding } from "../hooks/use-onboarding";
import SearchLocationBar from "./search-location-bar";
import UpgradeModal from "./upgrade-modal";

const Header = () => {
  const { isLoading, isAuthenticated } = useStoreUser();
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);
  const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
    useOnboarding();

    const {has} = useAuth();
    const hasPro = has?.({plan: "pro"});
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* logo */}
          <Link href={"/"} className="flex items-center">
            <Image
              src="/spott.png"
              alt="Spott Logo"
              width={500}
              height={500}
              className="w-full h-11"
              priority
            />

            {/* Pro plan */}
            {hasPro && (
                <Badge className="bg-linear-to-r from-pink-500 to-orange-500 gap-1 text-white ml-3">
                    <Crown className="w-3 h-3"/>
                        Pro
                </Badge>
            )}
          </Link>
            {/* Search & Location - Desktop Only */}
            <div className="hidden md:flex flex-1 justify-center"><SearchLocationBar/></div>

          <div className="flex items-center">
            {!hasPro && (<Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUpgradeModal(true)}
            >
                Pricing
            </Button>)}
            <Button variant="ghost" size="sm" asChild className={"mr-2"}>
              <Link href="/explore">Explore</Link>
            </Button>
            <Show when="signed-in">
              <Button size="sm" asChild className="flex gap-2 mr-4">
                <Link href="/create-event">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Event</span>
                </Link>
              </Button>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Tickets"
                    labelIcon={<Ticket size={16} />}
                    href="/my-tickets"
                  />
                  <UserButton.Link
                    label="My Profile"
                    labelIcon={<Building size={16} />}
                    href="/profile"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </Show>
          </div>
        </div>

        {/* Mobile search & Location - below header */}
        <div className="md:hidden border-t px-3 py-3">
            <SearchLocationBar/>
        </div>

        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width={"100%"} color="#3b82f6" />
          </div>
        )}
      </nav>

      {/* Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingSkip}
        onComplete={handleOnboardingComplete}
      />
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        trigger="header"
      />
    </>
  );
};

export default Header;
