import { ResponsiveNetwork } from '@nivo/network';
import { Card } from "@/components/ui/card";

interface Node {
  id: string;
  height: number;
  size: number;
  color: string;
}

interface Link {
  source: string;
  target: string;
  distance: number;
}

interface PermissionGraphData {
  nodes: Node[];
  links: Link[];
}

interface Props {
  roles: Array<{
    id: number;
    name: string;
    permissions: Array<{
      id: number;
      name: string;
      category: string;
    }>;
  }>;
}

export default function PermissionGroupVisualization({ roles }: Props) {
  // Transform roles and permissions into network graph data
  const graphData: PermissionGraphData = {
    nodes: [],
    links: []
  };

  // Add role nodes
  roles.forEach(role => {
    graphData.nodes.push({
      id: `role-${role.id}`,
      height: 1,
      size: 20,
      color: role.name === 'Administrator' ? '#ef4444' : 
             role.name === 'Editor' ? '#3b82f6' : 
             role.name === 'Reader' ? '#10b981' : '#6366f1'
    });
  });

  // Add permission category nodes and links
  const categories = new Set<string>();
  roles.forEach(role => {
    role.permissions.forEach(perm => {
      categories.add(perm.category);
    });
  });

  categories.forEach(category => {
    graphData.nodes.push({
      id: `category-${category}`,
      height: 2,
      size: 15,
      color: '#94a3b8'
    });
  });

  // Create links between roles and categories
  roles.forEach(role => {
    const roleCategories = new Set(role.permissions.map(p => p.category));
    roleCategories.forEach(category => {
      graphData.links.push({
        source: `role-${role.id}`,
        target: `category-${category}`,
        distance: 80
      });
    });
  });

  return (
    <Card className="w-full h-[400px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ResponsiveNetwork
        data={graphData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        linkDistance={(e) => e.distance}
        centeringStrength={0.3}
        repulsivity={6}
        nodeSize={(n) => n.size}
        activeNodeSize={(n) => 1.5 * n.size}
        nodeColor={(e) => e.color}
        nodeBorderWidth={1}
        nodeBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.8]]
        }}
        linkBlendMode="multiply"
        motionConfig="gentle"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: -20,
            translateY: -20,
            itemWidth: 100,
            itemHeight: 14,
            itemDirection: 'left-to-right',
            itemTextColor: '#777',
            symbolSize: 12,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </Card>
  );
}
