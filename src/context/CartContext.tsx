'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { medusa } from '@/lib/medusa';

const REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID ?? ''
const CART_ID_KEY = 'lovehuble-cart-id'

export interface CartItem {
  id: string;       // line_item.id (cali_...)
  name: string;
  price: number;    // unit_price in euro
  image: string;
  quantity: number;
  productUrl?: string;
}

interface AddItemInput {
  variantId: string;
  name: string;
  price: number;
  image: string;
  productUrl?: string;
  quantity?: number;
}

interface CartContextType {
  items: CartItem[];
  cartId: string | null;
  addItem: (input: AddItemInput) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  transferCartToCustomer: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapItems(rawItems: any[]): CartItem[] {
  return (rawItems ?? []).map(item => ({
    id: item.id,
    name: item.product_title ?? item.title ?? '',
    price: item.unit_price ?? 0,
    image: item.thumbnail ?? '',
    quantity: item.quantity ?? 1,
    productUrl: item.metadata?.productUrl,
  }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractItems(data: any): CartItem[] {
  const cart = data?.cart ?? data?.parent ?? data ?? {}
  return mapItems(cart.items ?? [])
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carica carrello esistente al mount
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(CART_ID_KEY) : null
    if (!saved) return
    setCartId(saved)
    medusa.store.cart.retrieve(saved)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(data => setItems(mapItems((data as any).cart?.items ?? [])))
      .catch(() => {
        localStorage.removeItem(CART_ID_KEY)
        setCartId(null)
      })
  }, [])

  async function getOrCreateCartId(): Promise<string> {
    if (cartId) return cartId
    const saved = typeof window !== 'undefined' ? localStorage.getItem(CART_ID_KEY) : null
    if (saved) { setCartId(saved); return saved }

    // SDK include il JWT se presente → Medusa imposta customer_id sul cart automaticamente
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await medusa.store.cart.create({ region_id: REGION_ID } as any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id = (data as any).cart?.id
    localStorage.setItem(CART_ID_KEY, id)
    setCartId(id)
    return id
  }

  const addItem = async (input: AddItemInput) => {
    if (!input.variantId) { toast.error('Variante prodotto non trovata'); return }
    try {
      const id = await getOrCreateCartId()
      const data = await medusa.store.cart.createLineItem(id, {
        variant_id: input.variantId,
        quantity: input.quantity ?? 1,
        metadata: { productUrl: input.productUrl },
      })
      setItems(extractItems(data))
      toast.success('Aggiunto al carrello', { description: input.name })
    } catch {
      toast.error('Errore aggiunta al carrello')
    }
  }

  const removeItem = async (lineItemId: string) => {
    if (!cartId) return
    try {
      const data = await medusa.store.cart.deleteLineItem(cartId, lineItemId)
      setItems(extractItems(data))
      toast.success('Rimosso dal carrello')
    } catch {
      toast.error('Errore rimozione dal carrello')
    }
  }

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    if (quantity <= 0) { removeItem(lineItemId); return }
    if (!cartId) return
    try {
      const data = await medusa.store.cart.updateLineItem(cartId, lineItemId, { quantity })
      setItems(extractItems(data))
    } catch {
      toast.error('Errore aggiornamento quantità')
    }
  }

  const transferCartToCustomer = async () => {
    const id = cartId ?? (typeof window !== 'undefined' ? localStorage.getItem(CART_ID_KEY) : null)
    if (!id) return
    try {
      await medusa.store.cart.transferCart(id)
    } catch {
      // Ignora — cart già associato o non esistente
    }
  }

  const clearCart = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await medusa.store.cart.create({ region_id: REGION_ID } as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const id = (data as any).cart?.id
      localStorage.setItem(CART_ID_KEY, id)
      setCartId(id)
      setItems([])
    } catch {
      toast.error('Errore svuotamento carrello')
    }
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items,
      cartId,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      transferCartToCustomer,
      totalItems,
      totalPrice,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
