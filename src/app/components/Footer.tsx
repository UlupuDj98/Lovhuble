import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    informazioni: [
      { name: 'Chi Siamo', href: '/about' },
      { name: 'Contatti', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
    ],
    servizi: [
      { name: 'Spedizioni', href: '/shipping' },
      { name: 'Resi e Rimborsi', href: '/returns' },
      { name: 'Metodi di Pagamento', href: '/payment' },
    ],
    legale: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Termini e Condizioni', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-[#000000] text-white border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-[64px] lg:py-[88px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[48px] lg:gap-[64px] mb-[64px]">
          {/* Brand & Contact */}
          <div>
            <div className="mb-[24px]">
              <Image
                src="/logo-1.png"
                alt="Lovehuble"
                width={160}
                height={40}
                className="object-contain"
                style={{ filter: 'invert(1)' }}
              />
            </div>
            <p className="text-[15px] text-white/70 leading-[1.6] mb-[24px] font-normal">
              Il tuo negozio di fiducia per prodotti intimi premium e benessere sessuale.
            </p>
            <div className="space-y-[12px]">
              <a
                href="mailto:info@sense.com"
                className="flex items-center space-x-[8px] text-[14px] text-white/70 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-[16px] h-[16px]" strokeWidth={1.5} />
                <span>info@sense.com</span>
              </a>
              <a
                href="tel:+390123456789"
                className="flex items-center space-x-[8px] text-[14px] text-white/70 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-[16px] h-[16px]" strokeWidth={1.5} />
                <span>+39 012 345 6789</span>
              </a>
              <div className="flex items-start space-x-[8px] text-[14px] text-white/70">
                <MapPin className="w-[16px] h-[16px] mt-[2px]" strokeWidth={1.5} />
                <span>Milano, Italia</span>
              </div>
            </div>
          </div>

          {/* Informazioni */}
          <div>
            <h4 className="text-[17px] font-semibold mb-[20px] tracking-[-0.003em]">
              Informazioni
            </h4>
            <ul className="space-y-[12px]">
              {footerLinks.informazioni.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servizi */}
          <div>
            <h4 className="text-[17px] font-semibold mb-[20px] tracking-[-0.003em]">
              Servizi
            </h4>
            <ul className="space-y-[12px]">
              {footerLinks.servizi.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legale */}
          <div>
            <h4 className="text-[17px] font-semibold mb-[20px] tracking-[-0.003em]">
              Legale
            </h4>
            <ul className="space-y-[12px]">
              {footerLinks.legale.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-[32px]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-[16px] md:space-y-0">
            <p className="text-[13px] text-white/50 font-normal">
              © 2024 Lovehuble. Tutti i diritti riservati.
            </p>
            <div className="flex items-center space-x-[24px]">
              <Link
                href="/privacy"
                className="text-[13px] text-white/50 hover:text-white/70 transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-[13px] text-white/50 hover:text-white/70 transition-colors duration-200"
              >
                Termini
              </Link>
              <Link
                href="/shipping"
                className="text-[13px] text-white/50 hover:text-white/70 transition-colors duration-200"
              >
                Spedizioni
              </Link>
              <Link
                href="/returns"
                className="text-[13px] text-white/50 hover:text-white/70 transition-colors duration-200"
              >
                Resi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
