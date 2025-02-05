import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockTeamMembers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function PeopleDirectory() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">People Directory</h3>
        <Link href="/people">
          <Button variant="outline" size="sm">See all people</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {mockTeamMembers.map((member) => (
          <Link key={member.id} href={`/people/${member.id}`}>
            <a className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg">
              <Avatar>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}