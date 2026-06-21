import {
  ShoppingBag,
  Megaphone,
  Search,
  Store,
  Layout,
  MessageCircle,
  HelpCircle,
  DollarSign,
  Wrench
} from "lucide-react";

interface ContentTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const contentTypes = [
  { id: "e_store_content", label: "E-Store Content", icon: ShoppingBag },
  { id: "product_descriptions", label: "Product Descriptions", icon: ShoppingBag },
  { id: "product_demo_content", label: "Product Demo Content (Videos & Visual Guides)", icon: Store },
  { id: "blogs", label: "Blogs", icon: Layout },
  { id: "social_media_content", label: "Social Media Content", icon: MessageCircle },
  { id: "marketing_materials", label: "Marketing Materials", icon: Megaphone },
  { id: "seo_content", label: "SEO Content", icon: Search },
  { id: "buyers_guides", label: "Buyer’s Guides", icon: HelpCircle },
  { id: "pricing_guides", label: "Pricing Guides", icon: DollarSign },
  { id: "how_to_guides", label: "How-To Guides", icon: Wrench }
];

export function ContentTypeSelector({
  selectedType,
  onSelect
}: ContentTypeSelectorProps) {
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