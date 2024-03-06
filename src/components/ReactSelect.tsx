/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { components } from "react-select";

import { Button, Container, Flex, Image } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { socialPages } from "../data";
export default function ReactSelect() {
  interface SocialInterface {
    value: string;
    label: string;
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

  const CustomOptions = (props: any) => {
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

  const CustomValue = ({ data }: any) => (
    <Flex align="center" gap={2}>
      <Image src={data.image} alt={data.label} boxSize="24px" mr={2} />
      {data.label}
    </Flex>
  );

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
              value={value.map((val) => options.find((p) => p.label === val))}
              onChange={(selectedOption) =>
                onChange(
                  (selectedOption as SocialInterface[]).map(
                    (option) => option.label
                  )
                )
              }
              components={{ Option: CustomOptions, SingleValue: CustomValue }}
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
