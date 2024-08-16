import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const Friends = () => {
  return (
    <Card className="grid lg:grid-cols-1 md:grid-cols-1 md:w-2/4 w-3/4 h-3/4 pr-2 shadow-xl">
        <section id="signup" className="grid place-items-center px-2 h-full">
            <div className="w-3/4">
                <h1 className="scroll-m-20 grid-cols-1 text-4xl font-extrabold tracking-tight lg:text-5xl">Add Friends</h1>
                <Input type="email" placeholder="Email" className="grid-cols-1 mt-5"/>
                <Button type="submit" className="grid-cols-1 mt-5">Submit</Button>
            </div>
        </section>
    </Card>
  )
}

export default Friends