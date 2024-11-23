import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Achievement {
  title: string;
  desc: string;
  progress: number;
  icon: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols
-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.title} className="bg-card p-4 rounded-lg shadow-sm text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl">
                {achievement.icon}
              </div>
              <h4 className="font-bold text-foreground">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground">{achievement.desc}</p>
              <Progress value={achievement.progress} className="h-2" />
              <p className="text-sm text-primary">{achievement.progress}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

