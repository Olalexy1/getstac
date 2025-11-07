import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: string | number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="bg-white border-gray-200 rounded-md">
      <CardContent className="px-6 py-1">
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#71717A] uppercase tracking-wide">{label}</p>
          <p className="text-sm font-bold text-[#242440]">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
