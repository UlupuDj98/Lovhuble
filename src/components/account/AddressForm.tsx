import { useState, useEffect } from "react";
import { CustomerAddress } from "@/types/customer";

const ITALIAN_PROVINCES = [
  { code: "AG", name: "Agrigento" }, { code: "AL", name: "Alessandria" }, { code: "AN", name: "Ancona" },
  { code: "AO", name: "Aosta" }, { code: "AR", name: "Arezzo" }, { code: "AP", name: "Ascoli Piceno" },
  { code: "AT", name: "Asti" }, { code: "AV", name: "Avellino" }, { code: "BA", name: "Bari" },
  { code: "BT", name: "Barletta-Andria-Trani" }, { code: "BL", name: "Belluno" }, { code: "BN", name: "Benevento" },
  { code: "BG", name: "Bergamo" }, { code: "BI", name: "Biella" }, { code: "BO", name: "Bologna" },
  { code: "BZ", name: "Bolzano" }, { code: "BS", name: "Brescia" }, { code: "BR", name: "Brindisi" },
  { code: "CA", name: "Cagliari" }, { code: "CL", name: "Caltanissetta" }, { code: "CB", name: "Campobasso" },
  { code: "CE", name: "Caserta" }, { code: "CT", name: "Catania" }, { code: "CZ", name: "Catanzaro" },
  { code: "CH", name: "Chieti" }, { code: "CO", name: "Como" }, { code: "CS", name: "Cosenza" },
  { code: "CR", name: "Cremona" }, { code: "KR", name: "Crotone" }, { code: "CN", name: "Cuneo" },
  { code: "EN", name: "Enna" }, { code: "FE", name: "Ferrara" }, { code: "FI", name: "Firenze" },
  { code: "FG", name: "Foggia" }, { code: "FC", name: "Forlì-Cesena" }, { code: "FR", name: "Frosinone" },
  { code: "GE", name: "Genova" }, { code: "GO", name: "Gorizia" }, { code: "GR", name: "Grosseto" },
  { code: "IM", name: "Imperia" }, { code: "IS", name: "Isernia" }, { code: "SP", name: "La Spezia" },
  { code: "AQ", name: "L'Aquila" }, { code: "LT", name: "Latina" }, { code: "LE", name: "Lecce" },
  { code: "LC", name: "Lecco" }, { code: "LI", name: "Livorno" }, { code: "LO", name: "Lodi" },
  { code: "LU", name: "Lucca" }, { code: "MC", name: "Macerata" }, { code: "MN", name: "Mantova" },
  { code: "MS", name: "Massa-Carrara" }, { code: "MT", name: "Matera" }, { code: "ME", name: "Messina" },
  { code: "MI", name: "Milano" }, { code: "MO", name: "Modena" }, { code: "MB", name: "Monza e Brianza" },
  { code: "NA", name: "Napoli" }, { code: "NO", name: "Novara" }, { code: "NU", name: "Nuoro" },
  { code: "OR", name: "Oristano" }, { code: "PD", name: "Padova" }, { code: "PA", name: "Palermo" },
  { code: "PR", name: "Parma" }, { code: "PV", name: "Pavia" }, { code: "PG", name: "Perugia" },
  { code: "PU", name: "Pesaro e Urbino" }, { code: "PE", name: "Pescara" }, { code: "PC", name: "Piacenza" },
  { code: "PI", name: "Pisa" }, { code: "PT", name: "Pistoia" }, { code: "PN", name: "Pordenone" },
  { code: "PZ", name: "Potenza" }, { code: "PO", name: "Prato" }, { code: "RG", name: "Ragusa" },
  { code: "RA", name: "Ravenna" }, { code: "RC", name: "Reggio Calabria" }, { code: "RE", name: "Reggio Emilia" },
  { code: "RI", name: "Rieti" }, { code: "RN", name: "Rimini" }, { code: "RM", name: "Roma" },
  { code: "RO", name: "Rovigo" }, { code: "SA", name: "Salerno" }, { code: "SS", name: "Sassari" },
  { code: "SV", name: "Savona" }, { code: "SI", name: "Siena" }, { code: "SR", name: "Siracusa" },
  { code: "SO", name: "Sondrio" }, { code: "SU", name: "Sud Sardegna" }, { code: "TA", name: "Taranto" },
  { code: "TE", name: "Teramo" }, { code: "TR", name: "Terni" }, { code: "TO", name: "Torino" },
  { code: "TP", name: "Trapani" }, { code: "TN", name: "Trento" }, { code: "TV", name: "Treviso" },
  { code: "TS", name: "Trieste" }, { code: "UD", name: "Udine" }, { code: "VA", name: "Varese" },
  { code: "VE", name: "Venezia" }, { code: "VB", name: "Verbano-Cusio-Ossola" }, { code: "VC", name: "Vercelli" },
  { code: "VR", name: "Verona" }, { code: "VV", name: "Vibo Valentia" }, { code: "VI", name: "Vicenza" },
  { code: "VT", name: "Viterbo" },
];

