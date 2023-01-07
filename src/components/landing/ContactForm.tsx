import { useState, FC, ChangeEvent, SyntheticEvent } from "react";
import envelope from "../../assets/envelope.svg";
import { Input, Textarea, Button } from "@chakra-ui/react";
import { ContactFormData } from "../../types/types";

const ContactForm: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    message:
      "Hi guys, I would like to know more about this app. Please contact me on my e-mail.",
  } as ContactFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitted ? (
        <div className="h-full flex text-sm md:text-base flex-col justify-center items-center -ml-10 md:-ml-16 mt-24 md:mt-32">
          <p>
            Thank you for your message. <br /> We will contact you soon
          </p>
          <img className="mt-6" src={envelope} width="70px" height="70px" />
        </div>
      ) : (
        <div className="ml-6 md:ml-10 w-60 md:w-80 [&>*]:mb-1 mt-14 md:mt-28">
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
              Send
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
