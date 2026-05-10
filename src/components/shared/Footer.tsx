import Link from 'next/link';
import { Linkedin, Youtube, Facebook } from 'lucide-react';
import Container from './Container';
import Image from 'next/image';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'AI Finder', href: '/ai-gift-finder' },
  { label: 'Contact', href: '/contact' },
];

const supportLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Shipping Info', href: '/shipping-info' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

const socials = [
  { icon: Linkedin, label: 'Twitter', href: 'https://www.linkedin.com/in/mahdi9162/', target: '_blank', rel: 'noopener noreferrer' },
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://youtu.be/4KTFD0SDDOA?si=v8hN9477P5ezBIaw',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/mahdi916', target: '_blank', rel: 'noopener noreferrer' },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,1)_0%,rgba(30,27,46,1)_60%,rgba(76,29,54,1)_100%)] text-white">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="flex flex-col items-center">
              <Link href="/">
                <Image
                  src={'/assets/logo/logo-dark.svg'}
                  alt="Giftly logo"
                  width={120}
                  height={120}
                  className="w-30 h-auto md:-translate-x-16"
                />
              </Link>

              <p className="mt-4 max-w-55 text-sm leading-relaxed text-white/70 md:text-start">
                Thoughtful gifting, powered by AI. Helping you find the perfect gift effortlessly, every time.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Quick Links</p>

              <ul className="mt-4 space-y-3">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-pink-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Support</p>

              <ul className="mt-4 space-y-3">
                {supportLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-orange-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Follow Us</p>

              <div className="mt-4 flex items-center justify-center gap-3">
                {socials.map(({ icon: Icon, label, href, target, rel }) => (
                  <a
                    key={label}
                    href={href}
                    target={target}
                    rel={rel}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all hover:border-pink-400/30 hover:bg-white/10 hover:text-pink-400"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-center text-xs text-white/55">© 2026 Giftly. All rights reserved.</p>
            <p className="text-center text-sm text-white/55 pt-2">Made with ❤️ for thoughtful gifting</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
