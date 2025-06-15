
# Contributing to GoldenPUF NFT

Thank you for your interest in contributing to GoldenPUF NFT! This document outlines the guidelines for contributing to this World Chain exclusive application.

## 🌍 Project Scope

**Important:** This project is built exclusively for the World Chain ecosystem and World App platform. All contributions must maintain compatibility with:
- World Chain network
- World ID integration
- World App platform requirements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Basic understanding of React, TypeScript, and Web3
- Familiarity with World Chain and World ID
- Access to World App for testing

### Development Setup

1. **Fork and Clone**
```bash
git clone https://github.com/yourusername/goldenpuf-nft.git
cd goldenpuf-nft
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Build and Test**
```bash
npm run build
npm run preview
```

## 📋 Contribution Guidelines

### Code Standards
- **TypeScript:** All new code must be written in TypeScript
- **ESLint:** Follow existing ESLint configuration
- **Components:** Create focused, reusable components
- **Styling:** Use Tailwind CSS with existing design system
- **Testing:** Write tests for new functionality

### World Chain Integration Requirements
- All features must work within World App
- Maintain World ID integration compatibility
- Ensure World Chain wallet compatibility
- Follow World Chain smart contract standards

### File Organization
```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── lib/                # Third-party integrations
```

## 🔄 Development Workflow

### 1. Issue Creation
- Check existing issues before creating new ones
- Use clear, descriptive titles
- Provide detailed problem description
- Include screenshots if applicable

### 2. Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### 3. Commit Messages
Follow conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(rewards): add World ID 2x multiplier`
- `fix(wallet): resolve connection timeout`
- `docs(readme): update installation guide`

### 4. Pull Request Process
1. Create feature branch from `main`
2. Make your changes
3. Add/update tests if needed
4. Update documentation
5. Submit pull request with clear description

## 🧪 Testing Guidelines

### Required Tests
- Component rendering tests
- User interaction tests
- World ID integration tests
- Wallet connection tests
- Reward system tests

### Test Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🎨 Design Guidelines

### UI/UX Standards
- Follow existing design system
- Maintain consistent spacing and colors
- Ensure responsive design
- Test on different screen sizes
- Preserve glass-card aesthetic

### Component Guidelines
- Keep components small and focused
- Use TypeScript interfaces
- Follow naming conventions
- Document props and usage

## 🔐 Security Considerations

### World ID Integration
- Never expose sensitive World ID data
- Properly validate verification results
- Implement proper error handling
- Follow World ID best practices

### Wallet Security
- Never store private keys
- Validate all user inputs
- Implement proper session management
- Use secure localStorage practices

## 📊 Performance Guidelines

### Optimization Requirements
- Minimize bundle size
- Optimize image assets
- Implement proper loading states
- Use React best practices
- Optimize for World App performance

## 🐛 Bug Reports

### Information Required
- Operating system
- World App version
- Browser (if applicable)
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Step one
2. Step two
3. Step three

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- World App version:
- Device:
- Network:
```

## 📚 Documentation

### Required Documentation
- Update README.md for new features
- Document new components
- Update API documentation
- Include usage examples

### Documentation Standards
- Use clear, concise language
- Include code examples
- Provide screenshots when helpful
- Keep documentation up-to-date

## 🌟 Feature Requests

### Proposal Process
1. Check existing feature requests
2. Create detailed proposal
3. Discuss with maintainers
4. Get approval before implementation

### Feature Proposal Template
```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed?

**Proposed Implementation**
How should it work?

**World Chain Integration**
How does it fit with World Chain?

**Additional Context**
Any other relevant information
```

## 🔍 Code Review Process

### Review Criteria
- Code quality and standards
- World Chain compatibility
- Security considerations
- Performance impact
- Documentation completeness

### Review Timeline
- Initial review: Within 48 hours
- Follow-up reviews: Within 24 hours
- Final approval: Within 72 hours

## 📞 Contact & Support

### Getting Help
- Create an issue for bugs
- Use discussions for questions
- Contact maintainers for security issues

### Maintainers
- **Project Lead:** [Your Name]
- **Technical Lead:** [Technical Lead Name]
- **Security:** security@goldenpuf.com

## 📄 License

By contributing to GoldenPUF NFT, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for helping make GoldenPUF NFT better! 🚀
