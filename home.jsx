import React, {Component} from "react";
import { Link } from "react-router-dom";
class Home extends Component{

    state = {
        textData:{search:""}
    };

    handleChange = (e)=>{
        const {currentTarget : input} = e;
        let s1 = {...this.state};
        s1.textData[input.name] = input.value;
        this.setState(s1);
    }
    render()
    {
        let {textData} = this.state;
        let {search} = textData;
        return(
            <div className="container">
                <div className="text-center">
                    <br/><br/>
                <img src = "https://thumbs.dreamstime.com/b/open-book-emitting-sparkling-light-background-winter-clear-sky-concept-new-age-spiritual-meaning-33416828.jpg" height="350" className = "rounded-circle"/>
                     <br/><br/>
                <div className="row">
                        <div className="col-11">
                            <div className="form-group">
                            <input type="text"
                            className="form-control"
                            id="search"
                            name="search"
                            value={search}
                            placeholder="Search"
                            onChange={this.handleChange}
                            />
                            </div>
                        </div>
                        <div className="col-1">
                            <Link className="btn btn-primary" to={`/${search}`}>Search</Link>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default Home;