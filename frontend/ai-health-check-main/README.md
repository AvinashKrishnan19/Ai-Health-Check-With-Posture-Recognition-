# 📚 **COMPLETE DOCUMENTATION DELIVERY**

***

# 💻 AI Health Check - Deep Code Analysis 

## Complete Programming Breakdown with Algorithms & Execution Flow


***

## 📄 FILE 1: `src/main.jsx` - React Entry Point

### **Complete Code:**

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```


### **Programming Breakdown:**

#### **Import Statements:**

```javascript
import { StrictMode } from 'react'
```

- **What happens:** JavaScript fetches the `StrictMode` component from the `react` package
- **StrictMode purpose:** Development tool that checks for potential problems
- **When it runs:** At build time, bundler (Vite) resolves this import
- **Output:** `StrictMode` becomes available as a React component

```javascript
import { createRoot } from 'react-dom/client'
```

- **What it does:** Gets the function to create a React root container
- **Package:** `react-dom/client` (React's DOM rendering library)
- **createRoot:** Modern React 18+ API for rendering
- **Why not ReactDOM.render?** That's legacy; createRoot enables concurrent features

```javascript
import App from './App.jsx'
```

- **Relative import:** Looks for `App.jsx` in same directory (`src/`)
- **Default import:** Gets whatever is exported as `export default` from App.jsx
- **File resolution:** Vite automatically handles `.jsx` extension

```javascript
import './index.css'
```

- **Side-effect import:** Loads CSS into the bundle
- **No variable assigned:** CSS is injected into page, not used in JS
- **Build process:** Vite processes this CSS file and includes it


#### **Root Creation:**

```javascript
document.getElementById('root')
```

**Step-by-step execution:**

1. Browser's `document` object searches the DOM
2. Finds element with `id="root"` (from `index.html`)
3. Returns that DOM element as an object
4. If not found, returns `null`

**HTML it's looking for:**

```html
<div id="root"></div>
```

```javascript
createRoot(document.getElementById('root'))
```

**What this does:**

1. Takes the DOM element (the `<div id="root">`)
2. Creates a React root container
3. Prepares it for React rendering
4. Returns a root object with `.render()` method

**Memory allocation:**

- Creates fiber tree structure in memory
- Sets up update queue
- Initializes reconciliation system


#### **Render Call:**

```javascript
.render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**JSX Transformation:**
This JSX:

```javascript
<StrictMode>
  <App />
</StrictMode>
```

Gets transpiled to:

```javascript
React.createElement(
  StrictMode,
  null,
  React.createElement(App, null)
)
```

**Execution Flow:**

```
1. createRoot() creates root
     ↓
2. .render() receives React element tree
     ↓
3. React schedules initial render
     ↓
4. Virtual DOM built in memory
     ↓
5. Reconciliation calculates changes
     ↓
6. Commit phase: Updates real DOM
     ↓
7. Browser paints the UI
```


#### **StrictMode Effects:**

```javascript
<StrictMode>
  <App />
</StrictMode>
```

**What StrictMode does:**

1. **Double-invokes effects:** Calls `useEffect` twice in development
2. **Detects unsafe lifecycles:** Warns about deprecated methods
3. **Warns about legacy APIs:** Flags old React patterns
4. **Production:** Does nothing (no performance impact)

**Why double-invoke?**

```javascript
// Component might run like this in dev:
useEffect(() => {
  console.log('Effect 1')  // Logs twice
  return () => console.log('Cleanup 1')
})

// This helps catch bugs where cleanup isn't proper
```


#### **Complete Execution Timeline:**

```
Time 0ms:  Browser loads index.html
           ↓
Time 10ms: Script tag loads main.jsx bundle
           ↓
Time 15ms: Import statements execute
           - React library loads
           - App.jsx loads and executes
           - index.css loads and applies
           ↓
Time 20ms: document.getElementById('root') finds element
           ↓
Time 25ms: createRoot() creates React root
           ↓
Time 30ms: .render() schedules initial render
           ↓
Time 35ms: React builds virtual DOM tree
           ↓
Time 50ms: First paint (UI appears)
           ↓
Time 60ms: StrictMode runs effects twice (dev only)
           ↓
Time 100ms: App fully interactive
```


#### **DOM Before and After:**

**Before:**

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>  <!-- Empty -->
    <script src="main.jsx"></script>
  </body>
</html>
```

**After:**

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root">
      <!-- React renders inside here -->
      <div class="app-container">
        <header>...</header>
        <main>...</main>
      </div>
    </div>
    <script src="main.jsx"></script>
  </body>
</html>
```


***

## 📄 FILE 2: `src/App.jsx` - Application Router

### **Complete Code:**

```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { HealthProvider } from './context/HealthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HealthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HealthProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
```


### **Programming Breakdown:**

#### **Import Analysis:**

```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
```

**Named imports from react-router-dom:**

- **BrowserRouter:** Uses HTML5 history API for routing
- **Routes:** Container for all route definitions
- **Route:** Defines a single route mapping
- **Navigate:** Programmatic navigation component

**What react-router-dom provides:**

- Client-side routing (no page reloads)
- URL management
- History stack
- Link navigation

```javascript
import { AuthProvider } from './context/AuthContext'
import { HealthProvider } from './context/HealthContext'
```

**Context providers:**

- Named exports (use curly braces)
- Wrap components to provide state
- AuthProvider: handles user authentication
- HealthProvider: manages health metrics

```javascript
import { ProtectedRoute } from './components/ProtectedRoute'
```

**Higher-order component:**

- Wraps routes that require authentication
- Checks if user is logged in
- Redirects to login if not authenticated

```javascript
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
```

**Page components:**

- Default imports (no curly braces)
- Each represents a full page/screen
- Rendered based on current URL


#### **BrowserRouter Setup:**

```javascript
<BrowserRouter>
  {/* Everything inside has access to routing */}
</BrowserRouter>
```

**What BrowserRouter does:**

1. Creates a history object
2. Listens to URL changes
3. Provides routing context to children
4. Uses `window.history.pushState()`

**URL Handling:**

```javascript
// User visits: http://localhost:5173/dashboard

BrowserRouter reads: /dashboard
History API: window.location.pathname
No server request made (client-side only)
```


#### **Provider Nesting:**

```javascript
<BrowserRouter>
  <AuthProvider>
    <HealthProvider>
      <Routes>
        {/* Components here have access to:
            1. Routing (from BrowserRouter)
            2. Auth state (from AuthProvider)
            3. Health data (from HealthProvider)
        */}
      </Routes>
    </HealthProvider>
  </AuthProvider>
</BrowserRouter>
```

**Context Flow:**

```
BrowserRouter (routing context)
    ↓
AuthProvider (auth context)
    ↓
HealthProvider (health context)
    ↓
Routes (combines all contexts)
    ↓
Individual route components
```

**Why this order matters:**

- HealthProvider might need auth data
- Can't access parent contexts from children
- Inner providers can access outer contexts


#### **Routes Configuration:**

```javascript
<Routes>
  <Route path="/login" element={<Login />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

**Route Matching Algorithm:**

```
1. User navigates to URL
     ↓
2. Routes component gets pathname
     ↓
3. Check each Route's path prop
     ↓
4. First matching route renders its element
     ↓
5. Stop checking (only one route renders)
```

**Route Examples:**

**Route 1: Login**

```javascript
<Route path="/login" element={<Login />} />
```

- **URL:** `http://localhost:5173/login`
- **Matches:** Exact path `/login`
- **Renders:** `<Login />` component
- **No protection:** Public route

**Route 2: Protected Dashboard**

```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

- **URL:** `http://localhost:5173/dashboard`
- **Matches:** Exact path `/dashboard`

```
- **Renders:** `<ProtectedRoute>` wrapping `<Dashboard />`
```

- **Protection:** Checks authentication first

**Execution flow:**

```
1. Route matched: /dashboard
     ↓
2. Renders: <ProtectedRoute>
     ↓
3. ProtectedRoute checks: isAuthenticated?
     ↓
4a. If true: Renders <Dashboard />
4b. If false: <Navigate to="/login" />
```

**Route 3: Root Redirect**

```javascript
<Route path="/" element={<Navigate to="/dashboard" replace />} />
```

- **URL:** `http://localhost:5173/`
- **Matches:** Root path `/`
- **Renders:** `<Navigate />` component
- **Effect:** Immediately redirects to `/dashboard`

**Navigate component:**

```javascript
<Navigate to="/dashboard" replace />
```

- **to="/dashboard":** Destination URL
- **replace:** Don't add to history stack

**History difference:**

```javascript
// Without replace:
history: ['/', '/dashboard'] 
// Back button goes to '/'

// With replace:
history: ['/dashboard']
// Back button goes to previous page before '/'
```

**Route 4: 404 Catch-All**

```javascript
<Route path="*" element={<NotFound />} />
```

- **path="*":** Matches any unmatched path
- **Wildcard:** Catches everything else
- **Order matters:** Must be last route

**Examples:**

```javascript
/unknown      → NotFound
/dashboard/fake → NotFound
/anything-else  → NotFound
```


#### **Complete URL Matching Flow:**

```
User visits: http://localhost:5173/some-path

1. BrowserRouter extracts: /some-path
     ↓
2. Routes checks each Route in order:
   
   Check: path="/login"
   Match: /some-path === /login? NO
   Continue to next route
     ↓
   Check: path="/dashboard"
   Match: /some-path === /dashboard? NO
   Continue to next route
     ↓
   Check: path="/"
   Match: /some-path === /? NO
   Continue to next route
     ↓
   Check: path="*"
   Match: * matches anything! YES
   Render: <NotFound />
     ↓
3. Stop checking (match found)
     ↓
4. NotFound component renders
```


#### **Authentication Flow:**

```
User visits /dashboard
    ↓
BrowserRouter matches route
    ↓
Route renders <ProtectedRoute>
    ↓
ProtectedRoute checks AuthContext
    ↓
Is user authenticated?
    ↓
├─ YES: Render <Dashboard />
│   └─ HealthProvider provides metrics
│       └─ Dashboard shows data
│
└─ NO: <Navigate to="/login" />
    └─ Login page renders
        └─ User can log in
```


#### **Component Tree:**

```
<App>
  <BrowserRouter>
    <AuthProvider value={authState}>
      <HealthProvider value={healthState}>
        <Routes>
          <Route /> ← One of these renders based on URL
          <Route />
          <Route />
          <Route />
        </Routes>
      </HealthProvider>
    </AuthProvider>
  </BrowserRouter>
</App>
```


***

## 📄 FILE 3: `src/index.css` - CSS Import Orchestrator

### **Complete Code:**

```css
@import './styles/variables.css';
@import './styles/global.css';
@import './styles/animations.css';
```


### **Programming Breakdown:**

#### **CSS @import Directive:**

```css
@import './styles/variables.css';
```

**What happens:**

1. **Parser reads:** CSS engine sees `@import`
2. **File resolution:** Browser/bundler resolves path `./styles/variables.css`
3. **File fetch:** Content of variables.css is loaded
4. **Injection:** CSS rules are inserted at this location
5. **Processing:** Browser parses the imported CSS

**Build-time vs Runtime:**

```javascript
// Development (Vite):
@import → Vite intercepts → Loads file → Bundles inline

// Production (Build):
@import → All CSS merged → Single file → Minified
```

**Order of imports:**

```css
@import './styles/variables.css';   /* Loaded FIRST */
@import './styles/global.css';      /* Loaded SECOND */
@import './styles/animations.css';  /* Loaded THIRD */
```

**Why order matters:**

```css
/* variables.css defines: */
:root {
  --primary-color: #2563eb;
}

/* global.css uses: */
body {
  color: var(--primary-color);  /* Must be defined first! */
}

/* If order reversed: */
body {
  color: var(--primary-color);  /* ❌ undefined! */
}
:root {
  --primary-color: #2563eb;     /* Defined too late */
}
```


#### **Import Execution Flow:**

