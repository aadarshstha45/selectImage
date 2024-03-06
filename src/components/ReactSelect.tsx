/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, {
  GroupBase,
  MultiValueGenericProps,
  components,
} from "react-select";

import { Button, Container, Flex, Image, Text } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { socialPages } from "../data";
export default function ReactSelect() {
  interface SocialInterface {
    value: string;
    label: string;
    image: string;
  }

  const options: SocialInterface[] = socialPages.map((page) => ({
    value: page.value,
    label: page.label,
    image: page.image,
  }));

  type dataType = {
    socials: string[];
  };
  const { control, handleSubmit, reset } = useForm<dataType>({
    defaultValues: {
      socials: [],
    },
  });

  const onSubmit = async (data: dataType) => {
    console.log(data);
    reset();
  };

  const CustomOption = (props: any) => {
    return (
      <components.Option {...props}>
        <Flex align={"center"} gap={2}>
          <Image
            src={props.data.image}
            alt={props.data.label}
            boxSize={"35px"}
          />

          {props.data.label}
        </Flex>
      </components.Option>
    );
  };

  const MultiValueLabel = (
    props: MultiValueGenericProps<
      SocialInterface,
      true,
      GroupBase<SocialInterface>
    >
  ) => {
    return (
      <Flex align={"center"} gap={1}>
        <Image
          p={1}
          src={props.data.image}
          alt={props.data.label}
          boxSize={"35px"}
        />
        <Text>{props.data.label}</Text>
      </Flex>
    );
  };

  return (
    <Container maxW={"container.lg"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="socials"
          render={({ field: { value, onChange } }) => (
            <Select
              options={options}
              isMulti
              value={value.map((val) => options.find((p) => p.label === val)!)} // Ensure to handle the case where an option might not be found
              onChange={(selectedOption) =>
                onChange(
                  (selectedOption as SocialInterface[]).map(
                    (option) => option.label
                  )
                )
              }
              components={{
                Option: CustomOption,
                MultiValueLabel,
              }}
            />
          )}
        />
        <Button type="submit" mt={4}>
          Save
        </Button>
      </form>
    </Container>
  );
}
