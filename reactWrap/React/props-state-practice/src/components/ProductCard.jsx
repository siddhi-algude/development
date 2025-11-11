 

export default function ProductCard({
    title, 
    price,
    imgUrl,
    badge
}){
    return (
        <article className="card">
        {badge && <span className="badge">{badge}</span>}
        <img src={imgUrl} alt={title} width={160} height={160} />
        <h3>{title}</h3>
        <p>₹ {price.toLocaleString()}</p>
        </article>
    )
}