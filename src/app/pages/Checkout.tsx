import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/price';
import { medusa } from '../lib/medusa';

const CART_ID_KEY = 'lovehuble-cart-id';

interface FormState {
  email: string;
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  postal_code: string;
  phone: string;
}

interface OrderResult {
  id: string;
  display_id: number;
}

export const Checkout = () => {
  const { items, totalPrice, clearCart, cartId: contextCartId } = useCart();
  const { customer } = useAuth();

  const [form, setForm] = useState<FormState>({
    email: '', first_name: '', last_name: '',
    address_1: '', city: '', postal_code: '', phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<OrderResult | null>(null);

  useEffect(() => {
    if (!customer) return
    medusa.store.customer.listAddress({ limit: 100 })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ addresses }: any) => {
        const addr = addresses.find((a: any) => a.is_default_shipping) ?? addresses[0]
        if (!addr) return
        setForm(prev => ({
          ...prev,
          first_name: addr.first_name || prev.first_name,
          last_name: addr.last_name || prev.last_name,
          address_1: addr.address_1 || prev.address_1,
          city: addr.city || prev.city,
          postal_code: addr.postal_code || prev.postal_code,
          phone: addr.phone || prev.phone,
        }))
      })
      .catch(() => {})
  }, [customer])

  const set = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cartId = contextCartId ?? (typeof window !== 'undefined' ? localStorage.getItem(CART_ID_KEY) : null);
    if (!cartId) { setError('Carrello non trovato. Aggiungi prodotti al carrello.'); return; }

    setLoading(true);
    try {
      // Se l'utente è loggato, trasferisce il cart al suo account prima di completarlo
      if (customer) {
        try {
          await medusa.store.cart.transferCart(cartId)
        } catch (err) {
          console.warn('[checkout] transferCart failed (probabile già associato):', err)
        }
      }

      const { cart } = await medusa.store.cart.update(cartId, {
        email: customer?.email ?? form.email,
        shipping_address: {
          first_name: form.first_name,
          last_name: form.last_name,
          address_1: form.address_1,
          city: form.city,
          postal_code: form.postal_code,
          country_code: 'it',
          ...(form.phone ? { phone: form.phone } : {}),
        },
      });

      await medusa.store.payment.initiatePaymentSession(cart, {
        provider_id: 'pp_system_system',
      });

      const result = await medusa.store.cart.complete(cartId);
      if (result.type !== 'order') throw new Error('Ordine non completato');

      setOrder({ id: result.order.id, display_id: result.order.display_id });
      await clearCart();
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message;
      setError(msg ?? 'Errore durante il checkout');
    } finally {
      setLoading(false);
    }
  };

  // Carrello vuoto
  if (items.length === 0 && !order) {
    return (
      <div className="pt-[68px] lg:pt-[80px] min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[17px] text-[#6e6e73] mb-[28px]">Il carrello è vuoto</p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="bg-[#1d1d1f] text-white px-[28px] py-[13px] rounded-full text-[15px] font-medium hover:bg-[#424245] transition-colors"
            >
              Torna allo shop
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Ordine completato
  if (order) {
    return (
      <div className="pt-[68px] lg:pt-[80px] min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-[48px] max-w-[480px] w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-[68px] h-[68px] bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-[28px]"
          >
            <Check className="w-[30px] h-[30px] text-green-600" strokeWidth={2.5} />
          </motion.div>

          <h2 className="text-[30px] font-semibold text-[#1d1d1f] mb-[10px] tracking-[-0.015em]">
            Ordine confermato!
          </h2>
          <p className="text-[15px] text-[#6e6e73] mb-[6px]">
            Ordine <span className="font-semibold text-[#1d1d1f]">#{order.display_id}</span>
          </p>
          <p className="text-[14px] text-[#86868b] mb-[36px] leading-[1.6]">
            Grazie per il tuo acquisto.<br />Riceverai una conferma via email a breve.
          </p>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29,29,31,0.15)' }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-[14px] rounded-full bg-[#1d1d1f] text-white text-[16px] font-medium hover:bg-[#424245] transition-colors"
            >
              Continua a fare shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-[68px] lg:pt-[80px] min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[980px] mx-auto px-6 lg:px-8 py-[48px] lg:py-[72px]">

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[36px] lg:text-[44px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[40px]"
        >
          Checkout
        </motion.h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[20px] lg:gap-[28px] items-start">

            {/* ── Colonna sinistra: form ── */}
            <div className="space-y-[16px]">

              {/* Contatto */}
              <Card title="Contatto">
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={customer?.email ?? form.email}
                  onChange={customer ? () => {} : set}
                  placeholder="tu@email.com"
                  required
                  disabled={!!customer}
                />
              </Card>

              {/* Indirizzo */}
              <Card title="Indirizzo di spedizione">
                <div className="grid grid-cols-2 gap-[12px]">
                  <Field label="Nome" name="first_name" value={form.first_name} onChange={set} placeholder="Marco" required />
                  <Field label="Cognome" name="last_name" value={form.last_name} onChange={set} placeholder="Rossi" required />
                </div>
                <Field label="Indirizzo" name="address_1" value={form.address_1} onChange={set} placeholder="Via Roma, 1" required />
                <div className="grid grid-cols-2 gap-[12px]">
                  <Field label="Città" name="city" value={form.city} onChange={set} placeholder="Milano" required />
                  <Field label="CAP" name="postal_code" value={form.postal_code} onChange={set} placeholder="20100" required />
                </div>
                <Field label="Paese" name="country" value="Italia" onChange={() => {}} disabled />
                <Field label="Telefono (opzionale)" name="phone" type="tel" value={form.phone} onChange={set} placeholder="+39 123 456 7890" />
              </Card>

              {/* Pagamento */}
              <Card title="Pagamento">
                <p className="text-[12px] text-[#86868b] mb-[14px] -mt-[4px]">
                  Modalità test — nessun addebito reale
                </p>
                <div className="flex items-center gap-[14px] bg-[#f5f5f7] rounded-[14px] px-[18px] py-[15px]">
                  <div className="w-[40px] h-[26px] bg-[#1d1d1f] rounded-[5px] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[8px] font-bold tracking-wider">TEST</span>
                  </div>
                  <span className="text-[14px] text-[#1d1d1f] font-medium flex-1">Pagamento simulato</span>
                  <div className="w-[20px] h-[20px] rounded-full bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                    <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} />
                  </div>
                </div>
              </Card>
            </div>

            {/* ── Colonna destra: riepilogo ── */}
            <div className="space-y-[12px]">
              <Card title="Riepilogo ordine">

                {/* Prodotti */}
                <div className="space-y-[14px] mb-[20px]">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-[12px]">
                      {item.image && (
                        <div className="relative w-[54px] h-[54px] bg-[#f5f5f7] rounded-[12px] overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-[8px]" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-[#1d1d1f] leading-[1.3] line-clamp-2">{item.name}</p>
                        <p className="text-[12px] text-[#86868b] mt-[3px]">Qtà {item.quantity}</p>
                      </div>
                      <p className="text-[14px] font-semibold text-[#1d1d1f] flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totali */}
                <div className="border-t border-[#f0f0f5] pt-[16px] space-y-[10px]">
                  <div className="flex justify-between text-[14px] text-[#6e6e73]">
                    <span>Subtotale</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[14px] text-[#6e6e73]">
                    <span>Spedizione</span>
                    <span className="text-green-600 font-medium">Gratuita</span>
                  </div>
                  <div className="flex justify-between text-[17px] font-semibold text-[#1d1d1f] pt-[10px] border-t border-[#f0f0f5]">
                    <span>Totale</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </Card>

              {error && (
                <p className="text-[13px] text-red-500 text-center px-[4px]">{error}</p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.01, boxShadow: '0 8px 30px rgba(29,29,31,0.18)' } : undefined}
                whileTap={!loading ? { scale: 0.99 } : undefined}
                transition={{ duration: 0.2 }}
                className={`w-full py-[15px] rounded-full text-[16px] font-medium transition-all duration-300 shadow-sm ${
                  loading
                    ? 'bg-[#86868b] text-white cursor-not-allowed'
                    : 'bg-[#1d1d1f] text-white hover:bg-[#424245]'
                }`}
              >
                {loading ? 'Elaborazione...' : 'Conferma Ordine'}
              </motion.button>

              <p className="text-[12px] text-[#86868b] text-center leading-[1.6]">
                Effettuando l&apos;ordine accetti i nostri{' '}
                <Link href="/termini-e-condizioni" className="underline hover:text-[#1d1d1f] transition-colors">
                  Termini e Condizioni
                </Link>
              </p>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

/* ── Componenti interni ── */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-[24px] lg:p-[28px] space-y-[14px]"
    >
      <h2 className="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.003em]">{title}</h2>
      {children}
    </motion.div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

function Field({ label, name, type = 'text', value, onChange, placeholder, required, disabled }: FieldProps) {
  return (
    <div>
      <label className="block text-[11px] text-[#86868b] tracking-[0.08em] uppercase font-medium mb-[7px]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full rounded-[12px] px-[16px] py-[13px] text-[15px] text-[#1d1d1f] placeholder-[#c0c0c5] focus:outline-none transition-all ${
          disabled
            ? 'bg-[#f5f5f7] text-[#86868b] cursor-not-allowed border border-transparent'
            : 'bg-[#f5f5f7] border border-transparent focus:bg-white focus:border-[#1d1d1f]'
        }`}
      />
    </div>
  );
}
