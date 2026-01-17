import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-3xl w-full text-center space-y-6">

        {/* <div className="flex justify-center">
          <Badge variant="secondary" className="rounded-full px-4 py-1 animate-pulse">
            Lorem Ipsum dolor.
          </Badge>
        </div> */}

        {/* <h1 className="text-6xl font-extrabold tracking-tighter text-foreground">
          Hi, I'm <span className="text-zinc-500">Renz.</span>
        </h1> */}

        {/* <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p> */}

        {/* <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" className="rounded-full shadow-lg">
            View My Projects
          </Button>
          <Button variant="outline" size="lg" className="rounded-full">
            Contact Me
          </Button>
        </div> */}

      </div>
    </main>
  )
}