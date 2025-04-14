import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-secondary/5 border-border border-t">
      <div className="max-w-10xl mx-auto w-full px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo và social links - chiếm 1 cột */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <img src="/logo.svg" alt="HiRise Logo" className="h-8 w-auto" />
              <span className="text-primary text-xl font-bold">HiRise</span>
            </Link>
            <p className="text-muted-foreground mb-4 text-sm">
              Connect talent with the best job opportunities in the technology industry
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Phần các menu - đặt sang phải với md:col-span-3 */}
          <div className="md:col-span-3 md:pl-16">
            {/* Dùng flex để căn các cột menu ngang */}
            <div className="flex flex-col space-y-8 sm:flex-row sm:space-y-0 sm:space-x-16 md:justify-end">
              {/* Menu Ứng viên - vẫn giữ căn trái văn bản */}
              <div>
                <h3 className="text-foreground mb-3 text-sm font-semibold">For candidates</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/jobs"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Find jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/career-advice"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Career advice
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/salary"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Salary search
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/companies"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Top companies
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Menu Nhà tuyển dụng - vẫn giữ căn trái văn bản */}
              <div>
                <h3 className="text-foreground mb-3 text-sm font-semibold">For employers</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/jobs/create"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Post a job
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/employer/pricing"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/employer/testimonials"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Testimonials
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Menu Về HiRise - vẫn giữ căn trái văn bản */}
              <div>
                <h3 className="text-foreground mb-3 text-sm font-semibold">About HiRise</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Introduction
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Terms of service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      Privacy policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-border mt-8 flex flex-col justify-between border-t pt-6 md:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} HiRise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
