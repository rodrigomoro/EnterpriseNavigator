import { Globe } from 'lucide-react';
import { useLanguage, type Language } from '@/lib/i18n/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: Record<Language, string> = {
    en: 'English',
    es: 'Español'
  };

  return (
    <div className="flex items-center gap-2 px-2 py-2">
      <Globe className="h-4 w-4" />
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="w-full bg-sidebar-accent text-sidebar-foreground border-sidebar-border">
          <SelectValue>
            <span className="text-sm">{languages[language]}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languages).map(([code, name]) => (
            <SelectItem key={code} value={code}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
