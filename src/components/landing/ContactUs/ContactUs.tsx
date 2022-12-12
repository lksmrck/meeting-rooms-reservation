import { useState, useEffect } from "react";
import { Button, Input, Textarea } from "@chakra-ui/react";

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message:
      "Hi guys, I would like to know more about this app. Please contact me.",
  });

  useEffect(() => {
    setSubmitted(false);
  }, []);

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
    <section className="py-20 h-content flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-contactUsWaves">
      <h1 className="font-solid text-xl">Get in touch</h1>
      <form
        className=" h-64 w-4/5 md:w-1/3 mt-5 border rounded-lg bg-gray-50 shadow-lg"
        onSubmit={handleSubmit}
      >
        {submitted ? (
          <div className="h-full flex justify-center items-center">
            <h1>Thank you for submitting. We will contact you soon.</h1>
          </div>
        ) : (
          <div className="m-6 [&>*]:mb-1">
            <div className="flex ">
              <Input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
                value={formData.firstName}
                required
              />
              <Input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
                value={formData.lastName}
                required
              />
            </div>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <Textarea
              id="message"
              name="message"
              /* placeholder="Hi guys, I would like to know more details about this app. Please contact me." */
              onChange={handleChange}
              value={formData.message}
              required
            />
            <div className="flex justify-center">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default ContactUs;
