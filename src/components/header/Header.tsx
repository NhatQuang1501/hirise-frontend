import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NotificationPopover } from "@/components/notification/NotificationPopover";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/jobs", label: "Jobs" },
    { path: "/companies", label: "Companies" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="max-w-10xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="HiRise Logo" className="h-8 w-auto" />
              <span className="text-primary text-xl font-bold">HiRise</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="ml-12 hidden items-center space-x-10 md:flex">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative py-2 transition-colors",
                    isActiveRoute(link.path)
                      ? "text-primary before:bg-primary font-semibold before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full"
                      : "text-foreground hover:text-primary before:bg-primary before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:scale-x-0 before:transition-transform hover:before:scale-x-100",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Notification */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <NotificationPopover />
          </div>
          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login">
              <Button variant="ghost" className="bg-primary hover:bg-secondary text-white">
                Login
              </Button>
            </Link>
            {/* <Link to="/register">
              <Button variant="default" className="bg-primary hover:bg-secondary text-white">
                Register
              </Button>
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-foreground hover:bg-muted-foreground/20 hover:text-muted-foreground inline-flex items-center justify-center rounded-md p-2 focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {isMenuOpen ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-2 px-4 pt-2 pb-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block py-2 text-base font-medium",
                  isActiveRoute(link.path) ? "text-primary" : "text-foreground hover:text-primary",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col space-y-2">
              <Link
                to="/login"
                className="bg-primary hover:bg-secondary w-full rounded-md py-2 text-center text-base font-medium text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              {/* <Link
                to="/register"
                className="bg-primary hover:bg-secondary w-full rounded-md py-2 text-center text-base font-medium text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
