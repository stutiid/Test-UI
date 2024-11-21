import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css"

export default function App() {
  const [cardList, setCardList] = useState([]);
  const [limit, setLimit] = useState(9);
  const divRef = useRef(null);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    const fetchData = () => {
      if(!loading){
      setLoading(true);
      axios
        .get(
          `https://dummyjson.com/recipes?limit=${limit}&skip=0&select=name,image`
        )
        .then((response) => {
          console.log("response", response.data);
          setCardList(response.data.recipes);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
      }
    };
    fetchData();
  }, [limit]);

  useEffect(() => {
    if(limit>=50){
      console.log("All data loaded");
      return;
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [limit,loading]);

  const handleScroll = () => {
    let scrolled = document.documentElement.scrollTop;;
    let innerHeight = document.documentElement.scrollHeight;
    let viewHeight = document.documentElement.clientHeight;
    if (!loading && (scrolled + viewHeight >= innerHeight-10)) setLimit((prev) => prev + 3);
  };

  // const handleScollChange=(event)=>{debounce(()=>handleScroll(),100)}

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {cardList.length > 0 &&
        cardList.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                width: "660px",
                height: "500px",
                border: "black 2px solid",
                margin: "5px 5px",
                backgroundColor:"white"
              }}
              className="card-popout"
            >
              <img src={item.image} height={400} width={660} alt="imgae" />
              <h3 style={{ textAlign: "center" }}>{item.name}</h3>
            </div>
          );
        })}
    </div>
    // </div>
  );
}
