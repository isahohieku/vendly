import VLink from '@atoms/link';
import Logo from '@atoms/logo';

const Navbar = () => {
  return (
    <div className="pl-[15px] pt-[20px] mb-[25px]">
      <VLink href="/">
        <Logo />
      </VLink>
    </div>
  );
};

export default Navbar;
