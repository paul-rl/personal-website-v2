export default function ButtonCollection({className} : {className?:string}){
  return (
    <div className = {`flex justify-center items-center ${className}`}>
      <div className="w-[320px]">
        {/* Top two buttons side by side */}
        <div className="flex justify-between mb-[3rem]">
          <button className="border border-golden text-golden text-lg tracking-widest font-serif px-6 py-2 bg-button transition

              duration-300

              ease-in-out

              hover:text-cream
              hover:border-[#dabb74]

              hover:shadow-[inset_0_0_8px_2px_rgba(218,187,116,0.6)]">
            RESUME
          </button>
          <button className="border border-golden text-golden text-lg tracking-widest font-serif px-6 py-2 bg-button transition

              duration-300

              ease-in-out

              hover:text-cream
              hover:border-[#dabb74]

              hover:shadow-[inset_0_0_8px_2px_rgba(218,187,116,0.6)]">
            GITHUB
          </button>
        </div>

        {/* Centered bottom button */}
        <div className="flex justify-center">
          <button className="border border-golden text-golden text-lg tracking-widest font-serif px-6 py-2 bg-button transition

              duration-300

              ease-in-out

              hover:text-cream
              hover:border-[#dabb74]

              hover:shadow-[inset_0_0_8px_2px_rgba(218,187,116,0.6)]">
            CONTACT ME
          </button>
        </div>
      </div>
    </div>
  );
};