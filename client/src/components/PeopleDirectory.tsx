import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { mockPeople } from '@/data/mockPeople';

export default function PeopleDirectory() {
  const [showAll, setShowAll] = useState(false);
  const displayPeople = showAll ? mockPeople : mockPeople.slice(0, 5);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">People Directory</h3>
        <Link href="/people">
          <Button variant="outline" size="sm">See all people</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {displayPeople.map((person) => (
          <Link key={person.id} href={`/people/${person.id}`}>
            <a className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg">
              <Avatar>
                <AvatarImage src={person.avatar} alt={person.name} />
                <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{person.name}</p>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>

      {mockPeople.length > 5 && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="gap-2"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}