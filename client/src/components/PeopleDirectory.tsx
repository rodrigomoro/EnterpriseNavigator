import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockTeamMembers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PeopleDirectory() {
  const [showAll, setShowAll] = useState(false);
  const { language } = useLanguage();
  const displayMembers = showAll ? mockTeamMembers : mockTeamMembers.slice(0, 5);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {language === 'en' ? 'People Directory' : 'Directorio de Personal'}
        </h3>
        <Link href="/people">
          <Button variant="outline" size="sm">
            {language === 'en' ? 'See all people' : 'Ver todo el personal'}
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {displayMembers.map((member) => (
          <div key={member.id} className="hover:bg-muted/50 p-2 rounded-lg">
            <Link href={`/people/${member.id}`}>
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role[language]}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {mockTeamMembers.length > 5 && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="gap-2"
          >
            {showAll ? (
              <>
                {language === 'en' ? 'Show Less' : 'Mostrar Menos'} <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                {language === 'en' ? 'Show More' : 'Mostrar Más'} <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}