```
1. Browser loads index.css
     ↓
2. Reads @import './styles/variables.css'
     ↓
3. Fetch variables.css
     ↓
4. Parse and apply CSS custom properties
     ↓
5. Reads @import './styles/global.css'
     ↓
6. Fetch global.css
     ↓
7. Parse and apply global styles (can use variables)
     ↓
8. Reads @import './styles/animations.css'
     ↓
9. Fetch animations.css
     ↓
10. Parse and apply keyframe animations
     ↓
11. All CSS now available to application
```


#### **Final CSS Structure:**

```css
/* After all imports resolve: */

/* From variables.css */
:root {
  --primary-color: #2563eb;
  --spacing-md: 1rem;
  /* ... more variables */
}

/* From global.css */
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: sans-serif;
  /* ... more global styles */
}

/* From animations.css */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```


#### **Alternative Approaches:**

**Option 1: Single File**

```css
/* index.css contains everything */
:root { --primary-color: #2563eb; }
body { color: var(--primary-color); }
@keyframes fadeIn { /* ... */ }

/* Problem: Hard to maintain, no organization */
```

**Option 2: Modular with @import (current)**

```css
@import './styles/variables.css';
@import './styles/global.css';
@import './styles/animations.css';

/* Benefit: Organized, maintainable, clear separation */
```

**Option 3: JavaScript imports**

```javascript
// In main.jsx
import './styles/variables.css'
import './styles/global.css'
import './styles/animations.css'

/* Same result, different approach */
```


***

## 📄 FILE 4: `src/styles/variables.css` - Design System Tokens

### **Complete Code:**

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-primary-dark: #1e40af;
  --color-primary-light: #3b82f6;
  
  --color-secondary: #10b981;
  --color-secondary-dark: #059669;
  
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  --color-success: #10b981;
  
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  --color-text-light: #9ca3af;
  
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-bg-tertiary: #f3f4f6;
  
  --color-border: #e5e7eb;
  --color-border-light: #f3f4f6;
  
  /* Spacing */
  --spacing-xs: 0.25rem;    /* 4px */
  --spacing-sm: 0.5rem;     /* 8px */
  --spacing-md: 1rem;       /* 16px */
  --spacing-lg: 1.5rem;     /* 24px */
  --spacing-xl: 2rem;       /* 32px */
  --spacing-2xl: 3rem;      /* 48px */
  
  /* Typography */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  --font-family-mono: 'Monaco', 'Courier New', monospace;
  
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 2rem;     /* 32px */
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Border Radius */
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
  
  /* Z-index layers */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-modal: 1030;
  --z-popover: 1040;
  --z-tooltip: 1050;
}
```


### **Programming Breakdown:**

#### **CSS Custom Properties (Variables):**

```css
:root {
  --color-primary: #2563eb;
}
```

**What `:root` means:**

- **Selector:** Targets the root element (`:root` = `<html>`)
- **Scope:** Variables defined here are globally accessible
- **Specificity:** `:root` has higher specificity than `html`

**Custom property syntax:**

```css
--property-name: value;

/* Two dashes required */
/* Kebab-case naming */
/* Any CSS value allowed */
```

**Using variables:**

```css
/* Define */
:root {
  --color-primary: #2563eb;
}

/* Use */
button {
  background: var(--color-primary);
}

/* With fallback */
button {
  background: var(--color-primary, blue);  /* blue if variable not found */
}
```


#### **Color System:**

```css
--color-primary: #2563eb;
--color-primary-dark: #1e40af;
--color-primary-light: #3b82f6;
```

**Hexadecimal color breakdown:**

```
#2563eb
 ││││└─ Blue: eb (235 in decimal)
 ││└└─── Green: 63 (99 in decimal)
 └└───── Red: 25 (37 in decimal)

Result: RGB(37, 99, 235) - A blue color
```

**Color scale algorithm:**

```css
/* Base color */
--color-primary: #2563eb;         /* Middle value */

/* Darker variant (reduce RGB values) */
--color-primary-dark: #1e40af;    /* RGB(30, 64, 175) */

/* Lighter variant (increase RGB values) */
--color-primary-light: #3b82f6;   /* RGB(59, 130, 246) */

/* Mathematical relationship: */
/* dark = base - ~20% */
/* light = base + ~20% */
```

**Semantic color naming:**

```css
/* Functional naming */
--color-danger: #ef4444;   /* Red - for errors */
--color-warning: #f59e0b;  /* Yellow - for warnings */
--color-success: #10b981;  /* Green - for success */

/* Usage: */
.error-message {
  color: var(--color-danger);  /* Self-documenting */
}
```


#### **Spacing System:**

```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
```

**rem unit explanation:**

```css
/* rem = Root EM (relative to root font-size) */

html {
  font-size: 16px;  /* Default browser size */
}

--spacing-md: 1rem;
/* 1rem = 1 × 16px = 16px */

--spacing-xl: 2rem;
/* 2rem = 2 × 16px = 32px */
```

**Spacing scale math:**

```
xs:  0.25rem = 16px × 0.25 = 4px
sm:  0.5rem  = 16px × 0.5  = 8px
md:  1rem    = 16px × 1    = 16px  (base)
lg:  1.5rem  = 16px × 1.5  = 24px
xl:  2rem    = 16px × 2    = 32px
2xl: 3rem    = 16px × 3    = 48px

/* Pattern: Consistent multiplier (1.5x - 2x growth) */
```

**Usage example:**

```css
.card {
  padding: var(--spacing-md);           /* 16px all sides */
  margin-bottom: var(--spacing-lg);     /* 24px bottom */
  gap: var(--spacing-sm);               /* 8px between items */
}
```


#### **Typography System:**

```css
--font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

**Font stack explanation:**

```css
/* Font stack order: */
1. -apple-system         /* macOS/iOS system font */
2. BlinkMacSystemFont    /* macOS Chrome */
3. 'Segoe UI'            /* Windows */
4. 'Roboto'              /* Android */
5. sans-serif            /* Fallback generic */

/* Browser tries fonts in order until one is found */
```

**Why this order:**

- **Native fonts:** Faster loading (already installed)
- **Platform-specific:** Looks native to OS
- **Fallback:** Ensures text always renders

**Font size scale:**

```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px - default */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
--font-size-3xl: 2rem;     /* 32px */
```

**Type scale ratio calculation:**

```
xs → sm: 0.875 / 0.75 = 1.167x
sm → base: 1 / 0.875 = 1.143x
base → lg: 1.125 / 1 = 1.125x
lg → xl: 1.25 / 1.125 = 1.111x

/* Approximately 1.125x (major second) scale */
```

**Font weight values:**

```css
--font-weight-normal: 400;    /* Regular text */
--font-weight-medium: 500;    /* Slightly bold */
--font-weight-semibold: 600;  /* Headings */
--font-weight-bold: 700;      /* Emphasis */

/* Standard font weight scale: 100-900 */
/* 400 and 700 are most commonly supported */
```

**Line height explained:**

```css
--line-height-tight: 1.25;     /* 125% of font size */
--line-height-normal: 1.5;     /* 150% of font size */
--line-height-relaxed: 1.75;   /* 175% of font size */

/* Example with 16px font: */
font-size: 16px;
line-height: 1.5;
/* Actual line height = 16px × 1.5 = 24px */
```


#### **Border Radius System:**

```css
--radius-sm: 0.25rem;   /* 4px - subtle rounding */
--radius-md: 0.5rem;    /* 8px - standard buttons */
--radius-lg: 0.75rem;   /* 12px - cards */
--radius-xl: 1rem;      /* 16px - modals */
--radius-full: 9999px;  /* Fully rounded (pills/circles) */
```

**Radius visual effect:**

```
┌────────┐  radius-sm (4px)   - Slight curve
┏━━━━━━━┓  radius-md (8px)   - Noticeable curve
┏━━━━━━┓   radius-lg (12px)  - Rounded corners
╭──────╮    radius-xl (16px)  - Very rounded
( •  • )    radius-full       - Fully circular
```

**Usage patterns:**

```css
.button {
  border-radius: var(--radius-md);  /* Standard button */
}

.card {
  border-radius: var(--radius-lg);  /* Card component */
}

.avatar {
  border-radius: var(--radius-full);  /* Circular avatar */
}
```


#### **Shadow System:**

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

**Box-shadow syntax breakdown:**

```css
box-shadow: offset-x offset-y blur-radius spread-radius color;

/* Example: */
0 4px 6px -1px rgba(0, 0, 0, 0.1);
│ │  │   │   └─ Color (black at 10% opacity)
│ │  │   └───── Spread: -1px (shrink shadow)
│ │  └───────── Blur: 6px (soft edge)
│ └──────────── Y offset: 4px (down)
└────────────── X offset: 0px (centered)
```

**Shadow depth visualization:**

```
sm: ▁       (subtle, barely visible)
md: ▂▂      (noticeable elevation)
lg: ▃▃▃     (floating card)
xl: ▄▄▄▄    (modal/dialog)
```

**rgba() color:**

```css
rgba(0, 0, 0, 0.1)
     │  │  │  └─ Alpha (opacity): 0.1 = 10%
     │  │  └──── Blue: 0
     │  └─────── Green: 0
     └────────── Red: 0

/* Black at 10% transparency = light gray shadow */
```


#### **Transition System:**

```css
--transition-fast: 150ms ease-in-out;
--transition-base: 250ms ease-in-out;
--transition-slow: 350ms ease-in-out;
```

**Transition syntax:**

```css
transition: duration timing-function;

150ms ease-in-out
│     └─ Timing function (how it accelerates)
└─────── Duration (how long)
```

**Timing function explained:**

```css
ease-in-out: starts slow → speeds up → slows down

/* Animation curve: */
0%   ──┐
25%    │  ╱
50%    │ ╱ (fastest)
75%    ╱ │
100% ─┘  │

/* Smooth, natural-feeling motion */
```

**Usage example:**

```css
.button {
  background: var(--color-primary);
  transition: var(--transition-base);  /* 250ms ease-in-out */
}

.button:hover {
  background: var(--color-primary-dark);
  /* Smoothly animates over 250ms */
}
```

**Duration guidelines:**

```
fast (150ms):   Hover effects, small changes
base (250ms):   Button clicks, color changes
slow (350ms):   Large movements, complex animations
```


#### **Z-index Layers:**

```css
--z-dropdown: 1000;
--z-sticky: 1020;
--z-modal: 1030;
--z-popover: 1040;
--z-tooltip: 1050;
```

**Z-index stacking context:**

```
Highest ↑  Tooltip (1050)    - Always on top
           Popover (1040)    - Above modals
           Modal (1030)      - Covers page
           Sticky (1020)     - Stays visible
Lowest  ↓  Dropdown (1000)   - Above content

Page content (z-index: auto or 1)
```

**Why use 1000+ values:**

- **Avoid conflicts:** Most content uses 0-100
- **Room to grow:** Can add layers between (1015, 1025)
- **Clear separation:** Large gaps make intent obvious

**Usage:**

```css
.modal-backdrop {
  z-index: var(--z-modal);  /* 1030 - covers page */
}

.tooltip {
  z-index: var(--z-tooltip);  /* 1050 - always visible */
}
```


***

## 📄 FILE 5: `src/styles/global.css` - Global Reset \& Base Styles

### **Complete Code:**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  min-height: 100vh;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: var(--transition-fast);
}

a:hover {
  color: var(--color-primary-dark);
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

h1 {
  font-size: var(--font-size-3xl);
}

h2 {
  font-size: var(--font-size-2xl);
}

h3 {
  font-size: var(--font-size-xl);
}

ul,
ol {
  list-style-position: inside;
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: var(--radius-full);
}

*::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-secondary);
}
```


### **Programming Breakdown:**

#### **Universal Reset:**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

**Selector breakdown:**

```css
*              /* Every element */
*::before      /* Every ::before pseudo-element */
*::after       /* Every ::after pseudo-element */
```

**box-sizing explained:**

```css
/* Without box-sizing: */
.box {
  width: 100px;
  padding: 10px;
  border: 5px;
  /* Actual width = 100 + 20 + 10 = 130px */
}

