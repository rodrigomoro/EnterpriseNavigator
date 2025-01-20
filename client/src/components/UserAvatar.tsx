import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, LogOut } from 'lucide-react';
import { useLanguage, type Language } from '@/lib/i18n/LanguageContext';

export default function UserAvatar() {
  const { language, setLanguage } = useLanguage();

  const languages: Record<Language, { flag: string }> = {
    en: { flag: '🇺🇸' },
    es: { flag: '🇪🇸' }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana" alt="Juliana" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Juliana</p>
            <p className="text-xs leading-none text-muted-foreground">juliana@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center w-full">
              <span className="mr-2">Language</span>
              <div className="ml-auto flex gap-2">
                {Object.entries(languages).map(([code, { flag }]) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code as Language)}
                    className={`text-lg ${code === language ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
                  >
                    {flag}
                  </button>
                ))}
              </div>
            </div>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}