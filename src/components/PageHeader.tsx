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
    <section className="pt-[48px] lg:pt-[80px]">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        {breadcrumbItems && (
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}

        <h1 className="text-[40px] lg:text-[64px] font-semibold tracking-[-0.015em] text-black leading-[1.07] mb-3">
          {title}
        </h1>

        <p className="text-[17px] lg:text-[21px] text-black/70 font-normal leading-[1.4] tracking-[-0.003em] max-w-[600px]">
          {subtitle}
        </p>

        {description && (
          <p className="mt-4 text-[15px] lg:text-[17px] text-black/50 font-normal leading-[1.6] max-w-[560px]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};
