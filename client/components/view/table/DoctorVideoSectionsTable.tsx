import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { IVideoSection } from "@/types/entities"

interface VideoSectionsTableProps {
  sections: IVideoSection[];
  isLoading: boolean;
}

export default function VideoSectionsTable({ sections, isLoading }: VideoSectionsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Sections</CardTitle>
        <CardDescription>A list of all video sections including doctor and patient details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Patient</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-[80px]" /></TableCell>
                  </TableRow>
                ))
              ) : sections.length > 0 ? (
                sections.map((section) => (
                  <TableRow key={section._id!}>
                    <TableCell>
                      <Image
                        src={section.patientProfile!}
                        alt={section.patientName!}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell>{section.patientName}</TableCell>
                    <TableCell>{new Date(section.startTime!).toLocaleString()}</TableCell>
                    <TableCell>{new Date(section.endTime!).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={section.status === 'pending' ? 'outline' : 'default'}
                      >
                        {section.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No sections found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}