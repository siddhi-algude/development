function Model ({title,Content}){
    return(
        <div className="modal">
            <h2>{title}</h2>
            <Content/>
        </div>
    );

}  
export default Model;


// Nesting componentns via props