/* With box-sizing: border-box: */
.box {
  box-sizing: border-box;
  width: 100px;
  padding: 10px;
  border: 5px;
  /* Actual width = 100px (padding and border included) */
}
```

**Visual representation:**

```
content-box (default):
┌─────────────────────┐
│ border: 5px         │
│ ┌─────────────────┐ │
│ │ padding: 10px   │ │
│ │ ┌─────────────┐ │ │
│ │ │ width: 100px│ │ │  Total: 130px
│ │ └─────────────┘ │ │
│ └─────────────────┘ │
└─────────────────────┘

border-box:
┌─────────────────────┐
│ width: 100px        │
│ ┌─────────────────┐ │ Total: 100px
│ │ content fits    │ │ (border + padding shrink content)
│ └─────────────────┘ │
└─────────────────────┘
```

**margin: 0; padding: 0;**

```css
/* Removes browser default spacing */

/* Before reset: */
<h1>Title</h1>  /* Has default margin */
<p>Text</p>     /* Has default margin */

/* After reset: */
<h1>Title</h1>  /* No margin */
<p>Text</p>     /* No margin */
/* You control all spacing explicitly */
```


#### **HTML Root:**

```css
html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**font-size: 16px:**

```css
/* Sets base font size for rem calculations */
html { font-size: 16px; }

/* Now 1rem = 16px everywhere */
.text { font-size: 2rem; }  /* 32px */
.small { font-size: 0.5rem; }  /* 8px */
```

**Font smoothing:**

```css
-webkit-font-smoothing: antialiased;
/* macOS/iOS: Makes fonts smoother, less bold */

-moz-osx-font-smoothing: grayscale;
/* Firefox on macOS: Same effect */

/* Visual difference: */
/* Without: ■■■ (sharp, bold) */
/* With:    ▓▓▓ (smooth, lighter) */
```


#### **Body Styles:**

```css
body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  min-height: 100vh;
}
```

**Property inheritance:**

```css
body {
  font-family: var(--font-family-base);
  /* Children inherit: <p>, <div>, <span>, etc. */
}

<body>
  <div>  /* Inherits font-family */
    <p>  /* Also inherits font-family */
      <span>  /* Also inherits */
    </span>
  </p>
</div>
</body>
```

**min-height: 100vh:**

```css
min-height: 100vh;
/* vh = viewport height */
/* 100vh = 100% of browser window height */

/* Effect: */
/* Body always fills screen, even with little content */

/* Visual: */
┌─────────────────┐
│                 │ ← Viewport
│  Content        │
│                 │
│                 │ ← Body fills to bottom
│                 │
└─────────────────┘
```


#### **Link Styles:**

```css
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: var(--transition-fast);
}

a:hover {
  color: var(--color-primary-dark);
}
```

**State machine:**

```
Initial state:
├─ color: blue
└─ text-decoration: none (no underline)

On hover:
├─ color: dark blue
└─ transition: smooth 150ms color change

/* Pseudo-class :hover triggers when mouse enters */
```

**Transition flow:**

```
Mouse enters link
    ↓
:hover pseudo-class activates
    ↓
color changes to --color-primary-dark
    ↓
transition: 150ms animates the color change
    ↓
Visual: Smooth color shift over 150 milliseconds
```


#### **Button Reset:**

```css
button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}
```

**Why reset buttons:**

```css
/* Browser default button: */
button {
  border: 2px outset buttonface;
  background: buttonface;
  font-family: system default;
  /* Looks different across browsers */
}

/* After reset: */
button {
  border: none;           /* Remove default border */
  background: none;       /* Remove default background */
  font-family: inherit;   /* Use parent font */
  cursor: pointer;        /* Show hand cursor */
  /* Now fully customizable */
}
```

**inherit keyword:**

```css
font-family: inherit;

/* Inherits from parent element */
<body style="font-family: Arial;">
  <button>Click</button>  
  /* Button uses Arial (inherited from body) */
</body>
```


#### **Form Input Reset:**

```css
input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
```

**Why reset form elements:**

```css
/* Browser default: */
input {
  font-family: monospace;  /* Different from page */
  font-size: 13px;         /* Smaller than body */
}

/* After reset: */
input {
  font-family: inherit;  /* Matches body */
  font-size: inherit;    /* Matches body */
  /* Consistent typography */
}
```


#### **Image Responsive:**

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

**Responsive image algorithm:**

```css
max-width: 100%;
/* Never exceed container width */

height: auto;
/* Maintain aspect ratio */

/* Example: */
Container: 300px wide
Image: 500px × 400px

Result:
Width: 300px (max-width constraint)
Height: 240px (auto-calculated: 300/500 × 400)
Aspect ratio preserved: 5:4
```

**display: block:**

```css
/* By default: */
img { display: inline; }
/* Inline creates small gap below image */

/* Changed to: */
img { display: block; }
/* Removes gap, easier to position */
```


#### **Heading Styles:**

```css
h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

h1 { font-size: var(--font-size-3xl); }  /* 32px */
h2 { font-size: var(--font-size-2xl); }  /* 24px */
h3 { font-size: var(--font-size-xl); }   /* 20px */
```

**Heading hierarchy:**

```
h1: 32px (3xl) - Page title
h2: 24px (2xl) - Section title
h3: 20px (xl)  - Subsection title
h4: 16px (base) - (inherits from body)
h5: 16px (base)
h6: 16px (base)
```

**line-height: tight:**

```css
h1 {
  font-size: 32px;
  line-height: var(--line-height-tight);  /* 1.25 */
}

/* Actual line height = 32px × 1.25 = 40px */

/* Why tight for headings? */
/* Large text needs less space between lines */
/* Prevents headings from looking "airy" */
```


#### **Scrollbar Customization:**

```css
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: var(--radius-full);
}

*::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-secondary);
}
```

**Scrollbar anatomy:**

```
┌─────────────────┐
│ Content         │
│                 │
│                 │ ← Track (background)
│         ┌─┐     │
│         │█│     │ ← Thumb (draggable part)
│         └─┘     │
└─────────────────┘
    ↑      ↑
  Track  Thumb
```

**Firefox vs Chrome:**

```css
/* Firefox: */
scrollbar-width: thin;
scrollbar-color: gray transparent;

/* Chrome/Safari (webkit): */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-thumb { background: gray; }

/* Different syntaxes, same visual result */
```

**Hover effect:**

```css
*::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-secondary);
}

/* When mouse hovers thumb: */
/* Light gray → Dark gray */
/* Provides visual feedback */
```


***

## 📄 FILE 6: `src/styles/animations.css` - Keyframe Animations

### **Complete Code:**

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

.slide-up {
  animation: slideUp 0.4s ease-out;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}
```


### **Programming Breakdown:**

#### **@keyframes Syntax:**

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**What this creates:**

- **Animation definition:** Named "fadeIn"
- **Keyframes:** Start and end states
- **Doesn't run automatically:** Must be applied with `animation` property

**Alternative syntax:**

```css
/* from/to syntax: */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Percentage syntax (equivalent): */
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Both produce same result */
```


#### **fadeIn Animation:**

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Timeline:**

```
Time: 0%  ────────────────────► 100%
Opacity: 0 ────────────────────► 1

Visual:
0%:   [ ]     (invisible)
25%:  [░]     (faint)
50%:  [▒]     (half visible)
75%:  [▓]     (mostly visible)
100%: [█]     (fully visible)
```

**Usage:**

```css
.modal {
  animation: fadeIn 0.3s ease-in-out;
}

/* Breakdown: */
animation-name: fadeIn;
animation-duration: 0.3s;
animation-timing-function: ease-in-out;
```


#### **slideIn Animation:**

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

**transform: translateX() explained:**

```css
translateX(-100%);
/* Moves element left by 100% of its own width */

/* Example with 200px wide element: */
translateX(-100%) = Move left 200px
translateX(0)     = Original position
translateX(50%)   = Move right 100px
```

**Animation timeline:**

```
Position:
0%:   [██] ────────────► ────────────  (off-screen left)
50%:  ──────[██]──────► ────────────
100%: ──────────────[██]──────────  (on-screen)

Opacity:
0%: invisible
100%: visible

/* Combined: Slides in while fading in */
```

**Coordinate system:**

```
        -100%     0      +100%
          ←       ■       →
     Off-screen  Center  Off-screen
       (left)             (right)
```


#### **slideUp Animation:**

```css
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**translateY() vs translateX():**

```css
translateX: Horizontal movement (left/right)
translateY: Vertical movement (up/down)

/* Positive Y: Move down */
/* Negative Y: Move up */
```

**Animation flow:**

```
Start (0%):
Position: 20px below final position
Opacity: 0 (invisible)
  │
  ├─ 25%: 15px below, opacity 0.25
  │
  ├─ 50%: 10px below, opacity 0.5
  │
  ├─ 75%: 5px below, opacity 0.75
  │
  └─ 100%: Final position, opacity 1
```

**Visual representation:**

```
Start:    ┌────┐  (20px down, invisible)
          │    │
          └────┘

Midpoint: ┌────┐  (10px down, half visible)
          │░░░░│
          └────┘

End:      ┌────┐  (0px, fully visible)
          │████│
          └────┘
```


#### **spin Animation:**

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

**rotate() function:**

```css
transform: rotate(45deg);   /* 45 degrees clockwise */
transform: rotate(-45deg);  /* 45 degrees counter-clockwise */
transform: rotate(360deg);  /* Full rotation */
```

**Degrees visualization:**

```
       0deg (top)
          ↑
    270° ← ■ → 90°
          ↓
      180deg (bottom)

Full rotation: 0deg → 360deg
```

**Loading spinner usage:**

```css
.loading-spinner {
  animation: spin 1s linear infinite;
}

/* Breakdown: */
animation-name: spin;
animation-duration: 1s;          /* One rotation per second */
animation-timing-function: linear; /* Constant speed */
animation-iteration-count: infinite; /* Never stops */
```

**Timing function comparison:**

```css
/* linear: */
Speed: ──────────────── (constant)

/* ease-in-out: */
Speed: ─╱╲─ (slow → fast → slow)

/* For spinners: Always use linear */
/* Ensures smooth, continuous rotation */
```


#### **pulse Animation:**

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}
```

**Multiple keyframe stops:**

```css
0% and 100%: Same state (start and end identical)
50%: Midpoint state (different)

/* Effect: Returns to original state */
/* Creates looping animation */
```

**scale() function:**

```css
transform: scale(1);     /* Original size (100%) */
transform: scale(1.05);  /* 5% larger */
transform: scale(0.5);   /* 50% of original */
transform: scale(2);     /* 200% (double) */
```

**Pulse timeline:**

```
Time:     0%    25%   50%   75%   100%
          │     │     │     │     │
Scale:    1.0───1.025─1.05──1.025─1.0
          │  ╱       ╲  │
Opacity:  1.0───0.75───0.5───0.75───1.0

Visual:
0%:   [██]     (normal)
50%:  [███]    (slightly bigger, dimmer)
100%: [██]     (back to normal)
```

**Infinite pulse:**

```css
.notification-badge {
  animation: pulse 2s ease-in-out infinite;
}

/* Timeline: */
0s:    Normal
1s:    Pulsed (50% through)
2s:    Normal (loop restarts)
4s:    Normal (second loop completes)
...    (continues forever)
```


#### **Utility Classes:**

```css
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

.slide-up {
  animation: slideUp 0.4s ease-out;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}
```

**Usage in components:**

```javascript
// React component
<div className="fade-in">
  Content fades in
</div>

<div className="slide-up">
  Content slides up
</div>

<div className="loading-spinner">⟳</div>
```

**Animation property shorthand:**

```css
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

/* Expands to: */
.fade-in {
  animation-name: fadeIn;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
}
```

**Timing functions comparison:**

```
ease-in-out:
Speed: slow ──▶ fast ──▶ slow
Best for: Most animations

