import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { ChangeEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
export type SearchFunc = (query: string) => void;

type RandomObject = {
  [field: string]: any;
};

export type SearchBarProps = {
  search?: SearchFunc;
  maxWidth?: number;
  background?: string;
  borderRadius?: number;
  debounceTime?: number;
  placeholder?: string;
  colorLetter?: string;
  inputGroupProps?: RandomObject;
  leftElementProps?: RandomObject;
  inputProps?: RandomObject;
  icon?: JSX.Element;
};
export const SearchBar = ({
  search,
  maxWidth = 400,
  debounceTime = 500,
  background = 'white',
  borderRadius = 15,
  placeholder = 'Pesquise aqui..',
  colorLetter = 'black',
  icon = <BsSearch color="gray.500" />,
  inputGroupProps = {},
  leftElementProps = {},
  inputProps = {},
}: SearchBarProps) => {
  function changeInput(event: ChangeEvent<HTMLInputElement>) {
    if (search) {
      const query = event.target.value;
      search(query);
    }
  }

  return (
    <InputGroup maxW={maxWidth} bg={background} borderRadius={borderRadius} {...inputGroupProps}>
      <InputLeftElement pointerEvents="none" {...leftElementProps}>
        {icon}
      </InputLeftElement>
      <Input
        type="text"
        color={colorLetter}
        placeholder={placeholder}
        onChange={debounce(changeInput, debounceTime)}
        {...inputProps}
      />
    </InputGroup>
  );
};
