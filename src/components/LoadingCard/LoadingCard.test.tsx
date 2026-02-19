import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingCard from './LoadingCard';

// mock icon
jest.mock('@/assets/icon/FaChevronRight', () => ({
  __esModule: true,
  default: (props: any) => (
    <span data-testid="chevron-icon" {...props} />
  ),
}));

describe('LoadingCard', () => {
  it('renders without crashing', () => {
    render(<LoadingCard />);
    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
  });

  it('renders Ant Design Card', () => {
    const { container } = render(<LoadingCard />);
    const card = container.querySelector('.ant-card');
    expect(card).toBeInTheDocument();
  });

  it('renders card header', () => {
    const { container } = render(<LoadingCard />);
    const header = container.querySelector('.ant-card-head');
    expect(header).toBeInTheDocument();
  });

  it('renders skeleton avatar', () => {
    const { container } = render(<LoadingCard />);
    const avatar = container.querySelector('.ant-skeleton-avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('renders skeleton nodes in body', () => {
    const { container } = render(<LoadingCard />);
    const body = container.querySelector('.ant-card-body');
    expect(body).toBeInTheDocument();

    const skeletons = body?.querySelectorAll(
      '.ant-skeleton, .ant-skeleton-element'
    );

    expect(skeletons && skeletons.length).toBeGreaterThan(0);
  });
});