interface AddressFormProps {
  address?: CustomerAddress;
  onSubmit: (data: Omit<CustomerAddress, 'id'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const inputClass = "w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:border-[#d4a5a5] focus:ring-1 focus:ring-[#d4a5a5]/20 transition-colors bg-white text-black disabled:opacity-60";

function resolveProvinceCode(province?: string): string {
  if (!province) return ""
  const byCode = ITALIAN_PROVINCES.find(p => p.code === province?.toUpperCase())
  if (byCode) return byCode.code
  const byName = ITALIAN_PROVINCES.find(p => p.name.toLowerCase() === province?.toLowerCase())
  return byName?.code || ""
}

export default function AddressForm({ address, onSubmit, onCancel, isLoading = false }: AddressFormProps) {
  const [form, setForm] = useState({
    first_name: address?.first_name || "",
    last_name: address?.last_name || "",
    company: address?.company || "",
    address_1: address?.address_1 || "",
    address_2: address?.address_2 || "",
    city: address?.city || "",
    province: address?.province || "",
    province_code: resolveProvinceCode(address?.province),
    country: address?.country || "Italia",
    country_code: address?.country_code?.toUpperCase() || "IT",
    postal_code: address?.postal_code || "",
    phone: address?.phone || "",
    is_default_shipping: address?.is_default_shipping || false,
  });

  useEffect(() => {
    if (address) {
      const code = resolveProvinceCode(address.province)
      setForm({
        first_name: address.first_name, last_name: address.last_name,
        company: address.company || "", address_1: address.address_1,
        address_2: address.address_2 || "", city: address.city,
        province: address.province, province_code: code,
        country: address.country || "Italia",
        country_code: address.country_code?.toUpperCase() || "IT",
        postal_code: address.postal_code, phone: address.phone || "",
        is_default_shipping: address.is_default_shipping,
      });
    }
  }, [address]);

  const set = (field: string, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }));

  const handleProvinceChange = (code: string) => {
    set("province_code", code);
    set("province", code);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...form, id: address?.id || "" } as CustomerAddress);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1">Nome *</label>
          <input type="text" value={form.first_name} onChange={e => set("first_name", e.target.value)}
            required placeholder="Mario" className={inputClass} disabled={isLoading} />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1">Cognome *</label>
          <input type="text" value={form.last_name} onChange={e => set("last_name", e.target.value)}
            required placeholder="Rossi" className={inputClass} disabled={isLoading} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-600 mb-1">Azienda (opzionale)</label>
        <input type="text" value={form.company} onChange={e => set("company", e.target.value)}
          placeholder="Nome azienda" className={inputClass} disabled={isLoading} />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-600 mb-1">Indirizzo *</label>
        <input type="text" value={form.address_1} onChange={e => set("address_1", e.target.value)}
          required placeholder="Via Roma, 1" className={inputClass} disabled={isLoading} />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-600 mb-1">Appartamento, scala (opzionale)</label>
        <input type="text" value={form.address_2} onChange={e => set("address_2", e.target.value)}
          placeholder="Scala B, interno 5" className={inputClass} disabled={isLoading} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1">Città *</label>
          <input type="text" value={form.city} onChange={e => set("city", e.target.value)}
            required placeholder="Roma" className={inputClass} disabled={isLoading} />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1">CAP *</label>
          <input type="text" value={form.postal_code} onChange={e => set("postal_code", e.target.value)}
            required placeholder="00100" className={inputClass} disabled={isLoading} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1">Provincia *</label>
          <select value={form.province_code} onChange={e => handleProvinceChange(e.target.value)}
            required className={inputClass} disabled={isLoading}>
            <option value="">Seleziona...</option>
            {ITALIAN_PROVINCES.map(p => (
              <option key={p.code} value={p.code}>{p.code} - {p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1">Paese *</label>
          <select value={form.country_code} onChange={e => { set("country_code", e.target.value); set("country", e.target.options[e.target.selectedIndex].text); }}
            required className={inputClass} disabled={isLoading}>
            <option value="IT">Italia</option>
            <option value="FR">Francia</option>
            <option value="DE">Germania</option>
            <option value="ES">Spagna</option>
            <option value="AT">Austria</option>
            <option value="CH">Svizzera</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-600 mb-1">Telefono</label>
        <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
          placeholder="+39 333 1234567" className={inputClass} disabled={isLoading} />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.is_default_shipping} onChange={e => set("is_default_shipping", e.target.checked)}
          className="w-5 h-5 rounded border-2 border-[#404040] cursor-pointer" disabled={isLoading} />
        <span className="text-sm text-stone-600">Imposta come indirizzo predefinito</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} disabled={isLoading}
          className="flex-1 py-3 border border-stone-300 rounded-xl text-stone-600 font-medium hover:bg-stone-50 transition-colors disabled:opacity-50">
          Annulla
        </button>
        <button type="submit" disabled={isLoading}
          className="flex-1 py-3 rounded-xl text-white font-semibold transition-colors disabled:opacity-50 bg-[#d4a5a5] hover:bg-[#c49494]">
          {isLoading ? "Salvataggio..." : address ? "Salva modifiche" : "Aggiungi indirizzo"}
        </button>
      </div>
    </form>
  );
}
