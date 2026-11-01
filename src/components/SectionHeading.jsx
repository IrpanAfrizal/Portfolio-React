export default function SectionHeading({ index, title, sub, as: Tag = 'h2' }) {
  return (
    <div className="sh">
      {index && <small>{index}</small>}
      <Tag>{title}</Tag>
      {sub && <p>{sub}</p>}
    </div>
  )
}
