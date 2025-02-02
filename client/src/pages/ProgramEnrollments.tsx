import { PreRegistrationManager } from '@/components/PreRegistrationManager'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const ProgramEnrollments = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Program Enrollments</h1>
        <Button>New Pre-registration</Button>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="pre-registrations">
          <TabsList>
            <TabsTrigger value="pre-registrations">Pre-registrations</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pre-registrations">
            <PreRegistrationManager />
          </TabsContent>
          
          <TabsContent value="enrollments">
            <div className="py-8 text-center text-muted-foreground">
              Enrollment management will be implemented in the next phase
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

export default ProgramEnrollments
