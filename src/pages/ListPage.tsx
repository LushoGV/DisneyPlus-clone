import {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {getMovies} from '../features/cart/cartSlice'
import type { RootState } from "../app/store";
import { MdDownload } from "react-icons/md";

const ListPage = () => {
  const [movies, setMovies] = useState([])
  const cartSlice = useSelector((state:RootState)=> state.cart)

  useEffect(()=>{
    setMovies(cartSlice)
  },[cartSlice])

  if(!movies.length) return(
      <>
      <header className="p-4">
      <h1 className="font-semibold text-lg lg:hidden">Downloads</h1>
      </header>
      <section className="w-full flex justify-center px-4">
        <div className="text-center mt-20 xl:mt-28 m-auto mb-2 flex flex-col items-center">
        <div className="w-[120px] h-[120px] border-4 border-[#4e515e] flex items-center rounded-full lg:hidden">
        <MdDownload className="text-[#4e515e] text-7xl m-auto" />
        </div>
        <img className="m-auto mb-2 hidden lg:block" src="https://static-assets.bamgrid.com/product/disneyplus/images/empty-watchlist-icon.4b3acd54b63178bd38f31ea3b9d6526d.svg" alt="" />
        <h2 className="py-4 font-semibold text-2xl hidden lg:block">Your watchlist is empty</h2>
        <h2 className="pt-4 py-3 font-semibold text-lg lg:hidden">You have no downloads</h2>
        <span className="hidden lg:block">Content you add to your watchlist will appear here.</span>
        <span className="lg:hidden text-sm">Movies and series you download will appear here.</span>
        </div>
      </section>
    </>
    )

  return <><h1>aaaaaa</h1></>;
};

export default ListPage;
