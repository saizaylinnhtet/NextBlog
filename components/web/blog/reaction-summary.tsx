import { REACTIONS } from '@/data/reaction-data'
import { BlogReaction } from '@/lib/type'

const ReactionSummary = ({ reactions}: { reactions: BlogReaction[]}) => {
  if (!reactions.length) return null

  const counts: Record<string, number> = {}
  reactions.forEach(r => { counts[r.type] = (counts[r.type] || 0) + 1 })
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3)

  return (
    <div className="flex items-center gap-1 pl-1 pr-5 rounded hover:bg-secondary">
      <div className="flex">
        {top.map(([type]) => {
          const r = REACTIONS.find(x => x.type === type)
          return (
            <span key={type} className="text-[15px] -mr-1">
              {r?.icon}
            </span>
          )
        })}
      </div>
      <span className="text-[13px] text-muted-foreground ml-1.5">
        {reactions.length}
      </span>
    </div>
  )
}

export default ReactionSummary