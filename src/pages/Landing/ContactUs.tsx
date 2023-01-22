import { forwardRef } from "react";

import BlobShapeContainer from "../../components/landing/BlobShapeContainer";
import ContactForm from "../../components/landing/ContactForm";

const ContactUs = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      className=" h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-contactUs "
      ref={ref}
    >
      <h1 className="font-outline font-bold text-4xl md:text-5xl mt-14 md:mt-20">
        Get in touch
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center border mx-1">
        <h1 className="w-full md:w-1/5  font-solid text-2xl md:text-4xl text-center md:mr-10">
          Leave us a message and we will contact you.
        </h1>
        <BlobShapeContainer>
          <ContactForm />
        </BlobShapeContainer>
      </div>
    </div>
  );
});

export default ContactUs;
