import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTeamMembers } from "@/data/mockData";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { ResponsiveNetwork } from '@nivo/network';

// Transform mock data into network graph format
const generateOrgData = () => {
  // Create nodes from team members
  const nodes = mockTeamMembers.map((member) => ({
    id: member.id,
    height: 1,
    size: member.isDirector ? 24 : 16,
    data: {
      name: member.name,
      role: member.role,
      avatar: member.avatar,
      isDirector: member.isDirector,
    },
  }));

  // Create hierarchical links
  // In this example, we'll make directors the top level
  // and connect other members to them
  const links = mockTeamMembers
    .filter(member => !member.isDirector)
    .map((member, index) => {
      const director = mockTeamMembers.find(m => m.isDirector);
      return {
        source: director?.id || "1",
        target: member.id,
        distance: 50,
      };
    });

  return { nodes, links };
};

const orgData = generateOrgData();

const NetworkNode = ({ node }: { node: any }) => (
  <div style={{ 
    background: node.data.isDirector ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
    color: node.data.isDirector ? 'hsl(var(--primary-foreground))' : 'hsl(var(--secondary-foreground))',
    padding: '8px 16px',
    borderRadius: '16px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    <img 
      src={node.data.avatar} 
      alt={node.data.name}
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
      }}
    />
    <div>
      <div style={{ fontWeight: 500 }}>{node.data.name}</div>
      <div style={{ fontSize: '12px', opacity: 0.8 }}>{node.data.role}</div>
    </div>
  </div>
);

export default function Organization() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Organization</h1>
                <p className="text-muted-foreground">Team Structure and Hierarchy</p>
              </div>
              <UserAvatar />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Organizational Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[700px] border rounded-lg bg-background/50">
                  <ResponsiveNetwork
                    data={orgData}
                    margin={{ top: 40, right: 120, bottom: 40, left: 120 }}
                    linkDistance={200}
                    centeringStrength={0.3}
                    repulsivity={6}
                    nodeSize={node => node.size}
                    activeNodeSize={node => node.size * 1.2}
                    nodeColor={node => node.data.isDirector ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
                    nodeBorderWidth={1}
                    nodeBorderColor={{
                      from: 'color',
                      modifiers: [['darker', 0.8]],
                    }}
                    linkThickness={2}
                    linkBlendMode="multiply"
                    motionConfig="gentle"
                    renderNode={({ node }) => <NetworkNode node={node} />}
                  />
                </div>
              </CardContent>
            </Card>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
