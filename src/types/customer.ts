export interface CustomerAddress {
  id: string
  first_name: string
  last_name: string
  company?: string
  address_1: string
  address_2?: string
  city: string
  province: string
  province_code?: string
  country_code: string
  country?: string
  postal_code: string
  phone?: string
  is_default_shipping: boolean
  is_default_billing: boolean
  // Alias per compatibilità con AddressCard / AddressForm
  firstName: string
  lastName: string
  address1: string
  address2?: string
  zip: string
  provinceCode: string
  countryCode: string
  isDefault: boolean
}

export interface OrderLineItem {
  id: string
  title: string
  quantity: number
  thumbnail?: string
  total: number
  unit_price: number
  variant?: {
    title?: string
    product_handle?: string
  }
}

export interface OrderFulfillment {
  tracking_numbers: string[]
  tracking_urls?: string[]
  provider_id?: string
}

export interface CustomerOrder {
  id: string
  display_id: number
  payment_status: "pending" | "captured" | "authorized" | "partially_captured" | "refunded" | "canceled" | "requires_action"
  fulfillment_status: "not_fulfilled" | "fulfilled" | "partially_fulfilled" | "returned" | "canceled"
  created_at: string
  total: number
  items: OrderLineItem[]
  fulfillments?: OrderFulfillment[]
}

export interface MedusaCustomer {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  has_account: boolean
  created_at: string
  addresses: CustomerAddress[]
  orders?: CustomerOrder[]
}
