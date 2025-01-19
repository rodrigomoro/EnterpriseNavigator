import { ResponsiveNetwork } from '@nivo/network';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProjects, mockTeamMembers } from "@/data/mockData";
import { useState } from 'react';

// Transform mock data into network data structure
const generateNetworkData = () => {
  const nodes = [
    // Root node (Institution)
    { id: 'institution', radius: 20, depth: 0, color: 'hsl(var(--primary))' }
  ];

  const links: Array<{ source: string; target: string; distance: number }> = [];

  // Add program nodes
  mockProjects.forEach((project, index) => {
    const projectId = `program-${index}`;
    nodes.push({
      id: projectId,
      radius: 15,
      depth: 1,
      color: 'hsl(var(--primary))',
      data: {
        name: project.name,
        progress: project.progress,
        studentCount: project.studentCount
      }
    });
    links.push({
      source: 'institution',
      target: projectId,
      distance: 80
    });

    // Add team member nodes for each program
    project.team.forEach((member, memberIndex) => {
      const memberId = `${projectId}-member-${memberIndex}`;
      nodes.push({
        id: memberId,
        radius: 10,
        depth: 2,
        color: member.isDirector ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
        data: {
          name: member.name,
          role: member.role,
          isDirector: member.isDirector
        }
      });
      links.push({
        source: projectId,
        target: memberId,
        distance: 50
      });
    });
  });

  return { nodes, links };
};

export default function OrganizationalHierarchy() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const networkData = generateNetworkData();

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Organizational Hierarchy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] relative">
          <ResponsiveNetwork
            data={networkData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            repulsivity={6}
            iterations={60}
            nodeColor="color"
            nodeBorderWidth={1}
            nodeBorderColor={{
              from: 'color',
              modifiers: [['darker', 0.8]]
            }}
            linkBlendMode="multiply"
            motionConfig="gentle"
            onClick={(node) => setSelectedNode(node)}
            tooltip={({ node }: any) => (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid gap-2">
                  {node.data?.name ? (
                    <>
                      <div className="font-medium">{node.data.name}</div>
                      {node.data.role && (
                        <div className="text-sm text-muted-foreground">
                          Role: {node.data.role}
                          {node.data.isDirector && " (Director)"}
                        </div>
                      )}
                      {node.data.studentCount && (
                        <>
                          <div className="text-sm text-muted-foreground">
                            Students: {node.data.studentCount}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Progress: {node.data.progress}%
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="font-medium">Educational Institution</div>
                  )}
                </div>
              </div>
            )}
          />
          {selectedNode && (
            <div className="absolute bottom-4 left-4 rounded-lg border bg-background p-4 shadow-lg">
              <h3 className="font-medium mb-2">
                {selectedNode.data?.name || 'Educational Institution'}
              </h3>
              {selectedNode.data?.role && (
                <p className="text-sm text-muted-foreground">
                  Role: {selectedNode.data.role}
                  {selectedNode.data.isDirector && " (Director)"}
                </p>
              )}
              {selectedNode.data?.studentCount && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Students: {selectedNode.data.studentCount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Progress: {selectedNode.data.progress}%
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}