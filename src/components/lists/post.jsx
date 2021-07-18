export const Post = (props) => {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const date = mm + '/' + dd + '/' + yyyy;

    const res = props.group.discription

    const descrip = res.length > 50 ? `${res.slice(0, 50)}. . .` : res

    return <div className="card">
        <div className="card-content">
            {date === props.group.date && <h5 className="new_post">NEW POST</h5>}
            <div className="header">  <h3 className="width__name">{props.group.name}</h3>  </div>
            <h5 className="width__name">{descrip}</h5>
        </div>

        <div className="card-content">
            <button className="waves-effect waves-light btn activator ">More detail</button>
        </div>
        <div className="card-reveal">
            <span className="card-title grey-text text-darken-4"><i className="right">close</i></span>
            <div className="row">
                <div className="card-content">
                    <h5 className="width__name">{props.group.name}</h5>
                    <h3 className="width__name">{props.group.topik}</h3>
                    <p className="width__name">{res}</p>

                    <h6>the author of this article has an email <span className="blue-text">{props.group.user}</span> you can subscribe to it and read his publications</h6>
                    <small>date: {props.group.date}</small>
                </div>

            </div>
        </div>
    </div>
}



