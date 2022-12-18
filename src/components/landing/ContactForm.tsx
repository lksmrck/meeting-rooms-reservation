import React from "react";
import envelope from "../../assets/envelope.svg";
import { Input, Textarea, Button } from "@chakra-ui/react";
import { ContactFormData } from "../../types/types";

type ContactFormProps = {
  submitted: boolean;
  onSubmit: (e: React.SyntheticEvent) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: ContactFormData;
};

const ContactForm: React.FC<ContactFormProps> = ({
  submitted,
  onSubmit,
  onChange,
  formData,
}) => {
  return (
    <form onSubmit={onSubmit}>
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            value={formData.email}
            variant="flushed"
            size="sm"
            focusBorderColor="teal.400"
            required
          />
          <Textarea
            id="message"
            name="message"
            onChange={onChange}
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
