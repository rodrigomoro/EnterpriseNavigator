import { PreRegistrationManager } from '@/components/PreRegistrationManager'
import { PreRegistrationFormDialog } from '@/components/PreRegistrationFormDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Sidebar from '@/components/Sidebar'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import UserAvatar from '@/components/UserAvatar'
import PageTransition from '@/components/PageTransition'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export const ProgramEnrollments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast()

  const handlePreRegister = (data: any) => {
    console.log('Creating pre-registration:', data)
    toast({
      title: "Pre-registration created",
      description: "The pre-registration has been created successfully.",
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <header>
            <div className="px-6 h-16 flex items-center justify-between gap-8 mb-6">
              <div className="min-w-60">
                <h1 className="text-3xl font-bold">Program Enrollments</h1>
                <p className="text-muted-foreground">Manage pre-registrations and enrollments</p>
              </div>

              <div className="flex-1 flex justify-center max-w-xl">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search enrollments..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="min-w-60 flex justify-end items-center gap-4">
                <PreRegistrationFormDialog onPreRegister={handlePreRegister} />
                <UserAvatar />
              </div>
            </div>
          </header>

          <main className="p-6">
            <Card className="p-6">
              <Tabs defaultValue="pre-registrations">
                <TabsList>
                  <TabsTrigger value="pre-registrations">Pre-registrations</TabsTrigger>
                  <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
                </TabsList>

                <TabsContent value="pre-registrations" className="mt-4">
                  <PreRegistrationManager />
                </TabsContent>

                <TabsContent value="enrollments" className="mt-4">
                  <div className="py-8 text-center text-muted-foreground">
                    Enrollment management will be implemented in the next phase
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </main>
        </PageTransition>
      </div>
    </div>
  )
}

export default ProgramEnrollments