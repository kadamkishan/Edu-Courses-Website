import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar"
import Filter from "./components/Filter"
import { apiUrl,filterData } from "./data";
import Card from "./components/Card"
import Spinner from "./components/Spineer"
import Cards from "./components/Cards";

import {toast} from "react-toastify"

const App = () => {
  const [courses,setCourses]=useState(null);
  const [loading,setLoading]=useState(true);

  async function fetchData(){
    setLoading(true);

    try{
      let response=await fetch(apiUrl);
      let output=await response.json();
      console.log(output);
      setCourses(output.data);
    }
    catch(error){
      toast.error("Network me koi dikkat hein");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Navbar/>
      </div>

      <div>
        <Filter filterData={filterData}/>
      </div>

      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center 
      min-h-[50vh]">
        {
          loading ?(<Spinner/>):(<Cards courses={courses} />)
        }
      </div>
      
    </div>
  );

};

export default App;
