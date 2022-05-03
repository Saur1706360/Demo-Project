import React, {Component} from "react";
import queryString from "query-string";
import http from "./httpService";
import { Link } from "react-router-dom";
import MyBook from "./mybook";
class ShowBooks extends Component{
    state={
        data:{},
        textValue:{languageVal:"",filterVal:"",printVal:"",orderBy:""},
        Language:["English","French","Hindi","Spanish","Chinese"],
        Filter:["Full Volume","Partial Volume","Free Google e-Books","Pay Google e-Books"],
        PrintType:["All","Books","Magazines"],
        OrderBy:["Order By","relevance","newest"],
        maxResults:this.props.textdata.pageEntities,

};

storeBook=(id)=>{
   let s1 = {...this.state};
   console.log(id);
   let index = s1.data.items.findIndex((ele)=>ele.id === id);
   let x = s1.data.items[index];
   this.props.StoreBookInLibrary(x);
}
showRadio =  (label,arr,name,selVal)=>{
    return(
        <React.Fragment>
            <div className="row border bg-light">
            <b><label className="form-check-label font-weight-bold">{label}</label></b>
            </div>
            {
                arr.map((opt,index)=>(
                    <div className="form-check border"key={index}>
                    <input
                    className="form-check-input"
                    type="radio"
                    name={name}
                    value={opt}
                    checked = {selVal === opt}
                    onChange={this.handleChange}
                    />
                    <label className="form-check-label">{opt}</label>
                    </div>
                ))
            }
        </React.Fragment>
    )
}
   async fetchData() {
       let s1 = {...this.state};
       let {name} = this.props.match.params;
       let {search,languageVal,filterVal,orderBy,printVal} = s1.textValue;
       let xVal = filterVal ? filterVal === "Free Google e-Books" ? "free-ebooks" : filterVal === "Partial Volume" ? "partial" : filterVal ===  "Full Volume" ? "full" : filterVal === "Pay Google e-Books" ? "paid-ebooks" : "":"";
       let pVal = printVal ? printVal === "All" ? "all" : printVal === "Books" ? "books" : printVal === "Magazines" ? "magazines" : "" : "";
       let lval = languageVal ? languageVal === "English" ? "en" : languageVal === "French" ? "fr" :languageVal === "Hindi" ? "hi" : languageVal === "Spanish" ?"es": languageVal === "Chinese" ? "zh" : "":"";
       let textdata = search ? search : name;
       let queryparams = queryString.parse(this.props.location.search);
       let {startIndex="0"} = queryparams;
       let x = parseInt(startIndex);
       let y = parseInt(s1.maxResults);
       let reponse = await http.get(`https://www.googleapis.com/books/v1/volumes?q=${textdata}${xVal ? "&filter="+xVal : ""}${pVal ? "&printType="+pVal : ""}${orderBy?"&orderBy="+orderBy:""}${lval ? "&langRestrict="+lval : ""}&startIndex=${x}&maxResults=${y}&key=AIzaSyCdmyTvXN8k8gTtsVxoszMSLp5vTYIe7pY`);
       let {data} = reponse;
       this.setState( {data:data} );
   }
   componentDidMount() {
    this.fetchData();
}

componentDidUpdate(prevProps,prevState) {
 if(prevProps !== this.props) this.fetchData();
}

handleChange = (e)=>{
    let {currentTarget : input} = e;
    let s1 = {...this.state};
    s1.textValue[input.name] = input.value;
    this.setState(s1);
    this.fetchData();
    
}
handlePage = (incr) =>{
    let {name} = this.props.match.params;
    let queryparams = queryString.parse(this.props.location.search);
    let {startIndex = 0} = queryparams;
    let newStartIndex = +startIndex + (+incr);
    queryparams.startIndex = newStartIndex;
    this.callURL(`/${name}`,queryparams);
}

callURL = (url,options)=>{
    let searchString = this.makeSearchString(options);
    this.props.history.push({
        pathname:url,
        search:searchString,
    })
}

makeSearchString = (options)=>{
    let {startIndex} = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr,"startIndex",startIndex);
    return searchStr;
}

addToQueryString = (str,paramName,paramValue)=>
paramValue ? str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}` : str;

    render()
    {
        let {name} = this.props.match.params;
        let queryparams = queryString.parse(this.props.location.search);
        let {startIndex=0} = queryparams;
        let {data=[],textValue,Language,Filter,PrintType,OrderBy,maxResults} = this.state;
        let {languageVal,filterVal,printVal,orderBy} = textValue;
        let {items=[],kind,totalItems} = data;
        let {printType,languages,filter,orderBydata,pageEntities} = this.props.textdata;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-3 border">
                        {
                         languages ? 
                        this.showRadio("Language",Language,"languageVal",languageVal)
                         :
                         ""
                        }<br/>
                        {
                         filter ? 
                        this.showRadio("Filter",Filter,"filterVal",filterVal)
                        :
                        ""    
                        }<br/>
                        {
                            printType ? 
                        this.showRadio("Print-Type",PrintType,"printVal",printVal)
                         : ""
                        }<br/>
                        {
                            orderBydata ? 
                        <div className="form-group">
                            <label><b>Order By</b></label>
                            <select className="form-control"  name="orderBy" value={orderBy} onChange={this.handleChange}>
                                < option disabled value=""> Select The Order</option>
                                {
                                    OrderBy.map((ele,index)=>(<option key={index}>{ele}</option>))
                                }
                            </select>
                        </div>
                        : 
                        ""
                        }
                        <br/>
                    </div>
                    <div className="col-9 border">
                        <div className="container">
                            <h6>{(+startIndex)+1}-{(+maxResults)+(+startIndex)} entries</h6>
                            <div className="row text-center">
                            {
                              items.map((ele,index)=>(
                                  <div className="col-4 border" key={index}>
                                      {
                                      (ele.volumeInfo.imageLinks) ? <img src={ele.volumeInfo.imageLinks.thumbnail} height={200} width={240}/> : ""
                                      }
                                      <h4>{ele.volumeInfo.title}</h4>
                                      <h5>{ele.volumeInfo.authors}</h5><br/>
                                      <button className="btn btn-secondary" onClick={()=>this.storeBook(ele.id)}>Add To MyBooks</button>
                                  </div>
                              ))
                            }
                            </div><br/>
                         <div className="row">
                             <div className="col-2">{(+startIndex) > 1 ? <button className="btn btn-primary btn-sm" onClick={()=>this.handlePage(-pageEntities)}>Prev</button> : ""}</div>
                             <div className="col-9"></div>
                             <div className="col-1"><button className="btn btn-primary btn-sm" onClick={()=>this.handlePage(pageEntities)}>Next</button></div>
                         </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ShowBooks;