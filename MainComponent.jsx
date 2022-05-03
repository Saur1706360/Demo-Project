import React, {Component} from "react";
import NavBar from "./navbar";
import {Switch,Route,Redirect} from "react-router-dom";
import ShowBooks from "./Showbook";
import Home from "./home";
import MyBook from "./mybook";
import Setting from "./setting";
class MainComponent extends Component{
    state={
        MyBookStore:[],
        textvalue:{printType:true,languages:true,filter:true,orderBydata:true,pageEntities:8},
    }

    MyStoreBook = (value)=>{
        let s1 = {...this.state};
        s1.MyBookStore.push(value);
        this.setState(s1);
    }

    removeBookFromLibrarys = (id)=>{
        let s1 = {...this.state};
        let index = s1.MyBookStore.findIndex((ele)=>ele.id === id);
        s1.MyBookStore.splice(index,1);
        this.setState(s1);
    }
    handleChange = (e)=>{
        const {currentTarget: input} = e;
        let s1 = {...this.state};
        (input.name === "printType" || input.name === "languages" || input.name === "filter" || input.name === "orderBydata") ? 
        s1.textvalue[input.name] = input.checked 
        :
        s1.textvalue[input.name] = input.value;
        this.setState(s1);
    }
    
    render()
    {
        return(
            <div className="container">
               <NavBar/>
               <Switch>
                    <Route path="/app/format/setting" 
                    render={(props)=><Setting {...props} textvaluedata = {this.state.textvalue} handleChange = {this.handleChange}/> }/>
                    <Route path="/myshelf/mybook"
                    render={(props)=><MyBook {...props} MyBookArr = {this.state.MyBookStore} removeBookFromLibrary = {this.removeBookFromLibrarys}/> }/>
                    <Route path="/:name"
                    render={(props)=><ShowBooks {...props} MyBookArr = {this.state.MyBookStore} StoreBookInLibrary={this.MyStoreBook} textdata = {this.state.textvalue}/> }/>
                    <Route path="/" 
                    render={(props)=><Home {...props}/> }/>
                    <Redirect from="/" to="/" />
                </Switch>
            </div>
        )
    }
}
export default MainComponent;