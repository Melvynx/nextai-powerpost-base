"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { CreditCard, LayoutDashboard, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { managePlanAction } from "./manage-plan.action";

export const UserDropdown = ({ children }: PropsWithChildren) => {
  const logout = useMutation({
    mutationFn: async () => {
      signOut();
    },
  });
  const router = useRouter();
  const managePlanMutation = useMutation({
    mutationFn: async () => {
      const url = await managePlanAction();
      router.push(url);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            managePlanMutation.mutate();
          }}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Manage plan
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              logout.mutate();
            }}
          >
            {logout.isPending ? (
              <Loader className="mr-2 h-4 w-4" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
