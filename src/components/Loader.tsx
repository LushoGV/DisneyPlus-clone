interface Props {
  type: string
}

const Loader = ({type}:Props) => {

  if(type === "principal") return (
    <section className='w-full h-screen absolute top-0 left-0 z-50 flex'>
     <img src="../loader.png" alt="loader" className="m-auto animate-spin h-16 lg:h-20" />
   </section>
  )

  if(type === "moviePage") return( <section className='w-full h-[80vh] lg:h-[50vh] top-0 left-0 z-50 flex'>
     <img src="../loader.png" alt="loader" className="m-auto animate-spin h-16 lg:h-20" />
   </section>)

  return (
   <section className='w-full h-[50vh] lg:h-[30vh] top-0 left-0 z-50 flex'>
     <img src="../loader.png" alt="loader" className="m-auto animate-spin h-16 lg:h-20" />
   </section>
  )
}

export default Loader