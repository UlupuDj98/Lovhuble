'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AlarmClock, Loader } from 'lucide-react'
import { useSpecialOffers } from '../../hooks/useSpecialOffers'


type Countdown = {
  days: string
  hours: string
  minutes: string
}

export default function PromoBanner() {
  const { allProducts, loading } = useSpecialOffers()
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  
  const [timeLeft, setTimeLeft] = useState<Countdown>({
    days: '00',
    hours: '00',
    minutes: '00',
  })

  useEffect(() => {
    const endTime = new Date('2026-05-20T23:59:59').getTime()

    const updateTimer = () => {
      const now = Date.now()
      const distance = endTime - now

      if (distance <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
        })

        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      )

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      )

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
      })
    }

    updateTimer()

    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  // Auto-rotate products every 3 seconds
  useEffect(() => {
    if (allProducts.length === 0) return

    const rotateInterval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => 
        prevIndex === allProducts.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(rotateInterval)
  }, [allProducts])

  return (
    <section className="max-w-[1120px] mx-3 lg:mx-auto px-6 lg:px-8 mb-[48px] lg:mb-[64px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#d8abab] to-[#c99191] p-6 md:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.08)] my-10 lg:my-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center py-5 md:py-10 px-3 md:px-6">
        {/* LEFT */}
        <div className="flex flex-col items-start gap-7">
          {/* TIMER */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-md font-bold uppercase tracking-wide text-[#1a1a1a]">
              <AlarmClock className="h-8 w-8" />
              Scade tra:
            </div>
            <div className="flex items-center gap-2">
              <TimerBlock
                value={timeLeft.days}
                label="Giorni"
              />
              <Separator />
              <TimerBlock
                value={timeLeft.hours}
                label="Ore"
              />
              <Separator />
              <TimerBlock
                value={timeLeft.minutes}
                label="Minuti"
              />
            </div>
          </div>

        {/* RIGHT - Mobile */}
        <div className="min-h-[260px] items-center justify-center lg:min-h-[420px] block sm:hidden">
          <div className="relative flex h-[300px] w-[300px] items-center justify-center rounded-2xl bg-white overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <Loader className="w-12 h-12 animate-spin text-[#1a1a1a]" />
                <div className="mt-4 text-sm font-medium text-[#2d2d2d]">Caricamento offerte...</div>
              </div>
            ) : allProducts.length > 0 ? (
              <>
                {/* Product Image */}
                <img 
                  src={allProducts[currentProductIndex]?.images?.[0] || '/placeholder-product.jpg'}
                  alt={allProducts[currentProductIndex]?.name || 'Prodotto'}
                  className="w-3/4 h-3/4 object-contain"
                />
                
                {/* Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {allProducts.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentProductIndex
                          ? 'bg-[#1a1a1a] w-6'
                          : 'bg-[#1a1a1a]/30 w-2'
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <div className="text-6xl mb-4">🎁</div>
                <div className="text-sm font-medium text-[#2d2d2d]">Nessuna offerta disponibile</div>
              </div>
            )}
          </div>
        </div>

          {/* TEXT */}
          <div className="max-w-xl space-y-3">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#1a1a1a] md:text-3xl">
              {loading ? 'Caricamento...' : allProducts[currentProductIndex]?.name || 'Offerta Speciale'}
            </h2>

            <p className="text-md leading-relaxed text-[#2d2d2d] md:text-base">
              {loading ? 'Stiamo caricando le migliori offerte...' : 
               allProducts[currentProductIndex]?.subtitle || 'Una selezione esclusiva di prodotti premium.'}
            </p>
            
          </div>

          {/* CTA */}
          <Link
            href={`/prodotti/${allProducts[currentProductIndex]?.categorySlug}/${allProducts[currentProductIndex]?.subCategorySlug}/${allProducts[currentProductIndex]?.slug}`}
            aria-label="Scopri le offerte disponibili"
            className="rounded-full bg-[#1a1a1a] px-8 py-3 text-sm font-bold uppercase tracking-wide text-[#d4a5a5] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2d2d2d] hover:cursor-pointer"
          >
            Scopri l'offerta
          </Link>
        </div>

        {/* RIGHT */}
        <div className="min-h-[260px] items-center justify-center lg:min-h-[420px] hidden sm:block">
          <div className="relative flex aspect-square w-full max-w-[420px] items-center justify-center rounded-2xl bg-white overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <Loader className="w-12 h-12 animate-spin text-[#1a1a1a]" />
                <div className="mt-4 text-sm font-medium text-[#2d2d2d]">Caricamento offerte...</div>
              </div>
            ) : allProducts.length > 0 ? (
              <>
                {/* Product Image */}
                <img 
                  src={allProducts[currentProductIndex]?.images?.[0] || '/placeholder-product.jpg'}
                  alt={allProducts[currentProductIndex]?.name || 'Prodotto'}
                  className="w-4/5 h-4/5 object-contain"
                />
                
                {/* Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {allProducts.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentProductIndex
                          ? 'bg-[#1a1a1a] w-6'
                          : 'bg-[#1a1a1a]/30 w-2'
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <div className="text-6xl mb-4">🎁</div>
                <div className="text-sm font-medium text-[#2d2d2d]">Nessuna offerta disponibile</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


function TimerBlock({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="min-w-[64px] rounded-md border border-white/20 bg-white/20 px-4 py-3 text-center backdrop-blur-md">
      <span className="block text-2xl font-extrabold leading-none text-[#1a1a1a] md:text-3xl">
        {value}
      </span>

      <span className="mt-1 block text-[10px] font-bold uppercase tracking-wide text-[#2d2d2d]">
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <span className="text-lg font-light text-[#2d2d2d]">
      :
    </span>
  )
}