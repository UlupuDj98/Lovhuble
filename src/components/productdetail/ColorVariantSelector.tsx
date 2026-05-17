import type { ProductOption } from '../../data/products';

const COLOR_MAP: Record<string, string> = {
  Rosa: '#F472B6',
  Viola: '#8B5CF6',
  Bordeaux: '#7C1D2E',
  Nero: '#1d1d1f',
  Bianco: '#F8F8F8',
  Rosso: '#EF4444',
  Verde: '#22C55E',
  Marrone: '#92400E',
  Lilla: '#A78BFA',
};

interface ColorVariantSelectorProps {
  option: ProductOption;
  selectedOptions: Record<string, string>;
  onSelect: (title: string, value: string) => void;
  compact?: boolean;
  showLabel?: boolean;
}

export const ColorVariantSelector = ({
  option,
  selectedOptions,
  onSelect,
  compact = false,
  showLabel = true,
}: ColorVariantSelectorProps) => (
  <div>
    {showLabel && (
      <p className="text-[12px] sm:text-[14px] font-semibold text-[#1d1d1f] mb-[8px] sm:mb-[12px]">
        {option.title}:
      </p>
    )}
    <div className={`flex flex-wrap gap-[8px] sm:gap-[18px] ${compact ? 'justify-end' : ''}`}>
      {option.values.map(value => {
        const isSelected = selectedOptions[option.title] === value;
        const bg = COLOR_MAP[value] ?? '#888';
        const needsBorder = value === 'Bianco';
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(option.title, value)}
            className="flex flex-col items-center group gap-[3px] sm:gap-[6px]"
          >
            <div
              className={`rounded-full transition-all duration-200 w-[24px] h-[24px] sm:w-[34px] sm:h-[34px] ${
                isSelected
                  ? 'ring-2 ring-offset-1 sm:ring-offset-2 ring-[#1d1d1f] scale-105 sm:scale-110'
                  : 'ring-1 ring-[#d0d0d5] hover:scale-105'
              } ${needsBorder ? 'border border-[#d0d0d5]' : ''}`}
              style={{ backgroundColor: bg }}
            />
            {showLabel && (
              <span
                className={`text-[10px] sm:text-[11px] transition-colors ${
                  isSelected ? 'text-[#1d1d1f] font-medium' : 'text-[#6e6e73]'
                }`}
              >
                {value}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);
