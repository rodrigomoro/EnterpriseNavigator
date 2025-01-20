import { useState } from 'react';
import { mockProjects } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'wouter';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ProjectDirectory() {
  const [showAll, setShowAll] = useState(false);
  const { language } = useLanguage();
  const displayProjects = showAll ? mockProjects : mockProjects.slice(0, 3);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {language === 'en' ? 'Program Directory' : 'Directorio de Programas'}
        </h3>
        <Link href="/programs">
          <Button variant="outline" size="sm">
            {language === 'en' ? 'See all programs' : 'Ver todos los programas'}
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {displayProjects.map((project) => (
          <div key={project.id} className="hover:bg-muted/50 px-2 rounded-md">
            <Link href={`/program/${project.id}`}>
              <div className="flex items-center justify-between py-2 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-sm">P</span>
                  </div>
                  <div>
                    <p className="font-medium">{project.name[language]}</p>
                  </div>
                </div>

                <div className="flex -space-x-2">
                  {project.team.map((member) => (
                    <Link key={member.id} href={`/people/${member.id}`}>
                      <Avatar className="border-2 border-background w-8 h-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </Link>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {mockProjects.length > 3 && (
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