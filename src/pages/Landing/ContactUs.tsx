import { useState, forwardRef } from "react";

import BlobShapeContainer from "../../components/landing/BlobShapeContainer";
import ContactForm from "../../components/landing/ContactForm";

const ContactUs = forwardRef<HTMLDivElement>((props, ref) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message:
      "Hi guys, I would like to know more about this app. Please contact me on my e-mail.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className=" h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-contactUsWaves "
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
          <ContactForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            formData={formData}
            submitted={submitted}
          />
        </BlobShapeContainer>
      </div>
    </div>
  );
});

export default ContactUs;
