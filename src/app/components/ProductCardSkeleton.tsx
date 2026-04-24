import { motion } from 'motion/react';

export const ProductCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-[16px]"
    >
      {/* Image skeleton */}
      <div className="relative overflow-hidden rounded-[18px] bg-[#f5f5f7] aspect-[3/4]">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear',
          }}
        />
      </div>

      {/* Text skeletons */}
      <div className="space-y-[8px]">
        <div className="h-[12px] w-[60px] bg-[#f5f5f7] rounded-full" />
        <div className="h-[20px] w-[80%] bg-[#f5f5f7] rounded-full" />
        <div className="h-[18px] w-[40px] bg-[#f5f5f7] rounded-full" />
      </div>
    </motion.div>
  );
};
