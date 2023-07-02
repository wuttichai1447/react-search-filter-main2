
import './App.css';
import {useState,useEffect} from "react"

function App() {
  const [word,setWord] =useState("")
  const [countries,setCountries] = useState([])
  const [dataFilter] = useState (["name","capital"])

  
  useEffect(()=>{
    fetch("https://restcountries.com/v2/all")
    .then(res=>res.json())
    .then(data=>{
      setCountries(data)
    })
  },[])

  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const searchCountries=(countries)=>{
    return countries.filter((item)=>{
        return dataFilter.some((filter)=>{
          if(item[filter]){
            return item[filter].toString().toLowerCase().indexOf(word.toLowerCase())>-1
          }
        })
    })
  }
  return (
   <div className="container">
    <div className='search-from'>
    <label>
      <input type='text' className='search-input' placeholder='ค้นหาข้อมูลประเทศหรือเมืองหลวงที่ถูกต้อง' value={word} onChange={(e)=>setWord(e.target.value)}></input>
    </label>
    </div>
    
    <ul className="row">
    {searchCountries(countries).map((item,index)=>{
      return(
        <li key={index}>
        <div className="card">
            <div className="card-title">
                <img src={item.flag} alt={item.name}/>
            </div>
            <div className="card-body">
                <div className="card-description">
                    <h2>{item.name}</h2>
                    <ol className="card-list">
                        <li>ประชากร : <span>{formatNumber(item.population)}</span> คน </li>
                        <li>ภูมิภาค : <span>{item.region}</span></li>
                        <li>เมืองหลวง : <span>{item.capital}</span></li>
                        
                    </ol>
                </div>
            </div>
        </div>
      </li>
         
      )
    })}
    </ul>
   </div>
  );
}

export default App;
