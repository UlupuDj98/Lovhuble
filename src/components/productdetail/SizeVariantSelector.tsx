import type { ProductOption } from '../../data/products';

const POPULAR_VALUES = new Set(['M', 'S/M', '100ml']);

interface SizeVariantSelectorProps {
  option: ProductOption;
  selectedOptions: Record<string, string>;
  onSelect: (title: string, value: string) => void;
}

export const SizeVariantSelector = ({
  option,
  selectedOptions,
  onSelect,
}: SizeVariantSelectorProps) => (
  <div>
    <p className="text-[12px] sm:text-[14px] font-semibold text-[#1d1d1f] mb-[8px] sm:mb-[12px]">
      {option.title}:
    </p>
    <div className="flex flex-wrap gap-[6px] sm:gap-[8px]">
      {option.values.map(value => {
        const isSelected = selectedOptions[option.title] === value;
        const isPopular = POPULAR_VALUES.has(value);
        return (
          <div key={value} className="relative">
            {isPopular && (
              <span className="absolute -top-[7px] sm:-top-[9px] left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] font-bold text-white bg-[#FF6B35] px-[4px] sm:px-[6px] py-[1px] rounded-full whitespace-nowrap z-10">
                popular
              </span>
            )}
            <button
              type="button"
              onClick={() => onSelect(option.title, value)}
              className={`px-[10px] sm:px-[14px] h-[34px] sm:h-[44px] min-w-[40px] sm:min-w-[52px] rounded-[8px] sm:rounded-[10px] text-[11px] sm:text-[13px] font-semibold border sm:border-2 transition-all duration-200 ${
                isSelected
                  ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                  : 'bg-white text-[#1d1d1f] border-[#d0d0d5] hover:border-[#1d1d1f]'
              }`}
            >
              {value}
            </button>
          </div>
        );
      })}
    </div>
  </div>
);
