import Link from "next/link";
import { AuthButton } from "../auth/AuthButton";
import { ThemeToggle } from "./ThemeToggle";
import { Layout } from "./layout";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <Layout asChild>
        <div className="mt-0 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold">
              PowerPost
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <AuthButton />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </Layout>
    </header>
  );
}
