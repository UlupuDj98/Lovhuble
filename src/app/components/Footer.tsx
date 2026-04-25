import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    informazioni: [
      { name: 'Chi Siamo', href: '/about' },
      { name: 'Contatti', href: '/contact' },
      { name: 'Guida', href: '/guide' },
    ],
    servizi: [
      { name: 'Sex Toys',            href: '/prodotti/sex-toys' },
      { name: 'Abbigliamento e Lingerie', href: '/prodotti/abbigliamento' },
      { name: 'BDSM',                href: '/prodotti/bdsm' },
      { name: 'Salute e Benessere',  href: '/prodotti/salute-benessere' },
      { name: 'Giochi e Gadget',     href: '/prodotti/giochi' },
    ],
    legale: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Termini e Condizioni', href: '/termini-e-condizioni' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
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
              Navigazione
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-[16px]">
            <p className="text-[13px] text-white/50 font-normal">
              © 2024 Lovehuble. Tutti i diritti riservati.
            </p>
            <div className="flex flex-row flex-wrap justify-center md:justify-end gap-[8px]">
              {[
                { src: '/payments/visa.svg', alt: 'Visa', w: 54 },
                { src: '/payments/mastercard.svg', alt: 'Mastercard', w: 27 },
                { src: '/payments/paypal.svg', alt: 'PayPal', w: 15 },
                { src: '/payments/applepay.svg', alt: 'Apple Pay', w: 45 },
                { src: '/payments/googlepay.svg', alt: 'Google Pay', w: 45 },
                { src: '/payments/klarna.svg', alt: 'Klarna', w: 48 },
              ].map((p) => (
                <div
                  key={p.alt}
                  className="flex justify-center items-center bg-white/10 hover:bg-white/20 rounded-md px-[8px] py-[6px] transition-colors duration-200"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.w}
                    height={18}
                    className="object-contain h-[14px] w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
