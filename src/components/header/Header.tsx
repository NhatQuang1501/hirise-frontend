import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/routes/routes";
import {
  Bell,
  Bookmark,
  Briefcase,
  Building,
  Check,
  Eye,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNotification } from "@/types/useNotification";
import { cn } from "@/lib/utils";
import { NotificationBadge } from "@/components/notification/NotificationBadge";
import { NotificationList } from "@/components/notification/NotificationList";
import { NotificationPopover } from "@/components/notification/NotificationPopover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import hiriseLogo from "@/assets/images/hiriseLogo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const location = useLocation();
  const { unreadCount, markAllAsRead, notifications } = useNotification();
  const { isAuthenticated, user, logout } = useAuth();

  const isActiveRoute = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getProfileLink = () => {
    if (user?.role === "company") {
      return ROUTES.COMPANY.PROFILE;
    }
    return ROUTES.APPLICANT.PROFILE;
  };

  // Get navigation links based on user role
  const getNavigationLinks = () => {
    const baseLinks = [
      { path: ROUTES.PUBLIC.HOME, label: "Home" },
      { path: ROUTES.PUBLIC.JOBS.LIST, label: "Jobs" },
      { path: ROUTES.PUBLIC.COMPANIES.LIST, label: "Companies" },
    ];

    // Add role-specific links
    if (isAuthenticated && user) {
      if (user.role === "company") {
        baseLinks.push({ path: ROUTES.COMPANY.JOBS.LIST, label: "Recruitment" });
      } else if (user.role === "applicant") {
        baseLinks.push({ path: ROUTES.APPLICANT.JOB_MANAGEMENT, label: "Job Management" });
      }
    }

    baseLinks.push({ path: ROUTES.PUBLIC.ABOUT, label: "About" });

    return baseLinks;
  };

  const navigationLinks = getNavigationLinks();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="max-w-10xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center">
            <Link to={ROUTES.PUBLIC.HOME} className="flex items-center gap-2">
              <img src={hiriseLogo} alt="HiRise Logo" className="h-8 w-auto" />
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
                      : "text-foreground hover:text-primary before:bg-primary before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:scale-x-0 before:transition-transform",
                    // "hover:before:scale-x-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Notification - Desktop */}
          <div className="mr-3 hidden md:flex md:items-center md:gap-4">
            <NotificationPopover />
          </div>

          {/* Desktop Auth Buttons or User Info */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hover:bg-secondary/10 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2">
                    <User className="size-4" />
                    <span className="text-foreground">
                      Hello, <i>{user.username}</i>
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={getProfileLink()}>Profile</Link>
                  </DropdownMenuItem>

                  {user.role === "applicant" ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to={ROUTES.APPLICANT.APPLIED_JOBS}>
                          <Briefcase className="mr-2 size-4" />
                          Applied Jobs
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={ROUTES.APPLICANT.SAVED_JOBS}>
                          <Bookmark className="mr-2 size-4" />
                          Saved Jobs
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={ROUTES.APPLICANT.FOLLOWING_COMPANIES}>
                          <Building className="mr-2 size-4" />
                          Following Companies
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={ROUTES.APPLICANT.DASHBOARD}>Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link to={ROUTES.COMPANY.DASHBOARD}>Dashboard</Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={ROUTES.AUTH.LOGIN}>
                <Button variant="ghost" className="bg-primary hover:bg-secondary text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Notification Icon */}
          <div className="mr-2 flex items-center md:hidden">
            <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "relative transition-colors",
                    unreadCount > 0 && "text-primary hover:text-primary/90",
                  )}
                >
                  <Bell className="size-5" />
                  {unreadCount > 0 && <NotificationBadge count={unreadCount} />}
                </Button>
              </DialogTrigger>
              <DialogContent className="flex h-[80vh] flex-col p-0 sm:max-w-[425px]">
                <DialogHeader className="bg-muted/30 flex-row items-center border-b px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Bell className="text-primary size-4" />
                    <DialogTitle className="text-primary">Notifications</DialogTitle>
                    {unreadCount > 0 && (
                      <span className="bg-primary/15 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
                        {unreadCount} new
                      </span>
                    )}
                    {notifications.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "hover:bg-primary/5 text-xs font-medium",
                          unreadCount > 0
                            ? "text-muted-foreground hover:text-primary"
                            : "text-success hover:text-green-700",
                        )}
                        onClick={markAllAsRead}
                      >
                        {unreadCount > 0 ? (
                          <>
                            <Eye className="mr-1.5 size-3.5" />
                            Mark all as read
                          </>
                        ) : (
                          <>
                            <Check className="mr-1.5 size-3.5" />
                            All caught up!
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </DialogHeader>
                <div className="flex-1 overflow-auto">
                  <NotificationList />
                </div>
              </DialogContent>
            </Dialog>
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
              {isAuthenticated && user ? (
                <>
                  <div className="text-primary py-2 font-medium">Hello, {user.username}</div>
                  <Link
                    to={getProfileLink()}
                    className="text-foreground hover:text-primary py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>

                  {user.role === "applicant" ? (
                    <>
                      <Link
                        to={ROUTES.APPLICANT.APPLIED_JOBS}
                        className="text-foreground hover:text-primary flex items-center py-2 text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Briefcase className="mr-2 size-4" />
                        Applied Jobs
                      </Link>
                      <Link
                        to={ROUTES.APPLICANT.SAVED_JOBS}
                        className="text-foreground hover:text-primary flex items-center py-2 text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Bookmark className="mr-2 size-4" />
                        Saved Jobs
                      </Link>
                      <Link
                        to={ROUTES.APPLICANT.FOLLOWING_COMPANIES}
                        className="text-foreground hover:text-primary flex items-center py-2 text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Building className="mr-2 size-4" />
                        Following Companies
                      </Link>
                    </>
                  ) : null}

                  <Link
                    to={
                      user.role === "applicant"
                        ? ROUTES.APPLICANT.DASHBOARD
                        : ROUTES.COMPANY.DASHBOARD
                    }
                    className="text-foreground hover:text-primary py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-destructive flex items-center py-2 text-left text-base"
                  >
                    <LogOut className="mr-2 size-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to={ROUTES.AUTH.LOGIN}
                  className="bg-primary hover:bg-secondary w-full rounded-md py-2 text-center text-base font-medium text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
