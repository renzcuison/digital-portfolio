import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="max-w-3xl w-full text-center space-y-6">

        <div className="flex justify-center">
          <Badge variant="secondary" className="rounded-full px-4 py-1 animate-pulse">
            A Digital Portfolio
          </Badge>
        </div>

        <h1 className="text-6xl font-extrabold tracking-tighter text-zinc-900">
          Hi, I'm <span className="text-zinc-500">Renz.</span>
        </h1>

        <p className="text-xl text-zinc-600 max-w-xl mx-auto leading-relaxed">
          I'm a developer building modern web applications with Next.js 16.
          Focused on clean code and great user experiences.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" className="rounded-full shadow-lg">
            View My Projects
          </Button>
          <Button variant="outline" size="lg" className="rounded-full">
            Contact Me
          </Button>
        </div>

      </div>
    </main>
  )
}