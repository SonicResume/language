import {
  ShoppingBag,
  Megaphone,
  Search,
  Store,
  Globe,
  Layout,
  List,
  Mail
} from "lucide-react";

const contentTypes = [
  { id: "product_description", label: "Product Description", icon: ShoppingBag },
  { id: "product_ad_copy", label: "Ad Copy", icon: Megaphone },
  { id: "product_seo", label: "SEO Listing", icon: Search },
  { id: "product_amazon", label: "Amazon Listing", icon: Store },
  { id: "product_shopify", label: "Shopify Page", icon: Globe },
  { id: "product_landing", label: "Landing Page", icon: Layout },
  { id: "product_features", label: "Feature Highlights", icon: List },
  { id: "product_email", label: "Sales Email", icon: Mail }
];interface ContentTypeSelectorProps {

  selectedType: string;
  onSelect: (type: string) => void;
}

export function ContentTypeSelector({ selectedType, onSelect }: ContentTypeSelectorProps) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-sky-800/80 mb-3 uppercase tracking-wider">
        Content Type
      </h2>
      <div className="flex flex-wrap gap-2">
        {contentTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onSelect(type.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all border ${
                isSelected
                  ? "bg-sky-600 border-sky-600 text-white shadow-sm"
                  : "bg-white border-sky-200/60 text-sky-800 hover:border-sky-400 hover:text-sky-950"
              }`}
            >
              <Icon className="w-4 h-4" />
              {type.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { contentTypes };
