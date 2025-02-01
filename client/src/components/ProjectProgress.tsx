import { Progress } from '@/components/ui/progress';
import { mockPrograms } from '@/data/mockData';

export default function ProjectProgress() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
      
      <div className="space-y-6">
        {mockPrograms.map((project) => (
          <div key={project.id}>
            <div className="flex justify-between mb-2">
              <p className="font-medium">{project.name}</p>
              <span className="text-sm text-muted-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
            <div className="flex gap-2 mt-2">
              {project.team.map((member) => (
                <div
                  key={member.id}
                  className="w-6 h-6 rounded-full overflow-hidden border-2 border-background"
                  style={{ marginLeft: '-0.5rem' }}
                >
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
