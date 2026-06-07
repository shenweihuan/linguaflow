import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Github, Twitter, Mail, Heart } from 'lucide-react';

const footerLinks: {
  about: Array<{ label: string; href: string }>;
  quick: Array<{ label: string; to: string } | { label: string; href: string }>;
  contact: Array<{ icon: React.ComponentType<{ className?: string }>; label: string; href: string }>;
} = {
  about: [
    { label: '关于我们', href: '#' },
    { label: '团队介绍', href: '#' },
    { label: '加入我们', href: '#' },
    { label: '合作伙伴', href: '#' },
  ],
  quick: [
    { label: '首页', to: '/' },
    { label: '课程中心', to: '/courses' },
    { label: '学习社区', to: '/community' },
    { label: '帮助中心', to: '#' },
  ],
  contact: [
    { icon: Mail, label: 'support@linguaflow.com', href: 'mailto:support@linguaflow.com' },
    { icon: Globe, label: 'www.linguaflow.com', href: '#' },
  ],
};

const socialLinks: Array<{ icon: React.ComponentType<{ className?: string }>; href: string; label: string }> = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Globe className="w-7 h-7 text-accent" />
              <span className="font-heading font-bold text-lg text-white">
                Lingua<span className="text-accent">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              沉浸式多语种在线教育平台，让语言学习如海洋般深邃而自由。
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              关于我们
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-accent-light transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              快速链接
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.quick.map((link) => (
                <li key={link.label}>
                  {'to' in link ? (
                    <Link
                      to={link.to as string}
                      className="text-sm text-gray-400 hover:text-accent-light transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-accent-light transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              联系方式
            </h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-accent-light transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4 text-accent shrink-0" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            © {new Date().getFullYear()} LinguaFlow. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent fill-current" /> for language learners worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
