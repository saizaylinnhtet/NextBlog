import { ReactionType } from "@/lib/type";


export const REACTIONS: { type: ReactionType; icon: string; label: string; color: string }[] = [
    { type: "LIKE",  icon: "👍", label: "Like",  color: "#4F86F7" },
    { type: "LOVE",  icon: "❤️", label: "Love",  color: "#F7426F" },
    { type: "HAHA",  icon: "😂", label: "Haha",  color: "#F7A542" },
    { type: "WOW",   icon: "😮", label: "Wow",   color: "#F7A542" },
    { type: "SAD",   icon: "😢", label: "Sad",   color: "#F7A542" },
    { type: "ANGRY", icon: "😡", label: "Angry", color: "#E85D30" },
]