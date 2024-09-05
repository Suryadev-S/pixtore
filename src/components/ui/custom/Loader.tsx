import { Key, useState } from "react"
import { Skeleton } from "../skeleton"

interface LoaderProps {
    className?: string,
    fillCount: number
}

const Loader = ({ className, fillCount }: LoaderProps) => {
    return (
        <ul className={className}>
            {Array.from({ length: fillCount }, (_, i: Key) => {
                return (
                    <li key={i}>
                        <div>
                            <div className="flex gap-3 mb-4">
                                <Skeleton className="w-6 h-6 rounded-full opacity-5" />
                                <Skeleton className="w-full h-6 rounded-full opacity-5" />
                            </div>
                            <div>
                                <Skeleton className="w-full h-[350px] rounded-md opacity-5" />
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default Loader;