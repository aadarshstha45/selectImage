/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Code,
  Container,
  FormControl,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import { Select, chakraComponents } from "chakra-react-select";
import { socialPages } from "../data";

export default function SelectComponent() {
  interface OptionProps {
    data: {
      label: string;
      value: string;
      image: string;
    };
    children: React.ReactNode;
  }
  const customComponents = {
    Option: ({ data, ...props }: OptionProps) => (
      <chakraComponents.Option innerProps={{ ...props }} {...props}>
        <Image src={data.image} boxSize="24px" mr="2" />
        {/* Display the image */}
        {props.children}
      </chakraComponents.Option>
    ),
  };
  return (
    <Container>
      <FormControl p={4}>
        <FormLabel>
          Select <Code>Social</Code>
        </FormLabel>
        <Select
          isMulti
          name="socials"
          options={socialPages}
          placeholder="Select some socials..."
          closeMenuOnSelect={true}
          components={customComponents}
        />
      </FormControl>
    </Container>
  );
}
