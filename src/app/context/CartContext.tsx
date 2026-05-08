'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

const BASE = process.env.NEXT_PUBLIC_MEDUSA_URL ?? 'http://localhost:9000'
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_KEY ?? ''
const REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID ?? ''
const CART_ID_KEY = 'lovehuble-cart-id'

const HEADERS = {
  'Content-Type': 'application/json',
  'x-publishable-api-key': PUB_KEY,
}

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
}

interface CartContextType {
  items: CartItem[];
  addItem: (input: AddItemInput) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function mapItems(rawItems: any[]): CartItem[] {
  return (rawItems ?? []).map(item => ({
    id: item.id,
    name: item.product_title ?? item.title ?? '',
    price: (item.unit_price ?? 0) / 100,
    image: item.thumbnail ?? '',
    quantity: item.quantity ?? 1,
    productUrl: item.metadata?.productUrl,
  }))
}

// POST/DELETE su cart restituiscono { cart } o { parent: cart } a seconda del metodo
function extractCart(data: any) {
  return data.cart ?? data.parent ?? {}
}

async function cartFetch(path: string, method = 'GET', body?: object) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: HEADERS,
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  if (!res.ok) {
    const err = await res.text().catch(() => '')
    throw new Error(`Cart ${method} ${path}: ${res.status} ${err}`)
  }
  return res.json()
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carica carrello esistente da localStorage al mount
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(CART_ID_KEY) : null
    if (!saved) return
    setCartId(saved)
    cartFetch(`/store/carts/${saved}`)
      .then(data => setItems(mapItems(extractCart(data).items)))
      .catch(() => {
        localStorage.removeItem(CART_ID_KEY)
        setCartId(null)
      })
  }, [])

  async function getOrCreateCartId(): Promise<string> {
    if (cartId) return cartId
    const saved = localStorage.getItem(CART_ID_KEY)
    if (saved) { setCartId(saved); return saved }
    const data = await cartFetch('/store/carts', 'POST', { region_id: REGION_ID })
    const id = extractCart(data).id
    localStorage.setItem(CART_ID_KEY, id)
    setCartId(id)
    return id
  }

  const addItem = async (input: AddItemInput) => {
    if (!input.variantId) { toast.error('Variante prodotto non trovata'); return }
    try {
      const id = await getOrCreateCartId()
      const data = await cartFetch(`/store/carts/${id}/line-items`, 'POST', {
        variant_id: input.variantId,
        quantity: 1,
        metadata: { productUrl: input.productUrl },
      })
      setItems(mapItems(extractCart(data).items))
      toast.success('Aggiunto al carrello', { description: input.name })
    } catch {
      toast.error('Errore aggiunta al carrello')
    }
  }

  const removeItem = async (lineItemId: string) => {
    if (!cartId) return
    try {
      const data = await cartFetch(`/store/carts/${cartId}/line-items/${lineItemId}`, 'DELETE')
      setItems(mapItems(extractCart(data).items))
      toast.success('Rimosso dal carrello')
    } catch {
      toast.error('Errore rimozione dal carrello')
    }
  }

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    if (quantity <= 0) { removeItem(lineItemId); return }
    if (!cartId) return
    try {
      const data = await cartFetch(`/store/carts/${cartId}/line-items/${lineItemId}`, 'POST', { quantity })
      setItems(mapItems(extractCart(data).items))
    } catch {
      toast.error('Errore aggiornamento quantità')
    }
  }

  const clearCart = async () => {
    try {
      const data = await cartFetch('/store/carts', 'POST', { region_id: REGION_ID })
      const id = extractCart(data).id
      localStorage.setItem(CART_ID_KEY, id)
      setCartId(id)
      setItems([])
      toast.success('Carrello svuotato')
    } catch {
      toast.error('Errore svuotamento carrello')
    }
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
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