ease-out:
Speed: fast ──▶ slow
Best for: Elements entering screen

ease-in:
Speed: slow ──▶ fast
Best for: Elements exiting screen

linear:
Speed: constant ──────────
Best for: Spinners, looping animations
```


***

## 📄 FILE 7: `src/context/AuthContext.jsx` - Authentication State Management

### **Complete Code:**

```javascript
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
      }
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
  }, [])

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```


### **Programming Breakdown:**

#### **Context Creation:**

```javascript
const AuthContext = createContext(null)
```

**What createContext does:**

```javascript
// Creates two components:
AuthContext = {
  Provider: Component,  // Provides value to children
  Consumer: Component,  // Consumes value (rarely used)
}

// Initial value: null (default when no Provider)
```

**Context purpose:**

- Avoid prop drilling
- Share state across component tree
- Global state management

**Without context:**

```javascript
<App>
  <Header user={user} />
    <Nav user={user} />
      <Profile user={user} />  // Prop drilling!
```

**With context:**

```javascript
<AuthProvider>
  <App>
    <Header />  // No props needed
      <Nav />
        <Profile />  // useAuth() gets user
```


#### **State Management:**

```javascript
const [user, setUser] = useState(null)
const [isLoading, setIsLoading] = useState(true)
```

**State structure:**

```javascript
// user state:
null  // Not logged in

{
  id: '1',
  email: 'user@example.com',
  name: 'user'
}  // Logged in

// isLoading state:
true   // Checking localStorage
false  // Check complete
```

**Why isLoading:**

```javascript
// Component renders before localStorage check completes
// Without isLoading:
1. Component renders
2. user = null
3. Redirects to login
4. localStorage loads user
5. Too late! Already redirected

// With isLoading:
1. Component renders
2. isLoading = true
3. Show loading spinner
4. localStorage check completes
5. isLoading = false
6. Render correct screen
```


#### **useEffect for Persistence:**

```javascript
useEffect(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    setUser(JSON.parse(storedUser))
  }
  setIsLoading(false)
}, [])
```

**Execution timeline:**

```
Time 0ms:  Component mounts
           ↓
Time 1ms:  useState initializes:
           - user = null
           - isLoading = true
           ↓
Time 2ms:  First render (loading state)
           ↓
Time 3ms:  useEffect runs:
           - Reads localStorage
           - Gets: '{"id":"1","email":"user@example.com"}'
           ↓
Time 4ms:  JSON.parse() converts string to object
           ↓
Time 5ms:  setUser(userData) triggers re-render
           ↓
Time 6ms:  setIsLoading(false) triggers re-render
           ↓
Time 7ms:  Component re-renders with user data
```

**localStorage API:**

```javascript
// Store data
localStorage.setItem('key', 'value')  // Only strings!

// Retrieve data
localStorage.getItem('key')  // Returns string or null

// Remove data
localStorage.removeItem('key')

// Clear all
localStorage.clear()
```

**JSON serialization:**

```javascript
// Object to string:
const user = { id: 1, name: 'John' }
const userString = JSON.stringify(user)
// userString = '{"id":1,"name":"John"}'

// String to object:
const userObject = JSON.parse(userString)
// userObject = { id: 1, name: 'John' }
```

**Why JSON.parse is needed:**

```javascript
// localStorage only stores strings
localStorage.setItem('user', { id: 1 })  // ❌ Stores "[object Object]"

// Correct way:
localStorage.setItem('user', JSON.stringify({ id: 1 }))  // ✓ Stores '{"id":1}'
const user = JSON.parse(localStorage.getItem('user'))    // ✓ Gets {id:1}
```

**Empty dependency array:**

```javascript
useEffect(() => {
  // This code runs once after mount
}, [])  // Empty array = no dependencies

// Runs when:
// ✓ Component mounts (first render)
// ✗ Component re-renders (skipped)
// ✗ State changes (skipped)
```


#### **login Function:**

```javascript
const login = useCallback(async (email, password) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData = {
      id: '1',
      email,
      name: email.split('@')[0],
    }
    
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}, [])
```

**useCallback explained:**

```javascript
// Without useCallback:
const login = async (email, password) => { /* ... */ }
// New function created every render

// With useCallback:
const login = useCallback(async (email, password) => { /* ... */ }, [])
// Same function reference across renders
```

**Why useCallback:**

```javascript
// Component re-renders often
// Without useCallback:
function AuthProvider() {
  const login = async () => { /* ... */ }  // New function each render
  return <AuthContext.Provider value={{ login }} />
  // value changes → all consumers re-render
}

// With useCallback:
function AuthProvider() {
  const login = useCallback(async () => { /* ... */ }, [])  // Same function
  return <AuthContext.Provider value={{ login }} />
  // value stable → consumers don't re-render unnecessarily
}
```

**Async/await flow:**

```javascript
const login = useCallback(async (email, password) => {
  // Step 1: Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Execution pauses here for 1 second
  
  // Step 2: After 1 second, continues
  const userData = { /* ... */ }
  
  // Step 3: Update state
  setUser(userData)
  
  // Step 4: Persist to localStorage
  localStorage.setItem('user', JSON.stringify(userData))
}, [])
```

**Promise simulation:**

```javascript
await new Promise(resolve => setTimeout(resolve, 1000))

// Breakdown:
new Promise((resolve) => {
  setTimeout(() => {
    resolve()  // Resolves after 1000ms
  }, 1000)
})

// Timeline:
0ms:   Promise created
       ↓
1000ms: setTimeout fires
       ↓
       resolve() called
       ↓
       await completes
       ↓
       Continues execution
```

**String manipulation:**

```javascript
email.split('@')[0]

// Example:
email = 'john.doe@example.com'
       ↓
split('@') → ['john.doe', 'example.com']
       ↓
[0] → 'john.doe'

// Another example:
'admin@company.com'.split('@')[0]  → 'admin'
'test@gmail.com'.split('@')[0]     → 'test'
```

**Try-catch error handling:**

```javascript
try {
  // Attempt code that might fail
  await apiCall()
  
} catch (error) {
  // If error occurs, this block runs
  console.error('Login failed:', error)
  throw error  // Re-throw to caller
}

// Usage:
try {
  await login(email, password)
  // Success - navigate to dashboard
} catch (error) {
  // Failure - show error message
}
```


#### **logout Function:**

```javascript
const logout = useCallback(() => {
  setUser(null)
  localStorage.removeItem('user')
}, [])
```

**Logout flow:**

```
User clicks logout button
    ↓
logout() function called
    ↓
setUser(null)
    ├─ user state = null
    └─ Component re-renders
    ↓
localStorage.removeItem('user')
    └─ Persisted data removed
    ↓
isAuthenticated = !!null = false
    ↓
ProtectedRoute sees false
    ↓
<Navigate to="/login" />
    ↓
User sees login page
```

**State cleanup:**

```javascript
// Before logout:
user = { id: '1', email: 'user@example.com', name: 'user' }
localStorage: { user: '{"id":"1",...}' }
isAuthenticated = true

// After logout:
user = null
localStorage: { }  // user key removed
isAuthenticated = false
```


#### **Context Value Object:**

```javascript
const value = {
  user,
  isAuthenticated: !!user,
  isLoading,
  login,
  logout,
}
```

**Double negation (!!user):**

```javascript
!!user

// Step 1: !user (single negation)
user = { id: 1 }  →  !user = false
user = null       →  !user = true

// Step 2: !!user (double negation = boolean conversion)
user = { id: 1 }  →  !!user = true
user = null       →  !!user = false
user = undefined  →  !!user = false
user = 0          →  !!user = false
user = ''         →  !!user = false
```

**Why convert to boolean:**

```javascript
// Without !!:
isAuthenticated: user
// value could be: null, {object}, undefined

// With !!:
isAuthenticated: !!user
// value is always: true or false

// Clearer in conditionals:
if (isAuthenticated) { /* ... */ }  // More readable
```

**Value object structure:**

```javascript
value = {
  user: null | { id, email, name },  // Current user or null
  isAuthenticated: boolean,           // Derived from user
  isLoading: boolean,                 // Loading state
  login: Function,                    // Login handler
  logout: Function,                   // Logout handler
}
```


#### **Provider Component:**

```javascript
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
```

**Component tree:**

```javascript
<AuthProvider>
  {children}
</AuthProvider>

// children = everything wrapped by AuthProvider
// Example:
<AuthProvider>
  <App>
    <Header />
    <Dashboard />
  </App>
</AuthProvider>

// children = <App><Header /><Dashboard /></App>
```

**Context.Provider:**

```javascript
<AuthContext.Provider value={value}>
  {children}
</AuthContext.Provider>

// Provides 'value' to all descendants
// Any component inside can useContext(AuthContext)
```

**Value propagation:**

```
AuthContext.Provider (value = {...})
    ↓
App (has access to value)
    ↓
Header (has access to value)
    ↓
Dashboard (has access to value)
    ↓
Any nested component (has access to value)
```


#### **useAuth Hook:**

```javascript
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

**useContext explained:**

```javascript
const context = useContext(AuthContext)

// Searches up component tree for nearest Provider
// Returns the 'value' prop from Provider
// If no Provider found, returns createContext default (null)
```

**Error checking:**

```javascript
if (!context) {
  throw new Error('useAuth must be used within AuthProvider')
}

// Why this check:
// Without AuthProvider:
function Component() {
  const { user } = useAuth()  // context = null
  // Trying to destructure null → Error!
}

// Provides better error message:
// "useAuth must be used within AuthProvider"
// Instead of:
// "Cannot destructure property 'user' of null"
```

**Usage in components:**

```javascript
// Inside any component:
function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth()
  
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

**Complete data flow:**

```
1. AuthProvider mounts
   ↓
2. useState initializes: user=null, isLoading=true
   ↓
3. useEffect runs: checks localStorage
   ↓
4. If user found: setUser(userData), setIsLoading(false)
   ↓
5. value object created with current state
   ↓
6. Context.Provider provides value
   ↓
7. Child components call useAuth()
   ↓
8. useAuth returns value object
   ↓
9. Components access: user, isAuthenticated, login, logout
   ↓
10. User interactions trigger login/logout
   ↓
11. State updates → re-render → new value provided
```


***

## 📄 FILE 8: `src/context/HealthContext.jsx` - Health Metrics State

### **Complete Code:**

```javascript
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const HealthContext = createContext(null)

const initialMetrics = {
  hydration: { current: 0, goal: 8, unit: 'glasses' },
  exercise: { current: 0, goal: 30, unit: 'minutes' },
  nutrition: { current: 0, goal: 3, unit: 'meals' },
  sleep: { current: 0, goal: 8, unit: 'hours' },
  mood: { current: 0, goal: 5, unit: 'score' },
}

