import FaceIcon from './FooterImages/Face.svg';
import InstaIcon from './FooterImages/Insta.svg';
import XIcon from './FooterImages/X.svg';

function FooterBottom() {
  return (
    <div className="flex flex-col items-center justify-between gap-3 bg-[#181818] px-4 py-4 text-center sm:flex-row sm:px-6 sm:py-5 sm:text-left lg:px-[120px] lg:py-6">
      <p className="text-[14px] text-white">Copyright @ {new Date().getFullYear()} | termbi</p>
      <div className="flex items-center gap-4">
        <button type="button" aria-label="Facebook" className="hover:opacity-80">
          <img src={FaceIcon} alt="Facebook" className="h-7 w-7" />
        </button>
        <button type="button" aria-label="Instagram" className="hover:opacity-80">
          <img src={InstaIcon} alt="Instagram" className="h-7 w-7" />
        </button>
        <button type="button" aria-label="X" className="hover:opacity-80">
          <img src={XIcon} alt="X" className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}

export default FooterBottom;
