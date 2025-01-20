import { Globe } from 'lucide-react';
import { useLanguage, type Language } from '@/lib/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: Record<Language, { name: string, flag: string }> = {
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' }
  };

  return (
    <div className="flex items-center gap-2 px-2 py-2">
      <Globe className="h-4 w-4" />
      <div className="flex gap-1">
        {Object.entries(languages).map(([code, { name, flag }]) => (
          <Button
            key={code}
            variant="ghost"
            size="sm"
            className={cn(
              "px-2 h-8 text-sm",
              code === language ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"
            )}
            onClick={() => setLanguage(code as Language)}
          >
            <span className="mr-1">{flag}</span>
            <span className="hidden md:inline">{name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}