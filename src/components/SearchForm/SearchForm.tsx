import GrSearch from '@/assets/icon/GrSearch';
import {Form, Input} from 'antd';
import debounce from 'lodash.debounce';
import {useEffect, useMemo} from 'react';
import {useTypewriter} from 'react-simple-typewriter';
type FieldType = {
  keyword: string;
};
type SearchFormProps = {
  onSearch: (keyword: string) => void;
  style?: React.CSSProperties;
  dynamicPlaceholder?: string[];
};
const SearchForm: React.FC<SearchFormProps> = ({dynamicPlaceholder, onSearch, style}) => {
  const debouncedSearch = useMemo(
    () =>
      debounce((keyword: string) => {
        if (!onSearch) return;
        onSearch(keyword);
      }, 1000),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onValuesChange = (_: Partial<FieldType>, values: FieldType) => {
    debouncedSearch(values.keyword);
  };
  const placeholders = dynamicPlaceholder ?? [];
  const hasDynamicPlaceholder = placeholders.length > 0;

  const words = hasDynamicPlaceholder ? placeholders : ['Search...'];

  const [typedPlaceholder] = useTypewriter({
    words,
    loop: hasDynamicPlaceholder,
    delaySpeed: 3000,
  });

  return (
    <Form onValuesChange={onValuesChange} style={style} autoComplete='off'>
      <Form.Item<FieldType> name='keyword'>
        <Input prefix={<GrSearch />} placeholder={hasDynamicPlaceholder ? typedPlaceholder : 'Search...'} allowClear />
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
