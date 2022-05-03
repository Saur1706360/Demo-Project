import React, {Component} from "react";
class Setting extends Component{
    render()
    {
        let {printType,languages,filter,orderBydata,pageEntities} = this.props.textvaluedata;
        return(
            <div className="container">
                <br/>
                <h1>Select options for Filtering On Left Panel</h1>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={printType ? true : false} value={printType} name="printType" onChange={this.props.handleChange}/>
                    <label className="form-check-label">
                        <b>printType--(Restrict to books or Magazines)</b>
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={languages ? true : false} value={languages} name="languages" onChange={this.props.handleChange}/>
                    <label className="form-check-label">
                       <b>languages--(Restricts the volumes returned to those that are tagged with the specified language.)</b>
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={filter ? true : false} value={filter} name="filter" onChange={this.props.handleChange}/>
                    <label className="form-check-label">
                       <b>filter--(filter search results by volume type and avilability.)</b>
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={orderBydata ? true : false} value={orderBydata} name="orderBydata" onChange={this.props.handleChange}/>
                    <label className="form-check-label">
                       <b>orderBy--(Order of the volume search results.)</b>
                    </label>
                </div><br/>
                <div className="form-group">
                    <label className="text-success"><b>No. of entries on a page</b></label>
                    <input
                    type = "text"
                    className="form-control"
                    id="pageEntities"
                    name="pageEntities"
                    placeholder="Enter Entries On A Page"
                    value={pageEntities}
                    onChange={this.props.handleChange}
                    />
                </div>
            </div>
        )
    }
}
export default Setting;