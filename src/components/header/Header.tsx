import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Trang chủ
              </Link>
              <Link to="/jobs" className="text-foreground hover:text-primary transition-colors">
                Việc làm
              </Link>
              <Link
                to="/companies"
                className="text-foreground hover:text-primary transition-colors"
              >
                Công ty
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                Giới thiệu
              </Link>
            </nav>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login">
              <Button variant="ghost" className="bg-primary hover:bg-secondary text-white">
                Đăng nhập
              </Button>
            </Link>
            {/* <Link to="/register">
              <Button variant="default" className="bg-primary hover:bg-secondary text-white">
                Đăng ký
              </Button>
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-foreground hover:bg-accent/10 hover:text-accent inline-flex items-center justify-center rounded-md p-2 focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Mở menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-2 px-4 pt-2 pb-3">
            <Link
              to="/"
              className="text-foreground hover:text-primary block py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/jobs"
              className="text-foreground hover:text-primary block py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Việc làm
            </Link>
            <Link
              to="/companies"
              className="text-foreground hover:text-primary block py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Công ty
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary block py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Giới thiệu
            </Link>
            <div className="mt-4 flex w-1/3 flex-col space-y-2">
              <Link
                to="/login"
                className="bg-primary hover:bg-secondary w-full rounded-md py-2 text-center text-base font-medium text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng nhập
              </Link>
              {/* <Link
                to="/register"
                className="bg-primary hover:bg-secondary w-full rounded-md py-2 text-center text-base font-medium text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng ký
              </Link> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
