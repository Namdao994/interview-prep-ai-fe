import FaFilter from '@/assets/icon/FaFilter';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {setSessionStatusFilters} from '@/store/slices/dashboardPageSlice';
import type {SessionStatus} from '@/store/slices/dashboardPageSlice';
import {Button, Checkbox, Dropdown, Typography} from 'antd';
import type {DropdownProps, MenuProps} from 'antd';
import {useState} from 'react';
const {Text} = Typography;

const FilterSessionsDropdown = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {status} = useAppSelector((state) => state.dashboardPage.sessionFilters);
  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };
  const toggleStatus = (list: SessionStatus[], value: SessionStatus) =>
    list.includes(value) ? list.filter((s) => s !== value) : [...list, value];
  const items: MenuProps['items'] = [
    {
      key: 'status',
      type: 'group',
      label: <Text>Filter by session status</Text>,
      children: [
        {
          key: 'status-active',
          label: (
            <div onClick={() => dispatch(setSessionStatusFilters(toggleStatus(status, 'ACTIVE')))}>
              <Checkbox checked={status.includes('ACTIVE')}>Active</Checkbox>
            </div>
          ),
        },
        {
          key: 'status-archive',
          label: (
            <div onClick={() => dispatch(setSessionStatusFilters(toggleStatus(status, 'ARCHIVED')))}>
              <Checkbox checked={status.includes('ARCHIVED')}>Archived</Checkbox>
            </div>
          ),
        },
      ],
    },
  ];
  const hasActiveFilters = status.length > 0;
  return (
    <Dropdown
      menu={{items}}
      placement='bottomLeft'
      arrow
      trigger={['click']}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button icon={<FaFilter />} onClick={() => setOpen(true)} type={hasActiveFilters ? 'primary' : 'default'} />
    </Dropdown>
  );
};

export default FilterSessionsDropdown;
