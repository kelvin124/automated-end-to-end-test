# Project Structure

The test codebase must map to the React SPA's view layout. Use the following structure under the repository root:

```text
tests/
├── navigation/                 # Navigation-focused test scenarios
├── shared/                     # Components shared by multiple views, such as loaders
├── views/
│   └── [view-name]/
│       └── [scenario-name].spec.ts
└── support/                    # Test code that does not belong in navigation, shared, or views
```

Keep exactly one scenario in each TypeScript `.spec.ts` file. Place view-specific scenarios in `tests/views/[view-name]/`.
