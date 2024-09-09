import { Button } from "@/components/ui/button";

const Test = () => {
    return (
        <div className="md:w-3/5 relative md:mx-auto">
            <div className="grid md:grid-cols-2 items-center">
                <div className="p-10">
                    <h1 className="text-6xl font-bold tracking-wider uppercase w-min">Come Imagine Ideas</h1>
                    <Button className="bg-sky-500">Get Started</Button>
                </div>
                <div>
                    <img src="landingHero.svg" />
                </div>
            </div>
        </div>
    )
}

export default Test;