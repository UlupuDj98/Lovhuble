import Image from "next/image";
import { CustomerOrder } from "@/types/customer";
import { memo } from "react";

const PAYMENT_LABELS: Record<string, string> = {
  pending: "In attesa",
  captured: "Pagato",
  authorized: "Autorizzato",
  partially_captured: "Parz. pagato",
  refunded: "Rimborsato",
  canceled: "Annullato",
  requires_action: "Azione richiesta",
};

const FULFILLMENT_LABELS: Record<string, string> = {
  not_fulfilled: "Non spedito",
  fulfilled: "Spedito",
  partially_fulfilled: "Parz. spedito",
  returned: "Reso",
  canceled: "Annullato",
};

const PAYMENT_COLORS: Record<string, string> = {
  captured: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  authorized: "bg-blue-100 text-blue-700",
  partially_captured: "bg-blue-100 text-blue-700",
  refunded: "bg-red-100 text-red-700",
  canceled: "bg-stone-100 text-stone-500",
  requires_action: "bg-orange-100 text-orange-700",
};

const FULFILLMENT_COLORS: Record<string, string> = {
  fulfilled: "bg-blue-100 text-blue-700",
  not_fulfilled: "bg-orange-100 text-orange-700",
  partially_fulfilled: "bg-purple-100 text-purple-700",
  returned: "bg-red-100 text-red-700",
  canceled: "bg-stone-100 text-stone-500",
};

interface OrderCardProps {
  order: CustomerOrder;
  compact?: boolean;
}

function OrderCard({ order, compact = false }: OrderCardProps) {
  const date = new Date(order.created_at).toLocaleDateString("it-IT", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const paymentColor = PAYMENT_COLORS[order.payment_status] || "bg-stone-100 text-stone-500";
  const fulfillmentColor = FULFILLMENT_COLORS[order.fulfillment_status] || "bg-stone-100 text-stone-500";

  const trackingNumber = order.fulfillments?.[0]?.tracking_numbers?.[0];
  const trackingUrl = order.fulfillments?.[0]?.tracking_urls?.[0];
  const trackingCompany = order.fulfillments?.[0]?.provider_id;

  const items = compact ? order.items.slice(0, 2) : order.items;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-stone-50 border-b border-stone-200">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-bold text-black">#{order.display_id}</span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${paymentColor}`}>
            {PAYMENT_LABELS[order.payment_status] || order.payment_status}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${fulfillmentColor}`}>
            {FULFILLMENT_LABELS[order.fulfillment_status] || order.fulfillment_status}
          </span>
        </div>
        <div className="text-right">
          <p className="font-bold text-black">€{order.total.toFixed(2)}</p>
          <p className="text-xs text-stone-400">{date}</p>
        </div>
      </div>

      {/* Items */}
      <div className="p-5 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {item.thumbnail ? (
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 relative">
                <Image src={item.thumbnail} alt={item.title} fill className="object-contain" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-stone-100 flex-shrink-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">{item.title}</p>
              {item.variant?.title && item.variant.title !== "Default Title" && (
                <p className="text-xs text-stone-500">{item.variant.title}</p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-black">€{item.total.toFixed(2)}</p>
              <p className="text-xs text-stone-400">× {item.quantity}</p>
            </div>
          </div>
        ))}
        {compact && order.items.length > 2 && (
          <p className="text-sm text-stone-400 text-center pt-1">
            +{order.items.length - 2} altri prodotti
          </p>
        )}
      </div>

      {/* Tracking */}
      {trackingNumber && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
            <svg className="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-stone-500 flex-1">
              {trackingCompany && <span className="font-medium">{trackingCompany}: </span>}
              {trackingUrl ? (
                <a href={trackingUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#d4a5a5]">
                  {trackingNumber}
                </a>
              ) : (
                trackingNumber
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(OrderCard);