export const HealthProvider = ({ children }) => {
  const [metrics, setMetrics] = useState(initialMetrics)

  useEffect(() => {
    const storedMetrics = localStorage.getItem('healthMetrics')
    if (storedMetrics) {
      setMetrics(JSON.parse(storedMetrics))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('healthMetrics', JSON.stringify(metrics))
  }, [metrics])

  const addActivity = useCallback((metricType, value) => {
    setMetrics(prev => ({
      ...prev,
      [metricType]: {
        ...prev[metricType],
        current: Math.min(
          prev[metricType].current + value,
          prev[metricType].goal
        ),
      },
    }))
  }, [])

  const resetMetrics = useCallback(() => {
    setMetrics(initialMetrics)
  }, [])

  const getMetricPercentage = useCallback((metricType) => {
    const metric = metrics[metricType]
    return Math.min((metric.current / metric.goal) * 100, 100)
  }, [metrics])

  const value = {
    metrics,
    addActivity,
    resetMetrics,
    getMetricPercentage,
  }

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>
}

export const useHealth = () => {
  const context = useContext(HealthContext)
  if (!context) {
    throw new Error('useHealth must be used within HealthProvider')
  }
  return context
}
```


### **Programming Breakdown:**

#### **Initial Metrics Structure:**

```javascript
const initialMetrics = {
  hydration: { current: 0, goal: 8, unit: 'glasses' },
  exercise: { current: 0, goal: 30, unit: 'minutes' },
  nutrition: { current: 0, goal: 3, unit: 'meals' },
  sleep: { current: 0, goal: 8, unit: 'hours' },
  mood: { current: 0, goal: 5, unit: 'score' },
}
```

**Data structure breakdown:**

```javascript
// Object of objects
{
  metricName: {
    current: number,  // Current value
    goal: number,     // Target value
    unit: string      // Unit of measurement
  }
}

// Example: hydration
{
  current: 3,      // Drank 3 glasses
  goal: 8,         // Target is 8 glasses
  unit: 'glasses'  // Unit for display
}
```

**Why this structure:**

```javascript
// Easy to access specific metrics:
metrics.hydration.current  // 3
metrics.exercise.goal      // 30

// Easy to calculate progress:
const progress = (current / goal) * 100

// Easy to display:
`${current} / ${goal} ${unit}`  // "3 / 8 glasses"
```


#### **State Initialization:**

```javascript
const [metrics, setMetrics] = useState(initialMetrics)
```

**State shape:**

```javascript
metrics = {
  hydration: { current: 0, goal: 8, unit: 'glasses' },
  exercise: { current: 0, goal: 30, unit: 'minutes' },
  // ... more metrics
}
```

**Why constant initial value:**

```javascript
// Define outside component
const initialMetrics = { /* ... */ }

export const HealthProvider = ({ children }) => {
  const [metrics, setMetrics] = useState(initialMetrics)
  // ✓ Same reference across re-renders
  // ✓ Easy to reset: setMetrics(initialMetrics)
}

// Alternative (not recommended):
export const HealthProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    hydration: { /* ... */ }  // New object every render
  })
}
```


#### **Load from localStorage:**

```javascript
useEffect(() => {
  const storedMetrics = localStorage.getItem('healthMetrics')
  if (storedMetrics) {
    setMetrics(JSON.parse(storedMetrics))
  }
}, [])
```

**Execution flow:**

```
1. Component mounts
   ↓
2. metrics = initialMetrics (all zeros)
   ↓
3. First render (shows zeros)
   ↓
4. useEffect runs
   ↓
5. Read from localStorage: '{"hydration":{"current":3,...}}'
   ↓
6. JSON.parse converts to object
   ↓
7. setMetrics triggers re-render
   ↓
8. Second render (shows stored data)
```

**Conditional loading:**

```javascript
if (storedMetrics) {
  setMetrics(JSON.parse(storedMetrics))
}

// If localStorage empty (first visit):
storedMetrics = null
// Skip JSON.parse (would throw error)
// Keep initialMetrics

// If localStorage has data:
storedMetrics = '{"hydration":...}'
// Parse and load
```


#### **Save to localStorage:**

```javascript
useEffect(() => {
  localStorage.setItem('healthMetrics', JSON.stringify(metrics))
}, [metrics])
```

**Dependency array [metrics]:**

```javascript
// Runs when 'metrics' changes

// Scenario 1: User adds activity
addActivity('hydration', 1)
    ↓
metrics changes (current: 3 → 4)
    ↓
useEffect runs
    ↓
localStorage updated

// Scenario 2: User resets
resetMetrics()
    ↓
metrics = initialMetrics
    ↓
useEffect runs
    ↓
localStorage updated
```

**Automatic persistence:**

```javascript
// Any change to metrics automatically saves
setMetrics(newValue)
    ↓
Re-render
    ↓
useEffect sees metrics changed
    ↓
localStorage.setItem(...)
    ↓
Data persisted
```

**Why separate useEffects:**

```javascript
// Load effect (runs once on mount):
useEffect(() => {
  // Load from localStorage
}, [])  // Empty array

// Save effect (runs on every metrics change):
useEffect(() => {
  // Save to localStorage
}, [metrics])  // Depends on metrics

// Why not combine?
// - Load should run once
// - Save should run on every change
// - Separate concerns = clearer code
```


#### **addActivity Function:**

```javascript
const addActivity = useCallback((metricType, value) => {
  setMetrics(prev => ({
    ...prev,
    [metricType]: {
      ...prev[metricType],
      current: Math.min(
        prev[metricType].current + value,
        prev[metricType].goal
      ),
    },
  }))
}, [])
```

**Step-by-step execution:**

```javascript
// Call: addActivity('hydration', 2)

// Step 1: setMetrics with updater function
setMetrics(prev => { /* ... */ })
// prev = current metrics state

// Step 2: Spread prev
{ ...prev }
// Copies all metrics: hydration, exercise, nutrition, etc.

// Step 3: Compute property name
[metricType]
// metricType = 'hydration'
// [metricType] = ['hydration'] = hydration:

// Step 4: Spread previous metric
{ ...prev[metricType] }
// prev['hydration'] = { current: 3, goal: 8, unit: 'glasses' }
// Copies: current, goal, unit

// Step 5: Calculate new current
Math.min(
  prev[metricType].current + value,
  prev[metricType].goal
)
// prev['hydration'].current + 2 = 3 + 2 = 5
// Math.min(5, 8) = 5
// Ensures: never exceed goal
```

**Immutable state update:**

```javascript
// ❌ Mutating (wrong):
setMetrics(prev => {
  prev.hydration.current += 2  // Mutates prev
  return prev
})

// ✓ Immutable (correct):
setMetrics(prev => ({
  ...prev,  // New object
  hydration: {
    ...prev.hydration,  // New nested object
    current: prev.hydration.current + 2  // New value
  }
}))
```

**Spread operator mechanics:**

```javascript
const original = { a: 1, b: 2, c: 3 }
const copy = { ...original, b: 20 }

// Step by step:
{ ...original }
// Expands to: { a: 1, b: 2, c: 3 }

{ ...original, b: 20 }
// Expands to: { a: 1, b: 2, c: 3, b: 20 }
// Last value wins: b = 20

// Result:
copy = { a: 1, b: 20, c: 3 }
// original unchanged: { a: 1, b: 2, c: 3 }
```

**Computed property names:**

```javascript
const key = 'hydration'
const obj = {
  [key]: 'value'
}
// obj = { hydration: 'value' }

// Dynamic keys:
const metricType = 'exercise'
{
  [metricType]: { current: 10 }
}
// Result: { exercise: { current: 10 } }
```

**Math.min capping:**

```javascript
Math.min(current + value, goal)

// Examples:
current = 5, value = 2, goal = 8
Math.min(5 + 2, 8) = Math.min(7, 8) = 7 ✓

current = 7, value = 3, goal = 8
Math.min(7 + 3, 8) = Math.min(10, 8) = 8 ✓ (capped at goal)

// Prevents exceeding goal:
current: 8 / 8 ✓ (not 10 / 8)
```

**Complete update visualization:**

```javascript
// Before:
metrics = {
  hydration: { current: 3, goal: 8, unit: 'glasses' },
  exercise: { current: 0, goal: 30, unit: 'minutes' }
}

// Call: addActivity('hydration', 2)

// After:
metrics = {
  hydration: { current: 5, goal: 8, unit: 'glasses' },  // Updated
  exercise: { current: 0, goal: 30, unit: 'minutes' }   // Unchanged
}
```


#### **resetMetrics Function:**

```javascript
const resetMetrics = useCallback(() => {
  setMetrics(initialMetrics)
}, [])
```

**Reset flow:**

```
User clicks reset button
    ↓
resetMetrics() called
    ↓
setMetrics(initialMetrics)
    ↓
All metrics → current: 0
    ↓
Component re-renders
    ↓
useEffect (save) runs
    ↓
localStorage updated with zeros
    ↓
UI shows fresh start
```

**Before and after:**

```javascript
// Before reset:
{
  hydration: { current: 5, goal: 8, unit: 'glasses' },
  exercise: { current: 20, goal: 30, unit: 'minutes' },
  // ...
}

// After reset:
{
  hydration: { current: 0, goal: 8, unit: 'glasses' },
  exercise: { current: 0, goal: 30, unit: 'minutes' },
  // ...
}
```


#### **getMetricPercentage Function:**

```javascript
const getMetricPercentage = useCallback((metricType) => {
  const metric = metrics[metricType]
  return Math.min((metric.current / metric.goal) * 100, 100)
}, [metrics])
```

**Percentage calculation:**

```javascript
(current / goal) * 100

// Examples:
current = 4, goal = 8
(4 / 8) * 100 = 0.5 * 100 = 50%

current = 8, goal = 8
(8 / 8) * 100 = 1 * 100 = 100%

current = 10, goal = 8  // Exceeded
(10 / 8) * 100 = 1.25 * 100 = 125%
Math.min(125, 100) = 100%  // Capped at 100%
```

**Why cap at 100%:**

```javascript
// Progress bar visualization:
0%:   [          ]
50%:  [█████     ]
100%: [██████████]
125%: [██████████] (still shows 100%, not overflow)
```

**Dependency [metrics]:**

```javascript
const getMetricPercentage = useCallback((metricType) => {
  const metric = metrics[metricType]  // Uses 'metrics'
  // ...
}, [metrics])  // Must list 'metrics' as dependency

// Why?
// If metrics changes, function needs new closure
// To access updated metrics values
```

**Usage example:**

```javascript
function MetricCard({ type }) {
  const { getMetricPercentage } = useHealth()
  
  const percentage = getMetricPercentage(type)  // Calculate
  
  return (
    <div>
      <ProgressBar percentage={percentage} />
      <span>{percentage}%</span>
    </div>
  )
}
```


#### **Context Value:**

```javascript
const value = {
  metrics,
  addActivity,
  resetMetrics,
  getMetricPercentage,
}
```

**Value object contents:**

```javascript
{
  metrics: {
    hydration: { current, goal, unit },
    exercise: { current, goal, unit },
    // ...
  },
  addActivity: Function,        // Add to specific metric
  resetMetrics: Function,        // Reset all to zero
  getMetricPercentage: Function, // Calculate progress
}
```

**Consumer usage:**

```javascript
function Dashboard() {
  const { metrics, addActivity, getMetricPercentage } = useHealth()
  
  return (
    <div>
      <MetricCard
        title="Hydration"
        current={metrics.hydration.current}
        goal={metrics.hydration.goal}
        percentage={getMetricPercentage('hydration')}
        onAdd={() => addActivity('hydration', 1)}
      />
    </div>
  )
}
```


***

## 📄 FILE 9: `src/hooks/useForm.js` - Custom Form Hook

### **Complete Code:**

```javascript
import { useState, useCallback } from 'react'

export const useForm = (initialValues, onSubmit, validate) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setSubmitError(null)

    if (validate) {
      const validationErrors = validate(values)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
    }

    setIsSubmitting(true)
    try {
      await onSubmit(values)
      setValues(initialValues)
      setErrors({})
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validate, onSubmit, initialValues])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setSubmitError(null)
  }, [initialValues])

  return {
    values,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    reset,
  }
}
```


### **Programming Breakdown:**

#### **Hook Parameters:**

```javascript
export const useForm = (initialValues, onSubmit, validate) => {
```

**Parameter breakdown:**

```javascript
initialValues: {
  email: '',
  password: ''
}
// Default form field values

onSubmit: async (values) => {
  await apiCall(values)
}
// Function called when form submits

validate: (values) => {
  const errors = {}
  if (!values.email) errors.email = 'Required'
  return errors
}
// Optional validation function
```

**Usage example:**

```javascript
const form = useForm(
  { email: '', password: '' },           // initialValues
  async (values) => {                    // onSubmit
    await login(values.email, values.password)
  },
  (values) => {                          // validate
    const errors = {}
    if (!values.email) errors.email = 'Email required'
    return errors
  }
)
```


#### **State Management:**

```javascript
const [values, setValues] = useState(initialValues)
const [errors, setErrors] = useState({})
const [isSubmitting, setIsSubmitting] = useState(false)
const [submitError, setSubmitError] = useState(null)
```

**State structure:**

```javascript
// values - form field data
{
  email: 'user@example.com',
  password: 'secret123'
}

// errors - validation errors per field
{
  email: 'Email is required',
  password: 'Password too short'
}

// isSubmitting - async operation status
true   // Form is submitting
false  // Form is idle

// submitError - global submit error
null  // No error
'Network error'  // Error message string
```

**State timeline:**

```
Initial:
values = { email: '', password: '' }
errors = {}
isSubmitting = false
submitError = null

User types:
values = { email: 'u', password: '' }

User submits (invalid):
errors = { password: 'Required' }

User fixes and submits:
isSubmitting = true
(API call in progress)

Success:
values = { email: '', password: '' }  // Reset
errors = {}
isSubmitting = false

Failure:
submitError = 'Login failed'
isSubmitting = false
```


#### **handleChange Function:**

```javascript
const handleChange = useCallback((e) => {
  const { name, value } = e.target
  setValues(prev => ({ ...prev, [name]: value }))
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }))
  }
}, [errors])
```

**Event object breakdown:**

```javascript
// When user types in input:
<input name="email" value="user@example.com" onChange={handleChange} />

