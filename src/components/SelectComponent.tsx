/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Code,
  Container,
  FormControl,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import { OptionProps, Select, chakraComponents } from "chakra-react-select";
import { socialPages } from "../data";

export default function SelectComponent() {
  type SocialOption = {
    label: string;
    value: string;
    image: string;
  };
  const customComponents = {
    Option: ({ children, ...props }: OptionProps<SocialOption>) => (
      <chakraComponents.Option {...props}>
        <Image src={props.data.image} boxSize="24px" mr="2" />

        {children}
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
