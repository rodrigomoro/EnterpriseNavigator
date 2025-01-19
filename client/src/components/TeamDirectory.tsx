import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockTeamMembers } from '@/data/mockData';

export default function PeopleDirectory() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">People Directory</h3>

      <div className="space-y-4">
        {mockTeamMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}