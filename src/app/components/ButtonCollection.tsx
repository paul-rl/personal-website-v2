export default function ButtonCollection({className} : {className?:string}){
  return (
    <div className = {`flex justify-center items-center ${className}`}>
      <div className="w-[320px]">
        {/* Top two buttons side by side */}
        <div className="flex justify-between mb-[3rem]">
            <a
                href="/resume-placeholder.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif uppercase 
                    text-golden text-lg tracking-widest
                    px-6
                    py-2
                    border border-golden
                    bg-button
                    transition duration-300 ease-in-out

                    hover:text-[#f7f1e1] hover:border-[#dabb74]
                    hover:shadow-[inset_0_0_8px_2px_rgba(218,187,116,0.6)]

                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#dabb74]
                    focus-visible:outline-offset-2
                    cursor-pointer"
            >
                RESUME
            </a>
            <a
                href="https://github.com/paul-rl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif uppercase 
                    text-golden text-lg tracking-widest
                    px-6
                    py-2
                    border border-golden
                    bg-button
                    transition duration-300 ease-in-out

                    hover:text-[#f7f1e1] hover:border-[#dabb74]
                    hover:shadow-[inset_0_0_8px_2px_rgba(218,187,116,0.6)]

                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#dabb74]
                    focus-visible:outline-offset-2
                    cursor-pointer"
            >
                GITHUB
            </a>
        </div>

        {/* Centered bottom button */}
        <div className="flex justify-center">
            <a
                href="mailto:gpaul.rl7@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif uppercase 
                    text-golden text-lg tracking-widest
                    px-6
                    py-2
                    border border-golden
                    bg-button
                    transition duration-300 ease-in-out

                    hover:text-[#f7f1e1] hover:border-[#dabb74]
                    hover:shadow-[inset_0_0_8px_2px_rgba(218,187,116,0.6)]

                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#dabb74]
                    focus-visible:outline-offset-2
                    cursor-pointer"
            >
                CONTACT ME
            </a>
        </div>
      </div>
    </div>
  );
};