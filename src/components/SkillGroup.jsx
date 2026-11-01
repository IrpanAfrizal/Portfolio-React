export default function SkillGroup({ group }) {
  return (
    <div className="card">
      <h3 style={{ font: '500 13px var(--sans)', marginBottom: 6 }}>{group.name}</h3>
      <p className="muted" style={{ fontSize: 12 }}>{group.tech.join(' · ')}</p>
    </div>
  )
}
