import { Progress } from '@/components/ui/progress';
import { mockPrograms } from '@/data/mockPrograms';

export default function ProgramProgress() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Program Progress</h3>
      
      <div className="space-y-6">
        {mockPrograms.map((program) => (
          <div key={program.id}>
            <div className="flex justify-between mb-2">
              <p className="font-medium">{program.name}</p>
              <span className="text-sm text-muted-foreground">{program.progress}%</span>
            </div>
            <Progress value={program.progress} className="h-2" />
            <div className="flex gap-2 mt-2">
              {program.team.map((person) => (
                <div
                  key={person.id}
                  className="w-6 h-6 rounded-full overflow-hidden border-2 border-background"
                  style={{ marginLeft: '-0.5rem' }}
                >
                  <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
