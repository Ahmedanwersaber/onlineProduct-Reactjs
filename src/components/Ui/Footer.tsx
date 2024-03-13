
'use client';
import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

const FoterComponent=()=> {
  return (
    <Footer container>
      <div className="w-full text-center ">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="#"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="Anwer"
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center p-1 m-3">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Ahmed Anwer " year={2022} />
      </div>
    </Footer>
  );
}

export default FoterComponent;