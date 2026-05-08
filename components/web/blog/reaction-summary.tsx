import { REACTIONS } from '@/data/reaction-data'
import { BlogReaction} from '@/lib/type'


const ReactionSummary = ({ reactions }: { reactions: BlogReaction[] }) => {
    if (!reactions.length) return null
    const counts: Record<string, number> = {}
    reactions.forEach(r => { counts[r.type] = (counts[r.type] || 0) + 1 })
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3)
  
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{ display: "flex" }}>
          {top.map(([type]) => {
            const r = REACTIONS.find(x => x.type === type)
            return <span key={type} style={{ fontSize: 15, marginRight: -4 }}>{r?.icon}</span>
          })}
        </div>
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)", marginLeft: 6 }}>
          {reactions.length}
        </span>
      </div>
    )
}

export default ReactionSummary