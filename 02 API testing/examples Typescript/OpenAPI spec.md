```yaml
openapi: 3.0.3
info:
  title: Authentication API Example
  description: Demonstrates various authentication methods in OpenAPI
  version: 1.0.0
  contact:
    name: API Support
    email: support@example.com

servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server

# ===========================================
# SECURITY SCHEMES DEFINITION
# ===========================================
components:
  securitySchemes:
    # 1. Bearer Token (JWT)
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Enter your JWT token

    # 2. Basic Authentication
    BasicAuth:
      type: http
      scheme: basic
      description: Basic HTTP authentication (username:password base64 encoded)

    # 3. API Key in Header
    ApiKeyHeader:
      type: apiKey
      in: header
      name: X-API-Key
      description: API key passed in header

    # 4. API Key in Query Parameter
    ApiKeyQuery:
      type: apiKey
      in: query
      name: api_key
      description: API key passed as query parameter

    # 5. API Key in Cookie
    ApiKeyCookie:
      type: apiKey
      in: cookie
      name: session_id
      description: Session ID stored in cookie

    # 6. OAuth 2.0 - Authorization Code Flow
    OAuth2AuthCode:
      type: oauth2
      description: OAuth 2.0 Authorization Code flow
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/oauth/authorize
          tokenUrl: https://auth.example.com/oauth/token
          refreshUrl: https://auth.example.com/oauth/refresh
          scopes:
            read:users: Read user information
            write:users: Modify user information
            read:orders: Read order information
            write:orders: Create and modify orders
            admin: Full administrative access

    # 7. OAuth 2.0 - Client Credentials Flow (machine-to-machine)
    OAuth2ClientCredentials:
      type: oauth2
      description: OAuth 2.0 Client Credentials flow for service accounts
      flows:
        clientCredentials:
          tokenUrl: https://auth.example.com/oauth/token
          scopes:
            service:read: Read access for services
            service:write: Write access for services

    # 8. OAuth 2.0 - Password Flow (legacy)
    OAuth2Password:
      type: oauth2
      description: OAuth 2.0 Resource Owner Password flow
      flows:
        password:
          tokenUrl: https://auth.example.com/oauth/token
          scopes:
            read: Read access
            write: Write access

    # 9. OAuth 2.0 - Implicit Flow (deprecated but shown for reference)
    OAuth2Implicit:
      type: oauth2
      description: OAuth 2.0 Implicit flow (deprecated)
      flows:
        implicit:
          authorizationUrl: https://auth.example.com/oauth/authorize
          scopes:
            read: Read access

    # 10. OpenID Connect
    OpenIdConnect:
      type: openIdConnect
      openIdConnectUrl: https://auth.example.com/.well-known/openid-configuration
      description: OpenID Connect authentication

  schemas:
    # Token Request/Response Schemas
    TokenRequest:
      type: object
      required:
        - grant_type
      properties:
        grant_type:
          type: string
          enum: [password, client_credentials, refresh_token, authorization_code]
        username:
          type: string
          example: user@example.com
        password:
          type: string
          format: password
        client_id:
          type: string
        client_secret:
          type: string
        refresh_token:
          type: string
        code:
          type: string
        redirect_uri:
          type: string
          format: uri

    TokenResponse:
      type: object
      properties:
        access_token:
          type: string
          example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
        token_type:
          type: string
          example: Bearer
        expires_in:
          type: integer
          example: 3600
        refresh_token:
          type: string
          example: dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...
        scope:
          type: string
          example: read:users write:users

    User:
      type: object
      properties:
        id:
          type: integer
          example: 1
        email:
          type: string
          format: email
          example: user@example.com
        name:
          type: string
          example: John Doe
        role:
          type: string
          enum: [user, admin, moderator]

    Error:
      type: object
      properties:
        error:
          type: string
          example: unauthorized
        error_description:
          type: string
          example: Invalid or expired token
        status_code:
          type: integer
          example: 401

# ===========================================
# GLOBAL SECURITY (applies to all endpoints)
# ===========================================
security:
  - BearerAuth: []

# ===========================================
# PATHS / ENDPOINTS
# ===========================================
paths:
  # ---------------------------------------
  # Authentication Endpoints (No auth required)
  # ---------------------------------------
  /oauth/token:
    post:
      tags:
        - Authentication
      summary: Obtain access token
      description: Exchange credentials for an access token
      security: []  # No authentication required for this endpoint
      requestBody:
        required: true
        content:
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TokenRequest'
            examples:
              password_grant:
                summary: Password Grant
                value:
                  grant_type: password
                  username: user@example.com
                  password: secret123
                  client_id: my-app
              client_credentials:
                summary: Client Credentials
                value:
                  grant_type: client_credentials
                  client_id: service-account
                  client_secret: super-secret
              refresh_token:
                summary: Refresh Token
                value:
                  grant_type: refresh_token
                  refresh_token: dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...
      responses:
        '200':
          description: Successful token response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenResponse'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          description: Invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /oauth/revoke:
    post:
      tags:
        - Authentication
      summary: Revoke token
      description: Invalidate an access or refresh token
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                token:
                  type: string
                token_type_hint:
                  type: string
                  enum: [access_token, refresh_token]
      responses:
        '200':
          description: Token revoked successfully

  # ---------------------------------------
  # User Endpoints (Bearer Auth)
  # ---------------------------------------
  /users/me:
    get:
      tags:
        - Users
      summary: Get current user profile
      description: Returns the profile of the authenticated user
      security:
        - BearerAuth: []
        - OAuth2AuthCode: [read:users]
      responses:
        '200':
          description: User profile
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /users:
    get:
      tags:
        - Users
      summary: List all users
      description: Requires admin scope
      security:
        - OAuth2AuthCode: [admin]
        - BearerAuth: []
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: List of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'

  # ---------------------------------------
  # API Key Authentication Example
  # ---------------------------------------
  /webhooks:
    post:
      tags:
        - Webhooks
      summary: Create webhook
      description: Uses API Key authentication
      security:
        - ApiKeyHeader: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                url:
                  type: string
                  format: uri
                events:
                  type: array
                  items:
                    type: string
      responses:
        '201':
          description: Webhook created

  # ---------------------------------------
  # Multiple Auth Options
  # ---------------------------------------
  /reports/{id}:
    get:
      tags:
        - Reports
      summary: Get report by ID
      description: Supports multiple authentication methods
      security:
        - BearerAuth: []
        - ApiKeyHeader: []
        - ApiKeyQuery: []
        - OAuth2AuthCode: [read:orders]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Report data

  # ---------------------------------------
  # Combined Security (AND logic)
  # ---------------------------------------
  /admin/sensitive-action:
    post:
      tags:
        - Admin
      summary: Perform sensitive action
      description: Requires BOTH API Key AND Bearer token
      security:
        - ApiKeyHeader: []
          BearerAuth: []  # Same array = AND logic
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                action:
                  type: string
      responses:
        '200':
          description: Action performed

  # ---------------------------------------
  # Basic Auth Example
  # ---------------------------------------
  /legacy/login:
    get:
      tags:
        - Legacy
      summary: Legacy login endpoint
      description: Uses HTTP Basic authentication
      security:
        - BasicAuth: []
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenResponse'

  # ---------------------------------------
  # Public Endpoint (No Auth)
  # ---------------------------------------
  /health:
    get:
      tags:
        - System
      summary: Health check
      description: Public endpoint - no authentication required
      security: []  # Explicitly no security
      responses:
        '200':
          description: Service is healthy
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: healthy
                  timestamp:
                    type: string
                    format: date-time

tags:
  - name: Authentication
    description: OAuth 2.0 token management
  - name: Users
    description: User management endpoints
  - name: Webhooks
    description: Webhook configuration
  - name: Reports
    description: Report generation
  - name: Admin
    description: Administrative operations
  - name: Legacy
    description: Legacy endpoints
  - name: System
    description: System health and status
```