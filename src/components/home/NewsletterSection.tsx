import React from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection: React.FC = () => {
  return (
    <section className="bg-primary py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Mail className="mx-auto mb-4 h-12 w-12" aria-hidden="true" />
          <h2 className="mb-3 text-3xl font-bold">Nhận thông báo việc làm qua email</h2>
          <p className="mb-6">
            Đăng ký nhận thông báo về các cơ hội việc làm IT mới nhất phù hợp với kỹ năng của bạn.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Nhập địa chỉ email của bạn"
              className="flex-1 bg-white/10 placeholder:text-white/70"
              aria-label="Email address"
            />
            <Button variant="secondary" className="flex items-center gap-2">
              <Send className="h-4 w-4" aria-hidden="true" />
              Đăng ký ngay
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <input type="checkbox" id="consent" className="h-4 w-4" aria-label="Consent checkbox" />
            <label htmlFor="consent" className="text-sm">
              Tôi đồng ý nhận thông tin tuyển dụng từ HiRise
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
