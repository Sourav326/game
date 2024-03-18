
const Card = (props) => {
  return (
    <div className={`shadow-lg shadow-indigo-500/40 rounded-md p-8 font-medium rounded-lg text-white capitalize ${props.color}`}>
           <h2 className="text-lg">{props.title}</h2>
           <h1 className="text-2xl font-semibold pt-6">{props.value}</h1>
    </div>
  )
}

export default Card