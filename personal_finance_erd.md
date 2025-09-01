# Personal Finance App - Entity Relationship Diagram

```mermaid
erDiagram
    users {
        bigint id PK
        varchar email UK
        varchar password_hash
        varchar first_name
        varchar last_name
        varchar avatar_url
        timestamp created_at
        timestamp updated_at
    }

    categories {
        bigint id PK
        varchar name UK
        varchar description
        timestamp created_at
        timestamp updated_at
    }

    transactions {
        bigint id PK
        bigint user_id FK
        bigint category_id FK
        varchar name
        decimal amount
        varchar avatar_url
        boolean is_recurring
        timestamp transaction_date
        timestamp created_at
        timestamp updated_at
    }

    budgets {
        bigint id PK
        bigint user_id FK
        bigint category_id FK
        decimal maximum_amount
        varchar theme_color
        timestamp created_at
        timestamp updated_at
    }

    pots {
        bigint id PK
        bigint user_id FK
        varchar name
        decimal target_amount
        decimal current_amount
        varchar theme_color
        timestamp created_at
        timestamp updated_at
    }

    pot_transactions {
        bigint id PK
        bigint pot_id FK
        bigint user_id FK
        decimal amount
        varchar transaction_type
        varchar description
        timestamp created_at
    }

    user_balances {
        bigint id PK
        bigint user_id FK
        decimal current_balance
        decimal total_income
        decimal total_expenses
        timestamp updated_at
    }

    %% Relationships
    users ||--o{ transactions : "user.id -> transactions.user_id"
    users ||--o{ budgets : "user.id -> budgets.user_id"
    users ||--o{ pots : "user.id -> pots.user_id"
    users ||--|| user_balances : "user.id -> user_balances.user_id"
    users ||--o{ pot_transactions : "user.id -> pot_transactions.user_id"
    
    categories ||--o{ transactions : "categories.id -> transactions.category_id"
    categories ||--o{ budgets : "categories.id -> budgets.category_id"
    
    pots ||--o{ pot_transactions : "pots.id -> pot_transactions.pot_id"
```

## Table Descriptions

### users
Stores user account information including authentication details and profile data.

### categories
Defines transaction and budget categories (Bills, Dining Out, Entertainment, Personal Care, etc.).

### transactions
Records all financial transactions for users, linked to categories and users.

### budgets
Stores budget limits for each category per user with theme customization.

### pots
Manages savings goals/pots for users with target and current amounts.

### pot_transactions
Tracks deposits and withdrawals from savings pots.

### user_balances
Maintains current balance summary for each user (current, income, expenses).

## Key Relationships

- **One-to-Many**: `users.id` → `transactions.user_id`
- **One-to-Many**: `users.id` → `budgets.user_id`
- **One-to-Many**: `users.id` → `pots.user_id`
- **One-to-One**: `users.id` → `user_balances.user_id`
- **One-to-Many**: `categories.id` → `transactions.category_id`
- **One-to-Many**: `categories.id` → `budgets.category_id`
- **One-to-Many**: `pots.id` → `pot_transactions.pot_id`

## Data Types Used

- `bigint`: Primary keys and foreign keys
- `varchar`: Text fields (names, emails, descriptions)
- `decimal`: Monetary amounts with precision
- `boolean`: True/false flags
- `timestamp`: Date and time fields
- `UK`: Unique key constraint
- `PK`: Primary key
- `FK`: Foreign key