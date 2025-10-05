const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    
    this.option('component', {
      type: String,
      description: 'Component name',
      default: 'MyComponent'
    });
    
    this.option('type', {
      type: String,
      description: 'Component type (atom, molecule, organism)',
      default: 'atom'
    });
    
    this.option('template', {
      type: String,
      description: 'Template type (basic, advanced, form, layout)',
      default: 'basic'
    });
    
    this.option('with-tests', {
      type: Boolean,
      description: 'Generate tests',
      default: true
    });
    
    this.option('with-story', {
      type: Boolean,
      description: 'Generate Storybook story',
      default: true
    });
    
    this.option('with-props', {
      type: Boolean,
      description: 'Generate with props interface',
      default: true
    });
    
    this.option('with-variants', {
      type: Boolean,
      description: 'Generate with variants',
      default: false
    });
    
    this.option('with-hooks', {
      type: Boolean,
      description: 'Generate with custom hooks',
      default: false
    });
  }

  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'Component name:',
        default: this.options.component,
        validate: (input) => {
          if (!input || input.trim() === '') {
            return 'Component name is required';
          }
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
            return 'Component name must start with uppercase letter and contain only letters and numbers';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'Component type:',
        choices: [
          { name: 'Atom - Basic building blocks', value: 'atom' },
          { name: 'Molecule - Simple combinations', value: 'molecule' },
          { name: 'Organism - Complex components', value: 'organism' }
        ],
        default: this.options.type
      },
      {
        type: 'list',
        name: 'templateType',
        message: 'Template type:',
        choices: [
          { name: 'Basic - Simple component', value: 'basic' },
          { name: 'Advanced - Component with variants', value: 'advanced' },
          { name: 'Form - Form-related component', value: 'form' },
          { name: 'Layout - Layout component', value: 'layout' }
        ],
        default: this.options.template
      },
      {
        type: 'confirm',
        name: 'withTests',
        message: 'Generate tests?',
        default: this.options.withTests
      },
      {
        type: 'confirm',
        name: 'withStory',
        message: 'Generate Storybook story?',
        default: this.options.withStory
      },
      {
        type: 'confirm',
        name: 'withProps',
        message: 'Generate with props interface?',
        default: this.options.withProps
      },
      {
        type: 'confirm',
        name: 'withVariants',
        message: 'Generate with variants?',
        default: this.options.withVariants,
        when: (answers) => answers.templateType === 'advanced'
      },
      {
        type: 'confirm',
        name: 'withHooks',
        message: 'Generate with custom hooks?',
        default: this.options.withHooks,
        when: (answers) => answers.componentType === 'organism'
      }
    ];

    this.answers = await this.prompt(prompts);
  }

  writing() {
    const { componentName, componentType, templateType, withTests, withStory, withProps, withVariants, withHooks } = this.answers;
    
    // Component file
    this._writeComponentFile(componentName, componentType, templateType, withProps, withVariants, withHooks);
    
    // Index file
    this._writeIndexFile(componentName);
    
    // Tests
    if (withTests) {
      this._writeTestFile(componentName, componentType, withProps);
    }
    
    // Storybook story
    if (withStory) {
      this._writeStoryFile(componentName, componentType, templateType, withProps, withVariants);
    }
    
    // Types file
    if (withProps) {
      this._writeTypesFile(componentName, withVariants);
    }
    
    // Hooks file
    if (withHooks) {
      this._writeHooksFile(componentName);
    }
    
    // Update components index
    this._updateComponentsIndex(componentName, componentType);
    
    // Update components registry
    this._updateComponentsRegistry(componentName, componentType, templateType);
  }

  _writeComponentFile(componentName, componentType, templateType, withProps, withVariants, withHooks) {
    const templatePath = `templates/${templateType}-component.tsx.ejs`;
    const destinationPath = `src/components/${componentType}s/${componentName}.tsx`;
    
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      {
        componentName,
        componentType,
        templateType,
        withProps,
        withVariants,
        withHooks,
        propsInterface: `${componentName}Props`,
        variantsInterface: `${componentName}Variants`,
        hookName: `use${componentName}`
      }
    );
  }

  _writeIndexFile(componentName) {
    const indexContent = `export { default as ${componentName} } from './${componentName}';
export type { ${componentName}Props } from './${componentName}';
`;
    
    this.fs.write(
      this.destinationPath(`src/components/${this.answers.componentType}s/index.ts`),
      indexContent
    );
  }

  _writeTestFile(componentName, componentType, withProps) {
    const testContent = this._generateTestContent(componentName, componentType, withProps);
    
    this.fs.write(
      this.destinationPath(`src/components/${componentType}s/__tests__/${componentName}.test.tsx`),
      testContent
    );
  }

  _writeStoryFile(componentName, componentType, templateType, withProps, withVariants) {
    const storyContent = this._generateStoryContent(componentName, componentType, templateType, withProps, withVariants);
    
    this.fs.write(
      this.destinationPath(`src/stories/${componentName}.stories.tsx`),
      storyContent
    );
  }

  _writeTypesFile(componentName, withVariants) {
    const typesContent = this._generateTypesContent(componentName, withVariants);
    
    this.fs.write(
      this.destinationPath(`src/types/${componentName.toLowerCase()}.ts`),
      typesContent
    );
  }

  _writeHooksFile(componentName) {
    const hookContent = this._generateHookContent(componentName);
    
    this.fs.write(
      this.destinationPath(`src/hooks/use${componentName}.ts`),
      hookContent
    );
  }

  _updateComponentsIndex(componentName, componentType) {
    const indexPath = `src/components/index.ts`;
    
    if (this.fs.exists(this.destinationPath(indexPath))) {
      const content = this.fs.read(this.destinationPath(indexPath));
      const newExport = `export { ${componentName} } from './${componentType}s';`;
      
      if (!content.includes(newExport)) {
        this.fs.write(
          this.destinationPath(indexPath),
          content + '\n' + newExport + '\n'
        );
      }
    }
  }

  _updateComponentsRegistry(componentName, componentType, templateType) {
    const registryPath = `src/data/components-registry.json`;
    
    if (this.fs.exists(this.destinationPath(registryPath))) {
      const registry = JSON.parse(this.fs.read(this.destinationPath(registryPath)));
      
      const newComponent = {
        id: componentName.toLowerCase(),
        name: componentName,
        category: this._getCategoryByType(componentType),
        description: `${componentName} component generated by Yeoman`,
        tags: [componentType, templateType],
        installed: true,
        props: this.answers.withProps ? [`${componentName}Props`] : [],
        variants: this.answers.withVariants ? [`${componentName}Variants`] : [],
        hooks: this.answers.withHooks ? [`use${componentName}`] : []
      };
      
      registry.components.push(newComponent);
      
      this.fs.write(
        this.destinationPath(registryPath),
        JSON.stringify(registry, null, 2)
      );
    }
  }

  _getCategoryByType(componentType) {
    const categoryMap = {
      atom: 'atoms',
      molecule: 'molecules',
      organism: 'organisms'
    };
    return categoryMap[componentType] || 'components';
  }

  _generateTestContent(componentName, componentType, withProps) {
    return `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ${componentName} } from '../${componentName}';

describe('${componentName}', () => {
  it('renders without crashing', () => {
    render(<${componentName} />);
    expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
  });

  ${withProps ? `
  it('renders with custom props', () => {
    const customProps = {
      // Add your test props here
    };
    render(<${componentName} {...customProps} />);
    expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
  });
  ` : ''}

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<${componentName} className={customClass} />);
    expect(screen.getByTestId('${componentName.toLowerCase()}')).toHaveClass(customClass);
  });
});
`;
  }

  _generateStoryContent(componentName, componentType, templateType, withProps, withVariants) {
    return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '../src/components/${componentType}s/${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${componentType}s/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ${withProps ? `
    // Add your argTypes here
    ` : ''}
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default args here
  },
};

${withVariants ? `
export const Variant1: Story = {
  args: {
    variant: 'variant1',
  },
};

export const Variant2: Story = {
  args: {
    variant: 'variant2',
  },
};
` : ''}

export const WithCustomProps: Story = {
  args: {
    // Add your custom props here
  },
};
`;
  }

  _generateTypesContent(componentName, withVariants) {
    return `export interface ${componentName}Props {
  className?: string;
  children?: React.ReactNode;
  // Add your props here
}

${withVariants ? `
export interface ${componentName}Variants {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}
` : ''}
`;
  }

  _generateHookContent(componentName) {
    return `import { useState, useEffect } from 'react';

export interface Use${componentName}Options {
  // Add your hook options here
}

export interface Use${componentName}Return {
  // Add your hook return values here
}

export function use${componentName}(options?: Use${componentName}Options): Use${componentName}Return {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Add your hook logic here
  }, []);

  return {
    // Add your return values here
  };
}
`;
  }

  end() {
    this.log('\n🎉 Component generated successfully!');
    this.log(`\n📁 Files created:`);
    this.log(`  - src/components/${this.answers.componentType}s/${this.answers.componentName}.tsx`);
    
    if (this.answers.withTests) {
      this.log(`  - src/components/${this.answers.componentType}s/__tests__/${this.answers.componentName}.test.tsx`);
    }
    
    if (this.answers.withStory) {
      this.log(`  - src/stories/${this.answers.componentName}.stories.tsx`);
    }
    
    if (this.answers.withProps) {
      this.log(`  - src/types/${this.answers.componentName.toLowerCase()}.ts`);
    }
    
    if (this.answers.withHooks) {
      this.log(`  - src/hooks/use${this.answers.componentName}.ts`);
    }
    
    this.log('\n🚀 Next steps:');
    this.log('  1. Review the generated files');
    this.log('  2. Customize the component logic');
    this.log('  3. Add your specific props and variants');
    this.log('  4. Run tests: npm run test');
    this.log('  5. View in Storybook: npm run storybook');
  }
};