// Event fired:
e = {
  target: {
    name: 'email',
    value: 'user@example.com',
    // ... other properties
  },
  // ... other event properties
}

// Destructuring:
const { name, value } = e.target
// name = 'email'
// value = 'user@example.com'
```

**Value update:**

```javascript
setValues(prev => ({ ...prev, [name]: value }))

// Step-by-step:
// Before:
prev = { email: 'old@example.com', password: 'pass123' }

// User types in email field:
name = 'email'
value = 'new@example.com'

// Update:
{ ...prev, [name]: value }
= { ...prev, email: 'new@example.com' }
= { email: 'new@example.com', password: 'pass123' }

// After:
values = { email: 'new@example.com', password: 'pass123' }
```

**Error clearing:**

```javascript
if (errors[name]) {
  setErrors(prev => ({ ...prev, [name]: '' }))
}

// Scenario:
// Field has error: errors.email = 'Email required'
// User starts typing in email
// Clear error: errors.email = ''
// User sees error disappear as they type
```

**Why clear errors on change:**

```javascript
// Without clearing:
User sees: "Email required" (red text)
User types: u
Error still shows: "Email required" (confusing!)

// With clearing:
User sees: "Email required" (red text)
User types: u
Error clears: "" (immediate feedback)
```

**Dependency [errors]:**

```javascript
}, [errors])

// Why depend on errors?
if (errors[name]) {  // Accesses 'errors'
  // ...
}

// Function uses errors, so must list as dependency
// Ensures handleChange sees current errors
```


#### **handleSubmit Function:**

```javascript
const handleSubmit = useCallback(async (e) => {
  e.preventDefault()
  setSubmitError(null)

  if (validate) {
    const validationErrors = validate(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
  }

  setIsSubmitting(true)
  try {
    await onSubmit(values)
    setValues(initialValues)
    setErrors({})
  } catch (error) {
    setSubmitError(error.message || 'Something went wrong')
  } finally {
    setIsSubmitting(false)
  }
}, [values, validate, onSubmit, initialValues])
```

**e.preventDefault():**

```javascript
e.preventDefault()

// Without preventDefault:
<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
// Clicking submit → browser navigates (page reload)

// With preventDefault:
e.preventDefault()  // Stops browser default behavior
// Clicking submit → no page reload, runs JavaScript
```

**Clear previous submit error:**

```javascript
setSubmitError(null)

// Why?
// Previous submission might have failed
// Don't show old error on new submission attempt
```

**Validation check:**

```javascript
if (validate) {
  const validationErrors = validate(values)
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return
  }
}
```

**Validation flow:**

```javascript
// Step 1: Check if validate function provided
if (validate) {  // Optional parameter
  
  // Step 2: Run validation
  const validationErrors = validate(values)
  // Returns: {} or { email: 'Required', password: 'Too short' }
  
  // Step 3: Check if any errors
  Object.keys(validationErrors)
  // {} → [] → length = 0 (valid)
  // { email: 'Required' } → ['email'] → length = 1 (invalid)
  
  // Step 4: If invalid, set errors and stop
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)  // Show errors to user
    return  // Exit function (don't submit)
  }
}
// If no validation or validation passed, continue to submission
```

**Object.keys() method:**

```javascript
const obj = { a: 1, b: 2, c: 3 }
Object.keys(obj)  // ['a', 'b', 'c']

// Empty object:
Object.keys({})  // []

// Validation usage:
validationErrors = { email: 'Required' }
Object.keys(validationErrors)  // ['email']
.length  // 1 (has errors)

validationErrors = {}
Object.keys(validationErrors)  // []
.length  // 0 (no errors)
```

**Try-catch-finally:**

```javascript
setIsSubmitting(true)

try {
  // Attempt submission
  await onSubmit(values)
  // If successful:
  setValues(initialValues)  // Reset form
  setErrors({})             // Clear errors
  
} catch (error) {
  // If error occurs:
  setSubmitError(error.message || 'Something went wrong')
  
} finally {
  // Always runs (success or failure):
  setIsSubmitting(false)  // Stop loading state
}
```

**Async/await in try-catch:**

```javascript
try {
  await onSubmit(values)
  // Pauses here until onSubmit completes
  // If onSubmit throws error, catch block runs
  // If onSubmit succeeds, continues here
  setValues(initialValues)  // Success cleanup
  
} catch (error) {
  // If onSubmit threw error, execution jumps here
  setSubmitError(error.message)
}
```

**Finally block guarantees:**

```javascript
finally {
  setIsSubmitting(false)
}

// Runs in ALL cases:
// ✓ Success (after try block)
// ✓ Error (after catch block)
// ✓ Even if return in try/catch
// ✓ Ensures loading state always stops
```

**Complete submit flow:**

```
1. User clicks submit button
   ↓
2. Form fires onSubmit event
   ↓
3. handleSubmit receives event
   ↓
4. e.preventDefault() stops page reload
   ↓
5. setSubmitError(null) clears old errors
   ↓
6. validate(values) checks fields
   ↓
7a. If invalid: setErrors(), return (stop)
7b. If valid: continue
   ↓
8. setIsSubmitting(true) shows loading
   ↓
9. await onSubmit(values) calls async function
   ↓
10a. Success:
     - setValues(initialValues) resets form
     - setErrors({}) clears errors
10b. Failure:
     - catch block runs
     - setSubmitError() shows error message
   ↓
11. finally: setIsSubmitting(false) stops loading
```


#### **reset Function:**

```javascript
const reset = useCallback(() => {
  setValues(initialValues)
  setErrors({})
  setSubmitError(null)
}, [initialValues])
```

**Reset purpose:**

```javascript
// Manual reset (not automatic after submit)
// Use cases:
// - Cancel button clicked
// - Clear form button
// - Switch between login/signup modes
```

**Reset flow:**

```javascript
// Before reset:
values = { email: 'user@example.com', password: '123' }
errors = { password: 'Too short' }
submitError = 'Login failed'

// After reset:
values = { email: '', password: '' }  // Back to initialValues
errors = {}                           // Cleared
submitError = null                    // Cleared
```


#### **Return Object:**

```javascript
return {
  values,
  errors,
  isSubmitting,
  submitError,
  handleChange,
  handleSubmit,
  reset,
}
```

**Hook interface:**

```javascript
const form = useForm(...)

// Available properties:
form.values        // Current form data
form.errors        // Validation errors
form.isSubmitting  // Async operation status
form.submitError   // Submit failure message
form.handleChange  // Input onChange handler
form.handleSubmit  // Form onSubmit handler
form.reset         // Manual reset function
```

**Usage in component:**

```javascript
function LoginForm() {
  const form = useForm(
    { email: '', password: '' },
    async (values) => {
      await login(values.email, values.password)
    },
    (values) => {
      const errors = {}
      if (!values.email) errors.email = 'Email required'
      if (!values.password) errors.password = 'Password required'
      return errors
    }
  )

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        name="email"
        value={form.values.email}
        onChange={form.handleChange}
      />
      {form.errors.email && <span>{form.errors.email}</span>}
      
      <input
        name="password"
        type="password"
        value={form.values.password}
        onChange={form.handleChange}
      />
      {form.errors.password && <span>{form.errors.password}</span>}
      
      {form.submitError && <div>{form.submitError}</div>}
      
      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Logging in...' : 'Login'}
      </button>
      
      <button type="button" onClick={form.reset}>
        Clear
      </button>
    </form>
  )
}
```


***

## 📄 FILE 10: `src/components/ProtectedRoute.jsx` - Route Guard

### **Complete Code:**

```javascript
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
```


### **Programming Breakdown:**

#### **Component Purpose:**

```javascript
export const ProtectedRoute = ({ children }) => {
  /* Higher-Order Component Pattern */
  /* Wraps another component */
  /* Adds authentication check before rendering */
  
  /* Usage: */
  // <ProtectedRoute>
  //   <Dashboard />  ← children
  // </ProtectedRoute>
  
  /* If authenticated: renders Dashboard */
  /* If not authenticated: redirects to login */
  /* While checking: shows loading */
}
```


#### **Authentication Check Flow:**

```javascript
const { isAuthenticated, isLoading } = useAuth()

/* Get auth state from context */

/* Step 1: Check if still loading */
if (isLoading) {
  return <LoadingComponent />
}

/* Why? */
// AuthProvider loads user from localStorage
// Takes time: JSON.parse, verification, etc.
// Show loading spinner while checking
// Prevent premature redirect

/* Step 2: Check if authenticated */
if (!isAuthenticated) {
  return <Navigate to="/login" replace />
}

/* If false: not logged in */
/* Redirect to login page */
/* replace=true: don't add to browser history */

/* Step 3: If authenticated */
return children
/* Render the protected component */
```


#### **Conditional Rendering Logic:**

```javascript
/* Three possible outputs: */

/* Option 1: Still checking auth */
if (isLoading) {
  return <LoadingSpinner />
}

/* Option 2: Not authenticated */
if (!isAuthenticated) {
  return <Navigate to="/login" />
}

/* Option 3: Authenticated */
return children  /* Render the component */

/* Visualized: */
//                ┌─ isLoading = true → Show loading
//                │
// User visits /dashboard ─┼─ isAuthenticated = false → Redirect /login
//                │
//                └─ isAuthenticated = true → Render Dashboard
```


#### **Loading State HTML:**

```javascript
<div style={{ 
  display: 'flex',           /* Flexbox layout */
  justifyContent: 'center',  /* Center horizontally */
  alignItems: 'center',      /* Center vertically */
  height: '100vh'            /* Full viewport height */
}}>
  Loading...
</div>

/* Inline styles breakdown: */
// display: 'flex'
// Container becomes flexbox for centering content

// justifyContent: 'center'
// Center items horizontally (main axis)
// Requires parent to be flex

// alignItems: 'center'
// Center items vertically (cross axis)

// height: '100vh'
// 100% of viewport height
// vh = viewport height unit (1vh = 1% of window height)
```

**Flexbox centering visualization:**

```
┌─────────────────────────────┐  ← height: 100vh
│                             │
│                             │
│         Loading...          │  ← Centered both ways
│                             │
│                             │
└─────────────────────────────┘
```


#### **Navigate Component:**

```javascript
return <Navigate to="/login" replace />

/* Navigate from react-router-dom */
/* Replaces current history entry */

/* With replace=true: */
// History: [root] → [login]
// Can't go back to /dashboard

/* Without replace: */
// History: [root] → [dashboard] → [login]
// Can go back to /dashboard (wrong!)
```

**History stack comparison:**

```javascript
// Scenario: User visits /dashboard (not logged in)

// WITHOUT replace:
History stack: ['/', '/dashboard', '/login']
User clicks back button → Goes to /dashboard
ProtectedRoute checks → Not authenticated
Redirects to /login again
Infinite loop potential!

