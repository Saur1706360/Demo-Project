import React, {Component} from "react";
class MyBook extends Component{

    removeBookFromStore = (id)=>{
        this.props.removeBookFromLibrary(id);
    }
    render()
    {
       let {MyBookArr=[]} = this.props;
       console.log(MyBookArr);
        return(
            <div className="container">
                {
                    MyBookArr.length > 0 ?
                    <div className="row text-center">
                    {
                        MyBookArr.map((ele,index)=>(
                            <div className="col-3 border" key={index}>
                                <img src={ele.volumeInfo.imageLinks.smallThumbnail} height={300} width={200}/>
                                <h4>{ele.volumeInfo.title}</h4>
                                <h5>{ele.volumeInfo.authors}</h5><br/>
                                <button className="btn btn-secondary" onClick={()=>this.removeBookFromStore(ele.id)}>Remove From MyBooks</button>
                            </div>
                        ))
                    }
                </div>
                :
                <div className="text-center"><h1>No Book Added To MyBooks</h1></div>
                }
            </div>
        )
    }
}
export default MyBook;