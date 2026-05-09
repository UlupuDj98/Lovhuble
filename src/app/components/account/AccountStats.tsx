import { MedusaCustomer } from "@/types/customer";
import { memo } from "react";

interface AccountStatsProps {
  customer: MedusaCustomer;
  orderCount: number;
  totalSpent: number;
}

function AccountStats({ customer, orderCount, totalSpent }: AccountStatsProps) {
  const stats = [
    {
      id: "orders",
      label: "Ordini Totali",
      value: orderCount.toString(),
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      id: "spent",
      label: "Totale Speso",
      value: `€${totalSpent.toFixed(2)}`,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
    {
      id: "addresses",
      label: "Indirizzi Salvati",
      value: customer.addresses.length.toString(),
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
    },
    {
      id: "member",
      label: "Cliente Dal",
      value: new Date(customer.created_at).toLocaleDateString("it-IT", { month: "short", year: "numeric" }),
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      iconColor: "text-[#d4a5a5]",
      iconBg: "bg-[#d4a5a5]/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-xl ${stat.iconBg} ${stat.iconColor}`}>{stat.icon}</div>
          </div>
          <p className="text-2xl font-bold text-black mb-1">{stat.value}</p>
          <p className="text-sm text-stone-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default memo(AccountStats);