// WITH replace:
History stack: ['/', '/login']  // /dashboard replaced
User clicks back button → Goes to /
No loop!
```


#### **Complete Execution Flow:**

```
1. User navigates to /dashboard
   ↓
2. App.jsx matches route: /dashboard
   ↓
3. Route renders: <ProtectedRoute><Dashboard /></ProtectedRoute>
   ↓
4. ProtectedRoute mounts
   ↓
5. Calls useAuth() → gets isAuthenticated, isLoading
   ↓
6a. If isLoading = true:
    └─ Render "Loading..."
    └─ Wait for AuthContext to finish checking
    └─ Re-render when isLoading becomes false
   ↓
6b. If isAuthenticated = false:
    └─ Render <Navigate to="/login" replace />
    └─ React Router navigates to /login
    └─ Login page renders
   ↓
6c. If isAuthenticated = true:
    └─ return children
    └─ <Dashboard /> renders
    └─ User sees dashboard
```


#### **children Prop Pattern:**

```javascript
export const ProtectedRoute = ({ children }) => {
  // children = whatever is wrapped
  return children  // Render it
}

/* Usage: */
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

/* children = <Dashboard /> */

/* Multiple children: */
<ProtectedRoute>
  <Header />
  <Dashboard />
  <Footer />
</ProtectedRoute>

/* children = [<Header />, <Dashboard />, <Footer />] */
```


#### **Security Check:**

```javascript
// This component prevents:
// 1. Unauthorized access to protected pages
// 2. Direct URL navigation when not logged in
// 3. Bookmark access without authentication

// Example scenarios:

// Scenario 1: Logged out user types /dashboard
User types: localhost:5173/dashboard
    ↓
ProtectedRoute: isAuthenticated = false
    ↓
<Navigate to="/login" />
    ↓
User sees login page ✓

// Scenario 2: Logged in user navigates to /dashboard
User clicks link to /dashboard
    ↓
ProtectedRoute: isAuthenticated = true
    ↓
return children
    ↓
Dashboard renders ✓

// Scenario 3: User logs out while on /dashboard
User clicks logout
    ↓
AuthContext: setUser(null)
    ↓
isAuthenticated becomes false
    ↓
ProtectedRoute re-renders
    ↓
<Navigate to="/login" />
    ↓
Redirected to login ✓
```


***

## 📄 FILE 11: `src/components/buttons/Button.jsx` - Button Component

### **Complete Code:**

```javascript
import styles from './Button.module.css'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClass = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    loading && styles['button--loading'],
    disabled && styles['button--disabled'],
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
```


### **Programming Breakdown:**

#### **Props with Defaults:**

```javascript
const Button = ({
  children,                    /* Button text */
  variant = 'primary',         /* Style variant */
  size = 'md',                 /* Size variant */
  disabled = false,            /* Disabled state */
  loading = false,             /* Loading state */
  onClick,                     /* Click handler */
  type = 'button',             /* Button type */
  className = '',              /* Extra CSS class */
  ...props                     /* Other HTML attributes */
}) => {

  /* Props destructuring with defaults */
  
  /* Example usage: */
  <Button variant="primary" size="lg" loading={true}>
    Click me
  </Button>
  
  /* Component receives: */
  {
    variant: 'primary',  /* Override default */
    size: 'lg',          /* Override default */
    loading: true,       /* Override default */
    children: 'Click me',
    disabled: false,     /* Uses default */
    type: 'button',      /* Uses default */
    className: '',       /* Uses default */
    ...other props
  }
}
```

**Default parameter mechanics:**

```javascript
// If prop not provided:
variant = 'primary'  // Uses default

// If prop provided:
variant = 'secondary'  // Uses provided value

// Examples:
<Button>Click</Button>
// variant = 'primary' (default)

<Button variant="danger">Delete</Button>
// variant = 'danger' (provided)
```


#### **Dynamic Class Building:**

```javascript
const buttonClass = [
  styles.button,                           /* Base class */
  styles[`button--${variant}`],           /* Variant class */
  styles[`button--${size}`],              /* Size class */
  loading && styles['button--loading'],   /* Conditional */
  disabled && styles['button--disabled'], /* Conditional */
  className                               /* Custom class */
]
  .filter(Boolean)
  .join(' ')
```

**Step-by-step execution:**

```javascript
/* Step 1: Create array */
[
  'Button_button__a1b2c',              /* Base from CSS Module */
  'Button_button--primary__d3e4f',     /* Variant */
  'Button_button--md__g5h6i',          /* Size */
  true && 'Button_button--loading__j7k8l',  /* If loading true */
  false && 'Button_button--disabled__m9n0o', /* If disabled false */
  ''                                   /* Custom class */
]

/* Step 2: If loading=true, disabled=false */
[
  'Button_button__a1b2c',
  'Button_button--primary__d3e4f',
  'Button_button--md__g5h6i',
  'Button_button--loading__j7k8l',    /* Truthy - included */
  false,                               /* Falsy - will be filtered */
  ''                                   /* Empty string - falsy */
]

/* Step 3: Filter out falsy values */
.filter(Boolean)
[
  'Button_button__a1b2c',
  'Button_button--primary__d3e4f',
  'Button_button--md__g5h6i',
  'Button_button--loading__j7k8l'
]
// false and '' removed

/* Step 4: Join with spaces */
.join(' ')
'Button_button__a1b2c Button_button--primary__d3e4f Button_button--md__g5h6i Button_button--loading__j7k8l'

/* Result: Applied to className */
```

**Logical AND short-circuit:**

```javascript
loading && styles['button--loading']

// If loading = true:
true && 'Button_button--loading__abc'
// Returns: 'Button_button--loading__abc'

// If loading = false:
false && 'Button_button--loading__abc'
// Returns: false (short-circuits, doesn't evaluate right side)

// Array contains false, which is filtered out later
```

**Boolean filter:**

```javascript
.filter(Boolean)

// Boolean is a function that converts to boolean
Boolean('string')  // true
Boolean(false)     // false
Boolean(null)      // false
Boolean('')        // false
Boolean(0)         // false

// Filter keeps only truthy values
['a', false, 'b', null, 'c'].filter(Boolean)
// Result: ['a', 'b', 'c']
```


#### **CSS Module Syntax:**

```javascript
/* CSS Module import: */
import styles from './Button.module.css'

/* Converts CSS classes to JavaScript object: */
// Button.module.css:
.button { /* ... */ }
.button--primary { /* ... */ }
.button--md { /* ... */ }
.button--loading { /* ... */ }

// JavaScript object:
styles = {
  button: 'Button_button__a1b2c',
  'button--primary': 'Button_button--primary__d3e4f',
  'button--md': 'Button_button--md__g5h6i',
  'button--loading': 'Button_button--loading__j7k8l',
  'button--disabled': 'Button_button--disabled__m9n0o'
}

/* Usage: */
styles.button                  /* Gets: 'Button_button__a1b2c' */
styles[`button--${variant}`]  /* Computed key: 'button--primary' */
                              /* Gets: styles['button--primary'] */
                              /* Returns: 'Button_button--primary__d3e4f' */
```

**Template literal in bracket notation:**

```javascript
const variant = 'primary'

styles[`button--${variant}`]

// Step 1: Template literal evaluates
`button--${variant}`
= `button--${'primary'}`
= 'button--primary'

// Step 2: Bracket notation access
styles['button--primary']
= 'Button_button--primary__d3e4f'
```

**Why CSS Modules:**

```javascript
// Without CSS Modules (global CSS):
// Button.css
.button { color: blue; }

// Card.css
.button { color: red; }  // Conflict!

// With CSS Modules (scoped CSS):
// Button.module.css → .button becomes Button_button__a1b2c
// Card.module.css → .button becomes Card_button__x9y8z
// No conflict!
```


#### **Rest Parameters:**

```javascript
...props  /* Spread operator for remaining props */

/* Example: */
<Button type="submit" aria-label="Submit form" data-test="btn">
  Submit
</Button>

/* Props destructuring: */
{
  type: 'submit',           // Extracted
  'aria-label': 'Submit form',  // Captured in ...props
  'data-test': 'btn',       // Captured in ...props
  children: 'Submit'        // Extracted
}

/* ...props contains: */
{
  'aria-label': 'Submit form',
  'data-test': 'btn'
}

/* In component: */
<button
  {...props}  /* Spread remaining props onto button */
  className={buttonClass}
  onClick={onClick}
>
```

**Spread in JSX:**

```javascript
<button {...props}>

// Expands to:
<button
  aria-label={props['aria-label']}
  data-test={props['data-test']}
>

// Allows passing arbitrary HTML attributes
```


#### **Conditional Text Rendering:**

```javascript
{loading ? 'Loading...' : children}

/* Ternary operator: */
// condition ? valueIfTrue : valueIfFalse

/* Example: */
// loading = true
// Renders: 'Loading...'

// loading = false
// Renders: children (e.g., 'Click me')
```

**Button text states:**

```javascript
// Normal state:
<Button>Submit</Button>
// Shows: "Submit"

// Loading state:
<Button loading={true}>Submit</Button>
// Shows: "Loading..."
// children ignored while loading

// After loading:
<Button loading={false}>Submit</Button>
// Shows: "Submit" again
```


#### **Disabled State Logic:**

```javascript
disabled={disabled || loading}

/* Button is disabled if: */
// disabled prop is true  OR
// loading state is true

/* Truth table: */
// disabled=false, loading=false → false (enabled)
// disabled=true,  loading=false → true (disabled)
// disabled=false, loading=true  → true (disabled)
// disabled=true,  loading=true  → true (disabled)

/* Prevents: */
// - Multiple clicks while loading
// - Form submission while loading
// - User interaction during async operation
```

**Logical OR operator:**

```javascript
disabled || loading

// If disabled = true:
true || loading  // Returns true (short-circuits)

// If disabled = false:
false || loading  // Returns value of loading

// Examples:
false || false = false
false || true  = true
true  || false = true
true  || true  = true
```


#### **Complete Button Rendering:**

```javascript
return (
  <button
    className={buttonClass}
    disabled={disabled || loading}
    onClick={onClick}
    type={type}
    {...props}
  >
    {loading ? 'Loading...' : children}
  </button>
)

/* Example rendering: */
<Button
  variant="primary"
  size="lg"
  loading={true}
  onClick={handleSubmit}
  aria-label="Submit form"
>
  Submit
</Button>

/* Renders as: */
<button
  className="Button_button__a Button_button--primary__b Button_button--lg__c Button_button--loading__d"
  disabled={true}
  onClick={handleSubmit}
  type="button"
  aria-label="Submit form"
>
  Loading...
</button>
```


#### **Usage Examples:**

```javascript
/* Basic button */
<Button onClick={() => console.log('clicked')}>
  Click Me
</Button>

/* Primary button (default) */
<Button variant="primary">Save</Button>

/* Danger button */
<Button variant="danger">Delete</Button>

/* Large button */
<Button size="lg">Big Button</Button>

/* Loading state */
<Button loading={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>
// Note: Text changes to "Loading..." automatically

/* Disabled button */
<Button disabled={!formValid}>Submit</Button>

/* Submit button */
<Button type="submit">Submit Form</Button>

/* With custom className */
<Button className="my-custom-class">Custom</Button>
```


***

## 📄 FILE 12: `src/components/inputs/TextInput.jsx` - Form Input

### **Complete Code:**

```javascript
import styles from './Input.module.css'

export const TextInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  ...props
}) => {
  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.input} ${error ? styles['input--error'] : ''}`}
        required={required}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
```


### **Programming Breakdown:**

#### **Controlled Component Pattern:**

```javascript
<input
  value={value}        /* React state controls value */
  onChange={onChange}  /* Event updates state */
/>

/* Data flow: */
// 1. State: value = "user@example.com"
// 2. Input displays: "user@example.com"
// 3. User types: "user@example.co" (deletes 'm')
// 4. onChange fires with new value
// 5. Handler updates state: setValue("user@example.co")
// 6. Component re-renders
// 7. Input displays: "user@example.co"

/* Why controlled? */
// - Single source of truth in React state
// - Easier validation
// - Easier form handling
// - Can intercept/modify values
// - Can programmatically set values
```

