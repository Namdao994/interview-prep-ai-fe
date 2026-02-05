import FaSquare from '@/assets/icon/FaSquare';
import {COLOR_THEME_ACCENT} from '@/constants/colorThemeAccent';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {setThemeAccent, type ThemeAccent} from '@/store/slices/themeSlice';
import {capitalize} from '@/utils/string';
import {Select, Space, theme} from 'antd';

const SelectThemeAccent = () => {
  const {
    token: {colorPrimary, colorTextLightSolid},
  } = theme.useToken();
  const optionThemeSelect = Object.entries(COLOR_THEME_ACCENT).map(([accent, color]) => ({
    label: capitalize(accent),
    value: accent,
    prefix: (
      <FaSquare
        style={{
          color,
        }}
      />
    ),
  }));
  const dispatch = useAppDispatch();
  const handleChange = (value: ThemeAccent) => {
    dispatch(setThemeAccent(value));
  };
  const {accent} = useAppSelector((state) => state.theme);
  return (
    <Select
      defaultValue={accent}
      style={{width: 120, background: colorPrimary, color: colorTextLightSolid, borderColor: colorPrimary}}
      onChange={handleChange}
      suffixIcon={null}
      options={optionThemeSelect}
      optionRender={(option) => (
        <Space
          style={{
            alignContent: 'center',
          }}
        >
          <span>{option.data.prefix}</span>
          <span>{option.data.label}</span>
        </Space>
      )}
    />
  );
};

export default SelectThemeAccent;
