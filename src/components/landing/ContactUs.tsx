import { useState, useEffect } from "react";
import { Button, Input, Textarea } from "@chakra-ui/react";

const ContactUs = () => {
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
    <section className=" h-content flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-contactUsWaves ">
      <h1 className="font-outline font-bold text-4xl md:text-5xl mt-20">
        Get in touch
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center border mx-1">
        <h1 className="w-full md:w-1/5  font-solid text-2xl md:text-4xl text-center md:mr-10">
          Leave us a message and we will contact you.
        </h1>
        <form
          className="h-80 md:h-96 w-80 md:w-105 mt-5 md:mt-14 border rounded-lg bg-gray-50 shadow-lg overflow-x-hidden overflow-y-scroll scrollbar-hide opacity-80 "
          /*   className="" */
          style={{ borderRadius: "40% 110% 15% 55%" }}
          onSubmit={handleSubmit}
        >
          {submitted ? (
            <div className="h-full flex justify-center items-center -ml-6">
              <p>
                Thank you for submitting. <br /> We will contact you soon
              </p>
            </div>
          ) : (
            <div className="ml-7 md:ml-10 w-60 md:w-80 [&>*]:mb-1 mt-14 md:mt-28">
              <Input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
                value={formData.firstName}
                variant="flushed"
                size="sm"
                focusBorderColor="teal.400"
                required
              />
              <Input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
                value={formData.lastName}
                variant="flushed"
                size="sm"
                focusBorderColor="teal.400"
                required
              />

              <Input
                id="email"
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
                value={formData.email}
                variant="flushed"
                size="sm"
                focusBorderColor="teal.400"
                required
              />
              <Textarea
                id="message"
                name="message"
                /* placeholder="Hi guys, I would like to know more details about this app. Please contact me." */
                onChange={handleChange}
                value={formData.message}
                variant="flushed"
                size="sm"
                focusBorderColor="teal.400"
                resize="none"
                required
              />
              <div className="flex justify-center ml-10 md:ml-0  mt-5">
                <Button type="submit" size="sm" colorScheme="teal">
                  Submit
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
