import { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import {
  // Bell,
  Bookmark,
  Briefcase,
  Building,
  // Check,
  ChevronDown,
  ClipboardList,
  // Eye,
  LogOut,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import { useNotification } from "@/types/useNotification";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
// import { NotificationBadge } from "@/components/notification/NotificationBadge";
// import { NotificationList } from "@/components/notification/NotificationList";
// import { NotificationPopover } from "@/components/notification/NotificationPopover";
import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import hiriseLogo from "@/assets/images/hiriseLogo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [notificationOpen, setNotificationOpen] = useState(false);
  const location = useLocation();
  // const navigate = useNavigate();
  // const { unreadCount, markAllAsRead, notifications } = useNotification();
  const { isAuthenticated, user, logout } = useAuth();
  const [basePath, setBasePath] = useState("");

  useEffect(() => {
    // Xác định base path dựa trên môi trường
    const currentUrl = window.location.origin;
    setBasePath(currentUrl);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActiveRoute = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }

    // Xử lý đặc biệt cho Recruitment Management
    if (path === ROUTES.COMPANY.RECRUITMENT_MANAGEMENT) {
      return location.pathname.includes("/company/recruitment-management");
    }

    // Xử lý trường hợp đặc biệt cho tabs Company Recruitment
    if (
      path === ROUTES.COMPANY.JOBS.LIST &&
      location.pathname.includes(ROUTES.COMPANY.APPLICATIONS.LIST)
    ) {
      return false;
    }

    if (
      path === ROUTES.COMPANY.APPLICATIONS.LIST &&
      location.pathname.includes(ROUTES.COMPANY.JOBS.LIST) &&
      !location.pathname.includes(ROUTES.COMPANY.APPLICATIONS.LIST)
    ) {
      return false;
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
        // Recruitment link is now handled separately as a dropdown
        // We don't add it to baseLinks anymore
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
              {/* <img src={hiriseLogo} alt="HiRise Logo" className="h-8 w-auto" /> */}
              {/* <img src="/hiriseLogo.png" alt="HiRise Logo" className="h-8 w-auto" /> */}
              <img 
                src={`${basePath}/assets/images/hiriseLogo.png`} 
                alt="HiRise Logo" 
                className="h-8 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${basePath}/assets/images/companyPlaceholder.png`;
                }}
              />
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

              {/* Recruitment dropdown for company */}
              {isAuthenticated && user?.role === "company" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "relative flex items-center gap-1.5 py-2 transition-colors focus:outline-none",
                        isActiveRoute(ROUTES.COMPANY.RECRUITMENT_MANAGEMENT)
                          ? "text-primary before:bg-primary font-semibold before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full"
                          : "text-foreground hover:text-primary before:bg-primary before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:scale-x-0 before:transition-transform hover:before:scale-x-100",
                      )}
                    >
                      Recruitment
                      <ChevronDown className="size-3.5 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    className="border-border/50 w-56 rounded-md border p-1.5 shadow-md"
                  >
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary rounded-sm p-2"
                    >
                      <Link to={ROUTES.COMPANY.JOBS.LIST} className="flex w-full items-center">
                        <ClipboardList className="text-primary mr-2.5 size-4" />
                        <span>Manage Jobs</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary rounded-sm p-2"
                    >
                      <Link
                        to={ROUTES.COMPANY.APPLICATIONS.LIST}
                        className="flex w-full items-center"
                      >
                        <Users className="text-primary mr-2.5 size-4" />
                        <span>Manage Applications</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary rounded-sm p-2"
                    >
                      <Link to={ROUTES.COMPANY.JOBS.CREATE} className="flex w-full items-center">
                        <Briefcase className="text-primary mr-2.5 size-4" />
                        <span>Post a New Job</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Job Management dropdown for applicant */}
              {isAuthenticated && user?.role === "applicant" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "relative flex items-center gap-1.5 py-2 transition-colors focus:outline-none",
                        isActiveRoute(ROUTES.APPLICANT.JOB_MANAGEMENT)
                          ? "text-primary before:bg-primary font-semibold before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full"
                          : "text-foreground hover:text-primary before:bg-primary before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:scale-x-0 before:transition-transform hover:before:scale-x-100",
                      )}
                    >
                      Job Management
                      <ChevronDown className="size-3.5 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    className="border-border/50 w-56 rounded-md border p-1.5 shadow-md"
                  >
                    <DropdownMenuItem asChild>
                      <a
                        href={ROUTES.APPLICANT.APPLIED_JOBS}
                        className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary flex w-full items-center rounded-sm p-2"
                      >
                        <Briefcase className="text-primary mr-2.5 size-4" />
                        <span>Applied Jobs</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a
                        href={ROUTES.APPLICANT.SAVED_JOBS}
                        className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary flex w-full items-center rounded-sm p-2"
                      >
                        <Bookmark className="text-primary mr-2.5 size-4" />
                        <span>Saved Jobs</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a
                        href={ROUTES.APPLICANT.FOLLOWING_COMPANIES}
                        className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary flex w-full items-center rounded-sm p-2"
                      >
                        <Building className="text-primary mr-2.5 size-4" />
                        <span>Following Companies</span>
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </nav>
          </div>

          {/* Notification - Desktop */}
          {/* <div className="mr-3 hidden md:flex md:items-center md:gap-4">
            <NotificationPopover />
          </div> */}

          {/* Desktop Auth Buttons or User Info */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hover:bg-primary/5 flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 transition-colors duration-200">
                    <span className="text-foreground flex items-center font-medium">
                      Hello, <span className="text-primary ml-1">{user.username}</span>
                    </span>
                    <ChevronDown className="text-muted-foreground size-3.5 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border-border/50 w-56 rounded-md border p-1.5 shadow-md"
                >
                  <DropdownMenuItem
                    asChild
                    className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary rounded-sm p-2"
                  >
                    <Link to={getProfileLink()} className="flex items-center">
                      <User className="text-primary mr-2.5 size-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary rounded-sm p-2"
                  >
                    <Link
                      to={
                        user.role === "applicant"
                          ? ROUTES.APPLICANT.DASHBOARD
                          : ROUTES.COMPANY.DASHBOARD
                      }
                      className="flex items-center"
                    >
                      <Briefcase className="text-primary mr-2.5 size-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-border/50 my-1.5" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive rounded-sm p-2"
                  >
                    <LogOut className="text-destructive mr-2.5 size-4" />
                    <span className="text-destructive">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={ROUTES.AUTH.LOGIN}>
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-5 py-2 text-white transition-colors">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Notification Icon */}
          {/* <div className="mr-2 flex items-center md:hidden">
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
          </div> */}

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
          <div className="space-y-1.5 px-4 pt-2 pb-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                  isActiveRoute(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted/60 hover:text-primary",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Recruitment menu for company on mobile */}
            {isAuthenticated && user?.role === "company" && (
              <>
                <div className="text-primary px-3 pt-4 pb-2 text-sm font-medium tracking-wider uppercase">
                  Recruitment
                </div>
                <div className="space-y-1">
                  <Link
                    to={ROUTES.COMPANY.JOBS.LIST}
                    className="hover:bg-primary/10 flex items-center rounded-md px-3 py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ClipboardList className="text-primary mr-3 size-5" />
                    Manage Jobs
                  </Link>
                  <Link
                    to={ROUTES.COMPANY.APPLICATIONS.LIST}
                    className="hover:bg-primary/10 flex items-center rounded-md px-3 py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="text-primary mr-3 size-5" />
                    Manage Applications
                  </Link>
                  <Link
                    to={ROUTES.COMPANY.JOBS.CREATE}
                    className="hover:bg-primary/10 flex items-center rounded-md px-3 py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="text-primary mr-3 size-5" />
                    Post a New Job
                  </Link>
                </div>
              </>
            )}

            {/* Job Management cho mobile */}
            {isAuthenticated && user?.role === "applicant" && (
              <>
                <div className="text-primary px-3 pt-4 pb-2 text-sm font-medium tracking-wider uppercase">
                  Job Management
                </div>
                <div className="space-y-1">
                  <a
                    href={ROUTES.APPLICANT.APPLIED_JOBS}
                    className="hover:bg-primary/10 flex items-center rounded-md px-3 py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="text-primary mr-3 size-5" />
                    Applied Jobs
                  </a>
                  <a
                    href={ROUTES.APPLICANT.SAVED_JOBS}
                    className="hover:bg-primary/10 flex items-center rounded-md px-3 py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Bookmark className="text-primary mr-3 size-5" />
                    Saved Jobs
                  </a>
                  <a
                    href={ROUTES.APPLICANT.FOLLOWING_COMPANIES}
                    className="hover:bg-primary/10 flex items-center rounded-md px-3 py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Building className="text-primary mr-3 size-5" />
                    Following Companies
                  </a>
                </div>
              </>
            )}

            <div className="mt-6 space-y-1.5 border-t border-gray-200 pt-4">
              {isAuthenticated && user ? (
                <>
                  <div className="border-border/50 mb-2 border-b px-3 py-2">
                    <div className="text-base font-medium">
                      Hello, <span className="text-primary">{user.username}</span>
                    </div>
                    <div className="text-muted-foreground text-sm capitalize">{user.role}</div>
                  </div>
                  <Link
                    to={getProfileLink()}
                    className="hover:bg-primary/10 flex items-center rounded-md px-3 py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="text-primary mr-3 size-5" />
                    Profile
                  </Link>

                  <Link
                    to={
                      user.role === "applicant"
                        ? ROUTES.APPLICANT.DASHBOARD
                        : ROUTES.COMPANY.DASHBOARD
                    }
                    className="hover:bg-primary/10 flex items-center rounded-md px-3 py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="text-primary mr-3 size-5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-destructive hover:bg-destructive/10 flex w-full items-center rounded-md px-3 py-2 text-left text-base"
                  >
                    <LogOut className="mr-3 size-5" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to={ROUTES.AUTH.LOGIN}
                  className="bg-primary hover:bg-primary/90 block rounded-md py-2.5 text-center text-base font-medium text-white transition-colors"
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
