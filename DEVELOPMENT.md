# Development Setup

## Prerequisites

- Ruby 3.4.4
- Rails 8.0.2
- SQLite3

## Installation

```bash
bin/setup
```

## Running the Application

### Recommended: Using bin/dev

```bash
bin/dev
```

This starts both Rails server and TailwindCSS builder. The app runs at http://localhost:3000

**Note**: Without `watchman` installed, CSS rebuilds every 2 seconds automatically. With `watchman`, it rebuilds only when CSS files change.

### Alternative: Run services separately

**Terminal 1 - Rails Server:**
```bash
bin/rails server
```

**Terminal 2 - TailwindCSS (manual rebuild):**
```bash
# Build CSS once
bin/rails tailwindcss:build

# Or manually watch for changes (run after each CSS change)
bin/rails tailwindcss:build
```

### Installing Watchman (Optional)

To enable automatic CSS rebuilding with `bin/dev`:

**Ubuntu/Debian:**
```bash
sudo apt-get install watchman
```

**macOS:**
```bash
brew install watchman
```

**Arch Linux:**
```bash
yay -S watchman
# or
paru -S watchman
```

## Testing

```bash
# Run all tests
bin/rails test

# Run with system tests
bin/rails test:system

# Run linter
bin/rubocop

# Run security checks
bin/brakeman
```

## Deployment

The application is configured for deployment with Kamal:

```bash
bin/kamal deploy
```

## Known Issues

1. **TailwindCSS Watch Mode**: TailwindCSS v4 currently requires `watchman` for watch mode. Without it, you need to manually rebuild CSS after changes using `bin/rails tailwindcss:build`.

2. **Foreman**: The `bin/dev` command requires the `foreman` gem, which is already included in the Gemfile.