**Uncontrolled vs Controlled:**

```javascript
/* Uncontrolled (DOM controls value): */
<input defaultValue="initial" />
// Can't read current value easily
// DOM is source of truth

/* Controlled (React controls value): */
const [value, setValue] = useState('initial')
<input value={value} onChange={e => setValue(e.target.value)} />
// React state is source of truth
// Always know current value
```


#### **Label and Accessibility:**

```javascript
{label && (
  <label htmlFor={name} className={styles.label}>
    {label}
    {required && <span className={styles.required}>*</span>}
  </label>
)}

/* htmlFor attribute: */
<label htmlFor="email">Email</label>
<input id="email" />

/* Links label to input */
/* Benefits: */
// 1. Screen readers announce relationship
// 2. Clicking label focuses input
// 3. Better UX (larger click target)
```

**htmlFor binding:**

```javascript
// Label:
<label htmlFor="email">

// Input:
<input id="email" />

// Both use same value ("email")
// Creates association

// User clicks "Email" text:
onClick event on <label>
    ↓
Browser finds input with id="email"
    ↓
Focuses that input
    ↓
Cursor appears in input field
```

**Conditional rendering:**

```javascript
{label && <label>...</label>}

// If label exists (truthy):
label = "Email"
→ Renders: <label>Email</label>

// If label doesn't exist (falsy):
label = undefined
→ Renders: nothing

// Same as:
{label ? <label>...</label> : null}
```

**Required asterisk:**

```javascript
{required && <span className={styles.required}>*</span>}

// If required = true:
<label>
  Email
  <span className="required">*</span>
</label>
// Shows: "Email *"

// If required = false:
<label>
  Email
</label>
// Shows: "Email"
```


#### **Input Element:**

```javascript
<input
  id={name}                      /* Links to label */
  name={name}                    /* Form field name */
  type={type}                    /* text, password, email, etc */
  placeholder={placeholder}      /* Gray hint text */
  value={value}                  /* Current value */
  onChange={onChange}            /* Update handler */
  disabled={disabled}            /* Disable input */
  required={required}            /* HTML5 validation */
  {...props}                     /* Other attributes */
/>
```

**Type attribute variants:**

```javascript
type="text"     // Regular text input
type="password" // Hide characters: ••••••
type="email"    // Email validation + keyboard
type="number"   // Number keyboard on mobile
type="tel"      // Phone keyboard
type="date"     // Date picker
type="search"   // Search styling
type="url"      // URL keyboard
```

**Placeholder vs Value:**

```javascript
// Placeholder (gray hint text):
<input placeholder="Enter email" value="" />
// Shows: "Enter email" in gray
// User types → placeholder disappears

// Value (actual content):
<input placeholder="Enter email" value="user@example.com" />
// Shows: "user@example.com" in black
// Placeholder hidden (value present)
```

**Name attribute importance:**

```javascript
<input name="email" />

// Used for:
// 1. Form submission data
const formData = new FormData(form)
formData.get('email')  // Gets input value

// 2. Label association (via id)
<label htmlFor="email">
<input id="email" name="email" />

// 3. Event identification
onChange={(e) => {
  const fieldName = e.target.name  // 'email'
  const fieldValue = e.target.value
}}
```


#### **Dynamic Error Styling:**

```javascript
className={`${styles.input} ${error ? styles['input--error'] : ''}`}

/* Template literal: */
`${styles.input} ${error ? styles['input--error'] : ''}`

/* If error exists: */
error = "Email is invalid"
className = "Input_input__a1b2c Input_input--error__d3e4f"

/* If no error: */
error = null
className = "Input_input__a1b2c "
// Extra space harmless
```

**Ternary in template literal:**

```javascript
`${baseClass} ${condition ? addClass : ''}`

// Step by step:
baseClass = 'input'
condition = true
addClass = 'error'

`${baseClass} ${condition ? addClass : ''}`
= `${'input'} ${true ? 'error' : ''}`
= `${'input'} ${'error'}`
= 'input error'
```

**CSS applies red border only when error class present:**

```css
/* Input.module.css */
.input {
  border: 1px solid gray;
}

.input--error {
  border: 1px solid red;
}

/* Both classes applied when error: */
/* .input and .input--error */
/* Red border overrides gray */
```


#### **Error Display:**

```javascript
{error && <span className={styles.error}>{error}</span>}

/* Conditional rendering: */
// error exists (truthy) → Show error message
// error is null/empty (falsy) → Show nothing

/* Example: */
error = "Email is invalid"
// Renders: <span className="Input_error__...">Email is invalid</span>

error = null
// Renders: nothing
```

**Error message positioning:**

```javascript
<div className={styles.formGroup}>
  <label>Email</label>
  <input />
  {error && <span>{error}</span>}  // Below input
</div>

/* Visual: */
// Email
// [____________]
// Email is invalid  ← Error appears here
```


#### **Complete Input Rendering:**

```javascript
/* Example usage: */
<TextInput
  label="Email Address"
  name="email"
  type="email"
  placeholder="user@example.com"
  value="test@"
  onChange={handleChange}
  error="Invalid email format"
  required={true}
/>

/* Renders as: */
<div className="Input_formGroup__a">
  <label htmlFor="email" className="Input_label__b">
    Email Address
    <span className="Input_required__c">*</span>
  </label>
  <input
    id="email"
    name="email"
    type="email"
    placeholder="user@example.com"
    value="test@"
    onChange={handleChange}
    disabled={false}
    className="Input_input__d Input_input--error__e"
    required={true}
  />
  <span className="Input_error__f">Invalid email format</span>
</div>
```


#### **Form Integration:**

```javascript
/* With useForm hook: */
function LoginForm() {
  const form = useForm(
    { email: '', password: '' },
    async (values) => { /* submit */ }
  )

  return (
    <form onSubmit={form.handleSubmit}>
      <TextInput
        label="Email"
        name="email"
        type="email"
        value={form.values.email}
        onChange={form.handleChange}
        error={form.errors.email}
        required
      />
      
      <TextInput
        label="Password"
        name="password"
        type="password"
        value={form.values.password}
        onChange={form.handleChange}
        error={form.errors.password}
        required
      />
      
      <Button type="submit">Login</Button>
    </form>
  )
}
```


***

## 📄 FILE 13: `src/components/cards/MetricCard.jsx` - Metric Card

### **Complete Code:**

```javascript
import { Button } from '../buttons/Button'
import { ProgressBar } from './ProgressBar'
import styles from './Card.module.css'

export const MetricCard = ({
  title,
  icon,
  current,
  goal,
  unit,
  percentage,
  onAdd,
  loading = false
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          {icon && <span>{icon}</span>}
          {title}
        </h3>
      </div>

      <div className={styles.cardBody}>
        <ProgressBar percentage={percentage} />

        <div className={styles.stats}>
          <span className={styles.current}>{current}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.goal}>{goal} {unit}</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onAdd}
          loading={loading}
          className={styles.cardButton}
        >
          Add
        </Button>
      </div>
    </div>
  )
}
```


### **Programming Breakdown:**

#### **Component Composition:**

```javascript
/* Uses three sub-components: */
// Button          /* From ../buttons/Button */
// ProgressBar     /* From ./ProgressBar */
// {children}      /* DOM elements */

/* Hierarchical structure: */
<div className="card">
  <header>
    <h3>💧 Hydration</h3>
  </header>
  <body>
    <ProgressBar />          /* Sub-component */
    <div className="stats">
      <span>5</span>
      <span>/</span>
      <span>8 glasses</span>
    </div>
    <Button />               /* Sub-component */
  </body>
</div>
```

**Component tree:**

```
MetricCard
├── div (card container)
│   ├── div (header)
│   │   └── h3 (title with icon)
│   └── div (body)
│       ├── ProgressBar (imported component)
│       ├── div (stats)
│       │   ├── span (current)
│       │   ├── span (separator)
│       │   └── span (goal + unit)
│       └── Button (imported component)
```


#### **Conditional Icon Rendering:**

```javascript
{icon && <span>{icon}</span>}

/* Icon rendering: */
icon = "💧"  // Water droplet emoji
// Renders: <span>💧</span> Hydration

icon = undefined
// Renders: Hydration (no icon)

/* Example usage: */
<MetricCard
  title="Hydration"
  icon="💧"
  // ...
/>
// Shows: "💧 Hydration"

<MetricCard
  title="Steps"
  // No icon prop
/>
// Shows: "Steps"
```

**Icon + Title layout:**

```javascript
<h3>
  {icon && <span>{icon}</span>}
  {title}
</h3>

/* Renders inline: */
<h3>
  <span>💧</span>  Hydration
</h3>

/* Visual: */
// 💧 Hydration
```


#### **Statistics Display:**

```javascript
<div className={styles.stats}>
  <span className={styles.current}>{current}</span>
  <span className={styles.separator}>/</span>
  <span className={styles.goal}>{goal} {unit}</span>
</div>

/* Example rendering: */
current = 5
goal = 8
unit = "glasses"

/* Displays: */
<div>
  <span>5</span>
  <span>/</span>
  <span>8 glasses</span>
</div>

/* Visual output: */
// 5 / 8 glasses
```

**Dynamic content:**

```javascript
/* Hydration metric: */
current = 5
goal = 8
unit = "glasses"
// Shows: "5 / 8 glasses"

/* Exercise metric: */
current = 15
goal = 30
unit = "minutes"
// Shows: "15 / 30 minutes"

/* Sleep metric: */
current = 6.5
goal = 8
unit = "hours"
// Shows: "6.5 / 8 hours"
```


#### **Button Props:**

```javascript
<Button
  variant="primary"              /* Green button */
  size="sm"                      /* Small size */
  onClick={onAdd}                /* Add activity callback */
  loading={loading}              /* Show loading state */
  className={styles.cardButton}  /* Custom styling */
>
  Add
</Button>

/* When clicked: */
onClick={onAdd}
→ Triggers parent callback
→ Parent opens modal form
→ User enters amount
→ Updates metric
```

**Button interaction flow:**

```
User clicks "Add" button
    ↓
onClick fires
    ↓
onAdd() function called (passed as prop)
    ↓
Parent component receives event
    ↓
Parent opens modal:
  - Modal shows input form
  - User enters value (e.g., 2 glasses)
  - User clicks "Submit"
    ↓
Parent calls addActivity('hydration', 2)
    ↓
HealthContext updates:
  - current: 5 → 7
  - percentage: 62.5% → 87.5%
    ↓
MetricCard re-renders with new values
    ↓
ProgressBar updates
Stats update: "5 / 8" → "7 / 8"
```


#### **Complete Card Rendering:**

```javascript
/* Usage: */
<MetricCard
  title="Hydration"
  icon="💧"
  current={5}
  goal={8}
  unit="glasses"
  percentage={62.5}
  onAdd={() => openModal('hydration')}
  loading={false}
/>

/* Renders as: */
<div className="Card_card__a">
  <div className="Card_cardHeader__b">
    <h3 className="Card_cardTitle__c">
      <span>💧</span>
      Hydration
    </h3>
  </div>
  
  <div className="Card_cardBody__d">
    <ProgressBar percentage={62.5} />
    
    <div className="Card_stats__e">
      <span className="Card_current__f">5</span>
      <span className="Card_separator__g">/</span>
      <span className="Card_goal__h">8 glasses</span>
    </div>
    
    <Button
      variant="primary"
      size="sm"
      onClick={openModal}
      loading={false}
      className="Card_cardButton__i"
    >
      Add
    </Button>
  </div>
</div>
```

**Visual representation:**

```
┌─────────────────────────────┐
│ 💧 Hydration                │ ← Header
├─────────────────────────────┤
│ [██████████████░░░░░] 62.5% │ ← ProgressBar
│                             │
│      5 / 8 glasses          │ ← Stats
│                             │
│        [  Add  ]            │ ← Button
└─────────────────────────────┘
```


***











