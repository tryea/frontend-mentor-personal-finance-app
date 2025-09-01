# Personal Finance App - API Design

## Base URL

```
https://fm-finance-be.ersaptaaristo.dev/v1
```

## Authentication

All endpoints (except registration and login) require session-based authentication using HTTP-only cookies.

### Headers

```
Content-Type: application/json
Cookie: session_id=<session_cookie> (automatically handled by browser)
```

### Session Management

- Sessions are managed via HTTP-only cookies for security
- Session cookies are automatically sent by the browser
- Sessions expire after 24 hours of inactivity
- CSRF protection is implemented via SameSite cookie attributes

---

## 1. Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request Body:**

```json
{
  "email": "string (required, max 255 chars, valid email format)",
  "password": "string (required, min 8 chars)",
  "first_name": "string (required, max 100 chars)",
  "last_name": "string (required, max 100 chars)",
  "avatar_url": "string (optional, max 500 chars, valid URL)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "bigint",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "avatar_url": "string|null",
      "created_at": "timestamp (ISO 8601)",
      "updated_at": "timestamp (ISO 8601)"
    },
    "session_id": "string (session identifier)"
  }
}
```

**Set-Cookie Header:**

```
Set-Cookie: session_id=<session_value>; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400
```

### POST /auth/login

Authenticate user and get access token.

**Request Body:**

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "bigint",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "avatar_url": "string|null"
    },
    "session_id": "string (session identifier)"
  }
}
```

**Set-Cookie Header:**

```
Set-Cookie: session_id=<session_value>; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400
```

### POST /auth/logout

Invalidate current session and clear session cookie.

**Headers:** Session cookie required

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

**Set-Cookie Header:**

```
Set-Cookie: session_id=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0
```

---

## 2. User Profile Endpoints

### GET /users/profile

Get current user profile information.

**Headers:** Session cookie required

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "avatar_url": "string|null",
    "created_at": "timestamp (ISO 8601)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

### PUT /users/profile

Update user profile information.

**Headers:** Session cookie required

**Request Body:**

```json
{
  "first_name": "string (optional, max 100 chars)",
  "last_name": "string (optional, max 100 chars)",
  "avatar_url": "string (optional, max 500 chars, valid URL)"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "avatar_url": "string|null",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

---

## 3. User Balance Endpoints

### GET /users/balance

Get current user's balance summary.

**Headers:** Session cookie required

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "current_balance": "decimal (2 decimal places)",
    "total_income": "decimal (2 decimal places)",
    "total_expenses": "decimal (2 decimal places)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

---

## 4. Categories Endpoints

### GET /categories

Get all available categories.

**Headers:** Session cookie required

**Query Parameters:**

- `page`: integer (optional, default: 1)
- `limit`: integer (optional, default: 50, max: 100)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "bigint",
        "name": "string",
        "description": "string|null",
        "created_at": "timestamp (ISO 8601)",
        "updated_at": "timestamp (ISO 8601)"
      }
    ],
    "pagination": {
      "current_page": "integer",
      "total_pages": "integer",
      "total_items": "integer",
      "items_per_page": "integer"
    }
  }
}
```

### GET /categories/{id}

Get specific category by ID.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "name": "string",
    "description": "string|null",
    "created_at": "timestamp (ISO 8601)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

---

## 5. Transactions Endpoints

### GET /transactions

Get user's transactions with filtering and pagination.

**Headers:** Session cookie required

**Query Parameters:**

- `page`: integer (optional, default: 1)
- `limit`: integer (optional, default: 10, max: 50)
- `category_id`: bigint (optional, filter by category)
- `is_recurring`: boolean (optional, filter by recurring status)
- `date_from`: string (optional, ISO 8601 date format)
- `date_to`: string (optional, ISO 8601 date format)
- `amount_min`: decimal (optional, minimum amount filter)
- `amount_max`: decimal (optional, maximum amount filter)
- `search`: string (optional, search in transaction name)
- `sort_by`: string (optional, values: 'date', 'amount', 'name', default: 'date')
- `sort_order`: string (optional, values: 'asc', 'desc', default: 'desc')

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "bigint",
        "name": "string",
        "amount": "decimal (2 decimal places)",
        "avatar_url": "string|null",
        "is_recurring": "boolean",
        "transaction_date": "timestamp (ISO 8601)",
        "category": {
          "id": "bigint",
          "name": "string"
        },
        "created_at": "timestamp (ISO 8601)",
        "updated_at": "timestamp (ISO 8601)"
      }
    ],
    "pagination": {
      "current_page": "integer",
      "total_pages": "integer",
      "total_items": "integer",
      "items_per_page": "integer"
    }
  }
}
```

