import { REACTIONS } from '@/data/reaction-data'
import { ReactionType } from '@/lib/type'


const ReactionPicker = ({ onReact, currentReaction }: {
    onReact: (type: ReactionType) => void
    currentReaction: ReactionType | null
}) => {
    return (
        <div style={{
            position: "absolute", bottom: "calc(100% + 8px)", left: 0,
            background: "var(--color-background-primary)",
            border: "1px solid var(--color-border-tertiary)",
            borderRadius: 999, padding: "6px 10px",
            display: "flex", gap: 6,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            zIndex: 10,
        }}>
            {REACTIONS.map(r => (
                <button key={r.type} onClick={() => onReact(r.type)} title={r.label}
                    style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: 22, padding: "2px 4px", borderRadius: 8,
                        transform: "scale(1)", transition: "transform 0.15s",
                        filter: currentReaction === r.type ? "drop-shadow(0 0 4px rgba(0,0,0,0.3))" : "none",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.35)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                    {r.icon}
                </button>
            ))}
        </div>
    )
}

export default ReactionPicker