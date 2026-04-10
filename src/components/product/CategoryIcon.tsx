import type { Category } from '../../types';

interface Props {
  category: Category;
  size?: number;
}

export default function CategoryIcon({ category, size = 40 }: Props) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (category) {
    case 'dogs':
      return (
        <svg {...props}>
          <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
          <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
          <path d="M8 14v.5" /><path d="M16 14v.5" />
          <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
          <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309" />
        </svg>
      );
    case 'cats':
      return (
        <svg {...props}>
          <path d="M12 5c-1.5-2-4-3-5.5-2.5C5 3 4 5 4 7.5c0 1.5.5 3 1.5 4C4 13 3 15 3 17c0 3 2.5 4 5 4h8c2.5 0 5-1 5-4 0-2-1-4-2.5-5.5 1-1 1.5-2.5 1.5-4C20 5 19 3 17.5 2.5 16 2 13.5 3 12 5Z" />
          <path d="M8 14v.5" /><path d="M16 14v.5" />
          <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
        </svg>
      );
    case 'birds':
      return (
        <svg {...props}>
          <path d="M16 7h.01" />
          <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
          <path d="m20 7 2 .5-2 .5" />
          <path d="M10 18v3" /><path d="M14 17.75V21" />
          <path d="M7 18a6 6 0 0 0 3.84-10.61" />
        </svg>
      );
    case 'fish':
      return (
        <svg {...props}>
          <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6-3.56 0-7.56-2.54-8.5-6Z" />
          <path d="M18 12v.5" />
          <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
          <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5 .23 6.5C5.58 18.03 7 16 7 13.33" />
        </svg>
      );
  }
}