### GET /transactions/{id}

Get specific transaction by ID.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "name": "string",
    "amount": "decimal (2 decimal places)",
    "avatar_url": "string|null",
    "is_recurring": "boolean",
    "transaction_date": "timestamp (ISO 8601)",
    "category": {
      "id": "bigint",
      "name": "string"
    },
    "created_at": "timestamp (ISO 8601)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

### POST /transactions

Create a new transaction.

**Headers:** Session cookie required

**Request Body:**

```json
{
  "name": "string (required, max 255 chars)",
  "amount": "decimal (required, 2 decimal places)",
  "category_id": "bigint (required)",
  "avatar_url": "string (optional, max 500 chars, valid URL)",
  "is_recurring": "boolean (optional, default: false)",
  "transaction_date": "timestamp (optional, ISO 8601, default: current time)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "name": "string",
    "amount": "decimal (2 decimal places)",
    "avatar_url": "string|null",
    "is_recurring": "boolean",
    "transaction_date": "timestamp (ISO 8601)",
    "category": {
      "id": "bigint",
      "name": "string"
    },
    "created_at": "timestamp (ISO 8601)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

### PUT /transactions/{id}

Update an existing transaction.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required)

**Request Body:**

```json
{
  "name": "string (optional, max 255 chars)",
  "amount": "decimal (optional, 2 decimal places)",
  "category_id": "bigint (optional)",
  "avatar_url": "string (optional, max 500 chars, valid URL)",
  "is_recurring": "boolean (optional)",
  "transaction_date": "timestamp (optional, ISO 8601)"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "name": "string",
    "amount": "decimal (2 decimal places)",
    "avatar_url": "string|null",
    "is_recurring": "boolean",
    "transaction_date": "timestamp (ISO 8601)",
    "category": {
      "id": "bigint",
      "name": "string"
    },
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

### DELETE /transactions/{id}

Delete a transaction.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required)

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

---

## 6. Budgets Endpoints

### GET /budgets

Get user's budgets.

**Headers:** Session cookie required

**Query Parameters:**

- `page`: integer (optional, default: 1)
- `limit`: integer (optional, default: 20, max: 50)
- `category_id`: bigint (optional, filter by category)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "budgets": [
      {
        "id": "bigint",
        "maximum_amount": "decimal (2 decimal places)",
        "theme_color": "string (hex color)",
        "category": {
          "id": "bigint",
          "name": "string"
        },
        "spent_amount": "decimal (2 decimal places, calculated)",
        "remaining_amount": "decimal (2 decimal places, calculated)",
        "created_at": "timestamp (ISO 8601)",
        "updated_at": "timestamp (ISO 8601)"
      }
    ],
    "pagination": {
      "current_page": "integer",
      "total_pages": "integer",
      "total_items": "integer",
      "items_per_page": "integer"
    }
  }
}
```

### GET /budgets/{id}

Get specific budget by ID.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "maximum_amount": "decimal (2 decimal places)",
    "theme_color": "string (hex color)",
    "category": {
      "id": "bigint",
      "name": "string"
    },
    "spent_amount": "decimal (2 decimal places, calculated)",
    "remaining_amount": "decimal (2 decimal places, calculated)",
    "recent_transactions": [
      {
        "id": "bigint",
        "name": "string",
        "amount": "decimal (2 decimal places)",
        "transaction_date": "timestamp (ISO 8601)"
      }
    ],
    "created_at": "timestamp (ISO 8601)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

### POST /budgets

Create a new budget.

**Headers:** Session cookie required

**Request Body:**

```json
{
  "category_id": "bigint (required)",
  "maximum_amount": "decimal (required, 2 decimal places, > 0)",
  "theme_color": "string (required, valid hex color format)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "maximum_amount": "decimal (2 decimal places)",
    "theme_color": "string (hex color)",
    "category": {
      "id": "bigint",
      "name": "string"
    },
    "spent_amount": "decimal (2 decimal places, calculated)",
    "remaining_amount": "decimal (2 decimal places, calculated)",
    "created_at": "timestamp (ISO 8601)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

### PUT /budgets/{id}

Update an existing budget.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required)

