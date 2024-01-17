const circleProperty = `w-10 h-10 border-2 border-sky-400 rounded-full flex justify-center items-center transition-all  duration-500`;
const activeCircle = `${circleProperty}  w-11 h-11 border-sky-400 border-4   `;
const currentCircle = `${circleProperty} border-0 border-slate-100 bg-gradient-to-r from-sky-400 to-cyan-100`;

export default function ShowPage({
  page,
  setSelectedPage,
  selectedPage,
  index,
}) {
  return (
    <button
      className={selectedPage === index + 1 ? currentCircle : circleProperty}
      key={index}
      onClick={(e) => setSelectedPage(+e.target.innerText)}
    >
      {+page + 1}
    </button>
  );
}
