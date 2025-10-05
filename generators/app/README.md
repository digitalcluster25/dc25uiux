# DC25 UI/UX Component Generator

Yeoman generator for creating React TypeScript components in the DC25 UI/UX library.

## Installation

```bash
# Install globally
npm install -g generator-dc25-uiux

# Or use with npx
npx generator-dc25-uiux
```

## Usage

### Basic Usage

```bash
# Generate a new component
yo dc25-uiux

# Or with npx
npx yo dc25-uiux
```

### Advanced Usage

```bash
# Generate with specific options
yo dc25-uiux --component="MyButton" --type="atom" --template="advanced"

# Generate with all options
yo dc25-uiux \
  --component="MyForm" \
  --type="molecule" \
  --template="form" \
  --with-tests \
  --with-story \
  --with-props \
  --with-variants \
  --with-hooks
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--component` | String | `MyComponent` | Component name (PascalCase) |
| `--type` | String | `atom` | Component type (atom, molecule, organism) |
| `--template` | String | `basic` | Template type (basic, advanced, form, layout) |
| `--with-tests` | Boolean | `true` | Generate test files |
| `--with-story` | Boolean | `true` | Generate Storybook stories |
| `--with-props` | Boolean | `true` | Generate props interface |
| `--with-variants` | Boolean | `false` | Generate variants interface |
| `--with-hooks` | Boolean | `false` | Generate custom hooks |

## Component Types

### Atom
Basic building blocks of the UI. Simple, reusable components.

**Examples:** Button, Input, Label, Badge

**Generated files:**
- `src/components/atoms/ComponentName.tsx`
- `src/components/atoms/__tests__/ComponentName.test.tsx`
- `src/stories/ComponentName.stories.tsx`
- `src/types/componentname.ts` (if `--with-props`)

### Molecule
Simple combinations of atoms. More complex than atoms but still focused.

**Examples:** SearchBar, FilterGroup, ComponentCard

**Generated files:**
- `src/components/molecules/ComponentName.tsx`
- `src/components/molecules/__tests__/ComponentName.test.tsx`
- `src/stories/ComponentName.stories.tsx`
- `src/types/componentname.ts` (if `--with-props`)
- `src/hooks/useComponentName.ts` (if `--with-hooks`)

### Organism
Complex components that combine molecules and atoms. Full sections of the UI.

**Examples:** Header, Footer, ComponentGrid

**Generated files:**
- `src/components/organisms/ComponentName.tsx`
- `src/components/organisms/__tests__/ComponentName.test.tsx`
- `src/stories/ComponentName.stories.tsx`
- `src/types/componentname.ts` (if `--with-props`)
- `src/hooks/useComponentName.ts` (if `--with-hooks`)

## Template Types

### Basic
Simple component with minimal functionality.

**Features:**
- Basic props interface
- Simple styling
- No variants or complex logic

### Advanced
Component with advanced features and variants.

**Features:**
- Props interface with variants
- Multiple size and style options
- Loading and disabled states
- Custom hooks support

### Form
Form-related component with validation support.

**Features:**
- Form-specific props (label, placeholder, error)
- Validation states
- Required field support
- Error handling

### Layout
Layout component for organizing other components.

**Features:**
- Flexbox utilities
- Direction, alignment, and spacing options
- Responsive design support
- Gap and wrap controls

## Generated Files

### Component File
```typescript
// src/components/{type}s/ComponentName.tsx
import React from 'react';
import { cn } from '@/utils/cn';

export interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
  // Custom props
}

export default function ComponentName({ 
  className,
  children,
  ...props 
}: ComponentNameProps) {
  return (
    <div
      data-testid="componentname"
      className={cn(
        // Styling
        className
      )}
      {...props}
    >
      {children || 'ComponentName'}
    </div>
  );
}
```

### Test File
```typescript
// src/components/{type}s/__tests__/ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('renders without crashing', () => {
    render(<ComponentName />);
    expect(screen.getByTestId('componentname')).toBeInTheDocument();
  });
});
```

### Storybook Story
```typescript
// src/stories/ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../src/components/{type}s/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: '{type}s/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
```

### Types File
```typescript
// src/types/componentname.ts
export interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
  // Custom props
}

export interface ComponentNameVariants {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}
```

### Custom Hook
```typescript
// src/hooks/useComponentName.ts
import { useState, useEffect } from 'react';

export interface UseComponentNameOptions {
  // Hook options
}

export interface UseComponentNameReturn {
  // Return values
}

export function useComponentName(options?: UseComponentNameOptions): UseComponentNameReturn {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Hook logic
  }, []);

  return {
    // Return values
  };
}
```

## Examples

### Generate a Button Component

```bash
yo dc25-uiux --component="Button" --type="atom" --template="advanced" --with-variants
```

This creates:
- `src/components/atoms/Button.tsx`
- `src/components/atoms/__tests__/Button.test.tsx`
- `src/stories/Button.stories.tsx`
- `src/types/button.ts`

### Generate a Form Component

```bash
yo dc25-uiux --component="Input" --type="atom" --template="form" --with-props
```

This creates:
- `src/components/atoms/Input.tsx`
- `src/components/atoms/__tests__/Input.test.tsx`
- `src/stories/Input.stories.tsx`
- `src/types/input.ts`

### Generate a Layout Component

```bash
yo dc25-uiux --component="Flex" --type="molecule" --template="layout" --with-variants --with-hooks
```

This creates:
- `src/components/molecules/Flex.tsx`
- `src/components/molecules/__tests__/Flex.test.tsx`
- `src/stories/Flex.stories.tsx`
- `src/types/flex.ts`
- `src/hooks/useFlex.ts`

## Best Practices

### 1. Component Naming
- Use PascalCase for component names
- Be descriptive and specific
- Follow Atomic Design principles

### 2. File Organization
- Keep components in appropriate directories
- Use consistent naming conventions
- Group related files together

### 3. Props Design
- Keep props simple and focused
- Use TypeScript interfaces
- Provide sensible defaults

### 4. Testing
- Write comprehensive tests
- Test all props and variants
- Include accessibility tests

### 5. Documentation
- Use Storybook for component documentation
- Include usage examples
- Document all props and variants

## Troubleshooting

### Common Issues

**1. Component name validation error**
```
Error: Component name must start with uppercase letter
```
**Solution:** Use PascalCase for component names (e.g., `MyComponent`)

**2. File already exists**
```
Error: File already exists
```
**Solution:** Choose a different component name or delete existing files

**3. Missing dependencies**
```
Error: Cannot find module 'yeoman-generator'
```
**Solution:** Install the generator globally: `npm install -g generator-dc25-uiux`

### Getting Help

- Check the [DC25 UI/UX documentation](../docs/)
- Review the [component guidelines](../docs/component-guidelines.md)
- Look at existing components for examples
- Ask questions in the project repository

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see [LICENSE](../LICENSE) file for details.