**Request Body:**

```json
{
  "maximum_amount": "decimal (optional, 2 decimal places, > 0)",
  "theme_color": "string (optional, valid hex color format)"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "maximum_amount": "decimal (2 decimal places)",
    "theme_color": "string (hex color)",
    "category": {
      "id": "bigint",
      "name": "string"
    },
    "spent_amount": "decimal (2 decimal places, calculated)",
    "remaining_amount": "decimal (2 decimal places, calculated)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

### DELETE /budgets/{id}

Delete a budget.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required)

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Budget deleted successfully"
}
```

---

## 7. Pots (Savings) Endpoints

### GET /pots

Get user's savings pots.

**Headers:** Session cookie required

**Query Parameters:**

- `page`: integer (optional, default: 1)
- `limit`: integer (optional, default: 20, max: 50)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "pots": [
      {
        "id": "bigint",
        "name": "string",
        "target_amount": "decimal (2 decimal places)",
        "current_amount": "decimal (2 decimal places)",
        "theme_color": "string (hex color)",
        "progress_percentage": "decimal (calculated, 0-100)",
        "created_at": "timestamp (ISO 8601)",
        "updated_at": "timestamp (ISO 8601)"
      }
    ],
    "pagination": {
      "current_page": "integer",
      "total_pages": "integer",
      "total_items": "integer",
      "items_per_page": "integer"
    }
  }
}
```

### GET /pots/{id}

Get specific pot by ID.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "name": "string",
    "target_amount": "decimal (2 decimal places)",
    "current_amount": "decimal (2 decimal places)",
    "theme_color": "string (hex color)",
    "progress_percentage": "decimal (calculated, 0-100)",
    "recent_transactions": [
      {
        "id": "bigint",
        "amount": "decimal (2 decimal places)",
        "transaction_type": "string (deposit|withdrawal)",
        "description": "string|null",
        "created_at": "timestamp (ISO 8601)"
      }
    ],
    "created_at": "timestamp (ISO 8601)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

### POST /pots

Create a new savings pot.

**Headers:** Session cookie required

**Request Body:**

```json
{
  "name": "string (required, max 255 chars)",
  "target_amount": "decimal (required, 2 decimal places, > 0)",
  "current_amount": "decimal (optional, 2 decimal places, >= 0, default: 0)",
  "theme_color": "string (required, valid hex color format)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "name": "string",
    "target_amount": "decimal (2 decimal places)",
    "current_amount": "decimal (2 decimal places)",
    "theme_color": "string (hex color)",
    "progress_percentage": "decimal (calculated, 0-100)",
    "created_at": "timestamp (ISO 8601)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

### PUT /pots/{id}

Update an existing pot.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required)

**Request Body:**

```json
{
  "name": "string (optional, max 255 chars)",
  "target_amount": "decimal (optional, 2 decimal places, > 0)",
  "theme_color": "string (optional, valid hex color format)"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "bigint",
    "name": "string",
    "target_amount": "decimal (2 decimal places)",
    "current_amount": "decimal (2 decimal places)",
    "theme_color": "string (hex color)",
    "progress_percentage": "decimal (calculated, 0-100)",
    "updated_at": "timestamp (ISO 8601)"
  }
}
```

### DELETE /pots/{id}

