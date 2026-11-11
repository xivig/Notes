# Module 07: Diagrams with Mermaid.js

> **Scope**: Embedding interactive diagrams natively in Markdown using Mermaid.js code blocks (` ```mermaid `) across GitHub, GitLab, Obsidian, and documentation engines.

---

## 1. Introduction to Mermaid in Markdown

Mermaid allows developers to create diagrams and visualizations using text and code. GitHub natively renders fenced code blocks with the `mermaid` language tag into responsive SVG graphics without needing external image generators.

```markdown
```mermaid
flowchart LR
    A[Write Markdown] --> B[Commit to Git]
    B --> C[GitHub Renders Diagram]
```
```

---

## 2. Flowcharts (`flowchart`)

Flowcharts illustrate workflows, decision logic, and step-by-step algorithms.

### Direction Keywords
- `TD` or `TB`: Top to Bottom
- `BT`: Bottom to Top
- `LR`: Left to Right
- `RL`: Right to Left

### Node Shapes & Link Syntax

```mermaid
flowchart LR
    rect[Rectangle] --> round(Rounded Corner)
    round --> stadium([Stadium / Pill])
    stadium --> diamond{Diamond Decision}
    diamond -->|Yes| circle((Circle))
    diamond -->|No| hex{{Hexagon}}
```

```markdown
```mermaid
flowchart LR
    rect[Rectangle] --> round(Rounded Corner)
    round --> stadium([Stadium / Pill])
    stadium --> diamond{Diamond Decision}
    diamond -->|Yes| circle((Circle))
    diamond -->|No| hex{{Hexagon}}
```
```

### Complete Architectural Flow Example

```markdown
```mermaid
flowchart TD
    subgraph Client["Frontend Client"]
        UI[React Application]
    end

    subgraph Gateway["API Gateway"]
        Auth[JWT Validator]
        Rate[Rate Limiter]
    end

    subgraph Services["Backend Microservices"]
        UserSvc[User Service]
        OrderSvc[Order Service]
    end

    subgraph Data["Persistence Layer"]
        PG[(PostgreSQL DB)]
        Redis[(Redis Cache)]
    end

    UI --> Auth
    Auth --> Rate
    Rate --> UserSvc
    Rate --> OrderSvc
    UserSvc --> PG
    OrderSvc --> Redis
```
```

---

## 3. Sequence Diagrams (`sequenceDiagram`)

Sequence diagrams visualize process interactions over time between multiple actors or systems.

```markdown
```mermaid
sequenceDiagram
    autonumber
    actor User as Client Browser
    participant API as API Server
    participant DB as PostgreSQL
    participant Cache as Redis Cache

    User->>+API: POST /auth/login (credentials)
    API->>Cache: GET session:token
    Cache-->>API: Cache Miss (null)
    API->>+DB: SELECT * FROM users WHERE email=?
    DB-->>-API: User Record
    API->>Cache: SET session:token (TTL 1h)
    API-->>-User: 200 OK + JWT Bearer Token

    Note over User,API: Subsequent authorized requests
    User->>+API: GET /api/v1/profile (Bearer token)
    API->>Cache: GET session:token
    Cache-->>API: Cache Hit (Valid session)
    API-->>-User: 200 OK (Profile payload)
```
```

### Key Notation:
- `->>` : Solid line with arrow (Synchronous request)
- `-->>` : Dashed line with arrow (Response)
- `+` / `-` : Activate / Deactivate participant execution bar
- `autonumber` : Automatically numbers each message sequence

---

## 4. Class Diagrams (`classDiagram`)

Class diagrams describe object-oriented system structures, class attributes, methods, and relationships.

```markdown
```mermaid
classDiagram
    class Vehicle {
        +String make
        +String model
        +Int year
        +startEngine() void
        +stopEngine() void
    }

    class ElectricCar {
        -Int batteryCapacityKWh
        +chargeBattery() void
        +getBatteryLevel() Int
    }

    class BatteryManagementSystem {
        +checkTemperature() Float
    }

    Vehicle <|-- ElectricCar : Inheritance
    ElectricCar *-- BatteryManagementSystem : Composition
```
```

### Member Visibility Indicators
- `+` Public
- `-` Private
- `#` Protected
- `~` Package / Internal

---

## 5. Entity-Relationship Diagrams (`erDiagram`)

ER diagrams model relational database schemas, tables, primary/foreign keys, and cardinalities.

```markdown
```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER {
        uuid id PK
        string email
        string password_hash
        timestamp created_at
    }

    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        uuid id PK
        uuid user_id FK
        string status
        decimal total_amount
    }

    ORDER_ITEM {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price
    }
```
```

### Cardinality Syntax
- `||--||` : Exactly one to exactly one
- `||--o{` : Exactly one to zero or more
- `||--|{` : Exactly one to one or more

---

## 6. State Diagrams (`stateDiagram-v2`)

State diagrams depict finite state machines and lifecycle changes.

```markdown
```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> Processing : Submit Request
    Processing --> Validating : Parse Payload
    Validating --> Success : Validation Passed
    Validating --> Failed : Validation Error

    Failed --> Idle : Retry
    Success --> [*]
```
```

---

## 7. Git Graphs (`gitGraph`)

Git graphs document branching strategies, releases, merges, and cherry-picks directly in markdown.

```markdown
```mermaid
gitGraph
    commit id: "feat: init repo"
    commit id: "feat: core auth"
    branch develop
    checkout develop
    commit id: "feat: add user api"
    commit id: "test: unit tests"
    checkout main
    merge develop id: "release: v1.0.0" tag: "v1.0.0"
    checkout develop
    commit id: "feat: add oauth"
```
```

---

## 8. Common Escapes & Troubleshooting

> [!WARNING] **Special Characters Inside Node Labels**
> If a node label contains parenthesis, brackets, quotes, or colons, wrap the label in double quotes:
> - **Error**: `nodeA[function(arg)]`
> - **Fix**: `nodeA["function(arg)"]`

```markdown
```mermaid
flowchart TD
    A["API Request (/users/all)"] --> B["Database Query (SELECT * FROM users)"]
```
```
