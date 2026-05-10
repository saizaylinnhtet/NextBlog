import { REACTIONS } from '@/data/reaction-data'
import { ReactionType } from '@/lib/type'

const ReactionPicker = ({ onReact, currentReaction }: {
    onReact: (type: ReactionType) => void
    currentReaction: ReactionType | null
}) => {
    return (
        <div className="
        animate-picker-pop origin-bottom-left
        absolute bottom-[calc(100%+8px)] left-0 z-10 
        flex gap-1.5 items-center px-3 py-1.5 
        rounded-full border bg-background shadow-lg
      ">
            {REACTIONS.map(r => (
                <button
                    key={r.type}
                    onClick={() => onReact(r.type)}
                    title={r.label}
                    className={`
              text-[22px] px-1 py-0.5 rounded-lg bg-transparent cursor-pointer
              transition-transform duration-150 hover:scale-135
              ${currentReaction === r.type ? "drop-shadow-md" : ""}
            `}
                >
                    {r.icon}
                </button>
            ))}
        </div>
    )
}

export default ReactionPicker