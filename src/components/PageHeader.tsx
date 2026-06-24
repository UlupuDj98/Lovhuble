'use client';

import { motion } from 'motion/react';
import { Breadcrumb } from './productdetail/Breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
}

export const PageHeader = ({ title, subtitle, description, breadcrumbItems }: PageHeaderProps) => {
  return (
    <section className="pt-[68px] lg:pt-[80px]">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        {breadcrumbItems && (
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[40px] lg:text-[64px] font-semibold tracking-[-0.015em] text-black leading-[1.07] mb-3"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="text-[17px] lg:text-[21px] text-black/70 font-normal leading-[1.4] tracking-[-0.003em] max-w-[600px]"
        >
          {subtitle}
        </motion.p>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5 }}
            className="mt-4 text-[15px] lg:text-[17px] text-black/50 font-normal leading-[1.6] max-w-[560px]"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
};
