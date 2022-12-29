interface Props {
  activeMobile?: boolean
}

const Footer = ({activeMobile}:Props) => {
  return (
    <footer className={`${activeMobile ? "bg-[#040814]" : "hidden lg:block bg-[#0e0b14]"} text-[#c0c0c0] w-full py-5 text-xs z-10 relative`}>
      <section className="flex flex-col items-center justify-center m-auto text-center px-4 md:px-0 ">
        <img
          src="https://static-assets.bamgrid.com/product/disneyplus/images/logo.1a56f51c764022ee769c91d894d44326.svg"
          alt=""
          className="w-20 mb-2"
        />
        <ul className="flex flex-wrap justify-center max-w-md">
          <li className="mx-3 py-2">Privacy Policy</li>
          <li className="mx-3 py-2">subscription agreement</li>
          <li className="mx-3 py-2">Cancel subscription</li>
          <li className="mx-3 py-2">Aid</li>
          <li className="mx-3 py-2">Compatible devices</li>
          <li className="mx-3 py-2">About Disney+</li>
          <li className="mx-3 py-2">personalized advertising</li>
        </ul>
        <p className="py-2 max-w-md">
          Disney+ is a paid subscription service, its content is subject to
          availability. The Disney+ service is marketed by The Walt Disney
          Company.
        </p>
        <span className="py-2">© Disney. All rights reserved.</span>
      </section>
    </footer>
  );
};

export default Footer;
