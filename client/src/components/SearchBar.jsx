import React from "react";
import { useRef } from "react";
import './styles/searchBar.css'

const SearchBar = ({style}) => {
    const inputRef = useRef();
    function searchFunction(){
        console.log(inputRef.current.value.toUpperCase())
        var currentSearchText = inputRef.current.value.toUpperCase();
        var allStores = document.getElementsByClassName("item")
        if(allStores){
          var numberOfResults = 0;
          for(var i =0;i<allStores.length; i++){
            var child = allStores[i].childNodes[1];
            if(child){          
                var innerChild = child.childNodes;
                if(innerChild){
                  var allStoreNames = innerChild[0].textContent;
                  if(allStoreNames.toUpperCase().indexOf(currentSearchText) > -1){
                    allStores[i].style.display = "";
                    numberOfResults++;
                  } else {
                    allStores[i].style.display = "none";
                  }
                }          
            }
          }
          var placeHolderMessage = document.getElementsByClassName("placeHolderMessage")[0]
          if(numberOfResults===0){
              placeHolderMessage.style.display = "block"
          } else {
            placeHolderMessage.style.display = "none"
          }
        }
      }

    return (
        <div className="center">
            <input type = "text" id ="searchBar" placeholder="Search"  
            className="searchBar rounded-pill m-3 p-2" onChange={() => searchFunction()} ref ={inputRef} style={style}/>
            <div className="placeHolderMessage" style={{textAlign: "center"}}>
              No Matching Results
            </div>
        </div>
    )
}
export default SearchBar;