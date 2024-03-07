/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, {
  GroupBase,
  MultiValueGenericProps,
  components,
} from "react-select";

import {
  Button,
  Container,
  Flex,
  FormControl,
  Image,
  Text,
} from "@chakra-ui/react";
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
            boxSize={"30px"}
          />

          <Text fontSize={"lg"}> {props.data.label}</Text>
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
    <Container maxW={"container.lg"} mt={20}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl borderRadius={80}>
          <Controller
            control={control}
            name="socials"
            render={({ field: { value, onChange } }) => (
              <Select
                noOptionsMessage={() => "No more options to add"}
                placeholder="Select some socials..."
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderRadius: "20px",
                    border: "1px solid",
                    borderColor: state.isFocused ? "#4e32a2" : "#4e32a2",
                    padding: "10px",
                  }),
                  dropdownIndicator: (provided, state) => ({
                    ...provided,
                    color: "purple",
                    rotate: state.isFocused ? "180deg" : "0deg",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? "#f1f3f5" : "white",
                    borderRadius: "10px",
                    padding: "10px",
                    "&:hover": {
                      backgroundColor: "#f1f3f5",
                      borderRadius: "10px",
                    },
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    borderRadius: "20px",
                    padding: "5px",

                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#4e32a2",
                      borderRadius: "20px",
                      width: "12px",
                      scrollBehavior: "smooth",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f1f3f5",
                      borderRadius: "20px",
                    },
                    scrollBehavior: "smooth",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    right: "0",
                    top: "100%",
                    width: "40%",
                    padding: "10px",
                    border: "1px solid",
                    borderColor: "purple",
                    borderRadius: "20px",
                    gap: "10px",
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: "#f1f3f5",
                    borderRadius: "10px",
                    padding: "5px",
                    display: "flex",
                    gap: "10px",
                  }),
                }}
                options={options}
                isMulti
                value={value.map(
                  (val) => options.find((p) => p.label === val)!
                )} // Ensure to handle the case where an option might not be found
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
        </FormControl>
        <Button type="submit" mt={4}>
          Save
        </Button>
      </form>
    </Container>
  );
}