Delete a savings pot.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required)

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Pot deleted successfully"
}
```

---

## 8. Pot Transactions Endpoints

### POST /pots/{id}/deposit

Add money to a savings pot.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required, pot ID)

**Request Body:**

```json
{
  "amount": "decimal (required, 2 decimal places, > 0)",
  "description": "string (optional, max 500 chars)"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "pot": {
      "id": "bigint",
      "name": "string",
      "current_amount": "decimal (2 decimal places, updated)",
      "target_amount": "decimal (2 decimal places)",
      "progress_percentage": "decimal (calculated, 0-100)"
    },
    "transaction": {
      "id": "bigint",
      "amount": "decimal (2 decimal places)",
      "transaction_type": "deposit",
      "description": "string|null",
      "created_at": "timestamp (ISO 8601)"
    }
  }
}
```

### POST /pots/{id}/withdraw

Withdraw money from a savings pot.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required, pot ID)

**Request Body:**

```json
{
  "amount": "decimal (required, 2 decimal places, > 0, <= current_amount)",
  "description": "string (optional, max 500 chars)"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "pot": {
      "id": "bigint",
      "name": "string",
      "current_amount": "decimal (2 decimal places, updated)",
      "target_amount": "decimal (2 decimal places)",
      "progress_percentage": "decimal (calculated, 0-100)"
    },
    "transaction": {
      "id": "bigint",
      "amount": "decimal (2 decimal places)",
      "transaction_type": "withdrawal",
      "description": "string|null",
      "created_at": "timestamp (ISO 8601)"
    }
  }
}
```

### GET /pots/{id}/transactions

Get transaction history for a specific pot.

**Headers:** Session cookie required

**Path Parameters:**

- `id`: bigint (required, pot ID)

**Query Parameters:**

- `page`: integer (optional, default: 1)
- `limit`: integer (optional, default: 20, max: 50)
- `transaction_type`: string (optional, values: 'deposit', 'withdrawal')

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "bigint",
        "amount": "decimal (2 decimal places)",
        "transaction_type": "string (deposit|withdrawal)",
        "description": "string|null",
        "created_at": "timestamp (ISO 8601)"
      }
    ],
    "pagination": {
      "current_page": "integer",
      "total_pages": "integer",
      "total_items": "integer",
      "items_per_page": "integer"
    }
  }
}
```

---

## 9. Dashboard/Overview Endpoints

### GET /dashboard/overview

Get comprehensive dashboard data.

**Headers:** Session cookie required

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "balance": {
      "current_balance": "decimal (2 decimal places)",
      "total_income": "decimal (2 decimal places)",
      "total_expenses": "decimal (2 decimal places)"
    },
    "recent_transactions": [
      {
        "id": "bigint",
        "name": "string",
        "amount": "decimal (2 decimal places)",
        "category": {
          "name": "string"
        },
        "transaction_date": "timestamp (ISO 8601)"
      }
    ],
    "budgets_summary": [
      {
        "id": "bigint",
        "category": {
          "name": "string"
        },
        "maximum_amount": "decimal (2 decimal places)",
        "spent_amount": "decimal (2 decimal places)",
        "remaining_amount": "decimal (2 decimal places)",
        "theme_color": "string (hex color)"
      }
    ],
    "pots_summary": [
      {
        "id": "bigint",
        "name": "string",
        "current_amount": "decimal (2 decimal places)",
        "target_amount": "decimal (2 decimal places)",
        "progress_percentage": "decimal (0-100)",
        "theme_color": "string (hex color)"
      }
    ],
    "recurring_bills": [
      {
        "id": "bigint",
        "name": "string",
        "amount": "decimal (2 decimal places)",
        "category": {
          "name": "string"
        },
        "next_due_date": "timestamp (ISO 8601, calculated)"
      }
    ]
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "string",
        "message": "string"
      }
    ]
  }
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Access denied"
  }
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 409 Conflict

```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "Resource already exists"
  }
}
```

### 422 Unprocessable Entity

```json
{
  "success": false,
  "error": {
    "code": "BUSINESS_LOGIC_ERROR",
    "message": "Business rule violation",
    "details": "string"
  }
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Internal server error"
  }
}
```

---

## Data Types Reference

- **bigint**: 64-bit integer (e.g., 1234567890123456789)
- **decimal**: Decimal number with 2 decimal places (e.g., 123.45)
- **string**: Text string with specified max length
- **boolean**: true or false
- **timestamp**: ISO 8601 formatted date-time string (e.g., "2024-08-19T14:23:11Z")
- **hex color**: Hexadecimal color code (e.g., "#277C78")
- **email**: Valid email address format
- **URL**: Valid URL format

---

## Rate Limiting

- **Authentication endpoints**: 5 requests per minute per IP
- **General endpoints**: 100 requests per minute per authenticated user
- **Bulk operations**: 10 requests per minute per authenticated user

---

## Pagination

All list endpoints support pagination with the following query parameters:

- `page`: Page number (starts from 1)
- `limit`: Items per page (varies by endpoint)

Pagination response format:

```json
{
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 47,
    "items_per_page": 10
  }
}
```
