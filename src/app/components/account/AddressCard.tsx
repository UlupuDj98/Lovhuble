import { CustomerAddress } from "@/types/customer";
import { memo } from "react";

const COUNTRY_LABELS: Record<string, string> = {
  it: "Italia", fr: "Francia", de: "Germania", es: "Spagna", at: "Austria", ch: "Svizzera",
}

interface AddressCardProps {
  address: CustomerAddress;
  onEdit?: () => void;
  onDelete?: () => void;
  onSetDefault?: () => void;
  isLoading?: boolean;
}

function AddressCard({ address, onEdit, onDelete, onSetDefault, isLoading = false }: AddressCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-5 border transition-all duration-200 ${
      address.is_default_shipping
        ? "border-[#d4a5a5] ring-1 ring-[#d4a5a5]/30 shadow-[0_4px_16px_rgba(212,165,165,0.2)]"
        : "border-stone-200 hover:border-stone-400 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#d4a5a5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-semibold text-black">{address.first_name} {address.last_name}</span>
          {address.is_default_shipping && (
            <span className="px-2 py-0.5 rounded-full bg-[#d4a5a5]/20 text-[#b07f7f] text-xs font-medium">Predefinito</span>
          )}
        </div>
      </div>

      <div className="space-y-1 text-stone-500 text-sm mb-5">
        {address.company && <p className="font-medium text-stone-700">{address.company}</p>}
        <p>{address.address_1}</p>
        {address.address_2 && <p>{address.address_2}</p>}
        <p>{address.postal_code} {address.city} ({address.province})</p>
        <p>{COUNTRY_LABELS[address.country_code?.toLowerCase()] || address.country_code?.toUpperCase()}</p>
        {address.phone && (
          <p className="flex items-center gap-2 mt-2">
            <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {address.phone}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-200">
        {onEdit && (
          <button onClick={onEdit} disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-stone-500 hover:text-black hover:bg-stone-100 transition-colors disabled:opacity-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Modifica
          </button>
        )}
        {onSetDefault && (
          <button onClick={onSetDefault} disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[#d4a5a5] hover:bg-[#d4a5a5]/10 transition-colors disabled:opacity-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Imposta predefinito
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-red-400 hover:bg-red-50 transition-colors disabled:opacity-50 ml-auto">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Elimina
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(AddressCard);
